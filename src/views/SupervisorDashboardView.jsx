import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Activity, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  FileText, 
  Users, 
  Flame,
  PieChart,
  BarChart3,
  Sliders
} from 'lucide-react';

export default function SupervisorDashboardView({ records, auditLogs, onSelectRecordForVerification }) {
  const total = records.length;
  const positiveCount = records.filter(r => r.result === 'POSITIVE').length;
  const negativeCount = records.filter(r => r.result === 'NEGATIVE').length;
  const inconclusiveCount = records.filter(r => r.result === 'INCONCLUSIVE').length;
  const positiveRate = total > 0 ? ((positiveCount / total) * 100).toFixed(0) : 0;

  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '20px 16px' }}>
      {/* Command Header Panel */}
      <div className="tactile-panel" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="led-jewel amber" />
              <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-amber)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                CENTRAL FORENSIC COMMAND CONSOLE
              </span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)' }}>
              Forensic Intelligence & Supervisory Oversight
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Real-time surveillance of field interdiction operations, chemical kit throughput, and chain-of-custody compliance.
            </p>
          </div>

          <div className="tactile-well" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="led-jewel green" />
            <div>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700 }}>FORENSIC ROOT KEY</span>
              <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                CFSL-ED25519-ROOT [ACTIVE]
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Extruded Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 18, marginBottom: 26 }}>
        <div className="tactile-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Total Assays
            </span>
            <Activity size={18} color="var(--text-amber)" />
          </div>
          <p style={{ fontSize: 32, fontWeight: 900, color: 'var(--text-primary)' }}>{total}</p>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Field chemical tests logged</span>
        </div>

        <div className="tactile-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Positive Seizures
            </span>
            <span className="led-jewel amber" />
          </div>
          <p style={{ fontSize: 32, fontWeight: 900, color: '#B45309' }}>{positiveCount}</p>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Probable cause confirmed ({positiveRate}%)</span>
        </div>

        <div className="tactile-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Negative Screenings
            </span>
            <span className="led-jewel green" />
          </div>
          <p style={{ fontSize: 32, fontWeight: 900, color: '#15803D' }}>{negativeCount}</p>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Zero controlled substance</span>
        </div>

        <div className="tactile-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Inconclusive Flags
            </span>
            <AlertTriangle size={18} color="var(--text-amber)" />
          </div>
          <p style={{ fontSize: 32, fontWeight: 900, color: 'var(--text-amber)' }}>{inconclusiveCount}</p>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Referred to GC-MS lab</span>
        </div>
      </div>

      {/* Main 2-Column: Seizures Registry & Immutable Access Ledger */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
        
        {/* Left Column: Recent Certified Seizures */}
        <div className="tactile-panel" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 900, color: 'var(--text-primary)' }}>
              Recent Cryptographically Sealed Field Records
            </h3>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Showing {records.length} records
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {records.map(record => (
              <div
                key={record.test_id}
                className="tactile-well"
                style={{
                  padding: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#F0ECE4'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: 10,
                      background: record.result === 'POSITIVE' ? 'var(--grad-amber)' : 'var(--grad-green)',
                      color: record.result === 'POSITIVE' ? '#4A2B00' : '#173802'
                    }}>
                      {record.result}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {record.test_id}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {record.substance} · {record.kit_name}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                    {record.operator_name} · {record.location_label}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    background: record.sampled_color?.hex || '#2563eb',
                    border: '1px solid rgba(0,0,0,0.2)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                  }} title={`Sampled Reaction: ${record.sampled_color?.hex}`} />
                  <button
                    onClick={() => onSelectRecordForVerification(record.test_id)}
                    className="btn-tactile"
                    style={{ padding: '4px 10px', fontSize: 11 }}
                  >
                    Audit Parity
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Immutable Audit Ledger */}
        <div className="tactile-panel" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 14, fontWeight: 900, color: 'var(--text-primary)' }}>
              Immutable Forensic Audit Ledger
            </h3>
            <span className="badge-ember" style={{ background: 'var(--grad-green)', color: '#173802' }}>
              NON-REPUDIABLE
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {auditLogs.map(log => (
              <div
                key={log.id}
                className="tactile-well"
                style={{ padding: 12, background: '#EDE8E0' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-amber)' }}>
                    {log.action}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {log.actor}
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                  {log.details}
                </p>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                  REF: {log.test_id}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
