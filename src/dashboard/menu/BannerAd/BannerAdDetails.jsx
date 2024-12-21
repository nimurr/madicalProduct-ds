import { Link } from "react-router-dom";


const BannerAdDetails = () => {
    return (
        <div className="mt-14 bg-gray-100  overflow-hidden">
            {/* Flex Container */}
            <div className="flex flex-col md:flex-row bg-[#e8ebf0]">
                {/* Image Section */}
                <div className="md:w-1/4 p-2">
                    <img
                        src="../image/handsome-ads.png" // Replace this with your image path
                        alt="Medicine Ad"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Content Section */}
                <div className="md:w-2/3 p-6 bg-gray-50">
                    {/* Title and Subtitle */}
                    <h1 className="text-[35px] font-bold text-gray-800 mb-2">
                        Your Health, Our Priority
                    </h1>
                    <h2 className="text-[25px] text-[#1e66ca] text-xl font-semibold mb-4">
                        Medicine Name
                    </h2>

                    {/* Description */}
                    <p className=" text-gray-600 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
                        turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
                        nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
                        tellus elit sed risus.
                    </p>

                    {/* Key Benefits and Price */}
                    <div className="flex justify-between mb-4">
                        {/* Key Benefits */}
                        <div>
                            <h3 className="text-gray-800 font-semibold mb-2">Key Benefits:</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                <li className="mt-1">Jorem ipsum dolor sit amet</li>
                                <li className="mt-1">Jorem ipsum dolor sit amet</li>
                            </ul>
                        </div>

                        {/* Price */}
                        <div>
                            <h3 className="text-gray-800 font-semibold mb-2">Price:</h3>
                            <p className="text-blue-500 text-lg font-semibold"><span className="text-[#1e66ca]">$120</span> per unit</p>
                        </div>
                    </div>

                    {/* CTA Button */}
                </div>
            </div>
            <div className="flex justify-end my-5">
                <Link to={'/dashboard/bannerads/createads'} className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-10 w-48 text-center bg-primaryBg text-whiteText font-semibold rounded-lg shadow-md">
                    Create Ad
                </Link>
            </div>
        </div>
    );
};

export default BannerAdDetails;
