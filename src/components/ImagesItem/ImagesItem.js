import { Button, Card, Col, Row } from 'react-bootstrap';
import SmallImg from '../SmallImg';
import CustomForm from '../CustomForm';
import CustomFormInput from '../CustomFormInput';
import useImageItems from '../../hooks/useImageItems';

const ImagesItem = ({ image }) => {
  const { vals } = useImageItems({ image });

  const handlerDownload = ()=>{
    const link = document.createElement("a");
    link.href = URL.createObjectURL(image.file);
    link.download = image.name+'.'+image.mimeType;
    link.click();
    URL.revokeObjectURL(image.file);
  }

  return (
    <Card>
      <Card.Body>
        <Row>
          <SmallImg image={image.file} width={image.width} />
          {vals ?
            <Col>
              <Card>
                <Card.Body>
                  <CustomForm
                    vals={vals}
                    submit={() => { }}
                    isSubmit={false}
                  >
                    {Object.entries(vals).map(([key, _]) => {
                      return (
                        <CustomFormInput
                          key={key}
                          name={key}
                          label={key}
                          labelWidth={120}
                          readOnly={true}
                        />
                      );
                    })
                    }
                  </CustomForm>
                </Card.Body>
              </Card>
            </Col> :
            null
          }
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
                    onClick={() => { }}
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