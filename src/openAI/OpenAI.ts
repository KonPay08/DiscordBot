import { Configuration, OpenAIApi } from "openai";
import config from "config";
export class OpenAI {
  #API: OpenAIApi;
  constructor() {
    const apiConfig = new Configuration({
      apiKey: config.get("OPEN_AI_API_SECRET"),
  });
  this.#API = new OpenAIApi(apiConfig);
  }
  async ListModels() {
    try {
      const response = await this.#API.listModels();
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async Generate(prompt: string, model: string = "text-davinci-003") {
    try {
      const res = await this.#API.createCompletion({ model, prompt, max_tokens: 2000 });
      return res.data.choices[0].text ?? "";
    } catch(error) {
      throw error;
    }
  }
}
