import React from "react";
import { WrapperInfo, Label, WrapperContainer, WrapperValue, WrapperCountOrder, WrapperItemOrder, WrapperItemOrderInfo } from "./style";

import { useSelector } from "react-redux";

import Loading from "../../components/LoadingComponent/Loading";

import { convertPrice } from "../../utils";
import { useLocation } from "react-router";
import { orderContant } from "../../contant";





const OrderSuccess = () => {
    const order = useSelector((state) => state.order)
    const location = useLocation()
    const { state } = location
    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <Loading isLoading={false}>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h1>Đơn hàng đặt thành công </h1>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperContainer>
                            <WrapperInfo>
                                <div>
                                    <Label>Phương thức giao hàng</Label>
                                    <WrapperValue>
                                        <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Label>Phương thức thanh toán</Label>
                                    <WrapperValue>
                                        {orderContant.payment[state?.payment]}
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperItemOrderInfo>
                                {state.orders?.map((order) => {
                                    return (
                                        <WrapperItemOrder key={order?.name}>
                                            <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                                <div style={{
                                                    width: '260px',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}>{order?.name}</div>
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span>
                                                    <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                                                </span>
                                                <span>
                                                    <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                                                </span>

                                            </div>
                                        </WrapperItemOrder>
                                    )
                                })}

                            </WrapperItemOrderInfo>
                            <div>
                                <span style={{ fontSize: '20px', color: 'red' }}>Tổng tiền {convertPrice(state?.totalPriceMemo)}</span>
                            </div>
                        </WrapperContainer>

                    </div>
                </div>

            </Loading>

        </div>
    )
}

export default OrderSuccess