import { useEffect, useState } from "react";
import axios from "axios";

const NGODashboard = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("ngoToken");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/post/get", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMyPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">My Posts</h2>
      {myPosts.length === 0 ? (
        <p>No posts yet. Create one!</p>
      ) : (
        <ul className="space-y-3">
          {myPosts.map((post) => (
            <li key={post._id} className="border p-4 rounded bg-gray-100">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p>{post.description}</p>
              <p><strong>Goal:</strong> ₹{post.goalAmount}</p>
              <p><strong>Volunteers Required:</strong> {post.volunteersRequired}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NGODashboard;
