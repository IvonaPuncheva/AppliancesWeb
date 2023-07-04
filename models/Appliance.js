const mongoose = require('mongoose');


const applianceSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        required: true,
    },

    image: {  
        type: String,
        required: true,
        validate: /^https?:\/\//,
    },

    price: {
        type: Number,
        minLength: 0,
        required: true
    },

    description: {
        type: String,
        required: true
     },

   //   owner: {
   //      type: mongoose.Types.ObjectId,
   //      ref: 'User',
   //   },

   //   buyers: [{
   //      type: mongoose.Types.ObjectId,
   //      ref: 'User',
   //   }]

})


const Appliance =  mongoose.model('Appliance', applianceSchema);

module.exports = Appliance;