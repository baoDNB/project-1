import { Card, Rate } from "antd"
import React from "react"
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceDiscountText, WrapperPriceText, WrapperStyledTextSell } from "./style"
import { useNavigate } from "react-router"
import { convertPrice } from "../../utils"
const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, priceDiscount, id } = props
    const navigate = useNavigate()
    const hnadleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }
    return (
        <WrapperCardStyle
            hoverable
            style={{ width: '240px' }}
            cover={<img alt="example" src={image} />}
            onClick={() => hnadleDetailsProduct(id)}

        >
            <Rate allowHalf defaultValue={rating} />
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperStyledTextSell> | Đã bán {selled || 0}+</WrapperStyledTextSell>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                <WrapperDiscountText>
                    -{discount || 0}%
                </WrapperDiscountText>

            </WrapperPriceText>

        </WrapperCardStyle>

    )
}
export default CardComponent