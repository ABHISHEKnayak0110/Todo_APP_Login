import React from 'react'
import style from "./PopUp.module.scss"

function PopUp({children} :any) {
  return (
    <div className={style.popUp}>
        {children}
        </div>
  )
}

export default PopUp