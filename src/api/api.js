import fetchMock from "fetch-mock";
import liveResults from "./mocks/liveResults";
import event from "./mocks/event";
import competition from "./mocks/competition";
import countries from "./mocks/countries";

fetchMock.mock("https://api.swimming.io/liveResults", liveResults);
fetchMock.mock("https://api.swimming.io/event", event);
fetchMock.mock("https://api.swimming.io/competition", competition);
fetchMock.mock("https://api.swimming.io/countries", countries);

export async function get(apiBaseUrl, endpoint) {
  try {
    const response = await fetch(`${apiBaseUrl}/${endpoint}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

async function handleResponse(response) {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(
      `API request failed with status ${response.status}: ${errorMessage}`
    );
  }
  
  const data = await response.json();
  return data;
}
