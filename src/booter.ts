import config from "config";
import { DiscordBot } from "~/src/discord/Discord";
import { OpenAI_APIHandler } from "~/src/openAI/OpenAI.APIHandler";

(async () => {
  if (config.get("OPEN_AI_API_SECRET") === "") return;
  const apiHandler = new OpenAI_APIHandler();
  const bot = new DiscordBot(apiHandler);
  bot.start();
})();
