import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔒 Toutes les routes nécessitent une authentification
router.use(protect);

// 📝 CRÉER un post
router.post("/", async (req, res) => {
  try {
    const { content, image } = req.body;
    const post = new Post({
      userId: req.user._id,
      content,
      image: image || "",
    });

    const createdPost = await post.save();
    
    // Populer les infos de l'utilisateur
    await createdPost.populate("userId", "username profilePicture");
    
    res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du post" });
  }
});

// 📖 LIRE tous les posts (timeline)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username profilePicture")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🆔 LIRE un post spécifique
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "username profilePicture");

    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ❤️ LIKE / UNLIKE un post
router.post("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    const userId = req.user._id;
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Retirer le like
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // Ajouter le like
      post.likes.push(userId);
    }

    await post.save();
    
    // Renvoyer le post mis à jour avec les infos utilisateur
    await post.populate("userId", "username profilePicture");
    
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;