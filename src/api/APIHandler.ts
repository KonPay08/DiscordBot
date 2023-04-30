export abstract class APIHandler {
  abstract generateResponse(input: string): Promise<string>;
}
