import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './reset.css';
import './theme.css';
import './index.css';
import SplashLayout from "./layouts/SplashLayout";
import NavigationLayout from "./layouts/NavigationLayout";
import MissionLayout from "./layouts/MissionLayout";
import AgentLayout from "./layouts/AgentLayout";
import DreamLogLayout from "./layouts/DreamLogLayout";
import MissionPage from "./pages/MissionPage";
import AgentPage from "./pages/AgentPage";
import DreamLogPage from "./pages/DreamLogPage";
import missions from './data/missions.json';
import agents from './data/agents.json';
import dreamLogs from './data/dream-logs.json';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashLayout />}>
          <Route path="/" element={<NavigationLayout />}>
            <Route index element={<Navigate to="/missions" />}/>
            <Route path="/missions" element={<MissionLayout />}>
              <Route index element={<Navigate to={`${missions.length - 1}`} />}/>
              {
                missions.map((mission, index) =>
                  <Route key={index} path={`${index}`} element={<MissionPage index={index} />}/>
                )
              }
            </Route>
            <Route path="/agents" element={<AgentLayout />}>
              <Route index element={<AgentPage index={-1} />}/>
              {
                agents.map((agent, index) =>
                  <Route key={index} path={`${index}`} element={<AgentPage index={index} />}/>
                )
              }
            </Route>
            <Route path="/dream-logs" element={<DreamLogLayout />}>
              <Route index element={<Navigate to={`${dreamLogs.length - 1}`} />}/>
              {
                dreamLogs.map((dreamLog, index) =>
                  <Route key={index} path={`${index}`} element={<DreamLogPage index={index} />}/>
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
