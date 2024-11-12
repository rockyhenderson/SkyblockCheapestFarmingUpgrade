document.addEventListener("DOMContentLoaded", () => {
    const fetchDataButton = document.getElementById("fetchDataButton");
  
    fetchDataButton.addEventListener("click", async () => {
      const username = document.getElementById("username").value;
      if (!username) {
        console.log("Please enter a username");
        return;
      }
  
      try {
        // Replace with your actual endpoint
        const response = await fetch(`/your-api-endpoint?username=${username}`);
        const data = await response.json();
  
        // Store the data locally
        localStorage.setItem("farmingData", JSON.stringify(data));
  
        // Log the data to the console
        console.log("Fetched and stored data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  });
  