import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { UserContext } from "../contexts/UserContext";

const SocketComponent: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { userData, setRoleData } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const socketInstance = io("http://localhost:3001", {
      auth: {
        token: token,
      },
    });
    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && userData) { // Check if userData is defined
      console.log("socket connected");
      socket.on(`message_${userData.id}`, (message: string) => {
        const parsedMessage = JSON.parse(message);
        console.log("parsedMessage", parsedMessage);
        setRoleData(parsedMessage);
      });

      // Clean up the event listener when the socket or userData changes
      return () => {
        socket.off(`message_${userData.id}`);
      };
    }
  }, [socket, userData]); // Add userData to dependencies

  return <></>;
};

export default SocketComponent;
