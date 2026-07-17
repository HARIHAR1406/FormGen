/* Modern Minimal Biodata Template — Clean Professional */
const ModernMinimal = ({ data = {}, customization = {} }) => {
  const p = data?.personal || {};
  const contact = data?.contact || {};
  const family = data?.family || {};
  const education = data?.education || {};
  const career = data?.career || {};
  const religious = data?.religious || {};
  const lifestyle = data?.lifestyle || {};
  const preferences = data?.preferences || {};
  const additional = data?.additional || {};

  const primary = customization?.primaryColor || '#7C3AED';
  const bg = customization?.bgColor || '#FFFFFF';
  const text = customization?.textColor || '#1A1A2E';

  const Tag = ({ children }) => (
    <span style={{
      display: 'inline-block', padding: '3px 10px',
      background: `${primary}15`, color: primary,
      borderRadius: '99px', fontSize: '11px', fontWeight: '600',
      border: `1px solid ${primary}30`, marginRight: '6px', marginBottom: '4px'
    }}>{children}</span>
  );

  const InfoRow = ({ label, value }) => value ? (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
      <span style={{ fontSize: '11px', color: '#888', minWidth: '120px', flexShrink: 0, textTransform: 'uppercase', letterSpacing: '0.5px', paddingTop: '1px' }}>{label}</span>
      <span style={{ fontSize: '13px', color: text, fontWeight: '500' }}>{value}</span>
    </div>
  ) : null;

  const SectionTitle = ({ title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0 10px' }}>
      <div style={{ width: '4px', height: '16px', background: primary, borderRadius: '2px' }} />
      <h3 style={{ fontSize: '12px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1.5px', margin: 0 }}>{title}</h3>
    </div>
  );

  return (
    <div style={{ fontFamily: customization?.fontFamily || "'Inter', sans-serif", background: bg, color: text, minHeight: '297mm' }}>
      {/* Sidebar + Main layout */}
      <div style={{ display: 'flex', minHeight: '297mm' }}>
        {/* Left Sidebar */}
        <div style={{ width: '220px', background: `${primary}08`, borderRight: `1px solid ${primary}20`, padding: '32px 20px', flexShrink: 0 }}>
          {/* Photo */}
          {p.photoURL ? (
            <img src={p.photoURL} alt="Profile" style={{
              width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover',
              display: 'block', margin: '0 auto 20px',
              border: `3px solid ${primary}`, boxShadow: `0 4px 15px ${primary}30`
            }} />
          ) : (
            <div style={{
              width: '130px', height: '130px', borderRadius: '50%',
              background: `${primary}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px', border: `3px solid ${primary}40`, fontSize: '40px'
            }}>👤</div>
          )}

          {/* Name on mobile */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <p style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px' }}>Marriage Biodata</p>
          </div>

          {/* Contact Block */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '10px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Contact</p>
            {contact.phone && <p style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>📞 {contact.phone}</p>}
            {contact.whatsapp && <p style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>💬 {contact.whatsapp}</p>}
            {contact.email && <p style={{ fontSize: '11px', color: '#555', marginBottom: '4px', wordBreak: 'break-all' }}>✉️ {contact.email}</p>}
            {contact.address && <p style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>🏠 {contact.address}</p>}
            {contact.city && <p style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>📍 {[contact.city, contact.state].filter(Boolean).join(', ')}</p>}
          </div>

          {/* Quick Facts */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '10px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Quick Facts</p>
            {[
              { icon: '🎂', v: p.age && `${p.age} years` },
              { icon: '📏', v: p.height },
              { icon: '⚖️', v: p.weight },
              { icon: '💉', v: p.bloodGroup },
              { icon: '🗣️', v: p.motherTongue },
              { icon: '💍', v: p.maritalStatus },
              { icon: '🍽️', v: lifestyle.diet },
              { icon: '🚬', v: lifestyle.smoking },
              { icon: '🍷', v: lifestyle.drinking },
              { icon: '🙏', v: religious.religion },
            ].filter(x => x.v).map(({ icon, v }, i) => (
              <p key={i} style={{ fontSize: '11px', color: '#555', marginBottom: '4px' }}>{icon} {v}</p>
            ))}
          </div>

          {/* Hobbies */}
          {lifestyle.hobbies && (
            <div>
              <p style={{ fontSize: '10px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Hobbies</p>
              <div>
                {lifestyle.hobbies.split(',').map(h => <Tag key={h}>{h.trim()}</Tag>)}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '32px 28px' }}>
          {/* Name Header */}
          <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: `2px solid ${primary}20` }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: text, margin: '0 0 4px', letterSpacing: '-0.5px' }}>
              {p.name || 'Your Name'}
            </h1>
            {career.occupation && (
              <p style={{ fontSize: '14px', color: primary, fontWeight: '600', margin: '0 0 8px' }}>{career.occupation}</p>
            )}
            {p.about && (
              <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.7, margin: 0 }}>{p.about}</p>
            )}
          </div>

          <SectionTitle title="Personal Information" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
            <InfoRow label="Date of Birth" value={p.dob} />
            <InfoRow label="Complexion" value={p.complexion} />
          </div>

          <SectionTitle title="Family Details" />
          <InfoRow label="Father's Name" value={`${family.fatherName || ''} ${family.fatherOccupation ? `(${family.fatherOccupation})` : ''}`.trim()} />
          <InfoRow label="Mother's Name" value={`${family.motherName || ''} ${family.motherOccupation ? `(${family.motherOccupation})` : ''}`.trim()} />
          <InfoRow label="Siblings" value={[family.brothers && `${family.brothers} Brother(s)`, family.sisters && `${family.sisters} Sister(s)`].filter(Boolean).join(', ')} />
          <InfoRow label="Family Type" value={family.familyType} />
          <InfoRow label="Family Status" value={family.familyStatus} />
          <InfoRow label="Family Values" value={family.familyValues} />
          <InfoRow label="Native Place" value={family.nativePlace} />

          <SectionTitle title="Education & Career" />
          <InfoRow label="Qualification" value={`${education.qualification || ''} ${education.field ? `in ${education.field}` : ''}`.trim()} />
          <InfoRow label="Institution" value={education.college} />
          <InfoRow label="Passing Year" value={education.year} />
          <InfoRow label="Occupation" value={career.occupation} />
          <InfoRow label="Company" value={career.company} />
          <InfoRow label="Monthly Salary" value={career.salary} />
          <InfoRow label="Annual Income" value={career.income} />
          <InfoRow label="Work Location" value={career.location} />
          <InfoRow label="Assets" value={career.assets} />
          <InfoRow label="Property" value={career.property} />

          <SectionTitle title="Religious & Astrological" />
          <InfoRow label="Religion / Caste" value={[religious.religion, religious.caste, religious.subCaste].filter(Boolean).join(' / ')} />
          <InfoRow label="Gotra" value={religious.gotra} />
          <InfoRow label="Zodiac / Rasi" value={religious.rasi} />
          <InfoRow label="Nakshatra" value={religious.nakshatra} />
          <InfoRow label="Place of Birth" value={religious.birthPlace} />
          <InfoRow label="Time of Birth" value={religious.birthTime} />
          <InfoRow label="Manglik" value={religious.manglik} />
          <InfoRow label="Horoscope Match" value={religious.horoscopeRequired} />

          <SectionTitle title="Partner Preferences" />
          <InfoRow label="Age Range" value={preferences.ageRange} />
          <InfoRow label="Height" value={preferences.height} />
          <InfoRow label="Education" value={preferences.education} />
          <InfoRow label="Profession" value={preferences.profession} />
          <InfoRow label="Religion/Caste" value={preferences.religion} />
          <InfoRow label="Location" value={preferences.location} />
          {preferences.other && <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.7, marginTop: '6px' }}>{preferences.other}</p>}

          {additional.notes && (
            <>
              <SectionTitle title="Additional Notes" />
              <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.7 }}>{additional.notes}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernMinimal;
