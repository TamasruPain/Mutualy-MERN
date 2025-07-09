import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { ToastSuccess, ToastError } from "../utils.js";
import { MdDeleteOutline } from "react-icons/md";
import axiosInstance from '../axios.js'

const SavedFundCard = ({ saveFunds, onDelete, onRefetch }) => {
    const schemeCode = saveFunds.meta.scheme_code;
    const schemeName = saveFunds.meta.scheme_name;

    const handleDeleteFund = async () => {
        try {
            const response = await axiosInstance.delete(`/api/mutualfunds/deletesavedfunds/${schemeCode}`, {
                headers: { 'Authorization': localStorage.getItem("token") }
            });
            ToastSuccess('Fund deleted successfully');
            onDelete(schemeCode);
            onRefetch();
        } catch (error) {
            console.error(error.response?.data || error.message);
            ToastError("Failed to delete fund");
        }
    }


    return (
        <div className='card p-4 bg-gray-400/10 rounded-md shadow-gray-500 shadow-sm hover:shadow-lg transition-all duration-300'>
            <div className='card-body p-2'>
                <h1 className='text-xl font-bold'>{schemeName}</h1>
            </div>
            <div className='card-footer flex items-end justify-end gap-4 mt-2'>
                <Link
                    className='bg-gray-400/20 p-2 rounded-md shadow-blue-400 hover:shadow-md transition-all duration-300'
                    to={`/viewFund/${schemeCode}`}
                >
                    <GrView size='20px' />
                </Link>
                <div
                    onClick={handleDeleteFund}
                    className='bg-gray-400/20 p-2 rounded-md shadow-blue-400 hover:shadow-md transition-all duration-300'>
                    <MdDeleteOutline size='20px' />
                </div>
            </div>
        </div>
    )
}
export default SavedFundCard
