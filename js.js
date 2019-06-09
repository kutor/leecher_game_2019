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

let currentMusic;
let musicPlaying = true;

//MUSIC
const musicDefault = new Audio("music/music_test.ogg");

let characters = [
    {
        name: "test char 1",
        description: "description for character number one",
        hp:[100,100],
        mana: [80, 80],
        fight: [10, 20],
        ability: {
            abilityName: "ability1",
            abilityFunction: function(){
                console.log("used ability01");
            }
        },
        inParty: true,
    },
    {
        name: "test char 2",
        description: "description for character number one",
        hp:[100,100],
        fight: [10, 20],
        ability: null,
        inParty: false,
    },
    {
        name: "test char 3",
        description: "description for character number one",
        hp:[100,100],
        ability: null,
        inParty: false,
    },
    {
        name: "test char 4",
        description: "description for character number one",
        hp:[100,100],
        ability: null,
        inParty: false,
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
        itemId: 0,
        itemName: "test item 1",
        itemDescription: "test item 1 description blah",
        itemUseFunction: function(){
            console.log("used item01");
            removeFromInventory("test item 1");
        },
        itemUsed: 0,
        inInventory: true,
    },
    {
        itemId: 1,
        itemName: "test item 2",
        itemDescription: "test item 2 description blah",
        inInventory: false,
    },
];

let maps = [
    {
        mapName: "TEST MAP NAME",
        mapMusic: musicDefault,
        mapArriveText: "Test map arrive text. Lets make this long to see how it behaves in a multi-line setting. Lorem ipsum dolor sit amet.",
        mapArriveEvent: function(){
			console.log(`arrived at ${this.mapName}`);
		},
        mapMenu: {
            personsAtPlace: [
                {
                    personName: "Person 1",
                    personDescription: "Person1 Desc. Lorem ipsum dolor sit amet.",
                    personTalk: ["talk test 1", function(){writeText("TALKFUNCTION!")}, "talk test 2"],
                    personRomance: ["romance test 1", function(){writeText("ROMANCEFUNCTION!")}, "romance test 3 final"],
                    personTalkedTo: 0,
                    personRomanced: 0
                },
                {
                    personName: "Person2",
                    personDescription: "Person2 Desc.",
                    personTalk: ["", ""],
                    personRomance: ["", ""],
                    personTalkedTo: 0,
                    personRomanced: 0
                },
            ],
            pointsOfInterest: [
                {
                    poiName: "Keresek",
                    poiEvent: ["1", function(){writeText("thing")}, "3"],
                    poiDone: 0
                },
                {
                    poiName: "Point Of Interest Number One",
                    poiEvent: ["1", "2", "3", function(){writeText("POIFUNC")}, "4"],
                    poiDone: 0
                }
            ],
            placesToGo: [
                "PTG1",
                "PTG2"
            ]
        },
    },
    {
        mapName: "PTG1",
        mapMusic: musicDefault,
        mapArriveText: "Test map arrive text2.",
        mapArriveEvent: function(){
			removeFromInventory("test item 2");
		},
        mapMenu: {
            personsAtPlace: [
                {
                    personName: "Person 1",
                    personDescription: "Person1 Desc. Lorem ipsum dolor sit amet.",
                    personTalk: ["talk test 1", function(){writeText("TALKFUNCTION!")}, "talk test 2"],
                    personRomance: ["romance test 1", function(){writeText("ROMANCEFUNCTION!")}, "romance test 3 final"],
                    personTalkedTo: 0,
                    personRomanced: 0
                },
                {
                    personName: "Person2",
                    personDescription: "Person2 Desc.",
                    personTalk: ["", ""],
                    personRomance: ["", ""],
                    personTalkedTo: 0,
                    personRomanced: 0
                },
                {
                    personName: "Person 3",
                    personDescription: "Person2 Desc. Lorem ipsum dolor sit amet.",
                    personTalk: ["talk test 1", "talk test 2", "talk test 3 final"],
                    personRomance: ["romance test 1", "romance test 2"],
                    personTalkedTo: 0,
                    personRomanced: 0
                },
            ],
            pointsOfInterest: [
                {
                    poiName: "Keresek",
                    poiEvent: ["1", function(){writeText("thing")}, "3"],
                    poiDone: 0
                },
                {
                    poiName: "Point Of Interest Number One",
                    poiEvent: ["1", "2", "3", function(){writeText("POIFUNC")}, "4"],
                    poiDone: 0
                }
            ],
            placesToGo: [
                "TEST MAP NAME",
                "PTG2"
            ]
        },
    }
];


