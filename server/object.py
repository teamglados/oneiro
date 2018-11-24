import re

def evobject(not_include_keys=()):

    def class_name(cls):
        return re.search("'(.*)'>$", str(cls)).group(1).split('.')[-1]

    def wrapper(cls):
        class EVObject(cls):
            def __init__(self, *args, **kwargs):
                for name, attr in kwargs.items():
                    if not name in not_include_keys:
                        setattr(self, name, attr)
                super().__init__(*args, **kwargs)

            def __repr__(self):
                return '<{} object at 0x{:0x}>'.format(
                    class_name(cls),
                    id(cls)
                )
            def __getitem__(self, key):
                return not_include_keys and getattr(self, not_include_keys[0])[key]

            def __iter__(self):
                return (not_include_keys and iter(getattr(self, not_include_keys[0]))) or []
        return EVObject
    return wrapper
