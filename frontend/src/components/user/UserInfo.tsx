import React from "react";
import { useForm } from "react-hook-form";
import { TUser, UserRole } from "../../interfaces/user";

type UserInfoProps = {
  user: Omit<TUser, "password">;
  onSave: any;
  onDelete: (userId: string) => void;
};

const UserInfo: React.FC<UserInfoProps> = ({ user, onSave, onDelete }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>({
    defaultValues: user,
  });

  const onSubmit = (data: TUser) => {
    data.username = data.username.trim();

    onSave(data);
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <label
            htmlFor={`username-${user.username}`}
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nom d'utilisateur <span className="text-red-600">*</span>
          </label>
          <input
            {...register("username", {
              required: "Nom d'utilisateur requis",
              validate: (value) =>
                value.trim() !== "" || "Ne peut pas être vide",
            })}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="Entrez le nom d'utilisateur"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <label
            htmlFor={`firstName-${user.firstName}`}
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Prénom <span className="text-red-600">*</span>
          </label>
          <input
            {...register("firstName", { required: "Prénom requis" })}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="Entrez le prénom"
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <label
            htmlFor={`lastName-${user.lastName}`}
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nom <span className="text-red-600">*</span>
          </label>
          <input
            {...register("lastName", { required: "Nom requis" })}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            placeholder="Entrez le nom"
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <label
            htmlFor={`role-${user.role}`}
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Rôle <span className="text-red-600">*</span>
          </label>
          <select
            {...register("role", { required: "Rôle requis" })}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
          >
            <option value={UserRole.USER}>{UserRole.USER}</option>
            <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
        <button
          onClick={handleSubmit(onSubmit)}
          className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
        >
          Sauvegarder
        </button>
        <button
          onClick={() => {
            const id: string = (user as any).id;
            onDelete(id);
          }}
          className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
};

export default UserInfo;
