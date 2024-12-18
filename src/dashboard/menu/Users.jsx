import { Button, DatePicker, Input, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./style.module.css";
import { useGetAllUserQuery } from "../../redux/features/auth/heashboard/allUserGet";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const { Search } = Input;

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false); // New state for email modal
  const [selectedUser, setSelectedUser] = useState(null); // To store the selected user
  const [currentPage, setCurrentPage] = useState(1); // To track current page

  // Fetching the data
  const { data, isLoading, error } = useGetAllUserQuery();

  console.log(data)

  // Check if the data is available
  const users = data?.data?.attributes?.results || [];

  // Handle loading and error states
  if (isLoading) return <div className="text-[30px] text-[#fd3131] text-center mt-10">User Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (_, __, index) => index + 1
    },
    {
      title: "User Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <p className="font-medium">{record?.fullName}</p>
        </div>
      )
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => <p>{record?.email || "Apple Or Facebook User"}</p>
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber"
    },
    {
      title: "Date",
      dataIndex: "dataOfBirth",
      key: "dataOfBirth",
      render: (_, record) => <p>{record?.dataOfBirth
        ? new Date(record.dataOfBirth).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        : 'N/A'}
      </p>
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="w-auto flex items-center gap-5">
          <Link target="_blank" to={`https://mail.google.com/mail/u/0/?fs=1&to=${record?.email}&tf=cm`} style={{ fontSize: "1.5rem" }}>
            <MdOutlineEmail  className="text-2xl" />
          </Link>
          <BsInfoCircle
            onClick={() => handleView(record)}
            size={18}
            className="text-primaryBg font-bold cursor-pointer"
          />
        </div>
      )
    }
  ];

  const handleView = (user) => {
    setSelectedUser(user); // Set the selected user when the button is clicked
    setIsModalOpen(true); // Open the user detail modal
  };

  const handleEmailClick = (user) => {
    setSelectedUser(user); // Set the selected user for email action
    setIsEmailModalOpen(true); // Open the email modal
  };

  const onSearch = (value) => console.log("Search:", value);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // Handle page change and set current page
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="rounded-t-lg mt-5">
        <div className="md:flex py-[22px] justify-between items-center flex-wrap">
          <div>
            <p className="text-header font-semibold">Users</p>
          </div>
          <div className="flex items-center gap-2">
            <Space direction="vertical">
              <DatePicker onChange={onChange} />
            </Space>
            <Search
              className="md:ml-2"
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </div>
        </div>
        <div className="overflow-x-scroll bg-[#e8ebf0]">
          <Table
            pagination={{
              total: users.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: 5, // Adjust number of items per page
              showSizeChanger: false,
              current: currentPage,
              onChange: handlePaginationChange,
              itemRender: (current, type, originalElement) => {
                if (type === "prev") {
                  return (
                    <Button
                      className={
                        currentPage === 1
                          ? styles.disabledButton
                          : styles.activeButton
                      } // Apply color change
                    >
                      Back
                    </Button>
                  );
                }
                if (type === "next") {
                  return (
                    <Button
                      className={
                        currentPage === Math.ceil(users.length / 3)
                          ? styles.disabledButton
                          : styles.activeButton
                      } // Apply color change
                    >
                      Next
                    </Button>
                  );
                }
                return originalElement;
              },
              className: styles.paginationCenter
            }}
            columns={columns}
            dataSource={users}
          />
        </div>
      </div>
      {/* User Details Modal */}
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
          <div className="flex justify-center items-center gap-2 flex-col py-[16px] border-b border-b-gray-300">
            <h1 className="text-xl font-medium">User Details</h1>
          </div>
          <div className="p-[20px]">
            <div className="flex justify-between border-b mt-4 py-[16px]">
              <p>Full Name:</p>
              <p>{selectedUser?.fullName || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Email:</p>
              <p>{selectedUser?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Phone:</p>
              <p>{selectedUser?.phoneNumber || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b py-[16px]">
              <p>Date:</p>
              <p>{selectedUser?.dataOfBirth || "N/A"}</p>
            </div>
            <div className="flex justify-between items-center pt-[16px]">
              <p>Address:</p>
              <p className="px-[15px] py-[10px] rounded-lg">
                {selectedUser?.address || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
 
    </div>
  );
};

export default Users;
