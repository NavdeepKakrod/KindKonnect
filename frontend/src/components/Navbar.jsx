import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const ngoToken = localStorage.getItem("ngoToken");
  const ngoInfo = JSON.parse(localStorage.getItem("ngoInfo"));
  const userToken = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-lg font-bold">
        <Link to="/">NGO Connect</Link>
      </h1>

      <div className="space-x-4">
        {ngoToken ? (
          <>
            <span>Welcome, {ngoInfo?.name}</span>
            <Link to="/ngo/dashboard" className="hover:underline">My Posts</Link>
            <Link to="/createpost" className="hover:underline">Create Post</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        ) : userToken ? (
          <>
            <Link to="/dashboard" className="hover:underline">Feed</Link>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login/user" className="hover:underline">User Login</Link>
            <Link to="/login/ngo" className="hover:underline">NGO Login</Link>
            <Link to="/reg/user" className="hover:underline">User Register</Link>
            <Link to="/reg/ngo" className="hover:underline">NGO Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
