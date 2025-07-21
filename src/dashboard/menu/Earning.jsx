import React, { useState, useEffect } from "react";
import { Input, Modal, DatePicker, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { CloseOutlined } from "@ant-design/icons";
import { useGetAllRecentTrangitionQuery } from "../../redux/features/auth/heashboard/recentTransaction";
import { useGetDashboardStatusQuery } from "../../redux/features/auth/heashboard/dashboardStatus";

const { Search } = Input;

const Earning = () => {
  const { data: transaction, isLoading: isTransactionLoading } = useGetAllRecentTrangitionQuery();
  const { data: dashboardStatus, isLoading: isDashboardLoading } = useGetDashboardStatusQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (transaction?.data) {
      setFilteredData(transaction.data);
    }
  }, [transaction]);

  const handleView = (record) => {
    setSelectedTransaction(record);
    setIsModalOpen(true);
  };

  const handleSearch = (value) => {
    if (!value) {
      setFilteredData(transaction?.data || []);
      return;
    }

    const filtered = transaction?.data.filter(
      (item) =>
        item.userDetails?.fullName?.toLowerCase().includes(value.toLowerCase()) ||
        item.userDetails?.email?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const handleDateSearch = (date) => {
    if (!date) {
      setFilteredData(transaction?.data || []);
      return;
    }

    const filtered = transaction?.data.filter((item) => {
      const timestamp = item.timestamp;
      if (!timestamp) return false;

      const formattedTransactionDate = new Date(timestamp).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      const selectedDate = new Date(date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return formattedTransactionDate === selectedDate;
    });

    setFilteredData(filtered);
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const handleDownloadDetails = () => {
    if (!selectedTransaction) return;

    const {
      userDetails = {},
      transactionId,
      amount,
      timestamp,
    } = selectedTransaction;

    const data = `
                Transaction Details
                -------------------
                Full Name: ${userDetails.fullName || "N/A"}
                Email: ${userDetails.email || "N/A"}
                Transaction ID: ${transactionId || "N/A"}
                Amount: $${amount || "0.00"}
                Date: ${new Date(timestamp).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
          `;

    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `transaction_${transactionId}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (_, __, index) => index + 1 + (currentPage - 1) * 5,
    },
    {
      title: "User Name",
      dataIndex: ["userDetails", "fullName"],
      key: "userName",
      render: (_, record) => record?.userDetails?.fullName || "N/A",
    },
    {
      title: "Email",
      dataIndex: ["userDetails", "email"],
      key: "email",
      render: (_, record) => record?.userDetails?.email || "N/A",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount || "0.00"}`,
    },
    {
      title: "Date",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (_, record) => {
        const timestamp = record?.timestamp;
        if (!timestamp) return "N/A";

        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BsInfoCircle
            onClick={() => handleView(record)}
            size={18}
            className="text-[red] cursor-pointer"
          />
        </Space>
      ),
    },
  ];

  if (isTransactionLoading || isDashboardLoading) {
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="relative">
          <img className="w-48" src="/image/Loading_image.gif" alt="" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-14">
      <div className="rounded-t-lg mb-5">
        <div className="grid lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-lg bg-[#e8ebf0] flex items-center justify-between flex-wrap gap-5">
            <img className="w-10" src="/image/marketingFeesImage.png" alt="" />
            <div>
              <p className="text-[18px] font-semibold mb-2 text-right">Total Earnings</p>
              <h2 className="text-header font-semibold text-primaryBg text-right">
                ${dashboardStatus?.data?.attributes?.totalEarnings}
              </h2>
            </div>
          </div>
          <div className="p-6 rounded-lg bg-[#e8ebf0] flex items-center justify-between flex-wrap gap-5">
            <img className="w-10" src="/image/marketingFeesImage.png" alt="" />
            <div>
              <p className="text-[18px] font-semibold mb-2 text-right">Total Withdraw</p>
              <h2 className="text-header font-semibold text-right text-primaryBg">
                ${dashboardStatus?.data?.attributes?.totalWithdraw}
              </h2>
            </div>
          </div>
        </div>

        <div className="md:flex py-[22px] justify-between items-center">
          <div>
            <p className="text-header font-semibold">Earning</p>
          </div>
          <div>
            <Space direction="vertical">
              <DatePicker onChange={handleDateSearch} />
            </Space>
            <Search
              className="md:ml-2 md:mt-0 mt-3"
              style={{
                width: "200px",
              }}
              placeholder="Search Email or User Name"
              onSearch={handleSearch}
              enterButton
            />
          </div>
        </div>
        <div className="overflow-x-auto bg-[#e8ebf0]">
          <Table
            pagination={{
              total: filteredData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: 10,
              showSizeChanger: false,
              current: currentPage,
              onChange: handlePaginationChange,
            }}
            columns={columns}
            dataSource={filteredData}
            rowKey={(record) => record.id || record.email}
          />
        </div>
      </div>

      {selectedTransaction && (
        <Modal
          open={isModalOpen}
          onOk={() => setIsModalOpen(false)}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          closeIcon={
            <CloseOutlined
              style={{
                color: "#fff",
                backgroundColor: "#de0a26",
                borderRadius: "10%",
                padding: "10px",
              }}
            />
          }
        >
          <div>
            <div className="flex justify-center items-center gap-2 flex-col border-b border-[#ccc]">
              <p className="text-[26px] mb-[16px] font-medium">Transaction Details</p>
            </div>
            <div className="p-[20px]">
              <div className="flex justify-between border-b border-[#ccc] py-[16px]">
                <p>Full Name:</p>
                <p>{selectedTransaction.userDetails?.fullName || "N/A"}</p>
              </div>
              <div className="flex justify-between border-b border-[#ccc] py-[16px]">
                <p>Email:</p>
                <p>{selectedTransaction.userDetails?.email || "N/A"}</p>
              </div>
              <div className="flex justify-between border-b border-[#ccc] py-[16px]">
                <p>Transaction ID:</p>
                <p>{selectedTransaction.transactionId || "N/A"}</p>
              </div>
              <div className="flex justify-between border-b border-[#ccc] py-[16px]">
                <p>Amount:</p>
                <p>${selectedTransaction.amount || "0.00"}</p>
              </div>
              <div className="flex justify-between border-b border-[#ccc] py-[16px]">
                <p>Date:</p>
                <p>{new Date(selectedTransaction.timestamp).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}</p>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleDownloadDetails}
                  className="bg-[#1968cf] hover:bg-[#255594] text-[#fff] font-semibold py-2 px-4 rounded"
                >
                  Download Details
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Earning;
