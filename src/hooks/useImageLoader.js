import { useState } from 'react';
import { createId } from '../services/global';

export default function useImageLoader() {
  const [files, setFiles] = useState([]);
  const [metaFiles, setMetaFiles] = useState([]);

  const updateMeta = (key, vals) => {
    const indx = metaFiles.findIndex(meta => meta.key === key);

    if (indx<0) {
      return;
    }

    const newMeta = {...metaFiles[indx]};

    for (const k in vals) {
      if (newMeta.hasOwnProperty(k)) {
        newMeta[k] = vals[k];
      }
    }

    setMetaFiles(prev => {
      return [
        ...prev.slice(0, indx),
        newMeta,
        ...prev.slice(indx + 1)
      ]
    });
  }

  const handlerChange = (event) => {
    const tempFiles = event.target.files;
    
    if(tempFiles.length<=0){
      return;
    }

    let newMeta = [];
    const newFiles = [...tempFiles].map((file) => {
      file.key = createId(6);

      newMeta.push({
        key: file.key,
        size: file.size,
        name: file.name,
        mimeType: '',
        discription: '',
        orientation: '',
        width: 0,
        height: 0,
        createAt: Date.now()
      });
      //console.log('file = ', file);
      return file;
    });

    setFiles(prev => [...prev, ...newFiles]);
    setMetaFiles(prev => [...prev, ...newMeta]);
  };

  return {
    files,
    metaFiles,
    handlerChange,
    updateMeta
  }
}