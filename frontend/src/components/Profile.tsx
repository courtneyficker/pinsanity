import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <div>
            {isAuthenticated && user &&
                <span>Greetings, {user.name}</span>
            }
        </div>
    );
};

export default Profile;
