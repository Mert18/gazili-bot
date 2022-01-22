import dotenv from "dotenv";

dotenv.config();

export const jokerApi = "https://v2.jokeapi.dev/joke/Any";
export const yemekUrl = "https://mediko.gazi.edu.tr/view/page/20412";
export const coinApiBTC = `https://rest.coinapi.io/v1/exchangerate/BTC/USD?apikey=${process.env.COINAPI}`;
export const coinApiSOL = `https://rest.coinapi.io/v1/exchangerate/SOL/USD?apikey=${process.env.COINAPI}`;
export const coinApiTRY = `https://rest.coinapi.io/v1/exchangerate/USD/TRY?apikey=${process.env.COINAPI}`;
export const coinApiMANA = `https://rest.coinapi.io/v1/exchangerate/MANA/USD?apikey=${process.env.COINAPI}`;
export const memeApi = "https://meme-api.herokuapp.com/gimme";

export const TOKEN = process.env.TOKEN;
