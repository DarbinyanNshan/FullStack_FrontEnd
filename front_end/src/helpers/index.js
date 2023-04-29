export function getUserFromLocalStorage() {
    const user = localStorage.getItem('user')
    const parsedUser = JSON.parse(user || null)


    return parsedUser || {};
}