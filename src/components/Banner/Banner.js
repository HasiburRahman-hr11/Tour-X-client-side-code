import React from 'react';
import './Banner.css';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { banner } from '../../fakeData';
import Container from '@mui/material/Container';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <button
            className="slider_next slider_arrow"
            onClick={onClick}
        >
            <ArrowForwardIosIcon className="arrow_icon" />
        </button>
    );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <button
            className="slider_prev slider_arrow"
            onClick={onClick}
        >
            <ArrowBackIosNewIcon className="arrow_icon" />
        </button>
    );
}

const Banner = () => {
    const settings = {
        dots: false,
        infinite: true,
        fade: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <Slider {...settings}>

            {banner.map((item, ind) => (
                <div key={ind} className="banner_item">
                    <img src={item.image} alt={item.title} />
                    <div className="banner_content">
                        <Container>
                            <h1>{item.title}</h1>
                            <h4>{item.duration}</h4>
                            <Link to="/packages" className="banner_btn">Book Now</Link>
                        </Container>
                    </div>
                </div>
            ))}

        </Slider>
    );
};

export default Banner;

