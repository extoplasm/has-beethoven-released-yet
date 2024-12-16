require('dotenv').config()

const client_id = 'f7cc034a90a04e18ab3a3e9b30b89e05';
const client_secret = process.env.SECRET;

async function getToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
        },
    });

    if (!response.ok) {
        throw new Error(`error: ${response.status}`);
    }

    return response.json()
}

async function getLatestAlbum(access_token) {
    const response = await fetch('https://api.spotify.com/v1/artists/2wOqMjp9TyABvtHdOSOTUS/albums?include_groups=album%2Csingle&market=US&limit=1', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
    })

    if (!response.ok) {
        throw new Error(`error: ${album.status}`);
    }

    return response.json()
}

getToken().then(response => {
    getLatestAlbum(response.access_token).then(album => {
        console.log(album)
    }).catch((err) => { console.log(err); });
}).catch((err) => { console.log(err); });
