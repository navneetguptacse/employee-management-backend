var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    empName:{
        type:String,
        required: true,
    },
    dob:{
        type:Date,
        required: true,
    },
    username:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    pwd:{
        type:String,
        required: true,
    },
    addr:{
        type: String,
        required: true,
    },
    salary:{
        type: Number,
        required: false,
    },
    tasks:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Task',
        required: false, 
    },
    createdAt:{
        default:new Date(),
        type:Boolean,
        required: false,
    },
    isDeleted:{
        type:Boolean,
        required: false,
    },
    isDisabled:{
        type:Boolean,
        default:false,
    },
    isVerified: {
        type:Boolean,
        default:false,
    }, 
    aadhar:{
        type:String, // file -> backend (->folder) -> uid -> store_in_database (type: String)
        required: true,
    },
    photo:{
        type:String, // file -> backend (->folder | s3 aws bucket) -> uid -> store_in_database (type: String)
        required: true,
    },
    pan:{
        type:String,
        required: true,
    },
    projects :{
        type: Array
    }
});

