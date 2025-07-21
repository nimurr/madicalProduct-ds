import React, { useState } from 'react';
import { Modal, Button, Input, message } from 'antd'; // Import Ant Design components
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useAddAdminMutation, useDeleteAdminMutation, useGetAdminsQuery } from '../../redux/features/auth/Admins/admins';
import url from '../../redux/api/baseUrl';


const AllAdmins = () => {
    // State to manage the active tab
    const [activeTab, setActiveTab] = useState('superAdmin');

    // State for Modal visibility
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [adminType, setAdminType] = useState(''); // 'superAdmin' or 'regularAdmin'
    const [adminName, setAdminName] = useState('');
    const [adminEmail, setAdminEmail] = useState('');

    // Function to handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Show the modal when the "Add" button is clicked
    const showModal = (type) => {
        setAdminType(type); // Set the admin type (Super or Regular)
        setIsModalVisible(true);
    };

    // Handle closing the modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const [addAdmins] = useAddAdminMutation();
    // Handle form submission
    const handleSubmit = async () => {
        console.log('New Admin Details:', { adminName, adminEmail, adminType });
        const formData = {
            email: adminEmail,
            access: adminType === 'superAdmin' ? 'superAdmin' : 'basicAdmin',
        }

        try {

            const response = await addAdmins(formData).unwrap();
            message.success(`${response?.message}`);

        } catch (error) {
            console.error('Error adding admin:', error);
            message.error(error?.data?.message || 'Failed to add admin');
        }

        // Reset form and close modal
        setAdminName('');
        setAdminEmail('');
        setIsModalVisible(false);
    };

    const { data: getAllAdmins, isLoading } = useGetAdminsQuery(activeTab === 'superAdmin' ? 'superAdmin' : 'basicAdmin');
    const allAdmins = getAllAdmins?.data?.attributes?.results;
    console.log(allAdmins);


    const [deleteAdmin] = useDeleteAdminMutation();

    const handleDelete = async (item) => {

        try {
            const response = await deleteAdmin(item?.id).unwrap();
            message.success(`${response?.message}`);
            // Optionally, you can refetch the admins or update the state to reflect the deletion

        } catch (error) {
            console.error('Error deleting admin:', error);
            message.error(error?.data?.message || 'Failed to delete admin');
        }

    }


    return (
        <div className='px-5 py-14'>
            {/* Tabs - Super Admin and Regular Admin */}
            <div className='flex justify-between items-center gap-3'>
                <button
                    className={`py-3 text-base px-4 w-full border-2 border-primaryBg rounded-lg transition-colors duration-200 ${activeTab === 'superAdmin' ? 'bg-primaryBg text-[#fff]' : 'bg-gray-200 text-black'}`}
                    onClick={() => handleTabClick('superAdmin')}
                >
                    Super Admin
                </button>

                <button
                    className={`py-3 text-base px-4 w-full border-2 border-primaryBg rounded-lg transition-colors duration-200 ${activeTab === 'regularAdmin' ? 'bg-primaryBg text-[#fff]' : 'bg-gray-200 text-black'}`}
                    onClick={() => handleTabClick('regularAdmin')}
                >
                    Basic/Regular Admin
                </button>
            </div>

            {/* Content based on active tab */}
            <div className='mt-8'>
                {activeTab === 'superAdmin' && (
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            <div onClick={() => showModal('superAdmin')} className=' border-2 border-primary   text-center cursor-pointer p-4 rounded-lg shadow-md bg-[#dceff9]'>
                                <button className='bg-green-500 text-white py-2 px-4 rounded-lg' >
                                    <img className='w-24 h-24 mx-auto border-primaryBg' src="/image/add-admin.png" alt="" />
                                    <h2 className='mt-5 text-[20px] font-semibold'> Add Super Admin</h2>
                                </button>
                            </div>

                            {
                                allAdmins?.map((item, index) => (
                                    <div className='text-center p-4 relative rounded-lg shadow-md bg-[#dceff9]' key={index}>
                                        <div onClick={() => handleDelete(item)} className='absolute top-3 right-0 w-12 h-12 bg-red-500 text-white rounded-full items-center cursor-pointer mb-2 mx-auto'>
                                            <RiDeleteBin6Line className='text-[#ce251f]' />
                                        </div>
                                        <img className='w-24 h-24 mx-auto rounded-full border-4 border-primaryBg' src={url + item?.image} alt="" />
                                        <h2 className='mt-5 text-[25px] font-semibold'>{item?.fullName}</h2>
                                        <p className='text-gray-500'>{item?.email}</p>
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                )}

                {activeTab === 'regularAdmin' && (
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>

                            <div onClick={() => showModal('regularAdmin')} className='border-2 border-primary   text-center cursor-pointer p-4 rounded-lg shadow-md bg-[#dceff9]'>
                                <button className='bg-green-500 text-white py-2 px-4 rounded-lg' >
                                    <img className='w-24 h-24 mx-auto border-primaryBg' src="/image/add-admin.png" alt="" />
                                    <h2 className='mt-5 text-[20px] font-semibold'> Add Regular Admin</h2>
                                </button>
                            </div>

                            {
                                allAdmins?.map((item, index) => (
                                    <div className='text-center p-4 relative rounded-lg shadow-md bg-[#dceff9]' key={index}>
                                        <div onClick={() => handleDelete(item)} className='absolute top-3 right-0 w-12 h-12 bg-red-500 text-white rounded-full items-center cursor-pointer mb-2 mx-auto'>
                                            <RiDeleteBin6Line className='text-[#ce251f]' />
                                        </div>
                                        <img className='w-24 h-24 mx-auto rounded-full border-4 border-primaryBg' src={url + item?.image} alt="" />
                                        <h2 className='mt-5 text-[25px] font-semibold'>{item?.fullName}</h2>
                                        <p className='text-gray-500'>{item?.email}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for adding admin */}
            <Modal
                title={`Add ${adminType === 'superAdmin' ? 'Super Admin' : 'Regular Admin'}`}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={500}
            >
                <form className='space-y-4'>
                    {/* updolad field image ant desing  */}

                    <Input
                        placeholder='Enter Admin Email'
                        className='py-2'
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                    />
                    <div className='flex justify-end'>
                        <Button className='!py-2 h-10 bg-primaryBg text-[#fff] ' onClick={handleSubmit}>
                            Add {adminType === 'superAdmin' ? 'Super Admin' : 'Regular Admin'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AllAdmins;
