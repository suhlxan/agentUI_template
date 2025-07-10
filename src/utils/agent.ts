export async function mockAgentResponse(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Echo: ${prompt}`);
    }, 500);
  });
}
