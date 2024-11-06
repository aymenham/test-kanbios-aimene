import apiClient from "../../config/axiosConfig";
import { TLogin } from "../../interfaces/auth";
import { TUserRegister } from "../../interfaces/user";

export const login = async (data: TLogin) => {
  try {
    const response = await apiClient.post("/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
