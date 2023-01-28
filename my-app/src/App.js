import "./App.css";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers/reducers";
import createHistory from "history/createBrowserHistory";
import { AllRoutes } from "./components/routes";
import { Header } from "./components/header";

export const history = createHistory();

function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <Header />
          <AllRoutes />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
