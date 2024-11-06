import React, { useEffect, useState } from "react";
import { getAllMessages } from "../api/messages";
import { TMessage } from "../interfaces/messages";
import { useUser } from "../hooks/useUser";
import socket from "../config/socket";
import ChatWindow from "../components/Chat/ChatWindow";
import Layout from "../components/Layout";

const MainPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<TMessage[]>([]);

  const { user } = useUser();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getAllMessages();
        setMessages(data);
        console.log("dataaa", data[0].createdAt);
      } catch (err) {
        console.log("errooror", err);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    socket.connect();
    socket.off("newMessage");
    socket.on("newMessage", (newMessage: TMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSubmit = () => {
    if (user) {
      const sendMessage: Omit<TMessage, "_id" | "createdAt"> = {
        content: message,
        user: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          username: user?.username,
        },
      };
      socket.emit("sendMessage", { sendMessage });
      setMessage("");
    }
  };

  return (
    <Layout>
      <ChatWindow
        messages={messages}
        user={user}
        onSubmit={onSubmit}
        setMessage={setMessage}
        message={message}
      />
    </Layout>
  );
};

export default MainPage;
