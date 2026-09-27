import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, ExternalLink, ShieldCheck, Check } from 'lucide-react';

export default function QRCodeBadge({
  testId,
  result,
  confidence,
  timestamp,
  recordHash,
  onVerifyClick
}) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Generate real QR code encoding the verification endpoint & forensic hashes
  useEffect(() => {
    if (!testId) return;

    const payload = JSON.stringify({
      issuer: 'SPECTRA-FIELD-FORENSICS',
      test_id: testId,
      result: result,
      confidence: confidence,
      timestamp: timestamp,
      record_hash: recordHash,
      verify_url: `https://spectra-field.gov/verify?id=${testId}`
    });

    QRCode.toDataURL(payload, {
      width: 180,
      margin: 1,
      color: {
        dark: '#24201A',
        light: '#F8F6F0'
      }
    })
      .then(url => setQrDataUrl(url))
      .catch(console.error);
  }, [testId, result, confidence, timestamp, recordHash]);

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(recordHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tactile-well" style={{ padding: 20, textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
        <QrCode size={16} color="var(--text-amber)" />
        <h4 style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
          TAMPER-EVIDENT EVIDENCE QR TAG
        </h4>
      </div>

      {/* Generated QR Code Canvas Image */}
      <div style={{
        display: 'inline-block',
        padding: 12,
        background: '#FAF8F3',
        borderRadius: 14,
        boxShadow: 'var(--shadow-extruded-sm)',
        border: '1px solid rgba(255,255,255,0.9)',
        marginBottom: 14
      }}>
        {qrDataUrl ? (
          <img 
            src={qrDataUrl} 
            alt="Evidence Verification QR Code" 
            style={{ width: 140, height: 140, display: 'block', borderRadius: 6 }} 
          />
        ) : (
          <div style={{ width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Generating QR...</span>
          </div>
        )}
      </div>

      <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 14, lineHeight: 1.4 }}>
        Scan with any forensic barcode reader or court terminal to immediately verify cryptographic chain-of-custody parity.
      </p>

      {/* Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <button
          onClick={handleCopyHash}
          className="btn-tactile"
          style={{ padding: '6px 12px', fontSize: 11 }}
        >
          {copied ? <Check size={12} color="#22C55E" /> : <ShieldCheck size={12} />}
          {copied ? 'Hash Copied!' : 'Copy Hash'}
        </button>

        {onVerifyClick && (
          <button
            onClick={() => onVerifyClick(testId)}
            className="btn-tactile-amber"
            style={{ padding: '6px 14px', fontSize: 11 }}
          >
            <ExternalLink size={12} />
            Verify in Court Portal
          </button>
        )}
      </div>
    </div>
  );
}
