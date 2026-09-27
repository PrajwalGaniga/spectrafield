// Reagent Test Kits configuration based on real forensic chemistry standards
export const REAGENT_KITS = [
  {
    id: 'KIT-A',
    name: 'Scott Reagent Test',
    targetSubstance: 'Cocaine Hydrochloride & Base',
    chemicalFormula: 'Cobalt(II) thiocyanate in glycerin & water',
    positiveColorName: 'Cobalt Blue Precipitate',
    positiveHex: '#2563eb',
    negativeHex: '#e2e8f0',
    typicalWavelength: '465 nm',
    description: 'Two-phase colorimetric assay. Cobalt ions form a distinct blue complex with cocaine alkaloid molecules.'
  },
  {
    id: 'KIT-B',
    name: 'Marquis Reagent Test',
    targetSubstance: 'Amphetamines & Methamphetamine',
    chemicalFormula: 'Formaldehyde & concentrated sulfuric acid',
    positiveColorName: 'Deep Purple / Red-Violet',
    positiveHex: '#7e22ce',
    negativeHex: '#f59e0b',
    typicalWavelength: '530 nm',
    description: 'Acid condensation reaction producing carbocations that yield deep violet-to-black charge transfer complexes.'
  },
  {
    id: 'KIT-C',
    name: 'Duquenois-Levine Test',
    targetSubstance: 'Cannabis / THC (Cannabinoids)',
    chemicalFormula: 'Vanillin, acetaldehyde, ethanol & chloroform',
    positiveColorName: 'Emerald Green to Violet Layer',
    positiveHex: '#059669',
    negativeHex: '#94a3b8',
    typicalWavelength: '510 nm',
    description: 'Reaction with resorcinol moiety of cannabinoids; extracted with chloroform into an intense violet lower layer.'
  }
];

export const SYSTEM_ROLES = [
  {
    id: 'officer',
    name: 'Field Officer',
    badge: 'OFF-1024',
    operator: 'Officer Ravi Kumar',
    unit: 'Narcotics Task Force 4',
    icon: 'ShieldCheck',
    color: '#F64668',
    description: 'Conducts field testing, captures imagery, records GPS telemetry, and generates sealed evidence packets.'
  },
  {
    id: 'auditor',
    name: 'Courtroom / Judicial Auditor',
    badge: 'AUD-8802',
    operator: 'Magistrate M. Reynolds',
    unit: 'Metropolitan Judiciary & Public Defense',
    icon: 'Scale',
    color: '#FE9677',
    description: 'Inspects evidentiary integrity, checks cryptographic signatures, and validates chain of custody for court.'
  },
  {
    id: 'supervisor',
    name: 'Forensic Supervisor / Admin',
    badge: 'ADMIN-001',
    operator: 'Dr. Sarah Vance',
    unit: 'Central Forensic Science Laboratory',
    icon: 'Activity',
    color: '#41436A',
    description: 'Monitors regional seizure metrics, reviews officer caseloads, audits system access logs, and ensures standard compliance.'
  }
];

