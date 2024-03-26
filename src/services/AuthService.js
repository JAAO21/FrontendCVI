export const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    if (token && token !== "undefined") {
        return true
    } else {
        return false
    }
}