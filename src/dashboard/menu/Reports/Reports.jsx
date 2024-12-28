import React, { useState } from "react";
import { Pagination } from "antd";
import { useGetAllReportsQuery } from "../../../redux/features/auth/heashboard/reports";
import url from "../../../redux/api/baseUrl";

const Reports = () => {
    const { data: reports } = useGetAllReportsQuery();
    const reportsData = reports?.data?.attributes || [];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8; // Number of items per page

    // Selected report for details panel
    const [selectedReport, setSelectedReport] = useState(reportsData[0] || null);

    // Calculate paginated data
    const paginatedReports = reportsData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Handle report click
    const handleReportClick = (report) => {
        setSelectedReport(report);
    };

    return (
        <div className="py-10 bg-gray-100 min-h-screen">
            <h1 className="text-[30px] font-bold text-gray-700 mb-6">Reports</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reports List */}
                <div className="space-y-2">
                    {paginatedReports.length > 0 ? (
                        paginatedReports.map((report, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleReportClick(report)}
                                className={`cursor-pointer p-3 flex justify-between items-center gap-5 bg-gray-50 rounded-lg bg-[#338bff10]  ${selectedReport?.id === report.id ? "bg-[#338bff38]" : "bg-white"
                                    }`}
                            >
                                <div className="flex items-center gap-5">
                                    <img
                                        src={url + report.createdBy?.image || "/images/placeholder.png"}
                                        alt="Created By"
                                        className="w-12 h-12 rounded-full border-4 border-gray-200"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {report.createdBy?.fullName}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-semibold">Reason:</span> {report.reason}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">
                                    <span className="font-semibold">Date:</span>{" "}
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="h-[60vh] w-full flex items-center justify-center">
                            <div>
                                <h2 className="text-[30px] mt-16 text-center font-semibold text-[#f22]">No Reports Available !!</h2>
                              
                            </div>
                        </div>
                    )}
                </div>

                {/* Report Details */}
                <div className=" rounded-lg p-6 bg-[#338bff10] ">
                    {selectedReport ? (
                        <div className="overflow-y-auto">
                            <div>
                                <h2 className="text-[30px] text-center font-semibold">Report Details</h2>
                            </div>
                            <div className="flex items-center gap-5 my-10">
                                <img
                                    src={url + selectedReport.createdBy?.image || "/images/placeholder.png"}
                                    alt="Created By"
                                    className="w-16 h-16 rounded-full border-4 border-gray-200"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        Name :  {selectedReport.createdBy?.fullName}
                                    </h3>
                                    <p className="text-sm text-gray-500"><span className="font-semibold">Email: </span> {selectedReport.createdBy?.email}</p>
                                    <p className="text-sm text-gray-500">
                                        <span className="font-semibold">Role:</span> {selectedReport.createdBy?.role}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-500 text-sm">
                                    <span className="font-semibold">Date:</span>{" "}
                                    {new Date(selectedReport.createdAt).toLocaleDateString()}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Message:</span> {selectedReport.message}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div>
                                <p className="text-[#193664] text-[25px] text-center font-semibold">Select a report to view details !!!</p>
                                <div className="my-10">
                                    <img className="w-60 mx-auto" src="/image/ReportViewDetilas.png" alt="" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={reportsData.length}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false}
                    showTotal={(total) => `Total ${total} items`}
                />
            </div>
        </div>
    );
};

export default Reports;
