const TrackKeys = ['','C','C#',"D","D#","E","F","F#","G","G#", "A","A#","B"];

const getAnalysis = async (tracks, token) => {
    let myHeaders = new Headers();
    let trackString = tracks.join(',');

    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    try {
        let response = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackString}`, requestOptions);
        if (response.ok) {
            let data = await response.json();
            let track_features = data.audio_features?.map(features => {
                return {
                    trackId: features.id,
                    acousticness: features.acousticness,
                    danceability: features.danceability,
                    energy: features.energy,
                    instrumentalness: features.instrumentalness,
                    key: TrackKeys[features.key],
                    liveness: features.liveness,
                    loudness: features.loudness,
                    mode: features.mode,
                    speechiness: features.speechiness,
                    tempo: features.tempo,
                    valence: features.valence,
                }
            });
            return track_features
        } else {
            if (response.status == 429) {
                tableau.reportProgress('Waiting for Rate Limit')
                await setTimeout(() => { }, 10);
                return await getAnalysis(tracks, token)
            }
            return {};

        }
    } catch (e) {
        console.log(e);
        return {};
    }

}


const getData = async (token, table, callback) => {
    if (!table.isJoinFiltered) {
        tableau.abortWithError("The table must be filtered first.");
        return;
    }
    tableau.reportProgress('Getting Track Analysis')
    let filterValues = table.filterValues;



    const result = filterValues.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 100)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])

    await Promise.all(result.map(async tracksSet => {
        let tracks = await getAnalysis(tracksSet, token);
        table.appendRows(tracks);
        return;

    }))




    callback();

}

export { getData };