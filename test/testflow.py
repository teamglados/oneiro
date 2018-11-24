import requests
import os

API_URL = os.getenv('API_URL', 'http://localhost:8000')

def call(method):
    print('Called api method {}'.format(method))
    return '{}/{}'.format(API_URL, method)

def next_step():
    input('\nPress enter for next step...')

print(requests.get(call('spot/status/foo')).json())
next_step()

with open('test.jpg', 'rb') as image:
    print(requests.post(call('postimage'), files={'media': image}).json())

next_step()

print(requests.get(call('spot/status/foo')).json())
next_step()

print(requests.post(call('spot/start/foo')).json())
next_step()

print(requests.get(call('spot/status/foo')).json())
next_step()

print(requests.post(call('spot/stop/foo')).json())
next_step()

print(requests.get(call('spot/status/foo')).json())
next_step()

print(requests.get(call('history/userid')).json())
