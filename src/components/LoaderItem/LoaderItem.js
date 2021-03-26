import { useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import Orientation from '../../constants/orientation';
import CustomForm from '../CustomForm';
import CustomFormInput from '../CustomFormInput';
import SmallImg from '../SmallImg';
import styles from './LoaderItem.module.css';

const getOrientation = (w, h) => {
  const diff = w - h;

  if (diff > 0) {
    return Orientation.albom;
  } else if (diff < 0) {
    return Orientation.portrait;
  } else {
    return Orientation.square;
  }
};

const LoaderItem = ({ file, updateMeta, dellFile, isSubmit, submit }) => {

  const [isCalc, setIsCalc] = useState(false);
  //console.log('isSubmit = ', isSubmit);

  const handlerLoad = ({ width, height }) => {

    // const img = e.target;
    // const tempImg = new Image();
    // tempImg.src = img.src;
    // URL.revokeObjectURL(img.src);

    if (isCalc) {
      return;
    }
    //console.log('update = ', file.key);

    updateMeta(file.key, {
      width: width,
      height: height,
      orientation: getOrientation(width, height)
    });
    setIsCalc(true);
  }

  const preSubmit = (vals) => {
    submit(vals);
    //console.log('vals = ', vals);
  }

  return (
    <Row>
      <SmallImg
        image={file}
        onLoad={handlerLoad}
        styles={{ minWidth: '220px', minHeight: '220px' }}
      />
      <Col>
        <Card className={styles.cardDisc}>
          <Card.Body>
            <CustomForm
              vals={file.meta}
              submit={preSubmit}
              isSubmit={isSubmit}
            >
              {Object.entries(file.meta).map(([key, _]) => {
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
                    readOnly={file.fieldMeta[key]}
                  />
                );
              })
              }
            </CustomForm>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className={`text-center`}>
          <Card.Body>
            <Button
              variant="danger"
              onClick={() => dellFile(file.key)}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoaderItem;