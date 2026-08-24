import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../services/firebase.js";
import RegisterModal from "../Modals/Register/RegisterModal";
import LoginModal from "../Modals/Login/LoginModal";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <NavLink className={styles.logoContainer} to="/">
          <img
            className={styles.logoIcon}
            src="/src/assets/ukraine.svg"
            alt="Ukraine"
          />
          <span className={styles.logoText}>LearnLingo</span>
        </NavLink>

        <nav className={styles.nav}>
          {user ? (
            <>
              <NavLink className={getNavLinkClass} to="/teachers">
                Teachers
              </NavLink>
              <NavLink className={getNavLinkClass} to="/favorites">
                Favorites
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className={getNavLinkClass} to="/">
                Home
              </NavLink>
              <NavLink className={getNavLinkClass} to="/teachers">
                Teachers
              </NavLink>
            </>
          )}
        </nav>
        <div className={styles.buttons}>
          {user ? (
            <div className={styles.userMenu}>
              <button onClick={handleLogout} className={styles.regist_btn}>
                Log out
              </button>
            </div>
          ) : (
            <>
              <button
                className={styles.login_btn}
                onClick={() => setIsLoginOpen(true)}
              >
                <img src="/src/assets/log-in.svg" alt="log-in btn" />
                Log in
              </button>
              <button
                className={styles.regist_btn}
                onClick={() => setIsRegisterOpen(true)}
              >
                Registration
              </button>
            </>
          )}
        </div>

        {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}

        {isRegisterOpen && (
          <RegisterModal onClose={() => setIsRegisterOpen(false)} />
        )}
      </div>
    </header>
  );
}
