import React from "react";
import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.component.jsx";
import CustomButton from "../custom-button/custom-button.component";
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth,signInWithGoogle} from '../../firebase/firebase.utils.js';

class SignIn extends React.Component{
    constructor(props)
    {
        super(props);
        this.state ={
            email:'',
            password:''
        }
    }

    handleSubmit= async event =>{
        //console.log(event.target)
        event.preventDefault();
        
        const {email,password}=this.state;
        try{
           await signInWithEmailAndPassword(auth,email,password);
            this.setState({email:'', password:''})
        }catch (error){
            console.log(error);

        }


    }

    handleChange =event=>{

        const{value,name}= event.target;
        this.setState({[name]:value})
    }

    render(){
        return(
            <div className="sign-in">
                <h1 className="title">I already have an account</h1>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type='email' handleChange={this.handleChange} value={this.state.email} label="email" required />
                    

                    <FormInput name="password" type='password' handleChange={this.handleChange} value={this.state.password} label="password" required/>
                    
                    <div className="buttons">
                        <CustomButton type='submit' >Sign in</CustomButton>
      
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn >Sign in with google</CustomButton>

                    </div>
                   
                </form>
            </div>
        )
    }
};
export default SignIn;