import { Link } from "react-router-dom";
import { useCheckOutMutation, useGetProductQuery } from "../../redux/api/baseApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { totalAmount, TProducts } from "../../helpers";
import { toast } from "react-toastify";
import {
  checkOut,
  productDecrement,
  productIncrement,
  removeFromCart,
} from "../../redux/cart/cartSlice";
import Swal from "sweetalert2";
import {  FieldValues, useForm } from "react-hook-form";



const CheckOut = () => {
  const { data: products } = useGetProductQuery(undefined);
  const dispatch = useAppDispatch();
  const [handleCeckout] = useCheckOutMutation();
  const cartProduct = useAppSelector(
    (state: RootState) => state.cart.cart
  ) as TProducts[];
  const { handleSubmit, reset,register,formState: { errors } } = useForm({
  });

  const handlePlus = (id: string) => {
    const mainProductQuantity: number = products?.data?.find(
      (item: TProducts) => item._id === id
    )?.quantity;
    const cartProductQuantity: number | undefined = cartProduct?.find(
      (item: TProducts) => item._id === id
    )?.quantity;
    if (cartProductQuantity === mainProductQuantity) {
      toast.error("You can't add more than stock quantity");
      return;
    }
    dispatch(productIncrement(id));
  };

  const checkOuthandler =async (data:FieldValues ) => {
    // console.log(data);
    const { name, email, phone, address, paymentMethod } = data;
    const cart: { productId: string, quantity: number }[] = [];
 const notInsert =  cartProduct.map((product)=>{
    if(product.quantity > products?.data?.find((item:TProducts)=>item._id === product._id)?.quantity){
      toast.error("You can't add more than stock quantity");
      return true;
    }else{
      return false;
    }
  })
  if(notInsert[0]){
    return;
    
  }
    cartProduct.map((product) => {
      cart.push({
        productId: product._id,
        quantity: product.quantity,
      });
    });
    const total = totalAmount(cartProduct) > 0 ? (totalAmount(cartProduct) + 20).toFixed(2) : 0;
    const order = {
      name,
      email,
      phone,
      address,
      paymentMethod,
      total:Number(total),
      cart,
    };

    const res = await handleCeckout(order).unwrap();
    console.log(res);
    
    if (res.data) {
      dispatch(checkOut());
      toast.success("Order placed successfully");
      reset();
    }

    // console.log({ order });
    
  }

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="w-full px-4 lg:px-10">
          <div className="w-full  bg-white px-4 lg:px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-[14px] lg:text-2xl">
                Shopping Cart
              </h1>
              <h2 className="font-semibold text-[14px] lg:text-2xl">
                {cartProduct?.length} Items
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Price
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                Total
              </h3>
            </div>
            {cartProduct.length > 0 &&
              cartProduct?.map((product: TProducts, index: number) => (
                <div
                  key={index}
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                >
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img
                        src={product?.image}
                        className="w-10 h-10 lg:h-24 lg:w-20"
                        alt="product"
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">
                        {product?.title}
                      </span>
                      <span className="text-red-500 text-xs">
                        {product?.categoryId?.categoryName}
                      </span>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(removeFromCart(product._id));
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                              });
                            }
                          });
                        }}
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs w-[20%]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <svg
                      onClick={() => dispatch(productDecrement(product?._id))}
                      className="fill-current text-gray-600 w-3  cursor-pointer"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>

                    <input
                      className="mx-2 border text-center w-8"
                      type="text"
                      value={product?.quantity}
                    />

                    <svg
                      onClick={() => handlePlus(product?._id)}
                      className="fill-current text-gray-600 w-3 cursor-pointer"
                      viewBox="0 0 448 512"
                    >
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    {product?.price}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm">
                    ৳ {(product?.price * product?.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

            <Link
              to={"/"}
              className="flex font-semibold text-green-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-green-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(checkOuthandler)}>
        <div className="flex flex-col lg:flex-row shadow-md my-10 px-4 lg:px-10">
          <div
            // onSubmit={handleSubmit(profileUpdateHandle)}
            className="w-full lg:w-3/4"
          >
            <div>
              <label htmlFor="name" className="text-[20px] font-medium">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full text-[15px] font-sans px-3 py-2 border border-green-800 focus:outline-none rounded"
              />
              {
                errors.name && <span className="text-red-500">This field is required</span>
              }
            </div>
            <div>
              <label htmlFor="email" className="text-[20px] font-medium">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full text-[15px] font-sans px-3 py-2 border border-green-800 focus:outline-none rounded"
              />
              {
                errors.email && <span className="text-red-500">This field is required</span>
              }
            </div>
            <div>
              <label htmlFor="phone" className="text-[20px] font-medium">
                Phone
              </label>
              <input
                type="text"
                {...register("phone", { required: true })}
                className="w-full text-[15px] font-sans px-3 py-2 border border-green-800 focus:outline-none rounded"
              />
              {
                errors.phone && <span className="text-red-500">This field is required</span>
              }
            </div>
            <div>
              <label htmlFor="address" className="text-[20px] font-medium">
                Address
              </label>
              <textarea
                {...register("address", { required: true })}
                className="w-full text-[15px] font-sans px-3 py-2 border border-green-800 focus:outline-none rounded"
              ></textarea>
              {
                errors.address && <span className="text-red-500">This field is required</span>
              }
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" id="html" {...register('paymentMethod')} value="Cash On" className="text-green-600 focus:ring-green-600" style={{ accentColor: '#16a34a' }} />
              <label htmlFor="html">Cash On Delivery</label>
              <input type="radio" id="css" {...register('paymentMethod')} value="Cash In" className="text-green-600 focus:ring-green-600" style={{ accentColor: '#16a34a' }} />
              <label htmlFor="css">Cash In Delivery</label>
            </div>
          </div>

          <div className="w-full lg:w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {cartProduct?.length}
              </span>
              <span className="font-semibold text-sm">
                ৳ {totalAmount(cartProduct).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">VAT</span>
              <span className="font-semibold text-sm">৳ 20</span>
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>
                  ৳ {
                    totalAmount(cartProduct) > 0
                      ? (totalAmount(cartProduct) + 20).toFixed(2)
                      : 0
                  }
                </span>
              </div>
              <button type="submit" className="bg-green-600 font-semibold hover:bg-green-900 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
        </form>
      </div>
    </>
  );
};

export default CheckOut;
