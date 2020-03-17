// Made by Bandit (#2883 on discord, @banditocappy on twitter)
// Created on 11 Feb 2020
//I'm making an incremental game with a tech tree. That's all I got so far.

// ----------------------------------DEFINITIONS----------------------------------
const e = 2.7182818285;
let price_coeff = 1.12;
let prestige = true;
let cultistsUnlock=false;
let transUnlock = false;
let stoneUnlock = false;
let oreUnlock = false;
let furnaceUnlock = false;
let charcoalUnlock = false;
let smelteryUnlock = false;
let ironUnlock = false;
let copperUnlock = false;
let tinUnlock = false;
// insert if statement here when necessary (prestige affecting price coefficients)

//------------------------------------RESOURCES-----------------------------------
//population
let cultists = 0;
let cultistCap = 0;
//basic materials
let praise = 0;
let wood = 10;
let woodCap = 50;
let stone = 0;
let stoneCap = 50;
let ore = 0;
let oreCap = 25;
let charcoal = 0;
let charcoalCap = 50;
let iron = 0;
let ironCap = 10;
let copper = 0;
let copperCap = 10;
let tin = 0;
let tinCap = 10;
let furnaceCharge = 0;

let totalPraise = 0;

// -----------------------------------BUILDINGS-----------------------------------
let temple = {
  name: 'temple',
  price: 10,
  amount: 0,
  desc: 'a basic gathering ground for cult members',
  effect: 'gives a cultist slot per rank, allowing for 0.5 praise per second',
};

let furnace = {
  name: 'furnace',
  price: 10,
  amount: 0,
  desc: 'something to keep your cultists warm',
  effect: 'allows for further transmuting, thanks to the power of fire<br>allows for smelting of certain materials<br>every level increases yield of smelted items by a diminishing amount',
  yield: 0,
};

function updateBuilding(x) {
  // which building is it?
  switch(x) {
    // temple
    case "temple":
      // increase amount and cultist cap, as well as update cultist cap on html
      temple.amount++;
      cultistCap++;
      if (temple.amount>=1 && cultistsUnlock==false) {
        cultistsUnlock==true;
        document.getElementById("populationTab").hidden = false;
        document.getElementById("cultists").innerHTML = "cultists: " + cultists + "/" + cultistCap;
      } else if (cultistsUnlock==true) {
        document.getElementById("cultists").innerHTML = "cultists: " + cultists + "/" + cultistCap;
      };
      // update price
      temple.price = (Math.round(1000*(Math.pow(price_coeff,temple.amount*(2*price_coeff))*temple.amount)))/100;
      break;
    case "furnace":
      // increase amount and cultist cap, as well as update cultist cap on html
      furnace.amount++;
      // update price
      furnace.price = (Math.round(1000*(Math.pow(price_coeff,furnace.amount*(3*price_coeff))*furnace.amount)))/100;
      if (furnace.amount>1) {
        furnace.yield = furnace.yield+(1-(Math.pow(e,(-.5/furnace.amount))));
      };
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
  } else if (x=="furnace" && stone>=furnace.price) {
    // update resource amount and run the next function
    stone = stone-furnace.price;
    updateBuilding(x);
  };
};

