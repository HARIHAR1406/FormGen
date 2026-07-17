const CompactPro = ({ data = {}, customization = {} }) => {
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

  const primaryColor = customization.primaryColor || '#0F172A';
  const accentColor = customization.accentColor || '#6366F1';
  const font = customization.fontFamily || 'Inter, sans-serif';

  const Sec = ({ t }) => <div style={{ fontSize: '0.68rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: accentColor, borderBottom: `1px solid ${accentColor}`, paddingBottom: '0.2rem', marginBottom: '0.5rem', marginTop: '1rem' }}>{t}</div>;

  return (
    <div style={{ fontFamily: font, background: 'white', minHeight: '100%', padding: '1.75rem' }}>
      {/* Compact Header */}
      <div style={{ borderBottom: `3px solid ${primaryColor}`, paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '900', color: primaryColor, letterSpacing: '-0.02em' }}>{p.name || 'Your Name'}</h1>
            <p style={{ color: accentColor, fontSize: '0.825rem', fontWeight: '600' }}>{p.title}</p>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.72rem', color: '#64748B', lineHeight: 1.7 }}>
            {[p.email, p.phone, p.city].filter(Boolean).map(v => <div key={v}>{v}</div>)}
            {[p.linkedin && {l: 'LinkedIn', u: p.linkedin}, p.github && {l: 'GitHub', u: p.github}, p.website && {l: 'Website', u: p.website}].filter(Boolean).map(v => <a href={v.u.startsWith('http') ? v.u : `https://${v.u}`} target="_blank" rel="noreferrer" key={v.l} style={{ color: accentColor, textDecoration: 'none', display: 'block' }}>{v.l}</a>)}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 230px', gap: '1.25rem' }}>
        {/* Left */}
        <div>
          {summary.text && (
            <>
              <Sec t="Summary" />
              <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.75 }}>{summary.text}</p>
            </>
          )}

          {(p.dob || p.nationality || p.maritalStatus || p.gender) && (
            <>
              <Sec t="Personal Details" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem', color: '#374151' }}>
                {p.dob && <div><strong>DOB:</strong> {p.dob}</div>}
                {p.gender && <div><strong>Gender:</strong> {p.gender}</div>}
                {p.nationality && <div><strong>Nationality:</strong> {p.nationality}</div>}
                {p.maritalStatus && <div><strong>Status:</strong> {p.maritalStatus}</div>}
              </div>
            </>
          )}

          {experience.length > 0 && (
            <>
              <Sec t="Experience" />
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem', color: primaryColor }}>{exp.title}</span>
                    <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{exp.startDate}{exp.current ? '–Present' : exp.endDate ? `–${exp.endDate}` : ''}</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: accentColor, fontWeight: '600' }}>
                    {exp.company}{exp.type ? ` · ${exp.type}` : ''}
                  </p>
                  {exp.description && <p style={{ fontSize: '0.77rem', color: '#6B7280', marginTop: '0.25rem', lineHeight: 1.7 }}>{exp.description}</p>}
                </div>
              ))}
            </>
          )}

          {projects.length > 0 && (
            <>
              <Sec t="Projects" />
              {projects.slice(0, 4).map((proj, i) => (
                <div key={i} style={{ marginBottom: '0.6rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.83rem', color: primaryColor }}>{proj.name}</span>
                  {proj.tech && <span style={{ fontSize: '0.7rem', color: accentColor }}> · {proj.tech}</span>}
                  {(proj.duration || proj.url) && (
                    <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.1rem', marginBottom: '0.2rem' }}>
                      {proj.duration && <span>{proj.duration}</span>}
                      {proj.duration && proj.url && <span> · </span>}
                      {proj.url && <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" style={{ color: accentColor, textDecoration: 'none' }}>{proj.url}</a>}
                    </div>
                  )}
                  {proj.description && <p style={{ fontSize: '0.76rem', color: '#6B7280', lineHeight: 1.6 }}>{proj.description}</p>}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right Sidebar */}
        <div>
          {skills.technical && (
            <>
              <Sec t="Technical Skills" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {skills.technical.split(',').map(s => s.trim()).filter(Boolean).map(s => (
                  <span key={s} style={{ background: '#EEF2FF', border: `1px solid ${accentColor}44`, borderRadius: '3px', padding: '0.15rem 0.4rem', fontSize: '0.7rem', color: accentColor }}>{s}</span>
                ))}
              </div>
            </>
          )}
          {skills.programming && (
            <>
              <Sec t="Programming" />
              <p style={{ fontSize: '0.77rem', color: '#374151', lineHeight: 1.8 }}>{skills.programming}</p>
            </>
          )}
          {skills.frameworks && (
            <>
              <Sec t="Frameworks" />
              <p style={{ fontSize: '0.77rem', color: '#374151', lineHeight: 1.8 }}>{skills.frameworks}</p>
            </>
          )}
          {skills.databases && (
            <>
              <Sec t="Databases" />
              <p style={{ fontSize: '0.77rem', color: '#374151', lineHeight: 1.8 }}>{skills.databases}</p>
            </>
          )}
          {skills.tools && (
            <>
              <Sec t="Tools" />
              <p style={{ fontSize: '0.77rem', color: '#374151', lineHeight: 1.8 }}>{skills.tools}</p>
            </>
          )}
          {skills.soft && (
            <>
              <Sec t="Soft Skills" />
              <p style={{ fontSize: '0.77rem', color: '#374151', lineHeight: 1.8 }}>{skills.soft}</p>
            </>
          )}

          {education.length > 0 && (
            <>
              <Sec t="Education" />
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '0.5rem' }}>
                  <p style={{ fontWeight: '700', fontSize: '0.8rem', color: primaryColor }}>{edu.degree}</p>
                  <p style={{ fontSize: '0.73rem', color: '#374151' }}>{edu.institution}{edu.level ? ` (${edu.level})` : ''}</p>
                  <p style={{ fontSize: '0.73rem', color: '#94A3B8' }}>{edu.year}</p>
                </div>
              ))}
            </>
          )}

          {certifications.length > 0 && (
            <>
              <Sec t="Certifications" />
              {certifications.slice(0, 4).map((c, i) => (
                <p key={i} style={{ fontSize: '0.77rem', color: '#374151', marginBottom: '0.3rem' }}>• {c.name} {c.issuer && <span style={{ color: '#94A3B8' }}>({c.issuer})</span>}</p>
              ))}
            </>
          )}

          {(additional.achievements || additional.publications || additional.patents || additional.languages || additional.workshops || additional.hobbies) && (
            <>
              <Sec t="Additional Info" />
              <div style={{ fontSize: '0.75rem', color: '#374151', lineHeight: 1.6 }}>
                {additional.achievements && <div style={{ marginBottom: '0.3rem' }}><strong>Achievements:</strong> {additional.achievements}</div>}
                {additional.publications && <div style={{ marginBottom: '0.3rem' }}><strong>Publications:</strong> {additional.publications}</div>}
                {additional.patents && <div style={{ marginBottom: '0.3rem' }}><strong>Patents:</strong> {additional.patents}</div>}
                {additional.languages && <div style={{ marginBottom: '0.3rem' }}><strong>Languages:</strong> {additional.languages}</div>}
                {additional.workshops && <div style={{ marginBottom: '0.3rem' }}><strong>Workshops:</strong> {additional.workshops}</div>}
                {additional.strengths && <div style={{ marginBottom: '0.3rem' }}><strong>Strengths:</strong> {additional.strengths}</div>}
                {additional.hobbies && <div style={{ marginBottom: '0.3rem' }}><strong>Hobbies:</strong> {additional.hobbies}</div>}
              </div>
            </>
          )}


        </div>
      </div>

      {references.length > 0 && (
        <div style={{ marginTop: '2rem', borderTop: `1px solid ${accentColor}33`, paddingTop: '1.5rem', pageBreakInside: 'avoid' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: accentColor, borderBottom: `1px solid ${accentColor}`, paddingBottom: '0.2rem', marginBottom: '1rem' }}>References</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {references.map((ref, i) => (
              <div key={i} style={{ minWidth: '200px' }}>
                <p style={{ fontWeight: '700', color: primaryColor, fontSize: '0.8rem' }}>{ref.name}</p>
                <p style={{ fontSize: '0.73rem', color: '#6B7280' }}>{ref.position}</p>
                <p style={{ fontSize: '0.73rem', color: accentColor, fontWeight: '500' }}>{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {declaration.text && (
        <div style={{ marginTop: references.length > 0 ? '1.5rem' : '2rem', borderTop: references.length > 0 ? 'none' : `1px solid ${accentColor}33`, paddingTop: references.length > 0 ? '0' : '1.5rem', pageBreakInside: 'avoid' }}>
          <p style={{ fontSize: '0.75rem', color: '#6B7280', fontStyle: 'italic', marginBottom: '1.5rem' }}>"{declaration.text}"</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontSize: '0.75rem', color: '#374151' }}>
              {declaration.place && <p style={{ margin: '0 0 0.5rem' }}><strong>Place:</strong> {declaration.place}</p>}
              <p style={{ margin: 0 }}><strong>Date:</strong> _________________</p>
            </div>
            {declaration.signature && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ borderBottom: '1px solid #374151', width: '150px', marginBottom: '0.5rem' }}></div>
                <p style={{ fontSize: '0.8rem', color: '#111', margin: 0, fontWeight: '700' }}>{declaration.signature}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompactPro;
