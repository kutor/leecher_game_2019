var CURRENT_STATE = {
    currentMap: {},
    party: [],
    inventory: [],
    
    //variables
    
}

let saveGame;
let autoSaveGame;

//MUSIC
const musicDefault = new Audio("");

let characters = [
    {
        name: "",
        hpMax: 100,
        hpCurrent: 100,
        manaMax: 100,
        manaCurrent: 100,
        fight: [10, 20],
        abilities: ab001, ab002
    },
];

let abilities = [
    {},
]

let enemies = [
    {},
];

let items = [
    {},
];

let maps = [
    {
        mapName: "",
        mapText: "",
        mapMusic: null,
        mapArriveEvent: null,
        mapMenu: {
            personsAtPlace: [
                {
                    name: "",
                    talk: "",
                    romance: "",
                    talkedTo: 0,
                    talkedToMax: 1,
                    
                }
            ],
            searched: false,
            searchText: "",
            searchFind: null,
            pointsOfInterest: [
                {
                    poiText: "",
                    poiEvent: null,
                }
            ]
            placesToGo: [
                "",
            ]
        },
    },
];
