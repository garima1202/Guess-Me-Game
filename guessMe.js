
//DOCUMENT RESOURCES
const levelCount = document.getElementById('levelCount');
const guessedCount = document.getElementById('guessedCount');
const helpCount = document.getElementById('helpCount');
const gameWord = document.getElementById('gameWord');
const checkButton = document.getElementById('check');
const shuffleButton = document.getElementById('shuffle');
const helpButton = document.getElementById('help');
const userInput = document.getElementById('input');
const message = document.getElementById('message');
const header = document.getElementById('header');
const msgContainer = document.getElementById('msg-container');
const dim = document.getElementById('dim');
const about = document.getElementById('about');
const play = document.getElementById('play');
const logo = document.getElementById('logo');
const restart = document.getElementById('restart');
const noRestart = document.getElementById('no-restart');
const yesRestart = document.getElementById('yes-restart');

//Display welcome message / guide
play.addEventListener('click', () => {
    about.style.display = 'none';
    dim.style.display = 'none';
})

//USER CAN CLICK ON LOGO TO RESTART GAME
logo.addEventListener('click', () => {
    dim.style.display = 'block';
    restart.style.display = 'block';
    //if users chooses not to restart game hide the message panel and dim
    noRestart.addEventListener('click', () => {
        dim.style.display = 'none';
        restart.style.display = 'none';
    })
    //if user wishes to restart the game, clear local storage and reload the page
    yesRestart.addEventListener('click', () => {
        localStorage.clear();
        window.location.assign(window.location.href); //assign the current url to window to load
        dim.style.display = 'none';
        restart.style.display = 'none';
    })
})

//GAME WORD DATABASE
let gameBase = [
    stage1 = [
        'ARRAY', 'BEARING', 'SCARCE', 'GLOBE', 'GROOM', 'GROUP', 'CLEARED', 'SINCE', 'VOUCHER', 'CUBIC'
    ],
    stage2 = [
        'DOWNLOAD', 'GRENADE', 'SUPPLIES', 'STITCHES', 'PRODUCER', 'BLURRY', 'LOGICAL', 'HUMBLE', 'VILLAGE', 'UNFOLD'
    ],
    stage3 = [
        'VIBRANT', 'CLEARANCE', 'GOVERN', 'NONSENSE', 'STUDIOUS', 'DEPARTMENT', 'FLOWERS', 'SQUARES', 'BITTER', 'ACTIVATED'
    ],
    stage4 = [
        'ANTICIPATE', 'REALIZE', 'CRUNCHY', 'PLURAL', 'BOTHERED', 'PLIGHT', 'OPAQUE', 'GROWL', 'BREAKER', 'BOREDOM'
    ],
    stage5 = [
        'COMPANY', 'OUTREACH', 'STYLIST', 'MANAGER', 'BULKY', 'SECURITY', 'DRONES', 'AILMENT', 'ANGUISH', 'FREEDOM'
    ],
    stage6 = [
        'LEVERAGE', 'DIVIDEND', 'SEQUENCE', 'SPIRAL', 'BURGER', 'VULGAR', 'BRILLIANT', 'ZONAL', 'CAREFUL', 'HANDSOME'
    ],
    stage7 = [
        'BEAUTIFUL', 'GLIMPSE', 'DINNER', 'AMERICA', 'CLASSIC', 'ANNOYED', 'BLOGGER', 'GREETINGS', 'SUSPECTS', 'ASTONISHED'
    ],
    stage8 = [
        'SQUEEZE', 'SEPARATE', 'OPERATION', 'ALIGNMENT', 'FORGIVEN', 'CREATIVE', 'UPHOLD', 'DECLINE', 'FOLLOWERS', 'SPONSORS'
    ],
    stage9 = [
        'DUPLICATE', 'AROUSE', 'GLITCH', 'SLIDES', 'OPTIMIZE', 'LIQUID', 'SCATTERED', 'ORGANIZE', 'PREPARE', 'DONATE'
    ],
    stage10 = [
        'CONTRIBUTE', 'PARTAKE', 'PARTICIPATE', 'DELIGATE', 'INTELLIGENCE', 'WORTHY', 'ARRIVED', 'SUPPOSE', 'FRIGHTEN', 'CELEBRATE'
    ],
    stage11 = [
        'CONTRADICT', 'OVERLOOK', 'SUPREMACY', 'INTERROGATE', 'SUCCINT', 'AWKWARD', 'DOMAINS', 'GRADUAL', 'EXPOSES', 'BACKBITE'
    ],
    stage12 = [
        'INFLAMMATORY', 'PROTOCOL', 'GLUTTON', 'DERIVATIVES', 'RESERVOIR', 'CONCATENATE', 'CURRICULUM', 'PARAMETERS', 'SYNCHRONIZE', 'THERMOMETER'
    ],
    stage13 = [
        'GYMNASTICS', 'ASSOCIATION', 'AQUATIC', 'COMBINATION', 'GALVANOMETER', 'CONCUBINE', 'NAVIGATE', 'COUNTRIES', 'ANNIHILATION', 'ENTITIES'
    ],
    stage14 = [
        'PALLID', 'ACCINDENT', 'PLACENTA', 'SORDID', 'ORBITAL', 'LIQUIFY', 'UNDERESTIMATE', 'IMITATE', 'OBLIGATE', 'GLIMPSE'
    ],
    stage15 = [
        'OPULENCE', 'AUXILIARY', 'PNEUMONIA', 'LAUNDRY', 'MOTHERBOARD', 'CATASTROPHY', 'GALLIVANT', 'SUPPORTIVE', 'HOOLIGAN', 'HORRIFY'
    ]
];

