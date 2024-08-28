import {  useState } from "react";

import {
  HiMinus,
  // HiMinus,
  HiOutlineMenuAlt2,
  HiOutlinePlus,
  // HiOutlinePlus,
  // HiOutlineSearch,
  HiOutlineX,
} from "react-icons/hi";
import { HiShoppingCart } from "react-icons/hi2";

import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { TProducts } from "../../helpers";
import { productDecrement, productIncrement, removeFromCart } from "../../redux/cart/cartSlice";
import { useGetProductQuery } from "../../redux/api/baseApi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
// import { TProducts } from "../../helpers";

export default function NavBar() {
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const{data:products} = useGetProductQuery(undefined);
  const navigate = useNavigate();
  const cartProduct = useAppSelector((state: RootState) => state.cart.cart) as TProducts[];
  const dispatch = useAppDispatch()

  const handlePlus = (id: string) => {
    const mainProductQuantity:number = products?.data?.find((item:TProducts) => item._id === id)?.quantity;
    const cartProductQuantity:number | undefined = cartProduct?.find((item:TProducts) => item._id === id)?.quantity;
    if(cartProductQuantity === mainProductQuantity){
      toast.error("You can't add more than stock quantity");
      return;
    }
    dispatch(productIncrement(id))
  }
  

  return (
    <>
    <div className="w-full sticky top-0 bg-green-900 px-4  shadow-2xl z-50">
      <nav className="bg-green-900  w-full  px-4 xl:px-20 shadow-2xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <Link
            to={"/"}	
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
           <img src="https://i.ibb.co/st00Kdg/360-F-277685853-lq-F0kjbsy-T43-QTd-TVK4s-E7hj-SQzh-VP47-1-removebg-preview.jpg" alt="logo" className="w-[30px] h-[30px] lg:w-[60px] lg:h-[60px]" />
            
            
          </Link>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <ul className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
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
                  to={"/categories"}
                  className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
                >
                  Categories
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
                  to={"/about"}
                  className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
                >
                  About
                </Link>
              </li>
              
            </ul>

           
            <div
              className="relative"
              onClick={() => {
                setIsCartOpen(!isCartOpen)
                
              }}
            >
              <HiShoppingCart className="w-4 h-4 lg:w-6 lg:h-6 text-white cursor-pointer" />
              <small className="text-white bg-yellow-700 absolute -top-[5px] -right-[4px] rounded-full text-[10px] px-1">
                {cartProduct?.length}+
              </small>
            </div>
            

            <div
              className="block lg:hidden"
              onClick={() => setIsNavbarOpen(!isNavbarOpen)}
            >
              <HiOutlineMenuAlt2 className="w-6 h-6 text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>
    </div>

   

    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="w-[80%] lg:w-[45%] max-h-64 bg-green-800 bg-opacity-75 px-3 py-5 rounded  fixed right-[2%] top-[13%] z-40 overflow-y-auto"
        >
          { cartProduct?.length > 0 ? (
            cartProduct?.map((item: TProducts, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 border-b border-yellow-200 py-2"
              >
                <div className="w-[15%] h-[50px]">
                  <img className="w-full h-full"
                    width={50}
                    height={50}  src={item?.image} />
                 
                </div>
                <div className="w-[85%] flex items-center justify-between">
                  <div className="w-[60%]">
                    <h1 className="text-white text-[14px] lg:text-[16px] font-serif">
                      {item?.title}
                    </h1>
                    <div className="flex items-center gap-3">
                      <p className="text-[12px] lg:text-[14px] font-serif text-white">
                        ৳ {item?.price}
                      </p>
                      <p className="text-[12px] lg:text-[14px] font-serif text-white">
                        x {item?.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="w-[40%] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        onClick={()=> handlePlus(item._id)}
                      >
                        <HiOutlinePlus className="w-4 h-4 text-white cursor-pointer" />
                      </span>{" "}
                      <input
                        type="text"
                        value={item?.quantity}
                        className="w-7 px-1"
                      />
                      <span>
                        <HiMinus
                          onClick={()=> dispatch(productDecrement(item._id))}
                          className="w-4 h-4 text-white cursor-pointer"
                        />
                      </span>
                    </div>
                    <div
                     onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                      }).then((result) => {
                        if (result.isConfirmed) {
                           dispatch(removeFromCart(item._id))
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                        }
                      });
                     }}
                     
                    >
                      <HiOutlineX className="w-5 h-5 text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center">Cart is Empty</p>
          )}

          <div className="flex items-center justify-center">
            <motion.button
              onClick={()=>{
                navigate('/checkout')
                setIsCartOpen(false)
              }}
              className="bg-green-700 border border-yellow-200 text-white px-3 py-1 rounded mt-3 cursor-pointer"
              whileHover={{
                borderColor: "#FFFF00", // Change border color on hover
                transition: { duration: 0.3 }, // Duration of the transition
              }}
              animate={{
                borderColor: ["#690213", "#FFFF00", "#690213"], // Loop through these colors
              }}
              transition={{
                duration: 2, // Duration of one loop
                repeat: Infinity, // Repeat the animation indefinitely
                ease: "linear", //}}
              }}
            >
              Checkout
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    {isNavbarOpen && (
      <motion.div
        className="w-[50%] bg-green-700 h-screen block lg:hidden fixed z-30 top-[15%] right-0 rounded"
        initial={{ x: "100%" }} // Start off-screen to the right
        animate={{ x: "0%" }} // Animate to its normal position
        exit={{ x: "0%" }} // Exit with a slide left and fade out
        transition={{
          duration: 0.5, // Duration for the entry animation
          ease: "easeInOut",
          exit: { duration: 0.75, ease: "easeInOut" }, // Duration for the exit animation
        }} // Animation duration
      >
        <div className="px-4 py-7 relative">
          <ul className="flex flex-col space-y-4">
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
                to={"/product"}
                className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
              >
                Product
              </Link>
            </li>
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
              to={"/about"}
                className="text-white hover:text-[#F2BF4A] text-[16px] font-[500] hover:text-[17px] transition-all"
              >
                Home
              </Link>
            </li>
          </ul>
          <HiOutlineX
            onClick={() => setIsNavbarOpen(false)}
            className="w-6 h-6 text-white cursor-pointer absolute top-2 right-2"
          />
        </div>
      </motion.div>
    )}
  </>
  );
}
