import { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import styles from './LoaderItem.module.css';

const LoaderItem = ({ file, updateMeta }) => {

  const [isCalc, setIsCalc] = useState(false);

  const handlerLoad = (e) => {
    
    const img = e.target;
    const tempImg = new Image();
    tempImg.src = img.src;
    URL.revokeObjectURL(img.src);

    if (isCalc) {
      return;
    }
    //console.log('update = ', file.key);

    updateMeta(file.key, { width: tempImg.width, height: tempImg.height });
    setIsCalc(true);
  }

  return (
    <Row>
      <div
        className={`${styles.imgCont} d-flex justify-content-center align-items-center`}
      >
        <img
          className={styles.img}
          key={file.key}
          src={URL.createObjectURL(file)}
          onLoad={handlerLoad}
          alt="..."
        />
      </div>
      <Col>
        <Card className={styles.cardDisc}>
          <Card.Body>
            {Object.entries(file.meta).map(vals => {
                //console.log('vals = ', vals);
                return (
                  <div key={vals[0]}>{vals[0]}: {vals[1]}</div>
                );
              })
            }
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoaderItem;