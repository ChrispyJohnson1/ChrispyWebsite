// A customized <section> that includes a standardized name (s_name) and 
// identifier (s_id). Works with the dynamic table of contents (DynamicTOC).
export default function Section({s_id, s_name}) {
    return (
        <section id = {s_id} className = "custom-section">
            <h1>{s_name}</h1>
        </section>
    )
}