/*
LEECHER GAME 2019
MADE BY KUTOR
v1.0
*/

//CACHE DOM ELEMENTS

const divMapName = document.getElementById("map_name");
const divLeftText = document.getElementById("left_text");
const divRightMenu = document.getElementById("right_menu");
const menuParty = document.getElementById("menu_subdivs_party");
const menuPeople = document.getElementById("menu_subdivs_people");
const menuPoi = document.getElementById("menu_subdivs_poi");
const menuInventory = document.getElementById("menu_subdivs_inventory");
const menuPlacesToGo = document.getElementById("menu_subdivs_placestogo");


let saveGame;
let autoSaveGame;

//MUSIC
const musicDefault = new Audio("");

let characters = [
    {
        name: "test char 1",
        description: "description for character number one",
        hp:[100,100],
        mana: [80, 80],
        fight: [10, 20],
        abilities: null,
    },
];

let abilities = [
    {
        abilityName: "ability1",
        abilityFunction: function(){
            console.log("used ability01");
        }
    },
];

let enemies = [
    {
        enemyName: "enemy01",
        enemyDescription: "desc for enemy01",
        enemyHp: 10,
        enemyAttack: [10, 20]
    },
];

let items = [
    {
        itemName: "test item 1",
        itemDescription: "test item 1 description blah",
        itemUseFunction: function(){
            console.log("used item01");
        }
    },
    {
        itemName: "test item 2",
        itemDescription: "test item 2 description blah",
    },
];

let maps = [
    {
        mapName: "TEST MAP NAME",
        mapMusic: null,
        mapArriveText: "Test map arrive text. Lets make this long to see how it behaves in a multi-line setting. Lorem ipsum dolor sit amet.",
        mapArriveEvent: function(){
			writeText(`arrived at ${this.mapName}`);
		},
        mapMenu: {
            personsAtPlace: [
                {
                    personName: "Person1",
                    personDescription: "Person1 Desc. Lorem ipsum dolor sit amet.",
                    personTalk: ["BESZÉLEK VELE", "", ""],
                    personRomance: ["KIKEZDEK VELE", "", ""],
                }
            ],
            searched: false,
            searchText: ["KERESEK", ""],
            searchFind: function(){
                console.log("searchTempText")
            },
            pointsOfInterest: [
                {
                    poiName: "Point Of Interest Number One",
                    poiText: "Test Text for PoI number ONE, lets make this long to see how it behaves in a multi-line setting. Lorem ipsum dolor sit amet.",
                    poiEvent: function(){
                        console.log("poi event");
                    },
                }
            ],
            placesToGo: [
                "PTG1",
                "PTG2"
            ]
        },
    },
];

//CURRENT STATE OF CHARACTERS, MAPS AND STUFF

var CURRENT_STATE = {
    currentMap: maps[0],
    party: [characters[0]],
    inventory: [items[0], items[1]],
}

// --------------------------------------------------------------------------

// FUNCTIONS

// MAKE ITEMS NOT CLICKABLE WHEN YOU HAVE TO MAKE A CHOICE
const unclickable = () => {
	divRightMenu.style.pointerEvents = "none";
}

const reclickable = () => {
	divRightMenu.style.pointerEvents = "auto";
}

// TEXT EVENTS
const writeText = (text) => {
    let currentText = document.createElement("div");
    currentText.classList += "eventText textToOrder";
    currentText.appendChild(document.createTextNode(text));
    divLeftText.appendChild(currentText);
}


//LOAD PARTY
const loadParty = () => {CURRENT_STATE.party.map((member) => {
    let currentMember = document.createElement("div");
    currentMember.classList += "party_member menu_subsubdivs";

    let currentSpan = document.createElement("span");
    currentSpan.appendChild(document.createTextNode(member.name));
    currentMember.appendChild(currentSpan);
    currentMember.appendChild(document.createElement("br"));
    currentSpan = document.createElement("em");
    currentSpan.appendChild(document.createTextNode(member.description));
    currentMember.appendChild(currentSpan);
    let currentDetails = document.createElement("div");
    currentDetails.classList += "details";

    currentMember.appendChild(document.createElement("br"));
    currentSpan = document.createElement("span");
    currentSpan.appendChild(document.createTextNode(`HP: ${member.hp[0]}/${member.hp[1]}`));
    currentDetails.appendChild(currentSpan);
    currentSpan = document.createElement("span");
    currentSpan.appendChild(document.createTextNode(`Mana: ${member.mana[0]}/${member.mana[1]}`));
    currentDetails.appendChild(currentSpan);
    currentSpan = document.createElement("span");
    currentSpan.appendChild(document.createTextNode(`Harc: ${member.fight[0]}-${member.fight[1]}`));
    currentDetails.appendChild(currentSpan);

    currentMember.appendChild(currentDetails);

    menuParty.appendChild(currentMember);
})}

