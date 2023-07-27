import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser, isSeller, isBuyer } =
    useContext(AuthContext);

  return (
    <nav>
  <header class="text-gray-600 body-font"></header>
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      
    <img
          className="mx-auto h-20 w-auto"
          src="../AuctionEra Logo - white back.png"
          alt="AuctionEra"
        />
    </a>

    <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">

      {isSeller ? (
        <Link to={"/seller/dashboard"}>
          <button class="mx-4 my-2">Dashboard</button>
        </Link>
      ) : (
        <Link to="/buyer/dashboard">
          <button class="mx-4 my-2">Dashboard</button>
        </Link>
      )}

      {isLoggedIn && (
        <>
          <button onClick={logOutUser} class="mx-4 my-2">Logout</button>

          <Link to="/profile">
            <button class="mx-4 my-2">Profile</button>
            {/* <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25}} alt="profile" /> */}
          </Link>

          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button class="mx-4 my-2">Sign Up</button>
          </Link>
          <Link to="/login">
            <button class="mx-4 my-2">Login</button>
          </Link>
        </>
      )}
    </nav>
  </div>
</nav>
  );
}

export default Navbar;
