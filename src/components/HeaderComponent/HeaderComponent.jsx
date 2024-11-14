import React, { useEffect, useState } from "react";
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


const HeaderComponent=( {isHiddenSearch = false, isHiddenCart= false})=>{
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [userName,setUserName]= useState('')
    const [userAvatar,setUserAvatar]= useState('')
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
    useEffect(()=>{
        setLoading(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setLoading(false)
    },[user?.name, user?.avatar])
    const content = (
        <div>
          <WrapperContentPopup onClick={()=> navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
          {user?.isAdmin&&(
                      <WrapperContentPopup onClick={()=> navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>

          )}
          <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>

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
                <Col span = {13}>
                {!isHiddenSearch && (
                <ButtonInputSearch
                    size="large"
                    textButton="Tìm kiếm"
                    placeholder='input search text'
                    bordered={false}
                    />
                )}
            </Col>
                <Col span={6} style={{display:'flex', gap:'20px', alignItems:'center' }}>
                <Loading isLoading={loading}>
                    <WrapperHeaderAccount>
                        {userAvatar ?(
                            <img src={userAvatar} alt="avatar" style={{
                                height:'30px',
                                width:'30px',
                                borderRadius:'50%',
                                objectFit:'cover'
                              }}/>
                        ):(
                            <UserOutlined style={{fontSize:`30px` }}/>
                        )}
                        {user?.access_token ?(
                            <>
                                <Popover content={content} trigger="click">
                                    <div style={{cursor: 'pointer'}}>{userName?.length ? userName : user?.email}</div>
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
                {!isHiddenCart &&(
                    <div>
                    <div>
                        <Badge count={4} size="small">
                            <ShoppingCartOutlined style={{fontSize:`30px`, color:'#000',gap:'20px' }} />
                        </Badge>
                        <WrapperTextHeaderSmall> Giỏ hàng  </WrapperTextHeaderSmall>
                    </div>
                </div>
                )}
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent