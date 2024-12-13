import React, { useEffect, useMemo, useState } from "react";
import { WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal, Label } from "./style";
import { Form, Radio } from "antd";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService'
import * as PaymentService from '../../services/PaymentService'
import Loading from "../../components/LoadingComponent/Loading";
import { updateUser } from "../../redux/silces/userSlice";
import * as OrderService from '../../services/OrderService'
import * as message from '../../components/MessageComponent/Message'
import { useNavigate } from "react-router";
import { removeAllOrderProduct } from "../../redux/silces/orderSilce";
import { PayPalButton } from "react-paypal-button-v2";

const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const navigate = useNavigate()
    const [sdkReady, setSdkReady] = useState(false)
    const [delivery, setDelivery] = useState('fast')
    const [payment, setPayment] = useState('later_money')
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateProductUserDetails, setStateProductUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: ''
    })
    const [form] = Form.useForm();
    const dispatch = useDispatch()


    useEffect(() => {
        form.setFieldsValue(stateProductUserDetails)
    }, [form, stateProductUserDetails])
    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateProductUserDetails({
                name: user?.name,
                phone: user?.phone,
                address: user?.address,
                city: user?.city
            })
        }
    }, [isOpenModalUpdateInfo])
    const handleChangAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }
    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + (cur.price * cur.amount);
        }, 0)
        return result;
    }, [order]);

    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + (cur.price * cur.discount * cur.amount / 100);
        }, 0)
        if (Number(result)) {
            return result;
        }
        return 0;
    }, [order]);
    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo < 500000) {
            return 20000; // Dưới 500.000 đồng
        } else if (priceMemo >= 500000 && priceMemo < 1000000) {
            return 10000; // Từ 500.000 đến dưới 1 triệu
        } else if (priceMemo >= 1000000) {
            return 0; // Trên 1 triệu
        }
        return 0; // Mặc định
    }, [priceMemo]);


    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

    const handleAddOrder = () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        if (user?.access_token && order?.orderItemsSelected && user?.name
            && user?.address && user?.phone && user?.city && priceMemo && user?.id
        ) {
            mutationAddOrder.mutate(
                {
                    token: user?.access_token,
                    orderItems: order?.orderItemsSelected,
                    fullName: user?.name,
                    address: user?.address,
                    phone: user?.phone,
                    city: user?.city,
                    paymentMethod: payment,
                    itemsPrice: priceMemo,
                    shippingPrice: diliveryPriceMemo,
                    totalPrice: totalPriceMemo,
                    user: user?.id,
                    email: user?.email
                },
                {
                    onSettled: () => setIsSubmitting(false), // Reset lại trạng thái khi hoàn thành
                })

        }

    }
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data
            const res = UserService.updateUser(id, { ...rests }, token)
            return res
        },
    )
    const mutationAddOrder = useMutationHooks(
        (data) => {
            const { token, ...rests } = data
            const res = OrderService.createOrder({ ...rests }, token)
            return res
        },

    )
    const { isPending, data } = mutationUpdate
    const { data: dataAdd, isPending: isLoadingAddOrder, isSuccess, isError } = mutationAddOrder

    useEffect(() => {
        if (isSuccess && dataAdd?.status === 'OK') {
            const arrayOrdered = []
            order?.orderItemsSelected?.forEach(element => {
                arrayOrdered.push(element.product)
            })
            dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
            message.success('Đặt hàng thành công')
            navigate('/orderSuccess', {
                state: {
                    delivery,
                    payment,
                    orders: order?.orderItemsSelected,
                    totalPriceMemo: totalPriceMemo
                }
            })
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])
    const handleCancleUpdate = () => {
        setStateProductUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,

        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }

    const handleUpdateInfoUser = () => {
        const { name, phone, address, city } = stateProductUserDetails
        if (name && phone && address && city) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateProductUserDetails }, {
                onSuccess: () => {
                    dispatch(updateUser({ name, phone, address, city }))
                    setIsOpenModalUpdateInfo(false)
                }
            })
        }
    }

    const handleOnchangeDetails = (e) => {
        setStateProductUserDetails({
            ...stateProductUserDetails,
            [e.target.name]: e.target.value
        })
    }
    const handleDelivery = (e) => {
        setDelivery(e.target.value)
    }
    const handlePayment = (e) => {
        setPayment(e.target.value)
    }
    const onSuccessPaypal = (details, data) => {
        mutationAddOrder.mutate(
            {
                token: user?.access_token,
                orderItems: order?.orderItemsSelected,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                city: user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: diliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                isPaid: true,
                paidAt: details.update_time,
                email: user?.email

            })
    }
    const addPaypalScript = async () => {
        const { data } = await PaymentService.getConfig()

        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.sandbox.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript()
        } else {
            setSdkReady(true)
        }

    }, [])

    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <Loading isLoading={isLoadingAddOrder}>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h3>Thanh toán</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperLeft>
                            <WrapperInfo>
                                <div>
                                    <Label>Chọn phương thức giao hàng</Label>
                                    <WrapperRadio onChange={handleDelivery} value={delivery}>
                                        <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm </Radio>
                                        <Radio value="be"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>BE</span> Giao hàng tiết kiệm </Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Label>Chọn phương thức thanh toán</Label>
                                    <WrapperRadio onChange={handlePayment} value={payment}>
                                        <Radio value="later_money">Thanh toán tiền mặt khi nhận hàng </Radio>
                                        <Radio value="paypal">Thanh toán tiền bằng paypal </Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                        </WrapperLeft>
                        <WrapperRight>
                            <div style={{ width: '100%' }}>
                                <WrapperInfo>
                                    <div>
                                        <span>Địa chỉ: </span>
                                        <span style={{ fontWeight: 'bold' }}>{`${user?.address} ${user?.city}`} </span>
                                        <span onClick={handleChangAddress} style={{ color: 'blue', cursor: 'pointer' }}> Thay đổi</span>

                                    </div>
                                </WrapperInfo>
                                <WrapperInfo>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Tạm tính</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Giảm giá</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Phí giao hàng </span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
                                    </div>
                                </WrapperInfo>
                                <WrapperTotal>
                                    <span>Tổng tiền</span>
                                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                                        <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có )</span>
                                    </span>
                                </WrapperTotal>
                            </div>
                            {payment === 'paypal' && sdkReady ? (
                                <div style={{ width: '400px' }}>
                                    <PayPalButton
                                        amount={Math.round(totalPriceMemo / 30000)}
                                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={onSuccessPaypal}
                                        onError={() => {
                                            alert('Error')
                                        }}
                                    />
                                </div>
                            ) : (
                                <ButtonComponent
                                    onClick={() => handleAddOrder()}
                                    size={40}
                                    styleButton={{
                                        background: 'rgb(255, 57, 69)',
                                        height: '48px',
                                        width: '400px',
                                        border: 'none',
                                        borderRadius: '4px'
                                    }}
                                    textButton={'Đặt hàng'}
                                    styletextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                                </ButtonComponent>
                            )}

                        </WrapperRight>
                    </div>
                </div>
                <ModalComponent forceRender title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancleUpdate} onOk={handleUpdateInfoUser} >
                    <Loading isLoading={isPending}>
                        <Form
                            name="basic"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            //onFinish={onUpdateUser}
                            autoComplete="on"
                            form={form}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <InputComponent value={stateProductUserDetails?.name} onChange={handleOnchangeDetails} name="name" />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <InputComponent value={stateProductUserDetails?.phone} onChange={handleOnchangeDetails} name="phone" />
                            </Form.Item>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: true, message: 'Please input your address!' }]}
                            >
                                <InputComponent value={stateProductUserDetails?.address} onChange={handleOnchangeDetails} name="address" />
                            </Form.Item>
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[{ required: true, message: 'Please input your city!' }]}
                            >
                                <InputComponent value={stateProductUserDetails?.city} onChange={handleOnchangeDetails} name="city" />
                            </Form.Item>
                        </Form>
                    </Loading>
                </ModalComponent>
            </Loading>

        </div>
    )
}

export default PaymentPage