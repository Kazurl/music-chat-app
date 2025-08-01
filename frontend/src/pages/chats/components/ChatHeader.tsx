import { Avatar } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import { X } from "lucide-react";
import { useEffect } from "react";


const ChatHeader = () => {
    const {
        onlineUsers,
        selectedUser,
        setSelectedUser,
    } = useChatStore();

    useEffect(() => {
        // add event listener when component mounts
        document.addEventListener("keydown", handleKeyDownCloseChat);

        // clean up event listener when component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyDownCloseChat);
        }
    }, []);

    const handleKeyDownCloseChat = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            setSelectedUser(null);
        }
    };

    if (!selectedUser) return;

    return (
        <div className="p-2.5 border-b border-zinc-800">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                {/* Avatar Image of Selected User */}
                <Avatar>
                    <div className="size-10 rounded-full relative">
                    <img src={selectedUser.imageUrl} alt={selectedUser.fullName[0]} />
                    </div>
                </Avatar>

                {/* Selected User info incl online/offline state */}
                <div>
                    <h3 className="font-medium">{selectedUser?.fullName}</h3>
                    <p className="text-sm text-base-content/70">
                    {onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
                    </p>
                </div>
                </div>

                {/* Close button */}
                <button onClick={() => setSelectedUser(null)}>
                <X />
                </button>
            </div>
            </div>
    );
};

export default ChatHeader;