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
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
        <Link to="/" className="hover:text-gray-100 transition">NGO Connect</Link>
      </h1>

      <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
        {ngoToken ? (
          <>
            <span className="text-white font-semibold hidden sm:block">
              Welcome, {ngoInfo?.name}
            </span>
            <Link
              to="/createpost"
              className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Create Post
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold text-white transition"
            >
              Logout
            </button>
          </>
        ) : userToken ? (
          <>
            <Link
              to="/dashboard"
              className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Feed
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login/user"
              className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              User Login
            </Link>
            <Link
              to="/login/ngo"
              className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              NGO Login
            </Link>
            <Link
              to="/reg/user"
              className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              User Register
            </Link>
            <Link
              to="/reg/ngo"
              className="bg-white text-blue-600 px-4 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              NGO Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
