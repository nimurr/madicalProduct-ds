import React, { useState } from 'react';
import { Input, Modal, DatePicker, Space, Table, Button, message } from "antd";
import { BsInfoCircle } from "react-icons/bs";
import { CloseOutlined } from "@ant-design/icons";
import users from "/image/users.jpg";
import styles from "./../style.module.css";
import emailjs from 'emailjs-com';

const { Search } = Input;
const dataSource = [
    {
        key: "1",
        customerName: "Bashar Islam",
        date: "16 Apr 2024",
        Amount: "45",
        Type: "player",
        email: "nimurnerob404@gmail.com"
    },
    {
        key: "2",
        customerName: "Bashar Islam",
        date: "16 Apr 2024",
        Amount: "45",
        Type: "player",
        email: "infosahinur@gmail.com"
    },
    {
        key: "3",
        customerName: "Bashar Islam",
        date: "16 Apr 2024",
        Amount: "45",
        Type: "player",
        email: "bashar3@example.com"
    }
];

const Newsletter = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [emailContent, setEmailContent] = useState("");

    const columns = [
        {
            title: "#SI",
            dataIndex: "si",
            key: "si",
            render: (text, _, index) => index + 1
        },
        {
            title: "User Name",
            dataIndex: "customerName",
            key: "name",
            render: (_, record) => (
                <div className="flex gap-2 items-center">
                    <img className="w-[34px] h-[34px] rounded-full" src={users} alt="" />
                    <p className="font-medium">{record?.customerName}</p>
                </div>
            )
        },
        {
            title: "email",
            dataIndex: "email",
            key: "email",
            render: (_, record) => <p>{record?.email ? record?.email : "Apple Or Facebook User"}</p>
        },
        {
            title: "Amount",
            dataIndex: "Amount",
            key: "amount"
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (_, record) => <p>{record?.date}</p>
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <BsInfoCircle
                        onClick={() => handleView(record)}
                        size={18}
                        className="text-[red] cursor-pointer"
                    />
                </Space>
            )
        }
    ];

    const handleView = () => {
        setIsModalOpen(true);
    };

    // Handle row selection for multiple select
    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        }
    };

    // Handle email modal open
    const handleSendEmailClick = () => {
        setIsEmailModalOpen(true);
    };

    // Handle email modal close
    const handleEmailModalClose = () => {
        setIsEmailModalOpen(false);
        setEmailContent(""); // Clear email content when closing
    };

    // Handle email content change
    const handleEmailChange = (e) => {
        setEmailContent(e.target.value);
    };

    // Function to send multiple emails via EmailJS
    const sendEmailToSelectedUsers = async () => {
        const selectedUsers = selectedRowKeys.map((key) => {
            return dataSource.find((user) => user.key === key);
        });

        if (selectedUsers.length === 0) {
            message.error("Please select at least one user.");
            return;
        }

        try {
            // Send email to each selected user
            for (let user of selectedUsers) {
                const templateParams = {
                    to_email: user.email,
                    message: emailContent,
                    from_name: "Your Name", // You can replace this with your name or your system's name
                };

                await emailjs.send(
                    "service_lnb869l", // Replace with your EmailJS service ID
                    "template_rc3zap4", // Replace with your EmailJS template ID
                    templateParams,
                    "f-9yXUNlaHL9UBvo3" // Replace with your EmailJS user ID
                );
            }

            message.success(`Emails sent to ${selectedUsers.length} users!`);
            setEmailContent(""); // Clear email content after sending
            setIsEmailModalOpen(false); // Close email modal
        } catch (error) {
            console.error("Email sending failed:", error);
            message.error("Failed to send emails.");
        }
    };

    const onSearch = (value) => {
        console.log("Search:", value);
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    return (
        <div>
            <div className="rounded-t-lg mt-[24px]">
                <div className="md:flex py-[22px] justify-between items-center">
                    <div>
                        <p className="text-header">Earning</p>
                    </div>
                    <div>
                        <Space direction="vertical">
                            <DatePicker onChange={onChange} />
                        </Space>
                        <Search
                            className="md:ml-2"
                            style={{
                                width: "200px"
                            }}
                            placeholder="input search text"
                            onSearch={onSearch}
                            enterButton
                        />
                    </div>
                </div>
                <div className="overflow-x-scroll bg-[#e8ebf0]">
                    {/* Multi-select Table */}
                    <Table
                        rowSelection={rowSelection}
                        pagination={{
                            total: dataSource.length,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                            defaultPageSize: 5,
                            showSizeChanger: false,
                            className: styles.paginationCenter
                        }}
                        columns={columns}
                        dataSource={dataSource}
                    />

                    {/* Send Email Button */}
                    {selectedRowKeys.length > 0 && (
                        <button
                            className="py-2 mt-5 bg-primaryBg text-whiteText border-2 rounded-md px-10"
                            type="primary"
                            onClick={handleSendEmailClick}
                        >
                            Send Email to {selectedRowKeys.length} User(s)
                        </button>
                    )}
                </div>
            </div>

            {/* Transaction Details Modal */}
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
                    <div className="flex justify-center items-center gap-2 flex-col border-b border-b-gray-300">
                        <p className="text-[26px] mb-[16px] font-medium">Transaction Details</p>
                    </div>
                    <div className="p-[20px]">
                        <div className="flex justify-between border-b py-[16px]">
                            <p>Full Name:</p>
                            <p>absayed</p>
                        </div>
                        <div className="flex justify-between border-b py-[16px]">
                            <p>Email:</p>
                            <p>ab@gmail.com</p>
                        </div>
                        <div className="flex justify-between border-b py-[16px]">
                            <p>Phone:</p>
                            <p>+45269875</p>
                        </div>
                        <div className="flex justify-between border-b py-[16px]">
                            <p>Date:</p>
                            <p>23-11-24</p>
                        </div>
                        <div className="flex justify-between items-center pt-[16px]">
                            <p>Address:</p>
                            <p className="px-[15px] py-[10px] rounded-lg">UK</p>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Send Email Modal */}
            <Modal
                title="Send Email"
                open={isEmailModalOpen}
                onOk={sendEmailToSelectedUsers}
                onCancel={handleEmailModalClose}
                footer={[
                    <Button key="send" type="primary" onClick={sendEmailToSelectedUsers}>
                        Send
                    </Button>,
                    <Button key="cancel" onClick={handleEmailModalClose}>
                        Cancel
                    </Button>
                ]}
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
                    <p>Sending email to:</p>
                    {selectedRowKeys.map((key) => {
                        const user = dataSource.find((user) => user.key === key);
                        return <p key={key}>{user.email}</p>;
                    })}
                    <textarea
                        value={emailContent}
                        onChange={handleEmailChange}
                        placeholder="Enter your email content"
                        rows={6}
                        className="w-full mt-4"
                    />
                </div>
            </Modal>
        </div>
    );
};

export default Newsletter;
