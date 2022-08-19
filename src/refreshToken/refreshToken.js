const axios = require('axios')
const reFreshToken = async (username, password, app_key,app_secret,rToken, uri) => {
    try {
        var res = await axios({
            method: "POST",
            url: uri,
            data: {
                app_key: app_key,
                app_secret: app_secret,
                refresh_token: rToken,
            },
            headers: {
                username: username,
                password: password,
            }
        })
        return res.data;
    } catch (error) {
        console.log(error.message);
        return error.message;
    }
}
module.exports = reFreshToken;