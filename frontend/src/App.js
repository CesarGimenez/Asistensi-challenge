import "./App.css";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/Home";
import { Navigation } from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </div>
  );
}

export default App;
