import React, { FC } from "react";
import styles from "./styles.scss"
const Caption: FC<{content: string}> = ({content}) => {
    return (<div className={styles.captionContainer}>
        <div className={styles.circle}></div>
        <div className={styles.content}>{content}</div>
    </div>)
};

export default Caption;
