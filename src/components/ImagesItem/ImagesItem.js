import { Button, Card, Col, Row } from 'react-bootstrap';
import SmallImg from '../SmallImg';
import CustomForm from '../CustomForm';
import CustomFormInput from '../CustomFormInput';
import useImageItems from '../../hooks/useImageItems';
import useCustomModal from '../../hooks/useCustomModal';
import CustomModal from '../CustomModal/CustomModal';
import { useState } from 'react';
import { updateImageReq } from '../../services/indexedDb';

const ImagesItem = ({ image, handlerUpdateImage }) => {
  const { vals } = useImageItems({ image });
  const { isOpen, handlerClose, handlerOpen } = useCustomModal();
  const [isSubmit, setIsSubmit] = useState(false);

  const handlerDownload = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(image.file);
    link.download = image.name + '.' + image.mimeType;
    link.click();
    URL.revokeObjectURL(image.file);
  }

  const handlerOkModal = () => {
    setIsSubmit(true);
  }

  const submit = (vals) => {
    const newImage = { ...image, ...vals };
    console.log(vals);
    updateImageReq(newImage)
      .then(() => {
        handlerUpdateImage(newImage);
        setIsSubmit(false);
        handlerClose();
      });
  }

  return (
    <Card>
      <CustomModal isOpen={isOpen} handlerClose={handlerClose} onOk={handlerOkModal}>
        <CustomForm
          vals={{ name: image.name, discription: image.discription }}
          submit={submit}
          isSubmit={isSubmit}
        >
          <CustomFormInput
            name="name"
            label="name"
            labelWidth={120}
          />
          <CustomFormInput
            name="discription"
            label="discription"
            as="textarea"
            labelWidth={120}
          />
        </CustomForm>
      </CustomModal>
      <Card.Body>
        <Row>
          <SmallImg image={image.file} width={image.width} />
          <Col>
            <Card>
              <Card.Body>
                {vals?
                  <CustomForm
                    vals={vals}
                    submit={() => { }}
                    isSubmit={false}
                  >
                    {Object.entries(vals).map(([key, _]) => {
                      let as;
                      if (key === 'discription') {
                        as = 'textarea';
                      }
                      return (
                        <CustomFormInput
                          key={key}
                          name={key}
                          label={key}
                          as={as}
                          labelWidth={120}
                          readOnly={true}
                        />
                      );
                    })
                    }
                  </CustomForm>:
                  null
                }
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className={`text-center`}>
              <Card.Body>
                <Col>
                  <Button
                    onClick={handlerDownload}
                  >
                    Download
                  </Button>{` `}
                  <Button
                    onClick={handlerOpen}
                  >
                    Edit
                  </Button>{` `}
                  <Button
                    variant="danger"
                    onClick={() => { }}
                  >
                    Delete
                  </Button>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ImagesItem;