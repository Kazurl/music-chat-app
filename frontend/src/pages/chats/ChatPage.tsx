import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersSidebar from "./components/UsersSidebar";
import ChatHeader from "./components/ChatHeader";
import ChatContainer from "./components/ChatContainer";
import MessageInput from "./components/MessageInput";


const ChatPage = () => {
  const { user } = useUser();
  const { selectedUser, fetchUsers, fetchMessages } = useChatStore();
  // fetch all online users
  useEffect(() => {
    if (user) fetchUsers();
  }, [user, fetchUsers]);

  // fetch chat messages with selected user
  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);  // can also use _id
  }, [selectedUser, fetchMessages]);

    return (
      <main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
        <Topbar />
        <div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
          <UsersSidebar />

          {/* chat message */}
          <div className="flex flex-col h-full">
            {selectedUser ? (
              <>
                <ChatHeader />
                <ChatContainer />
                <MessageInput />
              </>
            ) : (
              <NoConversationPlaceholder />
            )}
          </div>
        </div>
      </main>
    );
};

const NoConversationPlaceholder = () => (
	<div className='flex flex-col items-center justify-center h-full space-y-6'>
		<img src='/spotify.png' alt='Spotify' className='size-16 animate-bounce' />
		<div className='text-center'>
			<h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
			<p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
		</div>
	</div>
);

export default ChatPage;