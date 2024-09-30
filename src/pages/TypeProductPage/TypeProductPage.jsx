import React from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Col, Row } from 'antd'

const TypeProductPage = () => {
  return (
    <Row style={{ 
        padding: '0 120px', 
        background: '#fefefe', 
        flexWrap: 'nowrap', 
        paddingTop: '10px' ,
        
    }}>
        <Col span={4} style={{ 
            background: '#fff', 
            marginRight: '10px', 
            padding: '10px', 
            borderRadius: '6px' 
        }}>
            <NavbarComponent />
        </Col>
    
        <Col span={20}>
            <CardComponent />
        </Col>
    </Row>
    
  )
}

export default TypeProductPage