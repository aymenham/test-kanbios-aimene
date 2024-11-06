import React from "react";

type Props = {
  firstName: string;
  lastName: string;
};

const Avatar = ({ firstName, lastName }: Props) => {
  return (
    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white">
      {`${firstName.charAt(0).toUpperCase()}${lastName
        .charAt(0)
        .toUpperCase()}`}
    </div>
  );
};

export default Avatar;
