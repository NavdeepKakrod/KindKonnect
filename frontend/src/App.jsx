import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RegisterNGO from "./pages/RegisterNGO";
import LoginNGO from "./pages/LoginNGO";
import LoginUser from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";
import CreatePostPage from "./pages/CreatePostPage";
import HomePage from "./pages/HomePage";
import NGODashboard from "./pages/NGODashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route path="/createpost" element={<CreatePostPage />} />
        <Route path="/ngo/dashboard" element={<NGODashboard />} />
        <Route path="/reg/ngo" element={<RegisterNGO />} />
        <Route path="/login/ngo" element={<LoginNGO />} />
        <Route path="/reg/user" element={<RegisterUser />} />
        <Route path="/login/user" element={<LoginUser />} />
      </Routes>
    </Router>
  );
}

export default App;
