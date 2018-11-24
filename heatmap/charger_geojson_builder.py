import argparse
import json
import os
import numpy as np

from utils import GEOJSON_TEMPLATE

def read_charge_file(filename):
    with open(filename, "r") as f:
        return json.load(f)

def build_geojson_data(data):
    geojson_data = GEOJSON_TEMPLATE.copy()
    for line in data:
        lat = line[1]
        long = line[2]
        # Keep only points close to Helsinki
        if (22 <= long <= 26) and (59 <= lat <= 64):
            geojson_data["features"].append(
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            long,
                            lat,
                            0
                        ]
                    }
                })
    return geojson_data

def main(args):
    raw_data = read_charge_file(args.f)
    data = build_geojson_data(raw_data)
    with open(os.path.splitext(args.f)[0] + ".geojson", "w") as json_file:
        json.dump(data, json_file)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', type=str)
    cli_args = parser.parse_args()

    main(cli_args)
