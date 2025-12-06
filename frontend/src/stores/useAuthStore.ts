import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

interface AuthStore {
    isAdmin: boolean;
    isLoading: boolean;
    error: string | null;

    checkAdminStatus: () => Promise<void>;
    reset: () => void; 
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    isLoading: false,
    error: null,

    checkAdminStatus: async () => {
        set({ isLoading: true, error: null});
        try {
            const res = await axiosInstance.get("/admin/check");
            set({ isAdmin: res.data.admin });
        } catch (error: unknown) {
            let errorMessage = "An error occurred";
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const response = (error as { response: { data: { message: string } } }).response;
                errorMessage = response.data.message;
            }
            set({ isAdmin: false, error: errorMessage });
            toast.error(errorMessage);
        } finally {
            set({ isLoading: false });
        }
    },

    reset: () => {
        set({ isAdmin: false, isLoading: false, error: null});
    },
}));