// --------------------------------------------------------------------------

// FUNCTIONS

// MAKE ITEMS NOT CLICKABLE WHEN YOU HAVE TO MAKE A CHOICE
const unclickable = () => {
	divRightMenu.style.pointerEvents = "none";
}

const reclickable = () => {
	divRightMenu.style.pointerEvents = "auto";
}

// WRITE TEXT, WITH OPTIONAL TITLE
const writeText = (text, title = "") => {
    let currentText = document.createElement("div");
    currentText.classList += "eventText textToOrder";

    if(title != ""){
        currentText.appendChild(document.createTextNode(title.toUpperCase()));
        currentText.appendChild(document.createElement("br"));
        currentText.appendChild(document.createElement("br"));
    }

    currentText.appendChild(document.createTextNode(text));
    divLeftText.appendChild(currentText);

    currentText.scrollIntoView();
}


// LOAD PARTY
const loadParty = () => {
    menuParty.innerHTML = "";
    characters.map((member) => {
    
        if(member.inParty){
            let currentMember = document.createElement("div");
            currentMember.classList += "party_member menu_subsubdivs";

            let currentSpan = document.createElement("span");
            currentSpan.appendChild(document.createTextNode(member.name.toUpperCase()));
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
            currentSpan.id = `${member.name}_hp`;
            currentDetails.appendChild(currentSpan);

            if(member.hasOwnProperty("mana")){
                currentSpan = document.createElement("span");
                currentSpan.appendChild(document.createTextNode(`Mana: ${member.mana[0]}/${member.mana[1]}`));
                currentSpan.id = `${member.name}_mana`;
                currentDetails.appendChild(currentSpan);
            }

            if(member.hasOwnProperty("fight")){
                currentSpan = document.createElement("span");
                currentSpan.appendChild(document.createTextNode(`Harc: ${member.fight[0]}-${member.fight[1]}`));
                currentSpan.id = `${member.name}_fight`;
                currentDetails.appendChild(currentSpan);
            }
            /*
            if(member.ability){
                currentDetails.appendChild(document.createElement("br"));
                let currentButton = document.createElement("div");
                currentButton.classList += "clickable";
                currentButton.appendChild(document.createTextNode(member.ability.abilityName.toUpperCase()));
                currentButton.id=`ability_${member.ability}`;
                currentDetails.appendChild(currentButton);

                currentButton.addEventListener("click", function(){
                    member.ability.abilityFunction()
                }, false);
            }
            */

            currentMember.appendChild(currentDetails);

            menuParty.appendChild(currentMember);
            }
    })}

const addToParty = (name) => {
    for(i = 0; i < characters.length; i++){
        if(characters[i].name == name){
            characters[i].inParty = true;
        }
    }
    loadParty();
}

const removeFromParty = (name) => {
    for(i = 0; i < CURRENT_STATE.party.length; i++){
        if(CURRENT_STATE.party[i].name == name){
            characters[i].inParty = false;
        }
    }
    loadParty();
}


// LOAD INVENTORY
const loadInventory = () => {
    menuInventory.innerHTML = "";
    items.map((item) => {
        if(item.inInventory){
            let currentItem = document.createElement("div");
            currentItem.classList += "menu_subsubdivs item";

            let currentSpan = document.createElement("span");
            currentSpan.appendChild(document.createTextNode(item.itemName.toUpperCase()));
            currentItem.appendChild(currentSpan);

            currentItem.appendChild(document.createElement("br"));

            currentSpan = document.createElement("em");
            currentSpan.appendChild(document.createTextNode(item.itemDescription));
            currentItem.appendChild(currentSpan);

            currentItem.appendChild(document.createElement("br"));

            if(item.hasOwnProperty("itemUseFunction")){
                currentSpan = document.createElement("span");
                currentSpan.classList += "button clickable";
                currentSpan.id = `item_use_${item.itemName}`;
                currentSpan.appendChild(document.createTextNode("HASZNÁLAT"));
                currentItem.appendChild(currentSpan);

                currentSpan.addEventListener("click", item.itemUseFunction, false)
            };

            menuInventory.appendChild(currentItem);
        }
    })
}

