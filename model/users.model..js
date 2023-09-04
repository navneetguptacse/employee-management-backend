var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    employeeName:{
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
    phoneNumber: {
        type:Number,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    address:{
        type: String,
        required: false,
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
        type:Date,
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
        required: false,
    },
    photo:{
        type:String,
        required: false,
    },
    pan:{
        type:String,
        required: false,
    },
    projects :{
        type: [mongoose.Schema.Types.Object],
        ref: "Project",
        required: false
    }
});

module.exports=mongoose.model('User',userSchema);

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
