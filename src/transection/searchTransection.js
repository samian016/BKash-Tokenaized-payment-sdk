const axios = require('axios')
const searchTransection = async (trxID, Auth, app_key, url)=>{
    try {
        var response = await axios ({
            method:"POST",
            url:url,
            data:{
                trxID:trxID,
            },
            headers:{
                Authorization: Auth,
                'X-APP-Key' : app_key,
            }
        })
        // console.log(response.data)
        return response.data
    } catch (error) {
        throw new Error (error)
    }
}

module.exports = searchTransection;