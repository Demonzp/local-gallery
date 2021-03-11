import { Switch } from 'react-router';
import RouteMiddelwares from './constants/routeMiddelwares';
import UnknownRoute from './middlewares/unknoun';
import AllRoute from './middlewares/all';
import routes from './routes';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        {
          routes.map((route, i) => {
            switch (route.middelware) {
              case RouteMiddelwares.all:
                return(
                  <AllRoute
                    {...route}
                    key={i}
                  />
                );
              default:
                console.error( "Unknoun Middelware" );
            }
          })
        }
        <UnknownRoute />
      </Switch>
    </div>
  );
}

export default App;