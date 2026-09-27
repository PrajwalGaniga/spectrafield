import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  ShieldCheck, 
  Hash, 
  MapPin, 
  Clock, 
  Fingerprint, 
  RotateCcw,
  Bug,
  AlertTriangle,
  FileText,
  QrCode,
  Sliders
} from 'lucide-react';
import QRCodeBadge from '../components/QRCodeBadge';
import { verifyTestRecord } from '../utils/cryptoSim';

export default function VerificationPortalView({
  records,
  initialTestId = '',
  autoVerifyTrigger = null
}) {
  const [selectedTestId, setSelectedTestId] = useState(initialTestId || records[0]?.test_id || '');
  const [activeTamperAttack, setActiveTamperAttack] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);

  useEffect(() => {
    if (initialTestId) setSelectedTestId(initialTestId);
  }, [initialTestId]);

  useEffect(() => {
    if (autoVerifyTrigger) {
      if (autoVerifyTrigger.testId) setSelectedTestId(autoVerifyTrigger.testId);
      if (autoVerifyTrigger.tamper !== undefined) setActiveTamperAttack(autoVerifyTrigger.tamper);
    }
  }, [autoVerifyTrigger]);

  const activeRecord = records.find(r => r.test_id === selectedTestId) || records[0];

  const runAudit = (record, tamper) => {
    setIsAuditing(true);
    setTimeout(() => {
      const res = verifyTestRecord(record, tamper);
      setVerificationResult(res);
      setIsAuditing(false);
    }, 350);
  };

  useEffect(() => {
    if (activeRecord) {
      runAudit(activeRecord, activeTamperAttack);
    }
  }, [selectedTestId, activeTamperAttack]);

  const isVerified = verificationResult?.overall_status === 'VERIFIED';

  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '20px 16px' }}>
      {/* Courtroom Deck Header */}
      <div className="tactile-panel" style={{ padding: 26, marginBottom: 24, textAlign: 'center' }}>
        <div style={{
          width: 50,
          height: 50,
          borderRadius: 14,
          background: 'var(--grad-metallic)',
          border: '2px solid rgba(255,255,255,0.9)',
          boxShadow: 'var(--shadow-extruded-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px'
        }}>
          <Scale size={26} color="#85550C" />
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text-primary)' }}>
          Judicial & Courtroom Zero-Trust Verification Deck
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', maxWidth: 640, margin: '6px auto 0' }}>
          Independent cryptographic audit terminal for public defense counsel, magistrates, and forensic examiners to test evidence parity before trial admission.
        </p>
      </div>

      {/* Record Selector / QR Tag Input */}
      <div className="tactile-panel" style={{ padding: 18, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 280 }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              value={selectedTestId}
              onChange={e => setSelectedTestId(e.target.value)}
              placeholder="Scan or enter Evidence Test ID..."
              style={{
                flex: 1,
                background: '#E5E1D8',
                border: '1px solid rgba(162, 154, 140, 0.4)',
                boxShadow: 'var(--shadow-recessed)',
                borderRadius: 8,
                padding: '10px 14px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-muted)' }}>
              LOAD SEED CASE:
            </span>
            {records.slice(0, 4).map(r => (
              <button
                key={r.test_id}
                onClick={() => {
                  setSelectedTestId(r.test_id);
                  setActiveTamperAttack(null);
                }}
                className={`btn-tactile ${selectedTestId === r.test_id ? 'active' : ''}`}
                style={{
                  padding: '6px 10px',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  background: selectedTestId === r.test_id ? 'var(--grad-amber)' : undefined,
                  color: selectedTestId === r.test_id ? '#4A2B00' : undefined
                }}
              >
                {r.test_id.slice(-8)} ({r.result})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Audit Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 24 }}>
        
        {/* Left Column: 5-Point Parity Results */}
        <div>
          {/* Status Verdict Header Card */}
          <div className="tactile-panel" style={{
            padding: 24,
            textAlign: 'center',
            marginBottom: 20,
            border: isVerified ? '2px solid #84CC16' : '2px solid #EF4444',
            background: isVerified ? 'linear-gradient(180deg, #F6FDF0 0%, #E9F8DE 100%)' : 'linear-gradient(180deg, #FEF2F2 0%, #FEE2E2 100%)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              <span className={`led-jewel ${isVerified ? 'green' : 'red'}`} />
              <span style={{
                fontSize: 20,
                fontWeight: 900,
                color: isVerified ? '#2E680E' : '#991B1B',
                letterSpacing: '0.02em'
              }}>
                {isVerified ? 'RECORD VERIFIED (100% UNTAMPERED)' : 'INTEGRITY FAILED (EVIDENCE CORRUPT)'}
              </span>
            </div>
            <p style={{ fontSize: 12.5, color: isVerified ? '#3A5C1B' : '#7F1D1D', lineHeight: 1.4 }}>
              {isVerified
                ? 'All 5 cryptographic parity checks passed. The image and metadata are mathematically proven to be identical to the original crime scene capture.'
                : 'Cryptographic parity check broken. One or more digital signatures or canonical hashes failed mathematical verification.'}
            </p>
          </div>

          {/* Individual Checks List */}
          <div className="tactile-panel" style={{ padding: 18, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid rgba(162, 154, 140, 0.3)', marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                Cryptographic Parity Breakdown
              </span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {activeRecord?.test_id}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {verificationResult?.checks.map(check => (
                <div
                  key={check.id}
                  className="tactile-well"
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    background: check.passed ? '#EFECE6' : '#FEE2E2'
                  }}
                >
                  <div style={{ marginTop: 2 }}>
                    {check.passed ? (
                      <CheckCircle2 size={16} color="#22C55E" />
                    ) : (
                      <XCircle size={16} color="#EF4444" />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ fontSize: 12.5, fontWeight: 800, color: check.passed ? 'var(--text-primary)' : '#991B1B' }}>
                        {check.label}
                      </p>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: 12,
                        background: check.passed ? 'var(--grad-green)' : '#F87171',
                        color: check.passed ? '#173802' : '#fff'
                      }}>
                        {check.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                      {check.description}
                    </p>
                    <div className="hash-recessed" style={{ marginTop: 6, fontSize: 10 }}>
                      Target: {check.evidence}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tamper Attack Simulator & QR Tag */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Tamper Attack Simulator Box */}
          <div className="tactile-panel" style={{ padding: 20, border: '2px solid #EF4444', background: '#FFF5F5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Bug size={16} color="#EF4444" />
              <h3 style={{ fontSize: 14, fontWeight: 900, color: '#991B1B' }}>
                Simulate Tamper Attack (Live Stress Test)
              </h3>
            </div>
            <p style={{ fontSize: 11.5, color: '#7F1D1D', marginBottom: 14, lineHeight: 1.4 }}>
              Demonstrate how Spectra-field detects any malicious alterations. Click any attack vector to inject simulated tampering into this record:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                onClick={() => setActiveTamperAttack({ type: 'GPS', label: 'Altered Crime Scene GPS Coordinates (+5.2 km offset)' })}
                className="btn-tactile"
                style={{
                  justifyContent: 'flex-start',
                  fontSize: 12,
                  background: activeTamperAttack?.type === 'GPS' ? '#F87171' : undefined,
                  color: activeTamperAttack?.type === 'GPS' ? '#fff' : '#991B1B'
                }}
              >
                <MapPin size={13} /> Attack 1: Modify GPS (+5.2 km offset)
              </button>

              <button
                onClick={() => setActiveTamperAttack({ type: 'RESULT', label: 'Flipped Chemical Result (POSITIVE -> NEGATIVE)' })}
                className="btn-tactile"
                style={{
                  justifyContent: 'flex-start',
                  fontSize: 12,
                  background: activeTamperAttack?.type === 'RESULT' ? '#F87171' : undefined,
                  color: activeTamperAttack?.type === 'RESULT' ? '#fff' : '#991B1B'
                }}
              >
                <RotateCcw size={13} /> Attack 2: Alter Result (Flip POS/NEG)
              </button>

              <button
                onClick={() => setActiveTamperAttack({ type: 'IMAGE', label: 'Replaced Raw Optical Image File' })}
                className="btn-tactile"
                style={{
                  justifyContent: 'flex-start',
                  fontSize: 12,
                  background: activeTamperAttack?.type === 'IMAGE' ? '#F87171' : undefined,
                  color: activeTamperAttack?.type === 'IMAGE' ? '#fff' : '#991B1B'
                }}
              >
                <Hash size={13} /> Attack 3: Swap Image Bytes (Altered Photo)
              </button>

              <button
                onClick={() => setActiveTamperAttack({ type: 'SIGNATURE', label: 'Forged Signature Key' })}
                className="btn-tactile"
                style={{
                  justifyContent: 'flex-start',
                  fontSize: 12,
                  background: activeTamperAttack?.type === 'SIGNATURE' ? '#F87171' : undefined,
                  color: activeTamperAttack?.type === 'SIGNATURE' ? '#fff' : '#991B1B'
                }}
              >
                <Fingerprint size={13} /> Attack 4: Forge Signature Key
              </button>

              {activeTamperAttack && (
                <button
                  onClick={() => setActiveTamperAttack(null)}
                  className="btn-tactile-green"
                  style={{ marginTop: 6, justifyContent: 'center' }}
                >
                  <RotateCcw size={13} /> Restore Pristine Evidence
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Evidence QR Tag */}
          {activeRecord && (
            <div className="tactile-panel" style={{ padding: 20 }}>
              <QRCodeBadge
                testId={activeRecord.test_id}
                result={activeRecord.result}
                confidence={activeRecord.confidence}
                timestamp={activeRecord.timestamp}
                recordHash={activeRecord.record_hash}
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
