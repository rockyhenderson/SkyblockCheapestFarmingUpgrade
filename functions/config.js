const dotenv = require("dotenv");
dotenv.config();

const Hypixel = require("hypixel-api-reborn");
const hypixelClient = new Hypixel.Client(process.env.HYPIXEL_API_KEY);

module.exports = hypixelClient;
