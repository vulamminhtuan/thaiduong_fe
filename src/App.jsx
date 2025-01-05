import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from "./components/AuthContext";
import PageRoutes from './routes';
import './i18n';
const App = () => {
  
  return (
    <AuthProvider>
      <PageRoutes />
</AuthProvider>
  );
};

export default App;
