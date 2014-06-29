import requests, simplejson

r = requests.get("http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatrocity&api_key=8148fb40ef9511752203d2c4591e63d0&format=json&limit=5")
print r.status_code
info = r.text
print info
         

