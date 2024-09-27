import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

const menuItems = [
  { name: "Profile", link: "/app/profile" },
  { name: "Preferences", link: "/app/preferences" },
  { name: "Liked Podcasts", link: "/app/liked-podcasts" },
  { name: "Topics", link: "/app/topics" },
  { name: "Settings", link: "/app/settings" },
  { name: "Logout", link: "/logout" },
  { name: "Exit", link: "/app" },
];

interface SidebarProps {
  toggleSidebar: () => void;
  open: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar, open }) => {
  return (
    <div className={`${styles.sidebar} ${open && styles.open}`}>
      <div className={styles.header}>
        <img
          className={styles["close-button"]}
          aria-label="Close sidebar"
          onClick={toggleSidebar}
          src="assets/close.svg"
        ></img>
        <img className={styles.logo} src="assets/app-logo.svg" />
      </div>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.link} onClick={toggleSidebar}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
