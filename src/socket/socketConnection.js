import { io } from "socket.io-client";




let currentPeerConnection = null;

const setCurrentPeerConnection = (peerConnection) => {
    currentPeerConnection = peerConnection;
};

let socket;

const serverURL = process.env.BASE_API_URL || "http://localhost:7000";

export const connectSocket = () => {
    console.log(serverURL);
    socket = io(serverURL);

    socket.on("connect", () => {
        console.log("socket connected");
    });

    socket.emit("helloFomClient");

    socket.on("disconnect", () => {
        console.log("socket disconnected");
    });

};

export const startNewMeeting = () => {
    socket.emit("start-meeting");
};

export const joinMeeting = (data) => {
    socket.emit("join-meeting", data);
};

export const leaveMeeting = (data) => {
    socket.emit("leave-meeting", data);
};

export const endMeeting = (data) => {
    socket.emit("end-meeting", data);
};


export const sendMessage = (data) => {
    socket.emit("send-message", data);
};

export const getMessages = (data) => {
    socket.emit("get-messages", data);
};