// --------------------------TRANSMUTATION/FURNACE--------------------------
function transmutation(x,y,z) {
  let oreGained = 0;
  if (x=="praise") {
    if(praise>=z) {
      switch(y) {
        // praise to wood
        case "p2wx1":
          if(wood+1>=woodCap) {
            praise=praise-(woodCap-wood);
            wood=woodCap;
            amt=z;
          } else {
            wood++;
            praise--;
            amt++;
          };
          break;
        case "p2wx10":
          if(wood+10>=woodCap) {
            praise=praise-(woodCap-wood);
            wood=woodCap;
          } else {
            wood=wood+10;
            praise=praise-10;
          };
          break;
        case "p2wx100":
          if(wood+100>=woodCap) {
            praise=praise-(woodCap-wood);
            wood=woodCap;
          } else {
            wood=wood+100;
            praise=praise-100;
          };
          break;
        case "p2wMAX":
          if(wood+praise>=woodCap) {
            praise=praise-(woodCap-wood);
            wood=woodCap;
          } else {
            wood=wood+praise;
            praise=0;
          };
          break;
        // praise to stone
        case "p2sx1":
        case "p2sx10":
        case "p2sx100":
          for (i=0; i<(z/3); i++) {
            if (Math.random()<=.2) {
              if ((ore+1)>=oreCap && stone+(z/3)<stoneCap) {
                oreGained=oreGained+(oreCap-ore);
                ore=oreCap;
              } else if (stone+(z/3)<stoneCap) {
                ore++;
                oreGained++;
              };
            };
          };
          if(stone+(z/3)>=stoneCap) {
            praise=praise-(3*(stoneCap-stone));
            stone=stoneCap-oreGained;
          } else {
            stone=(stone+(z/3))-oreGained;
            praise=praise-z;
          };
          break;
      case "p2sMAX":
        for (i=0; i<(z/3); i=i+.01) {
          if (Math.random()<=.2) {
            if (ore+.01>=oreCap && stone+.01<stoneCap) {
              oreGained=oreGained+(oreCap-ore);
              ore=oreCap;
            } else if (stone+.01<stoneCap) {
              ore=ore+.01;
              oreGained=oreGained+.01;
            };
          };
        };
        if(stone+(z/3)>=stoneCap) {
          praise=praise-(3*(stoneCap-stone));
          stone=stoneCap;
        } else {
          stone=(stone+(z/3))-oreGained;
          praise=0;
        };
        break;
      default:
        break;
      };
    };
  } else if (x=="wood") {
    if (wood>=z) {
      switch(y) {
        // wood to charcoal
        case "w2cx1":
          if (charcoal+(1+furnace.yield)>=charcoalCap) {
            wood=wood-(charcoalCap-charcoal);
            charcoal=charcoalCap;
          } else {
            charcoal=charcoal+1+furnace.yield;
            wood--;
          }
          break;
        case "w2cx10":
          if (charcoal+10+(10*furnace.yield)>=charcoalCap) {
            wood=wood-(charcoalCap-charcoal);
            charcoal=charcoalCap;
          } else {
            charcoal=charcoal+10+(10*furnace.yield);
            wood=wood-10;
          }
          break;
        case "w2cx100":
          if (charcoal+100+(100*furnace.yield)>=charcoalCap) {
            wood=wood-(charcoalCap-charcoal);
            charcoal=charcoalCap;
          } else {
            charcoal=charcoal+100+(100*furnace.yield);
            wood=wood-100;
          }
          break;
        case "w2cMAX":
          if (charcoal+wood+(wood*furnace.yield)>=charcoalCap) {
            wood=wood-(charcoalCap-charcoal);
            charcoal=charcoalCap;
          } else {
            charcoal=charcoal+wood+(wood*furnace.yield);
            wood=0;
          }
          break;
        default:
          break;
      };
    };
  };
};

function lightFurnace(x) {
  if (charcoal>=x) {
    if (charcoal-x<0) {
      furnaceCharge=furnaceCharge+charcoal;
      charcoal=0;
    } else {
      furnaceCharge=furnaceCharge+x;
      charcoal=charcoal-x;
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
  if (furnaceUnlock==false) {
    if (stone>=10) {
      furnaceUnlock=true;
      document.getElementById("furnace").hidden = false;
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
  stone = Math.round(stone*100)/100;
  charcoal = Math.round(charcoal*100)/100;
  ore = Math.round(ore*100)/100;
  if (wood>=woodCap) {
    wood=woodCap;
  };
  if (stone>=stoneCap) {
    stone=stoneCap;
  };
  if (charcoal>=charcoalCap) {
    charcoal=charcoalCap;
  };
  if (ore>=oreCap) {
    ore=oreCap;
  };
  document.getElementById("praise").innerHTML = "praise: " + praise;
  document.getElementById("wood").innerHTML = "wood: " + wood + "/" + woodCap;
  if (stoneUnlock == false && stone>0) {
    stoneUnlock = true;
    document.getElementById("stone").hidden = false;
    document.getElementById("stone").innerHTML = "stone: " + stone + "/" + stoneCap;
  } else if (stoneUnlock == true) {
    document.getElementById("stone").innerHTML = "stone: " + stone + "/" + stoneCap;
  };
  if (oreUnlock == false && ore>0) {
    oreUnlock = true;
    document.getElementById("ore").hidden = false;
    document.getElementById("ore").innerHTML = "ore: " + ore + "/" + oreCap;
  } else if (oreUnlock == true) {
    document.getElementById("ore").innerHTML = "ore: " + ore + "/" + oreCap;
  };
  if (smelteryUnlock == false && furnace.amount > 0) {
    smelteryUnlock = true;
    document.getElementById("woodTrans").hidden = false;
    document.getElementById("smelteryTrans").hidden = false;
  };
  if (charcoalUnlock == false && charcoal>0) {
    charcoalUnlock = true;
    document.getElementById("charcoal").hidden = false;
    document.getElementById("charcoal").innerHTML = "charcoal: " + charcoal + "/" + charcoalCap;
  } else if (charcoalUnlock == true) {
    document.getElementById("charcoal").innerHTML = "charcoal: " + charcoal + "/" + charcoalCap;
  };
  document.getElementById("praiseTrans").innerHTML = "available praise:<br>" + praise;
  document.getElementById("displayTotalPraise").innerHTML = "total praise: " + totalPraise;
  document.getElementById("woodTrans").innerHTML = "available wood:<br>" + wood;
  if (furnaceCharge == 1) {
    document.getElementById("smelteryTrans").innerHTML = "smeltery<br>" + furnaceCharge + " charge";
  } else {
    document.getElementById("smelteryTrans").innerHTML = "smeltery<br>" + furnaceCharge + " charges";
  };
  document.getElementById("w2cCreate-main").innerHTML = "charcoal<br>1:" + (Math.round((100*(1+furnace.yield)))/100) + " transmutation";
},100);
