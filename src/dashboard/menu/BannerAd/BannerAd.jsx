import { Input, DatePicker, Table } from "antd";
import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetAllAdsBannerQuery } from "../../../redux/features/auth/heashboard/adsBanner";

const { Search } = Input;

const BannerAd = () => {
    const status = "on-hold"; // Dynamic status if needed
    const { data: adsState, isLoading, error } = useGetAllAdsBannerQuery(status);

    // Extracting the ads data
    const allAdsRequest =
        adsState?.data?.attributes?.map((item, index) => ({
            key: index + 1,
            id: item.id,
            title: item.title,
            description: item.description,
            amount: item.amount,
            createdAt: item.createdAt,
        })) || [];


        console.log(adsState);

    // Initialize filteredData directly
    const [filteredData, setFilteredData] = useState(allAdsRequest);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [pageSize] = useState(10); // Items per page

    // Columns definition
    const columns = [
        {
            title: "#SL",
            key: "sl",
            render: (_, __, index) =>
                (currentPage - 1) * pageSize + index + 1, // Dynamically calculate serial number
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => `$${amount}`, // Format amount as currency
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => new Date(createdAt).toLocaleDateString(), // Format the date
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Link
                    to={`/dashboard/bannerads/${record.id}`}
                    className="text-blue-500 text-left"
                >
                    <IoInformationCircleOutline className="text-header" />
                </Link>
            ),
        },
    ];

    // Search function
    const handleSearch = (value) => {
        const filtered = allAdsRequest.filter(
            (item) =>
                item.title.toLowerCase().includes(value.toLowerCase()) ||
                item.description.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    // DatePicker filter
    const handleDateFilter = (date, dateString) => {
        const filtered = allAdsRequest.filter((item) =>
            new Date(item.createdAt)
                .toLocaleDateString()
                .includes(dateString)
        );
        setFilteredData(filtered);
    };

    // Handle pagination changes
    const handlePaginationChange = (page) => {
        setCurrentPage(page); // Update current page
    };

    // Loading state
    if (isLoading) {
        return <p>Loading...</p>;
    }

    // Error state
    if (error) {
        return <p>Error loading data</p>;
    }

    // No data state
    if (allAdsRequest.length === 0) {
        return <p className="text-center my-20 text-[30px] text-[#be0202] font-semibold">Ads Request Not available !!!</p>;
    }

    return (
        <div className="mt-14 bg-[#e8ebf0] rounded-t-lg ">
            <div className="md:flex justify-between items-center py-4">
                <p className="text-header px-5 text-[#616161] font-semibold py-3">
                    Recent Ad Requests
                </p>
                <div className="flex gap-2">
                    <DatePicker
                        className="p-1"
                        onChange={handleDateFilter}
                    />
                    <Search
                        placeholder="Search by Title or Description"
                        onSearch={handleSearch}
                        enterButton
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table
                    className="custom-ant-table"
                    pagination={{
                        current: currentPage, // Controlled pagination
                        pageSize: pageSize,
                        total: filteredData.length,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                        onChange: handlePaginationChange, // Handle page change
                    }}
                    columns={columns}
                    dataSource={allAdsRequest}
                />
            </div>
        </div>
    );
};

export default BannerAd;
