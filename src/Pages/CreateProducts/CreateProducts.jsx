import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";


const CreateProduct = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        price_min: "",
        price_max: "",
        condition: "Brand New",
        usage: "",
        image: "",
        seller_name: "",
        email: "",
        seller_contact: "",
        seller_image: "",
        location: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.title || !formData.category || !formData.price_min) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill in all required fields.",
            });
            return;
        }

        const newProduct = {
            ...formData,
            created_at: new Date(),
            status: "pending",
        };

        fetch("https://smart-deals-server.onrender.com/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                Swal.fire({
                    icon: "success",
                    title: "Product Added",
                    text: "Your product has been submitted successfully!",
                    confirmButtonColor: "#632EE3",
                });
                setFormData({
                    title: "",
                    category: "",
                    price_min: "",
                    price_max: "",
                    condition: "Brand New",
                    usage: "",
                    image: "",
                    seller_name: "",
                    email: "",
                    seller_contact: "",
                    seller_image: "",
                    location: "",
                    description: "",
                });
                navigate("/create-products");
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong while adding your product.",
                });
                console.error(error);
            });
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-8 my-10">
            <button
                onClick={() => navigate("/all-products")}
                className="text-sm item-center text-gray-500 hover:text-primary mb-4"
            >
                ← Back To Products
            </button>

            <h2 className="text-2xl font-semibold text-center mb-6">
                Create <span className="text-primary">A Product</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Title and Category */}
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. Yamaha FZ Guitar for Sale"
                        className="input input-bordered w-1/2"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="category"
                        className="select select-bordered w-1/2"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Category</option>
                        <option>Electronics</option>
                        <option>Vehicles</option>
                        <option>Furniture</option>
                        <option>Musical Instruments</option>
                        <option>Fashion</option>
                    </select>
                </div>

                {/* Price */}
                <div className="flex gap-4">
                    <input
                        type="number"
                        name="price_min"
                        placeholder="Min Price ($)"
                        className="input input-bordered w-1/2"
                        value={formData.price_min}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="price_max"
                        placeholder="Max Price ($)"
                        className="input input-bordered w-1/2"
                        value={formData.price_max}
                        onChange={handleChange}
                    />
                </div>

                {/* Condition and Usage */}
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="label-text mb-1">Product Condition</label>
                        <div className="flex items-center gap-4 mt-2">
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="condition"
                                    value="Brand New"
                                    checked={formData.condition === "Brand New"}
                                    onChange={handleChange}
                                />
                                Brand New
                            </label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="condition"
                                    value="Used"
                                    checked={formData.condition === "Used"}
                                    onChange={handleChange}
                                />
                                Used
                            </label>
                        </div>
                    </div>
                    <input
                        type="text"
                        name="usage"
                        placeholder="e.g. 2 months old"
                        className="input input-bordered w-1/2"
                        value={formData.usage}
                        onChange={handleChange}
                    />
                </div>

                {/* Image URL */}
                <input
                    type="text"
                    name="image"
                    placeholder="Product Image URL"
                    className="input input-bordered w-full"
                    value={formData.image}
                    onChange={handleChange}
                />

                {/* Seller Info */}
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="seller_name"
                        placeholder="Seller Name"
                        className="input input-bordered w-1/2"
                        value={formData.seller_name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Seller Email"
                        className="input input-bordered w-1/2"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex gap-4">
                    <input
                        type="text"
                        name="seller_contact"
                        placeholder="Seller Contact"
                        className="input input-bordered w-1/2"
                        value={formData.seller_contact}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="seller_image"
                        placeholder="Seller Image URL"
                        className="input input-bordered w-1/2"
                        value={formData.seller_image}
                        onChange={handleChange}
                    />
                </div>

                {/* Location */}
                <input
                    type="text"
                    name="location"
                    placeholder="City, Country"
                    className="input input-bordered w-full"
                    value={formData.location}
                    onChange={handleChange}
                />

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Simple description about your product..."
                    className="textarea textarea-bordered w-full"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-full text-white font-semibold"
                >
                    Create A Product
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;
