import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Activity, 
  Play, 
  HelpCircle, 
  Compass, 
  CheckCircle2, 
  FileSearch,
  LayoutDashboard,
  Settings,
  CircleDot
} from 'lucide-react';
import { SYSTEM_ROLES } from '../data/mockData';

export default function Navbar({
  currentRole,
  onSelectRole,
  activeView,
  onSelectView,
  onStartDemo,
  isDemoRunning,
  onOpenConcept
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'linear-gradient(180deg, #F5F2EC 0%, #E8E4DB 100%)',
      borderBottom: '2px solid #D5CFC3',
      boxShadow: '0 4px 16px rgba(162, 154, 140, 0.35)',
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        {/* Brand identity (Tactile Embossed Emblem) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'var(--grad-metallic)',
            border: '2px solid rgba(255,255,255,0.9)',
            borderBottom: '3px solid #C8C2B5',
            boxShadow: 'var(--shadow-extruded-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={26} color="#85550C" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: '#38352F',
                textShadow: '0 1px 0 rgba(255,255,255,0.8)'
              }}>
                SPECTRA-FIELD
              </span>
              <span style={{
                fontSize: 10,
                fontWeight: 800,
                color: '#6E4504',
                background: 'var(--grad-amber)',
                padding: '2px 8px',
                borderRadius: 20,
                border: '1px solid #FFE49E',
                boxShadow: '0 1px 3px rgba(183, 116, 12, 0.3)',
                letterSpacing: '0.04em'
              }}>
                HARDWARE SIMULATOR
              </span>
            </div>
            <p style={{ fontSize: 11, color: '#746F66', fontWeight: 500 }}>
              Forensic Handheld Terminal & Cryptographic Chain-of-Custody
            </p>
          </div>
        </div>

        {/* Tactile Inset Tabs (Skeuomorphic Radio Switcher) with horizontal touch-scroll on mobile */}
        <div className="tactile-well mobile-scroll-x" style={{
          display: 'flex',
          alignItems: 'center',
          padding: 4,
          gap: 4,
          maxWidth: '100%'
        }}>
          {[
            { id: 'test', label: '1. Handheld Field Station', icon: Compass },
            { id: 'verify', label: '2. Courtroom Audit Deck', icon: Scale },
            { id: 'dashboard', label: '3. Command Intelligence', icon: LayoutDashboard },
            { id: 'history', label: '4. Evidence Registry', icon: FileSearch }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectView(tab.id)}
                className={`btn-tactile ${isActive ? 'active' : ''}`}
                style={{
                  background: isActive ? 'var(--grad-green)' : 'transparent',
                  color: isActive ? '#173802' : 'var(--text-secondary)',
                  border: isActive ? '1px solid #DCF8B6' : '1px solid transparent',
                  borderBottom: isActive ? '2px solid #558727' : '1px solid transparent',
                  boxShadow: isActive ? 'inset 1px 1px 3px rgba(0,0,0,0.2)' : 'none',
                  textShadow: isActive ? '0 1px 0 rgba(255,255,255,0.4)' : 'none',
                  padding: '7px 12px',
                  borderRadius: 8,
                  fontSize: 12,
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <Icon size={14} color={isActive ? '#173802' : 'currentColor'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Role Selector & Demo Autoplay Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          {/* Active Persona Badge */}
          <div className="tactile-panel" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            borderRadius: 10
          }}>
            <span className="led-jewel amber" />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-muted)' }}>
              OPERATOR:
            </span>
            <select
              value={currentRole.id}
              onChange={(e) => {
                const found = SYSTEM_ROLES.find(r => r.id === e.target.value);
                if (found) onSelectRole(found);
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-main)',
                fontSize: 12,
                fontWeight: 800,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {SYSTEM_ROLES.map(r => (
                <option key={r.id} value={r.id} style={{ background: '#EAE6DF', color: '#38352F' }}>
                  {r.name} ({r.operator})
                </option>
              ))}
            </select>
          </div>

          {/* Autoplay Demo Button */}
          <button
            onClick={onStartDemo}
            className="btn-tactile-amber"
            style={{
              padding: '9px 18px',
              fontSize: 13,
              boxShadow: isDemoRunning ? 'inset 2px 2px 5px rgba(0,0,0,0.3)' : undefined
            }}
          >
            <Play size={14} fill="currentColor" />
            {isDemoRunning ? 'Autoplay Active...' : 'Simulate Demo'}
          </button>

          {/* Educational Concept Guide */}
          <button
            onClick={onOpenConcept}
            className="btn-tactile"
            style={{ padding: '9px 14px' }}
            title="Inspect SWGDRUG Forensic Framework & Problem Statement"
          >
            <HelpCircle size={15} color="var(--text-secondary)" />
            <span style={{ fontSize: 12 }}>Forensic Concept</span>
          </button>
        </div>
      </div>
    </header>
  );
}
