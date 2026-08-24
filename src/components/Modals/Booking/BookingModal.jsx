import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "../../../utils/validationSchemas.js";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../services/firebase.js";
import styles from "./BookingModal.module.css";

export default function BookingModal({ teacher, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
  });

  const onSubmit = async (data) => {
    try {
      const bookingData = {
        teacherName: `${teacher.name} ${teacher.surname}`,
        teacherId: teacher.id || null,
        reason: data.reason,
        fullname: data.fullname,
        email: data.email,
        phone: data.phone,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "bookings"), bookingData);

      toast.success("Trial lesson successfully booked!");
      onClose();
    } catch (error) {
      toast.error("Booking failed. Please try again.");
    }
  };

  const onError = (errors) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          <img src="/src/assets/x.svg" alt="Close button" />
        </button>

        <div className={styles.modalContainer}>
          <h2 className={styles.title}>Book trial lesson</h2>
          <p className={styles.description}>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>

          <div className={styles.teacherInfo}>
            <img
              src={teacher.avatar_url}
              alt={`${teacher.name} ${teacher.surname}`}
              className={styles.teacherAvatar}
            />
            <div>
              <span className={styles.teacherLabel}>Your teacher</span>
              <h3 className={styles.teacherName}>
                {teacher.name} {teacher.surname}
              </h3>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className={styles.form}
          >
            <div className={styles.radioGroup}>
              <legend className={styles.legend}>
                What is your main reason for learning English?
              </legend>

              {[
                "Career and business",
                "Lesson for kids",
                "Living abroad",
                "Exams and coursework",
                "Culture, travel or hobby",
              ].map((reasonOption, idx) => (
                <label key={idx} className={styles.radioLabel}>
                  <input
                    type="radio"
                    value={reasonOption}
                    {...register("reason")}
                    className={styles.radioInput}
                  />
                  {reasonOption}
                </label>
              ))}
              {errors.reason && (
                <p className={styles.error}>{errors.reason.message}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Full Name"
                {...register("fullname")}
                className={styles.input}
              />
              {errors.fullname && (
                <p className={styles.error}>{errors.fullname.message}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={styles.input}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email.message}</p>
              )}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="tel"
                placeholder="Phone number"
                {...register("phone")}
                className={styles.input}
              />
              {errors.phone && (
                <p className={styles.errorText}>{errors.phone.message}</p>
              )}
            </div>

            <button type="submit" className={styles.submitBtn}>
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
