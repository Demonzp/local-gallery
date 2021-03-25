import { useEffect, useState } from "react";

const SmallImg = ({ image, width='100%', widthCont = 220, heightCont = 220, styles={}, onLoad }) => {
  const [calcWidth, setCalcWidth] = useState(width);
  const [calcHeight, setCalcHeight] = useState('auto');

  useEffect(()=>{
    if(typeof width === 'number'){
      if(width>widthCont){
        setCalcWidth('100%');
      }
    }
  }, [width, widthCont]);

  const handlerLoad = (e)=>{

    const img = e.target;
    const tempImg = new Image();
    tempImg.src = img.src;
    URL.revokeObjectURL(img.src);

    const maxH = heightCont;
    let imgH = tempImg.height;
    let imgW = tempImg.width;

    if(imgH > maxH){
      //console.log('nen!!!');
      if(imgH > imgW){
        imgW = (imgW / imgH) * maxH;
        imgH = maxH;
        
        setCalcHeight(imgH);
        setCalcWidth(imgW);
      }
    }

    if(typeof onLoad==='function'){
      onLoad({width:tempImg.width,height:tempImg.height});
      return;
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        width: widthCont+'px',
        height: heightCont+'px',
        ...styles
      }}
    >
      <img
        style={{
          width: calcWidth,
          height: calcHeight
        }}
        src={URL.createObjectURL(image)}
        onLoad={handlerLoad}
        alt="..."
      />
    </div>
  );
}

export default SmallImg;