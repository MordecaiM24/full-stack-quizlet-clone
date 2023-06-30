import mongoose from "mongoose";

const CardSetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cards: [
    {
      term: { type: String, required: true },
      definition: { type: String, required: true },
    },
  ],
  public: { type: Boolean, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

var schema = new mongoose.Schema({
  field1: {
    type: String,
  },
  subdocArray: [
    {
      _id: false,
      field: { type: String },
    },
  ],
});

export const CardSetModel = mongoose.model("cardSets", CardSetSchema);
