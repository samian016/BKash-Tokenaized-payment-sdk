const axios = require('axios')
const executeAgreement = async(ID, Auth, app_key, url)=>{
    // console.log(ID,Auth)
   try {
    var response = await axios({
        method:"POST",
        url:url,
        data:{
            paymentID: ID,
        },
        headers:{
            'Authorization': Auth,
            'X-APP-Key' : app_key,
        }

    })
    // console.log(response.data)
    return response.data
   } catch (error) {
    throw new Error (error)
}
}
module.exports = executeAgreement;