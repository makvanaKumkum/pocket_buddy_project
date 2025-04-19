import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);

    navigate("/login");
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="logout-container">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
