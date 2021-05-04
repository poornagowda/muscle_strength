const mongoose = require('mongoose');


const MonthSchema = new mongoose.Schema({
    
    
    month :{
        type : String,
        
        
    },

    value :{
        type : String,
        
        
    }
  
    
});




module.exports = mongoose.model('month_detail',MonthSchema);