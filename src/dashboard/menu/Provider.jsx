/* eslint-disable react/prop-types */
import { useState } from "react";
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProviderQuery } from "../../redux/features/auth/heashboard/providerGet";
import url from "../../redux/api/baseUrl";

// Define the columns for the table
const columns = [
  {
    title: "Name",
    dataIndex: "fullName",
    key: "fullName",
    render: (text, record) => (
      <div className="flex items-center gap-2">
         
        <img
          src={`${url}/${record.image}`}
          alt={text}
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        <div>
          <span className="font-semibold text-[18px] capitalize">{text}</span> <br />
          <span>{record.email}</span>
        </div>
      </div>
    )
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
    render: (text) => (
      <div>
        <span>Demo</span> {/* Display the rating */}
      </div>
    )
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Link
        to={`/dashboard/provider`}
        type="primary"
        className=" text-[#2168d3] font-semibold"
        onClick={() => handleAction(record.key)}
      >
        Block
      </Link>
    )
  },
  {
    title: "Feedback",
    dataIndex: "feedback",
    key: "feedback",
    render: (text, record) => (
      <div>
        <button
          className=" text-[#2168d3] font-semibold"
          onClick={() => handleFeedback(record.key)}
          style={{ marginLeft: 8 }}
        >
          Give Feedback
        </button>
      </div>
    )
  },
  {
    title: "View More",
    key: "action",
    render: (_, record) => (
      <Link
        to={`/dashboard/provider/${record.id}`}
        type="primary"
        className=" text-[#2168d3] font-semibold"
        onClick={() => handleAction(record.key)}
      >
        View
      </Link>
    )
  }
];

// Handle the action click (for demonstration purposes)
const handleAction = (key) => {
  console.log(`Action clicked for record with key: ${key}`);
};

// Handle the feedback button click (for demonstration purposes)
const handleFeedback = (key) => {
  console.log(`Feedback button clicked for record with key: ${key}`);
};

const Provider = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3); // Change page size to 3 for testing

  // Fetch the provider data using the Redux query hook
  const { data: allProviderData, isLoading, error } = useGetAllProviderQuery();

  // Check if data is available
  if (isLoading) return <div className="text-[30px] text-[#fd3131] text-center mt-10">Providers Loading...</div>;

  if (error) {
    return <div>Error fetching provider data</div>;
  }

  // Get the providers data from the API response
  const provider = allProviderData?.data?.attributes?.results || [];
  console.log(provider);

  // Total items count
  const totalItems = provider.length;

  // Handle page change
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page); // Update current page
  };

  // Slice the data based on pagination
  const pagedData = provider.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="mt-10">
      <Table
        columns={columns}
        dataSource={pagedData} // Use sliced provider data for the current page
        className="custom-ant-table"
        bordered
        pagination={false} // Disable internal pagination
        rowClassName="table-row"
        style={{
          backgroundColor: "#eee" // Optional background color for the table
        }}
      />

      {/* External Pagination */}
      <div className="flex justify-center bg-[#e8ebf0] py-3">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePageChange}
          showSizeChanger={false} // Optional: Disable page size changer
        />
      </div>
    </div>
  );
};

export default Provider;
