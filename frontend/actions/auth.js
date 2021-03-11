import fetch from 'isomorphic-fetch'
import {API} from '../config'
import cookie from 'js-cookie'
export const verification=(user,method)=>{
    return fetch(`${API}/${method}`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user)
    }).then(response=>{
        console.log(response);
        return response.json()
    }).catch(err=>console.log(err))
}

//set Cookie

export const setCookies =(key,value)=>{
    if(process.browser){
        cookie.set(key,value,{
            expires:1
        })
    }
}

export const removeCookies =(key)=>{
    if(process.browser){
        cookie.remove(key,{
            expires:1
        })
    }
}

export const getCookies =(key)=>{
    if(process.browser){
        return cookie.get(key)
    }
}

export const setLocalStorage =(key,value)=>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value))
    }
}

export const removeLocalStorage =(key,value)=>{
    if(process.browser){
        localStorage.removeItem(key)
    }
}

export const authenticate = (data,next)=>{
    setCookies('token',data.token)
    setLocalStorage('user',data.data)
    next()
}

export const isAuth = ()=>{
    if(process.browser){
        const cookieChecked = getCookies('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }
            else{
                return false
            }
        }
    }
}

export const signout = (next) => {
    removeCookies('token')
    removeLocalStorage('user')
    next()
    return fetch(`${API}/signout`,{
        method:'GET'
    })
    .then(response =>{
        console.log(response,'SIgned Out');
    })
    .catch(err=>console.log(err))
}