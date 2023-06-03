import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import style from "./LogIn.module.scss"



function LogIn() {
  // const auth = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValidUserName, setIsValidUserName] = useState(false)
  const [isValidPassword, setIsValidPassword] = useState(false)
  const [error, setError] = useState('');
  const [nameError , setNameError] = useState("")
  const authData = useAuth() 

  const navigation = useNavigate();
  const handleLogin = () => {
  
      authData?.login(username, password);
      navigation("/dashboard")
  };
  const handleChangeName =(e :any) => {
    setUsername(e?.target?.value)
    const regex = /^[a-zA-Z]+$/ ; // Regular expression to match alphabetical characters and at least three words
    if(regex.test(e?.target?.value) && e?.target?.value?.length >= 3 ){
      setIsValidUserName(true)
      setNameError("")
    }
    else if(regex.test(e?.target?.value) && e?.target?.value?.length <3 ){
      setNameError("Name should have length atleat 3")
      setIsValidUserName(false)
    }
    else{
      setNameError("Please Enter Valid User Name")
      setIsValidUserName(false)
    }
  }
  const handleChangePassword =(e :any) => {
    setPassword(e?.target?.value)
    if(e?.target?.value?.length >3){
      setIsValidPassword(true)
    }
    else{
      setIsValidPassword(false)
    }
  }
  console.log("y" , username , password , isValidPassword , isValidUserName)
  return (

      <div className={style.loginComponentWrapper} >
        <h2>Login</h2>
         <div className={style.inputeBoxDiv}>
         <input
         className={style.inputeBox}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>  handleChangeName(e)}
        />
         <div className={style.errorDiv}> 
         {
           !isValidUserName && username?.length  ?  nameError : ""
         }
         </div>
      </div>
     <div className={style.inputeBoxDiv}>
        <input
          type="password"
          className={style.inputeBox}
          placeholder="Password"
          value={password}
          onChange={(e) => handleChangePassword(e)}
        />
         <div className={style.errorDiv}>
         {
           !isValidPassword && password?.length  ?  "Please Enter Valid Password" : ""
         }
         </div>
        </div>
        <button  className={isValidPassword &&isValidUserName ?style.logInButton : style.logInDisableButton} onClick={handleLogin}>Login</button>
        {error && <p>{error}</p>}
      </div>
   
  )
}

export default LogIn