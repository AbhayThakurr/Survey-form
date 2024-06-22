import React from "react";
import styles from "../App.module.css";

const EducationSection = ({ setFormValues, formValues }) => (
  <div>
    <div className={styles["form-group"]}>
      <label>Highest Qualification:</label>
      <select
        name="highestQualification"
        value={formValues.highestQualification || ""}
        onChange={setFormValues}
        required
      >
        <option value="">Select...</option>
        <option value="High School">High School</option>
        <option value="Bachelor's">Bachelor's</option>
        <option value="Master's">Master's</option>
        <option value="PhD">PhD</option>
      </select>
    </div>
    <div className={styles["form-group"]}>
      <label>Field of Study:</label>
      <input
        type="text"
        name="fieldOfStudy"
        value={formValues.fieldOfStudy || ""}
        onChange={setFormValues}
        required
      />
    </div>
  </div>
);

export default EducationSection;
