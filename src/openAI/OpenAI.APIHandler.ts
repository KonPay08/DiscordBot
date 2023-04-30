import { OpenAI } from "~/src/openAI/OpenAI";
import { APIHandler } from "~/src/api/APIHandler";

export class OpenAI_APIHandler extends APIHandler {
  #openAI: OpenAI;
  constructor() {
    super();
    this.#openAI = new OpenAI();
  }
  async generateResponse(input: string): Promise<string> {
    try {
      const prompt = `Q: ${input}\nA: `;
      const response = await this.#openAI.Generate(prompt);
      const answer = response.split("\n")[0].slice(3).trim();
      console.log(`Question: ${prompt}`);
      console.log(`Answer: ${answer}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
