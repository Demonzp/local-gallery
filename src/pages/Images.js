import { useSelector } from 'react-redux';

export default function Images(){
  const {images} = useSelector(state=>state.images);
  
  return(
    <div>
      {
        images.map(image=>{
          return(
            <img
              key={image.id} 
              src={image.src}
              alt="..."
            />
          );
        })
      }
    </div>
  );
}