exports.SECRET = '5f1db90283c991962c9ff81d34aa2fd3fa016981';

exports.paymentMethodMap = {

    // "credit-card": "Credit Card", 
    // "debit-card": "Debit Card",
    "paypal": "Paypal", 
}
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // Set to 'sandbox' for testing or 'live' for production
  client_id: 'AWKLqownphob_f3hn6DQia7oFXKiIN-jG1PNqC9MPEZ2vQHrHe4TlDUJU1xz5KGPdDyhbTefacyc9P8H',
  client_secret: 'EDp-cHfOReiZKHwC1Pg5BjnVRRHOENLFuiXi2VQf5TiAfFG9w71AQC0smZSdqkL8Z6ei94C0u9X7K3lz'
});