// Text in content files wraps earned numbers in braces: "faster by {40%}".
export function highlight(text) {
  return text.split(/(\{[^}]+\})/g).map((part, i) =>
    part.startsWith('{') && part.endsWith('}') ? (
      <span className="metric num" key={i}>
        {part.slice(1, -1)}
      </span>
    ) : (
      part
    ),
  )
}
