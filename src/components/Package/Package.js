import React from 'react';
import './Package.css';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link } from 'react-router-dom';

const Package = ({ data }) => {
    return (
        <div className="package">
            <div className="package_image">
                <img src={data.thumbnail} alt={data.title} />
                <Link to={`/packages/${data._id}`} className="package_btn">Book Now</Link>
            </div>
            <div className="package_content">
                <div className="package_meta">
                    <p><strong>${data.price} </strong> /Per Person</p>
                    <p> <CalendarTodayIcon className="package_icon" /> {data.duration}</p>
                </div>
                <h2 className="package_title">
                    <Link to={`/packages/${data._id}`}>{data.title}</Link>
                </h2>
            </div>
        </div>
    );
};

export default Package;