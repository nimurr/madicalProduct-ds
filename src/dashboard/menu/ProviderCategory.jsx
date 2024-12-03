import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import brandLogoImage from "../../../public/image/handsome-man.png";
import { Link } from "react-router-dom";

export default function ProviderCategory() {
  return (
    <div className=" bg-[#e8ebf0] rounded-md pb-20 mt-10">
         
      <div className="p-5 flex items-center gap-5">
        <img className="w-36 h-36 rounded-full" src={brandLogoImage} alt="" />
        <div>
          <h2 className="mb-2 flex items-center gap-2 font-semibold">
            <span className="text-[20px] font-bold text-[#1397d5]">
              Caregiver Name
            </span>{" "}
            <FaStar className="text-orange-400" />
            5.0
          </h2>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus.{" "}
          </p>
        </div>
      </div>
      <hr className="border-none bg-[#d8d8d8] h-[2px] w-full block my-5" />
      <h2 className="mb-5 text-[20px] font-semibold text-[#1397d5]">Category Name </h2>
      <div className="flex flex-wrap gap-5 my-10">
        {[...Array(5)].map((_, idx) => {
          return (
            <Link to={'/dashboard/provider/sub-category/sdcategory'} key={idx} className="min-w-[200px]">
              <img className="w-full" src={brandLogoImage} alt="Category" />
              <h3 className="text-2xl font-semibold">Sub Category Name</h3>
              <span className="flex items-center gap-2">
                <FaStar className="text-[#ffd33c]" />
                5.0
              </span>
            </Link>
          );
        })}
      </div> 
    </div>
  );
}
