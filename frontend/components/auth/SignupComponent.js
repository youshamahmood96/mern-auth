import React, { useEffect, useState } from 'react'
import { authenticate, isAuth, verification } from '../../actions/auth'
import Router,{ useRouter } from 'next/router'

const SignupComponent = ()=>{
        const router = useRouter().pathname
        useEffect(()=>{
         isAuth() && Router.push('/')
        },[])
        const [values,setValues] = useState({
          name:'yousha',
          email:'yousha@gmail.com',
          password:'yousha',
          error:'',
          loading:false,
          message:'',
          showForm:true
      })
      const {name,email,password,error,loading,message,showForm} = values
      const showLoading = () => (loading? <div className="alert alert-info">Loading...</div> : '')
        const showError = () => (error? <div className="alert alert-danger">{error}</div> : '')
        const showMessage = () =>( message? <div className="alert alert-info">{message}</div> : '' )
     const signupForm = () =>{
        const handleSubmit=(e)=>{
            setValues({...values,loading:true,error:false})
            const userSignUp = {name,email,password}
            const userSignIn = {email,password}
            if(router == '/signup'){
              verification(userSignUp,'signup').then(data=>{
                  if(data.error){
                      setValues({...values,error:data.error,loading:false})
                  }
                  else{
                      setValues({...values, name:'',email:'',password:'',error:'',loading:false,message:data.message,showForm:false})
                      authenticate(data,()=>{
                        Router.push(`/`)
                      })
                  }
              })
            }
            else if(router == '/signin'){ verification(userSignIn,'signin').then(data=>{
              console.log(data);
                if(data.error){
                    setValues({...values,error:data.error,loading:false})
                }
                else{
                    // save user token to cookie
                    // save user info to localstorage
                    //authenticate user
                    authenticate(data,()=>{
                      Router.push(`/`)
                    })
                    
                }
            })}
            e.preventDefault();
        }
        const handleChange=name => e =>{ 
            setValues({...values,error:false,[name]:e.target.value})
            e.preventDefault();}
        return (
            <form onSubmit={handleSubmit}>
              {
                router == '/signup' ? (<div className="form-group">
                <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="type your name..." id="name"/>
              </div>) : ''
              }
              <div className="form-group">
                <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="enter your email..." id="email"/>
              </div>
              <div className="form-group">
                <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="type your password..." id="password"/>
              </div>
              <div>
                <button className="btn btn-primary"> {router== '/signup'? 'SignUp':'LogIn'}  </button>
              </div>
            </form>
        )
    } 
    return(
       <React.Fragment>
         {showError()}
         {showLoading()}
         {showMessage()}         
         {showForm && signupForm()}
       </React.Fragment>
    )
}
export default SignupComponent