//LOAD INVENTORY
const loadInventory = () => {CURRENT_STATE.inventory.map((item) => {
    let currentItem = document.createElement("div");
    currentItem.classList += "menu_subsubdivs item";

    let currentSpan = document.createElement("span");
    currentSpan.appendChild(document.createTextNode(item.itemName));
    currentItem.appendChild(currentSpan);
    currentItem.appendChild(document.createElement("br"));
    currentSpan = document.createElement("em");
    currentSpan.appendChild(document.createTextNode(item.itemDescription));
    currentItem.appendChild(currentSpan);
    currentItem.appendChild(document.createElement("br"));

    if(item.hasOwnProperty("itemUseFunction")){
        currentSpan = document.createElement("span");
        currentSpan.classList += "button clickable";
        currentSpan.appendChild(document.createTextNode("HASZNÁLAT"));
        currentItem.appendChild(currentSpan);
    };
    menuInventory.appendChild(currentItem);
})}

//LOAD MAP
const loadMap = (currentMap) => {
    
    // SAVE CURRENT MAP STATE TO MAPS ARRAY BEFORE LOADING NEW ONE
	for (i = 0; i < maps.length; i++) {
		if (maps[i].mapName == CURRENT_STATE.currentMap.mapName) {
			maps[i] = CURRENT_STATE.currentMap;
		}
	}

	// CLEAR PREVIOUS MAP 
	CURRENT_STATE.currentMap = undefined;
	menuPeople.innerHTML = "";
	menuPoi.innerHTML = "";
	menuPlacesToGo.innerHTML = "";

	// LOAD
	CURRENT_STATE.currentMap = currentMap;

    // TITLE AND TEXT
    currentStuff = document.createElement("h1");
    currentStuff.appendChild(document.createTextNode(CURRENT_STATE.currentMap.mapName));
    divMapName.appendChild(currentStuff);

    currentStuff = document.createElement("p");
    currentStuff.appendChild(document.createTextNode(CURRENT_STATE.currentMap.mapArriveText));
    divLeftText.appendChild(currentStuff);
    console.log(CURRENT_STATE.currentMap.personsAtPlace);
    
    //PEOPLE AT MAP
    CURRENT_STATE.currentMap.mapMenu.personsAtPlace.map((person => {
        let currentPerson = document.createElement("div");
        currentPerson.appendChild(document.createTextNode(person.personName));
        currentPerson.appendChild(document.createElement("br"));
        let currentStuff = document.createElement("em");
        currentStuff.appendChild(document.createTextNode(person.personDescription));
        currentPerson.appendChild(currentStuff);
        currentPerson.appendChild(document.createElement("br"));
        menuPeople.appendChild(currentPerson);
        let personButtonArea = document.createElement("div");
        personButtonArea.classList += "person_buttons";
        currentPerson.appendChild(personButtonArea);

        if(person.hasOwnProperty("personTalk")){
            let currentButton = document.createElement("div");
            currentButton.classList += "clickable";
            currentButton.appendChild(document.createTextNode(person.personTalk[0]));
            currentButton.id=`talk_${person.personName}`;
            personButtonArea.appendChild(currentButton);
        }
        if(person.hasOwnProperty("personRomance")){
            let currentButton = document.createElement("div");
            currentButton.classList += "clickable";
            currentButton.appendChild(document.createTextNode(person.personRomance[0]))
            currentButton.id=`romance_${person.personName}`;
            personButtonArea.appendChild(currentButton);
        }
    }))

    //POINTS OF INTEREST
    CURRENT_STATE.currentMap.mapMenu.pointsOfInterest.map((poi => {
        let currentPoi = document.createElement("div");
        currentPoi.appendChild(document.createTextNode(poi.poiName));
        currentPoi.classList += "clickable";
        currentPoi.id = `poi_${poi.poiName}`;
        menuPoi.appendChild(currentPoi);
    }))

    //PLACES TO GO
    CURRENT_STATE.currentMap.mapMenu.placesToGo.map((ptg => {
        let currentPTG = document.createElement("div");
        currentPTG.appendChild(document.createTextNode(ptg.toString()));
        currentPTG.classList += "clickable";
        currentPTG.id = `ptg_${ptg}`;
        menuPlacesToGo.appendChild(currentPTG);
    }))




}



// INITIALIZE GAME
loadParty();
loadInventory();
loadMap(maps[0  ]);
