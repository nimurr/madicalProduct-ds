import React, { useState } from "react";
import { Table, Modal } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useGetAllRecentTrangitionQuery } from "../../redux/features/auth/heashboard/recentTransaction";

const Transaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(5); // Page size

  const { data: transaction } = useGetAllRecentTrangitionQuery();

  // console.log(transaction);

  // Sliced data for the current page
  const paginatedData =
    transaction?.data.slice((currentPage - 1) * pageSize, currentPage * pageSize) || [];

  const columns = [
    {
      title: "#Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Full Name",
      dataIndex: ["userDetails", "fullName"],
      key: "fullName",
      render: (_, record) => record.userDetails?.fullName || "N/A",
    },
    {
      title: "Email",
      dataIndex: ["userDetails", "email"],
      key: "email",
      render: (_, record) => record.userDetails?.email || "N/A",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => {
        const timestamp = record?.timestamp;
        if (!timestamp) return "N/A";

        const date = new Date(timestamp); // Convert timestamp to Date object
        return date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }); // Format: DD MMM YYYY
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <BsInfoCircle
          onClick={() => handleView(record)}
          size={18}
          className="text-[red] cursor-pointer"
        />
      ),
    },
  ];

  const handleView = (record) => {
    setSelectedTransaction(record);
    setIsModalOpen(true);
  };

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div>
      <h1 className="text-header font-medium my-2">Recent Transactions</h1>
      <div className="overflow-x-scroll w-full">
        <div className=" bg-[#e8ebf0]">
          <Table
            dataSource={paginatedData}
            columns={columns}
            rowKey={(record) => record.transactionId}
            pagination={{
              current: currentPage, // Controlled current page
              pageSize: pageSize, // Controlled page size
              total: transaction?.data.length || 0, // Total number of items
              showSizeChanger: true, // Allows changing the page size
              pageSizeOptions: ["5", "10", "20"], // Page size options
              onChange: handlePaginationChange, // Handle page change
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`, // Total items info
            }}
            bordered
          />

          {selectedTransaction && (
            <Modal
              open={isModalOpen}
              onOk={() => setIsModalOpen(false)}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
            >
              <div>
                <div
                  style={{ fontFamily: "Aldrich" }}
                  className="flex justify-center items-center gap-2 flex-col border-b border-[#ccc]"
                >
                  <p className="text-[20px] mb-[16px] font-semibold">
                    {selectedTransaction.userDetails?.fullName || "N/A"}
                  </p>
                </div>
                <div style={{ fontFamily: "Aldrich" }} className="p-[20px]">
                  <div className="flex justify-between border-b border-[#ccc] py-[16px]">
                    <p className="font-semibold ">Full Name:</p>
                    <p className="font-sans">
                      {selectedTransaction.userDetails?.fullName || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between border-b border-[#ccc] py-[16px]">
                    <p className="font-semibold ">Email:</p>
                    <p className="font-sans">
                      {selectedTransaction.userDetails?.email || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between border-b border-[#ccc] py-[16px]">
                    <p className="font-semibold ">Transaction ID:</p>
                    <p className="font-sans">
                      {selectedTransaction.transactionId || "N/A"}
                    </p>
                  </div>
                  <div className="flex justify-between border-b border-[#ccc] py-[16px]">
                    <p className="font-semibold ">Amount:</p>
                    <p className="font-sans">
                      ${selectedTransaction.amount || "0.00"}
                    </p>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
