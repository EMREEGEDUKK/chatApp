import React,{useEffect,useState} from 'react';
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { loginRoute } from '../utils/apiRoutes';




function login(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [values,setValues]= useState({
        userName: "",
        password: "",

    })
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()) {
            console.log('in validation');
            const  {password,userName} = values
            const {data} = await axios.post(loginRoute,{
                userName,
                password
            })
            if(data.status === false) {
                toast.error(data.msg,toastOptions);
                // navigate('/');
            } 
            if(data.status===true) {
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                toast.success(data.msg,toastOptions)
                
                setTimeout(() => {
                    navigate("/Chat")
                }, 3000);
                
            }
            
        } 
    };
   
    const toastOptions = {
        position:'bottom-right',
        autoClose:3000,
        draggable:true,
        theme:'dark',
       
    }


    const handleValidation = () => {
    const  {password,userName} = values

      if(password ==="") {
        toast.error('password is required',toastOptions)
        return false
      }
      else if (userName.length === "") {
        toast.error('username is required', toastOptions)
        return false
      }
      return true
    }
   
    const handleChange = (event) => {
        setValues({...values,[event.target.name]: event.target.value})
    }
   


    return (
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src= "" alt="" />
                        <h1>chat-app</h1>
                    </div>
                    <input 
                        type="text" 
                        placeholder='UserName'
                        name='userName'
                        onChange={(e) => e>= handleChange(e)} 
                    />
                    
                    <input 
                        type="password" 
                        placeholder='password'
                        name='password'
                        onChange={(e) => e>= handleChange(e)} 
                    />
                    
                    <button  type='submit'>sign in</button>
                    <span>don't you have an account yet ?
                        <Link to="/register">register</Link>
                    </span>S
                </form>
    
            </FormContainer>
            <ToastContainer/>
            
        
    
        </>
    )
    
}

 const FormContainer = styled.div`
    height:  100vh;
    width: 100vw;
    display:flex;
    flex-direction:column;
    gap:1rem;
    align-items:center;
    background-color:#131324;
    justify-content: center;
    .brand{
        display:flex;
        align-items:center;
        gap:1rem;
        justify-content: center;

    }
    .img{
        height:5rem;
    }
    h1{
        color:white;
        text-transform:Uppercase
    }
    form {
        display:flex;
        flex-direction: column;
        gap:2rem;
        background-color:#00000076;
        border-radius: 2rem;
        padding: 3rem 5rem;
    }
    input {
        background-color: transparent;
        padding:1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.5rem;
        color:white;
        width: 100%;
        font-size:1rem;
        &:focus {
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button {
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        font-weight: bold;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
    }
    button:hover {
        background-color: #4e0eff;
        transition: 0.5s ease-in-out;
    }
    span {
        color: white;
        a{
            color: #4e0eff;
            text-decoration: none;
        }
    }
`


export default login;