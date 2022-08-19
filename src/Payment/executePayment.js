const axios = require('axios')

const executePayment = async (paymentID,auth,appKey,url)=>{
    // console.log(paymentID)
    try {
        var response = await axios({
            method:"POST",
            url:url,
            data:{
                paymentID:paymentID,
            },
            headers:{
                Authorization: auth,
                'X-APP-Key' : appKey,
            }
        })
        console.log(response);
        return(response.data)
    }catch (error) {
        throw new Error (error)
    }
    }

    module.exports = executePayment;