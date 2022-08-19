const axios = require('axios')
const queryPayment = async (paymentID, Auth, app_key, url)=>{
    try {
        var response = await axios({
            method:"POST",
            url:url,
            data:{
                paymentID: paymentID,
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
module.exports = queryPayment;