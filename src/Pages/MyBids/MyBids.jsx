import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const MyBids = () => {
    const { user } = use(AuthContext);
    const [bids, setBids] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`https://smart-deals-server.onrender.com/bids?email=${user.email}`,{
                headers: {
                    authorization : `bearer ${user.accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setBids(data)
                })

        }
    }, [user?.email, user?.accessToken]);

    const handleDeleteBid = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://smart-deals-server.onrender.com/bids/${_id}`,{
                    method:'DELETE',

                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.deletedCount){

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your bid has been deleted.",
                            icon: "success"
                        });

                        const remainingBids =  bids.filter(bid=>bid._id !==_id);
                        setBids(remainingBids)
                    }
                 
                })
            }
        });


    }


    return (
        <div className='my-10'>
            <h1 className='text-3xl font-bold text-center my-10'>My Bids: <span className='text-primary'>{bids.length}</span></h1>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> SL. NO</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Bid Price</th>
                            <th>Status</th>
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
                                                    src={user ? user.photoURL : {}}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid.buyer_name}</div>
                                            <div className="text-sm opacity-50">Dhaka</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {bid.buyer_email}
                                </td>
                                <td>{bid.bid_price}</td>
                                <td>
                                    {bid.status === 'pending' ? <div className='badge badge-warning'>
                                        {bid.status}
                                    </div> : <div className='badge badge-success'>
                                        {bid.status}
                                    </div>
                                    }

                                </td>
                                <th>
                                    <button onClick={() => handleDeleteBid(bid._id)} className="btn btn-outline border-primary btn-xs">Remove Bids</button>
                                </th>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default MyBids;