import React from 'react';
import { 
  Wifi, 
  Battery, 
  MapPin, 
  Camera, 
  ShieldCheck, 
  CircleDot, 
  Maximize2,
  Sliders,
  Sparkles
} from 'lucide-react';

export default function HandheldPhoneTemplate({
  children,
  headerTitle = 'SPECTRA FIELD TERMINAL',
  statusBadge = 'GPS LOCKED',
  isShutterActive = false,
  onPhysicalShutter = null
}) {
  return (
    <div className="handheld-chassis" style={{
      position: 'relative',
      maxWidth: 'min(390px, 100%)',
      width: '100%',
      margin: '0 auto',
      padding: '16px 12px 24px',
      background: 'linear-gradient(180deg, #F5F2EB 0%, #E2DDD2 100%)',
      borderRadius: 44,
      boxShadow: 
        '-10px -10px 24px rgba(255, 255, 255, 0.95), 14px 14px 28px rgba(150, 142, 128, 0.5), inset 0 2px 3px rgba(255,255,255,0.8)',
      border: '4px solid #DFD9CE',
      userSelect: 'none'
    }}>
      {/* Side Hardware Shutter Button (Right Edge) */}
      <button
        onClick={onPhysicalShutter}
        style={{
          position: 'absolute',
          right: -13,
          top: 140,
          width: 10,
          height: 64,
          borderRadius: '0 6px 6px 0',
          background: 'linear-gradient(90deg, #DDD8CE 0%, #C8C2B5 100%)',
          boxShadow: '2px 2px 5px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.4)',
          cursor: 'pointer',
          padding: 0
        }}
        title="Physical Hardware Camera Shutter Trigger"
      />

      {/* Side Hardware Volume / Zoom Dial (Left Edge) */}
      <div style={{
        position: 'absolute',
        left: -11,
        top: 130,
        width: 8,
        height: 48,
        borderRadius: '5px 0 0 5px',
        background: '#C8C2B5',
        boxShadow: '-2px 2px 4px rgba(0,0,0,0.2)'
      }} />

      {/* Top Chassis Bezel (Speaker Grill + Optical Sensor) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#2B2D3A',
          boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.8)'
        }} />
        <div style={{
          width: 56,
          height: 5,
          borderRadius: 3,
          background: '#B3ACA0',
          boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.5)'
        }} />
        <span className="led-jewel amber" title="Optical Sensor Calibrated" />
      </div>

      {/* Phone Glass Display Screen Container */}
      <div className="phone-glass-screen" style={{ minHeight: 580, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile Device Status Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          background: 'rgba(10, 12, 18, 0.95)',
          fontSize: 10.5,
          color: '#A0A5B8',
          fontFamily: 'var(--font-mono)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          zIndex: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#fff', fontWeight: 700 }}>10:14 AM</span>
            <span style={{ color: '#22C55E', display: 'flex', alignItems: 'center', gap: 3 }}>
              <MapPin size={10} /> 3.2m
            </span>
          </div>

          <span style={{ fontSize: 9.5, fontWeight: 700, color: '#F5C04E', letterSpacing: '0.04em' }}>
            {statusBadge}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Wifi size={11} color="#A0A5B8" />
            <span style={{ fontSize: 10 }}>98%</span>
            <Battery size={13} color="#22C55E" />
          </div>
        </div>

        {/* Dynamic Mobile View Screen Content */}
        <div style={{ flex: 1, position: 'relative', overflowY: 'auto' }}>
          {children}
        </div>

        {/* Mobile Bottom Home Bar */}
        <div style={{
          height: 18,
          background: 'rgba(10, 12, 18, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderTop: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{
            width: 100,
            height: 4,
            borderRadius: 2,
            background: 'rgba(255,255,255,0.3)'
          }} />
        </div>
      </div>

      {/* Bottom Physical Chassis Label */}
      <div style={{
        textAlign: 'center',
        marginTop: 10,
        fontSize: 10,
        fontWeight: 800,
        color: '#8C8578',
        letterSpacing: '0.12em',
        textShadow: '0 1px 0 rgba(255,255,255,0.8)'
      }}>
        SPECTRA-FIELD SECURE TERMINAL V1.0
      </div>
    </div>
  );
}
