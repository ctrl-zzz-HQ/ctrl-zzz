import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './reset.css';
import './theme.css';
import './index.css';
import { NavigationLayout, MissionLayout, AgentLayout, DreamLogLayout, SplashLayout } from "@/layouts";
import { AgentPage, DreamLogPage, MissionPage } from "@/pages";
import missions from '@data/missions';
import agents from '@data/agents.json';
import dreamLogs from '@data/dream-logs';

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
                missions.map((_mission, index) =>
                  <Route key={index} path={`${index}`} element={<MissionPage index={index} />}/>
                )
              }
            </Route>
            <Route path="/agents" element={<AgentLayout />}>
              <Route index element={<AgentPage index={-1} />}/>
              {
                agents.map((_agent, index) =>
                  <Route key={index} path={`${index}`} element={<AgentPage index={index} />}/>
                )
              }
            </Route>
            <Route path="/dream-logs" element={<DreamLogLayout />}>
              <Route index element={<Navigate to={`${dreamLogs.length - 1}`} />}/>
              {
                dreamLogs.map((_dreamLog, index) =>
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

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
