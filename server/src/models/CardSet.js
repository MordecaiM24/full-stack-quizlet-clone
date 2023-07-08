import mongoose from "mongoose";

const CardSetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cards: [
    {
      order: { type: Number, required: true },
      term: { type: String, required: true },
      definition: { type: String, required: true },
    },
  ],
  public: { type: Boolean, required: true },
  userOwner: {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ownerName: { type: String, required: true },
  },
});

export const CardSetModel = mongoose.model("cardSets", CardSetSchema);
