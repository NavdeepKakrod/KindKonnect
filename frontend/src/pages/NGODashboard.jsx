import { useEffect, useState } from "react";
import axios from "axios";

const NGODashboard = () => {
  const [posts, setPosts] = useState([]);
  const [viewType, setViewType] = useState("my");
  const [showComments, setShowComments] = useState({}); // new state for toggling comments

  const fetchPosts = () => {
    const token = localStorage.getItem("ngoToken");
    if (!token) return;

    const endpoint =
      viewType === "my"
        ? "http://localhost:5000/api/post/get/my"
        : "http://localhost:5000/api/post/get";

    axios
      .get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
  }, [viewType]);

  const getToken = () => localStorage.getItem("userToken") || localStorage.getItem("ngoToken");

  const handleDonate = async (postId) => {
    const token = getToken();
    if (!token) return alert("Please log in to donate.");

    const amount = prompt("Enter donation amount (₹):");
    if (!amount || isNaN(amount)) return alert("Please enter a valid amount.");

    try {
      await axios.post(
        "http://localhost:5000/api/post/donate",
        { postId, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Donation successful!");
      fetchPosts();
    } catch (err) {
      console.error("Donation error:", err.response || err.message);
      alert(err?.response?.data?.message || "Donation failed. Please try again.");
    }
  };

  const handleVolunteer = async (postId) => {
    const token = localStorage.getItem("userToken");
    if (!token) return alert("Only users can volunteer. Please log in as a user.");

    try {
      await axios.post(
        "http://localhost:5000/api/post/volunteer",
        { postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Successfully volunteered!");
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Could not volunteer.");
    }
  };

  const handleLike = async (postId) => {
    const token = getToken();
    if (!token) return alert("Please log in to like posts.");

    try {
      await axios.post(
        "http://localhost:5000/api/post/like",
        { postId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Post liked!");
      fetchPosts();
    } catch (err) {
      console.error("Like error:", err.response || err.message);
      alert(err?.response?.data?.message || "Could not like post.");
    }
  };

  const handleComment = async (postId) => {
    const token = getToken();
    if (!token) return alert("Please log in to comment.");

    const commentText = prompt("Enter your comment:");
    if (!commentText) return alert("Comment cannot be empty.");

    try {
      await axios.post(
        "http://localhost:5000/api/post/comment",
        { postId, commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Comment added!");
      fetchPosts();
    } catch (err) {
      console.error("Comment error:", err.response || err.message);
      alert(err?.response?.data?.message || "Could not add comment.");
    }
  };

  const toggleComments = (postId) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {viewType === "my" ? "My NGO Posts" : "All NGO Posts"}
        </h1>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            className={`px-5 py-2 rounded-full font-medium ${
              viewType === "my"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-600"
            }`}
            onClick={() => setViewType("my")}
          >
            My Posts
          </button>
          <button
            className={`px-5 py-2 rounded-full font-medium ${
              viewType === "all"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-600"
            }`}
            onClick={() => setViewType("all")}
          >
            All Posts
          </button>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <p className="text-center text-gray-400">No posts to display.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-between"
              >
                <div>
                  {viewType === "all" && post.ngo && (
                    <p className="text-sm font-medium text-blue-600 mb-1">
                      {post.ngo.name}
                    </p>
                  )}

                  {/* Post Image */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}

                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <p className="mt-2 text-sm text-gray-600">{post.description}</p>

                  <ul className="mt-4 space-y-1 text-sm">
                    <li>🎯 <strong>Goal:</strong> ₹{post.goalAmount}</li>
                    <li>💰 <strong>Collected:</strong> ₹{post.collectedAmount}</li>
                    <li>👥 <strong>Volunteers Needed:</strong> {post.volunteersRequired}</li>
                    <li>✅ <strong>Joined:</strong> {post.volunteersJoined?.length || 0}</li>
                    <li>❤️ <strong>Likes:</strong> {post.likes?.length || 0}</li>
                  </ul>
                </div>

                {/* Buttons only in "All Posts" */}
                {viewType === "all" && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    <button
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      onClick={() => handleDonate(post._id)}
                    >
                      Donate
                    </button>
                    <button
                      className="flex-1 border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
                      onClick={() => handleVolunteer(post._id)}
                    >
                      Volunteer
                    </button>
                    <button
                      className="flex-1 border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-100 transition"
                      onClick={() => handleLike(post._id)}
                    >
                      Like
                    </button>
                    <button
                      className="flex-1 border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-100 transition"
                      onClick={() => handleComment(post._id)}
                    >
                      Comment
                    </button>
                  </div>
                )}

                {/* Comments Section */}
                {post.comments && post.comments.length > 0 && (
                  <div className="mt-4">
                    <button
                      className="text-sm text-blue-600 underline"
                      onClick={() => toggleComments(post._id)}
                    >
                      {showComments[post._id] ? "Hide Comments" : "View Comments"}
                    </button>

                    {showComments[post._id] && (
                      <ul className="mt-2 space-y-1 text-sm text-gray-700">
                        {post.comments.map((c, index) => (
                          <li key={index} className="border-b pb-1">
                            <strong>{c.user?.name ||c.ngo?.name || "Anonymous"}:</strong> {c.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NGODashboard;
