import { CardSetModel } from "../models/CardSet.js";
import { Configuration, OpenAIApi } from "openai";

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

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const autoCreate = async (req, res, next) => {
  const numCards = Number(req.query.num);
  const topic = req.query.topic;

  const chatGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Return only a json object array of ${numCards} terms and definitions relating to ${topic} in the format where the json array is called data.`,
      },
    ],
  });

  const chatGPTMessage = chatGPT.data.choices[0].message;
  console.log("INITIAL CHATGPT RESPONSE MESSAGE");
  console.log(chatGPTMessage);

  let response = chatGPTMessage.content;
  console.log("MESSAGE.CONTENT HERE");
  console.log(response);

  response = JSON.parse(response);
  console.log("JSON PARSED MESSAGE.CONTENT");
  console.log(response);

  const cards = response.data;
  console.log("CARDS");
  console.log(cards);

  res.status(200).json(cards);
};

const getQA = async (req, res, next) => {
  let cards = req.body;
  console.log(cards);
  cards = JSON.parse(cards.data);
  console.log(cards);
  cards = JSON.stringify(cards.newArray);

  const chatGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${cards} Create a new json array using the given array that returns a fill in the blank question and answer with the previous terms and definitions. `,
      },
    ],
  });
  console.log(chatGPT);

  const chatGPTMessage = chatGPT.data.choices[0].message;
  console.log("INITIAL CHATGPT RESPONSE MESSAGE");
  console.log(chatGPTMessage);

  let response = chatGPTMessage.content;
  console.log("MESSAGE.CONTENT HERE");
  console.log(response);

  response = JSON.parse(response);
  console.log("JSON PARSED MESSAGE.CONTENT");
  console.log(response);

  res.status(200).json(response);
};

export {
  createSet,
  getPublicSets,
  getSetByID,
  editFlashcard,
  autoCreate,
  getQA,
};

// curl https://api.openai.com/v1/chat/completions \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer $OPENAI_API_KEY" \
//   -d '{
//      "model": "gpt-3.5-turbo",
//      "messages": [{"role": "user", "content": "Say this is a test!"}],
//      "temperature": 0.7
//    }'
