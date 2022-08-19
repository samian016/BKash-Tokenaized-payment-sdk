const axios = require('axios')
const refoundStatus = async (paymentID, trxID, Auth, appKey, url)=>{
    try {
        var response = await axios({
            method:"POST",
            url:url,
            data:{
                paymentID:paymentID,
                trxID: trxID,
            },
            headers:{
                'mode':"0001",
                Authorization: Auth,
                'X-APP-Key' : appKey,
            }
        })
        // console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error (error)
    }
}
module.exports = refoundStatus;