# Mass-download images from pinnydb

from genericpath import exists
from logging import warn
import urllib.request as r
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

base_url = 'https://pinnydb.com'

#filename = 'test.txt'
filename = 'info.txt'

with open(filename) as f:
    for line in f:
        imgurl = f'{base_url}{line.split(",")[3]}'
        imgfn = line.split(',')[-1].strip()
        if not exists(f'img/{imgfn}'):
            try:
                r.urlretrieve(imgurl,f'img/{imgfn}')
            except:
                warn(f'Failed for this file: {imgfn}')
