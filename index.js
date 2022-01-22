import telegramBot from "node-telegram-bot-api";
import fs from "fs";
import readLastLines from "read-last-lines";
import fetch from "cross-fetch";
import {
  yemekUrl,
  TOKEN,
  coinApiBTC,
  coinApiSOL,
  coinApiTRY,
  coinApiMANA,
  randomWord,
  memeApi,
} from "./config.js";
import { curly } from "node-libcurl";

const bot = new telegramBot(TOKEN, { polling: true });

bot.on("message", (message) => {
  // add to file
  fs.appendFile(
    "sonyazilanlar.txt",
    `${message.from.first_name} - ${message.text}`,
    function (err, data) {
      if (err) return err;
    }
  );
  // go to new line
  fs.appendFile("sonyazilanlar.txt", "\r\n", function (err, data) {
    if (err) return err;
  });

  let chatid = message.chat.id;

  if (message.text.toLowerCase() == "yemek") {
    bot.sendPhoto(chatid, "screenshot.png");
  }

  if (message.text.toLowerCase() == "ne yazdı") {
    readLastLines.read("sonyazilanlar.txt", 10).then(function (lines) {
      let data = lines;
      bot.sendMessage(chatid, data);
    });
  }

  if (message.text.toLowerCase() == "lanet olsun") {
    bot.sendMessage(
      chatid,
      "burada yaşayan en güçlü ve en zeki erkekleri görüyorum. bu potansiyeli görüyorum ve hepsi heba oluyor. lanet olsun, bütün bir nesil benzin pompalıyor, garsonluk yapıyor, ya da beyaz yakalı köle olmuş. reklamlar yüzünden araba ve kıyafet peşinde. nefret ettiğimiz işlerde çalışıp gereksiz şeyler alıyoruz. Bizler tarihin ortanca çocuklarıyız. bir amacımız ya da yerimiz yok, ne büyük savaşı yaşadık ne de büyük buhranı. bizim savaşımız ruhani bir savaş, en büyük buhranımız hayatlarımız. televizyonla büyürken, milyoner film yıldızı ya da rock yıldızı olacağımıza inandık, ama olmayacağız. bunu yavaş yavaş öğreniyoruz ve o yüzden çok çok kızgınız."
    );
  }

  if (message.text.toLowerCase() == "btc") {
    (async () => {
      try {
        const res = await fetch(coinApiBTC);
        const price = await res.json();

        const ressol = await fetch(coinApiSOL);
        const pricesol = await ressol.json();

        const restry = await fetch(coinApiTRY);
        const pricetry = await restry.json();

        const resmana = await fetch(coinApiMANA);
        const pricemana = await resmana.json();

        bot.sendMessage(
          chatid,
          `TRY: ${pricetry.rate.toFixed(2)}\nBTC: $${Math.trunc(
            price.rate
          )}\nSOL: $${Math.trunc(
            pricesol.rate
          )}\nMANA: $${pricemana.rate.toFixed(2)}`
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }

  if (message.text.toLowerCase() == "meme") {
    (async () => {
      try {
        const res = await fetch(memeApi);
        const meme = await res.json();

        bot.sendPhoto(chatid, meme.url);
      } catch (err) {
        console.log(err);
      }
    })();
  }

  if (message.text.toLowerCase() == "joke") {
    (async () => {
      try {
        const { data } = await curly.get("https://icanhazdadjoke.com/", {
          httpHeader: ["Accept: text/plain"],
        });
        bot.sendMessage(chatid, data);
      } catch (err) {
        console.log(err);
      }
    })();
  }

  if (message.text.toLowerCase() == "word") {
    (async () => {
      try {
        const res = await fetch(randomWord);
        const words = await res.json();
        const word = words[0];

        console.log(word);

        bot.sendMessage(
          chatid,
          `${word.title} - ${word.description[0]}\n\nSynonyms: ${word.synonyms[0]}, ${word.synonyms[1]}\n\nExample: ${word.sentences[0]}`
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }
});
/* 
async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto(yemekUrl);

  let [height, width] = await page.evaluate(() => {
    return [
      document.getElementsByTagName("html")[0].offsetHeight - 1500,
      document.getElementsByTagName("html")[0].offsetWidth,
    ];
  });

  await page.screenshot({
    path: "screenshot.png",
    clip: { x: 0, y: 0, width, height },
  });
  browser.close();
}
*/
