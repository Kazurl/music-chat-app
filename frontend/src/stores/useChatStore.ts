import { create } from "zustand";
import { io, Socket } from "socket.io-client";


import { Message, User } from "@/types";
import { axiosInstance } from "@/lib/axios";

interface ChatStore {
    users: User[],
    isLoading: boolean;
    error: string | null;
    messages: Message[];
    selectedUser: User | null;
    isConnected: boolean;
    onlineUsers: Set<string>;
    socket: Socket | null;
    userActivities: Map<string, string>;

    fetchUsers: () => Promise<void>;
    initSocket: (userId: string) => void;
    disconnectSocket: () => void;
    fetchMessages: (userId: string) => Promise<void>;
    sendMessage: (receiverId: string, senderId: string, content: string) => void;
    setSelectedUser: (user: User | null) => void;
}

const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

const socket = io(baseUrl, {
    autoConnect: false,  // only connect if user is auth
    withCredentials: true,
});

export const useChatStore = create<ChatStore> ((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    messages: [],
    selectedUser: null,
    isConnected: false,
    onlineUsers: new Set(),
    socket: socket,
    userActivities: new Map(),

    setSelectedUser: (user) => set({ selectedUser: user }),

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.get("/users");
            // set({ users: res.data });
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    initSocket: (userId) => {
        if (!get().isConnected) {
            socket.auth = { userId };
            socket.connect();

            socket.emit("userConnected", userId);

            // listen to online users
            socket.on("usersOnline", (users: string[]) => {
                set({ onlineUsers: new Set(users) });
            });

            // listen to activities
            socket.on("activities", (activities: [string, string][]) => {
                set({ userActivities: new Map(activities) });
            });

            // listen to new user connection
            socket.on("userConnected", (userId: string) => {
                set((state) => ({
                    onlineUsers: new Set([...state.onlineUsers, userId]),
                }));
            });

            // listen to when user disconnects
            socket.on("userDisconnected", (userId: string) => {
                set((state) => {
                    const newOnlineUsers = new Set(state.onlineUsers);
                    newOnlineUsers.delete(userId);
                    return { onlineUsers: newOnlineUsers };
                });
            });

            // listen to receive message event
            socket.on("receiveMessage", (message: Message) => {
                set((state) => ({
                    messages: [...state.messages, message],
                }));
            });

            // listen to message sent event
            socket.on("messageSent", (message: Message) => {
                set((state) => ({
                    messages: [...state.messages, message],
                }));
            });

            // listen when update activity
            socket.on("activityUpdated", ({ userId, activity }) => {
                set((state) => {
                    const newActivities = new Map(state.userActivities);
                    newActivities.set(userId, activity);
                    return { userActivities: newActivities };
                });
            });
        };

        set({ isConnected: true });
    },

    disconnectSocket: () => {
        if (get().isConnected) {
            socket.disconnect();
            set({ isConnected: false });
        }
    },

    fetchMessages: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const res = await axiosInstance.get(`/users/messages/${userId}`);
            set({ messages: res.data });
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            set({ error: errorMessage });
        } finally {
            set({ isLoading: false });
        }
    },

    sendMessage: async (receiverId, senderId, content) => {
        const socket = get().socket;
        if (!socket) return;
        socket.emit("sendMessage", {receiverId, senderId, content});
    }
}));