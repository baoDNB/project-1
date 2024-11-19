import React from "react";
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader, WrapperTotal } from "./style";
import { Checkbox } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import image from '../../assets/images/test.webp'
import { WrapperInputNumber } from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const OrderPage = ({ count = 1 }) => {

    const onChange = (e) => {
        console.log('checked=$(e.target.value)');
    };
    const handleChangeCount = () => {

    }
    const handleOnchangeCheckAll = (e) => {

    }
    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                <h3>Giỏ hàng</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <WrapperStyleHeader>
                            <span style={{ display: 'inline-block', width: '390px' }}>
                                <Checkbox onChange={handleOnchangeCheckAll}></Checkbox>
                                <span> Tất cả ({count} sản phẩm)</span>
                            </span>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined style={{ cursor:'pointer'}} />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            <WrapperItemOrder>
                                <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <Checkbox onChange={onChange}></Checkbox>
                                    <img src={image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                    <div>Tên sản phẩm</div>
                                </div>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>
                                        <span style={{ fontSize: '13px', color: '#242424' }}>211</span>
                                        <WrapperPriceDiscount>
                                            230
                                        </WrapperPriceDiscount>
                                    </span>
                                    <WrapperCountOrder>
                                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
                                            <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                        </button>
                                        <WrapperInputNumber onChange={onChange} defaultValue={1} value={10} size="small" />
                                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')}>
                                            <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                        </button>
                                    </WrapperCountOrder>
                                    <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>1212</span>
                                    <DeleteOutlined style={{ cursor: 'pointer' }} />
                                </div>
                            </WrapperItemOrder>
                        </WrapperListOrder>
                    </WrapperLeft>
                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                            <WrapperInfo>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Thuế</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng </span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
                                </div>
                            </WrapperInfo>
                            <WrapperTotal>
                                <span>Tổng tiền</span>
                                <span style={{ display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>0213</span>
                                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có )</span>
                                </span>
                            </WrapperTotal>
                        </div>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            textButton={'Mua hàng'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonComponent>
                    </WrapperRight>
                </div>
            </div>
        </div>
    )
}

export default OrderPage