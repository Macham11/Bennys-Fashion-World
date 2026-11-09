export default function Prose({ title, intro, secs = [], children }) {
  return (
    <div className="wrap"><div className="prose">
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
      {secs.map(([h, p]) => <div key={h}><h2>{h}</h2><p>{p}</p></div>)}
      {children}
    </div></div>
  );
}
