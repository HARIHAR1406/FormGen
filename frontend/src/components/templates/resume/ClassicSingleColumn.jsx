/* Classic Single-Column ATS-Friendly Resume */
const ClassicSingleColumn = ({ data = {}, customization = {} }) => {
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

  const primary = customization?.primaryColor || '#0284C7';
  const text = customization?.textColor || '#111827';

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ borderBottom: `2px solid ${primary}`, paddingBottom: '4px', marginBottom: '10px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );

  const formatMonth = (monthStr) => {
    if (!monthStr) return '';
    const [y, m] = monthStr.split('-');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${months[parseInt(m)-1] || ''} ${y}`;
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '297mm', padding: '36px 44px', fontFamily: customization?.fontFamily || "'Inter', sans-serif", color: text, fontSize: '13px' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: `1px solid #E5E7EB` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: text, margin: '0 0 4px', letterSpacing: '-0.5px' }}>
              {p.name || 'Your Name'}
            </h1>
            {p.title && <p style={{ fontSize: '14px', color: primary, fontWeight: '600', margin: '0 0 8px' }}>{p.title}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {p.phone && <span style={{ fontSize: '12px', color: '#555' }}>📞 {p.phone}</span>}
              {p.email && <span style={{ fontSize: '12px', color: '#555' }}>✉️ {p.email}</span>}
              {p.city && <span style={{ fontSize: '12px', color: '#555' }}>📍 {p.city}</span>}
              {p.linkedin && <a href={p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: primary, textDecoration: 'none' }}>LinkedIn</a>}
              {p.github && <a href={p.github.startsWith('http') ? p.github : `https://${p.github}`} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: primary, textDecoration: 'none' }}>GitHub</a>}
              {p.portfolio && <a href={p.portfolio.startsWith('http') ? p.portfolio : `https://${p.portfolio}`} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: primary, textDecoration: 'none' }}>Portfolio</a>}
              {p.website && <a href={p.website.startsWith('http') ? p.website : `https://${p.website}`} target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: primary, textDecoration: 'none' }}>Website</a>}
            </div>
            {/* Extended personal details if provided */}
            {(p.dob || p.nationality || p.maritalStatus) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '6px' }}>
                {p.dob && <span style={{ fontSize: '11px', color: '#777' }}>DOB: {p.dob}</span>}
                {p.gender && <span style={{ fontSize: '11px', color: '#777' }}>Gender: {p.gender}</span>}
                {p.nationality && <span style={{ fontSize: '11px', color: '#777' }}>Nationality: {p.nationality}</span>}
                {p.maritalStatus && <span style={{ fontSize: '11px', color: '#777' }}>Marital Status: {p.maritalStatus}</span>}
              </div>
            )}
          </div>
          {p.photoURL && (
            <img src={p.photoURL} alt="Profile" style={{
              width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover',
              border: `2px solid ${primary}30`
            }} />
          )}
        </div>
      </div>

      {/* Summary */}
      {summary.text && (
        <Section title="Professional Summary">
          <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.8, margin: 0 }}>{summary.text}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Work Experience">
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: text, margin: '0 0 1px' }}>{exp.title}</h4>
                  <p style={{ fontSize: '12px', color: primary, fontWeight: '600', margin: 0 }}>
                    {exp.company}{exp.type ? ` · ${exp.type}` : ''}
                  </p>
                </div>
                <span style={{ fontSize: '11px', color: '#888', flexShrink: 0, marginLeft: '8px', fontStyle: 'italic' }}>
                  {formatMonth(exp.startDate)} – {exp.current ? 'Present' : formatMonth(exp.endDate)}
                </span>
              </div>
              {exp.description && (
                <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.7, margin: '5px 0 0', whiteSpace: 'pre-line' }}>{exp.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: text, margin: '0 0 1px' }}>
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                </h4>
                <p style={{ fontSize: '12px', color: '#555', margin: '0 0 1px' }}>
                  {edu.institution}{edu.level ? ` (${edu.level})` : ''}
                </p>
                {edu.grade && <p style={{ fontSize: '11px', color: '#777', margin: 0 }}>Grade: {edu.grade}</p>}
              </div>
              {edu.year && <span style={{ fontSize: '11px', color: '#888', flexShrink: 0 }}>{edu.year}</span>}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {(skills.technical || skills.soft || skills.programming || skills.frameworks || skills.databases || skills.tools) && (
        <Section title="Skills">
          {skills.technical && (
            <div style={{ marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: text }}>Technical: </span>
              <span style={{ fontSize: '12px', color: '#555' }}>{skills.technical}</span>
            </div>
          )}
          {skills.soft && (
            <div style={{ marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: text }}>Soft Skills: </span>
              <span style={{ fontSize: '12px', color: '#555' }}>{skills.soft}</span>
            </div>
          )}
          {skills.programming && (
            <div style={{ marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: text }}>Programming: </span>
              <span style={{ fontSize: '12px', color: '#555' }}>{skills.programming}</span>
            </div>
          )}
          {skills.frameworks && (
            <div style={{ marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: text }}>Frameworks: </span>
              <span style={{ fontSize: '12px', color: '#555' }}>{skills.frameworks}</span>
            </div>
          )}
          {skills.databases && (
            <div style={{ marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: text }}>Databases: </span>
              <span style={{ fontSize: '12px', color: '#555' }}>{skills.databases}</span>
            </div>
          )}
          {skills.tools && (
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: text }}>Tools: </span>
              <span style={{ fontSize: '12px', color: '#555' }}>{skills.tools}</span>
            </div>
          )}
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: text, margin: 0 }}>{proj.name}</h4>
                {proj.tech && <span style={{ fontSize: '11px', color: '#777' }}>| {proj.tech}</span>}
              </div>
              {(proj.duration || proj.url) && (
                <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                  {proj.duration && <span>{proj.duration}</span>}
                  {proj.duration && proj.url && <span> · </span>}
                  {proj.url && <a href={proj.url.startsWith('http') ? proj.url : `https://${proj.url}`} target="_blank" rel="noreferrer" style={{ color: primary, textDecoration: 'none' }}>{proj.url}</a>}
                </div>
              )}
              {proj.description && <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.7, margin: '3px 0 0' }}>{proj.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <Section title="Certifications">
          {certifications.map((c) => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '12px', color: text, fontWeight: '500' }}>{c.name}</span>
              <span style={{ fontSize: '11px', color: '#888' }}>{c.issuer}{c.year ? ` · ${c.year}` : ''}</span>
            </div>
          ))}
        </Section>
      )}

      {/* Additional Info */}
      {additional.achievements && (
        <Section title="Achievements">
          <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{additional.achievements}</p>
        </Section>
      )}

      {additional.publications && (
        <Section title="Publications">
          <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{additional.publications}</p>
        </Section>
      )}

      {additional.patents && (
        <Section title="Patents">
          <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.8, whiteSpace: 'pre-line', margin: 0 }}>{additional.patents}</p>
        </Section>
      )}

      {additional.languages && (
        <Section title="Languages">
          <p style={{ fontSize: '12px', color: '#555', margin: 0 }}>{additional.languages}</p>
        </Section>
      )}

      {(additional.workshops || additional.hobbies || additional.strengths) && (
        <Section title="More Information">
          <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.8 }}>
            {additional.workshops && <p style={{ margin: '0 0 4px' }}><strong>Workshops/Conferences:</strong> {additional.workshops}</p>}
            {additional.strengths && <p style={{ margin: '0 0 4px' }}><strong>Strengths:</strong> {additional.strengths}</p>}
            {additional.hobbies && <p style={{ margin: 0 }}><strong>Hobbies:</strong> {additional.hobbies}</p>}
          </div>
        </Section>
      )}

      {/* References */}
      {references.length > 0 && (
        <Section title="References">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {references.map(ref => (
              <div key={ref.id}>
                <p style={{ fontSize: '12px', fontWeight: '700', color: text, margin: '0 0 1px' }}>{ref.name}</p>
                <p style={{ fontSize: '11px', color: '#666', margin: '0 0 1px' }}>{ref.position}</p>
                <p style={{ fontSize: '11px', color: primary, margin: 0 }}>{ref.contact}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Declaration */}
      {declaration.text && (
        <div style={{ marginTop: '30px', borderTop: `1px solid ${primary}30`, paddingTop: '20px', pageBreakInside: 'avoid' }}>
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
  );
};

export default ClassicSingleColumn;
