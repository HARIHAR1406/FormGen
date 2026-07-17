const TechMinimal = ({ data = {}, customization = {} }) => {
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

  const primaryColor = customization.primaryColor || '#16A34A';
  const font = customization.fontFamily || "'Courier New', monospace";

  return (
    <div style={{ fontFamily: font, background: '#FAFAFA', minHeight: '100%', padding: '2.5rem' }}>
      {/* Terminal-style header */}
      <div style={{ background: '#1E1E1E', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '6px', marginBottom: '1rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FF5F57' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#FEBC2E' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28C840' }} />
        </div>
        <p style={{ color: '#6A9955', fontSize: '0.78rem', marginBottom: '0.25rem' }}>{`// resume.json`}</p>
        <div style={{ color: primaryColor, fontSize: '1.5rem', fontWeight: '700' }}>{`> ${p.name || 'Your Name'}`}</div>
        <div style={{ color: '#9CDCFE', fontSize: '0.85rem', marginTop: '0.25rem' }}>{p.title || 'Software Engineer'}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.75rem' }}>
          {[p.email, p.phone, p.city].filter(Boolean).map(v => (
            <span key={v} style={{ color: '#CE9178', fontSize: '0.72rem' }}>"{v}"</span>
          ))}
          {[p.github && {l: 'github', u: p.github}, p.linkedin && {l: 'linkedin', u: p.linkedin}, p.website && {l: 'website', u: p.website}].filter(Boolean).map(v => (
            <a href={v.u.startsWith('http') ? v.u : `https://${v.u}`} target="_blank" rel="noreferrer" key={v.l} style={{ color: '#CE9178', fontSize: '0.72rem', textDecoration: 'none' }}>"{v.u}"</a>
          ))}
        </div>
        {(p.dob || p.nationality || p.maritalStatus || p.gender) && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem', color: '#888', fontSize: '0.7rem' }}>
            {[
              p.dob && `dob:"${p.dob}"`,
              p.gender && `gender:"${p.gender}"`,
              p.nationality && `nat:"${p.nationality}"`,
              p.maritalStatus && `status:"${p.maritalStatus}"`
            ].filter(Boolean).map((v, i) => <span key={i}>{v}</span>)}
          </div>
        )}
      </div>

      {/* Summary */}
      {summary.text && (
        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: '#F0FFF4', borderLeft: `4px solid ${primaryColor}`, borderRadius: '4px' }}>
          <p style={{ color: '#065F46', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>// summary</p>
          <p style={{ fontSize: '0.83rem', color: '#374151', lineHeight: 1.8 }}>{summary.text}</p>
        </div>
      )}

      {/* Skills */}
      {(skills.technical || skills.tools || skills.programming || skills.frameworks || skills.databases || skills.soft) && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: primaryColor, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// skills</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[skills.technical, skills.tools, skills.programming, skills.frameworks, skills.databases, skills.soft].filter(Boolean).join(',').split(',').map(s => s.trim()).filter(Boolean).map(s => (
              <span key={s} style={{ background: '#F0FFF4', border: `1px solid ${primaryColor}`, borderRadius: '4px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', color: '#065F46', fontFamily: "'Courier New', monospace" }}>{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: primaryColor, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// experience</p>
          {experience.map((exp, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem' }}>
                <div>
                  <span style={{ fontWeight: '700', color: '#111', fontSize: '0.875rem' }}>{exp.title}</span>
                  <span style={{ color: primaryColor, fontSize: '0.8rem' }}> @ {exp.company}{exp.type ? ` (${exp.type})` : ''}</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>{exp.startDate}{exp.current ? '–now' : exp.endDate ? `–${exp.endDate}` : ''}</span>
              </div>
              {exp.description && <p style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '0.35rem', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: primaryColor, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// projects</p>
          {projects.slice(0, 3).map((proj, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '0.875rem', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '700', color: '#111', fontSize: '0.875rem' }}>{proj.name}</span>
                {proj.tech && <span style={{ fontSize: '0.7rem', color: primaryColor, fontFamily: "'Courier New', monospace" }}>[{proj.tech}]</span>}
              </div>
              {(proj.duration || proj.url) && (
                <div style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
                  {proj.duration && <span>{proj.duration}</span>}
                  {proj.duration && proj.url && <span> · </span>}
                  {proj.url && <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" style={{ color: primaryColor, textDecoration: 'none' }}>{proj.url}</a>}
                </div>
              )}
              {proj.description && <p style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '0.3rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: primaryColor, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// education</p>
          {education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>
              <div>
                <span style={{ fontWeight: '600', color: '#111', fontSize: '0.85rem' }}>{edu.degree} {edu.field && `in ${edu.field}`}</span>
                <br />
                <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>{edu.institution}{edu.level ? ` (${edu.level})` : ''}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{edu.year}</span>
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: primaryColor, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// certifications</p>
          {certifications.map((cert, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: 'Inter, sans-serif' }}>
              <div>
                <span style={{ fontWeight: '600', color: '#111', fontSize: '0.85rem' }}>{cert.name}</span>
                <br />
                <span style={{ fontSize: '0.78rem', color: '#6B7280' }}>{cert.issuer}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{cert.year}</span>
            </div>
          ))}
        </div>
      )}

      {/* Additional Info */}
      {(additional.achievements || additional.publications || additional.patents || additional.languages || additional.workshops || additional.hobbies) && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: primaryColor, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// additional info</p>
          <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '1rem', fontFamily: 'Inter, sans-serif' }}>
            {additional.achievements && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '700', fontSize: '0.8rem' }}>Achievements: </span><span style={{ fontSize: '0.78rem', color: '#6B7280' }}>{additional.achievements}</span></div>}
            {additional.publications && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '700', fontSize: '0.8rem' }}>Publications: </span><span style={{ fontSize: '0.78rem', color: '#6B7280' }}>{additional.publications}</span></div>}
            {additional.patents && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '700', fontSize: '0.8rem' }}>Patents: </span><span style={{ fontSize: '0.78rem', color: '#6B7280' }}>{additional.patents}</span></div>}
            {additional.languages && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '700', fontSize: '0.8rem' }}>Languages: </span><span style={{ fontSize: '0.78rem', color: '#6B7280' }}>{additional.languages}</span></div>}
            {additional.workshops && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '700', fontSize: '0.8rem' }}>Workshops: </span><span style={{ fontSize: '0.78rem', color: '#6B7280' }}>{additional.workshops}</span></div>}
            {additional.strengths && <div style={{ marginBottom: '0.5rem' }}><span style={{ fontWeight: '700', fontSize: '0.8rem' }}>Strengths: </span><span style={{ fontSize: '0.78rem', color: '#6B7280' }}>{additional.strengths}</span></div>}
            {additional.hobbies && <div><span style={{ fontWeight: '700', fontSize: '0.8rem' }}>Hobbies: </span><span style={{ fontSize: '0.78rem', color: '#6B7280' }}>{additional.hobbies}</span></div>}
          </div>
        </div>
      )}

      {/* References */}
      {references.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: primaryColor, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>// references</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontFamily: 'Inter, sans-serif' }}>
            {references.map((ref, i) => (
              <div key={i}>
                <div style={{ fontWeight: '600', color: '#111', fontSize: '0.85rem' }}>{ref.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#6B7280' }}>{ref.position}</div>
                <div style={{ fontSize: '0.75rem', color: primaryColor }}>{ref.contact}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Declaration */}
      {declaration.text && (
        <div style={{ marginTop: '2rem', borderTop: '1px dashed #E5E7EB', paddingTop: '1.5rem', fontFamily: 'Inter, sans-serif', pageBreakInside: 'avoid' }}>
          <p style={{ fontSize: '0.8rem', color: '#6B7280', fontStyle: 'italic', marginBottom: '2rem' }}>"{declaration.text}"</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontSize: '0.8rem', color: '#374151' }}>
              {declaration.place && <p style={{ margin: '0 0 0.5rem' }}><strong>Place:</strong> {declaration.place}</p>}
              <p style={{ margin: 0 }}><strong>Date:</strong> _________________</p>
            </div>
            {declaration.signature && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ borderBottom: '1px solid #374151', width: '150px', marginBottom: '0.5rem' }}></div>
                <p style={{ fontSize: '0.85rem', color: '#111', margin: 0, fontWeight: '600' }}>{declaration.signature}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechMinimal;
