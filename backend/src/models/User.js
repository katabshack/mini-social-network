import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// ✅ CORRECTION : Utiliser une fonction standard 'async' sans l'argument 'next'
userSchema.pre("save", async function () {
  // 1. Vérifie si le mot de passe a été modifié (pour éviter de hacher à nouveau un mot de passe déjà haché)
  if (!this.isModified("password")) {
    return; // Retourne simplement, Mongoose passe à l'étape suivante
  }
  
  // 2. Hachage du mot de passe
  // Note : Le try/catch n'est pas strictement nécessaire ici mais est une bonne pratique
  try {
    const salt = await bcrypt.genSalt(10); // Génère le sel (10 rounds)
    this.password = await bcrypt.hash(this.password, salt); // Hache le mot de passe
    
    // PLUS BESOIN d'appeler next() ! Mongoose continue automatiquement après l'exécution de la fonction async
  
  } catch (error) {
    // Si une erreur se produit (p. ex. bcrypt échoue), lancez l'erreur pour la capturer dans le `save()`
    throw new Error(error); 
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);