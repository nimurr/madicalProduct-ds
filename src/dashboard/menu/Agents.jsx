import { Button, DatePicker, Input, Modal, Space, Table, Checkbox } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetAllAgentsQuery } from "../../redux/features/auth/heashboard/agentGetall";

const { Search } = Input;

const Agents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null); // To store the selected agent
  const [currentPage, setCurrentPage] = useState(1); // To track current page
  const [filteredAgents, setFilteredAgents] = useState([]); // To store filtered agents
  const [selectedEmails, setSelectedEmails] = useState([]); // To store selected emails

  // Fetching the data
  const { data, isLoading, error } = useGetAllAgentsQuery();

  // Extract agent data
  const agents = data?.data?.attributes?.results || [];

  // Initialize filtered agents with all agents
  useEffect(() => {
    setFilteredAgents(agents);
  }, [agents]);

  // Handle loading and error states
  if (isLoading)
    return (
      <div className="text-[30px] text-[#fd3131] text-center mt-10">
        Agents Loading...
      </div>
    );
  if (error) return <div>Error fetching data: {error.message}</div>;

  // Search logic
  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = agents.filter(
      (agent) =>
        agent.fullName?.toLowerCase().includes(searchValue) ||
        agent.email?.toLowerCase().includes(searchValue)
    );
    setFilteredAgents(filtered);
  };

  // Handle Select/Deselect All
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmails(filteredAgents.map((agent) => agent.email));
    } else {
      setSelectedEmails([]);
    }
  };

  // Handle Individual Checkbox
  const handleCheckboxChange = (email, checked) => {
    if (checked) {
      setSelectedEmails((prev) => [...prev, email]);
    } else {
      setSelectedEmails((prev) => prev.filter((e) => e !== email));
    }
  };

  // Handle Sending Email
  const handleSendEmails = () => {
    const mailtoLink = `mailto:${selectedEmails.join(",")}`;
    window.location.href = mailtoLink;
  };

  // Handle modal for agent details
  const handleView = (agent) => {
    setSelectedAgent(agent); // Set the selected agent
    setIsModalOpen(true); // Open modal
  };

  // Columns for the table
  const columns = [
    {
      title: (
        <Checkbox
          onChange={(e) => handleSelectAll(e.target.checked)}
          checked={
            selectedEmails.length === filteredAgents.length &&
            filteredAgents.length > 0
          }
        />
      ),
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
      title: "Agent Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => <p className="font-medium">{record?.fullName}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => <p>{record?.email || "N/A"}</p>,
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

  return (
    <div>
      <div className="rounded-t-lg mt-5">
        <div className="md:flex py-[22px] justify-between items-center flex-wrap">
          <div>
            <p className="text-header font-semibold">Agents</p>
          </div>
          <div className="flex items-center gap-2">
            {/* <Space direction="vertical">
              <DatePicker
                format="DD MMMM YYYY"
                onChange={handleSearch}
                placeholder="Select Date"
              />
            </Space> */}
            <Search
              placeholder="Search by name or email"
              onSearch={handleSearch}
              enterButton
            />
          </div>
        </div>
        <div className="overflow-x-auto bg-[#e8ebf0]">
          <Table
            pagination={{
              total: filteredAgents.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              defaultPageSize: 10,
              showSizeChanger: false,
              current: currentPage,
              onChange: setCurrentPage,
            }}
            columns={columns}
            dataSource={filteredAgents}
            rowKey={(record) => record.email}
          />
        </div>
        <Button
          onClick={handleSendEmails}
          disabled={selectedEmails.length === 0}
          className="mt-4"
          type="primary"
        >
          Send Email to Selected Agents
        </Button>
      </div>

      {/* Agent Details Modal */}
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
            <h1 className="text-[25px] font-medium">Agent Details</h1>
          </div>
          <div className="p-[20px]">
            <div className="flex justify-between border-b border-[#ccc] mt-4 py-[16px]">
              <p>Full Name:</p>
              <p>{selectedAgent?.fullName || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Email:</p>
              <p>{selectedAgent?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Phone:</p>
              <p>{selectedAgent?.phoneNumber || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Date of Birth:</p>
              <p>
                {selectedAgent?.dataOfBirth
                  ? new Date(selectedAgent.dataOfBirth).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Agents;
