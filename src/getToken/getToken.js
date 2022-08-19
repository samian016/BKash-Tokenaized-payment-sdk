const axios = require('axios')
const getToken = async (userName, password, app_key, app_secret, url) => {
    try {
        var res = await axios({
            method: "POST",
            url: url,
            data: {
                app_key: app_key,
                app_secret: app_secret,
            },
            headers: {
                username: userName,
                password: password,
            }

        })
        // console.log(res.data)
        return res.data;
    } catch (error) {
        throw new Error (error)
    }

}

module.exports = getToken;