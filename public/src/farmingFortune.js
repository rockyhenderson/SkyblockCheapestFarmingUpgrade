// farmingFortune.js
// This file is dedicated to all calculations and computations for farming fortune in the application.
//
// Functions in this file:
// - Farming fortune calculations: Calculates player farming levels, fortune thresholds, and upgrades.
// - Helper functions: Any utilities for parsing, leveling, or other calculations specific to farming fortune.
//
// This file isolates the logic for farming fortune, making it easy to update calculations separately from data management.

// Main function to calculate and display total farming fortune
const xpThresholds = {
  LEGENDARY: [
    0, 660, 730, 800, 880, 960, 1050, 1150, 1260, 1380, 1510, 1650, 1800, 1960,
    2130, 2310, 2500, 2700, 2920, 3160, 3420, 3700, 4000, 4350, 4750, 5200,
    5700, 6300, 7000, 7800, 8700, 9700, 10800, 12000, 13300, 14700, 16200,
    17800, 19500, 21300, 23200, 25200, 27400, 29800, 32400, 35200, 38200, 41400,
    44800, 48400, 52200, 56200, 60400, 64800, 69400, 74200, 79200, 84700, 90700,
    97200, 104200, 111700, 119700, 128200, 137200, 146700, 156700, 167700,
    179700, 192700, 206700, 221700, 237700, 254700, 272700, 291700, 311700,
    333700, 357700, 383700, 411700, 441700, 476700, 516700, 561700, 611700,
    666700, 726700, 791700, 861700, 936700, 1016700, 1101700, 1191700, 1286700,
    1386700, 1496700, 1616700, 1746700, 1886700,
  ],
  EPIC: [
    0, 440, 490, 540, 600, 660, 730, 800, 880, 960, 1050, 1150, 1260, 1380,
    1510, 1650, 1800, 1960, 2130, 2310, 2500, 2700, 2920, 3160, 3420, 3700,
    4000, 4350, 4750, 5200, 5700, 6300, 7000, 7800, 8700, 9700, 10800, 12000,
    13300, 14700, 16200, 17800, 19500, 21300, 23200, 25200, 27400, 29800, 32400,
    35200, 38200, 41400, 44800, 48400, 52200, 56200, 60400, 64800, 69400, 74200,
    79200, 84700, 90700, 97200, 104200, 111700, 119700, 128200, 137200, 146700,
    156700, 167700, 179700, 192700, 206700, 221700, 237700, 254700, 272700,
    291700, 311700, 333700, 357700, 383700, 411700, 441700, 476700, 516700,
    561700, 611700, 666700, 726700, 791700, 861700, 936700, 1016700, 1101700,
    1191700, 1286700, 1386700,
  ],
  RARE: [
    0, 275, 300, 330, 360, 400, 440, 490, 540, 600, 660, 730, 800, 880, 960,
    1050, 1150, 1260, 1380, 1510, 1650, 1800, 1960, 2130, 2310, 2500, 2700,
    2920, 3160, 3420, 3700, 4000, 4350, 4750, 5200, 5700, 6300, 7000, 7800,
    8700, 9700, 10800, 12000, 13300, 14700, 16200, 17800, 19500, 21300, 23200,
    25200, 27400, 29800, 32400, 35200, 38200, 41400, 44800, 48400, 52200, 56200,
    60400, 64800, 69400, 74200, 79200, 84700, 90700, 97200, 104200, 111700,
    119700, 128200, 137200, 146700, 156700, 167700, 179700, 192700, 206700,
    221700, 237700, 254700, 272700, 291700, 311700, 333700, 357700, 383700,
  ],
  UNCOMMON: [
    0, 175, 190, 210, 230, 250, 275, 300, 330, 360, 400, 440, 490, 540, 600,
    660, 730, 800, 880, 960, 1050, 1150, 1260, 1380, 1510, 1650, 1800, 1960,
    2130, 2310, 2500, 2700, 2920, 3160, 3420, 3700, 4000, 4350, 4750, 5200,
    5700, 6300, 7000, 7800, 8700, 9700, 10800, 12000, 13300, 14700, 16200,
    17800, 19500, 21300, 23200, 25200, 27400, 29800, 32400, 35200, 38200, 41400,
    44800, 48400, 52200, 56200, 60400, 64800, 69400, 74200, 79200, 84700, 90700,
    97200, 104200, 111700, 119700, 128200, 137200, 146700, 156700, 167700,
    179700, 192700, 206700, 221700, 237700, 254700, 272700, 291700, 311700,
    333700,
  ],
  COMMON: [
    0, 100, 110, 120, 130, 145, 160, 175, 190, 210, 230, 250, 275, 300, 330,
    360, 400, 440, 490, 540, 600, 660, 730, 800, 880, 960, 1050, 1150, 1260,
    1380, 1510, 1650, 1800, 1960, 2130, 2310, 2500, 2700, 2920, 3160, 3420,
    3700, 4000, 4350, 4750, 5200, 5700, 6300, 7000, 7800, 8700, 9700, 10800,
    12000, 13300, 14700, 16200, 17800, 19500, 21300, 23200, 25200, 27400, 29800,
    32400, 35200, 38200, 41400, 44800, 48400, 52200, 56200, 60400, 64800, 69400,
    74200, 79200, 84700, 90700, 97200, 104200, 111700, 119700, 128200, 137200,
    146700, 156700, 167700, 179700, 192700, 206700, 221700, 237700, 254700,
    272700, 291700, 311700, 333700,
  ],
};
function displayFarmingFortune() {
  const selectedProfileData = JSON.parse(
    localStorage.getItem("SelectedProfileData")
  );
  if (!selectedProfileData) {
    console.warn("Selected profile data not found.");
    return;
  }

  // Initialize total farming fortune
  let totalFarmingFortune = 0;

  // Calculate farming fortune from skill level, passing in profile data
  const skillFF = calculateSkillFF(selectedProfileData); // Farming Skill Level
  totalFarmingFortune += skillFF;
  const plotFF = calculatePlotFF(selectedProfileData); // Farming Fortune from Unlocked Plots
  totalFarmingFortune += plotFF;
  const petFF = calculatePetFF(selectedProfileData); // Farming Fortune from Pets
  totalFarmingFortune += petFF;
  // Other farming fortune sources can be added here

  // Save individual components to local storage
  localStorage.setItem("skillFF", skillFF);
  localStorage.setItem("plotFF", plotFF);
  localStorage.setItem("petFF", petFF);
  localStorage.setItem("totalFarmingFortune", totalFarmingFortune);

  // Display individual components of farming fortune
  const skillFFElement = document.getElementById("skillFF");
  if (skillFFElement) {
    skillFFElement.textContent = `Skill FF: ${skillFF}`;
  }

  const plotFFElement = document.getElementById("plotFF");
  if (plotFFElement) {
    plotFFElement.textContent = `Plot FF: ${plotFF}`;
  }

  const petFFElement = document.getElementById("petFF");
  if (petFFElement) {
    petFFElement.textContent = `Pet FF: ${localStorage.getItem("petFF")}`;
  }

  // Display the total farming fortune on the page
  const totalFFElement = document.getElementById("totalFarmingFortune");
  if (totalFFElement) {
    totalFFElement.textContent = `Total Calculatable Farming Fortune: ${totalFarmingFortune}`;
  }

}