const addToInventory = (name) => {
    for(i = 0; i < items.length; i++){
        if(items[i].itemName == name){
            items[i].inInventory = true;
        }
    }
    loadInventory();
}

var removeFromInventory = (name) => {
    for(i = 0; i < CURRENT_STATE.inventory.length; i++){
        items[i].inInventory = false;
    }
    loadInventory();
}


// LOAD MAP
const loadMap = (currentMap) => {
    
    // SAVE CURRENT MAP STATE TO MAPS ARRAY BEFORE LOADING NEW ONE
	for (i = 0; i < maps.length; i++) {
		if (maps[i].mapName == CURRENT_STATE.currentMap.mapName) {
			maps[i] = CURRENT_STATE.currentMap;
		}
	}

	// CLEAR PREVIOUS MAP 
    CURRENT_STATE.currentMap = undefined;
    divMapName.innerHTML = "",
	menuPeople.innerHTML = "";
	menuPoi.innerHTML = "";
    menuPlacesToGo.innerHTML = "";
    divLeftText.innerHTML = "";

	// LOAD
	CURRENT_STATE.currentMap = currentMap;

    // TITLE AND TEXT
    currentStuff = document.createElement("h1");
    currentStuff.appendChild(document.createTextNode(CURRENT_STATE.currentMap.mapName));
    divMapName.appendChild(currentStuff);

    currentStuff = document.createElement("p");
    currentStuff.appendChild(document.createTextNode(CURRENT_STATE.currentMap.mapArriveText));
    divLeftText.appendChild(currentStuff);
    
    // ARRIVE EVENT
    if(CURRENT_STATE.currentMap.hasOwnProperty("mapArriveEvent")){
        CURRENT_STATE.currentMap.mapArriveEvent();
    }
    
    // PEOPLE AT MAP
    CURRENT_STATE.currentMap.mapMenu.personsAtPlace.map((person => {
        let currentPerson = document.createElement("div");
        currentPerson.classList += "person_at_place";

        currentPerson.appendChild(document.createTextNode(person.personName.toUpperCase()));
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
            currentButton.appendChild(document.createTextNode("BESZÉLEK VELE"));
            currentButton.id=`talk_${person.personName}`;
            personButtonArea.appendChild(currentButton);

            currentButton.addEventListener("click", function(){
                writeText(person.personTalk[person.personTalkedTo], `BESZÉLEK VELE: ${person.personName}`);
                if(typeof(person.personTalk[person.personTalkedTo+1]) == "function"){
                    person.personTalk[person.personTalkedTo+1]();
                    person.personTalkedTo++;
                }
                if(person.personTalkedTo < person.personTalk.length-1){person.personTalkedTo++}
            }, false);
        }

        if(person.hasOwnProperty("personRomance")){
            let currentButton = document.createElement("div");
            currentButton.classList += "clickable";
            currentButton.appendChild(document.createTextNode("KIKEZDEK VELE"))
            currentButton.id=`romance_${person.personName}`;
            personButtonArea.appendChild(currentButton);

            currentButton.addEventListener("click", function(){
                writeText(person.personRomance[person.personRomanced], `KIKEZDEK VELE: ${person.personName}`);
                if(typeof(person.personRomance[person.personRomanced+1]) == "function"){
                    person.personRomance[person.personRomanced+1]();
                    person.personRomanced++;
                }
                if(person.personRomanced < person.personRomance.length-1){person.personRomanced++}
            }, false);
        }
    }))

    // POINTS OF INTEREST
    CURRENT_STATE.currentMap.mapMenu.pointsOfInterest.map((poi => {
        let currentPoi = document.createElement("div");
        currentPoi.appendChild(document.createTextNode(poi.poiName));
        currentPoi.classList += "clickable";
        currentPoi.id = `poi_${poi.poiName}`;
        menuPoi.appendChild(currentPoi);

        currentPoi.addEventListener("click", function(){
            writeText(poi.poiEvent[poi.poiDone], poi.poiName);
            if(typeof(poi.poiEvent[poi.poiDone+1]) == "function"){
                poi.poiEvent[poi.poiDone+1]();
                poi.poiDone++;
            }
            if(poi.poiDone < poi.poiEvent.length-1){poi.poiDone++}
        }, false);
    }))

    // PLACES TO GO
    CURRENT_STATE.currentMap.mapMenu.placesToGo.map((ptg => {
        let currentPTG = document.createElement("div");
        currentPTG.appendChild(document.createTextNode(ptg.toString().toUpperCase()));
        currentPTG.classList += "clickable";
        currentPTG.id = `ptg_${ptg}`;
        menuPlacesToGo.appendChild(currentPTG);

        currentPTG.addEventListener("click", function(){
            let mapToFind = (this.id.substring(4));
            for(i = 0; i < maps.length; i++){
                if (maps[i].mapName == mapToFind){
                    loadMap(maps[i]);
                }
            }
        }, false)
    }))


    // PLAY MUSIC
	if (currentMusic && currentMusic != CURRENT_STATE.currentMap.mapMusic) {
		currentMusic.pause();
		currentMusic = CURRENT_STATE.currentMap.mapMusic;
        currentMusic.loop = true;
        musicPlaying ? currentMusic.play() : currentMusic.pause();
	}


    window.scrollTo(0, 0);
}

