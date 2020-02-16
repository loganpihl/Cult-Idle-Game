// Made by Bandit (#2883 on discord, @banditocappy on twitter)
// Created on 11 Feb 2020
//I'm making an incremental game with a tech tree. That's all I got so far.

// ------------------------------------------------------------------------------
// Journal:
// 11 Feb: Brainstorming
/* 13 Feb: General idea obtained, time to code basic stuff, switching to JS/HTML
- switched to JS/HTML; page set up very simplified; need to code, ya know, everything
- kinda working while learning HTML/CSS/JS interaction, so whoops
/shrug
*/
/* 14 Feb: Re-did the site design, looks better for sure
- coded the price and amount displaying, programmed buttons
*/
// To-do:
/*
- fix the price coefficient calculation, have it display properly
- allow the description to be minimized after being displayed
- make site look pretty
- code resource gathering, purchasing buildings
- code different tabs of the game
- continue learning how tf to use JS/CSS/HTML together
*/

// Ideas:
// Create a main tab
// Unveiling resources, buildings, sciences, upgrades over time
// Brutal difficulty, options to progress
// Lineage tree, with different routes to succeed in the game with
    // One that focuses on prosperity and trade
    // One that focuses on scientific advancement and resource gathering
    // One that focuses on agriculture
/* Each lineage will have unique resources and buildings, some being saved
       over resets, so in order to get further in one lineage you may need
       resources from another. */
// Keep numbers small for as long as possible
/* Land, expansion, war mechanics to obtain particular resources only located
   on different parts of the continent */
// Cult Simulator??!
// -------------------------------------------------------------------------------
// ----------------------------------COLLAPSIBLES---------------------------------
// ----------------------------------DEFINITIONS----------------------------------
let price_coeff = 1.12;
let prestige = true;
// insert if statement here when necessary (prestige affecting price coefficients)
// -----------------------------------BUILDINGS-----------------------------------
let temple = {
  name: 'temple',
  price: 10,
  amount: 0,
  desc: 'a basic gathering ground for cult members',
  effect: 'generates .5 praise every second',
};

function updateBuilding(x) {
	if (x==1) {
    	temple.amount++;
      let tempPrice = Math.round(1000*(Math.pow(price_coeff,temple.amount)));
    	temple.price = tempPrice/100;
	};
};
/* pseudocode:
if user clicks on temple buy button AND user has enough resources:
    spend (price) amount of certain resource (ill figure it out, maybe just money?)
elif user clicks on buy AND user doesn't have enough resources:
    print not enough resources */

// -------------------------------MAIN MENU FUNCTION------------------------------
// Figure out how to code between JS/HTML
