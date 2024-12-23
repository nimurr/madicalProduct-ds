import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, Modal, message } from "antd";

const { TabPane } = Tabs;

const BannerAdDetails = () => {
    const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
    const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);

    // Handlers for Feedback Modal
    const showFeedbackModal = () => {
        setIsFeedbackModalVisible(true);
    };

    const handleFeedbackCancel = () => {
        setIsFeedbackModalVisible(false);
    };

    // Handlers for Decline Modal
    const showDeclineModal = () => {
        setIsDeclineModalVisible(true);
    };

    const handleDeclineCancel = () => {
        setIsDeclineModalVisible(false);
    };

    const handleDeclineSubmit = (e) => {
        e.preventDefault()


        console.log(e.target.feedback.value);
        if (!e.target.feedback.value) {
            return message.warning("Please enter a reason for declining the ad.");
        }
        else {
            setIsDeclineModalVisible(false);
            message.success("Ad Declined Successfully.");
        }
    };

    return (
        <div className="mt-14 bg-gray-100 overflow-hidden">
            {/* Tabs Section */}
            <Tabs
                defaultActiveKey="1"
                tabBarStyle={{ fontWeight: "600", fontSize: "1.5rem" }} // Tailwind `text-2xl` equivalent
                className="px-4"
            >
                {/* New Ads Tab */}
                <TabPane tab="New Ads" key="1">
                    <div className="p-4">
                        {/* Flex Container */}
                        <div className="flex flex-col md:flex-row bg-[#eee]">
                            {/* Image Section */}
                            <div className="md:w-1/4 p-2">
                                <img
                                    src={"/image/category1.png"}
                                    alt="Medicine Ad"
                                    className="object-cover min-w-[300px] h-full"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="md:w-2/3 p-6 bg-gray-50">
                                <h1 className="text-[35px] font-bold text-gray-800 mb-2">
                                    Your Health, Our Priority
                                </h1>
                                <h2 className="text-[25px] text-[#1e66ca] text-xl font-semibold mb-4">
                                    Medicine Name
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                                    turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
                                    nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
                                    tellus elit sed risus.
                                </p>
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <h3 className="text-gray-800 font-semibold mb-2">Key Benefits:</h3>
                                        <ul className="list-disc list-inside text-gray-600">
                                            <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                            <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                            <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-800 font-semibold mb-2">Price:</h3>
                                        <p className="text-blue-500 text-lg font-semibold">
                                            <span className="text-[#1e66ca]">$120</span> per unit
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end my-5 gap-2">
                            <button
                                className="text-white py-3 w-60 text-center border-[2px] border-[#dd0909] text-[#dd0909] font-semibold rounded-lg shadow-md"
                                onClick={showDeclineModal}
                            >
                                Decline
                            </button>
                            <Link
                                to={"/dashboard/bannerads/createads"}
                                className="text-white py-3 w-60 text-center bg-primaryBg text-whiteText font-semibold rounded-lg shadow-md"
                            >
                                Publish Ad
                            </Link>
                        </div>
                    </div>
                </TabPane>

                {/* Published Ads Tab */}
                <TabPane tab="Published Ads" key="2">
                    <div className="p-4">
                        {/* Flex Container */}
                        <div className="flex flex-col md:flex-row bg-[#eee]">
                            {/* Image Section */}
                            <div className="md:w-1/4 p-2">
                                <img
                                    src={"/image/category1.png"}
                                    alt="Medicine Ad"
                                    className="object-cover min-w-[300px] h-full"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="md:w-2/3 p-6 bg-gray-50">
                                <h1 className="text-[35px] font-bold text-gray-800 mb-2">
                                    Your Health, Our Priority
                                </h1>
                                <h2 className="text-[25px] text-[#1e66ca] text-xl font-semibold mb-4">
                                    Medicine Name
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                                    turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
                                    nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
                                    tellus elit sed risus.
                                </p>
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <h3 className="text-gray-800 font-semibold mb-2">Key Benefits:</h3>
                                        <ul className="list-disc list-inside text-gray-600">
                                            <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                            <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                            <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-800 font-semibold mb-2">Price:</h3>
                                        <p className="text-blue-500 text-lg font-semibold">
                                            <span className="text-[#1e66ca]">$120</span> per unit
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabPane>

                {/* Declined Ads Tab */}
                <TabPane tab="Declined Ads" key="3">
                    <div className="p-4">
                        {/* Flex Container */}
                        <div className="flex flex-col md:flex-row bg-[#eee]">
                            {/* Image Section */}
                            <div className="md:w-1/4 p-2">
                                <img
                                    src={"/image/category1.png"}
                                    alt="Medicine Ad"
                                    className="object-cover min-w-[300px] h-full"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="md:w-2/3 p-6 bg-gray-50">
                                <h1 className="text-[35px] font-bold text-gray-800 mb-2">
                                    Your Health, Our Priority
                                </h1>
                                <h2 className="text-[25px] text-[#1e66ca] text-xl font-semibold mb-4">
                                    Medicine Name
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                                    turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
                                    nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
                                    tellus elit sed risus.
                                </p>
                                <div className="flex justify-between mb-4">
                                    <div>
                                        <h3 className="text-gray-800 font-semibold mb-2">Key Benefits:</h3>
                                        <ul className="list-disc list-inside text-gray-600">
                                            <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                            <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                            <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-gray-800 font-semibold mb-2">Price:</h3>
                                        <p className="text-blue-500 text-lg font-semibold">
                                            <span className="text-[#1e66ca]">$120</span> per unit
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end my-5 gap-2">
                            <button
                                className="bg-primaryBg px-10 py-3 rounded text-whiteText"
                                onClick={showFeedbackModal}
                            >
                                View Feedback
                            </button>
                        </div>
                    </div>
                </TabPane>
            </Tabs>


            {/* Feedback Modal */}
            <Modal
                visible={isFeedbackModalVisible}
                onCancel={handleFeedbackCancel}
                footer={null}
            >
                <div>
                    <h2 className="text-[25px] font-semibold text-center mb-4">Feedback</h2>
                    <p className="text-gray-600 text-center text-[18px] my-10">
                        This ad was declined because it did not meet our advertising standards.
                        Please review the guidelines and resubmit.
                        This ad was declined because it did not meet our advertising standards.
                        Please review the guidelines and resubmit.
                        This ad was declined because it did not meet our advertising standards.
                        Please review the guidelines and resubmit.
                        This ad was declined because it did not meet our advertising standards.
                        Please review the guidelines and resubmit.
                        This ad was declined because it did not meet our advertising standards.
                        Please review the guidelines and resubmit.
                    </p>
                </div>
            </Modal>

            {/* Decline Confirmation Modal */}
            <Modal
                visible={isDeclineModalVisible}
                onCancel={handleDeclineCancel}
                footer={null}
            >
                <div>
                    <h2 className="text-[20px] font-semibold mb-4">Write Feedback</h2>

                    <form onSubmit={handleDeclineSubmit} action="">
                        <input className="w-full rounded py-3 px-2 border-[2px] border-[#cfcfcf]" name="feedback" type="text" placeholder="Enter Feedback" />

                        <div className="flex justify-center gap-4 mt-10">
                            <button
                                // onClick={handleDeclineConfirm}
                                type="submit"
                                className="bg-primaryBg text-whiteText px-6 py-2 rounded-lg font-semibold"
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default BannerAdDetails;
