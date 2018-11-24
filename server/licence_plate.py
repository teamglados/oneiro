from openalpr import Alpr

country = "eu"
default_region = "fi"
detect_region = False

alpr = Alpr(country, "/etc/openalpr/openalpr.conf", "/usr/share/openalpr/runtime_data")
alpr.set_top_n(5)
alpr.set_default_region(default_region)
alpr.set_detect_region(detect_region)

print('ALPR config: country={}, default_region={}, detect_region={}'.format(
    country,
    default_region,
    detect_region
))

def recognize(file_path):
    cv_output = []

    output = alpr.recognize_file(file_path)
    for plate in output['results']:
        for candidate in plate['candidates']:
            cv_output.append({
                "plate": candidate['plate'],
                "confidence": candidate['confidence']
            })

    #alpr.unload()
    return cv_output
