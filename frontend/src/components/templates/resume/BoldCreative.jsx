const BoldCreative = ({ data = {}, customization = {} }) => {
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

  const primaryColor = customization.primaryColor || '#4F46E5';
  const accentColor = customization.accentColor || '#F59E0B';
  const font = customization.fontFamily || 'Inter, sans-serif';

  return (
    <div style={{ fontFamily: font, background: 'white', minHeight: '100%' }}>
      {/* Giant Name Header */}
      <div style={{ background: primaryColor, padding: '2.5rem 2rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', left: '30%', bottom: '-80px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        {p.photoURL && <img src={p.photoURL} alt="" style={{ width: '75px', height: '75px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${accentColor}`, position: 'absolute', top: '2rem', right: '2rem' }} />}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: accentColor, fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>✦ Resume</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', color: 'white', lineHeight: 1, marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>{p.name || 'Your Name'}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', fontWeight: '500' }}>{p.title}</p>
        </div>
      </div>

      <div style={{ background: accentColor, padding: '0.75rem 2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
        {[p.email, p.phone, p.city].filter(Boolean).map(v => (
          <span key={v} style={{ fontSize: '0.75rem', color: '#1C1917', fontWeight: '600' }}>{v}</span>
        ))}
        {p.linkedin && <a href={p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#1C1917', fontWeight: '600', textDecoration: 'none' }}>LinkedIn</a>}
        {p.github && <a href={p.github.startsWith('http') ? p.github : `https://${p.github}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#1C1917', fontWeight: '600', textDecoration: 'none' }}>GitHub</a>}
        {p.portfolio && <a href={p.portfolio.startsWith('http') ? p.portfolio : `https://${p.portfolio}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#1C1917', fontWeight: '600', textDecoration: 'none' }}>Portfolio</a>}
        {p.website && <a href={p.website.startsWith('http') ? p.website : `https://${p.website}`} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#1C1917', fontWeight: '600', textDecoration: 'none' }}>Website</a>}
      </div>
      
      {(p.dob || p.nationality || p.maritalStatus || p.gender) && (
        <div style={{ padding: '0 2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            p.dob && `DOB: ${p.dob}`,
            p.gender && `Gender: ${p.gender}`,
            p.nationality && `Nationality: ${p.nationality}`,
            p.maritalStatus && `Status: ${p.maritalStatus}`
          ].filter(Boolean).map((v, i) => (
            <span key={i} style={{ fontSize: '0.75rem', color: '#6B7280', fontWeight: '500', background: '#F3F4F6', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{v}</span>
          ))}
        </div>
      )}

      <div style={{ padding: '0 2rem 2rem' }}>
        {summary.text && (
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: primaryColor, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Profile</h2>
            <p style={{ fontSize: '0.85rem', color: '#374151', lineHeight: 1.85 }}>{summary.text}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Left */}
          <div>
            {experience.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '900', color: primaryColor, marginBottom: '1rem', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', background: accentColor, borderRadius: '2px' }} />
                  Experience
                </h2>
                {experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1rem' }}>
                    <div style={{ position: 'absolute', left: 0, top: '6px', width: '6px', height: '6px', borderRadius: '50%', background: primaryColor }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                      <p style={{ fontWeight: '700', color: '#111', fontSize: '0.875rem' }}>{exp.title}</p>
                      <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{exp.startDate}{exp.current ? '–Now' : exp.endDate ? `–${exp.endDate}` : ''}</span>
                    </div>
                    <p style={{ color: primaryColor, fontSize: '0.78rem', fontWeight: '700' }}>
                      {exp.company}{exp.type ? ` · ${exp.type}` : ''}
                    </p>
                    {exp.description && <p style={{ fontSize: '0.77rem', color: '#6B7280', marginTop: '0.25rem', lineHeight: 1.7 }}>{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {education.length > 0 && (
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '900', color: primaryColor, marginBottom: '1rem', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', background: accentColor, borderRadius: '2px' }} />
                  Education
                </h2>
                {education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: '0.75rem' }}>
                    <p style={{ fontWeight: '700', color: '#111', fontSize: '0.875rem' }}>{edu.degree} {edu.field && `— ${edu.field}`}</p>
                    <p style={{ fontSize: '0.78rem', color: '#6B7280' }}>{edu.institution}{edu.level ? ` (${edu.level})` : ''} · {edu.year}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right */}
          <div>
            {(skills.technical || skills.programming || skills.frameworks || skills.databases || skills.tools || skills.soft) && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '900', color: primaryColor, marginBottom: '0.75rem', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', background: accentColor, borderRadius: '2px' }} />
                  Skills
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {[skills.technical, skills.programming, skills.frameworks, skills.databases, skills.tools, skills.soft]
                    .filter(Boolean).join(',').split(',')
                    .map(s => s.trim()).filter(Boolean)
                    .map(s => (
                    <span key={s} style={{ background: `${primaryColor}10`, border: `1.5px solid ${primaryColor}30`, borderRadius: '6px', padding: '0.25rem 0.6rem', fontSize: '0.75rem', color: primaryColor, fontWeight: '600' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '900', color: primaryColor, marginBottom: '0.75rem', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', background: accentColor, borderRadius: '2px' }} />
                  Projects
                </h2>
                {projects.slice(0, 3).map((proj, i) => (
                  <div key={i} style={{ marginBottom: '0.75rem', background: '#F8FAFC', borderRadius: '8px', padding: '0.75rem', border: `1px solid ${primaryColor}15` }}>
                    <p style={{ fontWeight: '700', color: '#111', fontSize: '0.85rem' }}>{proj.name}</p>
                    {proj.tech && <p style={{ fontSize: '0.7rem', color: accentColor, fontWeight: '600', marginBottom: '0.2rem' }}>{proj.tech}</p>}
                    {(proj.duration || proj.url) && (
                      <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '0.3rem' }}>
                        {proj.duration && <span>{proj.duration}</span>}
                        {proj.duration && proj.url && <span> · </span>}
                        {proj.url && <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" style={{ color: primaryColor, textDecoration: 'none' }}>{proj.url}</a>}
                      </div>
                    )}
                    {proj.description && <p style={{ fontSize: '0.77rem', color: '#6B7280', lineHeight: 1.6 }}>{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {certifications.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '900', color: primaryColor, marginBottom: '0.75rem', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', background: accentColor, borderRadius: '2px' }} />
                  Certifications
                </h2>
                {certifications.map((cert, i) => (
                  <div key={i} style={{ marginBottom: '0.75rem' }}>
                    <p style={{ fontWeight: '700', color: '#111', fontSize: '0.85rem' }}>{cert.name}</p>
                    <p style={{ fontSize: '0.78rem', color: '#6B7280' }}>{cert.issuer} · {cert.year}</p>
                  </div>
                ))}
              </div>
            )}

            {(additional.achievements || additional.publications || additional.patents || additional.languages || additional.workshops || additional.hobbies) && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '900', color: primaryColor, marginBottom: '0.75rem', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-block', width: '12px', height: '12px', background: accentColor, borderRadius: '2px' }} />
                  Additional Info
                </h2>
                <div style={{ fontSize: '0.78rem', color: '#374151', lineHeight: 1.6 }}>
                  {additional.achievements && <div style={{ marginBottom: '0.5rem' }}><strong>Achievements:</strong> {additional.achievements}</div>}
                  {additional.publications && <div style={{ marginBottom: '0.5rem' }}><strong>Publications:</strong> {additional.publications}</div>}
                  {additional.patents && <div style={{ marginBottom: '0.5rem' }}><strong>Patents:</strong> {additional.patents}</div>}
                  {additional.languages && <div style={{ marginBottom: '0.5rem' }}><strong>Languages:</strong> {additional.languages}</div>}
                  {additional.workshops && <div style={{ marginBottom: '0.5rem' }}><strong>Workshops:</strong> {additional.workshops}</div>}
                  {additional.strengths && <div style={{ marginBottom: '0.5rem' }}><strong>Strengths:</strong> {additional.strengths}</div>}
                  {additional.hobbies && <div style={{ marginBottom: '0.5rem' }}><strong>Hobbies:</strong> {additional.hobbies}</div>}
                </div>
              </div>
            )}


          </div>
        </div>

        {references.length > 0 && (
          <div style={{ marginTop: '2rem', borderTop: '2px solid #F3F4F6', paddingTop: '1.5rem', pageBreakInside: 'avoid' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: '900', color: primaryColor, marginBottom: '1rem', letterSpacing: '-0.01em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ display: 'inline-block', width: '12px', height: '12px', background: accentColor, borderRadius: '2px' }} />
              References
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
              {references.map((ref, i) => (
                <div key={i} style={{ minWidth: '200px' }}>
                  <p style={{ fontWeight: '700', color: '#111', fontSize: '0.85rem' }}>{ref.name}</p>
                  <p style={{ fontSize: '0.78rem', color: '#6B7280' }}>{ref.position}</p>
                  <p style={{ fontSize: '0.75rem', color: primaryColor, fontWeight: '500' }}>{ref.contact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {declaration.text && (
          <div style={{ marginTop: references.length > 0 ? '1.5rem' : '2rem', borderTop: references.length > 0 ? 'none' : '2px solid #F3F4F6', paddingTop: references.length > 0 ? '0' : '1.5rem', pageBreakInside: 'avoid' }}>
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
    </div>
  );
};

export default BoldCreative;
