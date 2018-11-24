def write_picture_to_file(img_data, path):
    with open(path, 'wb') as img_file:
        img_file.write(img_data)
