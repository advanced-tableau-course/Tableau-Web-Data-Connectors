export const GetTokenFromCode = async (code)=> {
    var details = {
        code: code,
        redirect_uri: "http://localhost:5173/token",
        grant_type: 'authorization_code'
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log("now requesting token")
    try {
    var result =  await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic ' + (window.btoa('edbc94f7d20a44a59c8b7734bf90c8ed' + ':' + '726ea504da0443198dde05d9ebe647dc')),
        },
        redirect: 'follow',
        body: formBody

    })
    var values = await result.json();
    return values.refresh_token;

} catch(error) {
    console.log(error)
    console.log("Something went very wrong")
}
}

