import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react"; 
import { useState, useEffect } from "react";

// typescript adds in type to all var/ return; here token can be valid or invalid if user not authenticated
const updateApiToken = (token: string | null) => {
    if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    else delete axiosInstance.defaults.headers.common["Authorization"];  // tell backend user not authenticated
};

const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const { getToken, userId } = useAuth();
    const [ loading, setLoading ] = useState(true);
    const { checkAdminStatus } = useAuthStore();
    const { initSocket, disconnectSocket } = useChatStore();

    useEffect(() => {
        const initAuth = async () => {
            try {
                // we want to try to update token in Authorisation headers when fetch from backend using axios
                const token = await getToken();
                updateApiToken(token);
                if (token) {
                    await checkAdminStatus();
                    // init socket
                    if (userId) initSocket(userId);
                }
            } catch (error) {
                updateApiToken(null);
                console.log("Error in auth provider", error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        // clean up (i.e socket) after close browser
        return () => {
            disconnectSocket();
        };
    }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center">
            <Loader className="size-8 text-primary animate-spin" />
        </div>
    )
  return (
    <div>{children}</div>
  )
}

export default AuthProvider;