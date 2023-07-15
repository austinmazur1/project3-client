import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import AddProductPage from "./pages/AddProductPage";

import SellerDashboard from "./pages/Seller/SellerDashboard";

import IsSeller from "./components/Role/IsSeller";


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />


          {/* isPrivate doesnt all to go to add product page unless signed in */}

          <Route
          path="/seller/dashboard"
          element={
            <IsPrivate>
              <SellerDashboard />
            </IsPrivate>
          }
          />

        {/* isPrivate doesnt all to go to add product page unless signed in */}

        <Route
          path="/seller/new-product"
          element={
            <IsPrivate>
              <AddProductPage />
            </IsPrivate>
          }
        />
        {/* TODO add seller dash component */}
        <Route path="/seller" element={<IsSeller>"hello seller"</IsSeller>} />

        {/* TODO add buyer dash component */}
        <Route path="/buyer" element={"hello buyer"} />
      </Routes>
    </div>
  );
}

export default App;
