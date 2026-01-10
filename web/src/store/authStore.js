import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth"

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    signup: async (email, password, name) => {
        set({ isLoading: true , error: null})
        try {
            const response = await axios.post(`${API_URL}/signup`, 
                { email, password, name })
            
            set({ 
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            })
        } 
        catch (err) {
            set({
            error: err.response.data.message, isLoading: false 
            
        });
        throw err;  
        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post   
        } catch(err){
            
        }
    },
    logout: async () => {
        set({ isLoading: true, error: null });
        try{
            await axios.post(`${API_URL}/logout`);

            set({ user: null, isAuthenticated: false, isLoading: false });
        }
        catch (err) {
            set({ error: err.response.data.message , isLoading: false })
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });

            set({ user: response.data.user, isAuthenticated: true, isLoading: false});

            return response.data;
        } catch (err) {
            set({ error: err.response.data.message, isLoading: false });
            throw err;
        }
    },
    checkAuth: async () => {
        await new Promise ((resolve) => setTimeout(resolve, 2000))
        set({ isCheckingAuth: true, error: null });
        try{
            const response = await axios.get(`${API_URL}/check-auth`);

            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });

            return response.data;
        }
        catch (err) {
            set({ error: err.response.data.message, isCheckingAuth: false });
            throw err;
        
        }
    
    },
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try{
            const response = await axios.post(`${API_URL}/forgot-password`, { email });

            set({ message: response.data.message, isLoading: false})
            
        } catch (err){
            set({ isLoading: false });
            console.log(err)
        }
    },
    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try{
            const res = await axios.post(`${API_URL}/reset-password/${token}`, { password });

            set({ message: res.data.message, isLoading: false });

        } catch (err) {
            set({
                error: err.response.data.message,
                isLoading: false
            })
        }
    },
}));