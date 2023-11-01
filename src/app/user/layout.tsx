import UserNav from "@/components/User/UserNav"
import styles from "@/app/user/layout.module.scss";
import HeroHeading from "@/components/General/HeroHeading";

const user = "Jane Doe";

export default function UserLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <HeroHeading heading={`Välkommen ${user}`} />
            <div className={styles.menuAndChildrenContainer}>
                <UserNav />
                {children}
            </div>

        </section>
    )
}