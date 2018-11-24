from sanic import Sanic
from sanic.response import json
import os

from enstoflow import Enstoflow
from api import Api
from licence_plate import recognize
from utils import write_picture_to_file

IMAGE_PATH = os.getenv('IMAGE_PATH', '/tmp/plate_image.jpg')

ensto = Enstoflow()
api = Api(ensto)
server = Sanic()

@server.route('/', methods=['GET'])
async def status_route(request):
    return json({'ok': True})

@server.route('/profile/<userId>', methods=['GET'])
async def profile_route(request, userId):
    # TODO: Returns user profile by id, with history etc.
    return json({})

@server.route('/spot', methods=['GET'])
async def spot_status_all_route(request, spotId, userId):
    # TODO: Returns all spots available with coords, reserve status,
    # price
    return json({})

@server.route('/spot/status/<spotId>', methods=['GET'])
async def spot_status_route(request, spotId, userId):
    # TODO: Returns current spot charging status, who is charging
    # for how long, cost etc.
    return json({})

@server.route('/spot/reserve/<spotId>/<userId>', methods=['POST'])
async def spot_reserve_route(request, spotId, userId):
    # TODO: Reserves spot for userId for X minutes
    return json({})

@server.route('/spot/start/<spotId>', methods=['POST'])
async def charging_start_route(request, spotId):
    # TODO: Sets owner history start time
    return json({})

@server.route('/stop/stop/<spotId>', methods=['POST'])
async def charging_stop_route(request, spotId):
    # TODO: Returns summary of charging time, cost, adds to owner
    # history
    return json({})

@server.route('/postimage', methods=['POST'])
async def image_route(request):
    write_picture_to_file(request.json["media"], IMAGE_PATH)
    output = recognize(IMAGE_PATH)
    print(output)
    return json({ 'ok': True })

@server.route('/detect/<spotId>/<license>', methods=['POST'])
async def detect_route(request, spotId, license):
    return json({})

@server.route('/detect/<spotId>', methods=['GET'])
async def detect_status_route(request, spotId):
    # TODO: Returns detected licenses per spot
    return json({})

if __name__ == '__main__':
    server.run(host='0.0.0.0', port=8000)
