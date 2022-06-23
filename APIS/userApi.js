// create router to handle user api reqs
const exp = require('express');
const userApp=exp.Router();
const expressAsyncHandler=require("express-async-handler")
// import bcryptjs for password hasing 
const bcryptjs=require("bcryptjs");
// import jsonwebtoken to create token
const jwt=require("jsonwebtoken")
require("dotenv").config()


var cloudinary =require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const multer = require("multer");

// configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
    secure: true,  
});

// config cloudinary storage
const cloudinarystorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:async(req,file) =>{
        return{
            folder:"flipkart",
            public_id: file.fieldname + "-" + Date.now(),
        };
    },
});


// configure multer
var upload = multer({storage: cloudinarystorage});

// to extract body of request object
userApp.use(exp.json());


// create a middleware
// const middleware1=(request,response,next)=>{
    
//     console.log("Middleware-1 executed");
    
//     // respose.send("Unatuhorized request")
//     // forward request to next
//     next()
// }

// // create a middleware
// const middleware2=(request,response,next)=>{
    
//     console.log("Middleware-2 executed");
    
//     // respose.send("Unatuhorized request")
//     // forward request to next
//     next()
// }

// const middleware3=(request,response,next)=>{
    
//     console.log("Middleware-3 executed");
    
//     // respose.send("Unatuhorized request")
//     // forward request to next
//     next()
// }

// const middleware4=(request,response,next)=>{
    
//     console.log("Middleware-4 executed");
    
//     // response.send("Unatuhorized request")
//     // forward request to next
//     next()
// }

// use middleware1 for each req
// app.use(middleware1)
// app.use(middleware2)
// app.use(middleware3)
// app.use(middleware4)


// let users=[
//     {
//         id:3,
//         name:'Rohan',
//         age:18
//     },
//     {
//         id:4,
//         name:'pep',
//         age:22
//     }
// ]




userApp.get('/getusers',/*middleware1,middleware2,middleware3*/expressAsyncHandler(async(request,response)=>{
    // response.send({message:"all users",payload:users});


    // get usercolllectionObject
    let userCollectionObject=request.app.get("userCollectionObject");
    // get all users
    let users=await userCollectionObject.find().toArray()
    // send res
    response.send({message:"User list",payload:users})

}));




// create route to user login 
userApp.post("/login",/*middleware1,middleware2*/expressAsyncHandler(async(request,response)=>{

    // let userId=(+request.params.id);
    // let userObj=users.find(userObj=>userObj.id==userId)
    // if(userObj==undefined){
    //     response.send({message:"User not existed"})
    // }
    // else{
    //     response.send({message:"User found",payload:userObj})
    // }

    // get usercolllectionObject
    let userCollectionObject=request.app.get("userCollectionObject");
    // get user credential obj from client
    let userCredObj=request.body
    // search for user by username
    let userOfDB=await userCollectionObject.findOne({username:userCredObj.username});
    // if username not existed
    if(userOfDB==null){
        response.send({message:"Invalid user"})
    }
    // if user name existed
    else{
        // comapare passwords
        let status = await bcryptjs.compare(userCredObj.password,userOfDB.password);
        // if passwords not matched
        if(status==false){
            response.send({message:"Invalid password"})
        }
        // if passwords are matched
        else{
            let token=jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:60})
            // send token
            response.send({message:"login success",payload:token,userObj:userOfDB})
        }
    }

}));



//create a user
userApp.post('/create-user',upload.single("photo")/*middleware1,middleware2*/,expressAsyncHandler(async(request,response)=>{

    // get link from cloudinary
    // console.log(request.file.path);
    // let newUser=request.body;
    
    // //push new user
    // users.push(newUser)
    // //send response
    // response.send({message:"New user created"});

    // get usercolllectionObject
    let userCollectionObject=request.app.get("userCollectionObject");
    // get userObj from client and convert into user object
    let newUserObj=JSON.parse(request.body.userObj);
    // search for user by username
    let userOfDB=await userCollectionObject.findOne({username:newUserObj.username})
    //  if user existed
    if(userOfDB!==null){
        response.send({message:"Username has already taken..Please choose another"}) 
    }
    else{
        let hashedPassword=await bcryptjs.hash(newUserObj.password,6);
        // replace plain passwordwith hashed password in newUserObj
        newUserObj.password=hashedPassword;
        // add profile image link to newUserObj
        newUserObj.profileImg=request.file.path;
        // remove photo property
        delete newUserObj.photo;
        // insert newUser
        await userCollectionObject.insertOne(newUserObj)
        // send response
        response.send({message:"New User crated"})
    }
    

}));

// private route for testing
userApp.get('/test',(request,response)=>{
    response.send({message:"this reply is form private route"})
})

//create a route to modify user data
userApp.put('/update-user',/*middleware1,middleware2*/(request,response)=>{

    // let modifiedObj=request.body;

    // users.push(modifiedObj)
    // //send response
    // response.send({message:"User modified"});
});



//delete a route to delete user by username
userApp.delete("/remove-user/:id",/*middleware1,middleware2,middleware4*/(request, response) => {
    // //get id of user to remove
    // let userId = (+request.params.id);
  
    // //logic to identify and remove user 
    // let userObj = users.find((userObj) => userObj.id == userId);
    // //if user not found
    // if (userObj == undefined) {
    //   response.send({ message: "User not existed" });
    // }
    // //if user found
    // else {
    //     users.pop(userObj);  
    // }
    //     //send response
    //     response.send({message:"User deleted"});
    });



    // export userApp
    module.exports = userApp;