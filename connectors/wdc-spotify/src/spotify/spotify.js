const RefreshSpotifyToken = async (refesh_token) => {

    var details = {
  
        refresh_token: refesh_token,
        grant_type: 'refresh_token'
    };
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    try {
        var result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Basic ' + (window.btoa('edbc94f7d20a44a59c8b7734bf90c8ed' + ':' + '726ea504da0443198dde05d9ebe647dc')),
            },
            body: formBody
  
        })
        //tableau.reportProgress('Got Token')
        var data = await result.json();
        return data.access_token;
    }
    catch {
        console.log('Error')
    }
  }
  export {
    RefreshSpotifyToken
  }