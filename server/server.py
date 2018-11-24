from sanic import Sanic
from sanic.response import json
import os

from enstoflow import Enstoflow
from api import Api
from licence_plate import recognize
from utils import write_picture_to_file

IMAGE_PATH = os.getenv('IMAGE_PATH', '/tmp/plate_image.jpg')
LIVE_MODE = bool(os.getenv('LIVE_MODE', False))

ensto = Enstoflow()
server = Sanic()
api = Api(ensto, live=LIVE_MODE)

print('Running in live={}'.format(LIVE_MODE))

@server.route('/', methods=['GET'])
async def status_route(request):
    return json({'ok': True, 'live_mode': LIVE_MODE })

@server.route('/history/<userId>', methods=['GET'])
async def history_route(request, userId):
    return json(api.history)

@server.route('/spot/status/<spotId>', methods=['GET'])
async def spot_status_route(request, spotId):
    return json(api.spot_status())

@server.route('/spot/start/<spotId>', methods=['POST'])
async def charging_start_route(request, spotId):
    return json(api.spot_start_charging(spotId))

@server.route('/spot/stop/<spotId>', methods=['POST'])
async def charging_stop_route(request, spotId):
    return json(api.spot_stop_charging(spotId))

@server.route('/postimage', methods=['POST'])
async def image_route(request):
    write_picture_to_file(request.files.get('media').body, IMAGE_PATH)
    return json(api.spot_authenticate(recognize(IMAGE_PATH)))

if __name__ == '__main__':
    server.run(host='0.0.0.0', port=8000)
