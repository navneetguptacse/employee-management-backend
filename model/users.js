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
        type:String, 
        required: true,
    },
    photo:{
        type:String,
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

/* 
    Image Storage Strategy:
     
    To store the image associated with this Aadhar number, you have two options:
    
    1. Using a Bucket (e.g., AWS S3):
    - You can store the image in a cloud storage bucket (e.g., AWS S3) and
        save the URL or key to access the image in this field.
    
    2. Using Multer and Local Storage:
    - You can use a library like Multer to handle file uploads.
    - Store the uploaded image in a designated folder on your server.
    - You can then use the file's unique ID or name to reference it in this field.
    
    Make sure to implement the chosen storage strategy accordingly.
    
*/

module.exports=mongoose.model('User',userSchema);