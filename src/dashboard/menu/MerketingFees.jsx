import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Modal, message } from "antd";
import marketingImage from "/image/marketingFeesImage.png";
import referralImage from "/image/persentage.png";
import { useGetMarketingFeesQuery } from "../../redux/features/auth/heashboard/marketingFeesGet";
import { useUpdateFeesMutation } from "../../redux/features/auth/heashboard/marketingFeesUpdate";

const MarketingFees = () => {

  //============== Modals ==============
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productPrice, setProductPrice] = useState("");

  const [isMessagingModalOpen, setIsMessagingModalOpen] = useState(false);
  const [messagingPrice, setMessagingPrice] = useState("");

  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState("");

  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [referralPercentage, setReferralPercentage] = useState("");
  console.log(referralPercentage);


  const { data: marketingFeesData } = useGetMarketingFeesQuery();
  const [updateFees, { isLoading }] = useUpdateFeesMutation();

  //============== Default values for fees ==============
  const productMarketingFees =
    marketingFeesData?.data?.attributes[0]?.productMarketingFees || 0;

  const messagingFees = marketingFeesData?.data?.attributes[0]?.messagingFees || 0;
  const bidFees = marketingFeesData?.data?.attributes[0]?.bidFees || 0;
  const referralFee = marketingFeesData?.data?.attributes[0]?.referralPercentage || 0;

  console.log(referralFee);

  //=========== Modal Handlers ===========
  const showProductModal = () => setIsProductModalOpen(true);
  const handleProductCancel = () => setIsProductModalOpen(false);

  const showMessagingModal = () => setIsMessagingModalOpen(true);
  const handleMessagingCancel = () => setIsMessagingModalOpen(false);

  const showBidModal = () => setIsBidModalOpen(true);
  const handleBidCancel = () => setIsBidModalOpen(false);

  const showReferralModal = () => setIsReferralModalOpen(true);
  const handleReferralCancel = () => setIsReferralModalOpen(false);

  //===================== Form Handlers ===============
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const data = { messagingFees, bidFees, productMarketingFees: productPrice, referralPercentage };

    try {
      await updateFees({ data, id: "marketing" }).unwrap();
      message.success("Product Marketing Fee updated successfully.");
      setIsProductModalOpen(false);
    } catch (error) {
      message.error("Failed to update Product Marketing Fee.");
    }
  };

  const handleMessagingSubmit = async (e) => {
    e.preventDefault();
    const data = { messagingFees: messagingPrice, bidFees, productMarketingFees, referralPercentage };

    try {
      await updateFees({ data, id: "messaging" }).unwrap();
      message.success("Messaging Fee updated successfully.");
      setIsMessagingModalOpen(false);
    } catch (error) {
      message.error("Failed to update Messaging Fee.");
    }
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const data = { messagingFees, bidFees: bidPrice, productMarketingFees, referralPercentage };

    try {
      await updateFees({ data, id: "bid" }).unwrap();
      message.success("Bid Fee updated successfully.");
      setIsBidModalOpen(false);
    } catch (error) {
      message.error("Failed to update Bid Fee.");
    }
  };

  const handleReferralSubmit = async (e) => {
    e.preventDefault();
    const data = { messagingFees, bidFees, productMarketingFees, referralPercentage };

    try {
      await updateFees({ data, id: "percentage" }).unwrap();
      message.success("Referral Percentage updated successfully.");
      setIsReferralModalOpen(false);
    } catch (error) {
      message.error("Failed to update Referral Percentage.");
    }
  };


  return (
    <div className="mt-10">
      <h1 className="font-semibold text-header">Marketing</h1>

      {/* Product Marketing Fees */}
      <div
        onClick={showProductModal}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Product Marketing Fees</p>
        <IoIosArrowForward className="mr-8 text-[#193664]" />
      </div>
      <Modal
        title="Product Marketing Fees"
        open={isProductModalOpen}
        onCancel={handleProductCancel}
        footer={null}
      >
        <div className="w-3/4 mx-auto flex items-center justify-center gap-8 my-5">
          <img src={marketingImage} alt="Product Marketing" />
          <div>
            <h3 className="text-[20px]">Current Marketing Fee</h3>
            <h2 className="font-semibold text-[25px]">${productMarketingFees} K</h2>
          </div>
        </div>
        <form onSubmit={handleProductSubmit}>
          <input
            type="number"
            placeholder="Price..."
            className="w-full p-2 border rounded"
            // value={productPrice}
            defaultValue={productMarketingFees}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
          <button className="bg-primaryBg text-whiteText py-2 px-5 mt-5 rounded w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </Modal>

      {/* Messaging Fees */}
      <div
        onClick={showMessagingModal}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Messaging Fees</p>
        <IoIosArrowForward className="mr-8 text-[#193664]" />
      </div>
      <Modal
        title="Messaging Fees"
        open={isMessagingModalOpen}
        onCancel={handleMessagingCancel}
        footer={null}
      >
        <div className="w-3/4 mx-auto flex items-center justify-center gap-8 my-5">
          <img src={marketingImage} alt="Messaging Fees" />
          <div>
            <h3 className="text-[20px]">Current Messaging Fee</h3>
            <h2 className="font-semibold text-[25px]">${messagingFees} K</h2>
          </div>
        </div>
        <form onSubmit={handleMessagingSubmit}>
          <input
            type="number"
            placeholder="Price..."
            className="w-full p-2 border rounded"
            defaultValue={messagingFees}
            onChange={(e) => setMessagingPrice(e.target.value)}
            required
          />
          <button className="bg-primaryBg text-whiteText py-2 px-5 mt-5 rounded w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </Modal>

      {/* Bid Fees */}
      <div
        onClick={showBidModal}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Bid Fees</p>
        <IoIosArrowForward className="mr-8 text-[#193664]" />
      </div>
      <Modal
        title="Bid Fees"
        open={isBidModalOpen}
        onCancel={handleBidCancel}
        footer={null}
      >
        <div className="w-3/4 mx-auto flex items-center justify-center gap-8 my-5">
          <img src={marketingImage} alt="Bid Fees" />
          <div>
            <h3 className="text-[20px]">Current Bid Fee</h3>
            <h2 className="font-semibold text-[25px]">${bidFees} K</h2>
          </div>
        </div>
        <form onSubmit={handleBidSubmit}>
          <input
            type="number"
            placeholder="Price..."
            className="w-full p-2 border rounded"
            defaultValue={bidFees}
            onChange={(e) => setBidPrice(e.target.value)}
            required
          />
          <button className="bg-primaryBg text-whiteText py-2 px-5 mt-5 rounded w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </Modal>

      {/* Referral Percentage */}
      <div
        onClick={showReferralModal}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Referral Percentage</p>
        <IoIosArrowForward className="mr-8 text-[#193664]" />
      </div>
      <Modal
        title="Referral Percentage"
        open={isReferralModalOpen}
        onCancel={handleReferralCancel}
        footer={null}
      >
        <div className="w-3/4 mx-auto flex items-center justify-center gap-8 my-5">
          <img className="w-14" src={referralImage} alt="Referral Percentage" />
          <div>
            <h3 className="text-[20px]">Current Referral Percentage</h3>
            <h2 className="font-semibold text-[25px]">{referralFee}%</h2>
          </div>
        </div>
        <form onSubmit={handleReferralSubmit}>
          <input
            type="number"
            placeholder="Percentage..."
            className="w-full p-2 border rounded"
            defaultValue={referralFee}
            onChange={(e) => setReferralPercentage(e.target.value)}
            required
          />
          <button className="bg-primaryBg text-whiteText py-2 px-5 mt-5 rounded w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MarketingFees;
