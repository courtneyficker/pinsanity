# Scrape info for a single pin from pinnydb.com

from requests_html import HTMLSession
import json

base = 'https://pinnydb.com/pinDetail/'
s = HTMLSession()

def scrape(pid):
    url = f'{base}{pid}'
    r = s.get(url)

    r.html.render(sleep=1, keep_page=True, scrolldown=1, timeout=20)
    infobox = r.html.find('.detail-box', first=True)

    pinfo = {}
    pinfo['name'] = infobox.find('h3', first=True).text
    print(f'Looking up info on pin #{pid}...FOUND {pinfo["name"]}')
    pinfo['info'] = infobox.find('p', first=True).text

    misc = infobox.find('.row > .right > div')

    for m in misc:
        key = m.find('b', first=True)
        if key is not None:
            key = filter(str.isalpha, key.text)
            key = "".join(key)
            value = m.find('a', first=True)
            if value is not None:
                value = value.text
            else:
                value = m.text
            pinfo[key] = value
    return pinfo


with open('pinfo.json', 'a') as f:
    for id in range(1,1321):
        json.dump(scrape(id), f)
        f.write('\n')
s.close()
