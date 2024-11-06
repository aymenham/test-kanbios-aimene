import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../api/auth";
import { TLogin } from "../interfaces/auth";
import TextInput from "../components/blocks/TextInput";
import SubmitButton from "../components/blocks/SubmitButton";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useJwt } from "../hooks/useJwt";
import { UserRole } from "../interfaces/user";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<TLogin>();

  const { notifyError } = useToast();

  const navigate = useNavigate();
  const { setItem } = useLocalStorage();
  const { decodeToken } = useJwt();

  const submitHandler = async (data: TLogin) => {
    try {
      const response = await login(data);
      const { access_token: token } = response;

      setItem("token", token);

      const decodedToken = decodeToken(token);

      if (decodedToken) {
        const role = decodedToken.role;

        if (role === UserRole.ADMIN) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
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
              Connectez-vous à votre compte
            </h1>
            <form
              className="space-y-4 md:hspace-y-6"
              onSubmit={handleSubmit(submitHandler)}
            >
              <TextInput
                id="username"
                label="Nom d'utilisateur"
                placeholder="Nom d'utilisateur"
                register={register}
                setFocus={setFocus}
                validation={{ required: "Nom d'utilisateur requis" }}
                error={errors.username}
              />

              <TextInput
                id="password"
                label="Mot de passe"
                placeholder="••••••••"
                register={register}
                setFocus={setFocus}
                validation={{ required: "Mot de passe requis" }}
                error={errors.password}
                type="password"
              />

              <SubmitButton type="submit">Se connecter</SubmitButton>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Vous n'avez pas encore de compte ?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  S'inscrire
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
