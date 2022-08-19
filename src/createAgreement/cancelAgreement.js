const axios = require('axios')
const cancelAgreement = async (agreementID, Auth, app_key, url)=>{
    try {
        var response = await axios ({
            method:"POST",
            url:url,
            data:{
                agreementID:agreementID,
            },
            headers:{
    
                'Authorization': Auth,
                'X-APP-Key' : app_key,
            }
        })
        // console.log(response)
        return response.data
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }
}
module.exports = cancelAgreement;