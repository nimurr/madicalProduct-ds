import React, { useEffect, useState } from "react";
import { Tabs, Modal, message } from "antd";
import { useGetAllAdsBannerQuery, useUpdateDeclimeMutation } from "../../../redux/features/auth/heashboard/adsBanner";
import url from "../../../redux/api/baseUrl";
import { Link } from "react-router-dom";

const { TabPane } = Tabs;

const BannerAdDetails = () => {
    const [status, setStus] = useState("on-hold");
    const [selectedAd, setSelectedAd] = useState(null); // For tracking selected ad in modals
    const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false); // View Feedback Modal
    const [isDeclineModalVisible, setIsDeclineModalVisible] = useState(false); // Write Feedback Modal

    const handleTabChange = (key) => {
        setStus(key);
    };

    const { data: adsState, refetch, isLoading } = useGetAllAdsBannerQuery({ status }); // Fetch all ads data

    const [newAds, setNewAds] = useState([]);
    const [publishedAds, setPublishedAds] = useState([]);
    const [declinedAds, setDeclinedAds] = useState([]);
    console.log(newAds , publishedAds, declinedAds);

    useEffect(() => {
        const newAds = adsState?.data?.attributes?.filter((ad) => ad.status === "on-hold") || [];
        const publishedAds = adsState?.data?.attributes?.filter((ad) => ad.status === "published") || [];
        const declinedAds = adsState?.data?.attributes?.filter((ad) => ad.status === "declaim") || [];
        setNewAds(newAds);
        setPublishedAds(publishedAds);
        setDeclinedAds(declinedAds);
    }, [adsState]);

    const [updateDeclime] = useUpdateDeclimeMutation();

    // Handlers for View Feedback Modal
    const showFeedbackModal = (ad) => {
        setSelectedAd(ad);
        setIsFeedbackModalVisible(true);
    };
    const handleFeedbackCancel = () => {
        setIsFeedbackModalVisible(false);
    };

    // Handlers for Write Feedback Modal
    const showDeclineModal = (ad) => {
        setSelectedAd(ad);
        setIsDeclineModalVisible(true);
    };
    const handleDeclineCancel = () => {
        setIsDeclineModalVisible(false);
    };

    const handleDeclineSubmit = async (e) => {
        e.preventDefault();
        const status = "declaim";
        const feedback = e.target.feedback.value;

        if (!feedback) {
            return message.error("Please provide feedback");
        }

        try {
            await updateDeclime({ id: selectedAd.id, status, declaimedMessage: feedback }).unwrap();
            refetch();
            message.success("Ad Declined Successfully");
            setIsDeclineModalVisible(false);
        } catch (error) {
            message.error("Failed to Decline Ad");
        }
    };

    return (
        <div className="mt-14 bg-gray-100 overflow-hidden">
            <Tabs
                defaultActiveKey="on-hold"
                tabBarStyle={{ fontWeight: "600", fontSize: "30px" }}
                className="px-4"
                onChange={handleTabChange}
            >
                <TabPane tab="New Ads" key="on-hold">
                    {newAds.length > 0 ? (
                        newAds.map((ad) => (
                            <div key={ad.id} className="p-4 mb-4 bg-white rounded-lg shadow">
                                <div className="flex gap-10 flex-wrap ">
                                    <div className="w-[320px] p-2">
                                        <img
                                            src={url + ad.image}
                                            alt="Ad"
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div className="w-auto p-6 ">
                                        <div>
                                            <h1 className="text-[35px] font-bold text-gray-800 mb-2">{ad.title}</h1>
                                            <p className="text-gray-600 mb-4">{ad.subTitle}</p>
                                            <p className="text-gray-600 mb-4">{ad.description}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <ul className="list-disc font-semibold ml-5">
                                                {ad.keys.map((key, index) => (
                                                    <li key={index} className="text-gray-600 mb-4">
                                                        {key}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div>
                                                <h3 className="font-semibold">Price:</h3>
                                                <p className="text-blue-500 text-lg ">
                                                    <span className="font-bold text-primaryBg">${ad.amount}</span> per unit
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={() => showDeclineModal(ad)}
                                        className="px-4 py-2 bg-[#e61704] text-whiteText rounded-lg"
                                    >
                                        Decline
                                    </button>
                                    <Link
                                        to={`/dashboard/bannerads/createads/${ad.id}`}
                                        className="px-4 py-2 bg-primaryBg text-whiteText rounded-lg"
                                    >
                                        Publish
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-[30px] text-[#ce0c0c]">No New Ads Found !!!</p>
                    )}
                </TabPane>

                <TabPane tab="Published Ads" key="published">
                    {publishedAds.length > 0 ? (
                        publishedAds.map((ad) => (
                            <div key={ad.id} className="p-4 mb-4 bg-white rounded-lg shadow">
                                <div className="flex gap-10 flex-wrap ">
                                    <div className="w-[320px] p-2">
                                        <img
                                            src={url + ad.image}
                                            alt="Ad"
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div className="w-auto p-6 ">
                                        <div>
                                            <h1 className="text-[35px] font-bold text-gray-800 mb-2">{ad.title}</h1>
                                            <p className="text-gray-600 mb-4">{ad.subTitle}</p>
                                            <p className="text-gray-600 mb-4">{ad.description}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <ul className="list-disc font-semibold ml-5">
                                                {ad.keys.map((key, index) => (
                                                    <li key={index} className="text-gray-600 mb-4">
                                                        {key}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div>
                                                <h3 className="font-semibold">Price:</h3>
                                                <p className="text-blue-500 text-lg ">
                                                    <span className="font-bold text-primaryBg">${ad.amount}</span> per unit
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-[30px] text-[#ce0c0c]">No Published Ads Found !!!</p>
                    )}
                </TabPane>

                <TabPane tab="Declined Ads" key="declaim">
                    {declinedAds.length > 0 ? (
                        declinedAds.map((ad) => (
                            <div key={ad.id} className="p-4 mb-4 bg-white rounded-lg shadow">
                                <div className="flex gap-10 flex-wrap ">
                                    <div className="w-[320px] p-2">
                                        <img
                                            src={url + ad.image}
                                            alt="Ad"
                                            className="object-cover w-full h-full rounded-lg"
                                        />
                                    </div>
                                    <div className="w-auto p-6 ">
                                        <div>
                                            <h1 className="text-[35px] font-bold text-gray-800 mb-2">{ad.title}</h1>
                                            <p className="text-gray-600 mb-4">{ad.subTitle}</p>
                                            <p className="text-gray-600 mb-4">{ad.description}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <ul className="list-disc font-semibold ml-5">
                                                {ad.keys.map((key, index) => (
                                                    <li key={index} className="text-gray-600 mb-4">
                                                        {key}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div>
                                                <h3 className="font-semibold">Price:</h3>
                                                <p className="text-blue-500 text-lg ">
                                                    <span className="font-bold text-primaryBg">${ad.amount}</span> per unit
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => showFeedbackModal(ad)}
                                        className="px-4 py-2 bg-primaryBg text-whiteText rounded-lg"
                                    >
                                        View Feedback
                                    </button>
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
                        {selectedAd?.declaimedMessage || <span className="text-red-500">No Feedback</span>}
                    </p>
                </div>
            </Modal>

            {/* Write Feedback Modal */}
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
