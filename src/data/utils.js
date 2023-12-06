import { redirect } from "react-router-dom"

async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLoggedIn = localStorage.getItem("loggedin")

    if (!isLoggedIn) {
        return redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
    }
}

export default requireAuth;
