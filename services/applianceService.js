const Appliance = require('../models/Appliance');


exports.getAll = () => Appliance.find({});

exports.getOne = (appliancesId) => Appliance.findById(appliancesId).lean();

exports.search = async (name, paymentMethod) =>{
    let appliance = await this.getAll().lean();

    if(name){
        appliance = appliance.filter(x => x.name.toLowerCase() == name.toLowerCase())
    }

    if(paymentMethod){
        appliance = appliance.filter(x => x.paymentMethod == paymentMethod)
    }

    return appliance;

}

exports.buy = async (userId, applianceId) => {

    //  Using mongodb ->>>
    //   Appliance.findByIdAndUpdate(applianceId, { $push: { buyers: userId } })

    // Using mongoose ->>>
    const appliance = await Appliance.findById(applianceId);
    appliance.buyers.push(userId);
   return appliance.save();
   


} 

exports.create = (ownerId, applianceData) => Appliance.create({ ...applianceData, owner: ownerId });

exports.edit = (applianceId, applianceData) => Appliance.findByIdAndUpdate(applianceId, applianceData, {runValidators: true});

exports.delete = (applianceId) => Appliance.findByIdAndDelete(applianceId);