from sanic import Sanic
from sanic.response import json

from enstoflow import Enstoflow

server = Sanic()
e = Enstoflow()

@server.route('/', methods=['GET'])
async def main_handler(request):
    return json({'OK': True})

@server.route('/test', methods=['GET'])
async def test_handler(request):
    return json(e.listChargingPointGroups())

if __name__ == '__main__':
    server.run(host='0.0.0.0', port=8000)
