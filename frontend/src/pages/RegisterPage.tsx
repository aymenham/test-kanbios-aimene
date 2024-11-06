import React from "react";
import { useForm } from "react-hook-form";

import TextInput from "../components/blocks/TextInput";
import Button from "../components/blocks/SubmitButton";
import Select from "../components/blocks/Select";
import { userRoleOptions } from "../constants/users";
import useToast from "../hooks/useToast";
import { Link } from "react-router-dom";
import { TUserRegister } from "../interfaces/user";
import { userRegister } from "../api/users";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<TUserRegister>();

  const { notifyError, notifySuccess } = useToast();

  const submitHandler = async (data: TUserRegister) => {
    try {
      const response = await userRegister(data);

      if (response) notifySuccess(`Utilisateur créer avec succès`);
    } catch (error: any) {
      const { message } = error.response?.data;
      notifyError(message || "Server Error");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Créez votre compte
            </h1>
            <form
              className="space-y-4 md:hspace-y-6"
              onSubmit={handleSubmit(submitHandler)}
            >
              <TextInput
                id="username"
                label="Nom d'utilisateur"
                placeholder="nom_utilisateur"
                register={register}
                setFocus={setFocus}
                validation={{ required: "Nom d'utilisateur requis" }}
                error={errors.username}
              />

              <TextInput
                id="firstName"
                label="Prénom"
                placeholder="Votre prénom"
                register={register}
                setFocus={setFocus}
                validation={{ required: "Prénom requis" }}
                error={errors.firstName}
              />

              <TextInput
                id="lastName"
                label="Nom de famille"
                placeholder="Votre nom de famille"
                register={register}
                setFocus={setFocus}
                validation={{ required: "Nom requis" }}
                error={errors.lastName}
              />

              <TextInput
                id="password"
                label="Mot de passe"
                placeholder="••••••••"
                register={register}
                setFocus={setFocus}
                validation={{
                  required: "Mot de passe requis",
                  minLength: {
                    value: 6,
                    message:
                      "Le mot de passe doit contenir au moins 6 caractères",
                  },
                }}
                error={errors.password}
              />

              <Select
                id="role"
                label="Rôle"
                options={userRoleOptions}
                register={register}
                setFocus={setFocus}
                error={errors.role}
              />

              <Button type="submit">S'inscrire</Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Se connecter
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
