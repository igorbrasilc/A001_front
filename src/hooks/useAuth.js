import { useContext } from "react";
import { UserContext } from "../contexts/UserContext.js";

export default function useAuth() {
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("useAuth must be used inside a AuthContext Provider");
    }

    return userContext;
}