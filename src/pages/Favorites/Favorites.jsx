import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../services/firebase.js";
import styles from "./Favorites.module.css";

export default function Favorites() {
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const storageKey = `favorites_${currentUser.uid || currentUser.email}`;
        const savedFavorites =
          JSON.parse(localStorage.getItem(storageKey)) || [];
        setFavoriteTeachers(savedFavorites);
      } else {
        setFavoriteTeachers([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const removeFavorite = (teacher) => {
    if (!user) return;

    const storageKey = `favorites_${user.uid || user.email}`;
    const currentFavorites = JSON.parse(localStorage.getItem(storageKey)) || [];

    const updatedFavorites = currentFavorites.filter(
      (fav) => fav.name !== teacher.name || fav.surname !== teacher.surname,
    );

    setFavoriteTeachers(updatedFavorites);
    localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));
    toast.info("Teacher removed from favorites.");
  };

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <p className={styles.emptyText}>
          Please log in to view your favorite teachers.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {favoriteTeachers.length === 0 ? (
        <p className={styles.emptyText}>
          You don't have any favorite teachers yet.
        </p>
      ) : (
        <ul className={styles.teachersList}>
          {favoriteTeachers.map((teacher, index) => (
            <li key={index} className={styles.teacherCard}>
              <div className={styles.cardContent}>
                <div className={styles.avatarWrapper}>
                  <img
                    src={teacher.avatar_url}
                    alt={`${teacher.name} ${teacher.surname}`}
                    className={styles.avatar}
                  />
                </div>

                <div className={styles.teacherInfo}>
                  <div className={styles.topInfo}>
                    <span className={styles.languagesTitle}>Languages</span>
                    <ul className={styles.stats}>
                      <li className={styles.listStyle}>
                        <img src="/assets/book-open.svg" alt="book-open" />
                        Lessons online
                      </li>
                      <li className={styles.listStyle}>
                        Lessons done: {teacher.lessons_done}
                      </li>
                      <li className={styles.listStyle}>
                        <img src="/assets/star.svg" alt="star" /> Rating:{" "}
                        {teacher.rating}
                      </li>
                      <li className={styles.listStyle}>
                        Price / 1 hour:{" "}
                        <strong className={styles.price}>
                          {teacher.price_per_hour}$
                        </strong>
                      </li>
                    </ul>

                    <button
                      type="button"
                      className={styles.favoriteBtn}
                      onClick={() => removeFavorite(teacher)}
                    >
                      <img src="/assets/heart-filled.svg" alt="favorite" />
                    </button>
                  </div>

                  <h2 className={styles.name}>
                    {teacher.name} {teacher.surname}
                  </h2>

                  <ul className={styles.details}>
                    <li className={styles.detailList}>
                      Speaks:{" "}
                      <b className={styles.listInfoUnderline}>
                        {teacher.languages.join(", ")}
                      </b>
                    </li>
                    <li className={styles.detailList}>
                      Lesson Info:{" "}
                      <b className={styles.listInfo}> {teacher.lesson_info}</b>
                    </li>
                    <li className={styles.detailList}>
                      Conditions:{" "}
                      <b className={styles.listInfo}>
                        {teacher.conditions.join(" ")}
                      </b>
                    </li>
                  </ul>

                  <details className={styles.dropdownInfo}>
                    <summary className={styles.readMoreBtn}>Read more</summary>
                    <p className={styles.experience}>{teacher.experience}</p>

                    {teacher.reviews && teacher.reviews.length > 0 && (
                      <ul className={styles.reviewsList}>
                        {teacher.reviews.map((review, rIndex) => (
                          <li key={rIndex} className={styles.reviewItem}>
                            <div className={styles.reviewerHeader}>
                              <img
                                src="/assets/avatar-default.svg"
                                alt={review.reviewer_name}
                                className={styles.reviewerAvatar}
                              />
                              <div className={styles.reviewerInfo}>
                                <b>{review.reviewer_name}</b>
                                <span>
                                  <img src="/assets/star.svg" alt="star" />{" "}
                                  {review.reviewer_rating}
                                </span>
                              </div>
                            </div>
                            <p className={styles.reviewComment}>
                              {review.comment}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>

                  <div className={styles.levelsList}>
                    {teacher.levels.map((level, idx) => (
                      <span key={idx} className={styles.levelTag}>
                        #{level}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
