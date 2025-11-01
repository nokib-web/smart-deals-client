import React from 'react';
import { useLoaderData } from 'react-router';
import Product from '../Home/Product';

const AllProducts = () => {
    const products = useLoaderData();

    console.log(products)
    return (
        <div>
            <h2 className="text-3xl my-10 font-semibold text-center mb-6">
                All <span className="text-primary">Product</span>
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10'>
                {
                    products.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default AllProducts;