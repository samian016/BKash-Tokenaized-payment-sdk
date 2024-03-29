const getToken = require('./getToken/getToken')
const reFreshToken = require('./refreshToken/refreshToken')
const createAgreement = require('./createAgreement/createAgreement')
const executeAgreement = require('./createAgreement/executeAgreement')
const queryAgreement = require('./createAgreement/queryAgreement')
const cancelAgreement = require('./createAgreement/cancelAgreement')
const createPayment = require('./Payment/createPayment')
const executePayment = require('./Payment/executePayment')
const queryPayment = require('./Payment/querypayment')
const searchTransection = require('./transection/searchTransection')
const refound = require('./transection/refound')
const refoundStatus = require('./transection/refoundStatus')


const BKASH_SANDBOX_GATEWAY = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout";
const BKASH_LIVE_GATEWAY = "https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout";
const BKASH_GRANT_TOKEN_URI = "/token/grant";
const BKASH_REFRESH_TOKEN_URI = "/token/refresh";
const BKASH_CREATE_AGREEMENT_URI = "/create";
const BKASH_EXECUTE_AGREEMENT_URI = "/execute";
const BKASH_QUERY_AGREEMENT_URI = "/agreement/status";
const BKASH_CANCEL_AGREEMENT_URI = "/agreement/cancel";
const BKASH_CREATE_PAYMENT_URI = "/create";
const BKASH_EXECUTE_PAYMENT_URI = "/execute";
const BKASH_QUERY_PAYMENT_URI = "/payment/status";
const BKASH_SEARCH_TRXN_URI = "/general/searchTransaction";
const BKASH_REFUND_URI = "/payment/refund";


const bKash = async (userName, password, app_key, app_secret, sandBox = true) => {
    const BASE_URL = sandBox ? BKASH_SANDBOX_GATEWAY : BKASH_LIVE_GATEWAY;
    app_key = app_key;
    app_secret = app_secret;

    getToken(userName, password, app_key, app_secret, BASE_URL + BKASH_GRANT_TOKEN_URI)
        .then((data) => {
            this.token_type = data.token_type;
            this.expires_in = data.expires_in;
            this.id_token = data.id_token;
            this.refresh_token = data.refresh_token;
        })

    setInterval(() => {
        reFreshToken(userName, password, app_key, app_secret, this.refresh_token, BASE_URL + BKASH_REFRESH_TOKEN_URI).then((data) => {
            this.id_token = data.id_token;
            this.refresh_token = data.refresh_token;
            this.expires_in = data.expires_in;
        })
    }, this.expires_in - 3000000)

    const agreementCreate = async (payerRefrence, callBackUrl, ammount, intent, merchantInvoiceNumber) => {
        var response = await createAgreement(payerRefrence, callBackUrl, ammount, intent, merchantInvoiceNumber, this.id_token, app_key, BASE_URL + BKASH_CREATE_AGREEMENT_URI);
        return response;
    }

    const agreementExecution = async (paymentID) => {
        var response = await executeAgreement(paymentID, this.id_token, app_key, BASE_URL + BKASH_EXECUTE_AGREEMENT_URI)
        return response;
    }
    const agreementQuery = async (agreementID) => {
        var response = await queryAgreement(agreementID, this.id_token, app_key, BASE_URL + BKASH_QUERY_AGREEMENT_URI)
        return response;
    }
    const agreementCancelation = async (agreementID) => {
        var response = await cancelAgreement(agreementID, this.id_token, app_key, BASE_URL + BKASH_CANCEL_AGREEMENT_URI)
        return response;
    }

    const paymentCreate = async (payerReference, callbackURL, agreementID, amount, intent, merchantInvoiceNumber, merchantAssociationInfo) => {
        var response = await createPayment(payerReference, callbackURL, agreementID, this.id_token, app_key, amount, intent, merchantInvoiceNumber, merchantAssociationInfo, BASE_URL + BKASH_CREATE_PAYMENT_URI)
        return response;
    }

    const paymentExecution = async (paymentID) => {
        var response = await executePayment(paymentID, this.id_token, app_key, BASE_URL + BKASH_EXECUTE_PAYMENT_URI)
        return response;
    }

    const paymentQuery = async (paymentID) => {
        var response = await queryPayment(paymentID, this.id_token, app_key, BASE_URL + BKASH_QUERY_PAYMENT_URI)
        return response;
    }

    const paymentSearch = async (trxID) => {
        var response = await searchTransection(trxID, this.id_token, app_key, BASE_URL + BKASH_SEARCH_TRXN_URI)
        return response;
    }
    const refoundTrxID = async (paymentID, amount, trxID, sku, reason) => {
        var response = await refound(paymentID, amount, trxID, sku, reason, this.id_token, app_key, BASE_URL + BKASH_REFUND_URI);
        return response;
    }

    const statusRefund = async (paymentID, trxID) => {
        var response = await refoundStatus(paymentID, trxID, this.id_token, app_key, BASE_URL + BKASH_REFUND_URI);
        return response;
    }

    return {
        agreementCreate,
        agreementExecution,
        agreementQuery,
        agreementCancelation,
        paymentCreate,
        paymentExecution,
        paymentQuery,
        paymentSearch,
        refoundTrxID,
        statusRefund
    }
}

module.exports = bKash;

