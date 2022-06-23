import React from 'react'
import {useForm} from "react-hook-form"
import {Form,Button,Container} from "react-bootstrap";
import {MdLogin} from "react-icons/md";
import axios from 'axios';


function Signup() {

    const {
        register,
        handleSubmit,
        formState: {errors},
    }=useForm();
    
    const onFormSubmit=(userObj)=>{
        // create FormData object
        let formData =new FormData();
        // append values to it
        formData.append("userObj",JSON.stringify(userObj));
        
        axios
        .post("http://localhost:4000/user-api/create-user",formData)
        .then((response) => {
          console.log(response);
          alert('User created');  
       
        })
        .catch((error) => {
          console.log(error);
          alert("Something went wrong in creating user");
        
    });
    };
  return(
    <>  
        <div className="display-2 text-center text-info">Signup</div> 
        <Form className="w-25 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>

        <Form.Group className="mb-2">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username"{...register("username",{required:true})}/>
            {/* Validation error message for username */}
            {errors.username&&<p className='text-danger'>*Username is required</p>}
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password"{...register("password",{required:true})}/>
            {/* Validation error message for username */}
            {errors.password&&<p className='text-danger'>*Password is required</p>}
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control type="date" placeholder="Enter date of birth"{...register("date",{required:true})}/>
            {/* Validation error message for username */}
            {errors.date&&<p className='text-danger'>*Date of birth is required</p>}
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email"{...register("email",{required:true})}/>
            {/* Validation error message for username */}
            {errors.email&&<p className='text-danger'>*Email is required</p>}
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter Description"{...register("description",{required:true})}/>
            {/* Validation error message for username */}
            {errors.description&&<p className='text-danger'>*Description is required</p>}
        </Form.Group>

        <Form.Group className="mb-2">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address"{...register("address",{required:true})}/>
            {/* Validation error message for username */}
            {errors.address&&<p className='text-danger'>*Address is required</p>}
        </Form.Group>

        
        <Button variant="primary" type="submit">
            Signup <MdLogin/>
        </Button>
        </Form>
    </> 
  )

}
export default Signup;