import { useState } from "react";

const useFormValidation = () => {
  const [formValues, setFormValuesState] = useState({});
  const [errors, setErrors] = useState({});

  const setFormValues = (e) => {
    const { name, value } = e.target;
    setFormValuesState({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.fullName) newErrors.fullName = "Full Name is required";
    if (!formValues.email || !/\S+@\S+\.\S+/.test(formValues.email))
      newErrors.email = "Email is invalid";
    if (!formValues.surveyTopic)
      newErrors.surveyTopic = "Survey Topic is required";
    if (formValues.surveyTopic === "Technology") {
      if (!formValues.favoriteProgrammingLanguage)
        newErrors.favoriteProgrammingLanguage =
          "Favorite Programming Language is required";
      if (!formValues.yearsOfExperience)
        newErrors.yearsOfExperience = "Years of Experience is required";
    }
    if (formValues.surveyTopic === "Health") {
      if (!formValues.exerciseFrequency)
        newErrors.exerciseFrequency = "Exercise Frequency is required";
      if (!formValues.dietPreference)
        newErrors.dietPreference = "Diet Preference is required";
    }
    if (formValues.surveyTopic === "Education") {
      if (!formValues.highestQualification)
        newErrors.highestQualification = "Highest Qualification is required";
      if (!formValues.fieldOfStudy)
        newErrors.fieldOfStudy = "Field of Study is required";
    }
    if (!formValues.feedback || formValues.feedback.length < 50)
      newErrors.feedback = "Feedback must be at least 50 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return [formValues, setFormValues, validateForm];
};

export default useFormValidation;
