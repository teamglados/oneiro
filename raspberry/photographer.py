import os
import requests
from time import sleep
from picamera import PiCamera

camera = PiCamera()
camera.resolution = (1024, 768)
camera.start_preview()

url = os.getenv("API_URL", "https://api.teamglados.com/postimage")

image_name = "pi_image.jpg"
while True:
    sleep(2)
    camera.capture(image_name)

    files = {'media': open(image_name, 'rb')}
    requests.post(url, files=files)
