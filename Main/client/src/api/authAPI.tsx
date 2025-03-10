import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    let data;
    try {
      data = await response.json(); // Attempt to parse JSON
    } catch (jsonError) {
      console.error("Response is not JSON:", jsonError);
      throw new Error("Unexpected server response");
    }

    if (!response.ok) {
      throw new Error("Login failed");
    }

    localStorage.setItem("token", data.token); // Store JWT for authentication
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

export { login };
