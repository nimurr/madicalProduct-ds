import { Button, DatePicker, Input, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./style.module.css";
import { useGetAllUserQuery } from "../../redux/features/auth/heashboard/allUserGet";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const { Search } = Input;

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // To store the selected user
  const [currentPage, setCurrentPage] = useState(1); // To track current page
  const [filteredUsers, setFilteredUsers] = useState([]); // To store filtered users

  // Fetching the data
  const { data, isLoading, error } = useGetAllUserQuery();

  // Extract user data
  const users = data?.data?.attributes?.results || [];

  // Initialize filtered users with all users
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // Handle loading and error states
  if (isLoading) return <div className="text-[30px] text-[#fd3131] text-center mt-10">User Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  // Search logic
  const handleSearch = (value) => {
    if (!value) {
      setFilteredUsers(users); // Reset to all users if search input is empty
      return;
    }
    const searchValue = value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filtered);
  };

  // Date search logic
  const handleDateSearch = (date, dateString) => {
    if (!dateString) {
      setFilteredUsers(users); // Reset to all users if date input is cleared
      return;
    }

    const filtered = users.filter((user) => {
      const userDate = user.dataOfBirth
        ? new Date(user.dataOfBirth).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : null;
      return userDate === dateString; // Compare formatted dates
    });

    setFilteredUsers(filtered);
  };

  // Handle pagination change
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  // Columns for the table
  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (_, __, index) => index + 1 + (currentPage - 1) * 5,
    },
    {
      title: "User Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <p className="font-medium">{record?.fullName}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => <p>{record?.email || "Apple Or Facebook User"}</p>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Date",
      dataIndex: "dataOfBirth",
      key: "dataOfBirth",
      render: (_, record) => (
        <p>
          {record?.dataOfBirth
            ? new Date(record.dataOfBirth).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "N/A"}
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="w-auto flex items-center gap-5">
          <Link
            target="_blank"
            to={`https://mail.google.com/mail/u/0/?fs=1&to=${record?.email}&tf=cm`}
            style={{ fontSize: "1.5rem" }}
          >
            <MdOutlineEmail className="text-2xl" />
          </Link>
          <BsInfoCircle
            onClick={() => handleView(record)}
            size={18}
            className="text-primaryBg font-bold cursor-pointer"
          />
        </div>
      ),
    },
  ];

  // Handle modal for user details
  const handleView = (user) => {
    setSelectedUser(user); // Set the selected user
    setIsModalOpen(true); // Open modal
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
              <DatePicker
                format="DD MMMM YYYY"
                onChange={handleDateSearch}
                placeholder="Select Date"
              />
            </Space>
            <Search
              className="md:ml-2"
              placeholder="Search by name or email"
              onSearch={handleSearch}
              enterButton
            />
          </div>
        </div>
        <div className="overflow-x-auto bg-[#e8ebf0]">
          <Table
            pagination={{
              total: filteredUsers.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: 10,
              showSizeChanger: false,
              current: currentPage,
              onChange: handlePaginationChange,
            }}
            columns={columns}
            dataSource={filteredUsers}
            rowKey={(record) => record.id || record.email}
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
              padding: "10px",
            }}
          />
        }
      >
        <div>
          <div className="flex justify-center items-center gap-2 flex-col py-[16px] border-b border-[#ccc]">
            <h1 className="text-[25px] font-medium">User Details</h1>
          </div>
          <div className="p-[20px]">
            <div className="flex justify-between border-b border-[#ccc] mt-4 py-[16px]">
              <p>Full Name:</p>
              <p>{selectedUser?.fullName || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Email:</p>
              <p>{selectedUser?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Phone:</p>
              <p>{selectedUser?.phoneNumber || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
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
