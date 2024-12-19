import { Input, DatePicker, Space, Table, Button } from "antd";
import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const { Search } = Input;

const dataSource = [
    {
        key: "1",
        trId: "TR001",
        userName: "John Doe",
        officeName: "NYC Office",
        amount: 1500,
        date: "2024-12-15",
    },
    {
        key: "2",
        trId: "TR002",
        userName: "Jane Smith",
        officeName: "LA Office",
        amount: 2000,
        date: "2024-12-14",
    },
    {
        key: "3",
        trId: "TR003",
        userName: "Alice Johnson",
        officeName: "Chicago Office",
        amount: 1200,
        date: "2024-12-13",
    },
];

const BannerAd = () => {
    const [filteredData, setFilteredData] = useState(dataSource);
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const [pageSize] = useState(10); // Items per page

    const columns = [
        {
            title: "#SL",
            key: "sl",
            render: (_, __, index) =>
                (currentPage - 1) * pageSize + index + 1, // Dynamically calculate serial number
        },
        {
            title: "#Tr.ID",
            dataIndex: "trId",
            key: "trId",
        },
        {
            title: "User Name",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "Office Name",
            dataIndex: "officeName",
            key: "officeName",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount) => `$${amount}`,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Link
                    to={"/dashboard/bannerads/sdfg655sdf21s5d4f"}
                    className="text-blue-500 text-left"
                >
                    <IoInformationCircleOutline className="text-header" />
                </Link>
            ),
        },
    ];

    const handleSearch = (value) => {
        const filtered = dataSource.filter(
            (item) =>
                item.userName.toLowerCase().includes(value.toLowerCase()) ||
                item.officeName.toLowerCase().includes(value.toLowerCase()) ||
                item.date.includes(value)
        );
        setFilteredData(filtered);
    };

    const handlePaginationChange = (page) => {
        setCurrentPage(page); // Update current page
    };

    return (
        <div className="mt-14 bg-[#e8ebf0] rounded-t-lg ">
            <div className="md:flex justify-between items-center py-4">
                <p className="text-header px-5 text-[#616161] font-semibold py-3">
                    Recent Ad Requests
                </p>
                <div className="flex gap-2">
                    <DatePicker
                        className="p-1"
                        onChange={(date, dateString) => {
                            const filtered = dataSource.filter((item) =>
                                item.date.includes(dateString)
                            );
                            setFilteredData(filtered);
                        }}
                    />
                    <Search
                        placeholder="Search by User, Date, or Office"
                        onSearch={handleSearch}
                        enterButton
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table
                    pagination={{
                        current: currentPage, // Controlled pagination
                        pageSize: pageSize,
                        total: filteredData.length,
                        showTotal: (total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`,
                        onChange: handlePaginationChange, // Handle page change
                    }}
                    columns={columns}
                    dataSource={filteredData}
                />
            </div>
        </div>
    );
};

export default BannerAd;
