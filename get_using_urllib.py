import urllib2

data = urllib2.urlopen('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatocity&api_key=8148fb40ef9511752203d2c4591e63d0')

print data.getcode()
data.close()
