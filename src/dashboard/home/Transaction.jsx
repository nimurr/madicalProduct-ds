import React, { useState, useEffect } from "react";
import { Table, Modal } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useGetAllRecentTrangitionQuery } from "../../redux/features/auth/heashboard/recentTransaction";
import { render } from "react-dom";

const Transaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [filteredData, setFilteredData] = useState([]); // Filtered transactions

  const { data: transaction } = useGetAllRecentTrangitionQuery();

  // Initialize filtered data
  useEffect(() => {
    if (transaction?.data) {
      setFilteredData(transaction.data); 
    }
  }, [transaction]);

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      key: "sl",
      render: (_, __, index) => index + 1 + (currentPage - 1) * 25,
    },
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

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    if (!value) {
      setFilteredData(transaction?.data || []); // Reset to original data if search input is cleared
      return;
    }

    const filtered = transaction?.data.filter(
      (transaction) =>
        transaction?.transactionId?.toLowerCase().includes(value.toLowerCase()) ||
        transaction?.userDetails?.fullName
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||
        transaction?.userDetails?.email
          ?.toLowerCase()
          .includes(value.toLowerCase())
    );

    setFilteredData(filtered);
    setCurrentPage(
      Math.ceil(filtered.length / 25) > 0 ? Math.ceil(filtered.length / 25) : 1
    )
  };


  return (
    <div>
      <div className="flex justify-between flex-wrap gap-5">
        <h1 className="text-header font-medium my-2">Recent Transactions</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <input className="p-2 min-w-72 rounded-lg border border-[#ccc]" placeholder="Search by Transaction ID" onChange={(e) => handleSearch(e.target.value)} type="text" name="search" id="" />
          <button className="py-2 rounded-lg px-5 bg-primaryBg text-whiteText font-semibold">Search</button>
        </div>
      </div>
      <div className="overflow-x-atuo w-full">
        <div className=" bg-[#e8ebf0]">
          <Table
            dataSource={filteredData}
            columns={columns}
            rowKey={(record) => record.transactionId}
            pagination={{
              total: filteredData.length,
              defaultPageSize: 25,
              showSizeChanger: false,
              current: currentPage,
              onChange: handlePaginationChange,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
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
                  style={{ fontFamily: "arial" }}
                  className="flex justify-center items-center gap-2 flex-col border-b border-[#ccc]"
                >
                  <p className="text-[20px] mb-[16px] font-semibold">
                    {selectedTransaction.userDetails?.fullName || "N/A"}
                  </p>
                </div>
                <div style={{ fontFamily: "arial" }} className="p-[20px]">
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
