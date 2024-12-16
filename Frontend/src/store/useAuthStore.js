import { create } from "zustand";
import { axiosInstance } from "../Lib/axiosInstance";

export const useAuthstore = create((set) => ({
    authUser: null,
    isSignUp: false,
    isLogin: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/verify");

            set({ authUser: res.data });
        } catch (error) {
            console.log('Error in checkAuth:', error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    }
}))