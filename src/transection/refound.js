const axios = require('axios')
const refound= async (paymentID, amount, trxID, sku, reason,Auth,app_key,url)=>{
    try {
        var response = await axios({
            method:"POST",
            url:url,
            data:{
                paymentID:paymentID,
                trxID: trxID,
                reason: reason,
                amount:amount,
                sku:sku,
            },
            headers:{
                Authorization: Auth,
                'X-APP-Key' : app_key,
            }
        })
        // console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error (error)
    }
}
module.exports = refound;