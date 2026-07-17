/* Modern Two-Column Resume Template */
const ModernTwoColumn = ({ data = {}, customization = {} }) => {
  const p = data?.personal || {};
  const summary = data?.summary || {};
  const experience = Array.isArray(data?.experience) ? data.experience : data?.experience?._list || [];
  const education = Array.isArray(data?.education) ? data.education : data?.education?._list || [];
  const skills = data?.skills || {};
  const projects = Array.isArray(data?.projects) ? data.projects : data?.projects?._list || [];
  const certifications = Array.isArray(data?.certifications) ? data.certifications : data?.certifications?._list || [];
  const additional = data?.additional || {};
  const declaration = data?.declaration || {};
  const references = Array.isArray(data?.references) ? data.references : data?.references?._list || [];

  const primary = customization?.primaryColor || '#7C3AED';
  const bg = customization?.bgColor || '#FFFFFF';
  const text = customization?.textColor || '#1A1A2E';

  const sidebarBg = `${primary}10`;

  const SideSection = ({ title, children }) => (
    <div style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '11px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 10px', paddingBottom: '6px', borderBottom: `1px solid ${primary}30` }}>
        {title}
      </h3>
      {children}
    </div>
  );

  const MainSection = ({ title, children }) => (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div style={{ width: '3px', height: '16px', background: primary, borderRadius: '2px' }} />
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: text, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>{title}</h3>
        <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
      </div>
      {children}
    </div>
  );

  const SkillBar = ({ skill, level = 80 }) => (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
        <span style={{ fontSize: '11px', color: '#444' }}>{skill}</span>
      </div>
      <div style={{ height: '4px', background: `${primary}20`, borderRadius: '2px' }}>
        <div style={{ height: '100%', width: `${level}%`, background: primary, borderRadius: '2px' }} />
      </div>
    </div>
  );

  const formatMonth = (monthStr) => {
    if (!monthStr) return '';
    const [y, m] = monthStr.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m)-1] || ''} ${y}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '297mm', background: bg, fontFamily: customization?.fontFamily || "'Inter', sans-serif", color: text }}>
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
      <div style={{ width: '220px', background: sidebarBg, padding: '30px 20px', flexShrink: 0 }}>
        {/* Photo */}
        {p.photoURL ? (
          <img src={p.photoURL} alt="Profile" style={{
            width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover',
            display: 'block', margin: '0 auto 16px', border: `3px solid ${primary}`
          }} />
        ) : null}

        {/* Name (sidebar) */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '17px', fontWeight: '800', color: text, margin: '0 0 3px', lineHeight: 1.2 }}>{p.name || 'Your Name'}</h1>
          <p style={{ fontSize: '12px', color: primary, fontWeight: '600', margin: 0 }}>{p.title || 'Professional Title'}</p>
        </div>

        {/* Contact */}
        <SideSection title="Contact">
          {p.phone && <p style={{ fontSize: '11px', color: '#555', marginBottom: '5px', display: 'flex', gap: '5px' }}>📞 {p.phone}</p>}
          {p.email && <p style={{ fontSize: '11px', color: '#555', marginBottom: '5px', wordBreak: 'break-all', display: 'flex', gap: '5px' }}>✉️ {p.email}</p>}
          {p.city && <p style={{ fontSize: '11px', color: '#555', marginBottom: '5px' }}>📍 {p.city}</p>}
          {p.linkedin && <p style={{ fontSize: '11px', marginBottom: '3px' }}>🔗 <a href={p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`} target="_blank" rel="noreferrer" style={{color: primary, textDecoration: 'none'}}>LinkedIn</a></p>}
          {p.github && <p style={{ fontSize: '11px', marginBottom: '3px' }}>🐙 <a href={p.github.startsWith('http') ? p.github : `https://${p.github}`} target="_blank" rel="noreferrer" style={{color: primary, textDecoration: 'none'}}>GitHub</a></p>}
          {p.portfolio && <p style={{ fontSize: '11px', marginBottom: '3px' }}>🌐 <a href={p.portfolio.startsWith('http') ? p.portfolio : `https://${p.portfolio}`} target="_blank" rel="noreferrer" style={{color: primary, textDecoration: 'none'}}>Portfolio</a></p>}
          {p.website && <p style={{ fontSize: '11px', marginBottom: '3px' }}>🌐 <a href={p.website.startsWith('http') ? p.website : `https://${p.website}`} target="_blank" rel="noreferrer" style={{color: primary, textDecoration: 'none'}}>Website</a></p>}
        </SideSection>

        {/* Personal Details (if any) */}
        {(p.dob || p.nationality || p.maritalStatus || p.gender) && (
          <SideSection title="Personal">
            {p.dob && <p style={{ fontSize: '11px', color: '#555', marginBottom: '3px' }}><strong>DOB:</strong> {p.dob}</p>}
            {p.gender && <p style={{ fontSize: '11px', color: '#555', marginBottom: '3px' }}><strong>Gender:</strong> {p.gender}</p>}
            {p.nationality && <p style={{ fontSize: '11px', color: '#555', marginBottom: '3px' }}><strong>Nationality:</strong> {p.nationality}</p>}
            {p.maritalStatus && <p style={{ fontSize: '11px', color: '#555', marginBottom: '3px' }}><strong>Status:</strong> {p.maritalStatus}</p>}
          </SideSection>
        )}

        {/* Skills */}
        {skills.technical && (
          <SideSection title="Technical Skills">
            {skills.technical.split(',').map(s => (
              <div key={s} style={{ fontSize: '11px', color: '#444', padding: '3px 8px', background: `${primary}15`, borderRadius: '99px', marginBottom: '4px', display: 'inline-block', marginRight: '4px' }}>
                {s.trim()}
              </div>
            ))}
          </SideSection>
        )}

        {skills.programming && (
          <SideSection title="Programming">
            {skills.programming.split(',').map(s => (
              <div key={s} style={{ fontSize: '11px', color: '#444', padding: '3px 8px', background: `${primary}15`, borderRadius: '99px', marginBottom: '4px', display: 'inline-block', marginRight: '4px' }}>
                {s.trim()}
              </div>
            ))}
          </SideSection>
        )}

        {skills.frameworks && (
          <SideSection title="Frameworks">
            {skills.frameworks.split(',').map(s => (
              <div key={s} style={{ fontSize: '11px', color: '#444', padding: '3px 8px', background: '#F3F4F6', borderRadius: '99px', marginBottom: '4px', display: 'inline-block', marginRight: '4px' }}>
                {s.trim()}
              </div>
            ))}
          </SideSection>
        )}

        {skills.databases && (
          <SideSection title="Databases">
            {skills.databases.split(',').map(s => (
              <div key={s} style={{ fontSize: '11px', color: '#444', padding: '3px 8px', background: `${primary}15`, borderRadius: '99px', marginBottom: '4px', display: 'inline-block', marginRight: '4px' }}>
                {s.trim()}
              </div>
            ))}
          </SideSection>
        )}

        {skills.tools && (
          <SideSection title="Tools">
            {skills.tools.split(',').map(s => (
              <div key={s} style={{ fontSize: '11px', color: '#444', padding: '3px 8px', background: '#F3F4F6', borderRadius: '99px', marginBottom: '4px', display: 'inline-block', marginRight: '4px' }}>
                {s.trim()}
              </div>
            ))}
          </SideSection>
        )}

        {/* Languages */}
        {additional.languages && (
          <SideSection title="Languages">
            {additional.languages.split(',').map(l => (
              <p key={l} style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>• {l.trim()}</p>
            ))}
          </SideSection>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <SideSection title="Certifications">
            {certifications.map(c => (
              <div key={c.id} style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '11px', fontWeight: '600', color: '#333', margin: '0 0 1px' }}>{c.name}</p>
                <p style={{ fontSize: '10px', color: '#777', margin: 0 }}>{c.issuer} {c.year && `· ${c.year}`}</p>
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px 28px' }}>
        {/* Summary */}
        {summary.text && (
          <MainSection title="Professional Summary">
            <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.8, margin: 0 }}>{summary.text}</p>
          </MainSection>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <MainSection title="Work Experience">
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '16px', paddingLeft: '12px', borderLeft: `2px solid ${primary}30` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: text, margin: 0 }}>{exp.title}</h4>
                  <span style={{ fontSize: '11px', color: '#888', flexShrink: 0, marginLeft: '8px' }}>
                    {formatMonth(exp.startDate)} – {exp.current ? 'Present' : formatMonth(exp.endDate)}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: primary, fontWeight: '600', margin: '0 0 4px' }}>
                  {exp.company}{exp.type ? ` · ${exp.type}` : ''}
                </p>
                {exp.description && <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.7, margin: 0 }}>{exp.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {/* Education */}
        {education.length > 0 && (
          <MainSection title="Education">
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: text, margin: '0 0 1px' }}>{edu.degree} {edu.field && `in ${edu.field}`}</h4>
                  <p style={{ fontSize: '12px', color: '#666', margin: '0 0 1px' }}>{edu.institution}{edu.level ? ` (${edu.level})` : ''}</p>
                  {edu.grade && <p style={{ fontSize: '11px', color: primary, margin: 0 }}>Grade: {edu.grade}</p>}
                </div>
                {edu.year && <span style={{ fontSize: '11px', color: '#888', flexShrink: 0 }}>{edu.year}</span>}
              </div>
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <MainSection title="Projects">
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: text, margin: 0 }}>{proj.name}</h4>
                  {proj.tech && <span style={{ fontSize: '10px', color: primary, background: `${primary}15`, padding: '1px 6px', borderRadius: '99px' }}>{proj.tech}</span>}
                </div>
                {(proj.duration || proj.url) && (
                  <div style={{ fontSize: '11px', color: '#888', marginBottom: '2px' }}>
                    {proj.duration && <span>{proj.duration}</span>}
                    {proj.duration && proj.url && <span> · </span>}
                    {proj.url && <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" style={{ color: primary, textDecoration: 'none' }}>{proj.url}</a>}
                  </div>
                )}
                {proj.description && <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.7, margin: '0 0 2px' }}>{proj.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {/* Soft Skills */}
        {skills.soft && (
          <MainSection title="Soft Skills">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.soft.split(',').map(s => (
                <span key={s} style={{ fontSize: '11px', color: '#444', padding: '3px 10px', border: `1px solid ${primary}40`, borderRadius: '99px' }}>{s.trim()}</span>
              ))}
            </div>
          </MainSection>
        )}

        {/* Achievements & Additional Info */}
        {additional.achievements && (
          <MainSection title="Achievements">
            <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{additional.achievements}</p>
          </MainSection>
        )}

        {additional.publications && (
          <MainSection title="Publications">
            <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{additional.publications}</p>
          </MainSection>
        )}

        {additional.patents && (
          <MainSection title="Patents">
            <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{additional.patents}</p>
          </MainSection>
        )}

        {(additional.workshops || additional.hobbies || additional.strengths) && (
          <MainSection title="More Information">
            <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.8 }}>
              {additional.workshops && <p style={{ margin: '0 0 4px' }}><strong>Workshops/Conferences:</strong> {additional.workshops}</p>}
              {additional.strengths && <p style={{ margin: '0 0 4px' }}><strong>Strengths:</strong> {additional.strengths}</p>}
              {additional.hobbies && <p style={{ margin: 0 }}><strong>Hobbies:</strong> {additional.hobbies}</p>}
            </div>
          </MainSection>
        )}

      </div>
      </div>

      {/* Footer */}
      {(references.length > 0 || declaration.text) && (
        <div style={{ padding: '20px 28px', background: bg, borderTop: `1px solid ${primary}30`, pageBreakInside: 'avoid' }}>
          {references.length > 0 && (
            <div style={{ marginBottom: declaration.text ? '20px' : '0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{ width: '3px', height: '16px', background: primary, borderRadius: '2px' }} />
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: text, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>References</h3>
                <div style={{ flex: 1, height: '1px', background: '#E5E7EB' }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {references.map(ref => (
                  <div key={ref.id || ref.name} style={{ minWidth: '200px' }}>
                    <p style={{ fontSize: '12px', fontWeight: '700', color: text, margin: '0 0 1px' }}>{ref.name}</p>
                    <p style={{ fontSize: '11px', color: '#666', margin: '0 0 1px' }}>{ref.position}</p>
                    <p style={{ fontSize: '11px', color: primary, margin: 0 }}>{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {declaration.text && (
            <div style={{ paddingTop: references.length > 0 ? '20px' : '0', borderTop: references.length > 0 ? `1px dashed ${primary}30` : 'none' }}>
              <p style={{ fontSize: '11px', color: '#666', fontStyle: 'italic', marginBottom: '24px' }}>"{declaration.text}"</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '11px', color: text }}>
                  {declaration.place && <p style={{ margin: '0 0 6px' }}><strong>Place:</strong> {declaration.place}</p>}
                  <p style={{ margin: 0 }}><strong>Date:</strong> _________________</p>
                </div>
                {declaration.signature && (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ borderBottom: '1px solid #333', width: '150px', marginBottom: '6px' }}></div>
                    <p style={{ fontSize: '11px', color: text, margin: 0, fontWeight: '600' }}>{declaration.signature}</p>
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

export default ModernTwoColumn;
