// farmingFortune.js
// This file is dedicated to all calculations and computations for farming fortune in the application.
//
// Functions in this file:
// - Farming fortune calculations: Calculates player farming levels, fortune thresholds, and upgrades.
// - Helper functions: Any utilities for parsing, leveling, or other calculations specific to farming fortune.
//
// This file isolates the logic for farming fortune, making it easy to update calculations separately from data management.

// Main function to calculate and display total farming fortune
function displayFarmingFortune() {
  const selectedProfileData = JSON.parse(
    localStorage.getItem("SelectedProfileData")
  );
  // console.log("Selected Profile Data:", selectedProfileData);
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

  console.log("Total Farming Fortune:", totalFarmingFortune); // Log for debugging
}

function calculateSkillFF(profile) {
  // Log the received profile data for debugging
  // console.log("Profile data received in calculateSkillFF:", profile);

  if (!profile || profile.farmingSkillLevel === undefined) {
    console.warn("Farming skill data not found.");
    return 0;
  }

  const farmingLevel = profile.farmingSkillLevel;
  const skillFF = farmingLevel * 4;
  console.log(
    `Farming Level: ${farmingLevel}, Skill Farming Fortune: ${skillFF}`
  );
  return skillFF;
}

function calculatePlotFF(profile) {
  // Log the received profile data for debugging
  // console.log("Profile data received in calculatePlotFF:", profile);

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
  
  console.log(`Unlocked Plots: ${plotCount}, Plot Farming Fortune: ${plotFF}`);
  return plotFF;
}

// Function to calculate farming fortune from pets
function calculatePetFF(profile) {
  // Log the received profile data for debugging
  // console.log("Profile data received in calculatePetFF:", profile);

  if (!profile || !profile.pets) {
    console.warn("Pets data not found.");
    return 0;
  }

  const pets = profile.pets;
  const activePet = profile.activePet;

  let petFF = 0;
  let petItemFF = 0;

  // Search for Rabbit, Elephant, or Mooshroom Cow pets
  const relevantPets = pets.filter(pet => ["RABBIT", "ELEPHANT", "MOOSHROOM_COW"].includes(pet.type));

  // Populate the pet dropdown only if it's not already populated
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
    if (activePet && relevantPets.some(pet => pet.type === activePet.type)) {
      petDropdown.value = activePet.type;
    } else {
      petDropdown.value = relevantPets[0].type;
    }

    // Attach change event listener to dropdown
    petDropdown.onchange = handlePetDropdownChange;
  }

  const selectedPetType = petDropdown ? petDropdown.value : null;
  const selectedPet = relevantPets.find(pet => pet.type === selectedPetType);
  const heldItem = selectedPet ? selectedPet.heldItem : null;

  petFF = getPetFF(selectedPetType);
  petItemFF = getPetItemFF(heldItem);
  console.log("Pet Farming Fortune:", petFF);
  console.log("Selected Pet Held Item:", heldItem);

  // Update pet item FF display
  const petItemFFElement = document.getElementById("petItemFF");
  if (petItemFFElement) {
    petItemFFElement.textContent = `Pet Item FF: ${petItemFF}`;
  }

  return petFF;
}

// Handler function for pet dropdown change
function handlePetDropdownChange() {
  const petDropdown = document.getElementById("petDropdown");

  console.log("Dropdown element:", petDropdown);

  if (petDropdown) {
    const selectedPet = petDropdown.value;
    console.log("Selected Pet:", selectedPet);
    
    // Find the selected pet in profile data to get the held item
    const selectedProfileData = JSON.parse(localStorage.getItem("SelectedProfileData"));
    const pets = selectedProfileData.pets;
    const selectedPetData = pets.find(pet => pet.type === selectedPet);
    const heldItem = selectedPetData ? selectedPetData.heldItem : null;
    console.log("Held Item:", heldItem);

    const petFF = getPetFF(selectedPet);
    const petItemFF = getPetItemFF(heldItem);
    console.log("Calculated Pet FF:", petFF);
    console.log("Calculated Pet Item FF:", petItemFF);

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

// Helper function to determine farming fortune from pet type
function getPetFF(petType) {
  let petFF = 0;
  if (petType === "RABBIT") {
    petFF = 50;
  } else if (petType === "ELEPHANT") {
    petFF = 100;
  } else if (petType === "MOOSHROOM_COW") {
    petFF = 200;
  }
  return petFF;
}

// Helper function to determine farming fortune from held item
function getPetItemFF(heldItem) {
  let petItemFF = 0;
  if (heldItem === "GREEN_BANDANA") {
    petItemFF += 10; // FIX THIS
  } else if (heldItem === "YELLOW_BANDANA") {
    petItemFF += 30;
  } else if (heldItem === "MINOS_RELIC") {
    petItemFF = Math.round(petItemFF * 1.33);
  }
  return petItemFF;
}
