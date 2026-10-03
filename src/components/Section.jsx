export default function Section({ id, title, note, bodyClass = '', children }) {
  return (
    <section className="section" id={id} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <header className="ledger section__head">
          <h2 className="section__title" id={`${id}-title`}>
            {title}
          </h2>
          <p className="section__note">{note}</p>
        </header>
        <div className={bodyClass}>{children}</div>
      </div>
    </section>
  )
}
