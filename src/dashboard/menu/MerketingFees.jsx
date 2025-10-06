import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Modal, message } from "antd";
import marketingImage from "/image/marketingFeesImage.png";
import referralImage from "/image/persentage.png";
import { useGetMarketingFeesQuery } from "../../redux/features/auth/heashboard/marketingFeesGet";
import { useUpdateFeesMutation } from "../../redux/features/auth/heashboard/marketingFeesUpdate";

const MarketingFees = () => {
  // Modals State Management
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isMessagingModalOpen, setIsMessagingModalOpen] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [isAdsFeeModalOpen, setIsAdsFeeModalOpen] = useState(false);

  // Input States
  const [productPrice, setProductPrice] = useState("");
  const [messagingPrice, setMessagingPrice] = useState("");
  const [bidPrice, setBidPrice] = useState("");
  const [referralPercentage, setReferralPercentage] = useState("");
  const [newAdsFee, setNewAdsFee] = useState("");

  // Fetch Marketing Fees Data
  const { data: marketingFeesData } = useGetMarketingFeesQuery();
  const [updateFees, { isLoading }] = useUpdateFeesMutation();

  // Default Fees from API
  const productMarketingFees =
    marketingFeesData?.data?.attributes[0]?.productMarketingFees || 0;
  const messagingFees = marketingFeesData?.data?.attributes[0]?.messagingFees || 0;
  const bidFees = marketingFeesData?.data?.attributes[0]?.bidFees || 0;
  const referralFee = marketingFeesData?.data?.attributes[0]?.referralPercentage || 0;
  const adsFees = marketingFeesData?.data?.attributes[0]?.adsFees || 10;

  // Modal Handlers
  const showModal = (setModalOpen) => setModalOpen(true);
  const handleCancel = (setModalOpen) => setModalOpen(false);

  // Form Submission Handlers
  const handleSubmit = async (e, data, id, setModalOpen) => {
    e.preventDefault();
    try {
      await updateFees({ data, id }).unwrap();
      message.success(`${id.replace(/^\w/, (c) => c.toUpperCase())} updated successfully.`);
      setModalOpen(false);
    } catch (error) {
      message.error(`Failed to update ${id.replace(/^\w/, (c) => c.toUpperCase())}.`);
    }
  };

  return (
    <div className="mt-10">
      <h1 className="font-semibold text-header">Marketing</h1>

      {/* Product Marketing Fees */}
      <div
        onClick={() => showModal(setIsProductModalOpen)}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Product Marketing Fees</p>
        <IoIosArrowForward className="mr-8 text-[#193664]" />
      </div>
      <Modal
        title="Product Marketing Fees"
        open={isProductModalOpen}
        onCancel={() => handleCancel(setIsProductModalOpen)}
        footer={null}
      >
        <div className="w-3/4 mx-auto flex items-center justify-center gap-8 my-5">
          <img src={marketingImage} alt="Product Marketing" />
          <div>
            <h3 className="text-[20px]">Current Marketing Fee</h3>
            <h2 className="font-semibold text-[25px]">${productMarketingFees} </h2>
          </div>
        </div>
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              { messagingFees, bidFees, productMarketingFees: productPrice, referralPercentage },
              "marketing",
              setIsProductModalOpen
            )
          }
        >
          <input
            type="number"
            placeholder="Price..."
            className="w-full p-2 border rounded"
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
        onClick={() => showModal(setIsMessagingModalOpen)}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Messaging Fees</p>
        <IoIosArrowForward className="mr-8 text-[#193664]" />
      </div>
      <Modal
        title="Messaging Fees"
        open={isMessagingModalOpen}
        onCancel={() => handleCancel(setIsMessagingModalOpen)}
        footer={null}
      >
        <div className="w-3/4 mx-auto flex items-center justify-center gap-8 my-5">
          <img src={marketingImage} alt="Messaging Fees" />
          <div>
            <h3 className="text-[20px]">Current Messaging Fee</h3>
            <h2 className="font-semibold text-[25px]">${messagingFees} </h2>
          </div>
        </div>
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              { messagingFees: messagingPrice, bidFees, productMarketingFees, referralPercentage },
              "messaging",
              setIsMessagingModalOpen
            )
          }
        >
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
        onClick={() => showModal(setIsBidModalOpen)}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Bid Fees</p>
        <IoIosArrowForward className="mr-8 text-[#193664]" />
      </div>
      <Modal
        title="Bid Fees"
        open={isBidModalOpen}
        onCancel={() => handleCancel(setIsBidModalOpen)}
        footer={null}
      >
        <div className="w-3/4 mx-auto flex items-center justify-center gap-8 my-5">
          <img src={marketingImage} alt="Bid Fees" />
          <div>
            <h3 className="text-[20px]">Current Bid Fee</h3>
            <h2 className="font-semibold text-[25px]">${bidFees} </h2>
          </div>
        </div>
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              { messagingFees, bidFees: bidPrice, productMarketingFees, referralPercentage },
              "bid",
              setIsBidModalOpen
            )
          }
        >
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
        onClick={() => showModal(setIsReferralModalOpen)}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Referral Percentage</p>
        <IoIosArrowForward className="mr-8 text-[#193664]" />
      </div>
      <Modal
        title="Referral Percentage"
        open={isReferralModalOpen}
        onCancel={() => handleCancel(setIsReferralModalOpen)}
        footer={null}
      >
        <div className="w-3/4 mx-auto flex items-center justify-center gap-8 my-5">
          <img className="w-14" src={referralImage} alt="Referral Percentage" />
          <div>
            <h3 className="text-[20px]">Current Referral Percentage</h3>
            <h2 className="font-semibold text-[25px]">{referralFee}%</h2>
          </div>
        </div>
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              { messagingFees, bidFees, productMarketingFees, referralPercentage },
              "percentage",
              setIsReferralModalOpen
            )
          }
        >
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

      {/* Ads Fee */}
      <div
        onClick={() => showModal(setIsAdsFeeModalOpen)}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Banner Fees</p>
        <IoIosArrowForward className="mr-8 text-[#193664]" />
      </div>
      <Modal
        title="Ads Fee"
        open={isAdsFeeModalOpen}
        onCancel={() => handleCancel(setIsAdsFeeModalOpen)}
        footer={null}
      >
        <div className="w-3/4 mx-auto flex items-center justify-center gap-8 my-5">
          <div>
            <h3 className="text-[20px]">Current Ads Fee</h3>
            <h2 className="font-semibold text-[25px]">${adsFees}</h2>
          </div>
        </div>
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              { messagingFees, bidFees, productMarketingFees, referralPercentage, adsFees: newAdsFee },
              "ads",
              setIsAdsFeeModalOpen
            )
          }
        >
          <input
            type="number"
            placeholder="Enter new Ads Fee..."
            className="w-full p-2 border rounded"
            defaultValue={adsFees}
            onChange={(e) => setNewAdsFee(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-primaryBg text-whiteText py-2 px-5 mt-5 rounded w-full"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default MarketingFees;
