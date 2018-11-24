import datetime

class Api:

    def __init__(self, ensto):
        self.ensto = ensto
        self.profiles = {
            'owner': {
                'firstName': 'Ville',
                'lastName': 'Toiviainen',
                'license': None,
                'charger': None,
                'history': []
            },
            'user': {
                'firstName': 'Teemu',
                'lastName': 'Taskula',
                'license': 'VAT987',
                'charger': None,
                'history': []
            }
        }
