import React from 'react'
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from 'react-router';

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  return (
    <div style={{ width: '100%', background: '#efefef', height: '100vh' }}>
      <div style={{width:'1270px', height:'100%',margin:'0 auto'}}>
        <h5><span style={{cursor:'pointer', fontWeight:'bold'}} onClick={()=>{navigate('/')}}>Trang chủ</span>- Chi tiết sản phẩm</h5>
        <ProductDetailsComponent idProduct={id} />
        </div>
    </div>
  )
}

export default ProductDetailPage