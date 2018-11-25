# TODO: Return current spot charging status, who is charging
# for how long, cost etc.
import random
import time

class Api:

    def __init__(self, ensto, live=False):
        self.ensto = ensto
        self.live = live
        self.group = None
        self.spot = None
        self.start_time = None

        self.expected_group_name = 'RealDevice' \
            if self.live else 'oneiro'
        self.expected_spot_identifier = 'JunctionEVB1' \
            if self.live else 'junction-6'

        self.auth = False
        self.history = []

        for group in ensto.getChargingPointGroups():
            if group.name == self.expected_group_name:
                self.group = group
                for spot in self.group:
                    if spot.identifier == self.expected_spot_identifier:
                        self.spot = spot

    @property
    def connector(self):
        return self.spot.connectors[-1]

    def get_history(self, *args, **kwargs):
        return { 'ok': True, 'history': self.history }

    def spot_status(self, *args, **kwargs):
        result = {
            'ok': True,
            'identifier': self.spot.identifier,
            'connectors': []
        }
        self.spot = self.spot.update()
        for connector in self.spot.connectors:
            result['connectors'].append({
                # Available | Charging | Unavailable
                'status': connector.status
            })
        return result

    def spot_status_auth(self, *args, **kwargs):
        return { 'ok': True, 'auth': self.auth }

    def spot_authenticate(self, detector_output, *args, **kwargs):
        for item in detector_output:
            if item['confidence'] >= 75:
                self.auth = True
                print('Found license plate - auth OK')
                return self.spot_enable()
        self.auth = False
        return { 'ok': False }

    def spot_enable(self, *args, **kwargs):
        return { 'ok': self.connector.enable() }

    def spot_disable(self, *args, **kwargs):
        return { 'ok': self.connector.disable() }

    def spot_start_charging(self, *args, **kwargs):
        return { 'ok': self.connector.startCharging('foo') }

    def spot_stop_charging(self, *args, **kwargs):
        if self.connector.stopCharging() and self.spot_disable():
            duration_minutes = random.uniform(60, 120)
            charging_cost = duration_minutes / 60. * 0.25
            parking_cost = duration_minutes / 60. * 0.6
            total_cost = charging_cost + parking_cost
            charging_result = {
                'ok': True,
                'duration': duration_minutes,
                'total_cost': total_cost,
                'charging_cost': charging_cost,
                'parking_cost': parking_cost,
            }
            self.history.append({
                'owners_cut': total_cost * 0.70,
                **charging_result
            })
            return charging_result
        return { 'ok': False }
