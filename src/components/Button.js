import React from 'react'

const Button = ({bgCol, text, clickFunc}) => {
  return (
    <button
      style={{backgroundColor: bgCol}}
      className='btn'
      onClick={clickFunc}>{text}</button>
  )
}

export default Button