const ExecutiveDark = ({ data = {}, customization = {} }) => {
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

  const primaryColor = customization.primaryColor || '#C9A84C';
  const font = customization.fontFamily || 'Georgia, serif';

  const SectionTitle = ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', marginTop: '1.5rem' }}>
      <span style={{ color: primaryColor, fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{children}</span>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${primaryColor}88, transparent)` }} />
    </div>
  );

  return (
    <div style={{ fontFamily: font, background: '#0F1117', minHeight: '100%', color: '#E2E8F0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Dark Sidebar */}
        <div style={{ width: '220px', background: '#070B12', flexShrink: 0, padding: '2rem 1.25rem', borderRight: `2px solid ${primaryColor}33` }}>
        {p.photoURL ? (
          <img src={p.photoURL} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${primaryColor}`, display: 'block', margin: '0 auto 1rem' }} />
        ) : (
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: `${primaryColor}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '1.75rem', border: `2px solid ${primaryColor}44` }}>👤</div>
        )}

        {/* Contact */}
        <div style={{ marginBottom: '1.5rem' }}>
          {[p.email, p.phone, p.city].filter(Boolean).map(v => (
            <p key={v} style={{ fontSize: '0.73rem', color: '#94A3B8', marginBottom: '0.4rem', wordBreak: 'break-all' }}>{v}</p>
          ))}
          {[p.linkedin && {l: 'LinkedIn', u: p.linkedin}, p.github && {l: 'GitHub', u: p.github}, p.portfolio && {l: 'Portfolio', u: p.portfolio}, p.website && {l: 'Website', u: p.website}].filter(Boolean).map(v => (
            <a href={v.u.startsWith('http') ? v.u : `https://${v.u}`} target="_blank" rel="noreferrer" key={v.l} style={{ fontSize: '0.7rem', color: primaryColor, marginBottom: '0.3rem', display: 'block', textDecoration: 'none' }}>{v.l}</a>
          ))}
        </div>
        
        {(p.dob || p.nationality || p.maritalStatus || p.gender) && (
          <div style={{ marginBottom: '1.5rem', paddingTop: '1rem', borderTop: `1px solid ${primaryColor}22` }}>
            <p style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.15em', color: primaryColor, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Personal</p>
            {[
              p.dob && `DOB: ${p.dob}`,
              p.gender && `Gender: ${p.gender}`,
              p.nationality && `Nationality: ${p.nationality}`,
              p.maritalStatus && `Status: ${p.maritalStatus}`
            ].filter(Boolean).map((v, i) => (
              <p key={i} style={{ fontSize: '0.7rem', color: '#94A3B8', marginBottom: '0.3rem' }}>{v}</p>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.technical && (
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.15em', color: primaryColor, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Technical</p>
            {skills.technical.split(',').map(s => s.trim()).filter(Boolean).map(s => (
              <span key={s} style={{ display: 'inline-block', background: `${primaryColor}22`, border: `1px solid ${primaryColor}44`, borderRadius: '4px', padding: '0.15rem 0.4rem', fontSize: '0.7rem', color: primaryColor, marginRight: '0.3rem', marginBottom: '0.3rem' }}>{s}</span>
            ))}
          </div>
        )}
        {skills.programming && (
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.15em', color: primaryColor, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Programming</p>
            <p style={{ fontSize: '0.7rem', color: '#94A3B8', lineHeight: 1.6 }}>{skills.programming}</p>
          </div>
        )}
        {skills.frameworks && (
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.15em', color: primaryColor, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Frameworks</p>
            <p style={{ fontSize: '0.7rem', color: '#94A3B8', lineHeight: 1.6 }}>{skills.frameworks}</p>
          </div>
        )}
        {skills.databases && (
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.15em', color: primaryColor, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Databases</p>
            <p style={{ fontSize: '0.7rem', color: '#94A3B8', lineHeight: 1.6 }}>{skills.databases}</p>
          </div>
        )}
        {skills.tools && (
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.15em', color: primaryColor, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Tools</p>
            <p style={{ fontSize: '0.7rem', color: '#94A3B8', lineHeight: 1.6 }}>{skills.tools}</p>
          </div>
        )}
        {skills.soft && (
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.15em', color: primaryColor, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Soft Skills</p>
            <p style={{ fontSize: '0.7rem', color: '#94A3B8', lineHeight: 1.6 }}>{skills.soft}</p>
          </div>
        )}

        {certifications.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.15em', color: primaryColor, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Certifications</p>
            {certifications.slice(0, 4).map((c, i) => (
              <div key={i} style={{ marginBottom: '0.4rem' }}>
                <p style={{ fontSize: '0.72rem', color: '#CBD5E1', fontWeight: '500' }}>{c.name}</p>
                {c.issuer && <p style={{ fontSize: '0.67rem', color: '#64748B' }}>{c.issuer} {c.year && `· ${c.year}`}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'white', marginBottom: '0.15rem', letterSpacing: '-0.02em' }}>{p.name || 'Your Name'}</h1>
        <p style={{ color: primaryColor, fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem' }}>{p.title || 'Professional Title'}</p>

        {summary.text && (
          <>
            <SectionTitle>Profile</SectionTitle>
            <p style={{ fontSize: '0.83rem', color: '#94A3B8', lineHeight: 1.8 }}>{summary.text}</p>
          </>
        )}

        {experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '1.25rem', paddingLeft: '0.75rem', borderLeft: `2px solid ${primaryColor}44` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: '700', color: 'white', fontSize: '0.9rem' }}>{exp.title}</p>
                    <p style={{ color: primaryColor, fontSize: '0.8rem', fontWeight: '600' }}>
                      {exp.company}{exp.type ? ` · ${exp.type}` : ''}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', flexShrink: 0 }}>{exp.startDate}{exp.current ? ' – Present' : exp.endDate ? ` – ${exp.endDate}` : ''}</span>
                </div>
                {exp.description && <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '0.4rem', lineHeight: 1.7 }}>{exp.description}</p>}
              </div>
            ))}
          </>
        )}

        {education.length > 0 && (
          <>
            <SectionTitle>Education</SectionTitle>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ fontWeight: '700', color: 'white', fontSize: '0.875rem' }}>{edu.degree} {edu.field && `in ${edu.field}`}</p>
                  <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{edu.year}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{edu.institution}{edu.level ? ` (${edu.level})` : ''} {edu.grade && `· ${edu.grade}`}</p>
              </div>
            ))}
          </>
        )}

        {projects.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            {projects.slice(0, 3).map((proj, i) => (
              <div key={i} style={{ marginBottom: '0.75rem' }}>
                <p style={{ fontWeight: '700', color: 'white', fontSize: '0.875rem' }}>{proj.name}</p>
                {proj.tech && <p style={{ fontSize: '0.72rem', color: primaryColor, marginBottom: '0.2rem' }}>{proj.tech}</p>}
                {(proj.duration || proj.url) && (
                  <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '0.3rem' }}>
                    {proj.duration && <span>{proj.duration}</span>}
                    {proj.duration && proj.url && <span> · </span>}
                    {proj.url && <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" style={{ color: primaryColor, textDecoration: 'none' }}>{proj.url}</a>}
                  </div>
                )}
                {proj.description && <p style={{ fontSize: '0.78rem', color: '#94A3B8', lineHeight: 1.6 }}>{proj.description}</p>}
              </div>
            ))}
          </>
        )}

        {(additional.achievements || additional.publications || additional.patents || additional.languages || additional.workshops || additional.hobbies) && (
          <>
            <SectionTitle>Additional Information</SectionTitle>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', lineHeight: 1.7 }}>
              {additional.achievements && <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Achievements:</strong> {additional.achievements}</div>}
              {additional.publications && <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Publications:</strong> {additional.publications}</div>}
              {additional.patents && <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Patents:</strong> {additional.patents}</div>}
              {additional.languages && <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Languages:</strong> {additional.languages}</div>}
              {additional.workshops && <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Workshops:</strong> {additional.workshops}</div>}
              {additional.strengths && <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Strengths:</strong> {additional.strengths}</div>}
              {additional.hobbies && <div style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'white' }}>Hobbies:</strong> {additional.hobbies}</div>}
            </div>
          </>
        )}

      </div>
      </div>

      {/* Footer Place */}
      {(references.length > 0 || declaration.text) && (
        <div style={{ padding: '2rem 2.75rem', background: '#0B0D14', borderTop: `1px solid ${primaryColor}33`, pageBreakInside: 'avoid' }}>
          {references.length > 0 && (
            <div style={{ marginBottom: declaration.text ? '2rem' : '0' }}>
              <SectionTitle>References</SectionTitle>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                {references.map((ref, i) => (
                  <div key={i} style={{ minWidth: '200px', padding: '0.75rem', background: '#ffffff08', borderRadius: '6px', border: '1px solid #ffffff11' }}>
                    <p style={{ fontWeight: '700', color: primaryColor, fontSize: '0.85rem' }}>{ref.name}</p>
                    <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: '0.2rem 0' }}>{ref.position}</p>
                    <p style={{ fontSize: '0.72rem', color: 'white', fontWeight: '500' }}>{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {declaration.text && (
            <div style={{ paddingTop: references.length > 0 ? '1.5rem' : '0', borderTop: references.length > 0 ? '1px dashed #ffffff22' : 'none' }}>
              <p style={{ fontSize: '0.8rem', color: '#64748B', fontStyle: 'italic', marginBottom: '2rem' }}>"{declaration.text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                  {declaration.place && <p style={{ margin: '0 0 0.5rem' }}><strong>Place:</strong> {declaration.place}</p>}
                  <p style={{ margin: 0 }}><strong>Date:</strong> _________________</p>
                </div>
                {declaration.signature && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ borderBottom: '1px solid #94A3B8', width: '150px', marginBottom: '0.5rem' }}></div>
                    <p style={{ fontSize: '0.85rem', color: 'white', margin: 0, fontWeight: '700' }}>{declaration.signature}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExecutiveDark;
