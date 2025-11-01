import React from 'react';
import LatestProducts from './LatestProducts';

const LatestProductsPromise = fetch('http://localhost:3000/latest-products').then(res=>res.json())

const Home = () => {
    return (
        <div>
            
            <LatestProducts LatestProductsPromise={LatestProductsPromise} ></LatestProducts>
          
        </div>
    );
};

export default Home;