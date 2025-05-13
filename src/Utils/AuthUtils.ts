export async function fetchUser(): Promise<any | null> {
    try {
        const res = await fetch('http://localhost:8000/auth', { credentials: 'include' });
        if (!res.ok) return null;
        const { user } = await res.json();
        return user;
    } catch {
        return null;
    }
}
