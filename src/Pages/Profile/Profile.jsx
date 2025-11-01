

import { use, useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";


const Profile = () => {
    const {  signOutUser } = use(AuthContext);

    const handleSignOut = () => {
        signOutUser()
            .then()
            .catch()
    }
    const { user } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        updateProfile(user, {
            displayName: name,
            photoURL: photo,
        })
            .then(() => {
                toast.success("Profile updated successfully!");
                setIsEditing(false);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to update profile.");
            });

    };

    return (
        <div className="max-w-lg mx-auto my-10 bg-white shadow-lg rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-[#2C1B0E] mb-6">My Profile</h2>
            <img
                src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/user.png"}
                alt="Profile"
                className="w-28 h-28 mx-auto rounded-full mb-4 object-cover border-4 border-[#c78947]"
            />
            <h3 className="text-xl font-semibold">{user?.displayName}</h3>
            <p className="text-gray-500">{user?.email}</p>

            {!isEditing ? (
                <div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-6  bg-[#c78947] text-white px-5 py-2 rounded-xl hover:bg-[#5e3f1e] transition"
                    >
                        Update Profile
                    </button>
                     <button onClick={handleSignOut} className="mt-6 ml-6 bg-[#c78947] text-white px-5 py-2 rounded-xl hover:bg-[#5e3f1e] transition">Logout</button>
                </div>
            ) : (
                <form onSubmit={handleUpdateProfile} className="mt-6 space-y-4 text-left">
                    <div>
                        <label className="font-medium">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                            placeholder="Enter new name"
                            required
                        />
                    </div>
                    <div>
                        <label className="font-medium">Image URL:</label>
                        <input
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            className="w-full border rounded-lg p-2 mt-1"
                            placeholder="Enter image URL"
                            required
                        />
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            type="submit"
                            className="bg-[#c78947] text-white px-5 py-2 rounded-xl hover:bg-[#5e3f1e] transition"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-400 text-black px-5 py-2 rounded-xl hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Profile;
