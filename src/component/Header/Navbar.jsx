import React, { use, useState, } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import user1 from '../../assets/user-1.png'



const Navbar = () => {

    const { user,  } = use(AuthContext);

    // const handleSignOut = () => {
    //     signOutUser()
    //         .then()
    //         .catch()
    // }

    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/all-products'}>All Products</NavLink></li>


        {
            user && <>
                <li><NavLink to={'/my-products'}>My Products</NavLink></li>
                <li><NavLink to={'/my-bids'}>My Bids</NavLink></li>

            </>
        }
        <li><NavLink to={'/create-products'}>Create Products</NavLink></li>

    </>

  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState(null);

  const handleClick = () => {
    // If not on /products → save current route & go to /products
    if (location.pathname !== "/profile") {
      setPreviousPath(location.pathname);
      navigate("/profile");
    } 
    // If already on /products → go back to saved route (or default)
    else {
      if (previousPath) {
        navigate(previousPath);
      } else {
        navigate(-1); // fallback to browser back
      }
    }
}






    return (
        <div className="navbar bg-base-100 shadow-sm px-2 md:px-4 lg:px-6 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={'/'}><p className=" font-bold text-xl">Smart<span className='text-primary'>Deals</span></p></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">

                {
                    user ? <img onClick={handleClick} className='rounded-full w-10 mr-2' src={user.photoURL} alt={<img className='rounded' src={user1} alt="" />} /> : <Link to={'/register'}><button className='btn bg-primary text-white font-bold rounded-lg'>Register</button></Link>
                }
                {/* {
                    user ?
                        <button onClick={handleSignOut} className='btn bg-primary text-white font-bold rounded-lg'>Sign Out</button> :
                        <Link to={'/login'}> <button className='btn bg-primary text-white font-bold rounded-lg'>Login</button></Link>

                } */}

            </div>
        </div>
    );
};

export default Navbar;