
import json

import requests
from bs4 import BeautifulSoup

import sys

config = {}

classes = ["6b"]

base_url = "http://vertretungsplan.jhg-blaubeuren.de/schueler"
home_url = "Ver_Kla_1.htm"

# bs4 find_all filter methods

def is_tag_relevant(tag):
    if not str(tag.name).lower() == "a":
        return False
    
    if not str(tag.text).lower() in classes:
        return False

    return True

def is_table_relevant(tag):
    if not str(tag.name).lower() == "table":
        return False
    
    if tag.get("bgcolor") == None or not str(tag.get("bgcolor")).lower() == "#e7e7e7":
        return False

    return True

# main methods

def getVertretungen():
    '''
    main method to get vertretungen
    '''
    page = requests.get("/".join([base_url, home_url]))    

    soup = BeautifulSoup(page.content, features="lxml")

    relevant_tags = soup.find_all(is_tag_relevant)
    #print(relevant_tags)

    vertretungen = {}
    if len(relevant_tags) == 0:
        for c in classes:
            vertretungen[c] = "Keine Vertretungen"

    for relevant_tag in relevant_tags:
        vertretung_soup = _loadVertretung(relevant_tag)
        vertretungen[str(relevant_tag.text).lower()] = _getVertretung(vertretung_soup)

    return vertretungen, json.dumps(vertretungen)



def _loadVertretung(tag):
    vertretungs_url =  "/".join([base_url, tag["href"]])
    page = requests.get(vertretungs_url)
    soup = BeautifulSoup(page.content)
    
    return soup

def _getVertretung(soup):
    tag = soup.find_all(is_table_relevant)[0]

    rows = tag.find_all("tr")

    if len(rows) == 0:
        return {}

    vertretungen = []
    keys = rows[0]
    for row in rows[1:]:
        vertretung = {}
        items = row.find_all("td")
        #for i, item in enumerate(items):
        #    vertretung[keys[i]] = item.text
        
        vertretungen.append(vertretung)


    #items = tag.find_all("tr")
    #vertretungen = []
    #for item in items:
    #    s = _cleanString(str(item.text))
    #    if len(s) > 0:
    #        vertretungen.append(str(s))

    return keys

def _cleanString(string):
    return string.replace("\n", "").replace("\r", "").replace("\xa0", "").strip()

# node_helper is invoking the script
if __name__ == "__main__":
    classes = [sys.argv[1]]
    base_url = sys.argv[2]
    home_url = sys.argv[3]

    #print(classes, base_url, home_url)

    print(getVertretungen()[1], end="")

    sys.stdout.flush()