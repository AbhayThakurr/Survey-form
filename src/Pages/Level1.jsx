// src/EventRegistrationForm.js
import React, { useState, useEffect } from "react";
import styles from "../App.module.css";

// Custom hook for form validation
const useFormValidation = (initialState, validate, onSubmit) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        onSubmit();
        setIsSubmitting(false);
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

const Level1 = () => {
  const initialState = {
    name: "",
    email: "",
    age: "",
    attendingWithGuest: "No",
    guestName: "",
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    }
    if (!values.age) {
      errors.age = "Age is required";
    } else if (isNaN(values.age) || values.age <= 0) {
      errors.age = "Age must be a number greater than 0";
    }
    if (values.attendingWithGuest === "Yes" && !values.guestName) {
      errors.guestName = "Guest name is required";
    }
    return errors;
  };

  const submitForm = () => {
    alert(JSON.stringify(values, null, 2));
  };

  const { handleChange, handleSubmit, values, errors } = useFormValidation(
    initialState,
    validate,
    submitForm
  );

  return (
    <form onSubmit={handleSubmit} className={styles["form-container"]}>
      <div className={styles["form-group"]}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div className={styles["form-group"]}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div className={styles["form-group"]}>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={values.age}
          onChange={handleChange}
        />
        {errors.age && <p>{errors.age}</p>}
      </div>
      <div className={styles["form-group"]}>
        <label>Are you attending with a guest?</label>
        <select
          name="attendingWithGuest"
          value={values.attendingWithGuest}
          onChange={handleChange}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      {values.attendingWithGuest === "Yes" && (
        <div className={styles["form-group"]}>
          <label>Guest Name:</label>
          <input
            type="text"
            name="guestName"
            value={values.guestName}
            onChange={handleChange}
          />
          {errors.guestName && <p>{errors.guestName}</p>}
        </div>
      )}
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default Level1;
