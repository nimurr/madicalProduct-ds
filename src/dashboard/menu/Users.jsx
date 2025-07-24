import { Button, DatePicker, Input, Modal, Space, Table, Checkbox } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetAllUserQuery } from "../../redux/features/auth/heashboard/allUserGet";

const { Search } = Input;

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // To store the selected user
  const [selectedEmails, setSelectedEmails] = useState([]); // To track selected emails
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
  if (isLoading) return <div className="h-[80vh] w-full flex items-center justify-center">
    <div className="relative">
      <img className="w-48" src="/image/Loading_image.gif" alt="" />
    </div>
  </div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  // Handle search
  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filtered);
  };


  // Handle checkbox change
  const handleCheckboxChange = (email, checked) => {
    if (checked) {
      setSelectedEmails((prev) => [...prev, email]);
    } else {
      setSelectedEmails((prev) => prev.filter((e) => e !== email));
    }
  };

  // Handle Select All
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmails(filteredUsers.map((user) => user.email));
    } else {
      setSelectedEmails([]);
    }
  };

  // Handle sending email
  const handleSendEmails = () => {
    const mailtoLink = `mailto:${selectedEmails.join(",")}`;
    window.location.href = mailtoLink;
  };

  // Handle modal for user details
  const handleView = (user) => {
    setSelectedUser(user); // Set the selected user
    setIsModalOpen(true); // Open modal
  };

  const usersInfo = JSON.parse(localStorage.getItem("user"));
  const userRole = usersInfo?.user?.role;


  // Columns for the table
  const columns = [
    {
      title: <Checkbox
        onChange={(e) => handleSelectAll(e.target.checked)}
        checked={selectedEmails.length === filteredUsers.length && filteredUsers.length > 0}
      />,
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <Checkbox
          onChange={(e) => handleCheckboxChange(record.email, e.target.checked)}
          checked={selectedEmails.includes(record.email)}
        />
      ),
    },
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
      render: (_, record) => <p className="font-medium">{record?.fullName}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => <p>{userRole == "masterAdmin" && record?.email || "--"}</p>,
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, record) => <p>{userRole == "masterAdmin" && record?.phoneNumber || "--"}</p>,
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
      render: (_, record) => <p>{userRole == "masterAdmin" && record?.location?.locationName || "--"}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-4">
          {
            userRole == "masterAdmin" &&
            <Link
              target="_blank"
              to={`https://mail.google.com/mail/u/0/?fs=1&to=${record?.email}&tf=cm`}
              style={{ fontSize: "1.5rem" }}
            >
              <MdOutlineEmail className="text-2xl" />
            </Link>
          }

          <BsInfoCircle
            onClick={() => handleView(record)}
            size={18}
            className="text-primaryBg font-bold cursor-pointer"
          />
        </div>
      ),
    },
  ];



  return (
    <div>
      <div className="rounded-t-lg mt-5">
        <div className="md:flex py-[22px] justify-between items-center flex-wrap">
          <p className="text-header font-semibold">Members</p>
          <div className="flex items-center gap-2">
            {/* <Space direction="vertical">
              <DatePicker format="DD MMMM YYYY" onChange={handleSearch} placeholder="Select Date" />
            </Space> */}
            <Search placeholder="Search by name or email" onSearch={handleSearch} enterButton />
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
              onChange: setCurrentPage,
            }}
            columns={columns}
            dataSource={filteredUsers}
            rowKey={(record) => record.email}
          />
        </div>
        {
          userRole == "masterAdmin" &&
          <Button
            onClick={handleSendEmails}
            disabled={selectedEmails.length === 0}
            className="mt-4"
            type="primary"
          >
            Send Email to Selected Users
          </Button>
        }
      </div>
      {/* User Details Modal */}
      <Modal
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
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
              <p>{userRole == "masterAdmin" && selectedUser?.email || "--"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Phone:</p>
              <p>{selectedUser?.phoneNumber || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Phone:</p>
              <p>{selectedUser?.location?.locationName || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Date of Birth:</p>
              <p>
                {selectedUser?.dataOfBirth
                  ? new Date(selectedUser.dataOfBirth).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
