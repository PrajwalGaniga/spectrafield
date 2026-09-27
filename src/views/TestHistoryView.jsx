import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  FileText, 
  ChevronRight,
  Hash
} from 'lucide-react';

export default function TestHistoryView({ records, onSelectRecordForVerification }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterResult, setFilterResult] = useState('ALL');

  const filteredRecords = records.filter(r => {
    const matchesSearch = 
      r.test_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.substance.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.operator_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.case_reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.kit_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesResult = filterResult === 'ALL' || r.result === filterResult;
    return matchesSearch && matchesResult;
  });

  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '20px 16px' }}>
      {/* Registry Header */}
      <div className="tactile-panel" style={{ padding: 22, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)' }}>
              Forensic Evidence Registry
            </h1>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Complete ledger of cryptographically sealed presumptive field chemical assays.
            </p>
          </div>
          <span className="badge-ember" style={{ background: 'var(--grad-amber)', color: '#4A2B00' }}>
            {filteredRecords.length} RECORDS INDEXED
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="tactile-panel" style={{ padding: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          {/* Search Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 260 }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by Test ID, Substance, Officer, Case Ref..."
              style={{
                width: '100%',
                background: '#E5E1D8',
                border: '1px solid rgba(162, 154, 140, 0.4)',
                boxShadow: 'var(--shadow-recessed)',
                borderRadius: 8,
                padding: '9px 14px',
                color: 'var(--text-primary)',
                fontSize: 13,
                outline: 'none'
              }}
            />
          </div>

          {/* Outcome Filter Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Filter size={14} color="var(--text-muted)" />
            {['ALL', 'POSITIVE', 'NEGATIVE', 'INCONCLUSIVE'].map(outcome => (
              <button
                key={outcome}
                onClick={() => setFilterResult(outcome)}
                className={`btn-tactile ${filterResult === outcome ? 'active' : ''}`}
                style={{
                  padding: '6px 12px',
                  borderRadius: 100,
                  fontSize: 11,
                  background: filterResult === outcome ? 'var(--grad-amber)' : undefined,
                  color: filterResult === outcome ? '#4A2B00' : undefined
                }}
              >
                {outcome}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Records Table / List */}
      <div className="tactile-panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{
              background: '#E7E3DA',
              borderBottom: '1px solid #D5CFC3',
              fontSize: 11,
              fontWeight: 800,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              <th style={{ padding: '14px 18px' }}>Test Identifier</th>
              <th style={{ padding: '14px 18px' }}>Substance & Kit</th>
              <th style={{ padding: '14px 18px' }}>Sample Swatch</th>
              <th style={{ padding: '14px 18px' }}>Result</th>
              <th style={{ padding: '14px 18px' }}>Officer</th>
              <th style={{ padding: '14px 18px' }}>Timestamp</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Audit</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                  No evidence records match your search criteria.
                </td>
              </tr>
            ) : (
              filteredRecords.map(record => (
                <tr
                  key={record.test_id}
                  style={{
                    borderBottom: '1px solid rgba(162, 154, 140, 0.25)',
                    transition: 'background 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F7F5F0'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {record.test_id}
                    </span>
                    <p style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>
                      {record.case_reference || 'N/A'}
                    </p>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>
                      {record.substance}
                    </span>
                    <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                      {record.kit_name}
                    </p>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        background: record.sampled_color?.hex || '#2563eb',
                        border: '1px solid rgba(0,0,0,0.25)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                      }} />
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                        {record.sampled_color?.hex}
                      </span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '3px 10px',
                      borderRadius: 12,
                      background: record.result === 'POSITIVE' ? 'var(--grad-amber)' : 'var(--grad-green)',
                      color: record.result === 'POSITIVE' ? '#4A2B00' : '#173802'
                    }}>
                      {record.result} ({(record.confidence * 100).toFixed(0)}%)
                    </span>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {record.operator_name}
                    </span>
                    <p style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>
                      {record.operator_id}
                    </p>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      {new Date(record.timestamp).toLocaleDateString()}
                    </span>
                    <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                      {new Date(record.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      onClick={() => onSelectRecordForVerification(record.test_id)}
                      className="btn-tactile-amber"
                      style={{ padding: '6px 12px', fontSize: 11.5 }}
                    >
                      <ShieldCheck size={13} />
                      Verify
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
