//används inte, se user under app


// "use client";
// import React, { useState } from 'react';
// import styles from '@/components/styles/UserComponent.module.scss';
// import UserFilter from './UserFilter';
// import Cart from '../Cart/Cart';
// import HeroHeading from '../General/HeroHeading';
// import Favorites from '../Favorites/Favorites';
// import AccountSettings from '../AccountSettings/AccountSettings';
// import Link from 'next/link';
// import OrderHistory from '../AccountSettings/OrderHistory';

// const UserComponent = () => {
//     const [componentToShow, setComponentToShow] = useState("favorites");

//     const user = "Jane Doe";

//     return (
//         <div className={styles.container}>
//             <HeroHeading heading={`Välkommen ${user}`} />
//             <div className={styles.filterAndInfoContainer}>
//                 {/* <UserFilter /> */}
//                 <aside className={styles.aside}>
//                     <nav className={styles.nav}>
//                         {/* <div className={styles.navItem}> */}
//                         <Link href="#" onClick={() => setComponentToShow('favorites')}>Favoriter</Link>
//                         {/* <div className={styles.caret}></div> */}
//                         {/* </div> */}
//                         <Link href="#" onClick={() => setComponentToShow('settings')}>Kontoinställningar</Link>
//                         <Link href="#" onClick={() => setComponentToShow('orderHistory')}>Tidigare beställningar</Link>
//                         {/* <Link href="#" onClick={() => setComponentToShow('cart')}>Varukorg</Link> */}
//                         <Link href="#">Logga ut</Link>
//                     </nav>
//                 </aside>
//                 <div className={styles.content}>
//                     {/* {
//                         componentToShow === "cart" &&
//                         <Cart />
//                     } */}
//                     {
//                         componentToShow === "favorites" &&
//                         <Favorites />
//                     }
//                     {
//                         componentToShow === "settings" &&
//                         <AccountSettings />
//                     }
//                     {
//                         componentToShow === "orderHistory" &&
//                         <OrderHistory />
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default UserComponent