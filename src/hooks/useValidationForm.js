import { useState, useEffect } from 'react';

// Cоздаём кастомный хук UseValidationForm.
const UseValidationForm = (callback, callbackError, initialState = {}, Validation, force, setForce) => {
  //console.log('initialState = ', initialState);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log('values = ', values);
  useEffect(()=>{
    if(!force){
      return;
    }
    //console.log('initialState = ', initialState);
    setValues(initialState);
    setForce(false);
  }, [force]);
  // Создаём функцию изменения.
  const handleChange = (event) => {
    const { name, value } = event.target;
    //console.log('name = ', name, 'val = ', value);
    setValues({
      ...values,
      [name]: value
    });
  };

  // Создаём функцию отправки.
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    // Обработчик ошибок.
    setErrors(Validation(values));
    //console.log('errors = ', errors);
    setIsSubmitting(true);
  };

  const handleReset = (event) => {
    //console.log('Reset completed.');
    setIsSubmitting(false);
    setErrors({});
    setValues(initialState);
  };

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        callback();
      } else {
        callbackError(errors);
      }
      setIsSubmitting(false);
    }
  }, [errors, callback, callbackError, isSubmitting]);

  return {
    handleChange,
    handleReset,
    handleSubmit,
    setValues,
    values,
    validErrors:errors,
    setErrors
  };
};

export default UseValidationForm;