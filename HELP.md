# TODO: Readme

Lorem ipsum dolor sit amet

## References

**EnstoFlow API docs**
https://github.com/EnstoFlow/apidocs

## Helpful links

**Project submission**
http://project-plat.herokuapp.com/dashboard

## Build GeoJson data
* `python charger_geojson_builder.py -f "../data/charger_location_data.txt"`

* `python telia_data_geojson_builder.py --start_hour 14 --end_hour 16 --date 11 --shp "../data/activity_data/shapefiles/FI_MTC_WGS84_update.shp" --data "../data/activity_data/Uusimaa_activity_data_hourly_20_min_break_MTC_201801.txt" `

## Show heatmap
Run python server in root folder
* `python3 -m http.server` and;
* `open heatmap/heatmap_test.html`


## Raspberry camera
Detect and connect raspberry device
* `arp -a`
* `ssh pi@<deviceIP>` pw: raspberry

## Server

```
docker run -p 8000:8000 -e LIVE_MODE=true -v /tmp:/tmp --name glados glados:latest
```

`/opt/api/server/server.py`

## ICE Checklist

- Check server responding to **HTTPS://**api.teamglados.com/

- If not, is network connection OK?

- Is container running in AWS? (login command)

- If yes, is server responding to https://api.teamglados.com/spot/status/foo

- If not is basic auth expired?

- Is rate limit in place?

- Is deployed with LIVE_MODE=true or not?

- Is rpi connected? Do you see /postimage log?

- Is rpi operational (software failure)?
