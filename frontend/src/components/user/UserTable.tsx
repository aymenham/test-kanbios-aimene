import React, { useEffect, useState } from "react";
import UserInfo from "./UserInfo";
import { TUser } from "../../interfaces/user";
import { deleteUser, getAllUsers, updateUser } from "../../api/users";
import useToast from "../../hooks/useToast";

const UserTable = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const { notifyError, notifySuccess } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        notifyError("Erreur lors de la récupération des utilisateurs");
      }
    };

    fetchUsers();
  }, []);

  const onSave = async (updatedUser: TUser) => {
    const _id = (updatedUser as any).id;

    try {
      const response = await updateUser(_id, updatedUser);

      if (response) {
        notifySuccess(`Utilisateur mis à jour avec succès`);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser._id ? response : user
          )
        );
      }
    } catch (error: any) {
      const { message } = error.response?.data || "Erreur serveur";
      notifyError(message);
    }
  };

  const onDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => {
          const _id = (user as any).id;
          return _id !== userId;
        })
      );
      notifySuccess("Utilisateur supprimé avec succès");
    } catch (error: any) {
      const { message } = error.response?.data || "Erreur serveur";
      notifyError(message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom d'utilisateur
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prénom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rôle
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <UserInfo
              key={user.username}
              user={user}
              onSave={onSave}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
