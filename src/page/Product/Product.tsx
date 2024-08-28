import { useRef, useState } from "react";
// import { Model } from "../../components/Model/Model";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetCategoryQuery,
  useGetProductQuery,
  useProductUpdateMutation,
} from "../../redux/api/baseApi";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import Modal from "../../components/Model/Modal";
import { modelClose, modelOpen, TCategories, TProducts } from "../../helpers";
import { toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { GiToaster } from "react-icons/gi";

type Inputs = {
  title?: string;
  image?: string;
  category?: string;
  price?: number;
  quantity?: number;
  rating?: number;
  description?: string;
};

type TProductUpdate ={
  _id:string;
  productId?:string;
  title?:string;
  image?:string;
  categoryId?:TCategories;
  price?:number;
  quantity?:number;
  rating?:number;
  description?:string;
}

export const Product = () => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const productModalRef = useRef<HTMLDialogElement>(null);
  const productFormRef = useRef<HTMLFormElement>(null);
  const updateProductModalRef = useRef<HTMLDialogElement>(null);
  const updateProductFormRef = useRef<HTMLFormElement>(null);
  const [updateProductInfo, setUpdateProductInfo] = useState<TProductUpdate | null>(null);
  // const productUpdateModalRef = useRef<HTMLDivElement>(null);
  const { data: products, isError, isLoading } = useGetProductQuery({searchTerm:"",minPrice:"",maxPrice:""});
  const [productInfoHandle] = useAddProductMutation();
  const { data: category, isLoading: categoryLoading } =
    useGetCategoryQuery(undefined);
  const [deleteProduct, { isError: deleteError }] = useDeleteProductMutation();
  // const [updateProductInfo, setUpdateProductInf] = useState({});
  const [productUpdateHandle] = useProductUpdateMutation();

  if (isError || isLoading || categoryLoading) {
    return <div>Loading...</div>;
  }
  if (deleteError) {
    return <div>Error...</div>;
  }
  

  //   console.log("products", products);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const { title, category, image, price, quantity, rating, description } =
      data;
    const productInfo = {
      title,
      categoryId: category,
      image,
      price: Number(price),
      quantity: Number(quantity),
      rating,
      description,
    };
    try {
      const insertProduct = await productInfoHandle(productInfo);
      console.log({insertProduct});
      
      if (insertProduct.data) {
        toast.success("Product Added Successfully");
        modelClose(productModalRef, productFormRef);
        reset();
      }
      else{
        toast.error((insertProduct.error as FetchBaseQueryError)?.data?.message);
      }
    } catch (error: unknown) {
      console.log({error});
      
      toast.error((error as Error).message);
    }
    
    // console.log("insertProduct", insertProduct);

    // if (insertProduct) {
    //   // toggleModal();
    //   toast.success("Product Added Successfully");
    //   modelClose(productModalRef, productFormRef);
    //   reset();
    
    // }else{
    //   toast.error(insertProduct.error?.data?.message);
    // }
    // console.log("productInfo", productInfo);
  };

  const handleDeleteProduct = async (id: string) => {
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
        const deleteProductInfo: unknown = deleteProduct(id);
        if (deleteProductInfo) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleProductEdit = (item: TProductUpdate | null) => {
    setUpdateProductInfo(item);
    modelOpen(updateProductModalRef);
  };
  const handleUpdateProductSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const form = e.target as HTMLFormElement;
  
    const title = (form.elements.namedItem('title') as HTMLInputElement)?.value;
    const image = (form.elements.namedItem('image') as HTMLInputElement)?.value;
    const category = (form.elements.namedItem('category') as HTMLInputElement)?.value;
    const price = Number((form.elements.namedItem('price') as HTMLInputElement)?.value);
    const quantity = Number((form.elements.namedItem('quantity') as HTMLInputElement)?.value);
    const rating = Number((form.elements.namedItem('rating') as HTMLInputElement)?.value);
    const description = (form.elements.namedItem('description') as HTMLInputElement)?.value;
  
    const updateProduct = {
      productId: updateProductInfo?._id,
      title,
      image,
      categoryId: category,
      price,
      quantity,
      rating,
      description,
    };
  
    try {
      const res = await productUpdateHandle(updateProduct).unwrap();
      if (res.data) {
        modelClose(updateProductModalRef, updateProductFormRef);
        toast.success("Product Updated Successfully");
      } else {
        toast.error(res.error?.data?.message);
      }
    } catch (error) {
      toast.error("Product Update Failed");
    }
  };
  return (
    <>
      <div className="py-10 px-4 lg:px-20">
        <div className="flex justify-end">
          <button
            onClick={() => {
              modelOpen(productModalRef);
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </div>
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-3">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">
                Product List
              </h2>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        SI
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Image
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Category
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Price
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Quantity
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product Rating
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.data?.map((item:TProducts, index: number) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-600 whitespace-no-wrap">
                            {index + 1}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.title}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            <img
                              src={item?.image}
                              className="w-[100px] h-[100px]"
                              alt="image"
                            />
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.categoryId?.categoryName}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.price}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.quantity}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.rating}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleProductEdit(item)}
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(item?._id)}
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* create product modal */}
      <Modal
        modalRef={productModalRef}
        modalForm={productFormRef}
        title="Add Product"
      >
        <form onSubmit={handleSubmit(onSubmit)} ref={productFormRef}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="w-full space-y-2">
              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Product Name
                  </h3>
                  <div className="mt-2 w-full">
                    <input
                      type="text"
                      id="title"
                      {...register("title", { required: true })}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter Title"
                    />
                    {errors.title && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Product image
                  </h3>
                  <div className="mt-2 w-full">
                    <input
                      type="text"
                      {...register("image", { required: true })}
                      id="image"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter image url"
                    />
                    {errors.image && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Product Category
                  </h3>
                  <div className="mt-2 w-full">
                    <select
                      {...register("category", { required: true })}
                      id="category"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option>---Select Category---</option>
                      {category.data.map((itemC: TCategories, index: number) => (
                        <option key={index} value={itemC._id}>
                          {itemC.categoryName}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Product Price
                  </h3>
                  <div className="mt-2 w-full">
                    <input
                      type="number"
                      {...register("price", { required: true })}
                      id="price"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter price"
                    />
                    {errors.price && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Quantity
                  </h3>
                  <div className="mt-2 w-full">
                    <input
                      type="number"
                      {...register("quantity", { required: true })}
                      id="quantity"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter quantity"
                    />
                    {errors.quantity && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Rating
                  </h3>
                  <div className="mt-2 w-full">
                    <input
                      type="number"
                      {...register("rating", { required: true })}
                      id="rating"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter rating"
                    />
                    {errors.rating && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Product description
                  </h3>
                  <div className="mt-2 w-full">
                    <textarea
                      {...register("description", { required: true })}
                      id="description"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter category"
                    ></textarea>
                    {errors.description && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 px-4 py-3 text-right">
            <button
              onClick={() => {
                modelClose(productModalRef, productFormRef);
              }}
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
            >
              <i className="fas fa-times"></i> Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
            >
              <i className="fas fa-plus"></i> Create
            </button>
          </div>
        </form>
      </Modal>

      {/* update product modal */}
      <Modal
        modalRef={updateProductModalRef}
        modalForm={updateProductFormRef}
        title="Update Product data"
      >
        <form onSubmit={handleUpdateProductSubmit} ref={updateProductFormRef}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="w-full space-y-2">
              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                  >
                    Product Name
                  </h3>
                  <div className="mt-2 w-full">
                    <input
                      type="text"
                      name="title"
                      defaultValue={updateProductInfo?.title}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter Title"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Product image
                  </h3>
                  <div className="mt-2 w-full">
                    <input
                      type="text"
                      name="image"
                      
                      defaultValue={updateProductInfo?.image}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter image url"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Product Category
                  </h3>
                  <div className="mt-2 w-full">
                    <select
                      name="category"
                      
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      {category.data.map((itemC: TCategories, index: number) => (
                        <option
                          key={index}
                          value={itemC._id}
                          selected={
                            itemC?.categoryName ===
                            updateProductInfo?.categoryId?.categoryName
                          }
                        >
                          {itemC.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Product Price
                  </h3>
                  <div className="mt-2 w-full">
                    <input
                      type="number"
                      name="price"
                      defaultValue={updateProductInfo?.price}
                      
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter price"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Quantity
                  </h3>
                  <div className="mt-2 w-full">
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={updateProductInfo?.quantity}
                     
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter quantity"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Rating
                  </h3>
                  <div className="mt-2 w-full">
                    <input
                      type="number"
                      name="rating"
                      defaultValue={updateProductInfo?.rating}
                     
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter rating"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-center flex items-center gap-4 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="w-full">
                  <h3
                    className="text-xl leading-6 font-medium text-gray-900 w-full"
                    id="modal-headline"
                  >
                    Product description
                  </h3>
                  <div className="mt-2 w-full">
                    <textarea
                      name="description"
                      defaultValue={updateProductInfo?.description}
                     
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter category"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 px-4 py-3 text-right">
            <button
              onClick={() => {
                modelClose(updateProductModalRef, updateProductFormRef);
              }}
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
            >
              <i className="fas fa-times"></i> Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
            >
              <i className="fas fa-plus"></i> Create
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
