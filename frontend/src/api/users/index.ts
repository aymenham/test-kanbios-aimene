import apiClient from "../../config/axiosConfig";
import { TUser, TUserRegister } from "../../interfaces/user";
// Récupérer tous les utilisateurs
export const getAllUsers = async (): Promise<TUser[]> => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Récupérer un utilisateur par son ID
export const getUserById = async (id: string): Promise<TUser> => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userRegister = async (data: TUserRegister) => {
  try {
    const response = await apiClient.post("/users", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (id: string, data: TUser): Promise<TUser> => {
  try {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Supprimer un utilisateur
export const deleteUser = async (id: string): Promise<{ message: string }> => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
