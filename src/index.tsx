import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './reset.css';
import './theme.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Splash from "./layouts/Splash";
import NavLayout from "./layouts/NavLayout";
import MissionLayout from "./layouts/MissionLayout";
import AgentLayout from "./layouts/AgentLayout";
import DreamLogLayout from "./layouts/DreamLogLayout";
import Mission from "./pages/Mission";
import Agent from "./pages/Agent";
import DreamLog from "./pages/DreamLog";
import missions from './data/missions.json';
import agents from './data/agents.json';
import dreamLogs from './data/dream-logs.json';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />}>
          <Route path="/" element={<NavLayout />}>
            <Route index element={<Navigate to="/missions" />}/>
            <Route path="/missions" element={<MissionLayout />}>
              <Route index element={<Navigate to={`${missions.length - 1}`} />}/>
              {
                missions.map((mission, index) =>
                  <Route key={index} path={`${index}`} element={<Mission index={index} />}/>
                )
              }
            </Route>
            <Route path="/agents" element={<AgentLayout />}>
              <Route index element={<Agent index={-1} />}/>
              {
                agents.map((agent, index) =>
                  <Route key={index} path={`${index}`} element={<Agent index={index} />}/>
                )
              }
            </Route>
            <Route path="/dream-logs" element={<DreamLogLayout />}>
              <Route index element={<Navigate to={`${dreamLogs.length - 1}`} />}/>
              {
                dreamLogs.map((dreamLog, index) =>
                  <Route key={index} path={`${index}`} element={<DreamLog index={index} />}/>
                )
              }
            </Route>
          </Route>
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();