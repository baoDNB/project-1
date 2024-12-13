import React, { useEffect, useState } from "react";
import { Badge, Col, Popover } from 'antd';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from "./style";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import {
    UserOutlined, DownOutlined, ShoppingCartOutlined
} from '@ant-design/icons'
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/silces/userSlice'
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/silces/productSlice";
import { resetOrder } from '../../redux/silces/orderSilce';


const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [isOpnePopup, setIsOpnePopup] = useState(false)
    const order = useSelector((state) => state.order)
    const [loading, setLoading] = useState(false)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleLogout = async () => {
        setLoading(true)
        await UserService.logoutUser()
        navigate('/')
        dispatch(resetOrder())
        dispatch(resetUser())
        setLoading(false)
    }
    useEffect(() => {
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    }, [user?.name, user?.avatar])
    const content = (
        <div>
            <WrapperContentPopup onClick={() => handleClickNavigate('profile')}>Thông tin người dùng</WrapperContentPopup>
            <WrapperContentPopup onClick={() => handleClickNavigate('my-order')}>Đơn hàng của tôi </WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => handleClickNavigate('admin')}>Quản lý hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopup>

        </div>
    );
    const handleClickNavigate = (type) => {
        if (type === 'profile') {
            navigate('/profile-user')
        } else if (type === 'admin') {
            navigate('/system/admin')
        } else if (type === 'my-order') {
            navigate('/my-order', {
                state: {
                    id: user?.id,
                    token: user?.access_token
                }
            })
        } else {
            handleLogout()
        }
        setIsOpnePopup(false)
    }
    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }
    const handleNavigateCart = () => {
        if (!user?.access_token) {
            navigate('/sign-in', { state: { from: '/order' } });
        } else {
            navigate('/order');
        }
    };


    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader to='/'>
                        SIEUTHIDOGOM
                    </WrapperTextHeader>
                </Col>
                <Col span={13}>
                    {!isHiddenSearch && (
                        <ButtonInputSearch
                            style={{}}
                            size="large"
                            textButton="Tìm kiếm"
                            placeholder='input search text'
                            bordered={false}
                            onChange={onSearch}
                        />
                    )}
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Loading isLoading={loading}>
                        <WrapperHeaderAccount>
                            {userAvatar ? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                            ) : (
                                <UserOutlined style={{ fontSize: `30px` }} />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click" opne={isOpnePopup}>
                                        <div style={{ cursor: 'pointer' }} onClick={() => setIsOpnePopup((prep) => !prep)}>{userName?.length ? userName : user?.email}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeaderSmall>Đăng nhập/ Đăng ký</WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>Tài khoản </WrapperTextHeaderSmall>
                                        <DownOutlined />
                                    </div>
                                </div>

                            )}

                        </WrapperHeaderAccount>
                    </Loading>
                    {!isHiddenCart && (
                        <div onClick={handleNavigateCart} style={{ cursor: 'pointer' }}>
                            <Badge count={order?.orderItems?.length} size="small">
                                <ShoppingCartOutlined style={{ fontSize: `30px`, color: '#000', gap: '20px' }} />
                            </Badge>
                            <WrapperTextHeaderSmall> Giỏ hàng  </WrapperTextHeaderSmall>
                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent