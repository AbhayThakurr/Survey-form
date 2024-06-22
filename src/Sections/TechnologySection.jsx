import React from "react";
import styles from "../App.module.css";

const TechnologySection = ({ setFormValues, formValues }) => (
  <div>
    <div className={styles["form-group"]}>
      <label>Favorite Programming Language:</label>
      <select
        name="favoriteProgrammingLanguage"
        value={formValues.favoriteProgrammingLanguage || ""}
        onChange={setFormValues}
        required
      >
        <option value="">Select...</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
        <option value="Java">Java</option>
        <option value="C#">C#</option>
      </select>
    </div>
    <div className={styles["form-group"]}>
      <label>Years of Experience:</label>
      <input
        type="number"
        name="yearsOfExperience"
        value={formValues.yearsOfExperience || ""}
        onChange={setFormValues}
        required
      />
    </div>
  </div>
);

export default TechnologySection;
