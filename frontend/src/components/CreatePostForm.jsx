import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

const CreatePostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return; // Empêche d'envoyer un message vide

    try {
      // On envoie le post au backend
      await API.post("/posts", { content });
      
      toast.success("Post publié !");
      setContent(""); // On vide le champ
      onPostCreated(); // On dit à la page d'accueil de rafraîchir la liste
    } catch (error) {
      toast.error("Erreur lors de la publication");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder="Quoi de neuf aujourd'hui ?"
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!content.trim()}
          >
            Publier
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;