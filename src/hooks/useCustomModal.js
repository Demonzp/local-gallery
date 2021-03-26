import { useState } from 'react';

const useCustomModal = ()=>{
  const [isOpen, setIsOpen] = useState(false);

  const handlerClose = ()=>{
    setIsOpen(false);
  }

  const handlerOpen = ()=>{
    setIsOpen(true);
  }

  return {
    isOpen,
    handlerClose,
    handlerOpen
  };
}

export default useCustomModal;