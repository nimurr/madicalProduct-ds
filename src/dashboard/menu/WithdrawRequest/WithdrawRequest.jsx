import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  useGetAllWidthdrawRequestQuery,
  useUpdateWidthrawRequestMutation,
} from "../../../redux/features/auth/heashboard/widthdrawRequest";
import { Pagination } from "antd";

const WithdrawRequest = () => {
  const { data: WidthdrawRequest, isLoading, error } = useGetAllWidthdrawRequestQuery();
  const [updateWidthrawRequest, { isLoading: isUpdating }] = useUpdateWidthrawRequestMutation();

  const [statusData, setStatusData] = useState({});
  const [filterStatus, setFilterStatus] = useState(""); // State to track the selected filter
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize] = useState(10); // Items per page

  const handleStatusChange = (e, transactionId) => {
    setStatusData((prev) => ({ ...prev, [transactionId]: e.target.value }));
  };

  const handleSubmitStatus = async (request) => {
    const { transactionId } = request;
    const newStatus = statusData[transactionId];

    if (!newStatus) {
      Swal.fire({
        title: "Error!",
        text: "Please select a status before updating.",
        icon: "error",
      });
      return;
    }

    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to update the status to "${newStatus}".`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        await updateWidthrawRequest({ transactionId, status: newStatus }).unwrap();

        Swal.fire({
          title: "Updated!",
          text: "The withdrawal request status has been updated.",
          icon: "success",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating the request. Please try again.",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return <div>Loading withdrawal requests...</div>;
  }

  if (error) {
    return <div>Error loading data!</div>;
  }

  // Calculate total money for each status
  const totalMoney = (status) =>
    WidthdrawRequest?.data
      ?.filter((req) => req.status === status)
      .reduce((sum, req) => sum + req.amount, 0) || 0;

  const filteredRequests =
    filterStatus === ""
      ? WidthdrawRequest?.data
      : WidthdrawRequest?.data.filter((req) => req.status === filterStatus);

  // Pagination logic: Calculate start and end indices for current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageRequests = filteredRequests?.slice(startIndex, endIndex);

  return (
    <div className="shadow-md rounded-lg my-14 bg-[#f7f7f7]">
      <div className="flex flex-col items-start gap-4 px-5 py-3">
        <p className="text-header font-semibold">Withdrawal Requests</p>
      </div>

      <div className="flex items-center justify-between gap-10 flex-wrap px-5">
        <div className="flex flex-wrap gap-5">
          <span className="py-1 px-3 bg-[#f988251f] text-[#f98925] rounded-md font-semibold">
            Pending: ${totalMoney("pending").toFixed(2)}
          </span>
          <span className="py-1 px-3 bg-[#ac060621] text-[#ac0606] rounded-md font-semibold">
            Failed: ${totalMoney("failed").toFixed(2)}
          </span>
          <span className="py-1 px-3 bg-[#04b41b2d] text-[#04b41c] rounded-md font-semibold">
            Completed: ${totalMoney("completed").toFixed(2)}
          </span>
          {/* <span className="py-1 px-3 bg-[#dd11dd31] text-[#dd11dd] rounded-md font-semibold">
            Total: ${WidthdrawRequest?.data.reduce((sum, req) => sum + req.amount, 0).toFixed(2)}
          </span> */}
        </div>

        <div className="flex items-center gap-5 flex-wrap justify-between py-5 px-2">
          <div className="flex items-center flex-wrap gap-2">
            <span
              className="py-1 cursor-pointer px-3 bg-[#f988251f] text-[#f98925] rounded-md font-semibold"
              onClick={() => setFilterStatus("pending")}
            >
              Pending (
              {WidthdrawRequest?.data.filter((req) => req.status === "pending").length})
            </span>
            <span
              className="py-1 cursor-pointer px-3 bg-[#ac060621] text-[#ac0606] rounded-md font-semibold"
              onClick={() => setFilterStatus("failed")}
            >
              Failed (
              {WidthdrawRequest?.data.filter((req) => req.status === "failed").length})
            </span>
            <span
              className="py-1 cursor-pointer px-3 bg-[#04b41b2d] text-[#04b41c] rounded-md font-semibold"
              onClick={() => setFilterStatus("completed")}
            >
              Completed (
              {WidthdrawRequest?.data.filter((req) => req.status === "completed").length})
            </span>
            <span
              className="py-1 cursor-pointer px-3 bg-[#dd11dd31] text-[#dd11dd] rounded-md font-semibold"
              onClick={() => setFilterStatus("")} // Clear filter
            >
              All ({WidthdrawRequest?.data.length})
            </span>
          </div>
        </div>

      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-[#e9e9e9] text-[14px]">
              <th className="px-4 py-3 text-left">#Tr.ID</th>
              <th className="px-4 py-3 text-left">User Name</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Withdraw</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPageRequests?.map((request) => (
              <tr key={request.transactionId} className="bg-[#f7f7f7] hover:bg-[#fffcfc]">
                <td className="px-4 py-5">{request.transactionId}</td>
                <td className="px-4 py-5">{request?.userDetails?.fullName}</td>
                <td className="px-4 py-5">${request.amount}</td>
                <td className="px-4 py-5">
                  {request.timestamp
                    ? new Date(request.timestamp).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                    : "N/A"}
                </td>
                <td
                  className={`px-4 py-5 font-semibold capitalize ${request.status === "pending" ? "text-[#f98925]" : ""
                    } ${request.status === "failed" ? "text-[#d40101]" : ""} ${request.status === "completed" ? "text-[#0bd325]" : ""
                    }`}
                >
                  {request.status}
                </td>
                <td className="px-4 py-5">
                  <select
                    onChange={(e) => handleStatusChange(e, request.transactionId)}
                    className="py-2 focus:outline-none bg-primaryBg text-whiteText rounded px-2"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="failed">Failed</option>
                    <option value="completed">Completed</option>
                  </select>

                </td>
                <td className="px-4 py-5">
                  <button
                    onClick={() => handleSubmitStatus(request)}
                    className="bg-primaryBg text-whiteText py-3 px-8 rounded-md"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Updating..." : "Update"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-5 flex justify-end">
        <Pagination
          current={currentPage}
          total={filteredRequests?.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default WithdrawRequest;
