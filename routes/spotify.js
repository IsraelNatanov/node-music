const { application } = require("express");
const express = require("express");

var SpotifyWebApi = require('spotify-web-api-node');
const { AlbumModel } = require("../models/albumModel");
const { ArtistModel } = require("../models/artistsModel");
const { PlylistSpotifyModel } = require("../models/plylistSpotifyModel");
const { TrackModel } = require("../models/trackModel");
const { TracksSpotufyPlModel } = require("../models/tracksSpotufyPlModel");
const router = express.Router();



// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: 'ec589991f1b244fe850b466055d3dfca',
    clientSecret: 'f68026e4316e41c388b87c3b7d5c2af4',
    redirectUri: 'http://localhost:9000/callback'
});

const t = "BQColBrRJElDIcU2zr-LhHAWucH2yPtsCOAxRFbD-SaMhaozoRD6IKaCeCH48SKi2UWL5ctaUlHpSxc2CBHrAOTOHTmUV5oZrWmyVatkG8F5MUBi_6EatIMi08-e2KAP1z1F_SRaEy-s9OchWDHcnHZQZr-wD1euqai4gN1r36FNfdwWwdAR3XdkCfiy8aC1_k0ZGMxlKJVO3_uPojTTqzJwaD4WSR2q7lyvZAjKN2nON8k5bwy8KRzrfAvAQf2BTEn8ghIg-qp0QxBbZXC3tFRAGdZsE1GmhCL3vD-x5bn9aakQxmmVWHe1SK4k5gFRKCujdp8bNRCyWlv2Kw"
router.get('/', (req, res, next) => {
    res.redirect(spotifyApi.createAuthorizeURL([
        "ugc-image-upload",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "app-remote-control",
        "playlist-modify-public",
        "user-read-playback-state",
        "playlist-modify-private",
        "user-library-modify",
        "user-read-currently-playing",
        "user-follow-read",
        "user-library-read",
        "user-read-playback-position",
        "playlist-read-private",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "playlist-read-collaborative",
        "streaming"

    ]))
})
router.get('/callback', (req, res, next) => {
    console.log('reqquery', req.query)
    const code = req.query.code
        // console.log(code)
        // res.send(JSON.stringify(req.query))
    spotifyApi.authorizationCodeGrant(req.query.code).then((response) => {
        // token = response.body.access_token;

        // t = response.body.access_token;

        console.log(response.body.access_token)
        res.send(JSON.stringify(response))

    })
})

spotifyApi.setAccessToken(t)


const getMy = () => {
        spotifyApi.getMe()
            .then(function(data) {
                console.log('Some information about the authenticated user', data.body);
            }, function(err) {
                console.log('Something went wrong!', err);
            });

    }
    // getMy()
const getPlylistTracks = async() => {
        await spotifyApi.getUserPlaylists("2yrw48m3kx7za8dhnrhbnhxo8")
            .then(async function(dat) {
                for (let i = 0; i < dat.body.items.length; i++) {
                    const id = dat.body.items[i]['id'];
                    const data = await spotifyApi.getPlaylistTracks(id)
                        .then(async function(data) {
                            for (let j = 0; j < data.body.items.length; j++) {

                                const post = new TracksSpotufyPlModel({
                                    id: data.body.items[j].track['id'],
                                    id_plylist: dat.body.items[i]['id'],
                                    name: data.body.items[j].track['name'],
                                    images: data.body.items[j].track.album['images'][0].url,

                                    preview_url: data.body.items[j].track['preview_url'],
                                    name_artist: data.body.items[j].track['artists'][0].name,

                                    // name: data.body.items[i].track['name'],
                                    popularity: data.body.items[j].track['popularity'],

                                })
                                await post.save()


                            }

                        }, function(err) {
                            console.error(err);
                        });
                }
            })
    }
    // getPlylistTracks()
const getPlylist = async() => {
        const data = await spotifyApi.getUserPlaylists("2yrw48m3kx7za8dhnrhbnhxo8")
            .then(function(data) {
                for (let i = 0; i < data.body.items.length; i++) {
                    const post = new PlylistSpotifyModel({
                        id: data.body.items[i]['id'],
                        images: data.body.items[i]['images'][0].url,
                        name: data.body.items[i]['name'],
                        total: data.body.items[i].tracks['total'],
                    })
                    post.save()

                }
                console.log('Artists information', data);
            }, function(err) {
                console.error(err);
            });
    }
    // getPlylist()
