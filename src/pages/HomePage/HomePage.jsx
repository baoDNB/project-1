import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/silder1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp"
import CardComponent from "../../components/CardComponent/CardComponent";
const HomePage=()=>{
    const arr=['Trang chủ', 'Sản phẩm']
    return(
        <>
        <div style={{padding:'0 120px'}}>
            <WrapperTypeProduct>
                {arr.map((item)=>{
                    return(
                        <TypeProduct name={item} key={item}/>
                    )
                })}
            </WrapperTypeProduct>
        </div>
        <div id="container" style={{padding:'0', height:'1000px',width:'100%'}}>
            <SliderComponent arrImages={[slider1, slider2, slider3]}/>
            <div style={{marginTop:'20px',display:'flex', alignItems:'center', gap:'20px', padding:'0 120px', flexWrap:'wrap'}}>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>

            </div>
            <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'10px' }}>
                <WrapperButtonMore textButton="Xem thêm" type="outline" styleButton={{
                    border:'1px solid rgb(11,116,229)', color:'rgb(11,116,229)',
                    width:'240px',height:'38px',borderRadius:'4px'
                }}
                styleTextButton={{fontWeight:500}}/>
            </div>
        </div>
        </>
    )
}

export default HomePage