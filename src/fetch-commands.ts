/**
 * Simple random reply chatbot for twitch and discord. 
 * Copyright (C) 2021  RodrigoDornelles
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
            yaml[main].aliases?.forEach((alias:string) => {
                allCommands[alias] = yaml[main].replies;
            });
        });
    });
    return allCommands;
};