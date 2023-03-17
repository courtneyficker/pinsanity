# Scrape info for a single pin from pinnydb.com

from requests_html import HTMLSession
import json

base = 'https://pinnydb.com/'
s = HTMLSession()
filePath = '../src/lib/pinfo_test.json'

fileCount = 0

def checkWebLatest():
    r = s.get(base)
    r.html.render(sleep=1, keep_page=True, scrolldown=1, timeout=40)
    boxes = r.html.find('.pinbox > a')
    pin_id = boxes[0].attrs['href'].split('/')[-1]

    print("Newest ID on website:", pin_id)
    return int(pin_id)

def checkFileLatest():
    try:
        global fileCount
        with open(filePath, 'r') as f:
            fileCount = json.load(f)["count"]
        print("Last ID in file:", fileCount)
        return fileCount
    except FileNotFoundError:
        print("File does not exist. Full update incoming.")
        return 0

def scrape(pid):
    success = False

    url = f'{base}pinDetail/{pid}'
    r = s.get(url)

    pinfo = {}
    while (not success):
        r.html.render(sleep=1, keep_page=True, scrolldown=1, timeout=40)
        infobox = r.html.find('.detail-box', first=True)

        pinfo['id'] = pid
        if (pinfo['id'] == ""):
            print("Failed...trying again")
        else:
            success = True
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
            
            # Remove redundant "Release Date: " from ReleaseDate
            if key == "ReleaseDate":
                value = value.split(': ')[-1]
            pinfo[key] = value
    return pinfo

def checkUpdateNeeded():
    print("Checking if update is required...")
    local = checkFileLatest()
    web = checkWebLatest()

    if (web > local):
        print("Update needed!")
        return local, web
    print("Currently up to date")
    return 0,0

def update(start,end):
    # Build list of new pins (each a dict)
    newPins = []
    for id in range(start,end):
        pin = scrape(id)    # dict
        newPins.append(pin)
    newCount = len(newPins)
    
    # Now grab our current list
    try:
        with open(filePath, 'r') as f:
            previousPins = json.load(f)['pins']
            oldCount = fileCount
    except FileNotFoundError:
        previousPins = []
        oldCount = 0

    # Now combine them
    combinedTotal = oldCount + newCount
    newPinsList = previousPins + newPins

    print(f'Created a list of {oldCount}+{newCount}={combinedTotal} items.')
    # print(newPinsList)

    newFile = {
        "count": combinedTotal,
        "pins": newPinsList
    }

    #Update file
    with open(filePath, 'w') as f:
        json.dump(newFile, f, indent=4)

if __name__ == "__main__":
    start, end = checkUpdateNeeded()
    if (end == 0):
        print("Exiting")
        exit()
    
    # Overwriting start/end for testing purposes
    if (False):  ## Change to True for testing
        start, end = 2, 4   # Grab specific pins (+1s applied in loop)
    print(f'Updating pins from {start+1} to {end}')

    update(start+1, end+1)
    
s.close()
