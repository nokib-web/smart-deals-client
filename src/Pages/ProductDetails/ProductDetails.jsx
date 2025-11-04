import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData, Link } from 'react-router';
import {
    ArrowLeft,
    MapPin,
    Mail,
    Phone,
    Circle,
    ShoppingCart,
} from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { user, } = use(AuthContext)
    const product = useLoaderData() || {};
    const [bids, setBids] = useState([])
    const bidModalRef = useRef(null)



    const handleBidModal = () => {
        bidModalRef.current.showModal()
    }

    // Destructure all data fields with safe fallbacks
    const {
        _id = 'D#773a27fca386e8214',
        title = 'Yamaha Fz Guitar For Sale',
        price_min = 22.5,
        price_max = 30,
        email = 'sara.chen@shop.net',
        category = 'Art and Hobbies',
        created_at = '2025-10-30T12:00:00Z',
        image = '',
        status = 'pending',
        location = 'Dhaka',
        seller_image = '',
        seller_name = 'Abdur Rahim',
        condition = 'fresh',
        usage = '2 months old',
        description = 'iPhone 14 Pro, 128GB, deep purple color, excellent condition.',
        seller_contact = '+8801712345678',
    } = product;

    useEffect(() => {
        fetch(`https://smart-deals-server.onrender.com/products/bids/${_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBids(data)
            })
    }, [_id])

    const handleBidSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        console.log(email, name, bid, _id)

        const newBid = {
            product: _id,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,
            bid_price: bid,
            status: 'pending'
        }

        fetch('https://smart-deals-server.onrender.com/bids', {

            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    bidModalRef.current.close()
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "Your bid has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid]
                    newBids.sort((a, b) => b.bid_price - a.bid_price)
                    setBids(newBids);
                }
            })

    }



    // Format posted date
    const postedDate = new Date(created_at).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });



    return (
        <div className='w-11/12 my-10 mx-auto p-6'>
            <div className="p-10  grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100">

                {/* Left Column: Image + Description */}
                <div>
                    {/* Image Placeholder */}
                    <div className=" h-48 w-full mb-8 flex items-center justify-center text-gray-500 font-handwritten text-4xl">
                        {image ? (
                            <img src={image} alt={title} className="w-1/2 h-full " />
                        ) : (
                            'Image'
                        )}
                    </div>

                    {/* Product Description */}
                    <h2 className="text-sm font-semibold text-purple-600 mb-1">Product Description</h2>
                    <div className="text-sm mb-2 flex gap-8">
                        <span><strong>Condition:</strong> {condition}</span>
                        <span><strong>Usage Time:</strong> {usage}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
                </div>

                {/* Right Column: Details */}
                <div>
                    {/* Back Link */}
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-8 transition"
                    >
                        <ArrowLeft size={16} />
                        Back To Products
                    </button>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-blue-900 mb-1">{title}</h1>

                    {/* Category Badge */}
                    <span className="badge badge-sm bg-purple-200 text-purple-800 mb-6">{category}</span>

                    {/* Price Box */}
                    <div className="bg-gray-50 rounded-lg shadow-lg p-4 mb-6">
                        <p className="text-xl font-bold">${price_min} - {price_max}</p>
                        <p className="text-xs text-gray-500">Price starts from</p>
                    </div>

                    {/* Product Details Box */}
                    <div className="bg-gray-50 rounded-lg shadow-lg p-4 mb-6">
                        <p className="text-sm"><strong>Product ID:</strong> {_id}</p>
                        <p className="text-sm"><strong>Posted:</strong> {postedDate}</p>
                    </div>

                    {/* Seller Information */}
                    <h2 className="text-lg font-semibold text-blue-900 mb-3">Seller Information</h2>
                    <div className="bg-gray-50 rounded-lg shadow-lg p-4 mb-6">
                        <div className="flex items-center mb-2">
                            <div className="avatar">
                                <div className="w-8 rounded-full bg-gray-300">
                                    {seller_image ? <img src={seller_image} alt={seller_name} /> : <span className="text-white">{seller_name[0]}</span>}
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium">{seller_name}</p>
                                <p className="text-xs text-gray-500">{email}</p>
                            </div>
                        </div>
                        <p className="text-sm flex items-center mb-1">
                            <MapPin className="w-4 h-4 mr-1 text-gray-500" /> Location: {location}
                        </p>
                        <p className="text-sm flex items-center mb-1">
                            <Phone className="w-4 h-4 mr-1 text-gray-500" /> Contact: {seller_contact}
                        </p>
                        <p className="text-sm flex items-center mb-1">
                            <Mail className="w-4 h-4 mr-1 text-gray-500" /> {email}
                        </p>
                        <span className="badge badge-warning text-xs mt-2">
                            <Circle className="w-2 h-2 mr-1 fill-yellow-600" /> {status}
                        </span>
                    </div>

                    {/* Buy Button */}
                    <button onClick={handleBidModal} className="btn btn-primary w-full text-white">
                        <ShoppingCart className="w-4 h-4 mr-2" /> I Want Buy This Product
                    </button>



                    {/* Open the modal using document.getElementById('ID').showModal() method */}

                    <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Give Seller Your Offered Price</h3>
                            <p className="py-4">Offer something seller can not resist</p>
                            <div className=" ">
                                <form onSubmit={handleBidSubmit} method="dialog">
                                    {/* Buyer Name & Email - Two Columns */}
                                    <div className="grid  grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700 mb-1">
                                                Buyer Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                disabled
                                                defaultValue={user?.displayName}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="buyerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                                                Buyer Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                disabled
                                                defaultValue={user?.email}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    {/* Buyer Image URL */}
                                    <div>
                                        <label htmlFor="buyerImage" className="block text-sm font-medium text-gray-700 mb-1">
                                            Buyer Image URL
                                        </label>
                                        <input
                                            type="url"
                                            name="url"
                                            placeholder="https://your_image_url"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>

                                    {/* Price Offer */}
                                    <div>
                                        <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-700 mb-1">
                                            Place Your Price
                                        </label>
                                        <input
                                            type="text"
                                            name="bid"
                                            placeholder="Place your bid amount"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>

                                    {/* Contact Info */}
                                    <div>
                                        <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
                                            Contact Info
                                        </label>
                                        <input
                                            type="text"
                                            name="contact"
                                            placeholder="+880 1234567890"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className='flex gap-4 justify-end'>
                                        <button
                                            type="submit"
                                            className=" p-4 my-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                            Submit Offer
                                        </button>
                                        {/* if there is a button in form, it will close the modal */}
                                        <button onClick={() => bidModalRef.current.close()} className=" p-4 my-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition flex items-center justify-center gap-2">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>

            <h1 className='text-3xl text-center my-10 font-bold'>Bids For this Products: {bids.length}</h1>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> SL. NO</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Bid Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bids.map((bid, index) => <tr key={bid._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid.buyer_name}</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {bid.buyer_email}
                                </td>
                                <td>{bid.bid_price}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>





        </div>
    );
};

export default ProductDetails;