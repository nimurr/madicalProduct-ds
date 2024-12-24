import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tabs, Modal, message } from "antd";
import { useGetSingleAdsBannerQuery, useUpdateDeclimeMutation, useUpdatePublishedMutation } from "../../../redux/features/auth/heashboard/adsBanner";
import url from "../../../redux/api/baseUrl";
import BannerAd from "./BannerAd";

const { TabPane } = Tabs;

const BannerAdDetails = () => {


    const { id } = useParams();
    const { data: bannerAd } = useGetSingleAdsBannerQuery(id);
    const [updateDeclime, { isLoading }] = useUpdateDeclimeMutation()
    const [updatePublished] = useUpdatePublishedMutation()
    
    const BannerAdDetails = bannerAd?.data?.attributes;


    const [bannerPublishedAdData, setBannerPublishedAdData] = useState(null);
    useEffect(() => {
        if (bannerAd?.data?.attributes) {
            const isOnPublished = bannerAd.data.attributes.status === "published";
            setBannerPublishedAdData(isOnPublished ? bannerAd.data.attributes : null);
        }
    }, [bannerAd]);
    console.log("Filtered Published-on Data:", bannerPublishedAdData);


    const [bannerDeclaimAdData, setBannerDeclaimAdData] = useState(null);
    useEffect(() => {
        if (bannerAd?.data?.attributes) {
            const isOnDeclaim = bannerAd.data.attributes.status === "declaim";
            setBannerDeclaimAdData(isOnDeclaim ? bannerAd.data.attributes : null);
        }
    }, [bannerAd]);
    console.log("Filtered Declaim-on Data:", bannerDeclaimAdData);





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

    
    const handleDeclineSubmit = async (e) => {
        e.preventDefault()

        const status = 'declaim';
        const declaimedMessage = e.target.feedback.value;
        console.log(id, status, declaimedMessage);

        try {

            const res = await updateDeclime({ id, status, declaimedMessage }).unwrap();
            console.log(res);
            message.success('Ad Declaim Successfully');
            setIsDeclineModalVisible(false);
        } catch (error) {
            message.error('Failed to Declaim Ad');
        }


    };

    const handlePublishAds = async (e) => {
        e.preventDefault()

        const status = 'published'; 

        try {

            const res = await updatePublished({ id, status }).unwrap();
            console.log(res);
            message.success('Ad Published Successfully');
            setIsDeclineModalVisible(false);
        } catch (error) {
            message.error('Failed to Declaim Ad');
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
                    {
                        BannerAdDetails?.status === "on-hold" ?

                            <div className="p-4">
                                {/* Flex Container */}
                                <div className="flex flex-col md:flex-row bg-[#eee]">
                                    {/* Image Section */}
                                    <div className="md:w-1/4 p-2">
                                        <img
                                            src={url + BannerAdDetails?.image}
                                            alt="Medicine Ad"
                                            className="object-cover min-w-[300px] h-full"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="md:w-2/3 p-6 bg-gray-50">
                                        <h1 className="text-[35px] font-bold text-gray-800 mb-2">
                                            {BannerAdDetails?.title}
                                        </h1>
                                        <h2 className="text-[25px] text-[#1e66ca] text-xl font-semibold mb-4">
                                            {BannerAdDetails?.subTitle}
                                        </h2>
                                        <p className="text-gray-600 mb-4">
                                            {BannerAdDetails?.description}
                                        </p>
                                        <div className="flex justify-between mb-4">
                                            <div>
                                                <h3 className="text-gray-800 font-semibold mb-2">Key Benefits:</h3>
                                                <ul className="list-disc list-inside text-gray-600">
                                                    {
                                                        BannerAdDetails?.keys?.map((benefit, index) => <li className="mt-1" key={index}>{benefit}</li>)
                                                    }
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 font-semibold mb-2">Price:</h3>
                                                <p className="text-blue-500 text-lg font-semibold">
                                                    <span className="text-[#1e66ca]">${BannerAdDetails?.amount}</span> per unit
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
                                    <button
                                    onClick={handlePublishAds}
                                        className="text-white py-3 w-60 text-center bg-primaryBg text-whiteText font-semibold rounded-lg shadow-md"
                                    >
                                        Publish Ad
                                    </button>
                                </div>
                            </div>
                            :
                            <p className="text-center my-5 text-[20px] text-[#c90707] font-semibold">No Ad Found</p>
                    }
                </TabPane>

                {/* Published Ads Tab */}
                <TabPane tab="Published Ads" key="2">
                    {
                        bannerPublishedAdData ?
                            <div className="p-4">
                                {/* Flex Container */}
                                <div className="flex flex-col md:flex-row bg-[#eee]">
                                    {/* Image Section */}
                                    <div className="md:w-1/4 p-2">
                                        <img
                                            src={url + bannerPublishedAdData?.image}
                                            alt="Medicine Ad"
                                            className="object-cover min-w-[300px] h-full"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="md:w-2/3 p-6 bg-gray-50">
                                        <h1 className="text-[35px] font-bold text-gray-800 mb-2">
                                            {bannerPublishedAdData?.title}
                                        </h1>
                                        <h2 className="text-[25px] text-[#1e66ca] text-xl font-semibold mb-4">
                                            {bannerPublishedAdData?.subTitle}
                                        </h2>
                                        <p className="text-gray-600 mb-4">
                                            {bannerPublishedAdData?.description}
                                        </p>
                                        <div className="flex justify-between mb-4">
                                            <div>
                                                <h3 className="text-gray-800 font-semibold mb-2">Key Benefits:</h3>
                                                <ul className="list-disc list-inside text-gray-600">
                                                    {
                                                        bannerPublishedAdData?.keys?.map((benefit, index) => <li className="mt-1" key={index}>{benefit}</li>)
                                                    }
                                                    {/* <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                            <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                            <li className="mt-1">Jorem ipsum dolor sit amet</li> */}
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 font-semibold mb-2">Price:</h3>
                                                <p className="text-blue-500 text-lg font-semibold">
                                                    <span className="text-[#1e66ca]">${bannerPublishedAdData?.amount}</span> per unit
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            :

                            <p className="text-center my-5 text-[20px] text-[#c90707] font-semibold">No Published Ads !!!</p>
                    }
                </TabPane>

                {/* Declined Ads Tab */}
                <TabPane tab="Declined Ads" key="3">
                    {
                        bannerDeclaimAdData ?
                            <div className="p-4">
                                {/* Flex Container */}
                                <div className="flex flex-col md:flex-row bg-[#eee]">
                                    {/* Image Section */}
                                    <div className="md:w-1/4 p-2">
                                        <img
                                            src={url + bannerDeclaimAdData?.image}
                                            alt="Medicine Ad"
                                            className="object-cover min-w-[300px] h-full"
                                        />
                                    </div>

                                    {/* Content Section */}
                                    <div className="md:w-2/3 p-6 bg-gray-50">
                                        <h1 className="text-[35px] font-bold text-gray-800 mb-2">
                                            {bannerDeclaimAdData?.title}
                                        </h1>
                                        <h2 className="text-[25px] text-[#1e66ca] text-xl font-semibold mb-4">
                                            {bannerDeclaimAdData?.subTitle}
                                        </h2>
                                        <p className="text-gray-600 mb-4">
                                            {bannerDeclaimAdData?.description}
                                        </p>
                                        <div className="flex justify-between mb-4">
                                            <div>
                                                <h3 className="text-gray-800 font-semibold mb-2">Key Benefits:</h3>
                                                <ul className="list-disc list-inside text-gray-600">
                                                    {
                                                        bannerDeclaimAdData?.keys?.map((benefit, index) => <li className="mt-1" key={index}>{benefit}</li>)
                                                    }
                                                    {/* <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                                    <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                                    <li className="mt-1">Jorem ipsum dolor sit amet</li> */}
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-gray-800 font-semibold mb-2">Price:</h3>
                                                <p className="text-blue-500 text-lg font-semibold">
                                                    <span className="text-[#1e66ca]">${bannerDeclaimAdData?.amount}</span> per unit
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
                            :
                            <p className="text-center my-5 text-[20px] text-[#c90707] font-semibold">No Declined Ads !!!</p>
                    }
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
                        {bannerDeclaimAdData?.declaimedMessage ? bannerDeclaimAdData?.declaimedMessage : <p className="text-[#c90707] text-[20px]">No Feedback</p>}
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
