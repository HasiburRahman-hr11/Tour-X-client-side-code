import React from 'react';
import './Testimonial.css';
import Container from '@mui/material/Container';
import Slider from "react-slick";
import { testimonials } from '../../fakeData';

const Testimonial = () => {

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <section className="testimonial_section section">
            <Container fixed>
                <div className="section_header">
                    <p>Our Traveller Say</p>
                    <h2>What Our Traveller Say About Us</h2>
                </div>
                <div className="testimonial_slider_wrapper">
                    <Slider {...settings}>
                        {testimonials.map((item, ind) => (
                            <div className="testimonial_item" key={ind}>
                                <div className="testimonial_item_wrapper">
                                    <img src={item.image} alt={item.name} />
                                    <h2>{item.name}</h2>
                                    <h3>Traveller</h3>
                                    <p>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

export default Testimonial;