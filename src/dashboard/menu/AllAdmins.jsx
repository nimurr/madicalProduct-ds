import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd'; // Import Ant Design components
import { RiDeleteBin6Line } from 'react-icons/ri';


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

    // Handle form submission
    const handleSubmit = () => {
        console.log('New Admin Details:', { adminName, adminEmail, adminType });

        
        // Reset form and close modal
        setAdminName('');
        setAdminEmail('');
        setIsModalVisible(false);
    };

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
                            {
                                [...Array(4)].map((_, index) => (
                                    <div className='text-center p-4 relative rounded-lg shadow-md bg-[#dceff9]' key={index}>
                                        <div className='absolute top-3 right-0 w-12 h-12 bg-red-500 text-white rounded-full items-center cursor-pointer mb-2 mx-auto'>
                                            <RiDeleteBin6Line className='text-[#ce251f]' />
                                        </div>
                                        <img className='w-24 h-24 mx-auto rounded-full border-4 border-primaryBg' src="https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg" alt="" />
                                        <h2 className='mt-5 text-[28px] font-semibold'>Md. Nurunnabi</h2>
                                        <p className='text-gray-500'>nurunnabi404@gmail.com</p>
                                    </div>
                                ))
                            }
                            <div onClick={() => showModal('superAdmin')} className='text-center cursor-pointer p-4 rounded-lg shadow-md bg-[#dceff9]'>
                                <button className='bg-green-500 text-white py-2 px-4 rounded-lg' >
                                    <img className='w-24 h-24 mx-auto border-primaryBg' src="/image/add-admin.png" alt="" />
                                    <h2 className='mt-5 text-[20px] font-semibold'> Add Super Admin</h2>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'regularAdmin' && (
                    <div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {
                                [...Array(4)].map((_, index) => (
                                    <div className='text-center relative p-4 rounded-lg shadow-md bg-[#dceff9]' key={index}>
                                        <div className='absolute top-3 right-0 w-12 h-12 bg-red-500 text-white rounded-full items-center cursor-pointer mb-2 mx-auto'>
                                            <RiDeleteBin6Line className='text-[#ce251f]' />
                                        </div>
                                        <img className='w-24 h-24 mx-auto rounded-full border-4 border-primaryBg' src="https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg" alt="" />
                                        <h2 className='mt-5 text-[28px] font-semibold'>Md. Nurunnabi</h2>
                                        <p className='text-gray-500'>nurunnabi404@gmail.com</p>
                                    </div>
                                ))
                            }
                            <div onClick={() => showModal('regularAdmin')} className='text-center cursor-pointer p-4 rounded-lg shadow-md bg-[#dceff9]'>
                                <button className='bg-green-500 text-white py-2 px-4 rounded-lg' >
                                    <img className='w-24 h-24 mx-auto border-primaryBg' src="/image/add-admin.png" alt="" />
                                    <h2 className='mt-5 text-[20px] font-semibold'> Add Regular Admin</h2>
                                </button>
                            </div>
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
                        type='file'
                        accept='image/*'
                        className='mb-4'
                        onChange={(e) => console.log(e.target.files[0])} // Handle file upload
                    />
                    <Input
                        placeholder='Enter Admin Name'
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                    />
                    <Input
                        placeholder='Enter Admin Email'
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                    />
                    <div className='flex justify-end'>
                        <Button type="primary" onClick={handleSubmit}>
                            Add {adminType === 'superAdmin' ? 'Super Admin' : 'Regular Admin'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AllAdmins;
