import axios from "axios"

export async function getThreadList(sessToken) {
    const res = await axios.get('https://api.openai.com/v1/threads?limit=100', {headers: {"Authorization": `Bearer ${sessToken}`, "OpenAI-Beta": "assistants=v1"}})
    return res
}
