import { useRef } from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import useImageLoader from '../../hooks/useImageLoader';
import LoaderItem from '../LoaderItem/LoaderItem';

export default function ImageLoader() {
  const inputEl = useRef(null);

  const { files, handlerChange, updateMeta } = useImageLoader();

  return (
    <Card>
      <Card.Body>
        <Row className="justify-content-center">
          <Button
            variant="success"
            onClick={() => inputEl.current.click()}
          >Add Image</Button>{' '}
          <input
            className="d-none"
            ref={inputEl}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/bmp"
            multiple
            onChange={handlerChange}
          />
        </Row>
        {files.map(file => <LoaderItem
          file={file}
          updateMeta={updateMeta}
          key={file.key} />
        )}

        {files.length > 0 ?
          <Row className="justify-content-center">
            <Button
              variant="success"
              onClick={() => inputEl.current.click()}
            >Add Image</Button>
          </Row> :
          null
        }
      </Card.Body>
    </Card>
  );
}