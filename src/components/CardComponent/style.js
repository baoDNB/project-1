import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle= styled(Card)`
    width:200px;
    & img{
        height: 200px;
        witdh: 200px;
    },
    position: relative
    background-color:${props => props.disabled ? '#ccc' : '#fff'};
    cursor:${props => props.disabled ? 'not-allowed' : 'pointer'};


`
export const StyleNameProduct= styled.div`
    font-weight:400;
    font-size:12px;
    line-height:16px;
    color:rgb(56, 56, 61);
    margin:8px 0;
  
`
export const WrapperReportText= styled.div`
    font-size: 11px;
    color:rgb(128, 128, 136);
    display: flex;
    align-items:center;
` 
export const WrapperPriceText = styled.div`
    color:rgb(255, 66, 78);
    font-size:16px;
    font-weight:500;
    margin:0px 0;
    display: flex
`
export const WrapperPriceDiscountText = styled.div`
    text-decoration: line-through;
    color: #888888;    
    font-size:16px;
    font-weight:500;
    padding:0px 10px;
`
export const WrapperDiscountText = styled.div`
    color:rgb(255, 66, 78);
    font-size:12px;
    font-weight:500;
    padding: 5px;
`
export const WrapperStyledTextSell = styled.div`

`