import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/silder1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp"
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(5)
    const [typeProducts, setTypeProducts] = useState([])

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]

        const res = await ProductService.getAllProduct(search, limit)
        return res
    }

    const fetcAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }
    const { isLoading, data: products, isPreviousData } = useQuery({ queryKey: ['products', limit, searchDebounce], queryFn: fetchProductAll, retry: 3, retryDelay: 1000, keepPreviousData: true })

    useEffect(() => {
        fetcAllTypeProduct()
    }, [])

    return (
        <Loading isLoading={isLoading || loading}>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {typeProducts.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct>
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: '#efefef', padding: '10px' }}>
                <div id="container" style={{ padding: '0', height: '100%', width: '100%', margin: '0 auto' }}>
                    <SliderComponent arrImages={[slider1, slider2, slider3]} />
                    <div style={{ padding: '0', height: '100%', width: '1270px', margin: '0 auto' }}>
                        <h1>Sản phẩm mới nhất </h1>
                        <WrapperProducts>
                            {products?.data?.map((product) => {
                                return (
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
                                        id={product._id}
                                    />
                                )
                            })}

                        </WrapperProducts>
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <WrapperButtonMore
                                textButton={isPreviousData ? 'Tải thêm' : "Xem thêm"} type="outline" styleButton={{
                                    border: '1px solid rgb(11,116,229)', color: `${products?.total === products?.data?.length ? '#ccc' : 'rgb(11,116,229)'}`,
                                    width: '240px', height: '38px', borderRadius: '4px'
                                }}
                                disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                                styletextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
                                onClick={() => setLimit((prev) => prev + 5)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Loading>
    )
}

export default HomePage