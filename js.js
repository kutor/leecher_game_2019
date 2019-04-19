

// CACHE DOCUMENT ELEMENTS

const divMapName = document.getElementById("map_name");
const divLeftText = document.getElementById("left_text");
const divRightMenu = document.getElementById("right_menu");
const menuParty = document.getElementById("menu_subdivs_party");
const menuPeople = document.getElementById("menu_subdivs_people");
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
        abilityName: "",
        abilityFunction: function(){
            
        }
    },
]

let enemies = [
    {
        enemyName: "",
        enemyDescription: "",
        enemyHp: 0,
        enemyAttack: [10, 20]
    },
];

let items = [
    {
        itemName: "test item 1",
        itemDescription: "test item 1 description blah",
        itemUseable: true,
        itemUseFunction: function(){
            
        }
    },
];

let maps = [
    {
        mapName: "TEST MAP NAME",
        mapMusic: null,
        mapArriveText: "Test map arrive text. Lets make this long to see how it behaves in a multi-line setting. Lorem ipsum dolor sit amet.",
        mapArriveEvent: function(){
			console.log("arrived at " + this.mapName);
		},
        mapMenu: {
            personsAtPlace: [
                {
                    personName: "Person1",
                    personDescription: "Person1 Desc lets make this long to see how it behaves in a multi-line setting. Lorem ipsum dolor sit amet.",
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
                        console.log("test function for PoI")
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
    currentMap: null,
    party: [characters[0]],
    inventory: [items[0]],
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

writeText("asdf");

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

})}

//LOAD MAP
const loadMap = () => {

}



// INITIALIZE GAME
loadParty();
loadInventory();
