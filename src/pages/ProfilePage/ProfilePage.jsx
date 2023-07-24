import "./ProfilePage.css";
import { AuthContext } from "../../context/auth.context";
import { useContext } from "react";
function ProfilePage() {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <div>
      <h1>Profile page</h1>
    </div>
  );
}

export default ProfilePage;
