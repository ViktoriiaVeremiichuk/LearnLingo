import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginSchema } from "../../../utils/validationSchemas.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase.js";
import styles from "./LoginModal.module.css";

export default function LoginModal({ onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setAuthError("");
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onClose();
    } catch (error) {
      console.error("Login error:", error.code);
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setAuthError("Invalid email or password.");
      } else {
        setAuthError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={onClose}>
          <img src="/assets/x.svg" alt="Close modal" />
        </button>

        <h2 className={styles.title}>Log In</h2>
        <p className={styles.text}>
          Welcome back! Please enter your credentials to access your account and
          continue your learning journey.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className={styles.errorText}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.passwordWrapper}>
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={
                    showPassword ? "/assets/eye-on.svg" : "/assets/eye-off.svg"
                  }
                  alt="Toggle password visibility"
                />
              </button>
            </div>
            {errors.password && (
              <p className={styles.errorText}>{errors.password.message}</p>
            )}
          </div>

          {authError && <p className={styles.errorText}>{authError}</p>}

          <button className={styles.logInBtn} type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
