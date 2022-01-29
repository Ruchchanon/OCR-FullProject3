const mongoose = require('mongoose');


const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    pic: {
        type: String
    },
    dateFirst: {
        type: Date,
        default: Date.now
    },
    numTo: {
        type: Number
        
    },
    locate: {
        type: String
        
    },
    dateGen: {
        type: Date
    
    },
    from: {
        type: String
      
    },
    to: {
        type: String,
        
    },
    date: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true});

module.exports = Person = mongoose.model('person', PersonSchema);