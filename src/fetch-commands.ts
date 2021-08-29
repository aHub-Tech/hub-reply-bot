import fs from 'fs'
import YAML from 'yaml'

type commandList = {[key:string]:Array<string>};
type commandFile = {[key:string]:{aliases:Array<string>, replies:Array<string>}};

export default function fetchCommands(): commandList {
    const allCommands : commandList = {};

    fs.readdirSync('./commands').forEach((file:string) => {
        // parse yaml file
        const yaml : commandFile = YAML.parse(fs.readFileSync(`./commands/${file}`, 'utf8'));

        // iter through the yaml and add the commands to the array
        Object.keys(yaml).forEach((main:string) => {
            // add main command 
            allCommands[main] = yaml[main].replies;

            // add aliases for main command
            yaml[main].aliases.forEach((alias:string) => {
                allCommands[alias] = yaml[main].replies;
            });
        });
    });
    return allCommands;
};