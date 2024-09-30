import React from "react";
import {SearchOutlined  }from'@ant-design/icons'
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch=(props)=>{
    const { 
        size, placeholder, textButton, bordered, 
        backgroundColorInput='#fff', 
        backgroundColorButton='#7ed321', 
        colorButton='#fff'}= props
    return(
        <div style={{display:'flex', backgroundColor : '#fff'}}>
            <InputComponent 
                size={size} 
                
                placeholder={placeholder} 
                style={{ backgroundColor : backgroundColorInput,
                    borderRadius:0,
                }} />
            <ButtonComponent
                size={size} 
                styleButton={{backgroundColor:backgroundColorButton,
                    border: !bordered&&'none',
                    borderRadius:0,
                }} 
                icon={<SearchOutlined  style={{color:colorButton}}/>} 
                textButton={textButton}
                styleTextButton={{color:colorButton}}
            />

        </div>
    )
}

export default ButtonInputSearch