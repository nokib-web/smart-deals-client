import React, { use } from 'react';
import Product from './Product';


const LatestProducts = ({ LatestProductsPromise }) => {
    const products = use(LatestProductsPromise)
    console.log(products)

    return (
        <div>
            <h1 className='text-3xl my-10 font-semibold text-center items-center'>Latest <span className='text-primary'>products</span></h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>

                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>

        </div>
    );
};

export default LatestProducts;