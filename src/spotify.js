import 'dotenv/config';

const client_id = 'f7cc034a90a04e18ab3a3e9b30b89e05';
const client_secret = process.env.SECRET;
let token;
let validUntil;

/**
 * @return {string} A newly fetched token OR a token that should still be valid
 */
export async function getToken() {
    if (!token || !validUntil || Date.now() > validUntil) {
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
    	
    	json = await response.json();
    	token = json.access_token;
    	validUntil = Date.now() + (json.expires_in * 1000);
    }
    
    return token;
}

export async function getLatestAlbum(access_token) {
    // get singles cuz the albums are a bunch of different artists and stuff i think
    const response = await fetch('https://api.spotify.com/v1/artists/2wOqMjp9TyABvtHdOSOTUS/albums?include_groups=single&market=AU&limit=1', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
    })

    if (!response.ok) {
        throw new Error(`error: ${album.status}`);
    }

    return response.json()
}

export function isWithinThirtyDays(date) {
    const thirtyDaysAgo = new Date();
    // yea this is a bit confusing, it just sets the thirtydaysago date (which is the current date) to itself but thirty days ago iykwim
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); 

    return date >= thirtyDaysAgo
}
