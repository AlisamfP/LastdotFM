import sys, requests, simplejson

r = requests.get("http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=alisatrocity&api_key=8148fb40ef9511752203d2c4591e63d0&format=json&limit=10")
info = simplejson.loads(r.text)
def get_artists(data):
    index = 1
    for item in data["topartists"]["artist"]:
        print "%s: %s\nPlay count: %s\n" % (index, item["name"], item["playcount"])
        index+=1

print "User: %s\n" % (info["topartists"]["@attr"]["user"])
get_artists(info)
