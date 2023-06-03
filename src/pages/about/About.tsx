import React from 'react'
import { useNavigate } from 'react-router-dom';
import style from "./About.module.scss"

function About() {
    const navigation = useNavigate();
    const onClickGoBack =() => {
        navigation("/dashboard")
    }
  return (
    <div >
        <div className={style.buttonDiv}><button className ={style.buttonGoBack} onClick={onClickGoBack} > Go on dashBoard</button></div> 
      <h2 className= {style.heading}>About</h2>
      <div className={style.container}>
          <strong> Made By : Abhishek Nayak</strong>
          <strong>Tech stack : React Js , HTML , CSS</strong>
          <strong>Email : abhisheknayak0110@gmail.com </strong>
      </div>
    </div>
  )
}

export default About