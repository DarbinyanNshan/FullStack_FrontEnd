export function getUserFromLocal() {
    const parsedUser = JSON.parse(localStorage.getItem('user') || null);
    return parsedUser;
}