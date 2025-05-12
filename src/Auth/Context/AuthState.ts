let setUser: ((user: any) => void) | null = null;

export const registerSetUser = (fn: (user: any) => void) => {
    setUser = fn;
};

export const setUserGlobally = (user: any) => {
    if (setUser) setUser(user);
};
