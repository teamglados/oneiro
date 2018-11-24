import argparse
import json
import os
from datetime import datetime
import random
import fiona
import numpy as np

from utils import GEOJSON_TEMPLATE

def get_dominant_zone_id(prop_dict):
    zone = prop_dict.get("ID", None)
    # football data's id key is different
    if not zone:
        zone = prop_dict["id"]
    return int(zone)

def read_shp_file(filename):
    shape = fiona.open(filename)
    dominant_zones = {}
    for line in shape:
        line_dict = dict(line)

        long_up_left, lat_up_left = line_dict["geometry"]["coordinates"][0][0]
        long_down_right, lat_down_right = line_dict["geometry"]["coordinates"][0][-3]

        # remove "gridiness" with random
        middle_lat = np.mean([lat_up_left, lat_down_right]) + random.uniform(0,  lat_up_left - lat_down_right)
        middle_long = np.mean([long_up_left, long_down_right]) + random.uniform(0, long_up_left - long_down_right)
        dominant_zones[get_dominant_zone_id(line_dict["properties"])] = {"long": middle_long, "lat": middle_lat}
    return dominant_zones

def read_data_file(filename, dominant_zones, start_hour, end_hour, day):
    data = GEOJSON_TEMPLATE.copy()
    with open(filename, "r") as f:
        next(f)
        max_count = 0
        for line in f:
            dominant_zone, time, count = line.split(",")
            time = datetime.strptime(time, '%d.%m.%Y %H.%M.%S')

            if (start_hour <= time.hour <= end_hour) and time.day==day:
                dominant_zone = int(dominant_zone)
                coordinates = dominant_zones.get(dominant_zone, None)

                count = int(count.strip())
                if count > max_count:
                    max_count = count

                if coordinates:
                    data["features"].append({
                        "type": "Feature",
                        "properties": {
                            "count": count,
                            "time": int(time.strftime("%s")),
                            "dominant_zone": dominant_zone
                        },
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                coordinates["long"],
                                coordinates["lat"],
                                0
                            ]
                        }
                    })

    data["_metadata"]["max_count"] = max_count
    return data

def main(args):
    dominant_zones = read_shp_file(args.shp)
    data = read_data_file(args.data, dominant_zones, args.start_hour, args.end_hour, args.day)
    with open(os.path.splitext(args.data)[0] + ".geojson", "w") as json_file:
        json.dump(data, json_file)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--shp', type=str)
    parser.add_argument('--data', type=str)
    parser.add_argument('--start_hour', type=int)
    parser.add_argument('--end_hour', type=int)
    parser.add_argument('--day', type=int, default=11)

    cli_args = parser.parse_args()

    main(cli_args)
