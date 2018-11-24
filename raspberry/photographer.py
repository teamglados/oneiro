import os
import time
import requests
from picamera import PiCamera

camera = PiCamera()
camera.resolution = (320, 240)
camera.start_preview()

url = os.getenv("API_URL", "https://api.teamglados.com/postimage")

image_name = "pi_image.jpg"
while True:
    time.sleep(2)
    camera.capture(image_name)

    files = {'media': open(image_name, 'rb')}
    requests.post(url, files=files)
    print(time.strftime('%Y-%m-%d %H:%M'), "-- uploded image")
