import express from "express";
import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

// 💬 CRÉER un commentaire
router.post("/", async (req, res) => {
  try {
    const { postId, content } = req.body;
    
    // Vérifier si le post existe
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    const comment = new Comment({
      postId,
      userId: req.user._id,
      content,
    });

    const createdComment = await comment.save();
    
    // Ajouter les infos utilisateur au commentaire
    await createdComment.populate("userId", "username profilePicture");
    
    res.status(201).json(createdComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 📖 LIRE tous les commentaires d'un post
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "username profilePicture")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🗑️ SUPPRIMER un commentaire (seul l'auteur peut supprimer)
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    
    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    // Vérifier que l'utilisateur est l'auteur du commentaire
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    await comment.deleteOne();
    res.json({ message: "Commentaire supprimé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;