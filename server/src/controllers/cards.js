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

const autoCreate = async (req, res, next) => {
  const response = {
    data: [
      {
        term: "Cell",
        definition:
          "The basic structural and functional unit of all living organisms, capable of independent existence and reproduction.",
      },
      {
        term: "DNA",
        definition:
          "Deoxyribonucleic acid, a molecule that carries the genetic instructions for the development, functioning, growth, and reproduction of all known living organisms.",
      },
      {
        term: "Gene",
        definition:
          "A unit of heredity that is transferred from parents to offspring and is held to determine some characteristic of the offspring.",
      },
      {
        term: "Evolution",
        definition:
          "The process of change in all forms of life over generations, involving descent with modification through genetic variation, natural selection, and speciation.",
      },
      {
        term: "Photosynthesis",
        definition:
          "The process by which green plants, algae, and some bacteria convert sunlight, carbon dioxide, and water into glucose (a form of stored energy) and release oxygen as a byproduct.",
      },
      {
        term: "Respiration",
        definition:
          "The process by which living organisms take in oxygen and release carbon dioxide, producing energy for cellular activities.",
      },
      {
        term: "Mitosis",
        definition:
          "A type of cell division that results in two daughter cells, each having the same number of chromosomes as the parent cell. It is essential for growth, repair, and asexual reproduction.",
      },
      {
        term: "Ecosystem",
        definition:
          "A biological community of interacting organisms (including plants, animals, and microorganisms) and their physical environment.",
      },
      {
        term: "Homeostasis",
        definition:
          "The ability of an organism or cell to maintain internal stability and equilibrium in response to changes in the external environment.",
      },
      {
        term: "Natural Selection",
        definition:
          "The process by which organisms that are better adapted to their environment tend to survive and reproduce more successfully, leading to evolutionary changes in populations over time.",
      },
    ],
  };
  console.log("Returning");

  res.status(200).json(response);
};
export { createSet, getPublicSets, getSetByID, editFlashcard, autoCreate };
