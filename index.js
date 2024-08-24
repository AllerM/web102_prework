/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        //looped
    

    


        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");


        // add the class game-card to the list
        gameCard.classList.add("game-card");


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
        <h2>${games[i].name}</h2>
        <img src="${games[i].img}" class="game-img"/>
        <p>${games[i].description}</p> 
        <p>Backers: ${games[i].backers}</p>
        `;
        

    
        // append the game to the games-container
        gamesContainer.appendChild(gameCard);

    }
    //Append the newly created div to the correct element in the DOM so that the game cards appear under the "Our Games" heading
    
    


}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const total_contributions = GAMES_JSON.reduce((tot, game) => {
    return tot + game.backers;
}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${total_contributions.toLocaleString('en-US')}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const amt_raised = GAMES_JSON.reduce((amount, game) => {
    return amount + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${amt_raised.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const num_games = GAMES_JSON.reduce((num, game) => {
    return num + 1;
}, 0);

gamesCard.innerHTML = `${num_games}`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfunded = GAMES_JSON.filter ( (games) => {
        return games.pledged < games.goal;
    });


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const funded = GAMES_JSON.filter ( (games) => {
        return games.pledged >= games.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const number_unfunded = GAMES_JSON.reduce((num, game) => {
    return game.pledged < game.goal ? num + 1 : num;

}, 0);




// create a string that explains the number of unfunded games using the ternary operator
const str1 = `A total of ${amt_raised.toLocaleString('en-US')} has been raised for ${num_games} games. Currently ${number_unfunded} 
${number_unfunded > 1 ? 'games': 'game'} remain unfunded`;
//console.log(str1);





// create a new DOM element containing the template string and append it to the description container
const str = document.createElement("p");
str.innerHTML = str1;
descriptionContainer.appendChild(str);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

console.log(sortedGames);

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = GAMES_JSON;
const { name, description: desc, pledged: plg, goal: gl, backers: bckrs, img }= firstGame;
const { name: name2, description: esc2, pledged: plg2, goal: gl2, backers: bckers2, img: img2 } = secondGame;


// create a new element to hold the name of the top pledge game, then append it to the correct element
const top = document.createElement("p");
top.innerHTML = name;
const sec = document.createElement("p");
sec.innerHTML = name2;
firstGameContainer.appendChild(top);
secondGameContainer.appendChild(sec);
// do the same for the runner up item