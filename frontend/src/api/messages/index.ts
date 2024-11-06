import apiClient from "../../config/axiosConfig";
import { TMessage } from "../../interfaces/messages";

export const getAllMessages = async (): Promise<TMessage[]> => {
  try {
    const response = await apiClient.get("/messages");
    return response.data;
  } catch (error) {
    throw error;
  }
};
