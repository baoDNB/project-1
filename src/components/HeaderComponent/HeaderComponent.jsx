import React from "react";
import { Badge, Col } from 'antd';
import { WrapperHeader,WrapperHeaderAccount,WrapperTextHeader,WrapperTextHeaderSmall} from "./style";
import  ButtonInputSearch  from "../ButtonInputSearch/ButtonInputSearch";
import {
    UserOutlined,DownOutlined,ShoppingCartOutlined  
}from'@ant-design/icons'
const HeaderComponent=()=>{
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
                    <WrapperHeaderAccount>
                        <UserOutlined style={{fontSize:`30px` }}/>
                        <div>
                            <WrapperTextHeaderSmall>Đăng nhập/ Đăng ký</WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>Tài khoản </WrapperTextHeaderSmall>
                                <DownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>
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