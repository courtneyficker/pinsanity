# Scrape pinnydb.com and take all their images for my own! Muhahahah!

from requests_html import HTMLSession
#import urllib.request
import csv


pg = 1
base = 'https://pinnydb.com'
url = f'{base}/?page={pg}'
s = HTMLSession()
r = s.get(url)

with open('info.txt', 'a', newline='') as f:
    wr = csv.writer(f)

    while (r.status_code == 200 and pg < 15):

        r.html.render(sleep=1, keep_page=True, scrolldown=1, timeout=20)
        boxes = r.html.find('.pinbox > a')

        for box in boxes:
            # id
            pin_id = box.attrs['href'].split('/')[-1]

            # pin name
            pname = box.find('.pinname', first=True).text

            # pin set (if there is one)
            pset = box.find('.pinset', first=True).text

            # pin image url
            purl = box.find('.thumb > img', first=True).attrs['src']
            ext = purl.split('.')[-1]
            #urllib.request.urlretrieve(f'{base}{purl}', f'{pin_id}.{ext}')
            #print(f'{base}{purl} -- ', f'{pin_id}.{ext}')
            #print(f'{pin_id}: {pname} ({base}{purl})')
            row = [pin_id, pname, pset, purl, f'{pin_id}.{ext}']
            wr.writerow(row)

        pg = pg + 1
        url = f'{base}/?page={pg}'
        r = s.get(url)
s.close()
