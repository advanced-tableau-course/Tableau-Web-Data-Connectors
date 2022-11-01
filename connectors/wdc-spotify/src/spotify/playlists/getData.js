const getPlaylistTracks = async (token,url) => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let tracksResult = await fetch(url, requestOptions)
    if (tracksResult.ok) {
        let trackData = await tracksResult.json();
        return trackData
    } else {
        
        if (tracksResult.status == 429) {
            tableau.reportProgress('Waiting for Rate Limit')
            await new Promise(resolve => setTimeout(resolve, 5000));
            return await getPlaylistTracks(token,url)
        }
        return {}

    }

}
const getPlaylists = async (token, url = "https://api.spotify.com/v1/me/playlists?limit=50") => {
    let myHeaders = new Headers();
    let Playlists = [];
    //token=''
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    try {
        let response = await fetch(url, requestOptions);
        if (response.ok) {
            let data = await response.json();
            await Promise.all(data.items.map(async (playlist) => {
                tableau.reportProgress(`Getting Playlist ${playlist.id}`)
              
                let trackData = await getPlaylistTracks(token,playlist.tracks?.href)
                trackData.items.forEach((item) => {
                    let _playlist = {
                        playlistname: playlist.name,
                        playlistid: playlist.id,
                        playlisturi: playlist.uri,
                        playlistimage: playlist.images.find(Boolean)?.url,
                        trackalbum: item.track.album?.name,
                        trackname: item.track.name,
                        trackid: item.track.id,
                        trackadded: item.added_at,
                        trackduration: item.track.duration_ms,
                        trackimage: item.track.album?.images.find(Boolean)?.url,
                        trackalbumid: item.track?.album?.id,
                        trackAlbumName: item.track?.album?.name,
                        trackArtistId: item.track?.artists?.find(Boolean)?.id,
                        trackArtistName: item.track?.artists?.find(Boolean)?.name,


                    }

                    Playlists.push(_playlist)
                });

            }))
            let Next = data.next

            return { Playlists, Next };
        } else {
           
            if (response.status == 429) {
                tableau.reportProgress('Waiting for Rate Limit')
                await new Promise(resolve => setTimeout(resolve, 5000));
                return await getPlaylists(token, Next)
            }
            return {};

        }
    } catch (e) {
        console.log(e);
        tableau.reportProgress("oh dear")
        await new Promise(resolve => setTimeout(resolve, 100000));
        
        return {};
    }

}


const getData = async (token, table, callback) => {

    tableau.reportProgress('Getting Playlists')

    let { Playlists, Next } = await getPlaylists(token);

    table.appendRows(Playlists);
    tableau.reportProgress(Next);
    while (Next != null) {

        //await setTimeout(()=> {},1);
        ({ Playlists, Next } = await getPlaylists(token, Next));
        table.appendRows(Playlists);


    }

    callback();

}

export { getData };