import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StoryDirector from './components/StoryDirector';
import ConceptModal from './components/ConceptModal';
import FieldOfficerTestView from './views/FieldOfficerTestView';
import VerificationPortalView from './views/VerificationPortalView';
import SupervisorDashboardView from './views/SupervisorDashboardView';
import TestHistoryView from './views/TestHistoryView';
import { SYSTEM_ROLES, INITIAL_TEST_RECORDS, INITIAL_AUDIT_LOGS, REAGENT_KITS } from './data/mockData';
import confetti from 'canvas-confetti';

export default function App() {
  const [currentRole, setCurrentRole] = useState(SYSTEM_ROLES[0]); // Field Officer
  const [activeView, setActiveView] = useState('test'); // 'test' | 'verify' | 'dashboard' | 'history'
  const [records, setRecords] = useState(INITIAL_TEST_RECORDS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [selectedVerifyId, setSelectedVerifyId] = useState(INITIAL_TEST_RECORDS[0]?.test_id || '');
  const [isConceptModalOpen, setIsConceptModalOpen] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // Story Director & Spotlight Narrative State Machine
  // ─────────────────────────────────────────────────────────────────────────────
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [autoStepOverride, setAutoStepOverride] = useState(null);
  const [autoVerifyTrigger, setAutoVerifyTrigger] = useState(null);
  const [activeSpotlight, setActiveSpotlight] = useState('phone');

  const CHAPTERS = [
    {
      title: 'Chapter 1: Traffic Interdiction & Satellite Geotag',
      view: 'test',
      roleId: 'officer',
      spotlight: 'phone',
      storyContext: 'Scenario: At 02:15 AM, Officer Ravi Kumar intercepts a suspect transport at Connaught Place. An unlabelled white crystal powder is recovered. The officer powers on the Spectra Handheld Terminal to initiate a Scott Reagent assay.',
      focusTarget: 'Handheld Mobile Screen (Setup & Kit Selection)',
      actionPrompt: 'Review the Reagent Kit and click "Open Optical Reticle" on the mobile phone.',
      legalInsight: 'GPS coordinates and timestamp are captured at test initiation so the crime scene location can never be disputed in court.',
      execute: () => {
        setAutoStepOverride({ step: 0, kit: REAGENT_KITS[0], outcome: 'POSITIVE' });
        setAutoVerifyTrigger(null);
      }
    },
    {
      title: 'Chapter 2: Optical Calibration & Frame Alignment',
      view: 'test',
      roleId: 'officer',
      spotlight: 'phone',
      storyContext: 'The officer positions the chemical test pouch under the optical camera lens. A reference color card with known RGB values is placed adjacent to the reaction well to normalize yellow streetlamp lighting.',
      focusTarget: 'Mobile Camera Viewfinder & Alignment Reticle',
      actionPrompt: 'Observe the crosshair guides and the in-frame calibration color card.',
      legalInsight: 'Standardized optical reticles eliminate camera tilt and focal distance errors before chemical fluid extraction.',
      execute: () => {
        setAutoStepOverride({ step: 1, kit: REAGENT_KITS[0], outcome: 'POSITIVE' });
        setAutoVerifyTrigger(null);
      }
    },
    {
      title: 'Chapter 3: Three.js 3D Molecular Chemical Assay',
      view: 'test',
      roleId: 'officer',
      spotlight: '3d-vial',
      storyContext: 'Observe the 3D Molecular Reaction Chamber. A droplet of Scott Reagent is introduced into the suspected sample. Cobalt(II) ions immediately coordinate with cocaine alkaloid molecules, producing an effervescent cobalt-blue precipitate.',
      focusTarget: '3D Molecular Reaction Chamber (Three.js)',
      actionPrompt: 'Click "Add Reagent Droplet" on the 3D vial or drag with your mouse to rotate the test tube in 3D space!',
      legalInsight: 'Interactive 3D simulation mirrors laboratory chromatography and physical test pouch fluid mechanics.',
      execute: () => {
        setAutoStepOverride({ step: 1, kit: REAGENT_KITS[0], outcome: 'POSITIVE' });
        setAutoVerifyTrigger(null);
      }
    },
    {
      title: 'Chapter 4: Algorithmic Colorimetry & Match Confidence',
      view: 'test',
      roleId: 'officer',
      spotlight: 'phone',
      storyContext: 'The optical engine segments the 60x60px core reaction well, measures the 465nm light absorption wavelength, and calculates match confidence against certified forensic spectral baselines.',
      focusTarget: 'Algorithmic Classifier on Mobile Screen',
      actionPrompt: 'Click "Capture Reaction Frame" to inspect the 94% POSITIVE Cocaine Hydrochloride confidence reading.',
      legalInsight: 'Replaces subjective naked-eye officer interpretation with quantitative, reproducible chromaticity metrics.',
      execute: () => {
        const sample = {
          timestamp: new Date().toISOString(),
          colorHex: REAGENT_KITS[0].positiveHex,
          rgb: { r: 37, g: 99, b: 235 },
          kit: REAGENT_KITS[0],
          outcome: 'POSITIVE',
          confidence: 0.94
        };
        setAutoStepOverride({ step: 2, kit: REAGENT_KITS[0], outcome: 'POSITIVE', capturedSample: sample });
        setAutoVerifyTrigger(null);
      }
    },
    {
      title: 'Chapter 5: Cryptographic Sealing & QR Evidence Tag',
      view: 'test',
      roleId: 'officer',
      spotlight: 'qr-code',
      storyContext: 'Officer clicks "Seal Cryptographic Record". The terminal computes separate SHA-256 digests of the raw image bytes and canonical metadata, then signs them with an asymmetric Ed25519 key, printing an immutable Evidence QR Tag.',
      focusTarget: 'Tamper-Evident Evidence QR Tag',
      actionPrompt: 'Inspect the generated QR Code and SHA-256 hashes. Click "Verify in Court Portal" to audit.',
      legalInsight: 'Non-repudiation: any post-creation tampering instantly breaks the cryptographic seal.',
      execute: () => {
        setAutoStepOverride({ step: 3, kit: REAGENT_KITS[0], outcome: 'POSITIVE', finalPacket: records[0] });
        setAutoVerifyTrigger(null);
        triggerCelebration();
      }
    },
    {
      title: 'Chapter 6: Courtroom Zero-Trust Parity Audit',
      view: 'verify',
      roleId: 'auditor',
      spotlight: 'verify-deck',
      storyContext: 'In court proceedings, Magistrate Reynolds scans the Evidence QR Code. The verification portal re-reads the stored image bytes and metadata, recomputes all hashes, and validates the digital signature. All 5 checks PASS.',
      focusTarget: 'Courtroom Parity Audit Deck',
      actionPrompt: 'Verify that all 5 cryptographic checks are marked with green PASS indicators.',
      legalInsight: 'Zero-trust verification guarantees evidence admissibility without relying on paper testimony.',
      execute: () => {
        setAutoVerifyTrigger({ testId: records[0].test_id, tamper: null });
      }
    },
    {
      title: 'Chapter 7: Malicious Tampering Stress Test',
      view: 'verify',
      roleId: 'auditor',
      spotlight: 'verify-deck',
      storyContext: 'Demonstrating defense security: A bad actor attempts to tamper with the evidence by shifting the crime scene GPS coordinates by 5.2 km. The system instantly detects the broken parity and rejects the evidence in court!',
      focusTarget: 'Tamper Attack Simulator (Right Panel)',
      actionPrompt: 'Click "Attack 1: Modify GPS" to see the red INTEGRITY FAILED alert, then click "Restore Pristine Evidence".',
      legalInsight: 'Single-bit sensitivity ensures corrupt actors or unauthorized editors cannot alter case facts.',
      execute: () => {
        setAutoVerifyTrigger({
          testId: records[0].test_id,
          tamper: { type: 'GPS', label: 'Altered Crime Scene GPS Coordinates (+5.2 km offset)' }
        });
      }
    },
    {
      title: 'Chapter 8: Central Supervisory Oversight & Ledger',
      view: 'dashboard',
      roleId: 'supervisor',
      spotlight: 'command-console',
      storyContext: 'Chief Examiner Dr. Sarah Vance reviews department-wide seizure volume, positive rates, and inspects the immutable access audit trail that logs every test creation and judicial verification.',
      focusTarget: 'Command Analytics Console & Audit Ledger',
      actionPrompt: 'Review the KPI metrics and click "Audit Parity" on any record to inspect historical evidence.',
      legalInsight: 'Full administrative accountability and forensic transparency across all field interdiction units.',
      execute: () => {
        setAutoVerifyTrigger(null);
      }
    }
  ];

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#EAA937', '#76B448', '#C8C2B5', '#4A2B00']
      });
    } catch {
      // Ignore if not loaded
    }
  };

  // Execute Chapter actions when currentChapter changes
  useEffect(() => {
    const chapter = CHAPTERS[currentChapter];
    if (chapter) {
      const role = SYSTEM_ROLES.find(r => r.id === chapter.roleId) || SYSTEM_ROLES[0];
      setCurrentRole(role);
      setActiveView(chapter.view);
      setActiveSpotlight(chapter.spotlight);
      chapter.execute();
    }
  }, [currentChapter]);

  // Autoplay progression timer
  useEffect(() => {
    let timer = null;
    if (isAutoplay) {
      timer = setTimeout(() => {
        if (currentChapter < CHAPTERS.length - 1) {
          setCurrentChapter(prev => prev + 1);
        } else {
          setIsAutoplay(false);
        }
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [isAutoplay, currentChapter]);

  const handleNextChapter = () => {
    if (currentChapter < CHAPTERS.length - 1) {
      setCurrentChapter(prev => prev + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1);
    }
  };

  const handleSaveNewRecord = (newRecord) => {
    setRecords(prev => [newRecord, ...prev]);
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      test_id: newRecord.test_id,
      action: 'RECORD_SEALED',
      actor: `${newRecord.operator_id} (${newRecord.operator_name})`,
      timestamp: new Date().toISOString(),
      details: `Cryptographic Ed25519 signature applied. Result: ${newRecord.result} (${(newRecord.confidence * 100).toFixed(0)}%).`
    };
    setAuditLogs(prev => [newLog, ...prev]);
    triggerCelebration();
  };

  const handleSelectRecordForVerification = (testId) => {
    setSelectedVerifyId(testId);
    setActiveView('verify');
    setCurrentChapter(5); // Jump to Courtroom Verification chapter
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Skeuomorphic Top Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        activeView={activeView}
        onSelectView={(v) => {
          setActiveView(v);
          // Auto-align chapter
          if (v === 'test') setCurrentChapter(0);
          else if (v === 'verify') setCurrentChapter(5);
          else if (v === 'dashboard') setCurrentChapter(7);
        }}
        onStartDemo={() => {
          setCurrentChapter(0);
          setIsAutoplay(true);
        }}
        isDemoRunning={isAutoplay}
        onOpenConcept={() => setIsConceptModalOpen(true)}
      />

      {/* Story Director & Spotlight Guidance Controller */}
      <div style={{ padding: '16px 16px 0' }}>
        <StoryDirector
          currentChapter={currentChapter}
          totalChapters={CHAPTERS.length}
          chapterData={CHAPTERS[currentChapter]}
          onNextChapter={handleNextChapter}
          onPrevChapter={handlePrevChapter}
          isAutoplay={isAutoplay}
          onToggleAutoplay={() => setIsAutoplay(prev => !prev)}
          onJumpToChapter={setCurrentChapter}
        />
      </div>

      {/* Main Forensic Workspaces */}
      <main style={{ flex: 1, paddingBottom: 60 }}>
        {activeView === 'test' && (
          <FieldOfficerTestView
            currentOfficer={currentRole}
            onSaveNewRecord={handleSaveNewRecord}
            onNavigateToVerify={handleSelectRecordForVerification}
            autoStepOverride={autoStepOverride}
            activeSpotlight={activeSpotlight}
          />
        )}

        {activeView === 'verify' && (
          <VerificationPortalView
            records={records}
            initialTestId={selectedVerifyId}
            autoVerifyTrigger={autoVerifyTrigger}
          />
        )}

        {activeView === 'dashboard' && (
          <SupervisorDashboardView
            records={records}
            auditLogs={auditLogs}
            onSelectRecordForVerification={handleSelectRecordForVerification}
          />
        )}

        {activeView === 'history' && (
          <TestHistoryView
            records={records}
            onSelectRecordForVerification={handleSelectRecordForVerification}
          />
        )}
      </main>

      {/* Educational Legal / Forensic Concept Modal */}
      <ConceptModal
        isOpen={isConceptModalOpen}
        onClose={() => setIsConceptModalOpen(false)}
      />
    </div>
  );
}
