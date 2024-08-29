
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useGetProductQuery, useGetSingleProductQuery } from "../../../redux/api/baseApi";
import { useParams } from "react-router-dom";
import RelatedProcuts from "../../../components/RelatedProducts/RelatedProcuts";
import { TProducts } from "../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  // console.log("params:",params);

  const { data: product } = useGetSingleProductQuery(id);
  let productDetailsInfo = product?.data;
  const categoryId: string = productDetailsInfo?.categoryId?._id;
  // console.log({productDetailsInfo});
  const cartProduct = useAppSelector(
    (state: RootState) => state.cart.cart
  ) as TProducts[];
  const dispatch = useAppDispatch();
  const searchTerm = "";
  const minPrice = "";
  const maxPrice = "";
  const { data: products } = useGetProductQuery({searchTerm,minPrice,maxPrice});
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
  }

  return (
    <>
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('E:/Caffeine/sweet-app/src/assets/images/menu.jpg')`,
        }}
      >
        <div className="container px-4 lg:px-20 py-24 mx-auto bg-white bg-opacity-80 rounded-lg">
          <div className="w-full mx-auto flex flex-wrap">
            <div className="w-full lg:w-[50%] p-2 border-2 border-[#EECA77] rounded-lg">
              <div className="w-full">
                <img
                  src={productDetailsInfo?.image}
                  alt="ecommerce"
                  className="w-full h-[400px] border-2 border-gray-300 rounded-lg"
                  width={140}
                  height={100}
                />
              </div>
            </div>

            <div className="w-full lg:w-[40%] lg:pl-10 lg:py-6 mt-6 lg:mt-0 space-y-3">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {productDetailsInfo?.title}
              </h1>
              Food category :{" "}
              <span className="text-sm title-font text-gray-500 tracking-widest border border-yellow-300 px-2 py-1 rounded-md">
                {productDetailsInfo?.categoryId?.categoryName}
              </span>
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: productDetailsInfo?.description,
                }}
              >
                {/* {productDetailsInfo?.description} */}
              </div>
              <div className="flex items-center gap-3">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ৳ {productDetailsInfo?.price}
                </span>
                <span>in stock: {productDetailsInfo?.quantity}</span>
              </div>
              <div className="flex gap-3">
                <div className="pt-2">
                  <button onClick={()=>handleAddtoCart(productDetailsInfo)} className="bg-green-900 text-white py-2 px-4 rounded-full flex items-center justify-center gap-2 w-full h-10 hover:green-500 hover:text-yellow-300 transition-all">
                    <HiOutlineShoppingCart className="w-6 h-6" />
                    <span className="text-xs lg:text-sm">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RelatedProcuts categoryId={categoryId} />
        {/* <RelatedProducts food_id={productDetailsInfo.food_id} /> */}
      </div>
    </>
  );
};

export default ProductDetails;
