const { fetchProfileSkills, fetchProfileWardrobe, fetchProfileArmor } = require('./hypixelClient');

const formatProfileData = async (profiles) => {
  const profileData = [];
  let skillApiDisabled = false;

  for (const profile of profiles) {
    const skills = await fetchProfileSkills(profile);
    const wardrobeItems = await fetchProfileWardrobe(profile);
    const equippedArmor = await fetchProfileArmor(profile);

    if (!skills) skillApiDisabled = true;

    profileData.push({
      profileId: profile.profileId,
      profileName: profile.profileName,
      selected: profile.selected,
      wardrobeItems,
      equippedArmor,
      farmingSkillLevel: skills?.farming?.level || null,
      farmingXP: skills?.farming?.xp || null,
      // Add other specific skills if required
    });
  }

  return { profileData, skillApiDisabled };
};

module.exports = { formatProfileData };
