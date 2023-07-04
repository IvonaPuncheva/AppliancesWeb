const Appliance = require('../models/Appliance');


exports.getAll = () => Appliance.find({});

exports.getOne = (cryptoId) => Appliance.findById(cryptoId).lean();

exports.search = async (name, paymentMethod) =>{
    let crypto = await this.getAll().lean();

    if(name){
        crypto = crypto.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }

    if(paymentMethod){
        crypto = crypto.filter(x => x.paymentMethod == paymentMethod)
    }

    return crypto;

}

exports.buy = async (userId, cryptoId) => {

    //  Using mongodb ->>>
    //   Crypto.findByIdAndUpdate(cryptoId, { $push: { buyers: userId } })

    // Using mongoose ->>>
    const crypto = await Appliance.findById(cryptoId);
    crypto.buyers.push(userId);
   return crypto.save();
   


} 

exports.create = (ownerId, cryptoData) => Appliance.create({ ...cryptoData, owner: ownerId });

exports.edit = (cryptoId, cryptoData) => Appliance.findByIdAndUpdate(cryptoId, cryptoData, {runValidators: true});

exports.delete = (cryptoId) => Appliance.findByIdAndDelete(cryptoId)