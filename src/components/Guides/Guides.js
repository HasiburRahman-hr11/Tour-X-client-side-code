import React from 'react';
import Container from '@mui/material/Container';
import Slider from "react-slick";
import { guides } from '../../fakeData';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './Guides.css'

const Guides = () => {

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
           
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };

    return (
        <div className="guides_section">
            <Container fixed>
                <div className="section_header">
                    <p>Tour Guide</p>
                    <h2>Meet our expert guides</h2>
                </div>

                <div className="guides_slider_wrapper">
                    <Slider {...settings}>
                        {guides.map((guide, ind) => (
                            <div className="guides_item" key={ind}>
                                <div className="guides_item_wrapper">
                                    <img src={guide.image} alt={guide.name} />

                                    <div className="guide_meta">
                                        <h2>{guide.name} </h2>
                                        <h4>Tour Guide</h4>

                                        <div className="guide_social_links">
                                            <ul>
                                                <li>
                                                    <InstagramIcon className="guide_social_icon" />
                                                </li>
                                                <li>
                                                    <FacebookIcon className="guide_social_icon" />
                                                </li>
                                                <li>
                                                    <TwitterIcon className="guide_social_icon" />
                                                </li>
                                                <li>
                                                    <WhatsAppIcon className="guide_social_icon" />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </Container>
        </div>
    );
};

export default Guides;