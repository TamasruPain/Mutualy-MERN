import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {ToastSuccess} from "../utils.js";
import {RiFundsFill} from "react-icons/ri";

const Navbar = () => {
    const navigate = useNavigate();

    const [loggedInUser, setLoggedInUser] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const userEmail = localStorage.getItem("loggedInUserEmail")
        if (userEmail) {
            setLoggedInUser(userEmail)
            setIsLoggedIn(true);
        } else {
            setLoggedInUser('')
            setIsLoggedIn(false);
        }
    },)

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("loggedInUserID");
        localStorage.removeItem("loggedInUserName");
        localStorage.removeItem("loggedInUserEmail");
        ToastSuccess('User Logged Out !!');
        setIsLoggedIn(false);
        setLoggedInUser('');
        navigate("/login");
    }
    return (
        <div className='bg-gray-800/20 h-16 w-full'>
            <div className="flex justify-between items-center p-3">

                <div className='flex w-auto md:w-[45%] lg:w-[55%] xl:w-[65%] gap-2 ml-2'>
                    <RiFundsFill className='' size="30px"/>
                    <Link to='/funds' className="text-2xl font-serif "> Mutualy</Link>
                </div>

                <div className="w-[1%] md:w-[35%] lg:w-[35%] xl:w-[55%] hidden md:block">
                    <ul className='flex list-none gap-6'>
                        <li>
                            <Link to="/funds" className="hover:text-gray-500">Home</Link>
                        </li>
                        <li>
                            <Link to='/dashboard' className="hover:text-gray-500">Your Funds</Link>
                        </li>
                    </ul>
                </div>

                <div className='flex w-auto md:w-[38%] lg:w-[38%] xl:w-[25%] gap-4'>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login"
                                  className="bg-black/60 px-4 py-2  rounded-lg hover:shadow-blue-300 shadow-md transition duration-200 hover:bg-black/80 text-white"
                            >
                                Sign In
                            </Link>
                            <Link to="/register"
                                  className="bg-black/60 px-4 py-2 rounded-lg hover:shadow-blue-300 shadow-md transition duration-200 hover:bg-black/80 text-white hidden md:block "
                            >
                                Sign Up
                            </Link>
                        </>

                    ) : (
                        <>
                            <Link to="/dashboard"
                                  className="bg-black/60 px-4 py-2 rounded-lg hover:shadow-blue-300 shadow-md transition duration-200 hover:bg-black/80 text-white"
                            >
                                {loggedInUser}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-black/60 px-2 py-2 rounded-lg hover:shadow-blue-300 shadow-md transition duration-200 hover:bg-black/80 text-white hidden md:block"
                            >
                                Log out
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}
export default Navbar
