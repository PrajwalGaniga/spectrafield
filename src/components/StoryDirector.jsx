import React from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Compass, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Volume2
} from 'lucide-react';

export default function StoryDirector({
  currentChapter,
  totalChapters,
  chapterData,
  onNextChapter,
  onPrevChapter,
  isAutoplay,
  onToggleAutoplay,
  onJumpToChapter
}) {
  return (
    <div className="tactile-panel" style={{
      maxWidth: 1140,
      margin: '0 auto 24px',
      padding: '18px 24px',
      border: '2px solid rgba(232, 168, 56, 0.45)',
      background: 'linear-gradient(180deg, #FBF8F2 0%, #EFEBE2 100%)',
      boxShadow: 'var(--shadow-extruded-lg)'
    }}>
      {/* Top Banner: Chapter Navigation & Autoplay Switch */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        borderBottom: '1px solid rgba(162, 154, 140, 0.35)',
        paddingBottom: 12,
        marginBottom: 14
      }}>
        {/* Storyline Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'var(--grad-amber)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(226, 155, 39, 0.4)'
          }}>
            <Compass size={16} color="#4A2B00" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-amber)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                GUIDED FIELD MISSION // CHAPTER {currentChapter + 1} OF {totalChapters}
              </span>
              <span className="led-jewel green" />
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {chapterData?.title}
            </h3>
          </div>
        </div>

        {/* Previous / Next and Autoplay Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={onPrevChapter}
            disabled={currentChapter === 0}
            className="btn-tactile"
            style={{ padding: '7px 12px', fontSize: 12 }}
            title="Previous Story Step"
          >
            <ChevronLeft size={14} /> Back
          </button>

          <button
            onClick={onToggleAutoplay}
            className={isAutoplay ? 'btn-tactile-green' : 'btn-tactile-amber'}
            style={{ padding: '7px 14px', fontSize: 12 }}
          >
            {isAutoplay ? (
              <>
                <Pause size={13} /> Autoplay Running
              </>
            ) : (
              <>
                <Play size={13} fill="currentColor" /> Autoplay Story
              </>
            )}
          </button>

          <button
            onClick={onNextChapter}
            disabled={currentChapter === totalChapters - 1}
            className="btn-tactile-amber"
            style={{ padding: '7px 14px', fontSize: 12 }}
            title="Next Story Step"
          >
            Next Focus <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Main Narrative & Spotlight Instructions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        {/* Story Context & Active Focus */}
        <div>
          <p style={{ fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 10 }}>
            {chapterData?.storyContext}
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            background: 'rgba(234, 169, 55, 0.15)',
            border: '1px solid rgba(234, 169, 55, 0.4)',
            borderRadius: 8
          }}>
            <Sparkles size={14} color="var(--text-amber)" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-amber)' }}>
              Active Focus Target: {chapterData?.focusTarget}
            </span>
          </div>
        </div>

        {/* Action Prompt & Legal Defensibility Insight */}
        <div className="tactile-well" style={{ padding: 14, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Lightbulb size={14} color="#D97706" />
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-amber)', textTransform: 'uppercase' }}>
              Action Needed
            </span>
          </div>
          <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            👉 {chapterData?.actionPrompt}
          </p>
          <p style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Legal Insight: </strong>
            {chapterData?.legalInsight}
          </p>
        </div>
      </div>

      {/* Interactive Chapter Indicator Dots */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, paddingTop: 10, borderTop: '1px solid rgba(162, 154, 140, 0.25)' }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)' }}>
          JUMP TO STEP:
        </span>
        {Array.from({ length: totalChapters }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onJumpToChapter(idx)}
            style={{
              width: idx === currentChapter ? 24 : 10,
              height: 10,
              borderRadius: 5,
              background: idx === currentChapter ? 'var(--grad-amber)' : '#C9C3B6',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: idx === currentChapter ? '0 1px 4px rgba(226, 155, 39, 0.5)' : 'none'
            }}
            title={`Step ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
