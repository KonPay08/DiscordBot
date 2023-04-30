import config from "config";
import { OpenAI } from "~/src/openAI/OpenAI";

test("chat", async () => {
  if (config.get("OPEN_AI_API_SECRET") === "") return;
  const openAI = new OpenAI();
  console.log(await openAI.Generate("最近話題のニュース。"));
}, 10000 * 10);
