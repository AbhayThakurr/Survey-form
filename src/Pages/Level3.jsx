import React, { useState, useEffect } from "react";
import axios from "axios";
import TechnologySection from "../Sections/TechnologySection";
import HealthSection from "../Sections/HealthSection";
import EducationSection from "../Sections/EducationSection";
import useFormValidation from "../useFormValidation";
import styles from "../App.module.css";

const Level3 = () => {
  const [surveyTopic, setSurveyTopic] = useState("");
  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [formValues, setFormValues, validateForm] = useFormValidation();

  useEffect(() => {
    if (surveyTopic) {
      axios
        .get(`https://api.example.com/questions?topic=${surveyTopic}`)
        .then((response) => {
          setAdditionalQuestions(response.data.questions);
        })
        .catch((error) =>
          console.error("Error fetching additional questions:", error)
        );
    }
  }, [surveyTopic]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid. Submit data:", formValues);
      // Show summary or process the form data here.
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["form-container"]}>
      <div className={styles["form-group"]}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formValues.fullName || ""}
          onChange={setFormValues}
          required
        />
      </div>
      <div className={styles["form-group"]}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formValues.email || ""}
          onChange={setFormValues}
          required
        />
      </div>
      <div className={styles["form-group"]}>
        <label>Survey Topic:</label>
        <select
          name="surveyTopic"
          value={surveyTopic}
          onChange={(e) => {
            setSurveyTopic(e.target.value);
            setFormValues(e); // Reset dependent values
          }}
          required
        >
          <option value="">Select...</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
        </select>
      </div>

      {surveyTopic === "Technology" && (
        <TechnologySection
          setFormValues={setFormValues}
          formValues={formValues}
        />
      )}
      {surveyTopic === "Health" && (
        <HealthSection setFormValues={setFormValues} formValues={formValues} />
      )}
      {surveyTopic === "Education" && (
        <EducationSection
          setFormValues={setFormValues}
          formValues={formValues}
        />
      )}

      <div className={styles["form-group"]}>
        <label>Feedback:</label>
        <textarea
          name="feedback"
          value={formValues.feedback || ""}
          onChange={setFormValues}
          required
          minLength={50}
        />
      </div>

      <button type="submit" className={styles.button}>
        Submit
      </button>

      <div className={styles["additional-questions"]}>
        <h3>Additional Questions</h3>
        {additionalQuestions.map((question, index) => (
          <div key={index} className={styles["form-group"]}>
            <label>{question.label}:</label>
            <input
              type="text"
              name={`additionalQuestion_${index}`}
              value={formValues[`additionalQuestion_${index}`] || ""}
              onChange={setFormValues}
            />
          </div>
        ))}
      </div>
    </form>
  );
};

export default Level3;
