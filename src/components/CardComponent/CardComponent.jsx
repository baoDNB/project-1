import { Card, Rate } from "antd"
import React from "react"
import { StyleNameProduct, WrapperDiscountText, WrapperPriceDiscountText, WrapperPriceText } from "./style"
const CardComponent = () => {
    return(
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="" />}
        >
            <Rate allowHalf defaultValue={4.6}/> 
            <StyleNameProduct>Bộ ấm chén bát tràng 350ml</StyleNameProduct>
            <WrapperPriceText>
                405.000đ
                <WrapperPriceDiscountText>
                    450.000đ
                </WrapperPriceDiscountText>
                <WrapperDiscountText>
                    -10%
                </WrapperDiscountText>
            
            </WrapperPriceText>
            
        </Card>
        
    )
}
export default CardComponent