import React from 'react';
import Banner from '../../components/Banner/Banner';
import Offer from '../../components/Offer/Offer';
import PackagesSection from '../../components/PackagesSection/PackagesSection';


const Home = () => {
    return (
        <>
            <Banner/>
            <PackagesSection/>
            <Offer/>
        </>
    );
};

export default Home;