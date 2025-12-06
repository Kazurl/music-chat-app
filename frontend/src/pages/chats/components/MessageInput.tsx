import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react";


const MessageInput = () => {
    const [ message, setMessage ] = useState("");
    const { user } = useUser();
    const { selectedUser, sendMessage } = useChatStore();

    const handleSendMessage = () => {
        if (!selectedUser || !user || !message) return;
        try {
            sendMessage(selectedUser.clerkId, user.id, message.trim());
            setMessage("");
        } catch (error: unknown) {
            console.error("Failed to send message in MessageInput.tsx: ", error);
        }
    };

    return (
        <div className="p-4 w-full">
            <div className="mb-3 flex items-center gap-2">
                <Input 
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-zinc-800 border-none"
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button
                    size={"icon"}
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                >
                    <Send className="size-4"/>
                </Button>
            </div>
        </div>
    );
};

export default MessageInput;