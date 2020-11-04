import os
import zipfile
from zipfile import ZIP_STORED

zip = zipfile.ZipFile('python.zip', mode='w', compression=ZIP_STORED, allowZip64=True)
for root, dirs, files in os.walk('./package'):
    for file in files:
        zip.write(os.path.join(root, file))

zip.close()
print('Successfully packaged dependencies')