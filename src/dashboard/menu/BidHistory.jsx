import { Button, DatePicker, Input, Modal, Space, Table } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { useGetAllBidHistoryQuery } from "../../redux/features/auth/heashboard/bidHistory";
import url from "../../redux/api/baseUrl";

const { Search } = Input;

const BidHistory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Fetch bid history data
  const { data: bidHistoryData, isLoading, error } = useGetAllBidHistoryQuery();
  const bids = bidHistoryData?.data?.bids || [];

  useEffect(() => {
    setFilteredData(bids); // Initialize filtered data
  }, [bids]);

  // Table columns
  const columns = [
    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (_, __, index) => index + 1 + (currentPage - 1) * pageSize,
    },
    {
      title: "User Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (_, record) => <p>{record?.user?.fullName}</p>,
    },
    {
      title: "Business Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img
            className="min-w-[34px] h-[34px] rounded-full"
            src={url + record?.user?.image || "/path/to/default-avatar.jpg"}
            alt={record?.user?.fullName}
          />
          <div>
            <p className="font-medium">{record?.user?.fullName || "N/A"}</p>
            <p className="text-xs">{record?.user?.email || "N/A"}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Bid Status",
      dataIndex: "bidStatus",
      key: "bidStatus",
      render: (_, record) => <p className={`
        ${record?.status == "pending"	&& "text-[#d00]" }
        ${record?.status == "completed"	&& "text-[#093be0]" }
      
      `}>{record?.status || "N/A"}</p>,
    },
    {
      title: "Last Price",
      dataIndex: "lastPrice",
      key: "lastPrice",
      render: (_, record) => {
        const totalAmount = record?.history?.reduce(
          (prev, current) => prev + (current.amount || 0),
          0
        );
        return <p>${totalAmount.toFixed(2)}</p>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => {
        const formattedDate = record?.createdAt
          ? new Date(record.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "N/A";
        return <p>{formattedDate}</p>;
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
            className="text-primaryBg cursor-pointer"
          />
        </Space>
      ),
    },
  ];

  // View record details in modal
  const handleView = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  // Search functionality
  const handleSearch = (value) => {
    const lowercasedValue = value.toLowerCase();
    const filtered = bids.filter(
      (record) =>
        record?.user?.fullName?.toLowerCase().includes(lowercasedValue) ||
        record?.user?.email?.toLowerCase().includes(lowercasedValue)
    );
    setFilteredData(filtered);
  };

  // Date filter functionality
  const handleDateFilter = (date, dateString) => {
    if (!dateString) {
      setFilteredData(bids); // Reset to all bids if no date selected
      return;
    }
    const filtered = bids.filter((record) => {
      const bidDate = new Date(record?.createdAt).toLocaleDateString("en-GB");
      return bidDate === dateString;
    });
    setFilteredData(filtered);
  };

  // Handle pagination
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  // Loading and error states
  if (isLoading) {
    return <div className="text-center text-lg text-primaryBg">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-lg text-red-500">Error loading data!</div>;
  }

  return (
    <div>
      <div className="rounded-t-lg mt-[24px]">
        <div className="flex py-[22px] justify-between items-center flex-wrap">
          <div>
            <p className="text-header font-semibold">Bid History</p>
          </div>
          <div>
            <Space direction="vertical">
              <DatePicker
                onChange={handleDateFilter}
                format="DD/MM/YYYY"
              />
            </Space>
            <Search
              style={{
                width: "200px",
                marginLeft: "4px",
              }}
              placeholder="Search by name or email"
              onSearch={handleSearch}
              enterButton
            />
          </div>
        </div>
        <div className="overflow-x-auto bg-[#e8ebf0]">
          <Table
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredData.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
              showSizeChanger: true,
              onChange: handlePaginationChange,
            }}
            columns={columns}
            dataSource={filteredData}
          />
        </div>
      </div>

      {/* Modal */}
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
          <div className="flex justify-center items-center gap-2 py-4 flex-col border-b border-[#ccc] border-b-gray-300">
            <h1 className="text-[20px] font-medium">Bid Details</h1>
          </div>
          <div className="p-[20px]">
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Full Name:</p>
              <p>{selectedRecord?.user?.fullName || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Email:</p>
              <p>{selectedRecord?.user?.email || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Bio:</p>
              <p>{selectedRecord?.user?.bio || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Type:</p>
              <p>{selectedRecord?.type || "N/A"}</p>
            </div>
            <div className="flex justify-between border-b border-[#ccc] py-[16px]">
              <p>Date:</p>
              <p>
                {selectedRecord?.createdAt
                  ? new Date(selectedRecord.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
            <div className="flex justify-between items-center pt-[16px]">
              <p>Address:</p>
              <p className="px-[15px] py-[10px] rounded-lg">
                {selectedRecord?.user?.address || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BidHistory;
