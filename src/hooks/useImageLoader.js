import { useState } from 'react';
import { createId } from '../services/global';

export default function useImageLoader() {
  const [files, setFiles] = useState([]);

  const updateMeta = (key, vals) => {
    const indx = files.findIndex(file => file.key === key);

    if (indx<0) {
      return;
    }

    const newFiles = files.map((file) => {
      if(file.key===key){
        for (const k in vals) {
          if (file.meta.hasOwnProperty(k)) {
            console.log('k = ', vals[k]);
            file.meta[k] = vals[k];
          }
        }
      }
      return file;
    });

    setFiles(newFiles);
  }

  const handlerChange = (event) => {
    const tempFiles = event.target.files;

    if(tempFiles.length<=0){
      return;
    }

    const newFiles = [...tempFiles].map((file) => {
      file.key = createId(6);
      file.meta = {
        key: file.key,
        size: file.size,
        name: file.name,
        mimeType: '',
        discription: '',
        orientation: '',
        width: 0,
        height: 0,
        createAt: Date.now()
      }
      return file;
    });

    setFiles(prev => [...prev, ...newFiles]);
  };

  return {
    files,
    handlerChange,
    updateMeta
  }
}