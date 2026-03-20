import { Header } from './components/Header';
import { AgentCard } from './components/AgentCard';
import { RequestQueue } from './components/RequestQueue';
import { SystemLog } from './components/SystemLog';
import { ControlPanel } from './components/ControlPanel';
import { Toaster } from './components/ui/sonner';
import { useState, useEffect } from 'react';
import { runSimulation } from './services/api';

// ---------------- GRAPH GENERATORS ----------------
const generateTrendingUpData = (points: number, min: number, max: number) => {
  const data = [];
  let current = min + (max - min) * 0.3;
  for (let i = 0; i < points; i++) {
    current = current + (Math.random() * 3);
    current = Math.min(current, max);
    data.push({ value: Math.floor(current) });
  }
  return data;
};

const generateVolatileData = (points: number, min: number, max: number) => {
  return Array.from({ length: points }, (_, i) => {
    const variance = Math.sin(i / 3) * 15 + (Math.random() - 0.5) * 10;
    const value = (min + max) / 2 + variance;
    return { value: Math.floor(Math.max(min, Math.min(max, value))) };
  });
};

const generateSteadyData = (points: number, min: number, max: number) => {
  const baseline = (min + max) / 2;
  return Array.from({ length: points }, () => ({
    value: Math.floor(baseline + (Math.random() - 0.5) * 10),
  }));
};

// ---------------- APP ----------------
function App() {

  // ✅ STATE
  const [traffic, setTraffic] = useState(65);
  const [energy, setEnergy] = useState(90);
  const [env, setEnv] = useState(120);
  const [transit, setTransit] = useState(15);

  const [logs, setLogs] = useState<any[]>([]);
  const [queue, setQueue] = useState<any[]>([]);

  // ✅ GRAPH DATA
  const [trafficData, setTrafficData] = useState(() => generateVolatileData(30, 50, 80));
  const [energyData, setEnergyData] = useState(() => generateTrendingUpData(30, 40, 75));
  const [environmentData, setEnvironmentData] = useState(() => generateTrendingUpData(30, 60, 90));
  const [transitData, setTransitData] = useState(() => generateSteadyData(30, 10, 30));

  // 🔄 LIVE GRAPH
  useEffect(() => {
    const interval = setInterval(() => {

      setTrafficData(prev => {
        const newValue = Math.floor(50 + Math.random() * 30 + Math.sin(Date.now() / 1000) * 15);
        return [...prev.slice(1), { value: newValue }];
      });

      setEnergyData(prev => {
        const last = prev[prev.length - 1].value;
        const newValue = Math.floor(Math.min(75, Math.max(40, last + (Math.random() - 0.3) * 5)));
        return [...prev.slice(1), { value: newValue }];
      });

      setEnvironmentData(prev => {
        const last = prev[prev.length - 1].value;
        const newValue = Math.floor(Math.min(90, Math.max(60, last + (Math.random() - 0.5) * 3)));
        return [...prev.slice(1), { value: newValue }];
      });

      setTransitData(prev => {
        const newValue = Math.floor(15 + (Math.random() - 0.5) * 8);
        return [...prev.slice(1), { value: Math.max(10, Math.min(30, newValue)) }];
      });

    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 🚀 RUN SIMULATION
  const handleRun = async () => {
    const result = await runSimulation({ traffic, energy, env, transit });

    setLogs(result.logs || []);
    setQueue(result.queue || []);
  };

  // 🎯 SCENARIOS
  const runScenario = (type: number) => {

    if (type === 1) {
      setTraffic(30);
      setEnergy(40);
      setEnv(60);
      setTransit(5);
    }

    if (type === 2) {
      setTraffic(95);
      setEnergy(40);
      setEnv(60);
      setTransit(5);
    }

    if (type === 3) {
      setTraffic(95);
      setEnergy(95);
      setEnv(180);
      setTransit(25);
    }

    // 🔥 AUTO RUN
    setTimeout(handleRun, 300);
  };

  // 🔥 ALERT STATES
  const isTrafficAlert = traffic > 80;
  const isEnergyAlert = energy > 80;
  const isEnvAlert = env > 150;
  const isTransitAlert = transit > 20;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white overflow-x-hidden">
      <Toaster />
      <Header />

      <div className="p-6 flex flex-col gap-4 h-[calc(100vh-88px)]">

        {/* 🔥 SCENARIO BUTTONS */}
        <div className="flex gap-3">
          <button onClick={() => runScenario(1)} className="bg-green-600 px-4 py-2 rounded">
            Normal
          </button>
          <button onClick={() => runScenario(2)} className="bg-yellow-600 px-4 py-2 rounded">
            One Overload
          </button>
          <button onClick={() => runScenario(3)} className="bg-red-600 px-4 py-2 rounded">
            Conflict
          </button>
        </div>

        {/* RUN BUTTON */}
        <button
          onClick={handleRun}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg font-semibold"
        >
          Run Simulation
        </button>

        {/* AGENTS */}
        <div className="grid grid-cols-4 gap-4">

          <AgentCard
            type="traffic"
            title="Traffic Agent"
            metric="Vehicle count"
            value={traffic}
            status={isTrafficAlert ? "congestion" : "good"}
            statusLabel={isTrafficAlert ? "Congestion" : "Normal"}
            chartData={trafficData}
            chartColor="#ef4444"
            thresholdLabel="Vehicle count"
            thresholdMin={0}
            thresholdMax={100}
            thresholdValue={traffic}
            onThresholdChange={setTraffic}
          />

          <AgentCard
            type="energy"
            title="Energy Agent"
            metric="Energy Load"
            value={energy}
            status={isEnergyAlert ? "warning" : "good"}
            statusLabel={isEnergyAlert ? "High Load" : "Stable"}
            chartData={energyData}
            chartColor="#f59e0b"
            thresholdLabel="Energy load"
            thresholdMin={0}
            thresholdMax={100}
            thresholdValue={energy}
            onThresholdChange={setEnergy}
          />

          <AgentCard
            type="environment"
            title="Environment Agent"
            metric="AQI"
            value={env}
            status={isEnvAlert ? "warning" : "good"}
            statusLabel={isEnvAlert ? "Pollution" : "Good"}
            chartData={environmentData}
            chartColor="#10b981"
            thresholdLabel="AQI"
            thresholdMin={0}
            thresholdMax={300}
            thresholdValue={env}
            onThresholdChange={setEnv}
          />

          <AgentCard
            type="transit"
            title="Transit Agent"
            metric="Delay"
            value={transit}
            status={isTransitAlert ? "late" : "good"}
            statusLabel={isTransitAlert ? "Delayed" : "On Time"}
            chartData={transitData}
            chartColor="#3b82f6"
            thresholdLabel="Delay"
            thresholdMin={0}
            thresholdMax={60}
            thresholdValue={transit}
            onThresholdChange={setTransit}
          />

        </div>

        {/* LOWER */}
        <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
          <RequestQueue queue={[...queue].sort((a, b) => b.priority - a.priority)} />
          <SystemLog logs={logs} />
          <ControlPanel />
        </div>

      </div>
    </div>
  );
}

export default App;