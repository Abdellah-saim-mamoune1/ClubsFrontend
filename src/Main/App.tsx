import "./app.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {  BrowserRouter as Router } from 'react-router-dom';
import store from "../Slices/Store";
import {Container} from "./Container";
import { Provider } from "react-redux";

function App() {
 
  return(

        <Router>
        
          <Provider store={store}>
            <Container />
          </Provider>
        </Router>
  
    
  );
}

export default App
