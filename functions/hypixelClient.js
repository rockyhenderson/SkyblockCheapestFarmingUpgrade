const hypixelClient = require('./config');

// Fetch profiles
const fetchProfiles = async (username) => {
  return await hypixelClient.getSkyblockProfiles(username);
};

// Fetch skills (if skill API is enabled)
const fetchProfileSkills = async (profile) => {
  try {
    return {
      farming: profile.me.skills.farming,
      combat: profile.me.skills.combat,
      // Add other relevant skills if needed
    };
  } catch {
    return null; // Skill API may be disabled
  }
};

// Fetch wardrobe items
const fetchProfileWardrobe = async (profile) => {
  try {
    return await profile.me.getWardrobe();
  } catch {
    return null;
  }
};

// Fetch equipped armor data
const fetchProfileArmor = async (profile) => {
  try {
    return await profile.me.getArmor();
  } catch {
    return null;
  }
};

module.exports = {
  fetchProfiles,
  fetchProfileSkills,
  fetchProfileWardrobe,
  fetchProfileArmor
};
