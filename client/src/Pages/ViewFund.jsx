import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoPlayBackOutline } from "react-icons/io5";
import { ToastError, ToastSuccess } from "../utils.js";
import axiosInstance from '../axios.js';

const ViewFund = () => {
    const { schemeCode } = useParams();
    const [fund, setFund] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFund = async () => {
            try {
                const response = await axiosInstance.get(`/api/mutualfunds/${schemeCode}`, { headers: { 'Authorization': localStorage.getItem("token") } });
                setFund(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching fund data:', error);
                setLoading(false);
            }
        };

        fetchFund();
    }, [schemeCode]);

    if (loading) {
        return <div className="p-5">Loading...</div>;
    }

    if (!fund) {
        return <div className="p-5">Fund not found.</div>;
    }

    const handleSaveFund = async () => {
        try {
            const response = await axiosInstance.post('/api/mutualfunds/savefunds',
                { schemeCode: fund.meta.scheme_code },
                { headers: { 'Authorization': localStorage.getItem("token") } }
            );
            console.log(response.data);
            ToastSuccess(response.data.message); // Replace with ToastSuccess if you import it here
        } catch (error) {
            console.error(error.response?.data || error.message);
            ToastError(error.response?.data?.message || "Failed to save fund"); // Replace with ToastError if imported
        }
    };


    return (
        <div className="p-5 h-screen">
            <div className='flex items-center justify-between mb-4'>
                <h1 className="text-3xl font-bold mb-4">Fund Details</h1>
                <Link to={'/funds'}
                    className='btn bg-gray-600/20 px-5 py-2 rounded-md shadow-blue-400 hover:shadow-md transition-all duration-300'
                >
                    <IoPlayBackOutline />
                </Link>
            </div>
            <div className="flex flex-col bg-gray-100 p-4 rounded shadow gap-2">
                <h2 className="text-xl font-semibold">{fund.meta.scheme_name}</h2>
                <p className="text-gray-600 mb-2"><b>Scheme Code:</b> {fund.meta.scheme_code}</p>
                <p className="text-gray-600 text-lg"><b>Fund House: </b>{fund.meta.fund_house}</p>
                <p className="text-gray-600 text-lg"><b>Fund Type: </b>{fund.meta.scheme_type}</p>
                <p className="text-gray-600 text-lg"><b>Fund Category: </b>{fund.meta.scheme_category}</p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Latest NAV Data:</h3>
                {fund.data && fund.data.length > 0 ? (
                    <div className="bg-white p-4 rounded shadow">
                        <p><strong>Date:</strong> {fund.data[0].date}</p>
                        <p><strong>NAV:</strong> {fund.data[0].nav}</p>
                    </div>
                ) : (
                    <p>No NAV data available.</p>
                )}
            </div>
            <div className='flex items-center justify-center p-4'>
                <button
                    onClick={handleSaveFund}
                    className='bg-gray-200 shadow-md px-5 py-2 rounded-md hover:shadow-blue-400 transition-all duration-300'>
                    Save Fund
                </button>
            </div>
        </div>
    );
};

export default ViewFund;
