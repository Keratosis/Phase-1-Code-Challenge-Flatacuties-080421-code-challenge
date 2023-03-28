// Your code here
// Select the necessary DOM elements
const characterBar = document.querySelector("#character-bar");
const detailedInfo = document.querySelector("#detailed-info");
const nameEl = detailedInfo.querySelector("#name");
const imageEl = detailedInfo.querySelector("#image");
const voteCountEl = detailedInfo.querySelector("#vote-count");
const votesForm = detailedInfo.querySelector("#votes-form");

// Fetch all characters from the server and display their names in the character bar
fetch('http://localhost:3000/characters')
  .then((response) => response.json())
  .then((characters) => {
    characters.forEach((character) => {
      const span = document.createElement("span");
      span.textContent = character.name;
      span.addEventListener("click", () => displayCharacterDetails(character));
      characterBar.appendChild(span);
    });
  });

// Display the details of a given character in the detailed info section
function displayCharacterDetails(character) {
  nameEl.textContent = character.name;
  imageEl.src = character.image;
  imageEl.alt = character.name;
  voteCountEl.textContent = character.votes;

  // Add event listener to the votes form to update the character's votes
  votesForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const votesInput = votesForm.querySelector("#votes");
    const votes = parseInt(votesInput.value);
    if (!isNaN(votes)) {
      character.votes += votes;
      voteCountEl.textContent = character.votes;
    }
    votesInput.value = "";
  });

  // Handle vote reset
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
  voteCountEl.textContent = 0;
});
}
