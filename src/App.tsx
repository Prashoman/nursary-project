import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";
import { useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import { TProducts } from "./helpers";
import Swal from "sweetalert2";

function App() {
  const cartProduct = useAppSelector(
    (state: RootState) => state.cart.cart
  ) as TProducts[];

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (cartProduct.length > 0) {
        event.preventDefault();
        Swal.fire({
          title: "Are you sure?",
          text: "You have items in your cart. If you refresh, you may lose this data.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, reload",
          cancelButtonText: "No, stay on this page",
        }).then((result) => {
          if (result.isConfirmed) {
            // If confirmed, force reload the page
            window.removeEventListener("beforeunload", handleBeforeUnload); // Remove event listener
            window.location.reload(); // Proceed with the reload
          }
        });

        return false; // Prevent the unload/reload action
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cartProduct]);
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
