/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("good response", async () => {
  mockedAxios.get.mockResolvedValue({
    status: 200,
    data: {
      name: "Luke Skywalker",
      height: "172",
    },
  });

  const response = await axios.get("https://swapi.dev/api/people/1");

  expect(response.status).toBe(200);
  expect(response.data).toEqual({
    name: "Luke Skywalker",
    height: "172",
  });
  expect(axios.get).toHaveBeenCalledWith("https://swapi.dev/api/people/1");
});

test("bad response", async () => {
  mockedAxios.get.mockRejectedValue({
    response: {
      status: 404,
      data: "Not Found",
    },
  });

  try {
    await axios.get("https://swapi.dev/api/people/999");
  } catch (error: any) {
    if (error.response) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe("Not Found");
    } else {
      throw new Error(`Unexpected error format: ${JSON.stringify(error)}`);
    }
  }

  expect(axios.get).toHaveBeenCalledWith("https://swapi.dev/api/people/999");
});

test("different response based on URL", async () => {
  mockedAxios.get.mockImplementation((url) => {
    if (url === "https://swapi.dev/api/people/1") {
      return Promise.resolve({
        data: { name: "Luke Skywalker" },
      });
    } else if (url === "https://swapi.dev/api/people/2") {
      return Promise.resolve({
        data: { name: "C-3PO" },
      });
    } else {
      return Promise.reject({ response: { status: 404 } });
    }
  });

  const response1 = await axios.get("https://swapi.dev/api/people/1");
  const response2 = await axios.get("https://swapi.dev/api/people/2");

  expect(response1.data.name).toBe("Luke Skywalker");
  expect(response2.data.name).toBe("C-3PO");

  try {
    await axios.get("https://swapi.dev/api/people/999");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      expect(error.response.status).toBe(404);
    }
  }
});
