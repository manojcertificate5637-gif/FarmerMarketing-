import React, { useState } from 'react';
import { ShieldCheck, Activity, Server, AlertTriangle, ArrowUpRight, RotateCcw } from 'lucide-react';

export default function CloudOpsPrototype() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'nominal' | 'warning'>('all');
  const [autoHeal, setAutoHeal] = useState(true);
  const [remediating, setRemediating] = useState<string | null>(null);

  const [nodes, setNodes] = useState([
    { id: 'node-sg-01', ip: '10.240.1.12', cpu: 42, memory: 64, status: 'nominal', pods: 28 },
    { id: 'node-sg-02', ip: '10.240.1.15', cpu: 78, memory: 82, status: 'warning', pods: 36 },
    { id: 'node-sg-03', ip: '10.240.1.19', cpu: 31, memory: 48, status: 'nominal', pods: 22 },
    { id: 'node-sg-04', ip: '10.240.1.24', cpu: 55, memory: 58, status: 'nominal', pods: 30 }
  ]);

  const handleRemediate = (id: string) => {
    setRemediating(id);
    setTimeout(() => {
      setNodes(prev => prev.map(n => n.id === id ? { ...n, cpu: 38, memory: 52, status: 'nominal' } : n));
      setRemediating(null);
    }, 700);
  };

  const filteredNodes = filterStatus === 'all' ? nodes : nodes.filter(n => n.status === filterStatus);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 p-6 select-text overflow-y-auto space-y-6">
      {/* 4-Column Metric Strip (High-density SaaS layout rule) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Cluster Availability', val: '99.98%', diff: '+0.02% (30d)', status: 'normal' },
          { label: 'Ingress Traffic', val: '48.2k rps', diff: '+12.4% peak', status: 'normal' },
          { label: 'P99 Edge Latency', val: '38.4 ms', diff: '-4.1ms optimized', status: 'normal' },
          { label: 'Compute Nodes', val: '4 Active', diff: '1 Warn State', status: 'warn' }
        ].map((m, i) => (
          <div key={i} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
            <div className="text-xs text-slate-400 font-medium">{m.label}</div>
            <div className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">{m.val}</div>
            <div className="text-xs font-mono tabular-nums text-slate-400">{m.diff}</div>
          </div>
        ))}
      </div>

      {/* Control Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-300">Filter Nodes:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-1 border border-slate-800 rounded-lg">
            {(['all', 'nominal', 'warning'] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  filterStatus === s ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={autoHeal}
              onChange={e => setAutoHeal(e.target.checked)}
              className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 bg-slate-900"
            />
            <span>Autonomous Failover & Healing</span>
          </label>
        </div>
      </div>

      {/* High-density Nodes Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/30">
        <div className="px-5 py-3 border-b border-slate-800 bg-slate-900/60 text-xs font-semibold text-slate-300">
          Compute Topology & Node Telemetry
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-800/80">
              <tr>
                <th className="py-2.5 px-4 font-medium">Node ID</th>
                <th className="py-2.5 px-4 font-medium">Internal IP</th>
                <th className="py-2.5 px-4 font-medium text-right">CPU Load</th>
                <th className="py-2.5 px-4 font-medium text-right">RAM Load</th>
                <th className="py-2.5 px-4 font-medium text-right">Active Pods</th>
                <th className="py-2.5 px-4 font-medium">State</th>
                <th className="py-2.5 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums">
              {filteredNodes.map(node => (
                <tr key={node.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-white">{node.id}</td>
                  <td className="py-3 px-4 text-slate-400">{node.ip}</td>
                  <td className="py-3 px-4 text-right text-slate-200">{node.cpu}%</td>
                  <td className="py-3 px-4 text-right text-slate-200">{node.memory}%</td>
                  <td className="py-3 px-4 text-right text-slate-200">{node.pods}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1.5 font-sans text-xs ${
                      node.status === 'nominal' ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${node.status === 'nominal' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      {node.status === 'nominal' ? 'Nominal' : 'High Memory'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {node.status === 'warning' ? (
                      <button
                        onClick={() => handleRemediate(node.id)}
                        disabled={remediating === node.id}
                        className="px-2.5 py-1 text-xs font-sans font-medium text-white bg-amber-600 hover:bg-amber-500 rounded transition-colors"
                      >
                        {remediating === node.id ? 'Balancing...' : 'Auto-Drain'}
                      </button>
                    ) : (
                      <span className="text-slate-500 font-sans text-xs">Healthy</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
