export async function fetchWithErrorHandling(
  url: string,
  options: RequestInit = {}
) {
  try {
    const response = await fetch(url, { ...options, credentials: "include" });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    return response.json();
  } catch (error) {
    alert(error.message || "Network error");
  }
}

export const baseURL = "http://localhost:3001";
