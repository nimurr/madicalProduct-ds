import React, { useEffect, useState } from "react";
import { Tabs, Modal, message } from "antd";
import { useGetAllAdsBannerQuery, useUpdateDeclimeMutation, useUpdatePublishedMutation } from "../../../redux/features/auth/heashboard/adsBanner";
import url from "../../../redux/api/baseUrl";

const { TabPane } = Tabs;

const BannerAdDetails = () => {


    const [status , setStus] = useState("published");
    const handleTabChange = (key) => {
        setStus(key);
    };

    const { data: adsState } = useGetAllAdsBannerQuery(status); // Fetch all ads data


    // console.log(adsState);

    // Extract ads by status
    const newAds = adsState?.data?.attributes?.filter((ad) => ad.status === "on-hold") || [];
    const publishedAds = adsState?.data?.attributes?.filter((ad) => ad.status === "published") || [];
    const declinedAds = adsState?.data?.attributes?.filter((ad) => ad.status === "declaim") || [];

    console.log(newAds , publishedAds , declinedAds);


    // console.log(newAds);

    const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
    const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false);
    const [selectedAd, setSelectedAd] = useState(null);

    const [updateDeclime] = useUpdateDeclimeMutation();
    const [updatePublished] = useUpdatePublishedMutation();

    // Feedback Modal Handlers
    const showFeedbackModal = (ad) => {
        setSelectedAd(ad);
        setIsFeedbackModalVisible(true);
    };
    const handleFeedbackCancel = () => {
        setIsFeedbackModalVisible(false);
    };

    // Decline Modal Handlers
    const showDeclineModal = (ad) => {
        setSelectedAd(ad);
        setIsDeclineModalVisible(true);
    };
    const handleDeclineCancel = () => {
        setIsDeclineModalVisible(false);
    };

    // Decline Submit
    const handleDeclineSubmit = async (e) => {
        e.preventDefault();
        const status = "declaim";
        const feedback = e.target.feedback.value;

        try {
            await updateDeclime({ id: selectedAd.id, status, declaimedMessage: feedback }).unwrap();
            message.success("Ad Declined Successfully");
            setIsDeclineModalVisible(false);
        } catch (error) {
            message.error("Failed to Decline Ad");
        }
    };

    // Publish Ad
    const handlePublishAds = async (ad) => {
        const status = "published";
        try {
            await updatePublished({ id: ad.id, status }).unwrap();
            message.success("Ad Published Successfully");
        } catch (error) {
            message.error("Failed to Publish Ad");
        }
    };

    return (
        <div className="mt-14 bg-gray-100 overflow-hidden">
            {/* Tabs Section */}
            <Tabs
                defaultActiveKey="1"
                tabBarStyle={{ fontWeight: "600", fontSize: "1.5rem" }}
                className="px-4"
            >
                {/* New Ads Tab */}
                <TabPane tab="New Ads" onClick={() => handleTabChange("on-hold")} key="1">
                    {newAds.length > 0 ? (
                        newAds.map((ad) => (
                            <div key={ad.id} className="p-4 mb-4 bg-white rounded-lg shadow">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/4 p-2">
                                        <img
                                            src={url + ad.image}
                                            alt="Ad"
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div className="md:w-3/4 p-6">
                                        <h1 className="text-[35px] font-bold text-gray-800 mb-2">{ad.title}</h1>
                                        <p className="text-gray-600 mb-4">{ad.description}</p>
                                        <div className="flex justify-between items-center">
                                            <p className="text-blue-500 text-lg font-semibold">
                                                ${ad.amount} per unit
                                            </p>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => showDeclineModal(ad)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                                                >
                                                    Decline
                                                </button>
                                                <button
                                                    onClick={() => handlePublishAds(ad)}
                                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                                >
                                                    Publish
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-[30px] text-[#ce0c0c]">No New Ads Found !!!</p>
                    )}
                </TabPane>

                {/* Published Ads Tab */}
                <TabPane tab="Published Ads" onClick={() => handleTabChange("published")} key="2">
                    {publishedAds.length > 0 ? (
                        publishedAds.map((ad) => (
                            <div key={ad.id} className="p-4 mb-4 bg-white rounded-lg shadow">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/4 p-2">
                                        <img
                                            src={url + ad.image}
                                            alt="Ad"
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div className="md:w-3/4 p-6">
                                        <h1 className="text-[35px] font-bold text-gray-800 mb-2">{ad.title}</h1>
                                        <p className="text-gray-600 mb-4">{ad.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-[30px] text-[#ce0c0c]">No Published Ads Found !!!</p>
                    )}
                </TabPane>

                {/* Declined Ads Tab */}
                <TabPane tab="Declined Ads" onClick={() => handleTabChange("declaim")} key="3">
                    {declinedAds.length > 0 ? (
                        declinedAds.map((ad) => (
                            <div key={ad.id} className="p-4 mb-4 bg-white rounded-lg shadow">
                                <div className="flex flex-col md:flex-row">
                                    <div className="md:w-1/4 p-2">
                                        <img
                                            src={url + ad.image}
                                            alt="Ad"
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div className="md:w-3/4 p-6">
                                        <h1 className="text-[35px] font-bold text-gray-800 mb-2">{ad.title}</h1>
                                        <p className="text-gray-600 mb-4">{ad.description}</p>
                                        <button
                                            onClick={() => showFeedbackModal(ad)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                        >
                                            View Feedback
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-[30px] text-[#ce0c0c]">No Declined Ads Found !!!</p>
                    )}
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
                        {selectedAd?.attributes.declaimedMessage || (
                            <span className="text-red-500">No Feedback</span>
                        )}
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
                    <form onSubmit={handleDeclineSubmit}>
                        <input
                            className="w-full rounded py-3 px-2 border-[2px] border-gray-300"
                            name="feedback"
                            type="text"
                            placeholder="Enter Feedback"
                        />
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default BannerAdDetails;
