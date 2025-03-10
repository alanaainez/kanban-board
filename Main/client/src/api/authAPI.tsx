import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorText = await response.json().catch(() => ({ error: "Unknown error" }));
      throw new Error(errorText || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token); // Store JWT for authentication
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};

export { login };