function calculateSkillFF(profile) {
  // Log the received profile data for debugging

  if (!profile || profile.farmingSkillLevel === undefined) {
    console.warn("Farming skill data not found.");
    return 0;
  }

  const farmingLevel = profile.farmingSkillLevel;
  const skillFF = farmingLevel * 4;
  return skillFF;
}

function calculatePlotFF(profile) {
  // Log the received profile data for debugging

  if (
    !profile ||
    !profile.unlockedPlots ||
    !Array.isArray(profile.unlockedPlots)
  ) {
    console.warn("Unlocked plots data not found or invalid.");
    return 0;
  }

  const plotCount = profile.unlockedPlots.length;
  const plotFF = plotCount * 3; // Each unlocked plot gives 3 farming fortune

  return plotFF;
}

// Function to calculate farming fortune from pets
function calculatePetFF(profile) {
  // Log the received profile data for debugging


  if (!profile || !profile.pets) {
    console.warn("Pets data not found.");
    return 0;
  }

  const pets = profile.pets;
  const activePet = profile.activePet;

  let petFF = 0;
  let petItemFF = 0;

  // Search for Rabbit, Elephant, or Mooshroom Cow pets
  const relevantPets = pets.filter((pet) =>
    ["RABBIT", "ELEPHANT", "MOOSHROOM_COW"].includes(pet.type)
  );

  // Populate the pet dropdown only if there are relevant pets
  if (relevantPets.length > 0) {
    const petDropdown = document.getElementById("petDropdown");
    if (petDropdown && petDropdown.options.length === 0) {
      petDropdown.innerHTML = "";

      relevantPets.forEach((pet) => {
        const option = document.createElement("option");
        option.value = pet.type;
        option.text = `${pet.type} Pet`;
        petDropdown.appendChild(option);
      });

      // Set default selected pet if there's an active pet
      if (
        activePet &&
        relevantPets.some((pet) => pet.type === activePet.type)
      ) {
        petDropdown.value = activePet.type;
      } else {
        petDropdown.value = relevantPets[0].type;
      }

      // Attach change event listener to dropdown
      petDropdown.onchange = handlePetDropdownChange;
    }

    const selectedPetType = petDropdown ? petDropdown.value : null;
    const selectedPet = relevantPets.find(
      (pet) => pet.type === selectedPetType
    );
    const heldItem = selectedPet ? selectedPet.heldItem : null;

    petFF = getPetFF(selectedPetType);
    petItemFF = getPetItemFF(heldItem);

    // Update pet item FF display
    const petItemFFElement = document.getElementById("petItemFF");
    if (petItemFFElement) {
      petItemFFElement.textContent = `Pet Item FF: ${petItemFF}`;
    }
  }

  return petFF;
}

