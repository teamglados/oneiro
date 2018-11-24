from object import *

@evobject()
class ChargingPointConnector:

    def __init__(self, api, parent, *args, **kwargs):
        self.api = api
        self.parent = parent

    def startCharging(self, tag):
        result = self.api.startChargeTransaction(
            self.parent.identifier,
            self.connectorId,
            tag
        )
        #self.parent.update()
        return result

    def stopCharging(self):
        result = self.api.stopChargeTransaction(
            self.parent.identifier,
            self.connectorId
        )
        #self.parent.update()
        return result

    def enable(self):
        result = self.api.setChargingPointStatus(
            self.parent.identifier,
            self.connectorId,
            operative=True
        )
        #self.parent.update()
        return result

    def disable(self):
        result = self.api.setChargingPointStatus(
            self.parent.identifier,
            self.connectorId,
            operative=False
        )
        #self.parent.update()
        return result

    def unlock(self):
        result = self.api.unlockConnector(
            self.parent.identifier,
            self.connectorId,
        )
        #self.parent.update()
        return result

@evobject(('connectors', ))
class ChargingPoint:

    def __init__(self, api, connectors=None, **kwargs):
        self.api = api
        self.connectors = [
            ChargingPointConnector(api, self, **connector) \
            for connector in connectors
        ]

    def update(self, withConfig=False):
        self.__dict__.update(self.api.getChargingPoint(
            self.identifier
        ).__dict__)
        if withConfig:
            for item in self.api.getChargingPointConfiguration(self.identifier):
                setattr(self, item['key'], item['value'])
        return self

    def delete(self):
        return self.api.deleteChargingPoint(self.identifier)

    def softReset(self):
        return self.api.softResetChargingPoint(self.identifier) == {}

    def hardReset(self):
        return self.api.hardResetChargingPoint(self.identifier)

@evobject(('chargingPoints', 'children'))
class ChargingPointGroup:

    def __init__(self, api, children=None, chargingPoints=None, **kwargs):
        self.api = api
        self.children = [
            ChargingPointGroup(api, **group) \
            for group in children
        ]
        self.chargingPoints = [
            ChargingPoint(api, **point) \
            for point in chargingPoints
        ]

    def update(self):
        self.__dict__.update(
            self.api.getChargingPointGroup(self.id).__dict__
        )
        return self

    def addChargingPoint(self, identifier):
        if self.api.createChargingPoint(self.id, identifier):
            return self.update()
