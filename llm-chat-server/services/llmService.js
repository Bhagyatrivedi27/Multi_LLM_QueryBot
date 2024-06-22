const axios = require('axios');

const callGPT3 = async (prompt) => {
    // const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
    //     prompt,
    //     max_tokens: 100,
    // }, {
    //     headers: {
    //         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //     }
    // });

    const response = "Response coming from GPT 3"

    return response;
};

const callGPT4 = async (prompt) => {
    // const response = await axios.post('https://api.openai.com/v1/engines/gpt-4/completions', {
    //     prompt,
    //     max_tokens: 100,
    // }, {
    //     headers: {
    //         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //     }
    // });
    const response = "Response coming from GPT 4"
    return response;
};

module.exports = {
    callGPT3,
    callGPT4,
};