export const INITIAL_TEST_RECORDS = [
  {
    test_id: 'TEST-1727451290-7F8A',
    kit_id: 'KIT-A',
    kit_name: 'Scott Reagent Test',
    substance: 'Cocaine Hydrochloride',
    result: 'POSITIVE',
    confidence: 0.94,
    operator_id: 'OFF-1024',
    operator_name: 'Officer Ravi Kumar',
    case_reference: 'CASE-2026-DEL-089',
    timestamp: '2026-09-27T10:14:32.418Z',
    latitude: 28.613939,
    longitude: 77.209021,
    gps_accuracy_m: 3.4,
    location_label: 'Connaught Place Interdiction Checkpoint',
    sampled_color: { r: 37, g: 99, b: 235, hex: '#2563eb' },
    image_hash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    record_hash: 'sha256:7c4a8d09ca3762af61e59520943dc26494f8941b',
    signature: 'MEYCIQCQ+v88T5e85ZkW02X5W+k8Hq+wKjA==...',
    public_key_id: 'CFSL-ED25519-ROOT-2026',
    verified: true
  },
  {
    test_id: 'TEST-1727448102-3B4C',
    kit_id: 'KIT-B',
    kit_name: 'Marquis Reagent Test',
    substance: 'Suspected Amphetamines',
    result: 'NEGATIVE',
    confidence: 0.88,
    operator_id: 'OFF-1024',
    operator_name: 'Officer Ravi Kumar',
    case_reference: 'CASE-2026-DEL-088',
    timestamp: '2026-09-27T08:45:10.120Z',
    latitude: 28.556160,
    longitude: 77.100281,
    gps_accuracy_m: 4.1,
    location_label: 'IGI Airport Cargo Terminal Bay 3',
    sampled_color: { r: 245, g: 158, b: 11, hex: '#f59e0b' },
    image_hash: 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    record_hash: 'sha256:4b227777d4dd1fc61c6f884f48641d02b4d121d3',
    signature: 'MEYCIQDaJkX488Zp9T4Kq+m8HqA==...',
    public_key_id: 'CFSL-ED25519-ROOT-2026',
    verified: true
  },
  {
    test_id: 'TEST-1727439912-9A1D',
    kit_id: 'KIT-C',
    kit_name: 'Duquenois-Levine Test',
    substance: 'Cannabis / Herbal Material',
    result: 'POSITIVE',
    confidence: 0.91,
    operator_id: 'OFF-1090',
    operator_name: 'Officer Priya Sharma',
    case_reference: 'CASE-2026-HR-044',
    timestamp: '2026-09-27T06:18:22.091Z',
    latitude: 28.459497,
    longitude: 77.026638,
    gps_accuracy_m: 2.8,
    location_label: 'Gurugram Highway Toll Plaza Checkpost',
    sampled_color: { r: 5, g: 150, b: 105, hex: '#059669' },
    image_hash: 'sha256:a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
    record_hash: 'sha256:2c26b46b68ffc68ff99b453c1d30413413422d70',
    signature: 'MEYCIQD9v87T5e85ZkW02X5W+k8Hq+wKjA==...',
    public_key_id: 'CFSL-ED25519-ROOT-2026',
    verified: true
  },
  {
    test_id: 'TEST-1727421100-2E5F',
    kit_id: 'KIT-A',
    kit_name: 'Scott Reagent Test',
    substance: 'Unknown White Powder (Adulterated)',
    result: 'INCONCLUSIVE',
    confidence: 0.62,
    operator_id: 'OFF-1024',
    operator_name: 'Officer Ravi Kumar',
    case_reference: 'CASE-2026-DEL-082',
    timestamp: '2026-09-26T21:12:00.000Z',
    latitude: 28.650630,
    longitude: 77.233440,
    gps_accuracy_m: 6.2,
    location_label: 'Old Delhi Railway Station Parcel Area',
    sampled_color: { r: 120, g: 125, b: 140, hex: '#787d8c' },
    image_hash: 'sha256:5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
    record_hash: 'sha256:7b52009b64fd0a2a49e6d8a939753077792b0554',
    signature: 'MEYCIQCF917T5e85ZkW02X5W+k8Hq+wKjA==...',
    public_key_id: 'CFSL-ED25519-ROOT-2026',
    verified: true
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'LOG-9921',
    test_id: 'TEST-1727451290-7F8A',
    action: 'RECORD_SEALED',
    actor: 'OFF-1024 (Officer Ravi Kumar)',
    timestamp: '2026-09-27T10:14:35.000Z',
    details: 'Cryptographic Ed25519 signature applied. Location locked to Connaught Place.'
  },
  {
    id: 'LOG-9920',
    test_id: 'TEST-1727451290-7F8A',
    action: 'COURT_VERIFIED',
    actor: 'AUD-8802 (Magistrate M. Reynolds)',
    timestamp: '2026-09-27T11:02:14.000Z',
    details: '5-point integrity audit passed. Zero tampering detected.'
  },
  {
    id: 'LOG-9919',
    test_id: 'TEST-1727448102-3B4C',
    action: 'RECORD_SEALED',
    actor: 'OFF-1024 (Officer Ravi Kumar)',
    timestamp: '2026-09-27T08:45:12.000Z',
    details: 'Negative result confirmed. Sealed into digital registry.'
  },
  {
    id: 'LOG-9918',
    test_id: 'TEST-1727439912-9A1D',
    action: 'SUPERVISOR_REVIEW',
    actor: 'ADMIN-001 (Dr. Sarah Vance)',
    timestamp: '2026-09-27T07:30:00.000Z',
    details: 'Approved presumptive evidence chain for laboratory dispatch.'
  }
];
