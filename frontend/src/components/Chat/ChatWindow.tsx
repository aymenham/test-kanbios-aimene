import React, { useState } from "react";
import SentMessage from "./SentMessage";
import ReceivedMessage from "./ReceivedMessage";
import Footer from "./Footer";
import { TMessage } from "../../interfaces/messages";
import { TUser } from "../../interfaces/user";

interface ChatWindowProps {
  messages: TMessage[];
  user?: TUser | null;
  onSubmit: any;
  setMessage: any;
  message: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  user,
  onSubmit,
  setMessage,
  message,
}) => {
  return (
    <div className="flex flex-col flex-auto h-full p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              <div className="col-start-1 col-end-8 p-3 rounded-lg"></div>

              {messages.map((message) => {
                if (message.user.username === user?.username) {
                  return (
                    <SentMessage
                      key={message._id}
                      content={message.content}
                      user={message.user}
                      date={message.createdAt.toString()}
                    />
                  );
                } else {
                  return (
                    <ReceivedMessage
                      key={message._id}
                      content={message.content}
                      user={message.user}
                      date={message.createdAt.toString()}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
        <Footer message={message} onSubmit={onSubmit} setMessage={setMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
