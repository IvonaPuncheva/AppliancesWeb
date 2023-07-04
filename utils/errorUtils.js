const mongoose = require('mongoose');

function getErrorMessage(error){
   const firstError = Object.values(error.errors)[0].message;

   return firstError;
}


exports.getErrorMessage = (error) =>{
    switch (error.name) {
        case 'Error':
            return error.message;
        case 'ValidationError':
            return getErrorMessage(error)
    
        default:
            return error.message
    }
}