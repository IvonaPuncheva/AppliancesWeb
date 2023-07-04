const { paymentMethodMap } = require('../constants');

exports.getPaymentMethodViewData = (selectedPaymentMethod) =>{
    const paymentMethods = Object.keys(paymentMethodMap).map(key => ({ 
        value: key, 
        label: paymentMethodMap[key],
        isSelected: selectedPaymentMethod == key,
    }));

    return paymentMethods;
}