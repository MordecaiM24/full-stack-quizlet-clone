import mongoose from "mongoose";

const CardSetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    cards: [
      {
        index: { type: Number, required: true },
        term: { type: String, required: true },
        definition: { type: String, required: true },
      },
    ],
    qa: [
      {
        question: { type: String, required: true },
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
      ownerProfPic: { type: String, required: false },
    },
    school: { type: String, required: false },
    subject: { type: String, required: false },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

export const CardSetModel = mongoose.model("cardSets", CardSetSchema);
