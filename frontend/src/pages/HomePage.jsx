import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NGOPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get("http://localhost:5000/api/post/get")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
      console.error("Volunteer error:", err.response || err.message);
      alert(err?.response?.data?.message || "Could not volunteer.");
    }
  };

  const handleLike = async (postId) => {
    const token = localStorage.getItem("userToken") || localStorage.getItem("ngoToken");
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
    const token = localStorage.getItem("userToken") || localStorage.getItem("ngoToken");
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
  
  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6">
      <h1 className="text-4xl font-bold mb-10">Latest NGO Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white text-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-between"
          >
            <div>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
              <p className="text-sm font-medium text-blue-600 mb-1">
                {post.ngo?.name}
              </p>

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

            {/* Show comments */}
            <div className="mt-4">
              <h4 className="font-semibold">Comments:</h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                {post.comments?.map((c, index) => (
                  <li key={index} className="border-b pb-1">
                    {c.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NGOPosts;
