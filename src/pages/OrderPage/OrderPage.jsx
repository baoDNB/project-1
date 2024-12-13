import React, { useEffect, useMemo, useState } from "react";
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDelivery, WrapperTotal } from "./style";
import { Checkbox, Form } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from "../../redux/silces/orderSilce";
import { convertPrice } from "../../utils";
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService'
import Loading from "../../components/LoadingComponent/Loading";
import * as message from '../../components/MessageComponent/Message'
import { updateUser } from "../../redux/silces/userSlice";
import { useNavigate } from "react-router";
import Step from "../../components/StepComponent/StepComponent";




const OrderPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [listChecked, setListChecked] = useState([])
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateProductUserDetails, setStateProductUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: ''
    })
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListChecked)
        } else {
            setListChecked([...listChecked, e.target.value])
        }
    };
    const handleChangeCount = (type, idProduct, limited) => {
        if (type === 'increase') {
            if (!limited) {
                dispatch(increaseAmount({ idProduct }))
            }
        } else {
            if (!limited) {
                dispatch(decreaseAmount({ idProduct }))
            }
        }

    }
    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }))

    }
    const handleOnchangeCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = []
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item?.product)
            })
            setListChecked(newListChecked)
        } else {
            setListChecked([])
        }
    }
    useEffect(() => {
        dispatch(selectedOrder({ listChecked }))
    }, [listChecked])
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
            const totalDiscount = cur.discount ? cur.discount : 0
            return total + (cur.price * cur.amount * totalDiscount / 100)
        }, 0)
        if (Number(result)) {
            return result;
        }
        return 0;
    }, [order]);

    const diliveryPriceMemo = useMemo(() => {
        if (order?.orderItemsSelected.length === 0) {
            return 0; // Không có sản phẩm nào được chọn
        }
        if (priceMemo < 500000) {
            return 20000; // Dưới 500.000 VNĐ
        }
        if (priceMemo >= 500000 && priceMemo < 1000000) {
            return 10000; // Từ 500.000 VNĐ đến 1.000.000 VNĐ
        }
        if (priceMemo >= 1000000) {
            return 0; // Trên 1.000.000 VNĐ
        }
        return 0; // Giá trị mặc định (nếu logic không khớp)
    }, [priceMemo, order?.orderItemsSelected.length]);


    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])
    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }))
        }
    }
    const handleAddCard = () => {
        if (!order?.orderItemsSelected?.length) {
            message.error('Vui lòng chọn sản phẩm')
        } else if (!user?.phone || !user?.address || !user.name || !user.city) {
            setIsOpenModalUpdateInfo(true)
        } else {
            navigate('/payment')
        }
    }
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { id, token, ...rests } = data
            const res = UserService.updateUser(id, { ...rests }, token)
            return res
        },
    )
    const { isPending, data } = mutationUpdate
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
    const itemsDelivery = [
        {
            title: '20.000 VNĐ',
            description: 'Dưới 500.000 VNĐ',
        },
        {
            title: '10.000 VNĐ',
            description: 'Từ 500.000 VNĐ đến 1.000.000 VNĐ',
        },
        {
            title: '0 VNĐ',
            description: 'Trên 1.000.000 VNĐ',
        },
    ]


    return (
        <div style={{ background: '#f5f5fa', width: '100%', padding: '10px' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h1 style={{ padding: '20px' }}>Giỏ hàng</h1>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <WrapperStyleHeaderDelivery>
                            {order?.orderItemsSelected.length > 0 && priceMemo > 0 ? (
                                <Step
                                    items={itemsDelivery}
                                    current={
                                        priceMemo < 500000
                                            ? 0
                                            : priceMemo >= 500000 && priceMemo < 1000000
                                                ? 1
                                                : priceMemo >= 1000000
                                                    ? 2
                                                    : -1
                                    }
                                />
                            ) : (
                                <Step items={itemsDelivery} current={null} />
                            )}
                        </WrapperStyleHeaderDelivery>

                        <WrapperStyleHeader>
                            <span style={{ display: 'inline-block', width: '390px' }}>
                                <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></Checkbox>
                                <span> Tất cả ( {order?.orderItems?.length} sản phẩm)</span>
                            </span>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            {order?.orderItems?.map((order) => {
                                return (
                                    <WrapperItemOrder key={order?.product}>
                                        <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                                            <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                            <div style={{
                                                width: '260px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}>{order?.name}</div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                                            </span>
                                            <WrapperCountOrder>
                                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product, order?.amount === 1)}>
                                                    <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                                <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order.countInstock} />
                                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product, order?.amount === order.countInstock, order?.amount === 1)}>
                                                    <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                            </WrapperCountOrder>
                                            <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}</span>
                                            <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                                        </div>
                                    </WrapperItemOrder>
                                )
                            })}
                        </WrapperListOrder>
                    </WrapperLeft>
                    <WrapperRight>
                        <div style={{ width: '400px' }}>
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
                        <ButtonComponent
                            onClick={() => handleAddCard()}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '400px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            textButton={'Mua hàng'}
                            styletextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonComponent>
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
        </div>
    )
}

export default OrderPage