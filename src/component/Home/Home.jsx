import React from 'react';
import LatestProducts from './LatestProducts';

const LatestProductsPromise = fetch('https://smart-deals-server.onrender.com/latest-products').then(res=>res.json())

const Home = () => {
    return (
        <div>
            
            <LatestProducts LatestProductsPromise={LatestProductsPromise} ></LatestProducts>
          
        </div>
    );
};

export default Home;