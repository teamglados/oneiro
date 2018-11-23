import requests

def apiwrapper(url=None, auth=(), *decorator_args, **decorator_kwargs):

    class ApiWrapper:

        def __init__(self, cls):
            self.cls = cls
            self.auth = auth
            self.url = url
            self.sess = requests.Session()
            self.authorize()

        def __call__(self, *args, **kwargs):
            cls = self.cls(*args, **kwargs)
            for name in filter(lambda name: '__' not in name, dir(self)):
                setattr(cls, name, getattr(self, name))
            return cls

        def request(self, httpmethod, apimethod, data={}, **kwargs):
            try:
                return getattr(
                    self.sess,
                    httpmethod
                )(self.url + apimethod, data=data, **kwargs).json()
            except Exception as e:
                print('Exception in API call:', e)

        def authorize(self):
            return self.request('get', '', auth=self.auth)

        def delete(self, apimethod, data={}, **kwargs):
            return self.request('delete', apimethod, data, **kwargs)

        def patch(self, apimethod, data={}, **kwargs):
            return self.request('patch', apimethod, data, **kwargs)

        def post(self, apimethod, data={}, **kwargs):
            return self.request('post', apimethod, data, **kwargs)

        def get(self, apimethod, *args, **kwargs):
            return self.request('get', '/'.join(
                [ str(arg) for arg in (apimethod, ) + args]
            ), **kwargs)

    return ApiWrapper
