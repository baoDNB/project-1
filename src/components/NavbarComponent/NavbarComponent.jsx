import React, { useEffect, useState } from "react"
import { WrapperContent, WrapperLabelText, WrapperTextValue } from "./style"
import * as ProductService from '../../services/ProductService'

import { Checkbox, Rate } from "antd"
import TypeProduct from "../TypeProduct/TypeProduct"
const NavbarComponent = () => {
    const [typeProducts, setTypeProducts] = useState([])
    const fetcAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }
    useEffect(() => {
        fetcAllTypeProduct()
    }, [])
    const onChange = () => {

    }

    const renderContent = (type, option) => {
        switch (type) {
            case 'text':
                return option.map((option) => {
                    return (
                        <WrapperTextValue>{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>{
                        option.map((option) => {
                            return (
                                <Checkbox value={option.value}>{option.label}</Checkbox>
                            )
                        })
                    }
                    </Checkbox.Group>
                )
            case 'star':
                return option.map((option) => {
                    return (
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span>{`Từ ${option} sao`}</span>
                        </div>
                    )
                })
            case 'price':
                return option.map((option) => {
                    return (
                        <div>{option}</div>
                    )
                })
            default:
                return {}
        }
    }
    return (
        <div >
            <WrapperLabelText>Các loại:</WrapperLabelText>
            <WrapperContent>
                {typeProducts.map((item) => {
                    return (
                        <TypeProduct name={item} key={item} />
                    )
                })}
            </WrapperContent>

        </div>
    )
}
export default NavbarComponent