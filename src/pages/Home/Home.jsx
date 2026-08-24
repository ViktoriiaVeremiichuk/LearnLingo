import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <div className={styles.home_content}>
        <div className={styles.home_text}>
          <h1 className={styles.title}>
            Unlock your potential with the best{" "}
            <span className={styles.title_span}>language</span> tutors
          </h1>
          <p className={styles.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <Link className={styles.getStartedBtn} to="/teachers">
            Get started
          </Link>
        </div>
        <div className={styles.home_image}>
          <img src="/src/assets/home-img.png" alt="Ukraine" />
        </div>
      </div>

      <div className={styles.stats_container}>
        <div className={styles.stat_item}>
          <h3>32,000 +</h3>
          <p>Experienced tutors</p>
        </div>
        <div className={styles.stat_item}>
          <h3>300,000 +</h3>
          <p>5-star tutor reviews</p>
        </div>
        <div className={styles.stat_item}>
          <h3>120 +</h3>
          <p>Subjects taught</p>
        </div>
        <div className={styles.stat_item}>
          <h3>200 +</h3>
          <p>Tutor nationalities</p>
        </div>
      </div>
    </div>
  );
}
