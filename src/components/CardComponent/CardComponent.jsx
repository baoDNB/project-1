import { Card, Rate } from "antd"
import React from "react"
import { StyleNameProduct, WrapperDiscountText, WrapperPriceDiscountText, WrapperPriceText } from "./style"
import { useNavigate } from "react-router"
const CardComponent = (props) => {
    const{countInStock, description, image, name, price, rating, type, discount, selled, priceDiscount, id}=props
    const navigate = useNavigate()
    const hnadleDetailsProduct =(id)=>{
        navigate(`/product-details/${id}`)
    }
    return(
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={image} />}
            onClick={()=>hnadleDetailsProduct(id)}
        >
            <Rate allowHalf defaultValue={rating}/> 
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperPriceText>
                {priceDiscount||10000}
                <WrapperPriceDiscountText>
                    <span style={{marginRight:'8px'}}>{price?.toLocaleString()}</span>
                </WrapperPriceDiscountText>
                <WrapperDiscountText>
                    -{discount ||5}%
                </WrapperDiscountText>
            
            </WrapperPriceText>
            
        </Card>
        
    )
}
export default CardComponent