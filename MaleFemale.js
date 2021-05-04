const mongoose = require('mongoose');


const MaleFemaleSchema = new mongoose.Schema({
    
    
    gender :{
        type : String,
        
        
    },

    value :{
        type : String,
        
        
    }
  
    
});




module.exports = mongoose.model('male_female',MaleFemaleSchema);