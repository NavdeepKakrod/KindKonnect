import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import NGO from "../models/ngo.model.js";

export const createPost = async (req, res) => {
  try {

    const ngoId = req.user.id;
 
    const ngo = await NGO.findById(ngoId);

    if (!ngo) {
      return res.status(403).json({ message: "Only NGOs can create posts" });
    }

    const { title, description, goalAmount, volunteersRequired } = req.body;

    const newPost = new Post({
      ngo: ngoId,
      title,
      description,
      goalAmount,
      volunteersRequired,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);

  } 
  catch (err) {
    console.log("Error in createPost controller", err.message);
    res.status(500).json({ message : "Internal server Error "});
  }
};
 
export const getAllPosts = async (req, res) => {
  try {

    const posts = await Post.find().populate("ngo", "name email");
    res.status(200).json(posts);

  } 
  catch (err) {
    console.log("Error in getpost controller", err.message);
    res.status(500).json({ message : "Internal server Error "});
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const ngoId = req.user.id;

    const posts = await Post.find({ ngo: ngoId }).populate("ngo", "name email");

    res.status(200).json(posts);
  } catch (err) {
    console.log("Error in getMyPosts controller", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const donateToPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId, amount } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Invalid post" });
    }
 
    post.collectedAmount += amount;
    await post.save();
 
    const user = await User.findById(userId);
    const ngo = !user ? await NGO.findById(userId) : null;

    if (user) {
      user.donatedPosts.push({ post: postId, amount });
      await user.save();
    } else if (ngo) {
      ngo.donatedPosts.push({ post: postId, amount });
      await ngo.save();
    } else {
      return res.status(400).json({ message: "Invalid donor" });
    }

    res.status(200).json({ message: "Donation successful", updatedPost: post });
  } catch (err) {
    console.log("Error in donateToPost controller:", err.message);
    res.status(500).json({ message: "Internal server Error" });
  }
}; 

export const volunteerForPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body;
 
    const isNGO = await NGO.findById(userId);
    if (isNGO) {
      return res.status(403).json({ message: "NGOs are not allowed to volunteer." });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ message: "Invalid post" });
    }

    if (post.volunteersJoined.includes(userId)) {
      return res.status(400).json({ message: "Already volunteered for this post" });
    }

    post.volunteersJoined.push(userId);
    await post.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.volunteeredPosts.push(postId);
    await user.save();

    res.status(200).json({ message: "Volunteered successfully", updatedPost: post });
  } catch (err) {
    console.log("Error in volunteerForPost controller", err.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};
