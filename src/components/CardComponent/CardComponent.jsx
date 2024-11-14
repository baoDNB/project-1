import { Card, Rate } from "antd"
import React from "react"
import { StyleNameProduct, WrapperDiscountText, WrapperPriceDiscountText, WrapperPriceText } from "./style"
const CardComponent = (props) => {
    const{countInStock, description, image, name, price, rating, type, discount, selled, priceDiscount}=props
    return(
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://capricathemes.com/opencart/OPC02/OPC020033/image/cache/catalog/06-481x553.jpg" />}
        >
            <Rate allowHalf defaultValue={rating}/> 
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperPriceText>
                {priceDiscount||10000}
                <WrapperPriceDiscountText>
                    {price}
                </WrapperPriceDiscountText>
                <WrapperDiscountText>
                    {discount ||5}%
                </WrapperDiscountText>
            
            </WrapperPriceText>
            
        </Card>
        
    )
}
export default CardComponent