const searchArtists = async() => {
        const artists = await spotifyApi.searchArtists("חיים ישראל")
        console.log('artist', artists)
            // console.log("bil", artists.body.artists.items[0])
    }
    // searchArtists()

const getArtistss = async() => {
        const artistss = await spotifyApi.getArtists(['70287pcNpILjcpoBl0soPs', '54HicbsQOHeibnnFCMtLwl', '5eVh2c6WuigJCj1WrHfnd5', '5GCh3ZazIVWg8eKb5Akv0q', '3VTm1513t2LL1mSKzzyQuj', '0NLEL3BBW71Oshh5R7wpJl', '3Y0YvS2crBLVS9eA5jX8Ux', '5H64fYkQmqjX0bS4bplq8F', '0kF5nmRrCc9oZpAkVbWaUt', '4aTDB7CQyMNOLQsCpAS9EW'])
            .then(function(data) {
                for (let i = 0; i < data.body.artists.length; i++) {
                    const post = new ArtistModel({
                        id: data.body.artists[i]['id'],
                        images: data.body.artists[i]['images'][0].url,
                        name: data.body.artists[i]['name'],
                        popularity: data.body.artists[i]['popularity'],
                    })
                    post.save()

                }
                console.log('Artists information', data);
            }, function(err) {
                console.error(err);
            });
    }
    // getArtistss()
const getArtistAlbumss = async() => {
    const artistss = await spotifyApi.getArtists(['70287pcNpILjcpoBl0soPs', '54HicbsQOHeibnnFCMtLwl', '5eVh2c6WuigJCj1WrHfnd5', '5GCh3ZazIVWg8eKb5Akv0q', '3VTm1513t2LL1mSKzzyQuj', '0NLEL3BBW71Oshh5R7wpJl', '3Y0YvS2crBLVS9eA5jX8Ux', '5H64fYkQmqjX0bS4bplq8F', '0kF5nmRrCc9oZpAkVbWaUt', '4aTDB7CQyMNOLQsCpAS9EW'])
        .then(async function(data) {
                for (let i = 0; i < 10; i++) {
                    let id = data.body.artists[i]['id'];
                    const albums = await spotifyApi.getArtistAlbums(id)
                        .then(async function(dat) {
                            console.log(dat);
                            for (let j = 0; j < 20; j++) {
                                const post = new AlbumModel({
                                    id_artist: data.body.artists[i]['id'],
                                    id: dat.body.items[j]['id'],
                                    images: dat.body.items[j]['images'][0].url,
                                    name: dat.body.items[j]['name'],

                                })
                                await post.save()
                                    // console.log(dat.body.items[i])
                            }


                        }, function(err) {
                            console.error(err);
                        });
                }
            }


        )
}

// getArtistAlbumss()
const getAlbumTrackss = async() => {
    const artistss = await spotifyApi.getArtists(['70287pcNpILjcpoBl0soPs', '54HicbsQOHeibnnFCMtLwl', '5eVh2c6WuigJCj1WrHfnd5', '5GCh3ZazIVWg8eKb5Akv0q', '3VTm1513t2LL1mSKzzyQuj', '0NLEL3BBW71Oshh5R7wpJl', '3Y0YvS2crBLVS9eA5jX8Ux', '5H64fYkQmqjX0bS4bplq8F', '0kF5nmRrCc9oZpAkVbWaUt', '4aTDB7CQyMNOLQsCpAS9EW'])
        .then(async function(data) {
            for (let i = 0; i < 10; i++) {
                let id_artist = data.body.artists[i]['id'];
                const albums = await spotifyApi.getArtistAlbums(id_artist)
                    .then(async function(dat) {
                        // console.log(dat);
                        for (let j = 0; j < 20; j++) {
                            let id_album = dat.body.items[j]['id'];
                            const tracks = await spotifyApi.getAlbumTracks(id_album)
                                .then(async function(da) {
                                    for (let y = 0; y < da.body.items.length; y++) {
                                        const post = new TrackModel({
                                            id_artist: data.body.artists[i]['id'],
                                            id_album: dat.body.items[j]['id'],
                                            id: da.body.items[y]['id'],
                                            images: dat.body.items[j]['images'][0].url,
                                            name: da.body.items[y]['name'],
                                            preview_url: da.body.items[y]['preview_url'],


                                        })
                                        await post.save()
                                    }
                                    // console.log(da);
                                }, function(err) {
                                    console.log('Something went wrong!', err);
                                });
                        }
                    })
            }
        })
}

// getAlbumTrackss()
module.exports = router;