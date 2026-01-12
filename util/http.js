import axios from "axios";
import { backendUrl } from "../secrets";


const BACKEND_URL = backendUrl;


export const fetchSessionTypes = async () => {
  const response = await axios.get(`${BACKEND_URL}/sessionTypes.json`);

  const sessionTypes = [];

  for (const key in response.data) {
    const session = {
      id: key,
      name: response.data[key].name,
      description: response.data[key].description,
      image: response.data[key].image,
      typeId: response.data[key].typeId,
      locked: false, // possibility to lock access to sessions for user groups
    };
    sessionTypes.push(session);
  }

  return sessionTypes;
};

export const fetchSessions = async () => {
  const response = await axios.get(`${BACKEND_URL}/sessions.json`);

  const sessions = [];

  for (const key in response.data) {
    const item = response.data[key];

    const session = {
      id: key,
      name: item.name,
      description: item.description,
      instructor: item.instructor,
      imageUrl: item.imageUrl,
      videoId: item.videoId,
      duration: item.duration,
      type: item.type, // like "vinyasa", "hatha", etc.
    };

    sessions.push(session);
  }

  return sessions;
};