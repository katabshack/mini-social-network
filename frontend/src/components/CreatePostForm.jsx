import { useState, useRef } from "react"; // Ajout de useRef
import API from "../services/api";
import toast from "react-hot-toast";
import { Image, X } from "lucide-react"; // Ajout de X pour supprimer l'image

const CreatePostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Pour stocker le fichier
  const [preview, setPreview] = useState(null); // Pour afficher l'image à l'écran
  
  // Référence vers l'input caché
  const fileInputRef = useRef();

  // Quand on clique sur l'icône Image
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  // Quand on sélectionne un fichier
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file)); // Crée une URL temporaire pour voir l'image
    }
  };

  // Annuler l'image
  const removeImage = () => {
    setSelectedImage(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !selectedImage) return;

    // IMPORTANT : Quand on envoie un fichier, on ne peut pas envoyer du JSON simple.
    // On doit utiliser "FormData".
    const formData = new FormData();
    formData.append("content", content);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    try {
      // On envoie le FormData (pas besoin de headers spécifiques, axios gère)
      await API.post("/posts", formData);
      
      toast.success("Post publié !");
      setContent("");
      removeImage();
      onPostCreated();
    } catch (error) {
      console.error(error);
      toast.error("Erreur publication");
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 text-lg placeholder-gray-400 border-none focus:outline-none resize-none bg-transparent"
          placeholder="Quoi de neuf ?"
          rows="2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        
        {/* Prévisualisation de l'image */}
        {preview && (
          <div className="relative mb-4">
            <img src={preview} alt="Aperçu" className="rounded-lg max-h-60 object-cover w-full" />
            <button 
              type="button" 
              onClick={removeImage}
              className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Input fichier caché */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
        
        <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
          {/* Icônes */}
          <div className="flex gap-4 text-blue-500">
            <button type="button" onClick={handleIconClick} className="hover:bg-blue-50 p-2 rounded-full transition">
              <Image size={20} />
            </button>
            {/* Autres icônes décos... */}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition disabled:opacity-50"
            disabled={!content.trim() && !selectedImage}
          >
            Publier
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;