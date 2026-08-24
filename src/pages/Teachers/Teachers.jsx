import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { auth } from "../../services/firebase";
import { getTeachers } from "../../services/teachersApi";
import BookingModal from "../../components/Modals/Booking/BookingModal";
import styles from "./Teachers.module.css";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const storageKey = `favorites_${currentUser.uid || currentUser.email}`;
        const savedFavorites =
          JSON.parse(localStorage.getItem(storageKey)) || [];
        setFavorites(savedFavorites);
      } else {
        setFavorites([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchDat() {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error("Error loading teachers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDat();
  }, []);

  const toggleFavorite = (teacher) => {
    if (!user) {
      toast.warn("Please log in to view your favorite teachers.");
      return;
    }

    const storageKey = `favorites_${user.uid || user.email}`;

    const currentFavorites = JSON.parse(localStorage.getItem(storageKey)) || [];

    const isFavorite = currentFavorites.some(
      (fav) => fav.name === teacher.name && fav.surname === teacher.surname,
    );

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = currentFavorites.filter(
        (fav) => fav.name !== teacher.name || fav.surname !== teacher.surname,
      );
    } else {
      updatedFavorites = [...currentFavorites, teacher];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.teachersList}>
        {teachers.slice(0, visibleCount).map((teacher, index) => (
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
                      <img src="/src/assets/book-open.svg" alt="book-open" />
                      Lessons online
                    </li>
                    <li className={styles.listStyle}>
                      Lessons done: {teacher.lessons_done}
                    </li>
                    <li className={styles.listStyle}>
                      <img src="/src/assets/star.svg" alt="star" /> Rating:{" "}
                      {teacher.rating}
                    </li>
                    <li className={styles.listStyle}>
                      Price / 1 hour:{" "}
                      <strong className={styles.price}>
                        {teacher.price_per_hour}$
                      </strong>
                    </li>
                  </ul>

                  {(() => {
                    const isFavorite = favorites.some(
                      (fav) =>
                        fav.name === teacher.name &&
                        fav.surname === teacher.surname,
                    );
                    return (
                      <button
                        type="button"
                        className={styles.favoriteBtn}
                        onClick={() => toggleFavorite(teacher)}
                      >
                        <img
                          src={
                            isFavorite
                              ? "/src/assets/heart-filled.svg"
                              : "/src/assets/heart.svg"
                          }
                          alt="favorite"
                        />
                      </button>
                    );
                  })()}
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
                      {teacher.reviews.map((review, index) => (
                        <li key={index} className={styles.reviewItem}>
                          <div className={styles.reviewerHeader}>
                            <img
                              src="/src/assets/avatar-default.svg"
                              alt={review.reviewer_name}
                              className={styles.reviewerAvatar}
                            />
                            <div className={styles.reviewerInfo}>
                              <b>{review.reviewer_name}</b>
                              <span>
                                <img src="/src/assets/star.svg" alt="star" />{" "}
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

                  <button
                    className={styles.bookBtn}
                    onClick={() => {
                      setSelectedTeacher(teacher);
                    }}
                  >
                    Book trial lesson
                  </button>
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

      {visibleCount < teachers.length && (
        <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
          Load more
        </button>
      )}

      {selectedTeacher && (
        <BookingModal
          teacher={selectedTeacher}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
    </div>
  );
}
