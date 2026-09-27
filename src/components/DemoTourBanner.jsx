import React from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  X, 
  Sparkles,
  Info,
  Clock
} from 'lucide-react';

export default function DemoTourBanner({
  currentStep,
  totalSteps,
  stepData,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onStop,
  progressPercent
}) {
  return (
    <aside aria-label="Automated Tour Controller" style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 200,
      width: 'calc(100% - 48px)',
      maxWidth: 920,
      background: 'rgba(21, 23, 44, 0.94)',
      backdropFilter: 'blur(20px)',
      border: '1px solid var(--border-ember)',
      borderRadius: 18,
      boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(246, 70, 104, 0.25)',
      overflow: 'hidden',
      animation: 'fadeInUp 0.3s ease-out'
    }}>
      {/* Progress Bar Header */}
      <div style={{
        height: 4,
        width: '100%',
        background: 'rgba(65, 67, 106, 0.4)',
        position: 'relative'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          background: 'linear-gradient(90deg, var(--ember-crimson) 0%, var(--ember-peach) 100%)',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 10px var(--ember-peach)'
        }} />
      </div>

      <div style={{
        padding: '16px 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        {/* Step Badge & Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 320 }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--ember-plum) 0%, var(--ember-slate) 100%)',
            border: '1px solid var(--border-ember)',
            padding: '6px 12px',
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <span style={{ fontSize: 9, textTransform: 'uppercase', color: 'var(--ember-peach)', fontWeight: 700, letterSpacing: '0.08em' }}>
              STEP
            </span>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>
              {currentStep + 1}<span style={{ fontSize: 11, color: 'var(--text-muted)' }}>/{totalSteps}</span>
            </span>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <Sparkles size={14} color="var(--ember-peach)" />
                {stepData?.title}
              </span>
              <span style={{
                fontSize: 10,
                padding: '2px 8px',
                borderRadius: 10,
                background: 'rgba(246, 70, 104, 0.2)',
                color: 'var(--ember-peach)',
                border: '1px solid rgba(246, 70, 104, 0.4)',
                fontWeight: 600
              }}>
                ROLE: {stepData?.roleName}
              </span>
            </div>
            <p style={{
              fontSize: 12.5,
              color: 'var(--text-muted)',
              marginTop: 3,
              maxWidth: 580,
              lineHeight: 1.4
            }}>
              {stepData?.narration}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Previous */}
          <button
            onClick={onPrev}
            disabled={currentStep === 0}
            className="btn-ember-secondary"
            style={{ padding: '8px 12px' }}
            title="Previous Step"
          >
            <SkipBack size={14} />
          </button>

          {/* Play/Pause */}
          <button
            onClick={onTogglePlay}
            className="btn-ember-primary"
            style={{ padding: '8px 16px', minWidth: 100, justifyContent: 'center' }}
          >
            {isPlaying ? (
              <>
                <Pause size={14} /> Pause
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" /> Resume
              </>
            )}
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            disabled={currentStep === totalSteps - 1}
            className="btn-ember-secondary"
            style={{ padding: '8px 12px' }}
            title="Next Step"
          >
            <SkipForward size={14} />
          </button>

          <div style={{ width: 1, height: 24, background: 'var(--border-subtle)', margin: '0 4px' }} />

          {/* Exit Demo */}
          <button
            onClick={onStop}
            className="btn-ember-secondary"
            style={{ padding: '8px 12px' }}
            title="Exit Automated Demo (Return to Manual Mode)"
          >
            <X size={15} />
            <span style={{ fontSize: 11, fontWeight: 600 }}>Exit Demo</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
