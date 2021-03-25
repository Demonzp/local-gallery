import { Form } from 'react-bootstrap';

const CustomFormInput = ({name, type="text", label, helpText, value, labelWidth, handleChange, ...rest}) => {
  //console.log('value = ', value);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Form.Label style={{width:`${labelWidth?labelWidth+'px':'auto'}`}}>{label}: </Form.Label>
      <Form.Control
        {...rest}
        name={name}
        value={value}
        type={type}
        className="mx-sm-3"
        onChange={handleChange}
      />
      {
        helpText?
        <Form.Text muted>
          {helpText}
        </Form.Text>:
        null
      }
      
    </div>
  );
};

export default CustomFormInput;