import React from 'react';
import { 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  Lock, 
  Scale, 
  Eye, 
  Cpu, 
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

export default function ConceptModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 300,
      background: 'rgba(50, 46, 38, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    }}>
      <div className="tactile-panel" style={{
        maxWidth: 820,
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#FAF8F4',
        border: '3px solid #D5CFC3',
        borderRadius: 24,
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
        padding: 32,
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-tactile"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: '8px 10px',
            borderRadius: '50%'
          }}
          title="Close dialog"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'var(--grad-amber)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(183, 116, 12, 0.4)'
          }}>
            <Scale size={26} color="#4A2B00" />
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text-primary)' }}>
              Spectra-field Forensic Framework & Legal Architecture
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Solving Visual Subjectivity & Chain-of-Custody Frailties in Field Narcotics Testing
            </p>
          </div>
        </div>

        {/* Section 1: The Problem */}
        <div className="tactile-well" style={{ padding: 20, marginBottom: 20, background: '#F5ECE6', border: '1px solid #E4C8B8' }}>
          <h3 style={{
            fontSize: 14,
            fontWeight: 900,
            color: '#991B1B',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 10
          }}>
            <ShieldAlert size={16} color="#DC2626" />
            The Forensic Problem in Traditional Field Testing
          </h3>
          <ul style={{ fontSize: 12.5, color: '#57221A', lineHeight: 1.7, paddingLeft: 18 }}>
            <li><strong style={{ color: '#000' }}>Subjective Naked-Eye Judgment:</strong> Reagent color transformations vary in saturation and hue depending on purity and adulterants. Officers suffer visual fatigue and subjective bias.</li>
            <li><strong style={{ color: '#000' }}>Environmental Lighting Inconsistencies:</strong> Crime scenes lit by yellow streetlights, emergency strobes, or flashlight beams drastically alter perceived reagent color.</li>
            <li><strong style={{ color: '#000' }}>Evidentiary Suppression in Court:</strong> Standard paper logs and uncalibrated phone photos can easily be challenged by defense counsel for lack of immutable timestamps, tampering resistance, or verified satellite coordinates.</li>
          </ul>
        </div>

        {/* Section 2: The Solution Architecture */}
        <div className="tactile-panel" style={{ padding: 20, marginBottom: 20, background: '#F3EFE7' }}>
          <h3 style={{
            fontSize: 14,
            fontWeight: 900,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12
          }}>
            <CheckCircle2 size={16} color="#15803D" />
            The Spectra-field Digital Solution
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="tactile-well" style={{ padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Eye size={14} color="var(--text-amber)" />
                <h4 style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary)' }}>Standardized Optical Guides</h4>
              </div>
              <p style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>
                Target reticle frames the reaction well while an in-frame optical calibration card normalizes ambient lighting before pixel extraction.
              </p>
            </div>

            <div className="tactile-well" style={{ padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Cpu size={14} color="#15803D" />
                <h4 style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary)' }}>Colorimetric Classification</h4>
              </div>
              <p style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>
                Converts reflected wavelength into deterministic RGB/HSL values, calculating match probability against certified ISO standards.
              </p>
            </div>

            <div className="tactile-well" style={{ padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Lock size={14} color="var(--text-amber)" />
                <h4 style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary)' }}>Dual Cryptographic Seal</h4>
              </div>
              <p style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>
                Hashes raw image bytes + canonical metadata with SHA-256 and signs the record using an asymmetric Ed25519 forensic key.
              </p>
            </div>

            <div className="tactile-well" style={{ padding: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Scale size={14} color="#15803D" />
                <h4 style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary)' }}>Zero-Trust Courtroom Parity</h4>
              </div>
              <p style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>
                Judicial verification portal scans the QR evidence tag and re-computes hashes; any coordinate or image modification fails instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Legal SWGDRUG Notice */}
        <div className="tactile-well" style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
          padding: 14,
          background: '#FFFBEB',
          border: '1px solid #FCD34D'
        }}>
          <AlertTriangle size={18} color="#D97706" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 800, color: '#92400E', marginBottom: 2 }}>
              SWGDRUG Category C Presumptive Field Status
            </h4>
            <p style={{ fontSize: 11.5, color: '#78350F', lineHeight: 1.5 }}>
              Under international forensic guidelines, chemical color tests are legally presumptive (establishing probable cause for detention and seizure). Spectra-field seals the chain of custody so that the presumptive field proof cannot be disputed prior to laboratory confirmatory GC-MS testing.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-tactile-amber" style={{ padding: '8px 24px' }}>
            Return to Simulation
          </button>
        </div>
      </div>
    </div>
  );
}
