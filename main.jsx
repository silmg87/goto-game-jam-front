import './src/index.css';
import ReactDOM from 'react-dom/client'
import App from './src/App';
import { UserDataContextProvider } from './src/contexts/userDataContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <UserDataContextProvider>
        <App/>
    </UserDataContextProvider>
  </>
)
