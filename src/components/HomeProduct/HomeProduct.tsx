import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import {
  useGetCategoryQuery,
  useGetProductQuery,
} from "../../redux/api/baseApi";
import { TCategories, TProducts } from "../../helpers";

import { addToCart } from "../../redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { useState } from "react";

const HomeProduct = () => {
  const [selectedCategories, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  

  const dispatch = useAppDispatch();
  const cartProduct = useAppSelector(
    (state: RootState) => state.cart.cart
  ) as TProducts[];
  

  const { data: category } = useGetCategoryQuery(undefined);
  const productQuery={
    searchTerm,
    minPrice,
    maxPrice,
    categoryId:selectedCategories
  }
  const { data: products } = useGetProductQuery(productQuery);

  const handleAddtoCart = (item: TProducts) => {
    const mainProductQuantity: number = products?.data?.find(
      (mItem: TProducts) => mItem._id === item?._id
    )?.quantity;
    const cartProductQuantity: number | undefined = cartProduct?.find(
      (cItem: TProducts) => cItem._id === item?._id
    )?.quantity;
    console.log({ mainProductQuantity, cartProductQuantity });

    if (
      (cartProductQuantity !== undefined &&
        cartProductQuantity >= mainProductQuantity) ||
      mainProductQuantity === 0
    ) {
      toast.error("You can't add more than stock quantity");
      return;
    }
    dispatch(addToCart(item));
    toast.success("Product added to cart");
  };

  return (
    <>
      <section className="w-full px-4 py-10 lg:px-20 bg-white">
        <div>
          <h1 className=" text-center font-medium text-green-700 text-2xl ">
            Our Products
          </h1>
        </div>
        <div className="flex items-center justify-center flex-wrap gap-5 pt-4 pb-16">
          <div
            onClick={() => setSelectedCategory("")}
            // ${  selectedCategory === null ? categoryColor : "" }
            className={` w-[45%] lg:w-[18%] font-serif text-[14px] lg:text-xl border border-yellow-500 py-1 px-3 text-center rounded-lg cursor-pointer hover:bg-green-900 hover:text-white ${
              selectedCategories === "" ? "bg-green-900 text-white" : ""
            }`}
          >
            All
          </div>

          {category?.data?.length > 0
            ? category?.data?.map((cat: TCategories, index: number) => (
                <div
                  key={index}
                  onClick={() => setSelectedCategory(cat._id)}
                  // ${ selectedCategory === cat.id ? categoryColor : ""}
                  className={` w-[45%] lg:w-[18%] font-serif text-[14px] lg:text-xl border border-yellow-500 py-1 px-3 text-center rounded-lg cursor-pointer hover:bg-green-900 hover:text-white ${
                    selectedCategories === cat._id
                      ? "bg-green-900 text-white"
                      : ""
                  }`}
                >
                  {cat.categoryName}
                </div>
              ))
            : "Loading..."}
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between py-2">
          <div className="py-6">
            <input
              type="text"
              className="border border-yellow-500 w-80 focus:outline-none rounded-xl px-4 py-2"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <label htmlFor="lowPrice">Low Price</label>
              <input
                type="number"
                id="lowPrice"
                value={minPrice}
                className="border border-yellow-500 w-20 focus:outline-none rounded-xl px-4 py-1"
                onChange={(e) => setMinPrice(e.target.value)}
                
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="lowPrice">High Price</label>
              <input
                type="number"
                id="lowPrice"
                value={maxPrice}
                className="border border-yellow-500 w-20 focus:outline-none rounded-xl px-4 py-1"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-7">
          {products?.data?.length > 0
            ? products?.data?.map((item: TProducts, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-[45%] lg:w-[23%] border border-[#F2BA66] shadow-2xl relative px-2 py-2 rounded"
                    style={{ boxShadow: "#F2BA66 0px 0px 8px 0px" }}
                  >
                    <Link to={"/"} className="block">
                      <div>
                        <img
                          src={item.image}
                          className="w-full h-[120px] lg:h-[200px]"
                          alt={item.title}
                        />
                      </div>
                    </Link>
                    <div className="py-2">
                      <Link to={`/product/${item._id}`} className="block">
                        <h1 className="text-[14px] lg:text-xl text-gray-800 font-serif">
                          {item.title}
                        </h1>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-[12px] lg:text-[16px] font-serif">
                              ৳ {item.price}
                            </p>
                            <p className="text-[12px] lg:text-[16px] font-serif">
                              stock: {item.quantity}
                            </p>
                            <small className="bg-green-600 text-white font-serif rounded-xl py-1 px-2 text-xs absolute bottom-[85%] lg:bottom-[37%] left-2">
                              {item?.categoryId?.categoryName}
                            </small>
                          </div>
                        </div>
                      </Link>
                      <div className="pt-2">
                        <button
                          onClick={() => handleAddtoCart(item)}
                          className="bg-green-950 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 w-full  lg:h-10 hover:bg-green-600 hover:text-white transition-all"
                        >
                          <HiOutlineShoppingCart className="w-4 h-4 lg:w-6 lg:h-6" />
                          <span className="text-xs lg:text-xl">
                            Add to Cart
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            : "Loading..."}
        </div>
      </section>
    </>
  );
};

export default HomeProduct;
