from apiwrapper import *

@apiwrapper('https://junctionev.enstoflow.com/api/v1/', auth=('junction', 'junction2018'))
class Enstoflow:

    def listChargingPointGroups(self):
        return self.get('chargingPointGroup')

    def getChargingPointGroup(self, id):
        return self.get('chargingPointGroup', id)

if __name__ == '__main__':
    e = Enstoflow()

    print(e.getChargingPointGroup(6))
