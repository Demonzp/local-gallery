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
    // getLimitImagesReq(page)
    //   .then((res) => {
    //     console.log('res = ', res);
    //     setFiles(res.data);
    //     setCountPages(res.countPages);
    //   })
    //   .catch((error) => {
    //     console.log('error = ', error);
    //   });
    // getImagesReq()
    //   .then((res)=>{
    //     console.log('res = ', res);
    //     setFiles(res);
    //   })
    //   .catch((error)=>{
    //     console.log('error = ', error);
    //   });
  }, []);

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