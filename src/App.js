import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MemoPage } from './memoPage';
import { ChatPage } from './chatPage';
import Alert from "react-s-alert";
import './App.css';

function App() {
  return (
  <div className="App">
   <BrowserRouter>
        <Routes>
          <Route element={<ChatPage/>} path="/" exact  />
          <Route element={<MemoPage/>} path="/memo"  />
        </Routes>
   </BrowserRouter>
  </div>
  );
}

export default App;
