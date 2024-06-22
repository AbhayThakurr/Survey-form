import React, { useState } from "react";
import styles from "../App.module.css";

const JLevel2 = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    position: "",
    relevantExperience: "",
    portfolioURL: "",
    managementExperience: "",
    additionalSkills: [],
    preferredInterviewTime: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const positions = ["Developer", "Designer", "Manager"];
  const skills = ["JavaScript", "CSS", "Python"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        additionalSkills: checked
          ? [...prevData.additionalSkills, value]
          : prevData.additionalSkills.filter((skill) => skill !== value),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.fullName) {
      tempErrors["fullName"] = "Full Name is required";
      isValid = false;
    }
    if (!formData.email) {
      tempErrors["email"] = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors["email"] = "Email is invalid";
      isValid = false;
    }
    if (!formData.phoneNumber) {
      tempErrors["phoneNumber"] = "Phone Number is required";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      tempErrors["phoneNumber"] = "Phone Number is invalid";
      isValid = false;
    }
    if (["Developer", "Designer"].includes(formData.position)) {
      if (!formData.relevantExperience || formData.relevantExperience <= 0) {
        tempErrors["relevantExperience"] =
          "Relevant Experience is required and must be greater than 0";
        isValid = false;
      }
    }
    if (formData.position === "Designer" && !formData.portfolioURL) {
      tempErrors["portfolioURL"] = "Portfolio URL is required";
      isValid = false;
    } else if (
      formData.position === "Designer" &&
      !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.portfolioURL)
    ) {
      tempErrors["portfolioURL"] = "Portfolio URL is invalid";
      isValid = false;
    }
    if (formData.position === "Manager" && !formData.managementExperience) {
      tempErrors["managementExperience"] = "Management Experience is required";
      isValid = false;
    }
    if (formData.additionalSkills.length === 0) {
      tempErrors["additionalSkills"] = "At least one skill must be selected";
      isValid = false;
    }
    if (!formData.preferredInterviewTime) {
      tempErrors["preferredInterviewTime"] =
        "Preferred Interview Time is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className={styles["form-container"]}>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p>{errors.fullName}</p>}
          </div>
          <div className={styles["form-group"]}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className={styles["form-group"]}>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
          </div>
          <div className={styles["form-group"]}>
            <label>Applying for Position:</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
          {["Developer", "Designer"].includes(formData.position) && (
            <div className={styles["form-group"]}>
              <label>Relevant Experience (years):</label>
              <input
                type="number"
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
              />
              {errors.relevantExperience && <p>{errors.relevantExperience}</p>}
            </div>
          )}
          {formData.position === "Designer" && (
            <div className={styles["form-group"]}>
              <label>Portfolio URL:</label>
              <input
                type="text"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={handleChange}
              />
              {errors.portfolioURL && <p>{errors.portfolioURL}</p>}
            </div>
          )}
          {formData.position === "Manager" && (
            <div className={styles["form-group"]}>
              <label>Management Experience:</label>
              <input
                type="text"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
              />
              {errors.managementExperience && (
                <p>{errors.managementExperience}</p>
              )}
            </div>
          )}
          <div className={styles["form-group"]}>
            <label>Additional Skills:</label>
            {skills.map((skill) => (
              <div key={skill}>
                <input
                  type="checkbox"
                  name="additionalSkills"
                  value={skill}
                  checked={formData.additionalSkills.includes(skill)}
                  onChange={handleChange}
                />
                {skill}
              </div>
            ))}
            {errors.additionalSkills && <p>{errors.additionalSkills}</p>}
          </div>
          <div className={styles["form-group"]}>
            <label>Preferred Interview Time:</label>
            <input
              type="datetime-local"
              name="preferredInterviewTime"
              value={formData.preferredInterviewTime}
              onChange={handleChange}
            />
            {errors.preferredInterviewTime && (
              <p>{errors.preferredInterviewTime}</p>
            )}
          </div>
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      ) : (
        <div>
          <h2>Application Submitted Successfully</h2>
          <p>Full Name: {formData.fullName}</p>
          <p>Email: {formData.email}</p>
          <p>Phone Number: {formData.phoneNumber}</p>
          <p>Applying for Position: {formData.position}</p>
          {["Developer", "Designer"].includes(formData.position) && (
            <p>Relevant Experience: {formData.relevantExperience} years</p>
          )}
          {formData.position === "Designer" && (
            <p>Portfolio URL: {formData.portfolioURL}</p>
          )}
          {formData.position === "Manager" && (
            <p>Management Experience: {formData.managementExperience}</p>
          )}
          <p>Additional Skills: {formData.additionalSkills.join(", ")}</p>
          <p>Preferred Interview Time: {formData.preferredInterviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default JLevel2;
