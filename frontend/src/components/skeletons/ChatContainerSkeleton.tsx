import { Avatar, AvatarImage } from "../ui/avatar";

const ChatContainerSkeleton = () => {
    // Create an array of 6 items for skeleton messages
    const skeletonMessages = Array(6).fill(null);
  
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {skeletonMessages.map((_, idx) => (
          // Use daisyui's chat-start and chat-end
          <div key={idx} className={`flex items-start gap-3 ${idx % 2 === 0 ? "" : "flex-row-reverse"}`}>
            <Avatar className="size-10">
              <AvatarImage />
              <div className="size-10 rounded-full">
                <div className="w-full h-full rounded-full bg-muted animate-pulse" />
              </div>
            </Avatar>

            <div
              className="rounded-lg p-3 h-16 w-[40%] bg-muted animate-pulse"
            >
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ChatContainerSkeleton;