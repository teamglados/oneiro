from apiwrapper import *
from evobjects import *

@apiwrapper('https://junctionev.enstoflow.com/api/v1/', auth=('junction', 'junction2018'))
class Enstoflow:

    def getChargingPointGroups(self):
        return [
            ChargingPointGroup(
                api=self,
                **params
            ) for params in self.get('chargingPointGroup')
        ]

    def getChargingPointGroup(self, id):
        return ChargingPointGroup(
            api=self,
            **self.get('chargingPointGroup', id)
        )

    def getChargingPoints(self, groupOrId):
        if type(groupOrId) == int:
            return self.getChargingPointGroup(groupOrId)
        for group in self.getChargingPointGroups():
            if group.name == groupOrId:
                return list(group)
        return None

    def getChargingPoint(self, identifier):
        return ChargingPoint(
            api=self,
            **self.get('chargingPoint', identifier)
        )

    def getChargingPointConfiguration(self, identifier):
        return self.get('chargingPoint', identifier, 'configuration')

    def createChargingPoint(self, group, identifier):
        result = self.post('chargingPoint', {
            'identifier': identifier
        })
        result = self.post('chargingPoint/{}/group/{}'.format(
            identifier,
            self.getChargingPointGroup(group).name
        ))
        return result == {}

    def deleteChargingPoint(self, identifier):
        return self.delete('chargingPoint', identifier)

    def softResetChargingPoint(self, identifier):
        return self.get('chargingPoint', identifier, 'resetsoft') == {}

    def hardResetChargingPoint(self, identifier):
        return self.get('chargingPoint', identifier, 'resethard') == {}

    def startChargeTransaction(self, identifier, connector, tag):
        return self.get(
            'chargingPoint',
            identifier,
            connector,
            'starttransaction',
            tag
        ) == {}

    def stopChargeTransaction(self, identifier, connector):
        return self.get(
            'chargingPoint',
            identifier,
            connector,
            'stoptransaction'
        ) == {}

    def unlockConnector(self, identifier, connector):
        return self.get(
            'chargingPoint',
            identifier,
            connector,
            'unlockconnector'
        ) == {}

    def setChargingPointStatus(self, identifier, connector, operative=True):
        if operative:
            return self.get(
                'chargingPoint',
                identifier,
                connector,
                'statusoperative'
            ) == {}
        return self.get(
            'chargingPoint',
            identifier,
            connector,
            'statusinoperative'
        ) == {}

    def getMessage(self, type):
        """
        Type could be one of:
        • BootNotification
        • DiagnosticsStatusNotification
        • FirmwareStatusNotification
        • Heartbeat
        • MeterValues
        • StatusNotification
        """
        raise NotImplementedError('getMessage() is not yet implemented')
