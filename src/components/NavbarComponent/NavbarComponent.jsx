import React from "react"
import { WrapperContent, WrapperLabelText, WrapperTextPrice, WrapperTextValue } from "./style"
import { Checkbox, Rate} from "antd"
const NavbarComponent = () => {
    const onChange =()=>{

    }
    const renderContent = (type, option) => {
        switch(type){
            case'text':
                return option.map((option)=>{
                        return(
                            <WrapperTextValue>{option}</WrapperTextValue>
                        )
                })
            case'checkbox':
                return   (
                    <Checkbox.Group style={{ width: '100%',display:'flex', flexDirection:'column', gap:'12px' }} onChange={onChange}>{
                        option.map((option)=>{
                            return(
                                <Checkbox value={option.value}>{option.label}</Checkbox>
                            )
                        })
                    }
                    </Checkbox.Group>
                )           
                case'star':
                    return   option.map((option)=>{
                        return(
                            <div style={{display:'flex', gap:'4px'}}>
                                <Rate style={{fontSize:'12px'}} disabled defaultValue={option} />
                                <span>{`Từ ${option} sao`}</span>
                            </div>
                            )
                        })
                case'price':
                    return   option.map((option)=>{
                        return(
                                <div>{option}</div>
                            )
                        })
                default:
                    return {}
        }
    }
    return(
        <div >
            <WrapperLabelText>Label</WrapperLabelText>
            <WrapperContent>
                {renderContent('text',['Gốm sứ','TV','Đồ ahbf','áhdja'])}
            </WrapperContent>
            
        </div>
    )
}
export default NavbarComponent