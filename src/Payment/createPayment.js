const axios = require('axios')
const createPayment = async (payerReference, callbackURL,agreementID, Auth, appKey,amount,intent,merchantInvoiceNumber,merchantAssociationInfo, url)=> {
    // console.log(agreementID,"sds")
    try {
        var response = await axios({
            method: "POST",
            url:url,
            data:{
                mode:"0001",
                payerReference:payerReference,
                callbackURL:callbackURL,
                agreementID:agreementID,
                amount:amount,
                currency:"BDT",
                intent:intent,
                merchantInvoiceNumber:merchantInvoiceNumber,
                merchantAssociationInfo:merchantAssociationInfo,
            },
            headers:{
                Authorization:Auth,
                'X-App-Key':appKey
            }
        })
        console.log(response.data.bkashURL)
        return response.data
    }catch (error) {
        throw new Error (error)
    }
}
module.exports = createPayment;