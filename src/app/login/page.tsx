"use client";
import { useState } from "react";
// import { toast } from "sonner";
// import { useAuthStore } from "../store";
import { useRouter } from "next/navigation";
// import { Link } from "@/i18n/routing";

export default function LoginForm() {
    const router = useRouter();

    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [loading, setLoading] = useState(false);
    // zustand store. You can use Redux, Recoil, or any other
    // state management method.
    // const loginInState = useAuthStore((state: any) => state.login);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setErrors({});
        setLoading(true);

        // request to the API route we just created
        await fetch("/api/login", {
            method: "POST",
            body: formData
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    console.error(data);
                    if (data?.data) {
                        setErrors(data.data);
                    }
                    throw new Error(data?.message);
                }
                return data;
            })
            .then(({ data }) => {
                // If the login succeeds, store the user data, and token
                // in memory (state)
                // loginInState(data.token, data.user);
                // then redirect the user to the home page
                router.push("/");
            })
            .catch((error) => {
                // if anything went wrong show a toast error
                // toast.error(error?.message || "Something went wrong");
                console.log(error)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
                type="text"
                name="email"
                placeholder="Email"
            />
           <input
              type="password"
              name="password"
              placeholder="********"
            />
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
            </button>
        </form>
    );
}