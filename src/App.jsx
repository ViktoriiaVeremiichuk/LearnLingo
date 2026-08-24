import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Teachers from "./pages/Teachers/Teachers";
import Favorites from "./pages/Favorites/Favorites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Header />
      </div>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/teachers"
            element={
              <div className={styles.grayContainer}>
                <Teachers />
              </div>
            }
          />
          <Route
            path="/favorites"
            element={
              <div className={styles.grayContainer}>
                <Favorites />
              </div>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </main>
    </BrowserRouter>
  );
}
