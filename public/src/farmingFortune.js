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
    // Retrieve the selected profile data from localStorage
    const selectedProfileData = JSON.parse(localStorage.getItem("SelectedProfileData"));
    
    // Log the full profile data for debugging
    console.log("Selected Profile Data:", selectedProfileData);
  
    // Ensure selectedProfileData exists before calculations
    if (!selectedProfileData) {
      console.warn("Selected profile data not found.");
      return;
    }
  
    // Initialize total farming fortune
    let totalFarmingFortune = 0;
  
    // Calculate farming fortune from skill level, passing in profile data
    totalFarmingFortune += calculateSkillFF(selectedProfileData); // Farming Skill Level
    // Other farming fortune sources can be added here
  
    // Display the total farming fortune on the page
    document.getElementById("totalFarmingFortune").textContent = `Total Farming Fortune: ${totalFarmingFortune}`;
    console.log("Total Farming Fortune:", totalFarmingFortune); // Log for debugging
  }
  
  
  function calculateSkillFF(profile) {
    // Log the received profile data for debugging
    console.log("Profile data received in calculateSkillFF:", profile);
  
    if (!profile || profile.farmingSkillLevel === undefined) {
      console.warn("Farming skill data not found.");
      return 0;
    }
  
    const farmingLevel = profile.farmingSkillLevel;
    const skillFF = farmingLevel * 4;
    console.log(`Farming Level: ${farmingLevel}, Skill Farming Fortune: ${skillFF}`);
    return skillFF;
  }
  