import React from 'react';
import ImageLoader from '../components/ImageLoader';
import LastAddImages from '../components/LastAddImages';
import {Container} from 'react-bootstrap';

export default function Home({addToLastImages, lastImages}){
  
  return(
    <Container>
      <LastAddImages lastImages={lastImages}/>
      <ImageLoader addToLastImages={addToLastImages}/>
    </Container>
  );
}