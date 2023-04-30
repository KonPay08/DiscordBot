import config from "config";
import { DiscordBot } from "~/src/discord/Discord";
import { OpenAIHandler } from "~/src/openAI/OpenAI.api.handler";

(async () => {
  if (config.get("OPEN_AI_API_SECRET") === "") return;
  const apiHandler = new OpenAIHandler();
  const bot = new DiscordBot(apiHandler);
  bot.start();
})();
