import './Banner.css';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import Container from '@mui/material/Container';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


/* --------- Slick Custom Arrow Components ---------- */
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
/* --------- Slick Custom Arrow Components ---------- */

const Banner = ({packages}) => {

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

            {packages.slice(0, 4).map((item, ind) => (
                <div key={item._id} className="banner_item">
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="banner_content">
                        <Container>
                            <h1>Amazing Tour in {item.location}</h1>
                            <h4>{item.duration}</h4>
                            <Link to={`/packages/${item._id}`} className="banner_btn">Book Now</Link>
                        </Container>
                    </div>
                </div>
            ))}

        </Slider>
    );
};

export default Banner;

