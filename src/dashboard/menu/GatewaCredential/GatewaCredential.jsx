import React, { useState } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    Select,
    Table,
    Space,
    Tag,
    message,
} from "antd";
import {
    useAddCredentialMutation,
    useDeleteCredentialMutation,
    useGetCredentialsQuery,
    useUpdateCredentialMutation,
} from "../../../redux/features/auth/credential/credential";

const { Option } = Select;
const providerOptions = [
    "stripe", "paypal", "square", "razorpay", "sslcommerz", "paystack",
    "flutterwave", "braintree", "mollie", "klarna", "authorize_net",
    "cashfree", "mercadopago", "tap", "payu", "stripe_connect",
];

const GatewayCredential = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

    const { data, isLoading } = useGetCredentialsQuery();
    const credentials = data?.data?.attributes || [];

    const [addCredential] = useAddCredentialMutation();
    const [updateCredential] = useUpdateCredentialMutation();
    const [deleteCredential] = useDeleteCredentialMutation();

    const openAddModal = () => {
        setEditingData(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const openEditModal = (record) => {
        console.log("Editing ID:", record.id);
        setEditingData(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setEditingData(null);
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleFinish = async (values) => {
        const formData = {
            providerName: values.providerName,
            publishableKey: values.publishableKey,
            secretKey: values.secretKey,
            webhookSigningSecret: values.webhookSigningSecret,
            webhookURL: values.webhookURL,
            mode: values.mode,
            status: values.status,
        };

        try {
            if (editingData && editingData.id) {
                const { id } = editingData;
                const response = await updateCredential({ id, body: formData }).unwrap();
                console.log("Update response:", response);
                message.success(response.message || "Credential updated successfully");
            } else {
                const response = await addCredential(formData).unwrap();
                message.success(response.message || "Credential added successfully");
            }
            form.resetFields();
            setEditingData(null);
            setIsModalOpen(false);
        } catch (err) {
            console.error("Credential error:", err);
            message.error(err.data?.message || "Failed to save credential");
        }
    };

    const handleDelete = async (record) => {
        try {
            const response = await deleteCredential(record.id).unwrap();
            message.success(response.message || "Credential deleted successfully");
        } catch (err) {
            console.error("Delete error:", err);
            message.error(err.data?.message || "Failed to delete credential");
        }
    };

    const columns = [
        {
            title: "Provider",
            dataIndex: "providerName",
            key: "providerName",
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: "Mode",
            dataIndex: "mode",
            key: "mode",
            render: (text) => (
                <Tag color={text === "test" ? "orange" : "green"}>{text}</Tag>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text) => {
                let color = "default";
                if (text === "active") color = "green";
                else if (text === "expire") color = "red";
                else if (text === "deactivate") color = "orange";
                return <Tag color={color}>{text}</Tag>;
            },
        },
        {
            title: "Webhook URL",
            dataIndex: "webhookURL",
            key: "webhookURL",
            render: (text) => <div className="max-w-48 truncate">{text || "N/A"}</div>,
        },
        {
            title: "Secret Key",
            dataIndex: "secretKey",
            key: "secretKey",
            render: (text) => <div className="max-w-48 truncate">{text}</div>,
        },
        {
            title: "Publishable Key",
            dataIndex: "publishableKey",
            key: "publishableKey",
            render: (text) => <div className="max-w-48 truncate">{text}</div>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <button className="py-3 px-10 bg-primaryBg text-[#fff] rounded-lg" type="link" onClick={() => openEditModal(record)}>
                        Edit
                    </button>
                    <button
                        type="link"
                        className="py-3 px-10 bg-[#c92020] text-[#fff] rounded-lg"
                        onClick={() => handleDelete(record)}
                    >
                        Delete
                    </button>
                </Space>
            ),
        },
    ];

    return (
        <div className="py-10 px-0">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-[30px] font-semibold">Gateway Credentials</h2>
                <button className="py-3 px-10 bg-primaryBg text-[#fff] rounded-lg" onClick={openAddModal}>
                    Add Credential
                </button>
            </div>

            <Table
                loading={isLoading}
                dataSource={credentials}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingData ? "Edit Gateway Credential" : "Add Gateway Credential"}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleFinish}
                    initialValues={{
                        providerName: "stripe",
                        mode: "test",
                        status: "active",
                    }}
                >
                    <Form.Item
                        label="Provider"
                        name="providerName"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Select provider">
                            {providerOptions.map((p) => (
                                <Option key={p} value={p}>
                                    {p}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Publishable Key"
                        name="publishableKey"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Secret Key"
                        name="secretKey"
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Webhook Signing Secret"
                        name="webhookSigningSecret"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Webhook URL" name="webhookURL">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Mode" name="mode" rules={[{ required: true }]}>
                        <Select>
                            <Option value="test">Test</Option>
                            <Option value="live">Live</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Status" name="status" rules={[{ required: true }]}>
                        <Select>
                            <Option value="active">Active</Option>
                            <Option value="expire">Expire</Option>
                            <Option value="deactivate">Deactivate</Option>
                        </Select>
                    </Form.Item>

                    <Space className="justify-end mt-4">
                        <button className="py-3 px-10 bg-[#d11f1f] text-[#fff] rounded-lg" onClick={handleCancel}>Cancel</button>
                        <button className="py-3 px-10 bg-primaryBg text-[#fff] rounded-lg" type="primary" htmlType="submit">
                            {editingData ? "Update" : "Add"}
                        </button>
                    </Space>
                </Form>
            </Modal>
        </div>
    );
};

export default GatewayCredential;
