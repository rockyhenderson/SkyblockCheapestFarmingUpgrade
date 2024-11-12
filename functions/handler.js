const { fetchProfiles } = require('./hypixelClient');
const { formatProfileData } = require('./helpers');

exports.handler = async function (event) {
  const username = event.queryStringParameters.username;
  if (!username) {
    return { statusCode: 400, body: JSON.stringify({ message: "Username is required" }) };
  }

  try {
    const profiles = await fetchProfiles(username);
    const { profileData, skillApiDisabled } = await formatProfileData(profiles);

    return {
      statusCode: 200,
      body: JSON.stringify({
        profiles: profileData,
        skillApiDisabled,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: JSON.stringify({ message: "Internal Server Error" }) };
  }
};
