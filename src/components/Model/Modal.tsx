import { modelClose } from "../../helpers";

type ModalType = {
    // setPreviewSrc?:any | null ,
    id?: string,
    trigger?: string,
    triggerSize?: string,
    title?: string,
    children?: JSX.Element,
    subFunc?: () => void,
    subFuncTitle?: string,
    // arrDataCloseEmty?: any | null,
    // setServiceValidation?: any | null
    modalRef?: React.RefObject<HTMLDialogElement>
    modalForm?: React.RefObject<HTMLFormElement>
}


const Modal = ({
  modalRef,
  modalForm,
  title,
  children
}:ModalType) => {
  return (
    <>
      <dialog ref={modalRef} className="modal bg-primary/10">
        <div className="modal-box bg-white w-10/12 max-w-[40rem]">
          <div className="border-b border-gray-500 pb-4">
            <h3 className="font-medium text-20 text-left">{title}</h3>
            <div>
              <button
                onClick={() => {
                  modelClose(modalRef, modalForm);
                }}
                className="absolute right-1 top-2 px-2.5 py-1 rounded-full bg-gray-300"
              >
                ✕
              </button>
            </div>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
};

export default Modal;
