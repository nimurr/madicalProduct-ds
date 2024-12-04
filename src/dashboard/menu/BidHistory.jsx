import { Button, DatePicker, Input, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import users from "../../../public/image/users.jpg";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./style.module.css";

const { Search } = Input;

const dataSource = [
  {
    key: "1",
    customerName: "Bashar Islam",
    email: "abc@email.com",
    address: "Dhaka Bangladesh",
    date: "2024-04-16",
    phone: "4536656"
  },
  {
    key: "2",
    customerName: "Ali Akbar",
    email: "ali@email.com",
    address: "Chittagong, Bangladesh",
    date: "2024-05-16",
    phone: "4536677"
  },
  {
    key: "3",
    customerName: "Rena Begum",
    email: "rina@email.com",
    address: "Sylhet, Bangladesh",
    date: "2024-06-16",
    phone: "4536699"
  }
];

const BidHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filteredData, setFilteredData] = useState(dataSource);

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (text, _, index) => index + 1
    },
    {
      title: "User Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (_, record) => <p>{record?.customerName}</p>
    },
    {
      title: "Business-Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <div>
            <img
              className="w-[34px] h-[34px] rounded-full"
              src={users}
              alt=""
            />
          </div>
          <div>
            <p className="font-medium">{record?.customerName}</p>
            <p className="text-xs">{record?.email}</p>
          </div>
        </div>
      )
    },
    {
      title: "BidStatus",
      dataIndex: "BidStatus",
      key: "BidStatus",
      render: (_, record) => <p>win</p>
    },
    {
      title: "LastPrice",
      dataIndex: "LastPrice",
      key: "LastPrice",
      render: (_, record) => <p>$35</p>
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (_, record) => <p>{record.date}</p>
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BsInfoCircle
            onClick={() => handleView(record)}
            size={18}
            className="text-primaryBg cursor-pointer"
          />
        </Space>
      )
    }
  ];

  const handleView = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const onSearch = (value) => {
    const filtered = dataSource.filter(
      (record) =>
        record.customerName.toLowerCase().includes(value.toLowerCase()) ||
        record.email.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="">
      <div className="rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] justify-between items-center">
          <div>
            <p className="text-header">Bid History</p>
          </div>
          <div>
            <Space direction="vertical">
              <DatePicker onChange={onChange} />
            </Space>
            <Search
              style={{
                width: "200px",
                marginLeft: "4px"
              }}
              placeholder="Search by name or email"
              onSearch={onSearch}
              enterButton
            />
          </div>
        </div>
        <Table
          pagination={{
            total: filteredData.length,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            defaultPageSize: 5,
            showSizeChanger: true,
            itemRender: (current, type, originalElement) => {
              if (type === "prev") {
                return (
                  <Button className="border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white transition-colors duration-300">
                    Back
                  </Button>
                );
              }
              if (type === "next") {
                return (
                  <Button className="border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white transition-colors duration-300">
                    Next
                  </Button>
                );
              }
              return originalElement;
            },
            className: styles.paginationCenter
          }}
          columns={columns}
          dataSource={filteredData}
        />
      </div>

      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
        closeIcon={
          <CloseOutlined
            style={{
              color: "white",
              backgroundColor: "#de0a26",
              borderRadius: "10%",
              padding: "10px"
            }}
          />
        }
      >
        <div>
          <div className="flex justify-center items-center gap-2 py-4 flex-col border-b border-b-gray-300">
            <h1 className="text-xl font-medium">Trainer Details</h1>
          </div>
          <div className="p-[20px]">
            <div className="flex justify-between border-b py-[16px]">
              <p>Full Name:</p>
              <p>{selectedRecord?.customerName || "N/A"}</p>
            </div>

            <div className="flex justify-between border-b py-[16px]">
              <p>Email:</p>
              <p>{selectedRecord?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Phone:</p>
              <p>{selectedRecord?.phone || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Date:</p>
              <p>{"N/A"}</p>
            </div>
            <div className="flex justify-between items-center pt-[16px]">
              <p>Address:</p>
              <p className="px-[15px] py-[10px] rounded-lg">
                {selectedRecord?.address || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BidHistory;
