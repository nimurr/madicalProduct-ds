import React, { useState } from "react";
import { Table, Pagination } from "antd";
import { Link } from "react-router-dom";
import { useGetAllProviderQuery } from "../../redux/features/auth/heashboard/providerGet";
import url from "../../redux/api/baseUrl";
import { useCreateIsBlockedMutation } from "../../redux/features/auth/heashboard/isBlockProvider";
import swal from "sweetalert";

const Provider = () => {
  // Define the columns for the table
  const columns = [
    {
      title: "#SL",
      key: "sl",
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1, // Serial number logic
    },
    {
      title: "PROVIDER NAME",
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
            <span className="font-semibold text-[18px] capitalize">{text}</span>
            <br />
            <span>{record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: "RATE",
      dataIndex: "rate",
      key: "rate",
      render: (text) => (
        <div>
          <span>Demo</span> {/* Display the rating */}
        </div>
      ),
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "STATUS",
      key: "status",
      render: (_, record) => (
        <button type="primary" className=" text-[#2168d3] font-semibold">
          {record.isBlock ? (
            <h2 className="bg-[#e23832] text-[#fff] px-1">Blocked</h2>
          ) : (
            <h2 className="bg-[#21b340] text-[#fff] px-1">Active User</h2>
          )}
        </button>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (_, record) => (
        <button type="primary" onClick={() => handleActionStatus(record.id)}>
          {!record.isBlock ? (
            <h2 className="bg-[#d32121] text-[#fff] py-2 px-8 rounded-xl font-semibold">
              Block
            </h2>
          ) : (
            <h2 className="bg-[#2168d3] text-[#fff] py-2 px-8 rounded-xl font-semibold">
              Unblock
            </h2>
          )}
        </button>
      ),
    },
    {
      title: "VIEW MORE",
      key: "viewMore",
      render: (_, record) => (
        <Link
          to={`/dashboard/provider/${record.id}`}
          type="primary"
          className="text-[#2168d3] font-semibold"
        >
          View
        </Link>
      ),
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Items per page

  // Fetch the provider data using the Redux query hook
  const { data: allProviderData, isLoading, error } = useGetAllProviderQuery();

  console.log(allProviderData);

  const [providerPost] = useCreateIsBlockedMutation();

  const handleActionStatus = async (id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "You want to Block / Unblock!",
        icon: "warning",
        buttons: ["Cancel", "Yes, Update it!"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          try {
            const response = await providerPost({ id }).unwrap();
            console.log("Status updated successfully:", response);
            swal("Status Updated!", "The status has been updated.", "success");
          } catch (err) {
            console.error("Failed to update status:", err);
            swal("Error!", "Something went wrong. Please try again.", "error");
          }
        }
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (isLoading)
    return (
      <div className="text-[30px] text-[#fd3131] text-center mt-10">
        Providers Loading...
      </div>
    );

  if (error) return <div>Error fetching provider data</div>;

  const provider = allProviderData?.data?.attributes?.results || [];
  const totalItems = provider.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pagedData = provider.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="mt-10">
      <div>
        <p className="text-header my-5 font-semibold">Providers</p>
      </div>
      <div className="overflow-x-auto bg-[#e8ebf0]">
        <Table
          columns={columns}
          dataSource={pagedData}
          bordered
          pagination={false}
          rowKey={(record) => record.id}
        />
      </div>
      <div className="flex justify-end bg-[#e8ebf0] py-3">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Provider;
