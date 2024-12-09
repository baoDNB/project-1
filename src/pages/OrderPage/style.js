import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
    background: rgb(255, 255, 255);
    padding: 9px 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;

    span {
        color: rgb(36, 36, 36);
        font-weight: 400;
        font-size: 13px;
    }
`;

export const WrapperStyleHeaderDelivery = styled.div`
    background: rgb(255, 255, 255);
    padding: 9px 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    span {
        color: rgb(36, 36, 36);
        font-weight: 400;
        font-size: 13px;
    }
`;

export const WrapperLeft = styled.div`
    width: 910px;
`;

export const WrapperListOrder = styled.div`
    /* Add styling for the order list wrapper if needed */
`;

export const WrapperItemOrder = styled.div`
    display: flex;
    align-items: center;
    padding: 9px 16px;
    background: #fff;
    margin-top: 12px;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const WrapperPriceDiscount = styled.span`
    color: #999;
    font-size: 12px;
    text-decoration: line-through;
    margin-left: 4px;
`;

export const WrapperCountOrder = styled.div`
    display: flex;
    align-items: center;
    width: 84px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const WrapperRight = styled.div`
    width: 400px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;

export const WrapperInfo = styled.div`
    padding: 17px 20px;
    border-bottom: 1px solid #f5f5f5;
    background: #fff;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
`;

export const WrapperTotal = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 17px 20px;
    background: #fff;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
`;
