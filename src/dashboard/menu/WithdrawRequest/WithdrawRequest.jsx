import React, { useState } from 'react';

import Swal from 'sweetalert2';

const WithdrawRequest = () => {
    // Sample data for the table
    const [requests, setRequests] = useState([
        { id: 1, userName: 'John Doe', officeName: 'NYC Office', amount: 1500, date: '2024-12-15', status: 'Pending' },
        { id: 2, userName: 'Jane Smith', officeName: 'LA Office', amount: 2000, date: '2024-12-14', status: 'Cancel' },
        { id: 3, userName: 'Alice Johnson', officeName: 'Chicago Office', amount: 1200, date: '2024-12-13', status: 'Approved' },
    ]);

    // Function to handle submit action for each request
    const handleSubmit = (id) => {

        // swal("Hello world!");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Complete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Wedthdraw Rewquest!",
                    text: "Your file has been Completed.",
                    icon: "success"
                });
            }
        });
        // You can replace this with your logic to process the request (e.g., update status)
    };

    // Function to determine the background color for the status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-500 text-white';
            case 'Approved':
                return 'bg-green-500 text-white';
            case 'Cancel':
                return 'bg-red-500 text-white';
            default:
                return 'bg-gray-300 text-black';
        }
    };

    return (
        <div className="shadow-md rounded-lg my-14 bg-[#e8ebf0] ">
            <div>
                <p className="text-header m-5 pt-5 font-semibold">Withdrawal Requests</p>
            </div>

            <div className=' overflow-x-auto'>
                <table className="min-w-full table-auto border-collapse bg-[#e8ebf0]">
                    <thead>
                        <tr className="bg-primaryBg text-whiteText">
                            <th className="px-4 py-2 text-left">#Tr.ID</th>
                            <th className="px-4 py-2 text-left">User Name</th>
                            <th className="px-4 py-2 text-left">Office Name</th>
                            <th className="px-4 py-2 text-left">Amount</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Widthdraw</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id} className="hover:bg-[#fffcfc]">
                                <td className="px-4 py-5">{request.id}</td>
                                <td className="px-4 py-5">{request.userName}</td>
                                <td className="px-4 py-5">{request.officeName}</td>
                                <td className="px-4 py-5">${request.amount}</td>
                                <td className="px-4 py-5">{request.date}</td>
                                <td className={`px-4 py-5 font-semibold 
                                
                                ${request.status == "Pending" && 'text-[#d1d109]'}
                                ${request.status == "Cancel" && 'text-[#d40101]'}
                                ${request.status == "Approved" && 'text-[#0bd325]'}

                                
                                `}  >
                                    {request.status}{request.status == "Pending" && '...'}

                                </td>
                                <td className="px-4 py-5">
                                    <select
                                        className="py-2 focus:outline-none bg-primaryBg text-whiteText rounded px-2"
                                        defaultValue={request.status}
                                        name="status"
                                        id=""
                                        onChange={(e) => {
                                            const newStatus = e.target.value;
                                            setRequests(prevRequests =>
                                                prevRequests.map((r) =>
                                                    r.id === request.id ? { ...r, status: newStatus } : r
                                                )
                                            );
                                        }}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Cancel">Cancel</option>
                                        <option value="Approved">Approved</option>
                                    </select>
                                </td>
                                <td className="px-4 py-5">
                                    <button
                                        onClick={() => handleSubmit(request.id)}
                                        className="bg-primaryBg text-whiteText py-3 px-8 rounded-md"
                                    >
                                        Send
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WithdrawRequest;
