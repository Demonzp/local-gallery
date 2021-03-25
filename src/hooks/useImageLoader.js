import { useState } from 'react';
import { byteToMegaByte, createId, round, getFileName, getFileMimeType } from '../services/global';
import { addImageReq } from '../services/indexedDb';

export default function useImageLoader({addToLastImages}) {
  const [files, setFiles] = useState([]);

  const submit = (vals)=>{
    //console.log('vals = ', vals);
    delete vals.key;
    //console.log('vals = ', vals);
    addImageReq({
      ...vals, 
      file: files[0], 
      size: files[0].size,
      albomId: -1
    })
      .then((res)=>{
        addToLastImages(res);
      })
      .catch((error)=>{
        console.log('error = ', error);
      });
  }

  const updateMeta = (key, vals) => {
    const indx = files.findIndex(file => file.key === key);

    if (indx<0) {
      return;
    }

    const newFiles = files.map((file) => {
      if(file.key===key){
        for (const k in vals) {
          if (file.meta.hasOwnProperty(k)) {
            file.meta[k] = vals[k];
          }
        }
      }
      return file;
    });

    setFiles(newFiles);
  }

  const dellFile = (key) =>{
    const newFiles = files.filter(file=>file.key!==key);
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
        size: round(byteToMegaByte(file.size), 2)+' MB',
        name: getFileName(file.name),
        mimeType: getFileMimeType(file.type),
        discription: '',
        orientation: '',
        width: 0,
        height: 0,
        createAt: Date.now()
      }
      file.fieldMeta = {
        key: true,
        size: true,
        name: false,
        mimeType: true,
        discription: false,
        orientation: true,
        width: true,
        height: true,
        createAt: true
      }
      return file;
    });

    setFiles(prev => [...prev, ...newFiles]);
  };

  return {
    files,
    submit,
    handlerChange,
    updateMeta,
    dellFile
  }
}