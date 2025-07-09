import React, { useEffect, useState } from 'react'
import SearchBar from "../Components/SearchBar.jsx";
import FundCard from "../Components/FundCard.jsx";
import axiosInstance from '../axios.js';

const Funds = () => {

    const [funds, setFunds] = useState([]);
    const [next, setNext] = useState(20);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [filteredFunds, setFilteredFunds] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/mutualfunds',
            {
                headers: { 'Authorization': localStorage.getItem("token") }
            })
            .then((response) => {
                setFunds(response.data);
                setFilteredFunds(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            })
    }, [])

    useEffect(() => {
        if (searchTerm.length > 1) {
            const match = funds.filter(fund =>
                fund.schemeName.toLowerCase().includes(searchTerm.toLowerCase())
            ).slice(0, 10); // limit suggestions to 5
            setSuggestions(match);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, funds]);

    const handleSearchClick = () => {
        const finalResults = funds.filter(fund =>
            fund.schemeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFunds(finalResults);
        setNext(20);
        setSearchTerm(''); // clear the input after search
    }
    const handleResetClick = () => {
        setSearchTerm('');
        setSuggestions([]);
        setFilteredFunds(funds); // show all funds again
        setNext(20); // reset pagination
    }

    const loadMore = () => {
        setNext(next + 20);
    }

    const visibleFunds = filteredFunds.slice(0, next);


    return (
        <div className="p-5">

            <div className='flex items-center justify-center flex-col m-5'>
                <h1 className="text-3xl font-serif">Find mutual funds from <span className='border rounded-md px-2 py-1 bg-blue-600/20 border-blue-600/10'>Mutualy</span></h1>

                {/*search bar component*/}
                <div>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        suggestions={suggestions}
                        onSearchClick={handleSearchClick}
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
                            {visibleFunds.length > 0 ? (
                                <>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
                                        {/*mutual fund Cards */}
                                        {
                                            visibleFunds.map((fund =>
                                                <FundCard
                                                    key={fund.schemeCode}
                                                    fund={fund} />
                                            ))
                                        }
                                    </div>
                                    {/* Load More Button */}
                                    {visibleFunds.length < filteredFunds.length && (
                                        <div className='flex justify-center mt-4'>
                                            <button
                                                onClick={loadMore}
                                                className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 shadow-md'>
                                                Load More
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center text-gray-500 mt-10">No funds found.</div>

                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Funds
