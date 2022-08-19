const axios = require('axios')
const queryAgreement = async (agreementID, Auth, appKey, url)=>{
    try {
        var response = await axios ({
            method: "POST",
            url:url,
            data:{
                agreementID:agreementID,
            },
            headers:{
    
                'Authorization': Auth,
                'X-APP-Key' : appKey,
            }
        })
        // console.log(response.data)
        return response.data
    }catch (error) {
        throw new Error (error)
    }
    }
    module.exports = queryAgreement