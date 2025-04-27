import { useState } from "react";
import axios from "axios";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState(0);
  const [volunteersRequired, setVolunteersRequired] = useState(0);
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);  
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      description,
      goalAmount,
      volunteersRequired,
      image,  
    };

    try {
      const token = localStorage.getItem("ngoToken");
      if (!token) {
        alert("No token found. Please login.");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/post/create", postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Post created successfully!");
      console.log(res.data);
       
      setTitle("");
      setDescription("");
      setGoalAmount(0);
      setVolunteersRequired(0);
      setImage("");

    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Create a New Post</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      <input
        type="number"
        value={goalAmount}
        onChange={(e) => setGoalAmount(e.target.value)}
        placeholder="Goal Amount"
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      <input
        type="number"
        value={volunteersRequired}
        onChange={(e) => setVolunteersRequired(e.target.value)}
        placeholder="Volunteers Required"
        required
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full mb-6 p-2 border border-gray-300 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostPage;
