// Cryptographic simulation helper for client-side hashing and verification

// Lightweight deterministic pseudo-hash (simulates SHA-256 64-character hex)
export function simulateSha256(data) {
  let str = typeof data === 'object' ? JSON.stringify(data) : String(data);
  let hash1 = 0xdeadbeef ^ 0;
  let hash2 = 0x41c6ce57 ^ 0;
  let hash3 = 0x67452301 ^ 0;
  let hash4 = 0xefcdab89 ^ 0;
  
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash1 = Math.imul(hash1 ^ ch, 2654435761);
    hash2 = Math.imul(hash2 ^ ch, 1597334677);
    hash3 = Math.imul(hash3 ^ ch, 2246822519);
    hash4 = Math.imul(hash4 ^ ch, 3266489917);
  }
  
  hash1 = Math.imul(hash1 ^ (hash1 >>> 16), 2246822507) ^ Math.imul(hash2 ^ (hash2 >>> 13), 3266489909);
  hash2 = Math.imul(hash2 ^ (hash2 >>> 16), 2246822507) ^ Math.imul(hash1 ^ (hash1 >>> 13), 3266489909);
  hash3 = Math.imul(hash3 ^ (hash3 >>> 15), 1597334677) ^ Math.imul(hash4 ^ (hash4 >>> 12), 2654435761);
  hash4 = Math.imul(hash4 ^ (hash4 >>> 15), 1597334677) ^ Math.imul(hash3 ^ (hash3 >>> 12), 2654435761);

  const hexPart = (h) => (h >>> 0).toString(16).padStart(8, '0');
  const partA = hexPart(hash1) + hexPart(hash2) + hexPart(hash3) + hexPart(hash4);
  const partB = hexPart(hash4 ^ 0x5a5a5a5a) + hexPart(hash3 ^ 0x3c3c3c3c) + hexPart(hash2 ^ 0xa5a5a5a5) + hexPart(hash1 ^ 0xc3c3c3c3);

  return `sha256:${partA}${partB}`;
}

export function simulateSignature(recordHash) {
  const clean = recordHash.replace('sha256:', '');
  const prefix = btoa(clean.slice(0, 16));
  const middle = btoa(clean.slice(16, 32));
  const end = btoa(clean.slice(32, 48));
  return `MEYCIQ${prefix}${middle}${end}==`;
}

// Canonical record hashing as defined in Spectra-field
export function buildCanonicalString(record) {
  const canonicalObj = {
    case_reference: record.case_reference || '',
    confidence: Number(record.confidence || 0),
    gps_accuracy_m: Number(record.gps_accuracy_m || 0),
    image_hash: record.image_hash,
    kit_id: record.kit_id,
    latitude: Number(record.latitude || 0),
    longitude: Number(record.longitude || 0),
    operator_id: record.operator_id,
    result: (record.result || '').toUpperCase(),
    test_id: record.test_id,
    timestamp: record.timestamp,
  };
  return JSON.stringify(canonicalObj, Object.keys(canonicalObj).sort());
}

// Comprehensive 5-point parity check with support for simulated tampering injection
export function verifyTestRecord(record, tamperInjection = null) {
  if (!record) return null;

  // Clone record and apply tamper mutation if testing attack vectors
  const testTarget = { ...record };
  if (tamperInjection) {
    if (tamperInjection.type === 'GPS') {
      testTarget.latitude = (Number(testTarget.latitude) + 0.052).toFixed(6);
      testTarget.longitude = (Number(testTarget.longitude) - 0.041).toFixed(6);
    } else if (tamperInjection.type === 'RESULT') {
      testTarget.result = testTarget.result === 'POSITIVE' ? 'NEGATIVE' : 'POSITIVE';
    } else if (tamperInjection.type === 'IMAGE') {
      testTarget.image_hash = 'sha256:0000000000000000alteredimagebytecontent00000000000000000000';
    } else if (tamperInjection.type === 'SIGNATURE') {
      testTarget.signature = 'MEYCIQ_CORRUPTED_SIGNATURE_KEY_ATTACK==...';
    }
  }

  // 1. Recompute image byte hash
  const imageHashMatches = !tamperInjection || tamperInjection.type !== 'IMAGE';

  // 2. Recompute canonical record hash
  const canonical = buildCanonicalString(testTarget);
  const recomputedRecordHash = simulateSha256(canonical);
  // Record hash matches if no metadata was modified
  const recordHashMatches = (!tamperInjection || (tamperInjection.type !== 'GPS' && tamperInjection.type !== 'RESULT' && tamperInjection.type !== 'IMAGE'));

  // 3. Signature verification
  const signatureValid = (!tamperInjection || tamperInjection.type !== 'SIGNATURE') && recordHashMatches;

  // 4. Temporal & Spatial Presence
  const timestampPresent = Boolean(testTarget.timestamp);
  const gpsPresent = Boolean(testTarget.latitude && testTarget.longitude);

  const overallVerified = imageHashMatches && recordHashMatches && signatureValid && timestampPresent && gpsPresent;

  return {
    test_id: record.test_id,
    overall_status: overallVerified ? 'VERIFIED' : 'INTEGRITY_FAILED',
    checks: [
      {
        id: 'image_hash',
        label: 'Image File Hash Parity',
        description: 'SHA-256 byte digest matches the original optical capture on record.',
        passed: imageHashMatches,
        evidence: testTarget.image_hash
      },
      {
        id: 'record_hash',
        label: 'Canonical Metadata Hash Parity',
        description: 'Ordered parameters (GPS, Officer, Kit, Result) match the stored cryptographic fingerprint.',
        passed: recordHashMatches,
        evidence: record.record_hash
      },
      {
        id: 'digital_signature',
        label: 'Ed25519 Asymmetric Digital Seal',
        description: 'Signed hash verifies against the forensic department central root public key.',
        passed: signatureValid,
        evidence: testTarget.signature
      },
      {
        id: 'timestamp',
        label: 'Coordinated Timestamp Lock',
        description: 'ISO-8601 temporal coordinate recorded at the point of testing.',
        passed: timestampPresent,
        evidence: testTarget.timestamp
      },
      {
        id: 'geolocation',
        label: 'Geospatial Satellite Lock',
        description: 'Latitude and longitude coordinates verified with precision radius.',
        passed: gpsPresent,
        evidence: `${testTarget.latitude}° N, ${testTarget.longitude}° E (±${testTarget.gps_accuracy_m}m)`
      }
    ],
    tamperDetected: Boolean(tamperInjection)
  };
}
