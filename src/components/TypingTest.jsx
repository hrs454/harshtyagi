import { useEffect, useMemo, useRef, useState } from 'react'

const DURATION = 15
const WINDOW = 24
const PAGE = 12

const WORDS =
  `the quick build ship data table form field import export merge valid row column map parse
   render state props hook query cache token route fetch commit branch review deploy index
   cursor filter sort batch upload schema model button layout focus value label format check
   update create delete search result page input output system client server string number`
    .split(/\s+/)
    .filter(Boolean)

function draw(count) {
  return Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)])
}

export default function TypingTest() {
  const [words, setWords] = useState(() => draw(80))
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('idle')
  const [timeLeft, setTimeLeft] = useState(DURATION)
  const [focused, setFocused] = useState(false)

  const inputRef = useRef(null)
  const startedAt = useRef(0)

  useEffect(() => {
    if (status !== 'running') return
    const id = setInterval(() => {
      const left = DURATION - (Date.now() - startedAt.current) / 1000
      if (left <= 0) {
        setTimeLeft(0)
        setStatus('done')
      } else {
        setTimeLeft(left)
      }
    }, 100)
    return () => clearInterval(id)
  }, [status])

  const stats = useMemo(() => {
    const attempts = [...entries, { word: words[index] ?? '', typed }]
    let correct = 0
    let keyed = 0
    for (const attempt of attempts) {
      keyed += attempt.typed.length
      for (let i = 0; i < attempt.typed.length; i++) {
        if (attempt.typed[i] === attempt.word[i]) correct++
      }
    }
    const elapsed = DURATION - timeLeft
    return {
      wpm: elapsed > 0.5 ? Math.round(correct / 5 / (elapsed / 60)) : 0,
      accuracy: keyed ? Math.round((correct / keyed) * 100) : 100,
    }
  }, [entries, words, index, typed, timeLeft])

  function handleChange(event) {
    if (status === 'done') return
    const value = event.target.value

    if (status === 'idle') {
      startedAt.current = Date.now()
      setStatus('running')
    }

    if (value.endsWith(' ')) {
      const attempt = value.trimEnd()
      if (!attempt) return
      setEntries((prev) => [...prev, { word: words[index], typed: attempt }])
      setIndex((i) => i + 1)
      setTyped('')
      // Keep a buffer of unseen words ahead of the caret so a fast typist never runs out.
      setWords((prev) => (index + 1 > prev.length - WINDOW ? [...prev, ...draw(40)] : prev))
      return
    }

    setTyped(value)
  }

  function restart() {
    setWords(draw(80))
    setIndex(0)
    setTyped('')
    setEntries([])
    setTimeLeft(DURATION)
    setStatus('idle')
    inputRef.current?.focus()
  }

  const windowStart = Math.floor(index / PAGE) * PAGE
  const visible = words.slice(windowStart, windowStart + WINDOW)
  const showCaret = focused && status !== 'done'

  return (
    <div className="tt">
      <dl className="tt__hud">
        <div className="tt__stat tt__stat--time">
          <dt>Time</dt>
          <dd>{Math.ceil(timeLeft)}s</dd>
        </div>
        <div className="tt__stat">
          <dt>Words per minute</dt>
          <dd>{stats.wpm}</dd>
        </div>
        <div className="tt__stat">
          <dt>Accuracy</dt>
          <dd>{stats.accuracy}%</dd>
        </div>
        <span className="tt__spacer" />
        <button className="tt__restart" type="button" onClick={restart}>
          Restart
        </button>
      </dl>

      <div className="tt__field">
        <p className="tt__words" aria-hidden="true">
          {visible.map((word, i) => {
            const position = windowStart + i

            if (position < index) {
              const attempt = entries[position]
              const right = attempt && attempt.typed === attempt.word
              return (
                <span
                  className={`tt__word tt__word--${right ? 'right' : 'wrong'}`}
                  key={position}
                >
                  {word}
                </span>
              )
            }

            if (position > index) {
              return (
                <span className="tt__word" key={position}>
                  {word}
                </span>
              )
            }

            const letters = []
            for (let c = 0; c < word.length; c++) {
              if (showCaret && c === typed.length) letters.push(<i className="tt__caret" key="caret" />)
              const entered = typed[c]
              const state = entered === undefined ? '' : entered === word[c] ? '' : 'tt__char--bad'
              letters.push(
                <span className={state} key={c}>
                  {word[c]}
                </span>,
              )
            }
            const overflow = typed.slice(word.length)
            if (overflow) {
              letters.push(
                <span className="tt__char--extra" key="overflow">
                  {overflow}
                </span>,
              )
            }
            if (showCaret && typed.length >= word.length) {
              letters.push(<i className="tt__caret" key="caret" />)
            }

            return (
              <span className="tt__word tt__word--active" key={position}>
                {letters}
              </span>
            )
          })}
        </p>

        <input
          className="tt__input"
          ref={inputRef}
          value={typed}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={status === 'done'}
          aria-label="Typing test input. Type the words shown for fifteen seconds."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        {status === 'idle' && !focused && (
          <div className="tt__overlay">
            <button className="btn btn--primary" type="button" onClick={() => inputRef.current?.focus()}>
              Start typing test
            </button>
            <p className="tt__note">Fifteen seconds. The clock starts on your first keystroke.</p>
          </div>
        )}

        {status === 'done' && (
          <div className="tt__overlay" role="status">
            <p className="tt__score num">
              {stats.wpm}
              <small>words per minute</small>
            </p>
            <p className="tt__note">
              {stats.accuracy}% accurate across {entries.length} words.
            </p>
            <button className="btn btn--quiet" type="button" onClick={restart}>
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