document.getElementById("menu_subdivs_sound").addEventListener("click", function(){

    if(musicPlaying){
        musicPlaying = false;
        currentMusic.pause();
        this.innerHTML = "ZENE BE";
    }else{
        musicPlaying = true;
        currentMusic.play();
        this.innerHTML = "ZENE KI";
    }
}, false);

/*
// SAVE & LOAD

const saveGame = () => {
    localStorage.setItem('CURRENT_STATE', JSON.stringify(CURRENT_STATE));
    localStorage.setItem('characters', JSON.stringify(characters));
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('maps', JSON.stringify(maps));
    console.log("saved");
}
document.getElementById("menu_subdivs_save").addEventListener("click", saveGame, false);

const loadGame = () => {
    CURRENT_STATE = JSON.parse(localStorage.getItem('CURRENT_STATE'));
    characters = JSON.parse(localStorage.getItem('characters'));
    items = JSON.parse(localStorage.getItem('items'));
    maps = JSON.parse(localStorage.getItem('maps'));
    loadParty();
    loadInventory();
    loadMap(CURRENT_STATE.currentMap);
    writeText("Játékállás betöltve!")
    console.log("loaded");
    console.log(CURRENT_STATE);
}
document.getElementById("menu_subdivs_load").addEventListener("click", loadGame, false);
*/

// FIGHT SYSTEM

const damageToCharacter = (char, damage) => {
    for(i = 0; i < CURRENT_STATE.party.length; i++){
        if (CURRENT_STATE.party[i].name == char){
            CURRENT_STATE.party[i].hp[0] -= damage;
            document.getElementById(`${CURRENT_STATE.party[i].name}_hp`).innerHTML = `HP: ${CURRENT_STATE.party[i].hp[0]}/${CURRENT_STATE.party[i].hp[1]}`;

        }
    }
}

const manaLoss = (char, damage) => {
    for(i = 0; i < CURRENT_STATE.party.length; i++){
        if (CURRENT_STATE.party[i].name == char){
            CURRENT_STATE.party[i].mana[0] -= damage;
            document.getElementById(`${CURRENT_STATE.party[i].name}_mana`).innerHTML = `Mana: ${CURRENT_STATE.party[i].mana[0]}/${CURRENT_STATE.party[i].mana[1]}`;

        }
    }
}

// CURRENT STATE OF CHARACTERS, MAPS AND STUFF

var CURRENT_STATE = {
    currentMap: maps[0],
    party: [characters[0]],
    inventory: [items[0], items[1]],
    currentMusic: musicDefault
}



// INITIALIZE GAME


loadParty();
loadInventory();
loadMap(maps[0]);

writeText("test text body", "test text title");