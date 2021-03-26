import { useRef, useState } from 'react';
import { Card, Button, Row } from 'react-bootstrap';
import useImageLoader from '../../hooks/useImageLoader';
import LoaderItem from '../LoaderItem/LoaderItem';

export default function ImageLoader({addToLastImages}) {
  const inputEl = useRef(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const { files, handlerChange, updateMeta, dellFile, submit } = useImageLoader({addToLastImages});

  return (
    <Card>
      <Card.Body>
        {files.map(file => <LoaderItem
          submit={submit}
          isSubmit={isSubmit}
          file={file}
          updateMeta={updateMeta}
          dellFile={dellFile}
          key={file.key} />
        )}

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
            //multiple
            onChange={handlerChange}
          />
        </Row>

        {files.length > 0 ?
          <Row className="justify-content-end">
            <Button
              onClick={() => { setIsSubmit(true) }}
            >Load Images</Button>
          </Row> :
          null
        }
      </Card.Body>
    </Card>
  );
}