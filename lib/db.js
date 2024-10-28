const username = process.env.NEXT_PUBLIC_USERNAME;
const password = process.env.NEXT_PUBLIC_PASSWORD;
export const connectionSrt = `mongodb+srv://${username}:${password}@cluster0.atr3y.mongodb.net/smiudb?retryWrites=true&w=majority&appName=Cluster0`;
