const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  nom: String,
  prenom: String,
  email: { type: String, unique: true },
  password: String,
  photoProfile: String,
  annonce: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Produit", default: [] },
  ],
  panier: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Produit", default: [] },
  ],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    let passwordHashed = await bcrypt.hash(this.password, 10);
    this.password = passwordHashed;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

/*

{
 "nom":"Koribeche",
 "prenom":"amir",
 "age":15,
 "email":"koribeche.a@gmail.com",
 "password":"amir"
}

*/

/* app.post(
  "/signup",
  {
    schema: {
      tags: ["users"],
      body: newUserSchema,
    },
  },
  async (request, reply) => {
    const user = request.body;
    user.password = await bcrypt.hash(user.password, 10);
    const resultat = await app.db.collection("users").insertOne(user);
    return resultat;
  }
); */
