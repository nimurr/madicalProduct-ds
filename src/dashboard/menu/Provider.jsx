import React, { useState } from "react";
import { Table, Pagination, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useGetAllProviderQuery } from "../../redux/features/auth/heashboard/providerGet";
import url from "../../redux/api/baseUrl";
import { useCreateIsBlockedMutation } from "../../redux/features/auth/heashboard/isBlockProvider";
import swal from "sweetalert";

const Provider = () => {

  const usersInfo = JSON.parse(localStorage.getItem("user"));
  const userRole = usersInfo?.user?.role;



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
            src={`${url}${record.image}`}
            alt={text}
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <div>
            <span className="font-semibold text-[18px] capitalize">{text}</span>
            <br />
            <span>{userRole == "masterAdmin" && record.email}</span>
          </div>
        </div>
      ),
    },
    {
      title: "RATE",
      dataIndex: "rate",
      key: "rate",
      render: () => <div><span>Demo</span></div>,
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
        <button type="primary" className="text-[#2168d3] font-semibold">
          {record.isBlock ? (
            <h2 className="bg-[#e23832] text-[#fff] px-1 rounded">Blocked</h2>
          ) : (
            <h2 className="bg-[#21b340] text-[#fff] px-1 rounded">Active User</h2>
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
          className="text-[#2168d3] font-semibold"
        >
          View
        </Link>
      ),
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allProviderData, isLoading, error } = useGetAllProviderQuery();
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
      <div className="h-[80vh] w-full flex items-center justify-center">
        <div className="relative">
          <img className="w-48" src="/image/Loading_image.gif" alt="" />
        </div>
      </div>
    );

  if (error) return <div>Error fetching provider data</div>;

  const provider = allProviderData?.data?.attributes?.results || [];
  const totalItems = provider.length;

  const filteredProvider = provider.filter(
    (item) =>
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const pagedData = filteredProvider.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-5">
        <p className="text-header font-semibold">Providers</p>
        <Input
          placeholder="Search by Name or Email"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          className="max-w-[350px] py-2 px-4 border border-gray-300 rounded-lg"
          prefix={<SearchOutlined className="text-gray-500 mr-2" />}
        />
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
          total={filteredProvider.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default Provider;
