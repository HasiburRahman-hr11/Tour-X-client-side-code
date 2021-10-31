import React, { useEffect, useState } from 'react';
import './ToTop.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ToTop = () => {
    const [isActive, setIsActive] = useState(false);
    const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

    const scrollFunc = () =>{
        if (window.pageYOffset > 500) {
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', scrollFunc)

        return () =>{
            window.removeEventListener('scroll' , scrollFunc);
        }

    }, [])
    return (
        <div className={isActive ? 'to_top active' : 'to_top'}
            onClick={scrollTop}
        >
             <KeyboardArrowUpIcon />
        </div>
    );
};

export default ToTop;