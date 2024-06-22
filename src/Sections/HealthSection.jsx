import React from "react";
import styles from "../App.module.css";

const HealthSection = ({ setFormValues, formValues }) => (
  <div>
    <div className={styles["form-group"]}>
      <label>Exercise Frequency:</label>
      <select
        name="exerciseFrequency"
        value={formValues.exerciseFrequency || ""}
        onChange={setFormValues}
        required
      >
        <option value="">Select...</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Rarely">Rarely</option>
      </select>
    </div>
    <div className={styles["form-group"]}>
      <label>Diet Preference:</label>
      <select
        name="dietPreference"
        value={formValues.dietPreference || ""}
        onChange={setFormValues}
        required
      >
        <option value="">Select...</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Vegan">Vegan</option>
        <option value="Non-Vegetarian">Non-Vegetarian</option>
      </select>
    </div>
  </div>
);

export default HealthSection;
