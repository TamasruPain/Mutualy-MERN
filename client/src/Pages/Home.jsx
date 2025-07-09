import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const Home = () => {

    const [loggedInUser, setLoggedInUser] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("loggedInUserEmail");
        if (user) {
            setLoggedInUser(user);
            setIsLoggedIn(true);
        } else {
            setLoggedInUser('');
            setIsLoggedIn(false);
        }
    },)


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className=" flex flex-col items-center justify-center backdrop-blur-sm border border-gray-300 p-10 rounded-lg shadow-lg ">
                <h1 className="text-2xl p-4">
                    Welcome to Mutualy
                </h1>

                {!isLoggedIn ? (

                    <div className="flex flex-col gap-5 items-center justify-center">
                        <p className='text-gray-500 mb-6'>
                            Login to Get Mutual Funds
                        </p>
                        <div className='flex gap-4'>
                            <Link to="/login"
                                className="btn bg-black/30 px-4 py-2 rounded-lg hover:shadow-blue-300 shadow-md transition duration-200 hover:bg-black/80 text-white">
                                Sign In
                            </Link>
                            <Link to="/register"
                                className="btn bg-black/30 px-4 py-2 rounded-lg hover:shadow-blue-300 shadow-md hover:bg-black/80 text-white transition duration-200">
                                Sign Up
                            </Link>
                        </div>
                    </div>

                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-blue-500/50">
                            <h1>
                                Search for
                            </h1>
                            <Link to={'/funds'} className='btn mt-4 bg-black/30 px-4 py-2 rounded-lg hover:shadow-blue-300 shadow-md transition duration-200 hover:bg-black/80 text-white'>
                                Mutual Funds</Link>
                        </div>
                        <div className="flex flex-col p-4 items-center justify-center rounded-lg bg-blue-500/50">
                            <h1>
                                {loggedInUser}
                            </h1>
                            <Link to='/dashboard'
                                className="btn mt-4 bg-black/30 px-4 py-2 rounded-lg hover:shadow-blue-300 shadow-md transition duration-200 hover:bg-black/80 text-white">
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                )

                }
            </div>
        </div>
    )
}
export default Home
