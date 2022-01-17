const telegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const puppeteer = require("puppeteer");

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
  if (message.from.id == 1106794749) {
    let chatid = message.chat.id;

    bot.sendMessage(chatid, "aynn");
  }
  if (
    message.text == "sa" ||
    message.text == "selamun aleyküm" ||
    message.text == "Sa" ||
    message.text == "SA"
  ) {
    let chatid = message.chat.id;

    bot.sendMessage(chatid, "aleyküm selam kardeşim hoş geldin");
  }

  if (message.text == "yemek") {
    run();
    let chatid = message.chat.id;
    bot.sendPhoto(chatid, "screenshot.png");
  }
});
