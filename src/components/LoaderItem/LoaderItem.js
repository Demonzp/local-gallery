import { Card, Col, Row } from 'react-bootstrap';
import styles from './LoaderItem.module.css';

let isCalc = false;

const LoaderItem = ({ file, updateMeta })=> {
  
  const handlerLoad = (e)=>{
    console.log('update = ', file.key);
    const img = e.target;
    const tempImg = new Image();
    tempImg.src = img.src;
    URL.revokeObjectURL(img.src);

    if(isCalc){
      return;
    }

    updateMeta(file.key, {width:tempImg.width,height:tempImg.height});
    isCalc = true;
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

          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LoaderItem;