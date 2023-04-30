import config from "config";
import { Client, Message, ClientOptions, GatewayIntentBits, TextChannel } from "discord.js";
import { APIHandler } from "~/src/api/APIHandler";

export class DiscordBot {
  #client: Client;
  #apiHandler: APIHandler;
  constructor(apiHandler: APIHandler) {
    const clientOptions: ClientOptions = {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    };
    this.#client = new Client(clientOptions);
    this.#apiHandler = apiHandler;
    this.#client.on("ready", () => {
      console.log(`Logged in as ${this.#client.user?.tag}!`);
    });
    this.#client.on("messageCreate", async (message: Message) => {
      const channel = message.channel;
      const guild = message.guild;
      if (guild && channel instanceof TextChannel && config.get<string>("TARGET_GUILD_CHANNEL_MAP")[guild.id] === channel.id) {
        await this.#handleMessage(message);
      }
    });
  }
  async #handleMessage(message: Message): Promise<void> {
    if (message.author.bot) return;
    const question = message.content.trim();
    if (question.length > 2000) {
      const excessCharacters = question.length - 2000;
      message.reply(`入力文字数が2000文字を超えています。${excessCharacters}文字削減してください。`);
      return;
    }
    try {
      const answer = await this.#apiHandler.generateResponse(question);
      message.reply(answer);
    } catch (error) {
      console.error(error);
      message.reply("Error occurred while processing your question.");
    }
  }
  async start(): Promise<void> {
    const discordToken = config.get<string>("DISCORD_BOT_TOKEN");
    await this.#client.login(discordToken);
  }
}
