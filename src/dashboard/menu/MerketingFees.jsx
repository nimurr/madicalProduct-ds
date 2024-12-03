import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Modal, Button } from "antd";
import marketingImage from "../../../public/image/marketingFeesImage.png";

const MarketingFees = () => {
  // ================== Start price modal for Product Marketing Fees ===================
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productPrice, setProductPrice] = useState(""); // Handle price state for product marketing fees

  const showProductModal = () => {
    setIsProductModalOpen(true);
  };

  const handleProductCancel = () => {
    setIsProductModalOpen(false);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value); // Update price state when input changes
  };

  const handleProductSubmit = () => {
    // Handle the submit action, such as sending the price data to an API or updating the state
    console.log("Submitted Product Marketing Fee Price:", productPrice);
    setIsProductModalOpen(false); // Close modal after submitting
  };

  // ================== End price modal for Product Marketing Fees ===================

  // ================== Start price modal for Messaging Fees ===================
  const [isMessagingModalOpen, setIsMessagingModalOpen] = useState(false);
  const [messagingPrice, setMessagingPrice] = useState(""); // Handle price state for messaging fees

  const showMessagingModal = () => {
    setIsMessagingModalOpen(true);
  };

  const handleMessagingCancel = () => {
    setIsMessagingModalOpen(false);
  };

  const handleMessagingPriceChange = (e) => {
    setMessagingPrice(e.target.value); // Update price state when input changes
  };

  const handleMessagingSubmit = () => {
    // Handle the submit action, such as sending the price data to an API or updating the state
    console.log("Submitted Messaging Fee Price:", messagingPrice);
    setIsMessagingModalOpen(false); // Close modal after submitting
  };

  // ================== End price modal for Messaging Fees ===================

  // ================== Start price modal for Bid Fees ===================
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState(""); // Handle price state for bid fees

  const showBidModal = () => {
    setIsBidModalOpen(true);
  };

  const handleBidCancel = () => {
    setIsBidModalOpen(false);
  };

  const handleBidPriceChange = (e) => {
    setBidPrice(e.target.value); // Update price state when input changes
  };

  const handleBidSubmit = () => {
    // Handle the submit action, such as sending the price data to an API or updating the state
    console.log("Submitted Bid Fee Price:", bidPrice);
    setIsBidModalOpen(false); // Close modal after submitting
  };

  // ================== End price modal for Bid Fees ===================

  return (
    <div className="mt-8 mx-6">
      <h1 className="font-semibold text-header">Marketing</h1>
      <div>
        {/* Product Marketing Fees Modal Trigger */}
        <div
          onClick={showProductModal}
          className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium">Product Marketing Fees</p>
          <div className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </div>
        </div>

        {/* Product Marketing Fees Modal */}
        <Modal
          title="Product Marketing Fees"
          open={isProductModalOpen}
          onCancel={handleProductCancel}
          footer={null} // Remove default footer with Ok and Cancel
        >
          <hr className="my-5" />
          <div className="w-3/4 mx-auto my-5 flex items-center justify-center gap-8">
            <img src={marketingImage} alt="" />
            <div>
              <h3 className="text-[20px]">Current marketing fees</h3>
              <h2 className="font-semibold text-[25px]">$24.88 K</h2>
            </div>
          </div>
          <form action="">
            <label htmlFor="">
              <span className="block mb-1">Price</span>
              <input
                className="w-full p-2 rounded-xl border-[2px] border-[#eee]"
                type="number"
                placeholder="Price ..."
                value={productPrice}
                onChange={handleProductPriceChange}
              />
            </label>
          </form>
          <div className="mt-4 flex justify-center">
            <Button
              type="primary"
              onClick={handleProductSubmit}
              className="bg-[#2168d3] text-white rounded-xl py-2 px-8"
            >
              Update
            </Button>
          </div>
        </Modal>

        {/* Messaging Fees Modal Trigger */}
        <div
          onClick={showMessagingModal}
          className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium">Messaging Fees</p>
          <div className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </div>
        </div>

        {/* Messaging Fees Modal */}
        <Modal
          title="Messaging Fees"
          open={isMessagingModalOpen}
          onCancel={handleMessagingCancel}
          footer={null} // Remove default footer with Ok and Cancel
        >
          <hr className="my-5" />
          <div className="w-3/4 mx-auto my-5 flex items-center justify-center gap-8">
            <img src={marketingImage} alt="" />
            <div>
              <h3 className="text-[20px]">Current messaging fees</h3>
              <h2 className="font-semibold text-[25px]">$12.50 K</h2>
            </div>
          </div>
          <form action="">
            <label htmlFor="">
              <span className="block mb-1">Price</span>
              <input
                className="w-full p-2 rounded-xl border-[2px] border-[#eee]"
                type="number"
                placeholder="Price ..."
                value={messagingPrice}
                onChange={handleMessagingPriceChange}
              />
            </label>
          </form>
          <div className="mt-4 flex justify-center">
            <Button
              type="primary"
              onClick={handleMessagingSubmit}
              className="bg-[#2168d3] text-white rounded-xl py-2 px-8"
            >
              Update
            </Button>
          </div>
        </Modal>

        {/* Bid Fees Modal Trigger */}
        <div
          onClick={showBidModal}
          className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium">Bid Fees</p>
          <div className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </div>
        </div>

        {/* Bid Fees Modal */}
        <Modal
          title="Bid Fees"
          open={isBidModalOpen}
          onCancel={handleBidCancel}
          footer={null} // Remove default footer with Ok and Cancel
        >
          <hr className="my-5" />
          <div className="w-3/4 mx-auto my-5 flex items-center justify-center gap-8">
            <img src={marketingImage} alt="" />
            <div>
              <h3 className="text-[20px]">Current bid fees</h3>
              <h2 className="font-semibold text-[25px]">$10.00 K</h2>
            </div>
          </div>
          <form action="">
            <label htmlFor="">
              <span className="block mb-1">Price</span>
              <input
                className="w-full p-2 rounded-xl border-[2px] border-[#eee]"
                type="number"
                placeholder="Price ..."
                value={bidPrice}
                onChange={handleBidPriceChange}
              />
            </label>
          </form>
          <div className="mt-4 flex justify-center">
            <Button
              type="primary"
              onClick={handleBidSubmit}
              className="bg-[#2168d3] text-white rounded-xl py-2 px-8"
            >
              Update
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default MarketingFees;
