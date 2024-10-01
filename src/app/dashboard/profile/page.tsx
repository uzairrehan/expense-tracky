"use client";

import Sidebar from "@/components/sidebar";
// import { useAuthContext } from "@/context/auth.context";


function Profile() {
    // const { user } = useAuthContext()
    // console.log(user);


    return (
        <>
                <Sidebar/>

            {/* <div className="profile-container" style={{backgroundColor: "black"}}>
                <div className="profile-info">
                    <ul>
                        <li>Name: {user.displayName}</li>
                        <li>Email: {user.email}</li>
                        <li>Emailverified: {JSON.stringify(user.emailVerified)}</li>
                    </ul>
                </div>
            // </div>*/}
        </> 
    );
} 

export default Profile;