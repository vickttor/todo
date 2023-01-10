import styles from "./styles.module.css";

import rocketSvg from "../../assets/rocket.svg";

export function Header() {
  return (
    <header className={styles.container}>
      <img src={rocketSvg} alt="rocket icon" />
      <h1 className={styles.title}>
        to<span className={styles.titleSpan}>do</span>
      </h1>
    </header>
  );
}
