import AlbumsList from "./Components/AlbumsList";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <AlbumsList />
      <ToastContainer />
    </>
  );
}

export default App;
