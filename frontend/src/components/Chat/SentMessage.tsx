import React from "react";
import Avatar from "./Avatar";
import { TUser } from "../../interfaces/user";
import { formatDateTime } from "../../utils";

type Props = {
  content: string;
  user: Omit<TUser, "password" | "role" | "_id">;
  date: string;
};
const SentMessage = ({ user, content, date }: Props) => {
  const { formattedDate, formattedTime } = formatDateTime(date);
  return (
    <div className="col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <Avatar firstName={user.firstName} lastName={user.lastName} />
        <div className="relative mr-3 text-sm bg-indigo-100 p-4 shadow rounded-xl max-w-xs flex flex-col justify-between">
          <div>{content}</div>
          <div className="flex justify-between mt-2 text-xs text-gray-500 gap-x-2">
            <span>{formattedDate}</span>
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentMessage;
