import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import brandLogoImage from '../../../public/image/handsome-man.png'
import { Link, useParams } from "react-router-dom";
 
export default function AllProviderCategory() {

    const {id} = useParams();
    console.log(id)


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
      <div className="flex flex-wrap gap-5 my-10">
        {[...Array(5)].map((_, idx) => {
          return (
            <Link to={'/dashboard/provider/category/sdf136sd2f36sdf'} key={idx} className="min-w-[200px]">
              <img
                className="w-full"
                src={brandLogoImage}
                alt="Category"
              />
              <h3 className="text-2xl font-semibold">Category Name</h3>
              <span className="flex items-center gap-2">
                <FaStar className="text-[#ffd33c]" />
                5.0
              </span>
            </Link>
          );
        })}
      </div>
      <div>
        <h2 className="text-[20px] font-bold text-[#1397d5] mb-5 ">Rating</h2>
        <div>
          <Link  className="flex gap-3 items-center">
            <img className="w-12" src={brandLogoImage} alt="" />
            <div className="flex justify-between w-full">
              <div>
                <h3>Yelena Belova</h3>
                <div className="flex gap-1">
                  <FaStar className="text-[#1397d5]" />
                  <FaStar className="text-[#1397d5]" />
                  <FaStar className="text-[#1397d5]" />
                  <FaStar className="text-[#1397d5]" />
                  <CiStar className="text-[#1397d5]" />
                </div>
              </div>
              <h3 className="text-sm text-gray-400">3 min ago</h3>
            </div>
          </Link>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita
            consectetur ipsum possimus quibusdam qui nostrum perspiciatis
            dolores fuga libero accusantium eveniet, nobis odit quidem porro.
          </p> 
        </div>
      </div>
    </div>
  )
}
