import { useState, useEffect } from 'react';
import { Button, Row, Col, Card } from 'react-bootstrap';
import { getLimitImagesReq } from '../services/indexedDb';
import ImagesItem from '../components/ImagesItem';
import SimplePaginator from '../components/SimplePaginator';

export default function Images() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [countPages, setCountPages] = useState(1);

  useEffect(() => {
    if(page<=0){
      return;
    }
    //console.log('page = ', page);
    getLimitImagesReq(page)
      .then((res) => {
        //console.log('res = ', res);
        setImages(res.data);
        setCountPages(res.countPages);
      })
      .catch((error) => {
        console.log('error = ', error);
      });
  }, [page]);

  const handlerPage = (p) => {
    setPage(p);
  }

  return (
    <div
      style={{ marginTop: '8px' }}
    >
      <Row
        style={{ marginRight: 'auto', }}
        className="justify-content-center"
      >
        <SimplePaginator onPage={handlerPage} pages={countPages}/>
      </Row>
      {
        images.map(image => {
          return (
            <Row
              key={image.id}
              style={{ marginRight: 'auto', marginTop: '8px' }}
              className="justify-content-center"
            >
              <ImagesItem image={image} />
            </Row>
          );
        })
      }
      <Row
        style={{ marginRight: 'auto', marginTop: '8px' }}
        className="justify-content-center"
      >
        <SimplePaginator onPage={handlerPage} pages={countPages}/>
      </Row>
    </div>
  );
}