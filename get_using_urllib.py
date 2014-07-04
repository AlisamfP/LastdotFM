import urllib2, json

data = urllib2.urlopen('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatrocity&api_key=8148fb40ef9511752203d2c4591e63d0&format=json&limit=5')

info = data.read()
print info.loads()
data.close()
