// dataManager.js
// This file handles all data management and API interactions for the application.

document.addEventListener("DOMContentLoaded", () => {
  const fetchDataButton = document.getElementById("fetchDataButton");
  const refreshButton = document.querySelector(".refresh-btn");

  // Check if data already exists in localStorage on page load
  const storedData = localStorage.getItem("playerData");
  const storedProfileId = localStorage.getItem("selectedProfile");
  const storedUsername = localStorage.getItem("playerUsername");

  if (storedData && storedProfileId && storedUsername) {
    const playerData = JSON.parse(storedData);

    // Ensure profiles exist before accessing `.find`
    if (playerData.profiles && Array.isArray(playerData.profiles)) {
      const selectedProfile = playerData.profiles.find(
        (profile) => profile.profileId === storedProfileId
      );

      // Display stored username and profile data
      displayUsername(storedUsername);
      populateProfileDropdown(playerData.profiles);
      displayProfileData(selectedProfile);
    } else {
      console.warn("No profiles found in stored data.");
    }
  }

  // Event listener for the "Find Upgrades" button
  fetchDataButton.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    if (!username) {
      console.log("Please enter a username");
      return;
    }
    await fetchData(username);
  });

  // Event listener for the "Refresh" button
  refreshButton.addEventListener("click", async () => {
    const username = localStorage.getItem("playerUsername");
    if (username) {
      console.log("Refreshing data...");
      await fetchData(username);
    } else {
      console.log("No username found. Please enter a username and fetch data first.");
    }
  });
});

// Fetch data from the backend and store in local storage
async function fetchData(username) {
  const url = `/.netlify/functions/DataRequest?username=${username}`;
  console.log(`Requesting new data from API for username: ${username}...`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.skillApiDisabled) {
      alert("Your skill API is disabled. Enable it in your Hypixel settings.");
      return;
    }

    // Log that data was successfully received
    console.log(`Received data from API for username: ${username}`);

    // Ensure profiles data exists before accessing
    if (!data.profiles || !Array.isArray(data.profiles) || data.profiles.length === 0) {
      console.warn("No profiles found in fetched data.");
      return;
    }

    // Store player data and the first profile as selected in localStorage
    localStorage.setItem("playerData", JSON.stringify(data));
    localStorage.setItem("playerUsername", username);
    localStorage.setItem("selectedProfile", data.profiles[0].profileId);
    localStorage.setItem("SelectedProfileData", JSON.stringify(data.profiles[0])); // First profile as default

    // Store all pets and active pet in local storage
    localStorage.setItem("allPets", JSON.stringify(data.profiles[0].pets));
    localStorage.setItem("activePet", JSON.stringify(data.profiles[0].activePet));

    // Display username and profile data
    displayUsername(username);
    populateProfileDropdown(data.profiles);
    displayProfileData(data.profiles[0]); // Display the first profile by default

    // Debug logs for pet data
    console.log("All Pets:", data.profiles[0].pets);
    console.log("Active Pet:", data.profiles[0].activePet);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Display username
function displayUsername(username) {
  document.getElementById("usernameDisplay").textContent = username;
}

// Populate the profile dropdown
function populateProfileDropdown(profiles) {
  const dropdown = document.getElementById("profileDropdown");
  dropdown.innerHTML = ""; // Clear existing options

  // Get the stored profile ID or default to the first profile if none is stored
  let storedProfileId = localStorage.getItem("selectedProfile");
  let selectedProfile = profiles.find(profile => profile.profileId === storedProfileId) || profiles[0];

  // Save the selected profile to localStorage if it wasn't already stored
  if (!storedProfileId) {
    localStorage.setItem("selectedProfile", selectedProfile.profileId);
  }

  // Populate the dropdown with profiles
  profiles.forEach(profile => {
    const option = document.createElement("option");
    option.value = profile.profileId;
    option.textContent = profile.profileName;
    if (profile.profileId === selectedProfile.profileId) {
      option.selected = true;
    }
    dropdown.appendChild(option);
  });

  // Display selected profile data initially
  displayProfileData(selectedProfile);
  displayFarmingFortune(); // Calculate and display farming fortune on initial load

  // Update displayed data when a new profile is selected
  dropdown.addEventListener("change", (event) => {
    const selectedProfileId = event.target.value;
    selectedProfile = profiles.find(profile => profile.profileId === selectedProfileId);
    
    // Update localStorage with the new selected profile data
    localStorage.setItem("selectedProfile", selectedProfileId);
    localStorage.setItem("SelectedProfileData", JSON.stringify(selectedProfile));
    
    displayProfileData(selectedProfile);
    displayFarmingFortune(); // Update farming fortune on profile change
  });
}

// Display profile name and farming level
function displayProfileData(profile) {
  if (!profile) {
    console.warn("Selected profile not found or undefined.");
    document.getElementById("profileName").textContent = `Profile: -`;
    document.getElementById("farmingLevel").textContent = `Farming Level: -`;
    return;
  }

  document.getElementById("profileName").textContent = `Profile: ${profile.profileName}`;
  document.getElementById("farmingLevel").textContent = `Farming Level: ${profile.farmingSkillLevel}`;
}