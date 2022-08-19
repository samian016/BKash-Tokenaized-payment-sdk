const axios = require('axios')
const createAgreement=async(payerRefrence, callBackUrl, ammount , intent , merchantInvoiceNumber, Auth, XAppKey,uri)=>{
    // console.log({Auth});
   try {

    var response = await axios({
        method:"POST",
        url:uri,
        data:{
            mode:"0000",
            payerReference:payerRefrence,
            callbackURL: callBackUrl,
            amount:ammount,
            currency:"BDT",
            intent:intent,
            merchantInvoiceNumber:merchantInvoiceNumber,
        },
        headers:{
            'Authorization': Auth,
            'X-APP-Key' : XAppKey,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    console.log(response.data.bkashURL)
    return response.data
   }catch (error) {
    throw new Error (error)
}
}

module.exports = createAgreement;