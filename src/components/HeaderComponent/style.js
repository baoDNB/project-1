import {Row} from 'antd'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: #fff;
    align-items:center;
    gap:16px;
    flex-wrap: nowrap;
`
export const WrapperTextHeader = styled(Link)`
    font-size:18px;
    color:#000;
    font-weight:bold;
`
export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: #000;
    gap: 10px;
    font-size:12px; 
`
export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color:#000;
    white-space:nowrap
    
`

export const WrapperContentPopup =styled.p`
    cursor: pointer;
    &:hover{
        color:rgb(26, 148, 255);
    }
`
