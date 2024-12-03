import { FaStar } from "react-icons/fa6";
import brandLogoImage from "../../../public/image/handsome-man.png";
import { Link, useParams } from "react-router-dom";

export default function ProviderSubCategory() {
  const { id } = useParams();
  console.log(id);

  return (
    <div>
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
        <h2 className="mb-5 text-[20px] font-semibold text-[#1397d5]">
          Sub-Category Name{" "}
        </h2>
        <div className="flex flex-wrap gap-5 my-10">
          {[...Array(5)].map((_, idx) => {
            return (
              <div key={idx} className="min-w-[200px]">
                <img className="w-full" src={brandLogoImage} alt="Category" />
                <h3 className="text-2xl font-semibold my-2">Product Name</h3>
                <div className="flex items-center justify-between ">
                  <h2 className="text-[18px] font-semibold">500$</h2>
                  <span className="flex items-center gap-2">
                    <FaStar className="text-[#ffd33c]" />
                    5.0
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
