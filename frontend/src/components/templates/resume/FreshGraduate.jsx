const FreshGraduate = ({ data = {}, customization = {} }) => {
  const p = data.personal || {};
  const summary = data.summary || {};
  const experience = Array.isArray(data.experience) ? data.experience : (data.experience?._list || []);
  const education = Array.isArray(data.education) ? data.education : (data.education?._list || []);
  const skills = data.skills || {};
  const projects = Array.isArray(data.projects) ? data.projects : (data.projects?._list || []);
  const certifications = Array.isArray(data.certifications) ? data.certifications : (data.certifications?._list || []);
  const additional = data.additional || {};
  const declaration = data.declaration || {};
  const references = Array.isArray(data.references) ? data.references : (data.references?._list || []);

  const primaryColor = customization.primaryColor || '#7C3AED';
  const accentColor = customization.accentColor || '#EC4899';
  const font = customization.fontFamily || 'Inter, sans-serif';

  return (
    <div style={{ fontFamily: font, background: 'white', minHeight: '100%' }}>
      {/* Colorful Header */}
      <div style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})`, padding: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'absolute', bottom: '-20px', left: '30%', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {p.photoURL && <img src={p.photoURL} alt="" style={{ width: '85px', height: '85px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)', display: 'block', margin: '0 auto 0.75rem' }} />}
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'white', marginBottom: '0.25rem' }}>{p.name || 'Your Name'}</h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{p.title || 'Fresh Graduate'}</p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
            {[p.email, p.phone, p.city].filter(Boolean).map(v => <span key={v}>{v}</span>)}
            {[p.linkedin && {l: 'LinkedIn', u: p.linkedin}, p.github && {l: 'GitHub', u: p.github}, p.website && {l: 'Website', u: p.website}].filter(Boolean).map(v => <a href={v.u.startsWith('http') ? v.u : `https://${v.u}`} target="_blank" rel="noreferrer" key={v.l} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>{v.l}</a>)}
          </div>
          {(p.dob || p.nationality || p.maritalStatus || p.gender) && (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>
              {[
                p.dob && `DOB: ${p.dob}`,
                p.gender && `Gender: ${p.gender}`,
                p.nationality && `Nationality: ${p.nationality}`,
                p.maritalStatus && `Status: ${p.maritalStatus}`
              ].filter(Boolean).map(v => <span key={v}>{v}</span>)}
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Left */}
        <div>
          {summary.text && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '1rem' }}>👋</span>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: primaryColor }}>About Me</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.8 }}>{summary.text}</p>
            </div>
          )}

          {education.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '1rem' }}>🎓</span>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: primaryColor }}>Education</span>
              </div>
              {education.map((edu, i) => (
                <div key={i} style={{ background: `linear-gradient(135deg, ${primaryColor}08, ${accentColor}08)`, borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem', border: `1px solid ${primaryColor}22` }}>
                  <p style={{ fontWeight: '700', fontSize: '0.85rem', color: '#111' }}>{edu.degree} {edu.field && `- ${edu.field}`}</p>
                  <p style={{ fontSize: '0.78rem', color: '#6B7280' }}>{edu.institution}{edu.level ? ` (${edu.level})` : ''}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    {edu.year && <span style={{ background: `${primaryColor}15`, color: primaryColor, borderRadius: '999px', padding: '0.1rem 0.5rem', fontSize: '0.68rem', fontWeight: '600' }}>{edu.year}</span>}
                    {edu.grade && <span style={{ background: `${accentColor}15`, color: accentColor, borderRadius: '999px', padding: '0.1rem 0.5rem', fontSize: '0.68rem', fontWeight: '600' }}>{edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '1rem' }}>💼</span>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: primaryColor }}>Experience</span>
              </div>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '0.75rem', paddingLeft: '0.75rem', borderLeft: `3px solid ${primaryColor}` }}>
                  <p style={{ fontWeight: '700', fontSize: '0.85rem', color: '#111' }}>{exp.title}</p>
                  <p style={{ fontSize: '0.78rem', color: accentColor, fontWeight: '600' }}>
                    {exp.company}{exp.type ? ` · ${exp.type}` : ''}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '0.25rem' }}>{exp.startDate}{exp.current ? '–Present' : exp.endDate ? `–${exp.endDate}` : ''}</p>
                  {exp.description && <p style={{ fontSize: '0.77rem', color: '#6B7280', lineHeight: 1.6 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right */}
        <div>
          {/* Skills */}
          {(skills.technical || skills.programming || skills.frameworks || skills.databases || skills.tools || skills.soft) && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '1rem' }}>⚡</span>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: primaryColor }}>Skills</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {[skills.technical, skills.programming, skills.frameworks, skills.databases, skills.tools, skills.soft]
                  .filter(Boolean).join(',').split(',').map(s => s.trim()).filter(Boolean).map((s, i) => (
                  <span key={s} style={{ padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.73rem', fontWeight: '600', background: i % 2 === 0 ? `${primaryColor}15` : `${accentColor}15`, color: i % 2 === 0 ? primaryColor : accentColor, border: `1px solid ${i % 2 === 0 ? primaryColor : accentColor}33` }}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '1rem' }}>🚀</span>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: primaryColor }}>Projects</span>
              </div>
              {projects.slice(0, 3).map((proj, i) => (
                <div key={i} style={{ background: 'white', border: `1px solid ${primaryColor}22`, borderRadius: '8px', padding: '0.75rem', marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: '700', fontSize: '0.83rem', color: '#111' }}>{proj.name}</p>
                  {proj.tech && <p style={{ fontSize: '0.7rem', color: accentColor, fontWeight: '500', marginBottom: '0.2rem' }}>{proj.tech}</p>}
                  {(proj.duration || proj.url) && (
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginBottom: '0.3rem' }}>
                      {proj.duration && <span>{proj.duration}</span>}
                      {proj.duration && proj.url && <span> · </span>}
                      {proj.url && <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" style={{ color: primaryColor, textDecoration: 'none' }}>{proj.url}</a>}
                    </div>
                  )}
                  {proj.description && <p style={{ fontSize: '0.76rem', color: '#6B7280', lineHeight: 1.6 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '1rem' }}>📜</span>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: primaryColor }}>Certifications</span>
              </div>
              {certifications.map((cert, i) => (
                <div key={i} style={{ marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: '700', fontSize: '0.83rem', color: '#111' }}>{cert.name}</p>
                  <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>{cert.issuer} {cert.year && `· ${cert.year}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Additional Info */}
          {(additional.achievements || additional.publications || additional.patents || additional.languages || additional.workshops || additional.hobbies) && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '1rem' }}>🌟</span>
                <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: primaryColor }}>More Info</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#374151', lineHeight: 1.7 }}>
                {additional.achievements && <div style={{ marginBottom: '0.4rem' }}><strong>Achievements:</strong> {additional.achievements}</div>}
                {additional.publications && <div style={{ marginBottom: '0.4rem' }}><strong>Publications:</strong> {additional.publications}</div>}
                {additional.patents && <div style={{ marginBottom: '0.4rem' }}><strong>Patents:</strong> {additional.patents}</div>}
                {additional.languages && <div style={{ marginBottom: '0.4rem' }}><strong>Languages:</strong> {additional.languages}</div>}
                {additional.workshops && <div style={{ marginBottom: '0.4rem' }}><strong>Workshops:</strong> {additional.workshops}</div>}
                {additional.strengths && <div style={{ marginBottom: '0.4rem' }}><strong>Strengths:</strong> {additional.strengths}</div>}
                {additional.hobbies && <div style={{ marginBottom: '0.4rem' }}><strong>Hobbies:</strong> {additional.hobbies}</div>}
              </div>
            </div>
          )}


        </div>
      </div>

      {references.length > 0 && (
        <div style={{ margin: '0 1.5rem', borderTop: `1px solid ${primaryColor}22`, padding: '1.5rem 0 0.5rem', pageBreakInside: 'avoid' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1rem' }}>🤝</span>
            <span style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: primaryColor }}>References</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {references.map((ref, i) => (
              <div key={i} style={{ minWidth: '200px' }}>
                <p style={{ fontWeight: '700', color: '#111', fontSize: '0.8rem' }}>{ref.name}</p>
                <p style={{ fontSize: '0.72rem', color: '#6B7280' }}>{ref.position}</p>
                <p style={{ fontSize: '0.72rem', color: accentColor, fontWeight: '500' }}>{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {declaration.text && (
        <div style={{ margin: '0 1.5rem', borderTop: references.length > 0 ? 'none' : `1px solid ${primaryColor}22`, padding: references.length > 0 ? '1rem 0 1.5rem' : '1.5rem 0', pageBreakInside: 'avoid' }}>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', fontStyle: 'italic', marginBottom: '1.5rem' }}>"{declaration.text}"</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontSize: '0.8rem', color: '#374151' }}>
              {declaration.place && <p style={{ margin: '0 0 0.5rem' }}><strong>Place:</strong> {declaration.place}</p>}
              <p style={{ margin: 0 }}><strong>Date:</strong> _________________</p>
            </div>
            {declaration.signature && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ borderBottom: '1px solid #374151', width: '150px', marginBottom: '0.5rem' }}></div>
                <p style={{ fontSize: '0.85rem', color: '#111', margin: 0, fontWeight: '700' }}>{declaration.signature}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FreshGraduate;
