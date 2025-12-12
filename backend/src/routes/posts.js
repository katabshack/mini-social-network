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

// 1. ROUTE DE RECHERCHE
// GET /api/posts/search/monMotCle
router.get("/search/:query", async (req, res) => {
  const { query } = req.params;
  try {
    // On cherche les posts dont le "content" contient le mot "query"
    // $regex : permet de chercher une partie du texte
    // $options: 'i' : insensible à la casse (Majuscule/minuscule pareil)
    const posts = await Post.find({
      content: { $regex: query, $options: "i" },
    }).populate("userId", "username profilePicture"); // On veut aussi les infos de l'auteur

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
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
/*
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
*/
/*
router.put("/:id/like", protect, async (req, res) => { // <--- PUT est le standard
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      res.status(200).json("The post has been liked"); // <--- ATTENTION ICI
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
*/

router.put("/:id/like", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id); // On ajoute l'ID
    } else {
      post.likes = post.likes.filter((id) => id.toString() !== req.user.id); // On retire
    }
    
    await post.save(); // On sauvegarde
    res.status(200).json(post.likes); // <--- ON RENVOIE LE TABLEAU À JOUR
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;