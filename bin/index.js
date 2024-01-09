#! /usr/bin/env node

const axios = require('axios');
const yargs = require('yargs');
const {config} = require('../config')

const allTypes = {"urgent": "standard", "professional": "fluent", "creative": "creative"}


// function to get the desired paraphrased result
function paraphraseCode(prompt, type) {
    if (prompt.length == 0) {
        console.error('Please enter a valid sentence.')
        process.exit(1)
    }
    if (!allTypes[type]) {
        console.error("Please enter a valid type of parapharsing.")
        console.info("Valid types are : (1) urgent (2) professional (3) creative")
        process.exit(1)
    }
    axios.post(
        config.paraphraseApiEndpoint,
        {
            "text": "This is a sample sentence to test out the paraphrasing tool.",
            "mode": allTypes[type]},
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
        )
        .then((response) => {
        console.log('Paraphrased text :');
        console.log(response.data.data[0]);
    })
    .catch((error) => {
        console.error(`Error communicating with OpenAI API: ${error.message}`);
    });
}

// command to paraphrase the prompt
yargs.command({
    command: 'paraphrase',
    describe: 'Paraphrases the prompt to the desired type',
    builder: {
        type : {
            describe: "Type of the paraphrasing. Options : (1) urgent (2) professional (3) creative",
            demandOption: true,
            type: 'string'
        },
        prompt: {
            describe: 'Prompt which needs to be paraphrased.',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        paraphraseCode(argv.prompt, argv.type);
    }
    })
    .demandCommand(1, 'Please provide a valid command.')
    .help()
    .argv;