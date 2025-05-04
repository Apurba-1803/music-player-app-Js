import data from "./index.json" with { type: "json" };
const toggleCheck = document.getElementById("toggle-style");
const songsDropDown = document.getElementById("songs");
const songTitleCard = document.getElementById("song-title-card");
const toggleText = document.getElementById("mode-text");
const imageContainer = document.getElementById("image_container");
const songTitle = document.getElementById("song-title");
const singer = document.getElementById("singer");
const audio = document.getElementById("audio");
const source = audio.querySelector("source");
const prevBtn = document.getElementById("previous_button");
const nextBtn = document.getElementById("next_button");
const createPlaylist = document.getElementById("createPlaylist");
const inputBox = document.getElementById("createField");
const AllPlaylists = document.getElementById("AllPlaylists");
const CurrentPlaylist = document.getElementById("CurrentPlaylist");
const addToPlaylistButton = document.getElementById("AddToPlayList");
const body = document.body;

//toggle theme
toggleCheck.addEventListener("change", () => {
  if (toggleText.innerHTML == "Dark") {
    toggleText.innerHTML = "Light";
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  } else {
    toggleText.innerHTML = "Dark";
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  }
});

//show songs on left section

function showSongs() {
  const selectedValue = songsDropDown.value;
  songTitleCard.innerHTML = "";
  const filteredData =
    selectedValue == "All"
      ? data
      : data.filter((song) => song.genre == selectedValue);

  filteredData.forEach((song) => {
    const card = document.createElement("div");
    card.className = "song-title-card"; // style this class in CSS
    card.dataset.song = JSON.stringify(song);
    card.innerHTML = `<p>${song.cardName}</p>`;
    songTitleCard.appendChild(card);
  });
}

//display song on middle section
function displaySong(song) {
  console.log("song in displaySong", song);
  const image = document.createElement("img");

  image.src = song.image;
  image.className = "song-image";
  imageContainer.innerHTML = "";
  songTitle.innerHTML = "";
  singer.innerHTML = "";
  imageContainer.append(image);
  songTitle.innerHTML = song.title;
  singer.innerHTML = song.singer;
  source.src = song.mp3;
  audio.load();
  audio.play();
}

songsDropDown.addEventListener("change", showSongs);
window.addEventListener("DOMContentLoaded", showSongs);

let songData = data[0];

function songClicked(event) {
  const cardElement = event.target.closest(".song-title-card"); 
  console.log(cardElement);

  songData = JSON.parse(cardElement.dataset.song);

  displaySong(songData);
}

nextBtn.onclick = () => {
  if (songData) {
    playNextSong(songData);
  }
};



function playNextSong(currentSongData) {
  const currentIndex = data.findIndex(
    (song) => song.cardName === currentSongData.cardName
  );

  if (currentIndex !== -1) {
    const nextIndex = (currentIndex + 1) % data.length; 
    const nextSongData = data[nextIndex];
    songData = nextSongData;
    displaySong(songData);
  } else {
    console.log("No next song found!");
  }
}

prevBtn.onclick = () => {
  if (songData) {
    playPrevSong(songData);
  }
};

function playPrevSong(currentSongData) {
  const currentIndex = data.findIndex(
    (song) => song.cardName === currentSongData.cardName
  );

  if (currentIndex !== -1) {
    const prevIndex = (currentIndex - 1 + data.length) % data.length; // loops back to 0
    const nextSongData = data[prevIndex];
    songData = nextSongData;
    displaySong(songData);
  } else {
    console.log("No next song found!");
  }
}
songTitleCard.addEventListener("click", songClicked);

addToPlaylistButton.onclick = () =>{
  if(songData){
   addSongToPlaylist(songData)
  }
}
const playlists = {}; // { playlistName: [song1, song2, ...] }
let selectedPlaylist = null;

function createPlaylistClicked(){
  const playlistName = inputBox.value.trim();
  if (!playlistName) return;

  // Store empty array for this playlist
  playlists[playlistName] = [];

    
    const card = document.createElement("div");
    card.classList.add ( "song-title-card", "playListCard"); 
    card.innerHTML = `<p>${playlistName}</p>`;
    console.log("card", card)
    AllPlaylists.appendChild(card);
    inputBox.value = null
    card.addEventListener("click", () => playlistClicked(playlistName)); // ✅ Correct


}

createPlaylist.addEventListener("click", createPlaylistClicked)

function playlistClicked(playlistName){
  selectedPlaylist = playlistName;
  renderCurrentPlaylist();
}

function renderCurrentPlaylist() {
  if (!selectedPlaylist) return;
  CurrentPlaylist.innerHTML = "";
  playlists[selectedPlaylist].forEach(song => {
      const card = document.createElement("div");
      card.classList.add("song-title-card");
      card.innerHTML = `<p>${song}</p>`;
      CurrentPlaylist.appendChild(card);
  });
}

function addSongToPlaylist(currentSongData) {
  const songName = currentSongData.cardName;
  if (!songName || !selectedPlaylist) return;

  playlists[selectedPlaylist].push(songName);
  renderCurrentPlaylist();
}