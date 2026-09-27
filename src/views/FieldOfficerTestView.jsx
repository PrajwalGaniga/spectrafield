import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Shield, 
  FileText, 
  Droplets, 
  Sparkles, 
  Radio, 
  Cpu, 
  Hash, 
  Sliders, 
  ChevronRight,
  ChevronLeft,
  Fingerprint,
  Info,
  Maximize2
} from 'lucide-react';
import HandheldPhoneTemplate from '../components/HandheldPhoneTemplate';
import ThreeChemicalVial from '../components/ThreeChemicalVial';
import QRCodeBadge from '../components/QRCodeBadge';
import { REAGENT_KITS } from '../data/mockData';
import { simulateSha256, simulateSignature, buildCanonicalString } from '../utils/cryptoSim';

export default function FieldOfficerTestView({
  currentOfficer,
  onSaveNewRecord,
  onNavigateToVerify,
  autoStepOverride = null,
  activeSpotlight = 'all'
}) {
  const [step, setStep] = useState(0); // 0: Setup, 1: Camera & 3D Vial, 2: Analysis, 3: Sealed & QR
  const [selectedKit, setSelectedKit] = useState(REAGENT_KITS[0]);
  const [caseReference, setCaseReference] = useState('CASE-2026-DEL-104');
  const [simulatedOutcome, setSimulatedOutcome] = useState('POSITIVE');
  const [coords, setCoords] = useState({ lat: 28.6139, lng: 77.2090, accuracy: 3.2 });
  
  // Optical & Analysis state
  const [capturedSample, setCapturedSample] = useState(null);
  const [analysisPhase, setAnalysisPhase] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [finalEvidencePacket, setFinalEvidencePacket] = useState(null);

  // Sync with autoStepOverride if automated demo is running
  useEffect(() => {
    if (autoStepOverride !== null && typeof autoStepOverride.step === 'number') {
      setStep(autoStepOverride.step);
      if (autoStepOverride.kit) setSelectedKit(autoStepOverride.kit);
      if (autoStepOverride.outcome) setSimulatedOutcome(autoStepOverride.outcome);
      if (autoStepOverride.capturedSample) setCapturedSample(autoStepOverride.capturedSample);
      if (autoStepOverride.finalPacket) setFinalEvidencePacket(autoStepOverride.finalPacket);
    }
  }, [autoStepOverride]);

  const getReactionColor = () => {
    if (simulatedOutcome === 'POSITIVE') return selectedKit.positiveHex;
    if (simulatedOutcome === 'NEGATIVE') return selectedKit.negativeHex;
    return '#64748b'; // Inconclusive
  };

  // Trigger optical camera shutter capture
  const handleCapture = () => {
    const activeColor = getReactionColor();
    const sample = {
      timestamp: new Date().toISOString(),
      colorHex: activeColor,
      rgb: hexToRgb(activeColor),
      kit: selectedKit,
      outcome: simulatedOutcome,
      confidence: simulatedOutcome === 'POSITIVE' ? 0.94 : simulatedOutcome === 'NEGATIVE' ? 0.89 : 0.61
    };

    setCapturedSample(sample);
    setStep(2);
    runAutomatedAnalysis(sample);
  };

  // Multi-phase colorimetric analysis
  const runAutomatedAnalysis = (sample) => {
    setIsAnalyzing(true);
    setAnalysisPhase(0);

    const phases = [
      'Normalizing lighting against white/black reference card...',
      'Extracting reagent chamber core optical region (60x60px)...',
      'Computing chromaticity coordinates & spectral wavelength...',
      'Matching against certified chemical standard library...'
    ];

    phases.forEach((_, idx) => {
      setTimeout(() => {
        setAnalysisPhase(idx);
      }, (idx + 1) * 600);
    });

    setTimeout(() => {
      setIsAnalyzing(false);
    }, phases.length * 600 + 400);
  };

  // Cryptographically seal the test record
  const handleSealRecord = () => {
    const testId = `TEST-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const timestamp = new Date().toISOString();
    
    const imageHash = simulateSha256(`IMAGE_BYTES_${testId}_${capturedSample.colorHex}`);
    const recordCore = {
      case_reference: caseReference,
      confidence: capturedSample.confidence,
      gps_accuracy_m: coords.accuracy,
      image_hash: imageHash,
      kit_id: selectedKit.id,
      latitude: coords.lat,
      longitude: coords.lng,
      operator_id: currentOfficer.badge || 'OFF-1024',
      result: capturedSample.outcome,
      test_id: testId,
      timestamp: timestamp,
    };

    const recordHash = simulateSha256(buildCanonicalString(recordCore));
    const signature = simulateSignature(recordHash);

    const completePacket = {
      ...recordCore,
      kit_name: selectedKit.name,
      substance: selectedKit.targetSubstance,
      operator_name: currentOfficer.operator || 'Officer Ravi Kumar',
      location_label: 'Connaught Place Interdiction Checkpoint',
      sampled_color: { ...capturedSample.rgb, hex: capturedSample.colorHex },
      record_hash: recordHash,
      signature: signature,
      public_key_id: 'CFSL-ED25519-ROOT-2026',
      verified: true
    };

    setFinalEvidencePacket(completePacket);
    onSaveNewRecord(completePacket);
    setStep(3);
  };

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px' }}>
      {/* Top Breadcrumb & Step Selector (Tactile Ribbon) */}
      <div className="tactile-panel" style={{ padding: '14px 20px', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="led-jewel green" />
            <span style={{ fontSize: 13, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
              STATION: FIELD CHEMICAL TESTING TERMINAL
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {[
              { num: 0, label: '1. Setup & GPS' },
              { num: 1, label: '2. 3D Reaction & Capture' },
              { num: 2, label: '3. Colorimetric Engine' },
              { num: 3, label: '4. Sealed Evidence Tag' }
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setStep(s.num)}
                className={`btn-tactile ${step === s.num ? 'active' : ''}`}
                style={{
                  padding: '6px 12px',
                  fontSize: 11.5,
                  background: step === s.num ? 'var(--grad-amber)' : undefined,
                  color: step === s.num ? '#4A2B00' : undefined
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Dual-Column Workspace: Left = Handheld Mobile Terminal, Right = 3D Vial & Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 420px) 1fr', gap: 28, alignItems: 'start' }}>
        
        {/* Left Column: Rugged Handheld Phone Template */}
        <div className={activeSpotlight === 'phone' ? 'spotlight-active' : ''} style={{ borderRadius: 48, transition: 'all 0.3s' }}>
          <HandheldPhoneTemplate
            headerTitle={selectedKit.id}
            statusBadge={step === 3 ? 'EVIDENCE SEALED' : 'CAMERA ACTIVE'}
            onPhysicalShutter={step === 1 ? handleCapture : null}
          >
            {/* Phone Screen Internal Router based on Step */}

            {/* SCREEN STEP 0: Test Setup on Mobile */}
            {step === 0 && (
              <div style={{ padding: 20, color: '#fff' }}>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 10, color: '#EAA937', fontWeight: 800, letterSpacing: '0.06em' }}>
                    FIELD PROCEDURE
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>
                    Select Test Kit
                  </h3>
                  <p style={{ fontSize: 11.5, color: '#9E988D' }}>
                    Choose reagent formulation matching suspected substance.
                  </p>
                </div>

                {/* Kit Select buttons inside phone */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                  {REAGENT_KITS.map(k => (
                    <div
                      key={k.id}
                      onClick={() => setSelectedKit(k)}
                      style={{
                        padding: 12,
                        borderRadius: 12,
                        background: selectedKit.id === k.id ? 'rgba(234, 169, 55, 0.2)' : 'rgba(255,255,255,0.06)',
                        border: `1.5px solid ${selectedKit.id === k.id ? '#EAA937' : 'rgba(255,255,255,0.12)'}`,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: '#EAA937' }}>{k.id}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{k.name}</span>
                        </div>
                        <p style={{ fontSize: 10.5, color: '#A0A5B8', marginTop: 2 }}>{k.targetSubstance}</p>
                      </div>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: k.positiveHex, boxShadow: `0 0 8px ${k.positiveHex}` }} />
                    </div>
                  ))}
                </div>

                {/* GPS Status Indicator */}
                <div style={{
                  background: 'rgba(34, 197, 94, 0.12)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 20
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <MapPin size={14} color="#22C55E" />
                    <span style={{ fontSize: 11.5, fontWeight: 800, color: '#22C55E' }}>GPS Satellite Lock Active</span>
                  </div>
                  <p style={{ fontSize: 10.5, color: '#CBD5E1', fontFamily: 'var(--font-mono)' }}>
                    {coords.lat}° N, {coords.lng}° E (±{coords.accuracy}m)
                  </p>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="btn-tactile-amber"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px 16px', fontSize: 13 }}
                >
                  <Camera size={16} /> Open Optical Reticle
                </button>
              </div>
            )}

            {/* SCREEN STEP 1: Live Optical Viewfinder */}
            {step === 1 && (
              <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 520, background: '#07090E', overflow: 'hidden' }}>
                {/* Simulated ambient scene & laser reticle */}
                <div className="scanner-beam" />

                {/* Camera Viewfinder Crosshair Guide */}
                <div style={{
                  position: 'absolute',
                  top: '25%',
                  left: '15%',
                  right: '15%',
                  height: 220,
                  border: '2px dashed #EAA937',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(234, 169, 55, 0.3)'
                }}>
                  <div style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${getReactionColor()} 35%, rgba(255,255,255,0.4) 75%, transparent 100%)`,
                    boxShadow: `0 0 28px ${getReactionColor()}`,
                    transition: 'background 0.5s ease'
                  }} />

                  <span style={{
                    position: 'absolute',
                    bottom: -22,
                    fontSize: 9.5,
                    fontWeight: 800,
                    color: '#EAA937',
                    background: 'rgba(0,0,0,0.85)',
                    padding: '2px 8px',
                    borderRadius: 4,
                    border: '1px solid rgba(234, 169, 55, 0.5)'
                  }}>
                    REACTION RETICLE
                  </span>
                </div>

                {/* Color Card in Bottom Right */}
                <div style={{
                  position: 'absolute',
                  bottom: 90,
                  right: 14,
                  background: 'rgba(0,0,0,0.85)',
                  padding: 8,
                  borderRadius: 8,
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <span style={{ fontSize: 8.5, color: '#A0A5B8', fontWeight: 700, display: 'block', marginBottom: 4 }}>
                    CALIBRATION CARD
                  </span>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {['#fff', '#94a3b8', '#1e293b', selectedKit.positiveHex, selectedKit.negativeHex].map((c, i) => (
                      <div key={i} style={{ width: 12, height: 12, background: c, borderRadius: 2 }} />
                    ))}
                  </div>
                </div>

                {/* Shutter Button on Bottom of Phone Screen */}
                <div style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16
                }}>
                  <button
                    onClick={handleCapture}
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #E2DDD2 60%, #B8B0A0 100%)',
                      border: '3px solid #EAA937',
                      boxShadow: '0 0 16px rgba(234, 169, 55, 0.5), inset 0 2px 4px rgba(255,255,255,0.8)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Capture Reaction Frame"
                  >
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#F5C04E', border: '1px solid #fff' }} />
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN STEP 2: Colorimetric Analysis Progress */}
            {step === 2 && (
              <div style={{ padding: 22, color: '#fff' }}>
                <span style={{ fontSize: 10, color: '#EAA937', fontWeight: 800 }}>
                  ALGORITHMIC CLASSIFIER
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: '#fff', marginBottom: 12 }}>
                  Analysis Complete
                </h3>

                {isAnalyzing ? (
                  <div style={{ padding: 20, textAlign: 'center' }}>
                    <div className="scanner-beam" style={{ position: 'relative', height: 4, marginBottom: 16 }} />
                    <p style={{ fontSize: 12, color: '#EAA937' }}>Scanning wavelength...</p>
                  </div>
                ) : (
                  <div>
                    {/* Result Banner */}
                    <div style={{
                      background: simulatedOutcome === 'POSITIVE' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                      border: `2px solid ${simulatedOutcome === 'POSITIVE' ? '#EF4444' : '#22C55E'}`,
                      borderRadius: 14,
                      padding: 16,
                      textAlign: 'center',
                      marginBottom: 16
                    }}>
                      <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: '#CBD5E1' }}>
                        PRESUMPTIVE RESULT
                      </span>
                      <h4 style={{
                        fontSize: 24,
                        fontWeight: 900,
                        color: simulatedOutcome === 'POSITIVE' ? '#F87171' : '#4ADE80'
                      }}>
                        {simulatedOutcome}
                      </h4>
                      <p style={{ fontSize: 12, color: '#fff', marginTop: 4 }}>
                        {selectedKit.targetSubstance}
                      </p>
                      <span style={{
                        display: 'inline-block',
                        marginTop: 8,
                        fontSize: 12,
                        fontWeight: 800,
                        color: '#EAA937',
                        background: 'rgba(0,0,0,0.5)',
                        padding: '3px 10px',
                        borderRadius: 20
                      }}>
                        Match Confidence: {(capturedSample?.confidence * 100).toFixed(0)}%
                      </span>
                    </div>

                    {/* Extracted Swatch */}
                    <div style={{
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: 10,
                      padding: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 18
                    }}>
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: capturedSample?.colorHex,
                        boxShadow: `0 0 12px ${capturedSample?.colorHex}`,
                        border: '1px solid rgba(255,255,255,0.4)'
                      }} />
                      <div>
                        <span style={{ fontSize: 10, color: '#A0A5B8' }}>Sampled Reflectance:</span>
                        <p style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                          {capturedSample?.colorHex.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleSealRecord}
                      className="btn-tactile-amber"
                      style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                    >
                      <Fingerprint size={16} /> Seal Cryptographic Record
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* SCREEN STEP 3: Cryptographically Sealed Record on Mobile */}
            {step === 3 && finalEvidencePacket && (
              <div style={{ padding: 18, color: '#fff' }}>
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                  <CheckCircle2 size={32} color="#22C55E" style={{ margin: '0 auto 6px' }} />
                  <h4 style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>
                    Evidence Sealed & Locked
                  </h4>
                  <p style={{ fontSize: 11, color: '#A0A5B8' }}>
                    Non-repudiable Ed25519 digital seal applied.
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 10,
                  padding: 12,
                  fontSize: 11,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  marginBottom: 14
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9E988D' }}>Test ID:</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#EAA937' }}>
                      {finalEvidencePacket.test_id.slice(-12)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9E988D' }}>Result:</span>
                    <span style={{ fontWeight: 700, color: finalEvidencePacket.result === 'POSITIVE' ? '#F87171' : '#4ADE80' }}>
                      {finalEvidencePacket.result}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9E988D' }}>Operator:</span>
                    <span>{finalEvidencePacket.operator_id}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToVerify(finalEvidencePacket.test_id)}
                  className="btn-tactile-green"
                  style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                >
                  <Shield size={14} /> Open Court Verification Deck
                </button>
              </div>
            )}
          </HandheldPhoneTemplate>
        </div>

        {/* Right Column: Interactive Three.js 3D Chemical Vial + Evidence QR Package */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Three.js 3D Molecular Chemical Vial Section */}
          <div className={`tactile-panel ${activeSpotlight === '3d-vial' ? 'spotlight-active' : ''}`} style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text-primary)' }}>
                  Interactive 3D Chemical Assay Simulator
                </h3>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  Three.js 3D rendered reaction vial simulating reagent fluid mechanics and color transformation.
                </p>
              </div>
              <span className="badge-ember" style={{ background: 'var(--grad-amber)', color: '#4A2B00' }}>
                3D ROTATION ENABLED
              </span>
            </div>

            {/* Three.js Canvas Container */}
            <ThreeChemicalVial
              targetColor={getReactionColor()}
              kitName={selectedKit.name}
              substance={selectedKit.targetSubstance}
              onDropletAdded={() => {
                // If user dispenses droplet, advance to optical reticle capture automatically!
                if (step === 0) setStep(1);
              }}
            />

            {/* Reaction Outcome Selector Knobs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 18,
              paddingTop: 14,
              borderTop: '1px solid rgba(162, 154, 140, 0.3)'
            }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-amber)', textTransform: 'uppercase' }}>
                  Simulated Chemical Reaction Mode:
                </span>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  Controls the fluid color and test verdict.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {['POSITIVE', 'NEGATIVE', 'INCONCLUSIVE'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setSimulatedOutcome(mode)}
                    className={`btn-tactile ${simulatedOutcome === mode ? 'active' : ''}`}
                    style={{
                      padding: '6px 12px',
                      fontSize: 11,
                      background: simulatedOutcome === mode ? (mode === 'POSITIVE' ? 'var(--grad-amber)' : 'var(--grad-green)') : undefined,
                      color: simulatedOutcome === mode ? '#fff' : undefined,
                      textShadow: simulatedOutcome === mode ? '0 1px 1px rgba(0,0,0,0.4)' : undefined
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cryptographic Sealed Evidence Tag with Interactive QR Code */}
          {finalEvidencePacket && (
            <div className={`tactile-panel ${activeSpotlight === 'qr-code' ? 'spotlight-active' : ''}`} style={{ padding: 24 }}>
              <QRCodeBadge
                testId={finalEvidencePacket.test_id}
                result={finalEvidencePacket.result}
                confidence={finalEvidencePacket.confidence}
                timestamp={finalEvidencePacket.timestamp}
                recordHash={finalEvidencePacket.record_hash}
                onVerifyClick={onNavigateToVerify}
              />
            </div>
          )}

          {/* Forensic Legal Advisory Card */}
          <div className="tactile-well" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Info size={16} color="var(--text-amber)" />
              <h4 style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-primary)' }}>
                Evidentiary Chain-of-Custody Rule (SWGDRUG Standard)
              </h4>
            </div>
            <p style={{ fontSize: 11.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Field color tests serve as presumptive screening instruments establishing probable cause. The cryptographic hash and QR tag ensure the captured reaction frame and GPS lock cannot be manipulated before laboratory confirmatory assay.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}
