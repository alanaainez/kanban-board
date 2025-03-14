import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const responseData = await response.json().catch(() => ({ error: "Invalid response from server" }));

    if (!response.ok) {
      console.error("Login failed:", responseData.error);
      throw new Error(responseData.error || "Login failed");
    }

    if (!responseData.token) {
      throw new Error("No token received.");
    }

    localStorage.setItem("id_token", responseData.token);
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error logging in:", error.message);
    } else {
      console.error("Error logging in:", error);
    }
    return null;
  }
};

export { login };
