export const GENERATE_SCRIPT_PROMPT = `Topic: {topic}
Generate 3 different 30-second video scripts based on the user topic. Each script should be provided in JSON format with the following structure:
[
    {
        "content": "Script content for video 1 goes here..."
    },
    {
        "content": "Script content for video 2 goes here..."
    },
    {
        "content": "Script content for video 3 goes here..."
    }
]
Ensure the scripts are unique, concise, and suitable for a 30-second video.`;