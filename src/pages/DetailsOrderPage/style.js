import styled from "styled-components";

export const WrapperContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: #f5f5fa;
    padding: 20px;
`;

export const WrapperContent = styled.div`
    width: 1270px;
    margin: 0 auto;
`;

export const WrapperHeaderUser = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 30px;
`;

export const WrapperInfoUser = styled.div`
    background: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const WrapperLabel = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
`;

export const WrapperContentInfo = styled.div`
    .name-info, .address-info, .phone-info {
        font-size: 14px;
        color: #555;
    }

    .delivery-info, .delivery-fee, .payment-info, .status-payment {
        font-size: 14px;
        color: #666;
    }
`;

export const WrapperStyleContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const WrapperHeaderItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #333;
    margin-bottom: 20px;
`;

export const WrapperProduct = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f5f5f5;
`;

export const WrapperNameProduct = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border: 1px solid #eee;
        padding: 2px;
    }

    div {
        margin-left: 10px;
        width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 70px;
    }
`;

export const WrapperItem = styled.div`
    font-size: 14px;
    color: #333;
`;

export const WrapperAllPrice = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

export const WrapperItemLabel = styled.div`
    font-size: 14px;
    color: #777;
`;

