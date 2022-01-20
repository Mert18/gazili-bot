const telegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const puppeteer = require("puppeteer");
const fs = require("fs");
const moment = require("moment");
const readLastLines = require("read-last-lines");

const TOKEN = process.env.TOKEN;

const bot = new telegramBot(TOKEN, { polling: true });

const url = "https://mediko.gazi.edu.tr/view/page/20412";

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto(url);

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

bot.on("message", (message) => {
  console.log(message);
  let chatid = message.chat.id;
  if (message.from.id == 1106794749) {
    bot.sendMessage(chatid, "aynn");
  }
  if (message.text.toLowerCase() == "sa") {
    bot.sendMessage(chatid, "aleyküm selam kardeşim hoş geldin");
  }

  if (message.text == "yemek") {
    //    run(); // Uncomment to reproduce the image, (slows down the bot).
    bot.sendPhoto(chatid, "screenshot.png");
  }

  if (message.text.includes("finaller") || message.text.includes("Finaller")) {
    let arrayofFinaller = [
      "abi işte finaller olmasa",
      "finaller abi finaller çok kötü",
      "her gün partiliyor olurduk finaller olmasa",
      "ah şu finaller",
      "finaller bitince halledelim o zaman",
      "şu finaller bitsin boştayız",
    ];
    let randomNum = Math.trunc(Math.random() * arrayofFinaller.length);
    let str = arrayofFinaller[randomNum];
    bot.sendMessage(chatid, `${str}`);
  }

  if (message.from.id == 1594187328) {
    let dateString = moment.unix(message.date).format("DD-MM-YYYY h:mm:ss");
    fs.appendFile(
      "selim.txt",
      `${dateString} - ${message.text}`,
      function (err, data) {
        if (err) return err;
      }
    );
    fs.appendFile("selim.txt", "\r\n", function (err, data) {
      if (err) return err;
    });
  }

  if (message.text.toLowerCase() == "selim ne yazdı") {
    readLastLines.read("selim.txt", 10).then(function (lines) {
      let data = lines;
      bot.sendMessage(chatid, data);
    });
  }

  if (message.text == "lanet olsun") {
    bot.sendMessage(
      chatid,
      "burada yaşayan en güçlü ve en zeki erkekleri görüyorum. bu potansiyeli görüyorum ve hepsi heba oluyor. lanet olsun, bütün bir nesil benzin pompalıyor, garsonluk yapıyor, ya da beyaz yakalı köle olmuş. reklamlar yüzünden araba ve kıyafet peşinde. nefret ettiğimiz işlerde çalışıp gereksiz şeyler alıyoruz. Bizler tarihin ortanca çocuklarıyız. bir amacımız ya da yerimiz yok, ne büyük savaşı yaşadık ne de büyük buhranı. bizim savaşımız ruhani bir savaş, en büyük buhranımız hayatlarımız. televizyonla büyürken, milyoner film yıldızı ya da rock yıldızı olacağımıza inandık, ama olmayacağız. bunu yavaş yavaş öğreniyoruz ve o yüzden çok çok kızgınız."
    );
  }
});
