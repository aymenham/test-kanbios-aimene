import React from "react";
import { TUser } from "../../interfaces/user";
import Avatar from "./Avatar";
import { formatDateTime } from "../../utils";

type Props = {
  content: string;
  user: Omit<TUser, "password" | "role" | "_id">;
  date: string;
};

function ReceivedMessage({ content, user, date }: Props) {
  const { formattedDate, formattedTime } = formatDateTime(date);

  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <Avatar firstName={user.firstName} lastName={user.lastName} />
        <div className="relative ml-3 text-sm bg-white p-4 shadow rounded-xl max-w-xs flex flex-col justify-between">
          <div>{content}</div>

          <div className="flex justify-between mt-2 text-xs text-gray-500 gap-x-2">
            <span>{formattedDate}</span>
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceivedMessage;
