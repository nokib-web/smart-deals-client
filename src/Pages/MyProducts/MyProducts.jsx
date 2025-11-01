import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuthState } from "react-firebase-hooks/auth";
 // adjust path to your firebase config

import { auth } from "../../firebase/firebase.config";
import { Link } from "react-router";


const MyProducts = () => {
    const [user] = useAuthState(auth);
    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/products?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => setMyProducts(data))
                .catch((error) => console.error(error));
        }
    }, [user]);

    // 🗑 Delete product
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently remove your product.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#632EE3",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/products/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then(() => {
                        setMyProducts(myProducts.filter((p) => p._id !== id));
                        Swal.fire("Deleted!", "Your product has been removed.", "success");
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    // ✏️ Edit product
    const handleEdit = async (product) => {
        const { value: formValues } = await Swal.fire({
            title: "Edit Product Price",
            html: `
        <input id="price_min" type="number" placeholder="Min Price" class="swal2-input" value="${product.price_min}">
        <input id="price_max" type="number" placeholder="Max Price" class="swal2-input" value="${product.price_max}">
      `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: "#632EE3",
            preConfirm: () => {
                return {
                    price_min: document.getElementById("price_min").value,
                    price_max: document.getElementById("price_max").value,
                };
            },
        });

        if (formValues) {
            fetch(`http://localhost:3000/products/${product._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues),
            })
                .then((res) => res.json())
                .then(() => {
                    Swal.fire("Updated!", "Product price updated successfully.", "success");
                    setMyProducts((prev) =>
                        prev.map((p) =>
                            p._id === product._id
                                ? { ...p, ...formValues }
                                : p
                        )
                    );
                })
                .catch((err) => console.error(err));
        }
    };

    // 💰 Mark as Sold
    const handleMarkSold = (id) => {
        Swal.fire({
            title: "Mark this product as sold?",
            text: "This action will update its status to 'sold'.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#632EE3",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Yes, mark as sold",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/products/${id}`, {
                    method: "PATCH",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ status: "sold" }),
                })
                    .then((res) => res.json())
                    .then(() => {
                        setMyProducts((prev) =>
                            prev.map((p) =>
                                p._id === id ? { ...p, status: "sold" } : p
                            )
                        );
                        Swal.fire("Done!", "Product marked as sold.", "success");
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <h2 className="text-3xl text-center font-semibold mb-6">
                My <span className="text-primary">Products</span>
            </h2>

            {myProducts.length === 0 ? (
                <p className="text-gray-500 text-center">
                    You haven’t added any products yet.{" "} <br />
                    br
                    <Link to="/create-products" className="text-primary underline">
                        Create one now
                    </Link>
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className=" my-4">
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price Range ($)</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myProducts.map((product, index) => (
                                <tr key={product._id}>
                                    <th>{index + 1}</th>

                                    {/* Product info */}
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={product.image} alt={product.title} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.title}</div>
                                                <div className="text-sm opacity-50">
                                                    {product.location}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category */}
                                    <td>{product.category}</td>

                                    {/* Price Range */}
                                    <td>
                                        ${product.price_min} - $
                                        {product.price_max || product.price_min}
                                    </td>

                                    {/* Status */}
                                    <td>
                                        {product.status === "pending" ? (
                                            <div className="badge badge-warning">Pending</div>
                                        ) : product.status === "sold" ? (
                                            <div className="badge badge-neutral">Sold</div>
                                        ) : (
                                            <div className="badge badge-success capitalize">
                                                {product.status}
                                            </div>
                                        )}
                                    </td>

                                    {/* Actions */}
                                    <td className="flex my-4 gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="btn btn-xs btn-outline border-primary"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleMarkSold(product._id)}
                                            className="btn btn-xs btn-outline border-success"
                                        >
                                            Sold
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="btn btn-xs btn-outline border-error"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyProducts;
