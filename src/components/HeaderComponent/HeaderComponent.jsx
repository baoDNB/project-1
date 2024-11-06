import React, { useState } from "react";
import { Badge,  Col, Popover } from 'antd';
import { WrapperContentPopup, WrapperHeader,WrapperHeaderAccount,WrapperTextHeader,WrapperTextHeaderSmall} from "./style";
import  ButtonInputSearch  from "../ButtonInputSearch/ButtonInputSearch";
import {
    UserOutlined,DownOutlined,ShoppingCartOutlined  
}from'@ant-design/icons'
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/silces/userSlice'
import Loading from "../LoadingComponent/Loading";


const HeaderComponent=()=>{
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleNavigateLogin =()=>{
        navigate('/sign-in')
    }
    const handleLogout = async () =>{
        setLoading(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setLoading(false)
    }
    const content = (
        <div>
          <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
          <WrapperContentPopup onClick={()=> navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
        </div>
      );

    return(
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>
                        SIEUTHIDOGOM
                    </WrapperTextHeader>
                </Col>
                <Col span={12}>
                    <ButtonInputSearch
                        placeholder="Tìm kiếm sản phẩm"
                        textButton="Tìm kiếm"
                        size="large"
                        bordered ={false}
                    />
                </Col>
                <Col span={6} style={{display:'flex', gap:'20px', alignItems:'center' }}>
                <Loading isLoading={loading}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{fontSize:`30px` }}/>
                        {user?.name ?(
                            <>
                                
                                <Popover content={content} trigger="click">
                                    <div style={{cursor: 'pointer'}}>{user.name}</div>
                                </Popover>
                            </>
                        ):(
                            <div onClick={handleNavigateLogin} style={{cursor:'pointer'}}>
                            <WrapperTextHeaderSmall>Đăng nhập/ Đăng ký</WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>Tài khoản </WrapperTextHeaderSmall>
                                <DownOutlined />
                            </div>
                        </div>

                        )}
                        
                    </WrapperHeaderAccount>
                </Loading>
                    <div>
                        <div>
                            <Badge count={4} size="small">
                                <ShoppingCartOutlined style={{fontSize:`30px`, color:'#000',gap:'20px' }} />
                            </Badge>
                            <WrapperTextHeaderSmall> Giỏ hàng  </WrapperTextHeaderSmall>
                        </div>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent