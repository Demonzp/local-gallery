import {Modal, Button} from 'react-bootstrap';

const CustomModal = ({ isOpen, onOk=()=>{}, handlerClose, children }) => {
  return (
    <Modal show={isOpen} onHide={handlerClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handlerClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onOk}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );

};

export default CustomModal;