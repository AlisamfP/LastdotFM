package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func check(err error) {
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}
}

type TopArtists struct {
	Artist []Artists `json: "topartists>artist"`
}

type Artists struct {
	Name      string `json: "name"`
	Playcount string `json: "playcount"`
}

func DownloadUrl(url string) {
	resp, err := http.Get(url)
	check(err)
	defer resp.Body.Close()
	data, err := ioutil.ReadAll(resp.Body)
	check(err)
	return data
}

func main() {
	data := DownloadUrl("http://ws.audioscrobbler.com/2.0/?format=json&api_key=8148fb40ef9511752203d2c4591e63d0&method=user.getTopArtists&user=alisatrocity")
	a := new(TopArtists)
	err := json.Unmarshal(data, a)
	check(err)
	for _, k := range a.Artist {
		fmt.Printf("Artist: %s %s\n", k.Name, k.Playcount)
	}
}
