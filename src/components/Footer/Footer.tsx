import {
  AiFillFacebook,
  AiFillYoutube,
  AiOutlineTwitter,
  AiOutlineInstagram,  
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  
  return (
    <footer className="w-full mt-20 lg:flex ">
      <div className="bg-green-900 opacity-95 w-full lg:w-[30%] ">
        <div className="lg:py-10 px-4 lg:px-20">
          <div className="flex items-center justify-center pb-5">
            <Link
              to={"/"}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://i.ibb.co/st00Kdg/360-F-277685853-lq-F0kjbsy-T43-QTd-TVK4s-E7hj-SQzh-VP47-1-removebg-preview.jpg"
                alt="logo"
                className="w-[30px] h-[30px] lg:w-[60px] lg:h-[60px]"
              />
            </Link>
          </div>
          <div className="flex items-center gap-5 justify-center">
            <AiFillFacebook className="w-7 h-7 text-white cursor-pointer hover:text-[#F2BF4A] hover:w-8 hover:h-8 transition-all" />
            <AiFillYoutube className="w-7 h-7 text-white cursor-pointer hover:text-[#F2BF4A] hover:w-8 hover:h-8 transition-all" />
            <AiOutlineTwitter className="w-7 h-7 text-white cursor-pointer hover:text-[#F2BF4A] hover:w-8 hover:h-8 transition-all" />
            <AiOutlineInstagram className="w-7 h-7 text-white cursor-pointer hover:text-[#F2BF4A] hover:w-8 hover:h-8 transition-all" />
          </div>
          <div className="mt-5">
            <p className="text-justify font-normal text-white text-[15px]">
            Trees have been a popular subject in literature due to their significant role in human life and culture, providing food.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[70%] bg-green-900 bg-opacity-95 px-4 py-4">
        <div className="lg:py-10 w-full lg:flex">
          <div className="w-full lg:w-[40%] flex items-center justify-center">
            <div>
              <h1 className="text-xl text-[#e5ae53] font-medium mt-2 text-center lg:text-start">
                Explore
              </h1>
              <ul className="space-y-2 lg:mt-5 flex lg:flex-col sm:flex-wrap gap-3 sm:items-center sm:justify-center lg:items-start lg:justify-start">
                <li>
                  <Link
                    to={"/"}
                    className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/products"}
                    className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/category/managements"}
                    className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
                  >
                    Categories Managements
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/product/managements"}
                    className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
                  >
                    Product Managements
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-[60%] lg:pe-20">
            <div>
              <iframe
                className="w-full h-[200px] text-white bg-custom-red"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58427.65245915051!2d90.32013773918156!3d23.757067160966756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bfeaac77cf97%3A0x56e8b5892d7e73df!2sMohammadpur%20Bus%20Stand!5e0!3m2!1sen!2sbd!4v1721975815501!5m2!1sen!2sbd"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
