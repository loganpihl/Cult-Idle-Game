// Made by Bandit (#2883 on discord, @banditocappy on twitter)
// Created on 11 Feb 2020
//I'm making an incremental game with a tech tree. That's all I got so far.

// -------------------------------------------------------------------------------
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
// ----------------------------------DEFINITIONS----------------------------------
let price_coeff = 1.12;
let prestige = true;
let transUnlock = false;
// insert if statement here when necessary (prestige affecting price coefficients)

//------------------------------------RESOURCES-----------------------------------
//population
let cultists = 0;
let cultistCap = 0;
//basic materials
let wood = 10;
let praise = 10;
let totalPraise = 10;

// -----------------------------------BUILDINGS-----------------------------------
let temple = {
  name: 'temple',
  price: 10,
  amount: 0,
  desc: 'a basic gathering ground for cult members',
  effect: 'gives a cultist slot per rank, allowing for 0.5 praise per second',
};

function updateBuilding(x) {
  // which building is it?
  switch(x) {
    // temple
    case "temple":
      // increase amount and cultist cap, as well as update cultist cap on html
      temple.amount++;
      cultistCap++;
      if (temple.amount>=1) {
        document.getElementById("cultists").hidden = false;
        document.getElementById("cultists").innerHTML = "cultists: " + cultists + "/" + cultistCap;
      };
      // update price
      temple.price = (Math.round(1000*(Math.pow(price_coeff,temple.amount*temple.amount))))/100;
      break;
    default:
      break;
  };
};

function purchaseBuilding(x) {
  // which building? enough resources?
  if (x=="temple" && wood>=temple.price) {
    // update resource amount and run the next function
    wood = wood-temple.price;
    updateBuilding(x);
  };
};

// --------------------------TRANSMUTATION/MANIFESTATION--------------------------
function transmutation(x,y,z) {
  if (x=="praise") {
    if(praise>=z) {
      switch(y) {
        case "woodx1":
          wood++;
          praise--;
          break;
        case "woodx10":
          wood=wood+10;
          praise=praise-10;
          break;
        case "woodx100":
          wood=wood+100;
          praise=praise-100;
          break;
        case "woodMAX":
          wood=wood+praise;
          praise=praise-praise;
          break;
        default:
          break;
      };
    };
  };
};

// ----------------------------------TAB FUNCTIONS--------------------------------
function openManageTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("managetabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("managetablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  //ty w3schools
}

function openTransTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("transtabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("transtablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
  //ty w3schools
}

function openGameTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("gametabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("gametablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

}
  //ty w3schools

// ---------------------------------TICK FUNCTIONS--------------------------------
window.setInterval(function() {
  // is transmutation unlocked? if not, check for >10 praise and unlock if so
  if (transUnlock==false) {
    if (praise>=10) {
      transUnlock=true;
      document.getElementById("transTab").hidden = false;
    };
  };
  // are cultists at max capacity? if not, 1/20 chance per .1 second
  if (cultists<cultistCap) {
    if (Math.random()<=.05) {
      cultists++;
      document.getElementById("cultists").innerHTML = "cultists: " + cultists + "/" + cultistCap;
    };
  };
  // update incrementing resources
  praise = (Math.round(100*(praise+(cultists*.5)/10)))/100;
  totalPraise = (Math.round(100*(totalPraise+(cultists*.5)/10)))/100;
  wood = Math.round(wood*100)/100;
  document.getElementById("wood").innerHTML = "wood: " + wood;
  document.getElementById("praise").innerHTML = "praise: " + praise;
  document.getElementById("praiseTrans").innerHTML = "available praise: " + praise;
  document.getElementById("totalPraise").innerHTML = "total praise: " + totalPraise;
},100);
