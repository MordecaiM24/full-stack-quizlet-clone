import { CardSetModel } from "../models/CardSet.js";

const createSet = async (req, res, next) => {
  const body = req.body;
  try {
    const newSet = new CardSetModel(body);
    await newSet.save();
    res.json(newSet);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

const getPublicSets = async (req, res, next) => {
  const sets = await CardSetModel.find({ public: true });
  res.status(200).json(sets);
};

const getSetByID = async (req, res, next) => {
  const id = req.params.id;
  try {
    console.log();
    const set = await CardSetModel.find({ _id: id });
    res.status(200).json(set);
  } catch (err) {
    res.status(400).json({ Err: "Not Found" });
  }
};

const editFlashcard = async (req, res, next) => {
  const newTerm = req.body.term;
  const newDefinition = req.body.definition;

  try {
    const setID = req.params.id;
    const cardID = req.body._id;
    console.log(`Set ID: ${setID}, Card ID: ${cardID}`);
    const response = await CardSetModel.updateOne(
      { _id: setID },
      {
        $set: {
          "cards.$[card].term": newTerm,
          "cards.$[card].definition": newDefinition,
        },
      },
      { arrayFilters: [{ "card._id": cardID }] }
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send(err);
  }
};

export { createSet, getPublicSets, getSetByID, editFlashcard };
