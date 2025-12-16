import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";
import multer from "multer";
import { storage } from "../../config/cloudinary.js"; 

const router = express.Router();
const upload = multer({ storage });

// 🔒 Toutes les routes nécessitent une authentification
// (Si tu veux que la lecture soit publique, déplace cette ligne plus bas)
router.use(protect);

// 1. CRÉER UN POST (Avec Image)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newPost = new Post({
      userId: req.user.id,
      content: req.body.content,
      image: req.file ? (req.file.path || req.file.secure_url) : "", // URL Cloudinary
    });

    const savedPost = await newPost.save();
    await savedPost.populate("userId", "username profilePicture");

    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Erreur création post:", err);
    res.status(500).json(err);
  }
});

// 2. LIRE TOUS LES POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username profilePicture")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. RECHERCHER
router.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  try {
    const posts = await Post.find({
      content: { $regex: query, $options: "i" },
    }).populate("userId", "username profilePicture");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 4. LIRE UN SEUL
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("userId", "username profilePicture");
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 5. LIKE
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
    } else {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id);
    }
    await post.save();
    res.status(200).json(post.likes);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;