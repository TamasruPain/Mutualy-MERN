import React, { useEffect, useState } from 'react'
import SearchBar from "../Components/SearchBar.jsx";
import SavedFundCard from "../Components/SavedFundCard.jsx";
import { FaPersonChalkboard } from "react-icons/fa6";
import { ToastSuccess } from "../utils.js";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../axios.js';


const Dashboard = () => {
    const [saveFunds, setSaveFunds] = useState([]);
    const [next, setNext] = useState(20);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const fetchSavedFunds = () => {
        setLoading(true);
        axiosInstance.get('/api/mutualfunds/getsavedfunds', {
            headers: { 'Authorization': localStorage.getItem("token") }
        })
            .then((response) => {
                setSaveFunds(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchSavedFunds();
    }, [])


    const loadMore = () => {
        setNext(next + 20);
    }
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("loggedInUserID");
        localStorage.removeItem("loggedInUserName");
        localStorage.removeItem("loggedInUserEmail");
        ToastSuccess('User Logged Out !!');
        navigate("/login");
    }

    const handleDelete = (deletedSchemeCode) => {
        setSaveFunds(prev => prev.filter(fund => fund.schemeCode !== deletedSchemeCode));
    }

    const handleResetClick = () => {
        setSearchTerm('');
        setNext(20);
    }

    const filteredFunds = saveFunds.filter(fund =>
        fund.meta.scheme_name && fund.meta.scheme_name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const visibleFunds = filteredFunds.slice(0, next);

    return (
        <div className="p-5">

            <div className='flex items-center justify-between'>
                <Link to={'/funds'}
                    className="bg-black/60 px-2 py-2 rounded-lg hover:shadow-blue-300 shadow-md transition duration-200 hover:bg-black/80 text-white  block md:hidden"
                >
                    Mutual funds
                </Link>
                <button
                    onClick={handleLogout}
                    className="bg-black/60 px-2 py-2 rounded-lg hover:shadow-blue-300 shadow-md transition duration-200 hover:bg-black/80 text-white  block md:hidden"
                >
                    Log out
                </button>
            </div>
            <div className='flex items-center justify-center flex-col m-5'>

                <div className=" flex gap-2 text-3xl font-serif">Your Funds <FaPersonChalkboard /></div>

                {/*search bar component*/}
                <div>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        onResetClick={handleResetClick}
                    />
                </div>

                <div className='border-2 border-gray-200 p-5 rounded-md h-screen w-full mt-6 overflow-scroll'>
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            Loading...
                        </div>
                    ) : (
                        <>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                                {visibleFunds.map(fund => (
                                    // saved funds Card
                                    <SavedFundCard
                                        key={fund.meta.scheme_code}
                                        saveFunds={fund}
                                        onDelete={handleDelete}
                                        onRefetch={fetchSavedFunds}
                                    />
                                ))}
                            </div>

                            {/* Load More Button */}
                            {visibleFunds.length < saveFunds.length && (
                                <div className='flex justify-center mt-4'>
                                    <button
                                        onClick={loadMore}
                                        className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 shadow-md'>
                                        Load More
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Dashboard
