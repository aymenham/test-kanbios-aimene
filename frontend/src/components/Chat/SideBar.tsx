import React from "react";
import { useUser } from "../../hooks/useUser";
import { useLogout } from "../../hooks/useLogout";

type Props = {};

const SideBar = (props: Props) => {
  const { user } = useUser();

  const logout = useLogout();

  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      <div className="flex flex-row items-center justify-center h-12 w-full">
        <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            ></path>
          </svg>
        </div>
        <div className="ml-2 font-bold text-2xl">Chat</div>
      </div>
      <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          <img
            src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
            alt="Avatar"
            className="h-full w-full"
          />
        </div>
        <div className="text-sm font-semibold mt-2 uppercase">{`${user?.firstName} ${user?.lastName}`}</div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="flex items-center justify-center bg-red-500 text-white w-full py-2 mt-4 rounded-xl hover:bg-red-600"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H3"
          ></path>
        </svg>
        <span className="font-semibold">Déconnexion</span>
      </button>
    </div>
  );
};

export default SideBar;
