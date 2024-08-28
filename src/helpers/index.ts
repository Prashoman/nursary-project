//model close
export const modelClose = (
  modalRef: React.RefObject<HTMLElementTagNameMap["dialog"]>,
  modalForm: React.RefObject<HTMLFormElement>
) => {
  modalRef.current?.close();
  // console.log("helpers",modalForm.current);
  if (modalForm.current) {
    modalForm.current.reset(); // Reset the form fields
  }
};

//model open
export const modelOpen = (modalRef: React.RefObject<HTMLElement>) => {
  if (modalRef.current)
    (modalRef.current as unknown as { showModal: () => void }).showModal();
};


// categories type

export type TCategories = {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

// products type
export type TProducts = {
  _id: string;
  categoryId?: TCategories;
  title: string;
  price: number;
  quantity: number;
  rating: number;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export const totalAmount = (cart: TProducts[]) => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
