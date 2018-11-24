from openalpr import Alpr

alpr = Alpr("eu", "/etc/openalpr/openalpr.conf", "/usr/share/openalpr/runtime_data")
alpr.set_top_n(5)

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
