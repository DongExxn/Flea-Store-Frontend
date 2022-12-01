import { jsx } from "@emotion/react";
import React from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();
    const refresh = async () => {
        const response = await axios.post(
            "/users/reissue",
            {
                refreshToken: auth.refreshToken,
            },
            {
                headers: {
                    "X-Auth-Token": `${auth.accessToken}`,
                },
            }
        );
        setAuth((prev) => {
            console.log(prev);
            console.log(response?.data?.userToken.accessToken);
            return {
                ...prev,
                accessToken: response.data.userToken.accessToken,
            };
        });
        return response.data.userToken.accessToken;
    };

    return refresh;
};

export default useRefreshToken;
