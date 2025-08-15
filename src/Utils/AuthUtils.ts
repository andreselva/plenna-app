import axiosInstance from "../api/axiosInstance";

export async function fetchUser(): Promise<any | null> {
    try {
        const res = await axiosInstance.get('/auth');
        const user = res.data.user;
        return user || null;
    } catch {
        return null;
    }
}
