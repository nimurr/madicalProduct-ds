import React, { useState } from "react";
import { Input, Modal, DatePicker, Space, Table, Button } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { CloseOutlined } from "@ant-design/icons";
import { useGetAllRecentTrangitionQuery } from "../../redux/features/auth/heashboard/recentTransaction";
import { useGetDashboardStatusQuery } from "../../redux/features/auth/heashboard/dashboardStatus";

const { Search } = Input;

const Earning = () => {

  const { data: transaction } = useGetAllRecentTrangitionQuery();
    const { data: dashboardStatus } = useGetDashboardStatusQuery();

    console.log(dashboardStatus?.data?.attributes?.totalEarnings);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleView = (record) => {
    setSelectedTransaction(record);
    setIsModalOpen(true);
  };

  // Columns for the table
  const columns = [
    {
      title: "#SI",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text, _, index) => index + 1,
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

  return (
    <div className="mt-14">
      <div className="rounded-t-lg mb-5">
        <div className="grid lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-lg bg-[#e8ebf0]">
            <p className="text-[20px] font-semibold mb-2">Total Earnings</p>
            <h2 className="text-header font-semibold text-primaryBg">${dashboardStatus?.data?.attributes?.totalEarnings} K</h2>
          </div>
          <div className="p-6 rounded-lg bg-[#e8ebf0]">
            <p className="text-[20px] font-semibold mb-2">Total Withdraw</p>
            <h2 className="text-header font-semibold text-primaryBg">${dashboardStatus?.data?.attributes?.totalWithdraw} K</h2>
          </div>
        </div>

        <div className="md:flex py-[22px] justify-between items-center">
          <div>
            <p className="text-header font-semibold">Earning</p>
          </div>
          <div>
            <Space direction="vertical">
              <DatePicker onChange={(date, dateString) => console.log(dateString)} />
            </Space>
            <Search
              className="md:ml-2 md:mt-0 mt-3"
              style={{
                width: "200px",
              }}
              placeholder="Search Email or User Name"
              onSearch={(value) => console.log("Search:", value)}
              enterButton
            />
          </div>
        </div>

        <div className="overflow-x-scroll bg-[#e8ebf0]">
          <Table
            dataSource={transaction?.data || []}
            columns={columns}
            rowKey={(record) => record.transactionId}
            // pagination={{
            //   pageSize: 5,
            //   showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            // }}
            pagination={true}
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
                <p>{selectedTransaction.date || "N/A"}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Earning;
