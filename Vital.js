const mongoose = require('mongoose');


const VitalSchema = new mongoose.Schema({
    
    
    pid :{
        type : String,
        
        
    },

    muscle_strength :{
        type : String,
        
        
    },
    
    date :{
        type : String,
        
        
    },

    user:{ type: mongoose.Schema.Types.ObjectId, ref:"User"}
  
    
});




module.exports = mongoose.model('Vital',VitalSchema);