import React from 'react'

const Button = ({ title, bgColor, fontColor }) => {
  return (
    <button type='button' className={'p-2 rounded-lg'} style={{color: fontColor, backgroundColor: bgColor}}>{title}</button>
  )
}

export default Button