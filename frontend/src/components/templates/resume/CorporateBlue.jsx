const CorporateBlue = ({ data = {}, customization = {} }) => {
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

  const primaryColor = customization.primaryColor || '#1E3A5F';
  const accentColor = customization.accentColor || '#2563EB';
  const font = customization.fontFamily || 'Inter, sans-serif';

  return (
    <div style={{ fontFamily: font, background: 'white', minHeight: '100%' }}>
      {/* Header */}
      <div style={{ background: primaryColor, padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.625rem', fontWeight: '800', color: 'white', marginBottom: '0.2rem', letterSpacing: '-0.01em' }}>{p.name || 'Your Name'}</h1>
          <p style={{ color: '#93C5FD', fontSize: '0.875rem', fontWeight: '500' }}>{p.title}</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#93C5FD', lineHeight: 1.8 }}>
          {[p.phone, p.email, p.city].filter(Boolean).map(v => <div key={v}>{v}</div>)}
          {[p.linkedin && {l: 'LinkedIn', u: p.linkedin}, p.github && {l: 'GitHub', u: p.github}, p.website && {l: 'Website', u: p.website}].filter(Boolean).map(v => <a href={v.u.startsWith('http') ? v.u : `https://${v.u}`} target="_blank" rel="noreferrer" key={v.l} style={{ color: '#BFDBFE', textDecoration: 'none', display: 'block' }}>{v.l}</a>)}
        </div>
      </div>

      {(p.dob || p.nationality || p.maritalStatus || p.gender) && (
        <div style={{ background: '#F8FAFC', padding: '0.75rem 2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', borderBottom: '1px solid #E2E8F0' }}>
          {[
            p.dob && `DOB: ${p.dob}`,
            p.gender && `Gender: ${p.gender}`,
            p.nationality && `Nationality: ${p.nationality}`,
            p.maritalStatus && `Status: ${p.maritalStatus}`
          ].filter(Boolean).map((v, i) => (
            <span key={i} style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '500' }}>{v}</span>
          ))}
        </div>
      )}
      {/* Accent bar */}
      <div style={{ height: '4px', background: `linear-gradient(to right, ${accentColor}, #60A5FA)` }} />

      <div style={{ padding: '1.5rem 2rem', display: 'grid', gridTemplateColumns: '1fr 200px', gap: '2rem' }}>
        {/* Main */}
        <div>
          {summary.text && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '2px', background: accentColor }} />
                Professional Summary
              </div>
              <p style={{ fontSize: '0.83rem', color: '#374151', lineHeight: 1.8 }}>{summary.text}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '2px', background: accentColor }} />
                Work Experience
              </div>
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: i < experience.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontWeight: '700', color: primaryColor, fontSize: '0.875rem' }}>{exp.title}</p>
                      <p style={{ color: accentColor, fontSize: '0.8rem', fontWeight: '600' }}>
                        {exp.company}{exp.type ? ` · ${exp.type}` : ''}
                      </p>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', flexShrink: 0, background: '#F8FAFC', padding: '0.2rem 0.5rem', borderRadius: '4px', border: '1px solid #E2E8F0' }}>{exp.startDate}{exp.current ? '–Present' : exp.endDate ? `–${exp.endDate}` : ''}</span>
                  </div>
                  {exp.description && <p style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '0.4rem', lineHeight: 1.7 }}>{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {education.length > 0 && (
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '2px', background: accentColor }} />
                Education
              </div>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ fontWeight: '700', color: primaryColor, fontSize: '0.85rem' }}>{edu.degree} {edu.field && `in ${edu.field}`}</p>
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{edu.year}</span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#64748B' }}>{edu.institution}{edu.level ? ` (${edu.level})` : ''} {edu.grade && `· ${edu.grade}`}</p>
                </div>
              ))}
            </div>
          )}
          {projects.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '2px', background: accentColor }} />
                Projects
              </div>
              {projects.slice(0, 3).map((proj, i) => (
                <div key={i} style={{ marginBottom: '1rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p style={{ fontWeight: '700', color: primaryColor, fontSize: '0.875rem' }}>{proj.name}</p>
                    {proj.tech && <span style={{ fontSize: '0.7rem', color: accentColor, fontWeight: '600', background: '#DBEAFE', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{proj.tech}</span>}
                  </div>
                  {(proj.duration || proj.url) && (
                    <div style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '0.2rem', marginBottom: '0.4rem' }}>
                      {proj.duration && <span>{proj.duration}</span>}
                      {proj.duration && proj.url && <span> · </span>}
                      {proj.url && <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" style={{ color: accentColor, textDecoration: 'none' }}>{proj.url}</a>}
                    </div>
                  )}
                  {proj.description && <p style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '0.3rem', lineHeight: 1.6 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          )}

          {(additional.achievements || additional.publications || additional.patents || additional.languages || additional.workshops || additional.hobbies) && (
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '20px', height: '2px', background: accentColor }} />
                Additional Information
              </div>
              <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.7 }}>
                {additional.achievements && <div style={{ marginBottom: '0.4rem' }}><strong style={{ color: primaryColor }}>Achievements:</strong> {additional.achievements}</div>}
                {additional.publications && <div style={{ marginBottom: '0.4rem' }}><strong style={{ color: primaryColor }}>Publications:</strong> {additional.publications}</div>}
                {additional.patents && <div style={{ marginBottom: '0.4rem' }}><strong style={{ color: primaryColor }}>Patents:</strong> {additional.patents}</div>}
                {additional.languages && <div style={{ marginBottom: '0.4rem' }}><strong style={{ color: primaryColor }}>Languages:</strong> {additional.languages}</div>}
                {additional.workshops && <div style={{ marginBottom: '0.4rem' }}><strong style={{ color: primaryColor }}>Workshops:</strong> {additional.workshops}</div>}
                {additional.strengths && <div style={{ marginBottom: '0.4rem' }}><strong style={{ color: primaryColor }}>Strengths:</strong> {additional.strengths}</div>}
                {additional.hobbies && <div style={{ marginBottom: '0.4rem' }}><strong style={{ color: primaryColor }}>Hobbies:</strong> {additional.hobbies}</div>}
              </div>
            </div>
          )}


        </div>

        {/* Sidebar */}
        <div>
          {skills.technical && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.67rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Skills</div>
              {skills.technical.split(',').map(s => s.trim()).filter(Boolean).map(s => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.75rem', color: '#374151' }}>{s}</span>
                </div>
              ))}
            </div>
          )}
          {skills.tools && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.67rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Tools</div>
              <p style={{ fontSize: '0.75rem', color: '#374151', lineHeight: 1.8 }}>{skills.tools}</p>
            </div>
          )}
          {skills.programming && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.67rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Programming</div>
              <p style={{ fontSize: '0.75rem', color: '#374151', lineHeight: 1.8 }}>{skills.programming}</p>
            </div>
          )}
          {skills.frameworks && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.67rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Frameworks</div>
              <p style={{ fontSize: '0.75rem', color: '#374151', lineHeight: 1.8 }}>{skills.frameworks}</p>
            </div>
          )}
          {skills.databases && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.67rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Databases</div>
              <p style={{ fontSize: '0.75rem', color: '#374151', lineHeight: 1.8 }}>{skills.databases}</p>
            </div>
          )}
          {skills.soft && (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.67rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Soft Skills</div>
              <p style={{ fontSize: '0.75rem', color: '#374151', lineHeight: 1.8 }}>{skills.soft}</p>
            </div>
          )}
          {certifications.length > 0 && (
            <div>
              <div style={{ fontSize: '0.67rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Certifications</div>
              {certifications.slice(0, 5).map((c, i) => (
                <div key={i} style={{ marginBottom: '0.4rem', paddingBottom: '0.4rem', borderBottom: '1px solid #F1F5F9' }}>
                  <p style={{ fontSize: '0.75rem', color: '#1E293B', fontWeight: '600' }}>{c.name}</p>
                  <p style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{c.issuer} {c.year && `· ${c.year}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {references.length > 0 && (
        <div style={{ marginTop: '1rem', borderTop: '1px solid #E2E8F0', paddingTop: '1.5rem', padding: '0 2rem 1.5rem', pageBreakInside: 'avoid' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: '800', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '20px', height: '2px', background: accentColor }} />
            References
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {references.map((ref, i) => (
              <div key={i} style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', minWidth: '200px' }}>
                <p style={{ fontWeight: '700', color: primaryColor, fontSize: '0.8rem' }}>{ref.name}</p>
                <p style={{ fontSize: '0.75rem', color: '#64748B', margin: '0.1rem 0' }}>{ref.position}</p>
                <p style={{ fontSize: '0.72rem', color: accentColor, fontWeight: '500' }}>{ref.contact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {declaration.text && (
        <div style={{ marginTop: references.length > 0 ? '0' : '1rem', borderTop: references.length > 0 ? 'none' : '1px solid #E2E8F0', paddingTop: references.length > 0 ? '0' : '1.5rem', padding: '0 2rem 2rem', pageBreakInside: 'avoid' }}>
          <p style={{ fontSize: '0.75rem', color: '#64748B', fontStyle: 'italic', marginBottom: '1.5rem' }}>"{declaration.text}"</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ fontSize: '0.75rem', color: '#374151' }}>
              {declaration.place && <p style={{ margin: '0 0 0.5rem' }}><strong>Place:</strong> {declaration.place}</p>}
              <p style={{ margin: 0 }}><strong>Date:</strong> _________________</p>
            </div>
            {declaration.signature && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ borderBottom: '1px solid #374151', width: '150px', marginBottom: '0.5rem' }}></div>
                <p style={{ fontSize: '0.8rem', color: primaryColor, margin: 0, fontWeight: '700' }}>{declaration.signature}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CorporateBlue;
