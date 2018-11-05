# PFGEN
-----
## What is it?
PFGEN is a Pathfinder RPG-based character background details generator. It is intended to help automate the process of randomly rolling for various details and events found [here](https://www.d20pfsrd.com/basics-ability-scores/more-character-options/character-backgrounds/background-generator/) (d20PFSRD). It is designed to be able to be expanded upon (more races, class backgrounds, events, etc.) and to be able to eventually merge into a web-based character sheet.

## What tools are used?
Express is used to serve the form, as well as (in the future) respond to API requests. MongoDB is used for the storage of the various character generation tables and race/class data. Bootstrap is used for the frontend to provide basic styling, and jQuery performs the fetch requests from the API. A custom algorithm to determine weighted probabilities is used for selecting between likely/less-likely random results, and is not limited by percentile chances (thus, adding custom entries to existing tables do not need to recalculate probabilities).

## What is currently supported?
The form/page currently supports the core races:
 - [x] Dwarf
 - [x] Elf
 - [x] Gnome
 - [x] Half-elf
 - [x] Half-orc
 - [x] Halfling
 - [x] Human
 
 Basic support is included for the following core and base classes:
 - [x] Alchemist
 - [x] Barbarian
 - [x] Bard
 - [x] Cavalier
 - [x] Cleric
 - [x] Druid
 - [x] Fighter
 - [x] Gunslinger
 - [x] Inquisitor
 - [x] Magus
 - [x] Monk
 - [x] Oracle
 - [x] Paladin
 - [x] Ranger
 - [x] Rogue
 - [x] Sorceror
 - [x] Summoner
 - [x] Witch
 - [x] Wizard
 
 Other races and classes are planned in the future.
 
 ## How do I use it?
 Currently, the code here does not contain the database schemas yet, as the project was originally designed to be used locally with my own gaming group. I have planned to add those, along with an initialization script, to be added at a future date (thus, allowing others to clone and run this). Once this is done, this section will be updated to provide instruction on how to clone, initialize and run the server.
 
 ## What's planned for the future?
 First, my goal for this project is to remove the dependency on my local server by saving the data into a file that will be imported on the first run. I plan to refactor the code and shift the processing to the backend. I also plan to save character entries and allow import/export functionality. I'm currently building a character sheet tracker that will be able to import the data from this.