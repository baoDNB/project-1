import { Col, Row, Image } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import imageProduct from '../../assets/images/test.webp'
import imageProductSmall from '../../assets/images/imagesmall.webp'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperTextProduct } from './style'
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'
import Loading from '../LoadingComponent/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import { addOrderProduct, resetOrder } from '../../redux/silces/orderSilce'
import { convertPrice, initFacebookSDK } from '../../utils'
import * as message from '../MessageComponent/Message'
import LikeButtonComponent from '../LikeButton/LikeButtonComponent'
import CommentComponent from '../Comment/CommentComponent'

function ProductDetailsComponent({ idProduct }) {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const [errorLimitOrder, setErrorLimitOrder] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const onChange = (value) => {
        setNumProduct(Number(value))
    }
    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }
    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
        if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true)
        }
    }, [numProduct])
    useEffect(() => {
        if (order.isSuccessOrder) {
            message.success('Đã thêm vào giỏ hàng')
        }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSuccessOrder])

    const handleChangeCount = (type, limited) => {
        if (type === 'increase') {
            if (!limited) {
                setNumProduct(numProduct + 1)
            }

        } else {
            if (!limited) {
                setNumProduct(numProduct - 1)
            }

        }
    }
    useEffect(()=>{
        initFacebookSDK()
    },[])
    const renderStar = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(<StarFilled style={{ fontSize: '12px', color: 'rgb(253,216,54)' }} key={i} />);
        }
        return stars;
    };
    const { isLoading, data: productDetails } = useQuery({ queryKey: ['products-details', idProduct], queryFn: fetchGetDetailsProduct, enable: !!idProduct })
    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            // {
            //     name:{type:String, required:true},
            //     amount:{type:Number, required:true},
            //     image:{type:String, required:true},
            //     price:{type:String, required:true},
            //     product:{
            //         type: mongoose.Schema.Types.ObjectId,
            //         ref:'Product',
            //         required:true,
            //     },
            // },
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }


    return (
        <Loading isLoading={isLoading}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image src={productDetails?.image} alt="image product" preview={false} />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        {Array(6).fill().map((_, index) => (
                            <WrapperStyleColImage span={4} key={index}>
                                <WrapperStyleImageSmall
                                    src={productDetails?.image}
                                    alt={`image small ${index + 1}`}
                                    preview={false}
                                />
                            </WrapperStyleColImage>
                        ))}
                    </Row>

                </Col>
                <Col span={10} style={{ paddingLeft: '20px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div>
                        {renderStar(productDetails?.rating)}
                        <WrapperStyleTextSell> |Đã bán {productDetails?.selled} </WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperTextProduct>{convertPrice(productDetails?.price)}</WrapperTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Giao đến </span>
                        <span className='address'>{user?.address}</span> -
                        <span className='change-address'>Đổi địa chỉ</span>

                    </WrapperAddressProduct>
                    <LikeButtonComponent dataHref={ 
                        process.env.REACY_APP_IS_LOCAL 
                        ? "https://developers.facebook.com/docs/plugins/"
                        : window.location.href} 
                        />
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numProduct === 1)}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber onChange={onChange} defaultValue={1} min={1} max={productDetails?.countInStock} value={numProduct} size='small' />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div>
                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '220px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                onClick={handleAddOrderProduct}
                                textButton={'Chọn mua'}
                                styletextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                            {errorLimitOrder && <div style={{ color: 'red' }}>Sản phẩm hết hàng</div>}
                        </div>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid rgb(13, 92, 182)',
                                borderRadius: '4px'
                            }}
                            textButton={'Mua trả sau'}
                            styletextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                        ></ButtonComponent>
                    </div>
                    <div>
                        <div style={{ marginBottom: '20px', padding: '20px 0px' }}>Miêu tả </div>
                        <WrapperStyleTextSell> {productDetails?.description}</WrapperStyleTextSell>
                    </div>
                </Col>
                <CommentComponent dataHref={
                    process.env.REACY_APP_IS_LOCAL
                    ? "https://developers.facebook.com/docs/plugins/comments#configurator"
                    : window.location.href
                } width="1270" />
            </Row>
        </Loading>
    )
}

export default ProductDetailsComponent