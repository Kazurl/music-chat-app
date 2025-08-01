import ChatContainerSkeleton from "@/components/skeletons/ChatContainerSkeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";


const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })
};

const ChatContainer = () => {
    const { user } = useUser(); 
    const { selectedUser, isLoading, messages, fetchMessages } = useChatStore();
    const messageEndRef = useRef<HTMLDivElement | null>(null);  // last line of msg to keep latest in view

    useEffect(() => {
        if (selectedUser) fetchMessages(selectedUser.clerkId);
    }, [selectedUser, fetchMessages]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (!selectedUser) return;
    if (isLoading) {
        return(
            <ChatContainerSkeleton />
        );
    }

    return (
        <ScrollArea className="h-[calc(100vh-340px)]">
            <div className="p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`flex items-start gap-3 ${
                            message.senderId === user?.id ? "flex-row-reverse" : ""
                        }`}
                        ref={messageEndRef}
                    >
                        <Avatar className="size-10">
                            <AvatarImage 
                                src={message.senderId === user?.id
                                            ? user.imageUrl
                                            : selectedUser.imageUrl   
                                }
                            />
                        </Avatar>
                        <div className={`rounded-lg p-3 max-w-[70%] ${
                            message.senderId === user?.id ? "bg-primary" : "bg-zinc-800"
                        }`}>
                            <p className="text-sm">{message.content}</p>
                            <span className="text-xs text-zinc-300 mt-1 block">
                                {formatTime(message.createdAt)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
};

export default ChatContainer;