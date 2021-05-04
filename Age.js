const mongoose = require('mongoose');


const AgeSchema = new mongoose.Schema({
    
    
    age_grp :{
        type : String,
        
        
    },

    value :{
        type : String,
        
        
    }
  
    
});




module.exports = mongoose.model('age_detail',AgeSchema);