import { Switch } from 'react-router';
import RouteMiddelwares from './constants/routeMiddelwares';
import UnknownRoute from './middlewares/unknoun';
import AllRoute from './middlewares/all';
import routes from './routes';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { getImagesReq, getLastImagesReq, getLimitImagesReq } from './services/indexedDb';

function App() {
  const [lastImages, setLastImages] = useState([]);

  const addToLastImages = (image)=>{
    const limit = 4;

    setLastImages((prev)=>{
      const newData = [...prev, image];
      if(newData.length>limit){
        newData.shift();
      }
      return newData;
    });
  }

  useEffect(() => {
    
    getLastImagesReq()
      .then((res)=>{
        setLastImages(res.reverse());
      });
  }, []);

  const updateLastImages = (image)=>{
    if(!image){
      getLastImagesReq()
        .then((res)=>{
          setLastImages(res.reverse());
        });
      return;
    }
    
    const idx = lastImages.findIndex(({id})=>id===image.id);

    if(idx<0){
      return;
    }

    setLastImages((prev)=>{
      return[
        ...prev.slice(0, idx),
        image,
        ...prev.slice(idx+1)
      ];
    });

  }

  return (
    <div className="App">
      <Header />
      <Switch>
        {
          routes.map((route, i) => {
            switch (route.middelware) {
              case RouteMiddelwares.all:
                return (
                  <AllRoute
                    addToLastImages={addToLastImages}
                    lastImages={lastImages}
                    updateLastImages={updateLastImages}
                    {...route}
                    key={i}
                  />
                );
              default:
                console.error("Unknoun Middelware");
            }
          })
        }
        <UnknownRoute />
      </Switch>
    </div>
  );
}

export default App;