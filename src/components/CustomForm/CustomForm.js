import useSimpleForm from '../../hooks/useSimpleForm';
import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const CustomForm = ({ submit, vals, errors = {}, validation = () => { return {} }, isLoading, isSubmit, children, handlerError = () => { } }) => {
  const {fields, btns, navs, handleSubmit} = useSimpleForm({submit, vals, validation, children, isLoading, isSubmit});

  return (
    <Form onSubmit={handleSubmit}>
      <div className="d-flex flex-column">
        {fields}
        <div className="d-flex justify-content-end">
          {btns}
        </div>
      </div>
    </Form>
  );
}

export default CustomForm;