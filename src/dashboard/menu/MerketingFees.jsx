import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Modal, message } from "antd";
import marketingImage from "../../../public/image/marketingFeesImage.png"; // replace with your image path
import { useGetMarketingFeesQuery } from "../../redux/features/auth/heashboard/marketingFeesGet";
import { useUpdateFeesMutation } from "../../redux/features/auth/heashboard/marketingFeesUpdate";
import swal from "sweetalert";

const MarketingFees = () => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productPrice, setProductPrice] = useState("");
  const [productPriceError, setProductPriceError] = useState(false);

  const [isMessagingModalOpen, setIsMessagingModalOpen] = useState(false);
  const [messagingPrice, setMessagingPrice] = useState("");
  const [messagingPriceError, setMessagingPriceError] = useState(false);

  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const [bidPriceError, setBidPriceError] = useState(false);

  const { data: marketingFeesData } = useGetMarketingFeesQuery();
  const [updateMassengingFees, { isLoading }] = useUpdateFeesMutation();

  // Default values for fees (fallback to provided ones if data is not available)
  const productMarketingFees =
    marketingFeesData?.data?.attributes[0].productMarketingFees;
  const messagingFees = marketingFeesData?.data?.attributes[0].messagingFees;
  const bidFees = marketingFeesData?.data?.attributes[0].bidFees;

  // Handle modals for Product Fees
  const showProductModal = () => setIsProductModalOpen(true);
  const handleProductCancel = () => setIsProductModalOpen(false);

  // Handle modals for Messaging Fees
  const showMessagingModal = () => setIsMessagingModalOpen(true);
  const handleMessagingCancel = () => setIsMessagingModalOpen(false);

  // Handle modals for Bid Fees
  const showBidModal = () => setIsBidModalOpen(true);
  const handleBidCancel = () => setIsBidModalOpen(false);

  const handleProductPriceChange = (e) => setProductPrice(e.target.value);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const data = {
      messagingFees,
      bidFees,
      productMarketingFees: e.target.productPrice.value
    };

    try {
      await updateMassengingFees({ data, id: "marketing" }).unwrap();
      message.success("Product Marketing Fee updated successfully.");
      setIsProductModalOpen(false);
    } catch (error) {
      message.error("Failed to update Product Marketing Fee.", error.message);
    }
  };

  const handleMessagingSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target.messagingPrice.value);
    const data = {
      messagingFees: e.target.messagingPrice.value,
      bidFees,
      productMarketingFees
    };

    try {
      await updateMassengingFees({ data, id: "messaging" }).unwrap();
      message.success("Product Marketing Fee updated successfully.");
      setIsProductModalOpen(false);
    } catch (error) {
      message.error("Failed to update Product Marketing Fee.", error.message);
    }
  };

  const handleBidFees = async (e) => {
    e.preventDefault();
    console.log(e.target.bidPriceFees.value)
    const data = {
      messagingFees,
      bidFees: e.target.bidPriceFees.value,
      productMarketingFees
    };

    try {
      await updateMassengingFees({ data, id: "bid" }).unwrap();
      message.success("Product Marketing Fee updated successfully.");
      setIsProductModalOpen(false);
    } catch (error) {
      message.error("Failed to update Product Marketing Fee.", error.message);
    }

  };

  return (
    <div className="mt-8 md:mx-6">
      <h1 className="font-semibold text-header">Marketing</h1>

      {/* Product Marketing Fees */}
      <div
        onClick={showProductModal}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Product Marketing Fees</p>
        <div className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
          <IoIosArrowForward />
        </div>
      </div>
      <Modal
        title="Product Marketing Fees"
        open={isProductModalOpen}
        onCancel={handleProductCancel}
        footer={null}
      >
        <hr className="my-5" />
        <div className="w-3/4 mx-auto my-5 flex items-center justify-center gap-8">
          <img src={marketingImage} alt="Product Marketing" />
          <div>
            <h3 className="text-[20px]">Current marketing fees</h3>
            <h2 className="font-semibold text-[25px]">
              ${productMarketingFees} K
            </h2>
          </div>
        </div>
        <form onSubmit={handleProductSubmit}>
          <label>
            <span className="block mb-1">Price</span>
            <input
              required
              className="w-full p-2 rounded-xl border-[2px] border-[#eee]"
              type="number"
              placeholder="Price ..."
              name="productPrice"
              value={productPrice}
              onChange={handleProductPriceChange}
            />
            {productPriceError && (
              <span className="text-red-500">Please enter a valid price</span>
            )}
          </label>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#2168d3] text-[#fff] font-semibold rounded-xl py-3 w-full mt-20"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Messaging Fees */}
      <div
        onClick={showMessagingModal}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Messaging Fees</p>
        <div className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
          <IoIosArrowForward />
        </div>
      </div>
      <Modal
        title="Messaging Fees"
        open={isMessagingModalOpen}
        onCancel={handleMessagingCancel}
        footer={null}
      >
        <hr className="my-5" />
        <div className="w-3/4 mx-auto my-5 flex items-center justify-center gap-8">
          <img src={marketingImage} alt="Messaging Fees" />
          <div>
            <h3 className="text-[20px]">Current messaging fees</h3>
            <h2 className="font-semibold text-[25px]">${messagingFees} K</h2>
          </div>
        </div>
        <form onSubmit={handleMessagingSubmit}>
          <label>
            <span className="block mb-1">Price</span>
            <input
              required
              className="w-full p-2 rounded-xl border-[2px] border-[#eee]"
              type="number"
              placeholder="Price ..."
              value={messagingPrice}
              name="messagingPrice"
              onChange={(e) => setMessagingPrice(e.target.value)}
            />
          </label>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              // eslint-disable-next-line react/jsx-no-duplicate-props
              type={"submit"}
              disabled={isLoading}
              className="bg-[#2168d3] text-[#fff] font-semibold rounded-xl py-3 w-full mt-20"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Bid Fees */}
      <div
        onClick={showBidModal}
        className="mt-8 cursor-pointer flex justify-between bg-[#F7F7F7] rounded items-center w-full h-[75px]"
      >
        <p className="text-[18px] ml-8 font-medium">Bid Fees</p>
        <div className="mr-8 text-[#193664] px-2 py-1 rounded cursor-pointer">
          <IoIosArrowForward />
        </div>
      </div>
      <Modal
        title="Bid Fees"
        open={isBidModalOpen}
        onCancel={handleBidCancel}
        footer={null}
      >
        <hr className="my-5" />
        <div className="w-3/4 mx-auto my-5 flex items-center justify-center gap-8">
          <img src={marketingImage} alt="Bid Fees" />
          <div>
            <h3 className="text-[20px]">Current bid fees</h3>
            <h2 className="font-semibold text-[25px]">${bidFees} K</h2>
          </div>
        </div>
        <form onSubmit={handleBidFees}>
          <label>
            <span className="block mb-1">Price</span>
            <input
              required
              className="w-full p-2 rounded-xl border-[2px] border-[#eee]"
              type="number"
              placeholder="Price ..."
              value={bidPrice}
              name="bidPriceFees"
              onChange={(e) => setBidPrice(e.target.value)}
            />
            {bidPriceError && (
              <span className="text-red-500">Please enter a valid price</span>
            )}
          </label>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#2168d3] text-[#fff] font-semibold rounded-xl py-3 w-full mt-20"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MarketingFees;
