import React, { useState } from 'react';

const AllAdmins = () => {
    // State to manage the active tab
    const [activeTab, setActiveTab] = useState('superAdmin');

    // Function to handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='px-5 py-14'>
            {/* Tabs - Super Admin and Regular Admin */}
            <div className='flex justify-between items-center gap-3'>
                <button
                    className={`py-3 text-base px-4  w-full border-2 border-primaryBg rounded-lg transition-colors duration-200 ${activeTab === 'superAdmin' ? 'bg-primaryBg text-[#fff]' : 'bg-gray-200 text-black'}`}
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
                        <div>
                            <h2 className='text-xl font-semibold'>Super Admin Info</h2>
                            <p className='mt-2 text-gray-700'>Regular Admins have limited control. They can manage users, view analytics, but cannot modify system-wide settings or manage other admins.</p>
                        </div>

                        {/* Add New Admin Button */}
                        <div className='mt-8'>
                            <button className='bg-green-500 text-white py-2 px-4 rounded-lg'>
                                Add Super Admin
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'regularAdmin' && (
                    <div>
                        <div>
                            <h2 className='text-xl font-semibold'>Basic/Regular Admin Info</h2>
                            <p className='mt-2 text-gray-700'>Regular Admins have limited control. They can manage users, view analytics, but cannot modify system-wide settings or manage other admins.</p>
                        </div>

                        {/* Add New Admin Button */}
                        <div className='mt-8'>
                            <button className='bg-green-500 text-white py-2 px-4 rounded-lg'>
                                Add Regular Admin
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

export default AllAdmins;