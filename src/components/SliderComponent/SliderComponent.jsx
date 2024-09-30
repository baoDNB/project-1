import { Image } from "antd";
import React from "react";
import Slider from "react-slick";

const SliderComponent = ({arrImages}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:4000,
      };
    return(
        <Slider {...settings}> 
            {arrImages.map((image, index) => (
                <div key={index}> 
                    <Image src={image} alt="slider" preview={false} width="100%" height="450px" />
                </div>
            ))}
        </Slider>
    )
}

export default SliderComponent