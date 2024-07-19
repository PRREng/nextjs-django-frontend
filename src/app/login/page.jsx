"use client"
import { useAuth } from "@/components/authProvider";
const LOGIN_URL = "/api/login/"

export default function Page() {
    const auth = useAuth();

    async function handleSubmit (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const objectFromForm = Object.fromEntries(formData);
        const jsonData = JSON.stringify(objectFromForm);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData,
        }
        const response = await fetch(LOGIN_URL, requestOptions);
        if (response.ok) {
            auth.login();
        }
    }

    return (
        <div className="h-[95vh]">
            <div className="max-w-md mx-auto py-5">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <input type="text" required name="username" placeholder="Usuário" />
                    <input type="password" required name="password" placeholder="Senha" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}