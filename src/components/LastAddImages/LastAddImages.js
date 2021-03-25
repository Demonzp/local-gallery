import React from 'react';
import { Row } from 'react-bootstrap';
import SmallImg from '../SmallImg';
import styles from './LastAddImages.module.css';

const LastAddImages = ({lastImages}) => {

  return (
    <Row className={`${styles.cont} justify-content-md-center`}>
      {
        lastImages.map((image) => {
          //console.log('image = ', image);
          return (
            <SmallImg 
              key={image.id} 
              image={image.file}
              width={image.width}
              styles={{marginRight:'5px'}}
            />
          );
        })
      }
    </Row>
  );
};

export default LastAddImages;