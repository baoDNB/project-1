import { Card, Rate } from "antd"
import React from "react"
import { StyleNameProduct, WrapperDiscountText, WrapperPriceDiscountText, WrapperPriceText } from "./style"
import { useNavigate } from "react-router"
import { convertPrice } from "../../utils"
const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, priceDiscount, id } = props
    const navigate = useNavigate()
    const hnadleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={image} />}
            onClick={() => hnadleDetailsProduct(id)}
        >
            <img
                style={{
                    width: '68px',
                    height: '14px',
                    position: 'absolute',
                    top: -1,
                    left: -1,
                    borderTopLeftRadius: '3px'
                }}
            />
            <Rate allowHalf defaultValue={rating} />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                <WrapperDiscountText>
                    -{discount || 5}%
                </WrapperDiscountText>

            </WrapperPriceText>

        </Card>

    )
}
export default CardComponent