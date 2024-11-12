const dotenv = require("dotenv");
const Hypixel = require("hypixel-api-reborn");
dotenv.config();

exports.handler = async function (event, context) {
  const username = event.queryStringParameters.username;

  if (!username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Username is required" }),
    };
  }

  const apiKey = process.env.HYPIXEL_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "API key is missing" }),
    };
  }

  try {
    const hypixel = new Hypixel.Client(apiKey);
    console.log("Hypixel Client initialized");

    // Fetch player and profiles data
    const player = await hypixel.getPlayer(username);
    console.log("Player data fetched:", player ? "Yes" : "No player data");

    const profiles = await hypixel.getSkyblockProfiles(username);
    const profileData = [];

    for (const profile of profiles) {
      let wardrobeItems = null;
      let equippedArmor = null;

      // Fetch the wardrobe data
      try {
        wardrobeItems = await profile.me.getWardrobe();
        console.log(`Wardrobe data fetched for profile ${profile.profileName}`);
      } catch (err) {
        console.log(`Failed to fetch wardrobe data for profile ${profile.profileName}`);
      }

      // Fetch the equipped armor data
      try {
        equippedArmor = await profile.me.getArmor();
        console.log(`Equipped armor data fetched for profile ${profile.profileName}`);
      } catch (err) {
        console.log(`Failed to fetch equipped armor data for profile ${profile.profileName}`);
      }

      // Fetch skill levels
      let farmingSkill = null;
      try {
        farmingSkill = profile.me.skills.farming;
      } catch (err) {
        console.log("Skill API may be disabled for profile", profile.profileName);
      }

      // Fetch all pets and identify the active pet
      const pets = profile.me.pets || [];
      let activePet = null;

      pets.forEach((pet) => {
        if (pet.active) {
          activePet = pet;
        }
      });

      // Prepare profile data, including pets, armor, and skill information
      profileData.push({
        profileId: profile.profileId,
        profileName: profile.profileName,
        selected: profile.selected,

        farmingSkillLevel: farmingSkill ? farmingSkill.level : null,
        farmingXP: farmingSkill ? farmingSkill.xp : null,

        wardrobeItems: wardrobeItems,
        equippedArmor: equippedArmor,
        
        pets: pets, // All pets
        activePet: activePet, // Currently active pet, if any
      });
    }

    // Send full player and profile data, including pets
    return {
      statusCode: 200,
      body: JSON.stringify({
        playerLevel: player.level,
        playerUUID: player.uuid,
        profiles: profileData,
      }),
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
