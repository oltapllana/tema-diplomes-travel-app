export const registerUser = async ({ username, email, password, role }) => {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, role }),
    });

    return response.json();
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.error(`Failed to login: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("User deleted successfully");
    } else {
      console.error("Failed to delete user:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting user:", error.message);
  }
};