const colors = [
    'rgba(250, 118, 138)', 'rgba(151, 180, 147)', 'rgba(199, 148, 118)', 'rgba(197, 127, 170)', 'rgba(125, 133, 118)', 
    'rgba(235, 198, 143)', 'rgba(91, 120, 124, .7)', 'rgba(139, 139, 139)', 'rgba(189, 92, 92, .7)', 'rgba(194, 181, 144)',
    'rgba(7, 188, 194)', 'rgba(190, 96, 124)', 'rgba(113, 86, 116)', 'rgba(233, 106, 106)'
]

// //restore saved state since last application quit
if(localStorage.getItem('gameState')) {
    about.style.display = 'none';
    dim.style.display = 'none';
    const gameState = JSON.parse(localStorage.getItem('gameState'));
    levelCount.innerText = gameState.levelCount;
    guessedCount.innerText = gameState.guessedCount;
    helpCount.innerText = gameState.helpCount;
    leveller = gameState.leveller;
    //gameWord.innerText = gameState.gameWord;
    gameBase = gameState.gameBase;
    document.documentElement.style.setProperty('--color', colors[leveller]);
}

//SHUFFLER FUNCTION
function shuffle(word){
    word = word.split('');
    for (p=0; p < word.length; p++){
        let rndmize = Math.floor(Math.random() * word.length);
        let swap1 = word[p];
        let swap2 = word[rndmize];
        word[p] = swap2;
        word[rndmize] = swap1;
    }
    return word.join('');
}

//FADE-IN EFFECT FUNCTION
function fadeIn (info){              
    info.classList.add('fadeIn');
    setTimeout(() => {
        info.classList.remove('fadeIn');
    }, 1500);  
}

//GAME LOGIC | ENGINE
leveller = levelCount.innerText - 1;
rndm =  Math.floor(Math.random() * gameBase[leveller].length);
gameWord.innerText = shuffle(gameBase[leveller][rndm]); 

//convert input to uppercase as the user types
userInput.addEventListener('input', () => {
    
    userInput.value = userInput.value.toUpperCase();

    //prevent input from having whitespaces
    if (userInput.value.includes(' ')){
        // '\s' represent single space, tab or new line
        //userInput.value = userInput.value.replace(/\s/g, '');
        userInput.value = userInput.value.replace(/ /g, '');
    }
});

