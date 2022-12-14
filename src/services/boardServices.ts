import axios from "axios";
import cryptoRandomString from "crypto-random-string";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("token") as string
    )}`,
  },
});

const getBoards = () => {
  return api.get("/boards");
};

const createBoard = (body: any) => {
  const safeUrl = cryptoRandomString({ length: 16, type: "url-safe" });
  return api.post("/boards", { ...body, safeUrl });
};

const getBoardData = (boardId: string | undefined) => {
  return api.get(`/boards/data/${boardId}`);
};

const createColumn = (body: any) => {
  return api.post("/boards/columns", body);
};

const createTask = (body: any) => {
  return api.post("/boards/tasks", body);
};

const updateColumn = (body: any) => {
  return api.put("/boards/columns", body);
};

const updateTask = (body: any) => {
  return api.put("/boards/tasks", body);
};

export default {
  getBoards,
  getBoardData,
  createBoard,
  createColumn,
  createTask,
  updateColumn,
  updateTask,
};
