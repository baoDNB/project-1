import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/silder1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp"
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from'../../services/ProductService'
const HomePage=()=>{
    const arr=['Trang chủ', 'Sản phẩm']
    const fetchProductAll = async() =>{
        const res = await ProductService.getAllProduct()
        console.log('res',res)
        return res
    }   
    const {isLoading, data: products}= useQuery({queryKey:['products'], queryFn: fetchProductAll, retry:3, retryDelay:1000})
    console.log('data', products)

    return(
        <>
        <div style={{width:'1270px',margin:'0 auto'}}>
            <WrapperTypeProduct>
                {arr.map((item)=>{
                    return(
                        <TypeProduct name={item} key={item}/>
                    )
                })}
            </WrapperTypeProduct>
        </div>
        <div className='body' style={{width:'100%',backgroundColor:'#efefef'}}>
            <div id="container" style={{padding:'0', height:'100%',width:'1270px',margin:'0 auto'}}>
            <SliderComponent arrImages={[slider1, slider2, slider3]}/>
            <WrapperProducts>  
                {products?.data?.map((product) =>  {
                    return(
                        <CardComponent 
                            key={product._id} 
                            countInStock={product.countInStock} 
                            description={product.description} 
                            image={product.image} 
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            type={product.type}
                            discount={product.discount}
                            selled={product.selled}
                            priceDiscount={product.priceDiscount}
                            />
                    )
                })}         
                
            </WrapperProducts>  
            <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'10px' }}>
                <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
                    border:'1px solid rgb(11,116,229)', color:'rgb(11,116,229)',
                    width:'240px',height:'38px',borderRadius:'4px'
                }}
                styleTextButton={{fontWeight:500}}/>
            </div>
        </div>
        </div>
        </>
    )
}

export default HomePage