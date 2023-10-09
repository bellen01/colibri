"use client";
import UserNav from "@/components/User/UserNav";
import styles from "@/app/user/layout.module.scss";
import HeroHeading from "@/components/General/HeroHeading";
import { useEffect, useState } from "react";
import { getUserData } from "../posters/fetchFunctions";
import { User } from "@/types/User.types";

const user = "Jane Smith";

export default function UserLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    const [userData, setUserData] = useState<User>();

    useEffect(() => {
        getUserData().then(data => { if (data) { setUserData(data[0]) } });
    }, [])

    console.log('userdata i layout', userData);

    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            {/* <HeroHeading heading={`Välkommen ${user}`} /> */}
            <HeroHeading heading={`Välkommen ${userData?.firstName} ${userData?.lastName}`} />
            <div className={styles.menuAndChildrenContainer}>
                <UserNav />
                {children}
            </div>

        </section>
    )
}