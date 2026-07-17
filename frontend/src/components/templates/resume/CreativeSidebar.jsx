/* Creative Sidebar Resume Template */
const CreativeSidebar = ({ data = {}, customization = {} }) => {
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

  const primary = customization?.primaryColor || '#8B5CF6';
  const secondary = customization?.secondaryColor || '#EC4899';
  const text = customization?.textColor || '#111827';

  const formatMonth = (monthStr) => {
    if (!monthStr) return '';
    const [y, m] = monthStr.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m)-1] || ''} ${y}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '297mm', fontFamily: customization?.fontFamily || "'Inter', sans-serif", background: '#FFFFFF' }}>
      <div style={{ display: 'flex', flex: 1 }}>
      {/* Colorful Sidebar */}
      <div style={{
        width: '230px', flexShrink: 0,
        background: `linear-gradient(160deg, ${primary} 0%, ${secondary} 100%)`,
        padding: '32px 20px', color: 'white'
      }}>
        {/* Photo */}
        {p.photoURL ? (
          <img src={p.photoURL} alt="Profile" style={{
            width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover',
            display: 'block', margin: '0 auto 16px',
            border: '3px solid rgba(255,255,255,0.5)'
          }} />
        ) : (
          <div style={{
            width: '110px', height: '110px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', border: '3px solid rgba(255,255,255,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: '40px'
          }}>👤</div>
        )}

        <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
          <h1 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 4px', lineHeight: 1.2 }}>{p.name || 'Your Name'}</h1>
          <p style={{ fontSize: '12px', opacity: 0.85, margin: 0 }}>{p.title || ''}</p>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', opacity: 0.7 }}>Contact</h3>
          {p.phone && <p style={{ fontSize: '11px', marginBottom: '6px', opacity: 0.9 }}>📞 {p.phone}</p>}
          {p.email && <p style={{ fontSize: '11px', marginBottom: '6px', opacity: 0.9, wordBreak: 'break-all' }}>✉️ {p.email}</p>}
          {p.city && <p style={{ fontSize: '11px', marginBottom: '6px', opacity: 0.9 }}>📍 {p.city}</p>}
          {p.linkedin && <p style={{ fontSize: '11px', marginBottom: '3px', opacity: 0.9 }}>🔗 <a href={p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`} target="_blank" rel="noreferrer" style={{color: 'white', textDecoration: 'none'}}>LinkedIn</a></p>}
          {p.github && <p style={{ fontSize: '11px', marginBottom: '3px', opacity: 0.9 }}>🐙 <a href={p.github.startsWith('http') ? p.github : `https://${p.github}`} target="_blank" rel="noreferrer" style={{color: 'white', textDecoration: 'none'}}>GitHub</a></p>}
          {p.portfolio && <p style={{ fontSize: '11px', opacity: 0.9, marginBottom: '3px' }}>🌐 <a href={p.portfolio.startsWith('http') ? p.portfolio : `https://${p.portfolio}`} target="_blank" rel="noreferrer" style={{color: 'white', textDecoration: 'none'}}>Portfolio</a></p>}
          {p.website && <p style={{ fontSize: '11px', opacity: 0.9 }}>🌐 <a href={p.website.startsWith('http') ? p.website : `https://${p.website}`} target="_blank" rel="noreferrer" style={{color: 'white', textDecoration: 'none'}}>Website</a></p>}
        </div>

        {/* Personal Details */}
        {(p.dob || p.nationality || p.maritalStatus || p.gender) && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', opacity: 0.7 }}>Personal</h3>
            {p.dob && <p style={{ fontSize: '11px', marginBottom: '4px', opacity: 0.9 }}>DOB: {p.dob}</p>}
            {p.gender && <p style={{ fontSize: '11px', marginBottom: '4px', opacity: 0.9 }}>Gender: {p.gender}</p>}
            {p.nationality && <p style={{ fontSize: '11px', marginBottom: '4px', opacity: 0.9 }}>Nationality: {p.nationality}</p>}
            {p.maritalStatus && <p style={{ fontSize: '11px', opacity: 0.9 }}>Status: {p.maritalStatus}</p>}
          </div>
        )}

        {/* Skills */}
        {skills.technical && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', opacity: 0.7 }}>Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.technical.split(',').map(s => (
                <span key={s} style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(255,255,255,0.2)', borderRadius: '99px' }}>
                  {s.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {skills.programming && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', opacity: 0.7 }}>Programming</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.programming.split(',').map(s => (
                <span key={s} style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(255,255,255,0.2)', borderRadius: '99px' }}>
                  {s.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {skills.frameworks && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', opacity: 0.7 }}>Frameworks</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.frameworks.split(',').map(s => (
                <span key={s} style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(255,255,255,0.2)', borderRadius: '99px' }}>
                  {s.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {skills.databases && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', opacity: 0.7 }}>Databases</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.databases.split(',').map(s => (
                <span key={s} style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(255,255,255,0.2)', borderRadius: '99px' }}>
                  {s.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {skills.tools && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', opacity: 0.7 }}>Tools</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.tools.split(',').map(s => (
                <span key={s} style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(255,255,255,0.2)', borderRadius: '99px' }}>
                  {s.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {additional.languages && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', opacity: 0.7 }}>Languages</h3>
            {additional.languages.split(',').map(l => (
              <p key={l} style={{ fontSize: '11px', opacity: 0.9, marginBottom: '4px' }}>• {l.trim()}</p>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h3 style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', opacity: 0.7 }}>Certifications</h3>
            {certifications.map(c => (
              <div key={c.id} style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '11px', fontWeight: '600', margin: '0 0 1px' }}>{c.name}</p>
                <p style={{ fontSize: '10px', opacity: 0.7, margin: 0 }}>{c.issuer} {c.year && `· ${c.year}`}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px 28px', background: '#FFFFFF', color: text }}>
        {/* Summary */}
        {summary.text && (
          <div style={{ marginBottom: '20px', padding: '16px', background: `${primary}08`, borderRadius: '8px', borderLeft: `4px solid ${primary}` }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px' }}>Summary</h3>
            <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.8, margin: 0 }}>{summary.text}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px', paddingBottom: '6px', borderBottom: `2px solid ${primary}` }}>
              Experience
            </h3>
            {experience.map((exp, i) => (
              <div key={exp.id} style={{ marginBottom: '14px', display: 'flex', gap: '12px' }}>
                <div style={{ paddingTop: '4px', flexShrink: 0 }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: primary, marginTop: '2px' }} />
                  {i < experience.length - 1 && <div style={{ width: '2px', background: `${primary}30`, height: '100%', margin: '4px auto 0' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: '700', color: text, margin: '0 0 1px' }}>{exp.title}</h4>
                    <span style={{ fontSize: '11px', color: '#888' }}>{formatMonth(exp.startDate)} – {exp.current ? 'Present' : formatMonth(exp.endDate)}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: secondary, fontWeight: '600', margin: '0 0 4px' }}>
                    {exp.company}{exp.type ? ` · ${exp.type}` : ''}
                  </p>
                  {exp.description && <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.7, margin: 0 }}>{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px', paddingBottom: '6px', borderBottom: `2px solid ${primary}` }}>Education</h3>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: text, margin: '0 0 1px' }}>
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </h4>
                  <p style={{ fontSize: '12px', color: '#666', margin: '0 0 1px' }}>{edu.institution}{edu.level ? ` (${edu.level})` : ''}</p>
                  {edu.grade && <span style={{ fontSize: '11px', color: secondary, fontWeight: '600' }}>{edu.grade}</span>}
                </div>
                {edu.year && <span style={{ fontSize: '11px', color: '#888' }}>{edu.year}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px', paddingBottom: '6px', borderBottom: `2px solid ${primary}` }}>Projects</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {projects.map((proj) => (
                <div key={proj.id} style={{ padding: '10px', background: `${primary}06`, borderRadius: '6px', border: `1px solid ${primary}20` }}>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: text, margin: '0 0 2px' }}>{proj.name}</p>
                  {proj.tech && <p style={{ fontSize: '10px', color: secondary, margin: '0 0 4px' }}>{proj.tech}</p>}
                  {(proj.duration || proj.url) && (
                    <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>
                      {proj.duration && <span>{proj.duration}</span>}
                      {proj.duration && proj.url && <span> · </span>}
                      {proj.url && <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" style={{ color: primary, textDecoration: 'none' }}>{proj.url}</a>}
                    </div>
                  )}
                  {proj.description && <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.6, margin: 0 }}>{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {skills.soft && (
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Soft Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.soft.split(',').map(s => (
                <span key={s} style={{ fontSize: '11px', padding: '3px 10px', border: `1px solid ${primary}40`, borderRadius: '99px', color: '#555' }}>{s.trim()}</span>
              ))}
            </div>
          </div>
        )}

        {additional.achievements && (
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Achievements</h3>
            <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{additional.achievements}</p>
          </div>
        )}

        {additional.publications && (
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Publications</h3>
            <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{additional.publications}</p>
          </div>
        )}

        {additional.patents && (
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Patents</h3>
            <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{additional.patents}</p>
          </div>
        )}

        {(additional.workshops || additional.hobbies || additional.strengths) && (
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>More Information</h3>
            <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.8 }}>
              {additional.workshops && <p style={{ margin: '0 0 4px' }}><strong>Workshops:</strong> {additional.workshops}</p>}
              {additional.strengths && <p style={{ margin: '0 0 4px' }}><strong>Strengths:</strong> {additional.strengths}</p>}
              {additional.hobbies && <p style={{ margin: 0 }}><strong>Hobbies:</strong> {additional.hobbies}</p>}
            </div>
          </div>
        )}

      </div>
      </div>

      {/* Footer Place */}
      {(references.length > 0 || declaration.text) && (
        <div style={{ padding: '20px 28px', background: '#FFFFFF', borderTop: `1px solid #E5E7EB`, pageBreakInside: 'avoid', color: text }}>
          {references.length > 0 && (
            <div style={{ marginBottom: declaration.text ? '20px' : '0' }}>
              <h3 style={{ fontSize: '12px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px' }}>References</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {references.map(ref => (
                  <div key={ref.id || ref.name} style={{ minWidth: '200px' }}>
                    <p style={{ fontSize: '12px', fontWeight: '700', color: text, margin: '0 0 1px' }}>{ref.name}</p>
                    <p style={{ fontSize: '11px', color: '#666', margin: '0 0 1px' }}>{ref.position}</p>
                    <p style={{ fontSize: '11px', color: secondary, margin: 0 }}>{ref.contact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {declaration.text && (
            <div style={{ paddingTop: references.length > 0 ? '16px' : '0', borderTop: references.length > 0 ? `1px dashed #E5E7EB` : 'none' }}>
              <p style={{ fontSize: '11px', color: '#666', fontStyle: 'italic', marginBottom: '20px' }}>"{declaration.text}"</p>
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

export default CreativeSidebar;