// Handler function for pet dropdown change
function handlePetDropdownChange() {
  const petDropdown = document.getElementById("petDropdown");


  if (petDropdown) {
    const selectedPet = petDropdown.value;

    // Find the selected pet in profile data to get the held item
    const selectedProfileData = JSON.parse(
      localStorage.getItem("SelectedProfileData")
    );
    const pets = selectedProfileData.pets;
    const selectedPetData = pets.find((pet) => pet.type === selectedPet);
    const heldItem = selectedPetData ? selectedPetData.heldItem : null;

    const petFF = getPetFF(selectedPet);
    const petItemFF = getPetItemFF(heldItem);
    console.log("Calculated Pet FF:", petFF);

    // Update petFF and petItemFF display and localStorage
    const petFFElement = document.getElementById("petFF");
    if (petFFElement) {
      petFFElement.textContent = `Pet FF: ${petFF}`;
    }
    localStorage.setItem("petFF", petFF);

    const petItemFFElement = document.getElementById("petItemFF");
    if (petItemFFElement) {
      petItemFFElement.textContent = `Pet Item FF: ${petItemFF}`;
    }
    localStorage.setItem("petItemFF", petItemFF);

    // Update total farming fortune without calling displayFarmingFortune() to avoid resetting dropdown
    const skillFF = parseInt(localStorage.getItem("skillFF"), 10) || 0;
    const plotFF = parseInt(localStorage.getItem("plotFF"), 10) || 0;
    const totalFarmingFortune = skillFF + plotFF + petFF;
    localStorage.setItem("totalFarmingFortune", totalFarmingFortune);

    const totalFFElement = document.getElementById("totalFarmingFortune");
    if (totalFFElement) {
      totalFFElement.textContent = `Total Calculatable Farming Fortune: ${totalFarmingFortune}`;
    }
  } else {
    console.warn("Pet dropdown element not found.");
  }
}
function getPetLevel(rarity, xp) {
  const thresholds = xpThresholds[rarity];
  if (!thresholds) return 0;

  let level = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) {
      level = i;
    } else {
      break;
    }
  }

  return level;
}

// Helper function to determine farming fortune from pet type
function getPetFF(pet) {
  console.log(pet)
  console.log("GET PET FF RUNNING")
  let petFF = 0;

  if (pet == "ELEPHANT") {
    console.log("Elephant pet detected, Rarity:", pet.rarity, "XP:", pet.xp);
    if (pet.rarity !== "LEGENDARY") {
      console.log("Elephant pet is not LEGENDARY, FF set to 0.");
      return 0; // No farming fortune for non-legendary elephants
    }

    // Calculate pet level
    const petLevel = getPetLevel(pet.rarity, pet.xp);
    console.log("Calculated Elephant Pet Level:", petLevel);

    // Elephant pet gives 1.5 FF per level
    petFF = petLevel * 1.5;
    console.log("Calculated Elephant Pet FF:", petFF);
  } else if (pet.type === "RABBIT") {
    petFF = 50; // Placeholder for Rabbit
  } else if (pet.type === "MOOSHROOM_COW") {
    petFF = 200; // Placeholder for Mooshroom Cow
  }

  return petFF;
}

// Helper function to determine farming fortune from held item
function getPetItemFF(heldItem) {
  let petItemFF = 0;

  // Get selected profile data from localStorage
  const selectedProfileData = JSON.parse(
    localStorage.getItem("SelectedProfileData")
  );
  const gardenLevel =
    selectedProfileData && selectedProfileData.gardenLevel
      ? selectedProfileData.gardenLevel
      : 0;


  if (heldItem === "GREEN_BANDANA") {
    petItemFF += gardenLevel * 4; // 4 FF for each garden level
  } else if (heldItem === "YELLOW_BANDANA") {
    petItemFF += 30;
  } else if (heldItem === "MINOS_RELIC") {
    petItemFF = Math.round(petItemFF * 1.33);
  }

  return petItemFF;
}
