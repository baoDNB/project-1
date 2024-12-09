import styled from "styled-components";

export const WrapperContainer = styled.div`
    width: 100%;
    background-color: #f5f5fa;
    display: flex;
    flex-direction: column;
    align-items: center; /* Căn giữa nội dung */
    padding: 20px 0; /* Điều chỉnh padding */
`;

export const WrapperListOrder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
    width: 100%;
    max-width: 1270px; /* Đảm bảo độ rộng đồng nhất */
    margin: 0 auto; /* Căn giữa */
    box-sizing: border-box;
`;



export const WrapperItemOrder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 950px; /* Giới hạn kích thước */
  margin: 0 auto; /* Căn giữa */
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const WrapperStatus = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgb(235, 235, 240);

  span {
    font-size: 14px;
    font-weight: bold;
    color: rgb(56, 56, 61);
  }

  div {
    margin-top: 8px;
    font-size: 13px;
    color: rgb(102, 102, 102);
  }
`;

export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Điều chỉnh để canh đều */
  padding: 10px 16px;
  width: 100%; /* Đảm bảo luôn nằm trong phần tử cha */
  max-width: 900px; /* Giới hạn chiều rộng tối đa */
  background-color: #ffffff;
  border-radius: 8px;
  margin: 0 auto; /* Đảm bảo căn giữa */


`;


export const WrapperFooterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 10px;
  border-top: 1px solid rgb(235, 235, 240);

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span:first-child {
      font-size: 14px;
      font-weight: bold;
      color: rgb(255, 66, 78);
    }

    span:last-child {
      font-size: 14px;
      font-weight: bold;
      color: rgb(56, 56, 61);
    }
  }
`;

export const StyledButton = styled.button`
  height: 36px;
  padding: 0 16px;
  border: 1px solid rgb(11, 116, 229);
  border-radius: 4px;
  background-color: #ffffff;
  color: rgb(11, 116, 229);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgb(11, 116, 229);
    color: #ffffff;
  }
`;
