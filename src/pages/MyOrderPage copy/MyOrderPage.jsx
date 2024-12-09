import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import * as OrderService from '../../services/OrderService'
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { convertPrice } from "../../utils";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { WrapperContainer, WrapperListOrder, WrapperItemOrder, WrapperStatus, WrapperHeaderItem, WrapperFooterItem } from "./style";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from '../../components/MessageComponent/Message'

const MyOrderPage = () => {
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(state?.id, state?.token)
        return res.data
    }
    const queryOrder = useQuery({
        queryKey: ['order', state?.id, state?.token], queryFn: fetchMyOrder,
        enabled: !!state?.id && !!state?.token
    })
    const { isPending, data } = queryOrder

    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: {
                token: state?.token
            }
        })
    }
    const mutation = useMutationHooks(
        (data) => {
            const { id, token, orderItems } = data
            const res = OrderService.cancelOrder(id, token, orderItems)
            return res
        },
    )
    const handleCancelOrder = (order) => {
        if (mutation.isLoading) return; // Tránh gọi lại nếu đã đang trong trạng thái loading
        mutation.mutate(
            { id: order._id, token: state?.token, orderItems: order?.orderItems },
            {
                onSuccess: () => {
                    queryOrder.refetch(); // Chỉ refetch khi API thành công
                },
            }
        );
    };

    const { isLoading: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel } = mutation
    useEffect(() => {
        if (isSuccessCancel && dataCancel?.statu === 'OK') {
            message.success()
        } else if (isErrorCancel) {
            message.error()
        }
    }, [isSuccessCancel, isErrorCancel])
    const renderProduct = (data) => {
        return data?.map((order) => {
            return (
                <WrapperHeaderItem key={order?._id}>
                    <img src={order?.image} style={{ width: '70px', height: '70px', objectFit: 'cover', border: '1px solid rgb(238 238 238', padding: '2px' }} />
                    <div style={{
                        width: 260,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginLeft: '10px'
                    }}>{order?.name}</div>
                    <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
                </WrapperHeaderItem>
            )

        })
    }
    return (
        <Loading isLoading={isPending}>
            <WrapperContainer>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h1 style={{
                        margin: '0 auto 20px',
                        padding: '0',
                        textalign: 'center',
                        fontsize: '24px',
                        fontweight: 'bold',
                    }}>Đơn hàng của tôi </h1>
                    <WrapperListOrder>
                        {data?.map((order) => {
                            return (
                                <WrapperItemOrder key={order?._id}>
                                    <WrapperStatus>
                                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                                        <div><span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng:</span>{`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</div>
                                        <div><span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán:</span>{`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</div>
                                    </WrapperStatus>
                                    {renderProduct(order?.orderItems)}

                                    <WrapperFooterItem>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                                            <span
                                                style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 7000 }}
                                            >{convertPrice(order?.totalPrice)}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <ButtonComponent
                                                onClick={() => handleCancelOrder(order)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid rgb(11, 116, 229)',
                                                    borderRadius: '4px'
                                                }}
                                                textButton={'Hủy đơn hàng'}
                                                styletextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                            <ButtonComponent
                                                onClick={() => handleDetailsOrder(order?._id)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid rgb(11, 116, 229)',
                                                    borderRadius: '4px'
                                                }}
                                                textButton={'Xem chi tiết'}
                                                styletextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                        </div>
                                    </WrapperFooterItem>
                                </WrapperItemOrder>
                            )
                        })}
                    </WrapperListOrder>
                </div>
            </WrapperContainer>
        </Loading>
    )
}

export default MyOrderPage