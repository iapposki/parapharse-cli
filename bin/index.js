#! /usr/bin/env node

import axios from "axios";
import yargs from "yargs";
import {hideBin} from "yargs/helpers";
import config from '../config/index.js'

const allTypes = {"urgent": "standard", "professional": "fluent", "creative": "creative"}


// function to get the desired paraphrased result
export const paraphraseCode = async (prompt, type) => {
    if (prompt.length == 0) {
        return "Error-001: Valid prompt not provided."
    }
    if (!allTypes[type]) {
        return "Error-002: Valid type not provided. Valid types are : (1) urgent (2) professional (3) creative"
    }
    try {
        const resp = await axios.post(
            config.paraphraseApiEndpoint,
            {
                "text": "This is a sample sentence to test out the paraphrasing tool.",
                "mode": allTypes[type]},
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        return `Paraphrased text : ${resp.data.data[0]}`
    } catch (error) {
        return `Error-003: Error communicating with API. ${error.message}`
    }
}

// command to paraphrase the prompt
yargs(hideBin(process.argv)).command({
    command: 'paraphrase',
    describe: 'Paraphrases the prompt to the desired type',
    builder: {
        type : {
            describe: "Type of the paraphrasing. Options : (1) urgent (2) professional (3) creative",
            demandOption: true,
            type: 'string',
            alias: 't',
        },
        prompt: {
            describe: 'Prompt which needs to be paraphrased.',
            demandOption: true,
            type: 'string',
            alias: 'p',
        }
    },
    handler: async (argv) => {
        const resp = await paraphraseCode(argv.prompt, argv.type);
        console.log(resp)
    }
    })
    .demandCommand(1, 'Please provide a valid command.')
    .help()
    .argv;
