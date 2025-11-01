import React from 'react';
import { Link } from 'react-router';

const Product = ({ product }) => {
    // console.log(product)
    const { title, price_min, price_max, _id } = product;
    return (
        <div>
            <div className="card bg-base-100 shadow-sm">
                <figure className="px-5 pt-5">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes"
                        className="rounded-xl" />
                </figure>
                <div className="card-body  ">
                    <h2 className="card-title">{title}</h2>
                    <p>price: ${price_min}-${price_max}</p>
                    <div className="">
                     <Link to={`/productDetails/${_id}`}>
                        <button className=" btn btn-outline w-full rounded-xl border-primary">View Details</button>
                     </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;