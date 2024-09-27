import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

const menuItems = [
  { name: "Profile", link: "/profile" },
  { name: "Preferences", link: "/preferences" },
  { name: "Liked Podcasts", link: "/liked-podcasts" },
  { name: "Topics", link: "/topics" },
  { name: "Settings", link: "/settings" },
  { name: "Logout", link: "/logout" },
  { name: "Exit", link: "/exit" },
];

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <button className={styles["close-button"]} aria-label="Close sidebar">
        ×
      </button>
      <nav>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
