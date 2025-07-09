import React from 'react'
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { LuSave } from "react-icons/lu";
import { ToastError, ToastSuccess } from "../utils.js";
import axiosInstance from '../axios.js';


const FundCard = ({ fund }) => {

    const handleSaveFund = async () => {
        try {
            const response = await axiosInstance.post('/api/mutualfunds/savefunds',
                { schemeCode: fund.schemeCode },
                { headers: { 'Authorization': localStorage.getItem("token") } }
            );
            ToastSuccess("Fund saved successfully");
        } catch (error) {
            console.error(error.response?.data || error.message);
            ToastError( "Failed to save fund");
        }
    }
    return (
        <div
            className='card p-4 bg-gray-400/10 rounded-md shadow-gray-500 shadow-sm hover:shadow-lg transition-all duration-300'
            key={fund.schemeCode}>
            <div className='card-body p-2'>
                <h1 className='text-xl font-bold'>{fund.schemeName}</h1>
            </div>
            <div className='card-footer flex items-end justify-end gap-4 mt-2'>
                <Link
                    className='bg-gray-400/20 p-2 rounded-md shadow-blue-400 hover:shadow-md transition-all duration-300'
                    to={`/viewFund/${fund.schemeCode}`}
                >
                    <GrView size='20px' />
                </Link>
                <div
                    onClick={handleSaveFund}
                    className='bg-gray-400/20 p-2 rounded-md shadow-blue-400 hover:shadow-md transition-all duration-300'>
                    <LuSave size='20px' />
                </div>
            </div>
        </div>
    )
}
export default FundCard