//MAIN FUNCTION TAHT VALIDATES RIGHT | WRONG INPUTS
function validate(){
    //console.log(gameBase[leveller][rndm]);
    //Prevent use of check button while msg-container is visible to prevent alteration of guessedCount
    //As long as the error or success message remains hidden, check can be used  
    //CONDITIONS WHEN USER INPUTS THE CORRECT VALUE
    if (userInput.value == gameBase[leveller][rndm]){
        guessedCount.innerText++; 
        //REMOVE EACH WORD FROM THE ARRAY AFTER EVERY CORRECT GUESS TO AVOID THEM REOCCURRING IN THE SAME GAME PLAY OR LEVEL
        gameBase[leveller].splice(rndm,1);
        //Effect for every new guess
        fadeIn(guessedCount);
        //OUTPUT SUCCESS OR FAILURE MESSAGE BASED ON USER INPUT
        message.innerText = 'CORRECT';
        msgContainer.classList.toggle('true'); 
        msgContainer.classList.toggle('hidden'); 
        setTimeout(()=> {
            msgContainer.classList.toggle('true'); 
            msgContainer.classList.toggle('hidden'); 
            //userInput.focus(); //keep the input in focus so that user don't have to click on it after every correct guess
        }, 2000);
        setTimeout(() => {
            //BONUS HELP ON NEW LEVEL (AFTER 10 CORRECT GUESSES)
            if (guessedCount.innerText % 10 == 0){
                helpCount.innerText = Number(helpCount.innerText) + 3;
                if (helpCount.innerText > 0){
                    helpButton.style.cursor = 'pointer';
                    helpButton.style.background = '--color';
                }
                //effect for every help count increment
                fadeIn(helpCount);
            }

            //LEVEL UP AFTER A WHOLE LEVEL WORDS ARE CORRECTLY GUESSED
            if (guessedCount.innerText % 10 == 0){
                levelCount.innerText++;
                leveller = levelCount.innerText - 1;
                //Effect for every new level
                fadeIn(levelCount);
                //save game state on every new level
                saveGameState();
                //change game color on every new level
                document.documentElement.style.setProperty('--color', colors[leveller]);
            }

            //RANDOMIZE AND REASSIGN RANDOM WORD TO THE GAME WORD VALUE
            //RESET USER INPUT
            rndm =  Math.floor(Math.random() * gameBase[leveller].length);
            gameWord.innerText = shuffle(gameBase[leveller][rndm]);  
            userInput.value = '';
        }, 2000);
        //save game state after every currect word
        saveGameState();
        //alert(gameBase[leveller][rndm]); 
    }
    //CONDITIONS WHEN USER INPUTS THE WRONG VALUE
    else {
        message.innerText = 'WRONG';
        msgContainer.classList.toggle('false'); 
        msgContainer.classList.toggle('hidden'); 
        setTimeout(()=> {
            msgContainer.classList.toggle('false'); 
            msgContainer.classList.toggle('hidden'); 
        }, 2000);
    }
    //console.log(gameBase[leveller]);
}

//when "enter" is clicked
document.addEventListener("keydown", function(e){
    if (e.keyCode == 13 || e.which == 13) validate();
});

//Check Button
checkButton.addEventListener('click', function(){ 
    validate();
}); 

//Shuffle Button
shuffleButton.addEventListener('click', function() {
     gameWord.innerText = shuffle(gameWord.innerText); 
});

//Spacebar to shuffle
document.addEventListener('keydown', function(e){
    if (e.keyCode == 32 || e.which == 32) gameWord.innerText = shuffle(gameWord.innerText), e.preventDefault(); 
    // e.preventDefault() is added to ensure the space bar doesn't take after the last clicked button.
    // To understand this better, inspect the game without the preventDefault() function, click on check botton then...
    // then click on the space key, observe.
});

//Help Button
helpButton.addEventListener('click', function() {
    //prevent user from clicking help when input value is correct (or when help has input correct value already)
    //or when success or error message is been displayed
    if (helpCount.innerText > 0) {
        if (userInput.value == gameBase[leveller][rndm] || !(msgContainer.classList.contains('hidden'))){
            //do nothing
        }
        else {
            userInput.value = gameBase[leveller][rndm]; 
            helpCount.innerText--;
            //effect for every help count increment
            fadeIn(helpCount);
        }
    }

    //prevent helpcount from reading negative values
    if (helpCount.innerText <= 0){
        helpCount.innerText = 0;
        //userInput.innerText = '';
    }
    if (helpCount.innerText == 0){
        helpButton.style.cursor = 'not-allowed';
        helpButton.style.backgroundColor = 'lightgrey';
    } 
});

//store game state in local storage
function saveGameState() {
    const state = {
        levelCount : levelCount.innerText,
        guessedCount : guessedCount.innerText,
        helpCount : helpCount.innerText,
        gameWord : gameWord.innerText,
        gameBase : gameBase,
        leveller : leveller
    }
    localStorage.setItem('gameState', JSON.stringify(state));
}