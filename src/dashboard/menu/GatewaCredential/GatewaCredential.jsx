"use client";

import React, { useState } from 'react';
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
} from 'antd';
import { useAddCredentialMutation, useGetCredentialsQuery } from '../../../redux/features/auth/credential/credential';

const { Option } = Select;

const providerOptions = [
    'stripe', 'paypal', 'square', 'razorpay', 'sslcommerz', 'paystack',
    'flutterwave', 'braintree', 'mollie', 'klarna', 'authorize_net',
    'cashfree', 'mercadopago', 'tap', 'payu', 'stripe_connect',
];

const GatewaCredential = () => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingData, setEditingData] = useState(null);

  
    const openAddModal = () => {
        setEditingData(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const openEditModal = (record) => {
        setEditingData(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
        setEditingData(null);
    };

    const { data } = useGetCredentialsQuery();
    const allCradientials = data?.data?.attributes ;
    console.log('Fetched Credentials:', allCradientials);

    const [addCredential] = useAddCredentialMutation();
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
            const response = await addCredential(formData).unwrap();

            if (response?.code === 201) {
                message.success(`${response?.message}`);
                setIsModalOpen(false);
                form.resetFields();
            }
        } catch (error) {
            console.error('Error adding credential:', error);
            message.error(error?.data?.message || 'Failed to add credential');
        }


    };

    const columns = [
        {
            title: 'Provider',
            dataIndex: 'providerName',
            key: 'providerName',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'Mode',
            dataIndex: 'mode',
            key: 'mode',
            render: (text) => <Tag color={text === 'test' ? 'orange' : 'green'}>{text}</Tag>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                let color = 'default';
                if (text === 'active') color = 'green';
                else if (text === 'expire') color = 'red';
                else if (text === 'deactivate') color = 'orange';
                return <Tag color={color}>{text}</Tag>;
            },
        },

        {
            title: 'Webhook URL',
            dataIndex: 'webhookURL',
            key: 'webhookURL',
            render: (text) => <div className='max-w-48'>{text}</div> || 'N/A',
        },
        {
            title: 'Secret Key',
            dataIndex: 'secretKey',
            key: 'secretKey',
            render: (text) => text ? '******' : 'N/A', // Mask secret key
        },
        {
            title: 'Publishable Key',
            dataIndex: 'publishableKey',
            key: 'publishableKey',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => openEditModal(record)}>
                        Edit
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="py-10 px-0">
            <div className="mb-4 flex justify-between items-center">
                <h2 className="!text-[30px] font-semibold">Gateway Credentials</h2>
                <button
                    className="py-3 px-8 bg-primaryBg text-[#fff] rounded-lg"
                    onClick={openAddModal}
                >
                    Add Credential
                </button>
            </div>

            <Table
                dataSource={allCradientials}
                columns={columns}
                rowKey="key"
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingData ? 'Edit Gateway Credential' : 'Add Gateway Credential'}
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
                        providerName: 'stripe',
                        mode: 'test',
                        status: 'active',
                    }}
                >
                    <Form.Item
                        label="Provider Name"
                        name="providerName"
                        rules={[{ required: true, message: 'Please select provider' }]}
                    >
                        <Select className="h-10" placeholder="Select provider">
                            {providerOptions.map((provider) => (
                                <Option key={provider} value={provider}>
                                    {provider}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Publishable Key"
                        name="publishableKey"
                        rules={[{ required: true, message: 'Please enter publishable key' }]}
                    >
                        <Input type="text" placeholder="Publishable Key" className="py-2" />
                    </Form.Item>

                    <Form.Item
                        label="Secret Key"
                        name="secretKey"
                        rules={[{ required: true, message: 'Please enter secret key' }]}
                    >
                        <Input.Password className="py-2" />
                    </Form.Item>

                    <Form.Item
                        label="Webhook Signing Secret"
                        name="webhookSigningSecret"
                        rules={[{ required: true, message: 'Please enter webhook secret' }]}
                    >
                        <Input placeholder="Webhook Signing Secret" className="py-2" />
                    </Form.Item>

                    <Form.Item
                        label="Webhook URL"
                        name="webhookURL"
                    >
                        <Input placeholder="Webhook URL" className="py-2" />
                    </Form.Item>

                    <Form.Item
                        label="Mode"
                        name="mode"
                        rules={[{ required: true, message: 'Please select mode' }]}
                    >
                        <Select className="h-10">
                            <Option value="test">Test</Option>
                            <Option value="live">Live</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true, message: 'Please select status' }]}
                    >
                        <Select className="h-10">
                            <Option value="active">Active</Option>
                            <Option value="expire">Expire</Option>
                            <Option value="deactivate">Deactivate</Option>
                        </Select>
                    </Form.Item>

                    <div className="flex justify-end mt-4">
                        <button
                            className="py-3 px-8 bg-[#e22323] text-[#fff] rounded-lg mr-2"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="py-3 px-10 bg-primaryBg text-[#fff] rounded-lg"
                        >
                            {editingData ? 'Update' : 'Add'}
                        </button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default GatewaCredential;
