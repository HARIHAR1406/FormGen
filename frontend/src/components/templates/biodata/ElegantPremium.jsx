/* Elegant Premium Biodata Template — Dark Navy with Gold */
const ElegantPremium = ({ data = {}, customization = {} }) => {
  const p = data?.personal || {};
  const contact = data?.contact || {};
  const family = data?.family || {};
  const education = data?.education || {};
  const career = data?.career || {};
  const religious = data?.religious || {};
  const lifestyle = data?.lifestyle || {};
  const preferences = data?.preferences || {};
  const additional = data?.additional || {};

  const primary = customization?.primaryColor || '#1E2A4A';
  const gold = customization?.accentColor || '#C9A84C';

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <div style={{ width: '24px', height: '1px', background: gold }} />
        <h3 style={{ fontSize: '11px', fontWeight: '700', color: gold, textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>{title}</h3>
        <div style={{ flex: 1, height: '1px', background: gold + '60' }} />
      </div>
      {children}
    </div>
  );

  const Row = ({ label, value }) => value ? (
    <div style={{ display: 'flex', gap: '12px', marginBottom: '6px', fontSize: '12px' }}>
      <span style={{ color: gold + 'CC', minWidth: '130px', flexShrink: 0, fontSize: '11px' }}>{label}</span>
      <span style={{ color: '#E8E0CC', fontWeight: '500' }}>{value}</span>
    </div>
  ) : null;

  return (
    <div style={{ background: primary, color: '#E8E0CC', minHeight: '297mm', fontFamily: customization?.fontFamily || "'Playfair Display', serif" }}>
      {/* Gold corner decorations */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, borderTop: `50px solid ${gold}`, borderRight: '50px solid transparent' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderTop: `50px solid ${gold}`, borderLeft: '50px solid transparent' }} />

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '50px 40px 30px', borderBottom: `1px solid ${gold}40` }}>
        {p.photoURL ? (
          <img src={p.photoURL} alt="Profile" style={{
            width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover',
            display: 'block', margin: '0 auto 16px',
            border: `2px solid ${gold}`, boxShadow: `0 0 20px ${gold}40`
          }} />
        ) : (
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%', background: `${gold}20`,
            border: `2px solid ${gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: '36px'
          }}>👤</div>
        )}
        <p style={{ color: gold, fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '10px' }}>
          ✦ Marriage Biodata ✦
        </p>
        <h1 style={{ color: '#FFFFFF', fontSize: '32px', fontWeight: '700', letterSpacing: '-0.5px', margin: '0 0 6px' }}>
          {p.name || 'Your Name'}
        </h1>
        {career.occupation && (
          <p style={{ color: gold, fontSize: '13px', letterSpacing: '1px', margin: '0 0 12px' }}>{career.occupation}</p>
        )}
        {p.about && (
          <p style={{ color: '#A8A0B0', fontSize: '12px', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto', fontStyle: 'italic' }}>
            "{p.about}"
          </p>
        )}

        {/* Quick Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px', paddingTop: '16px', borderTop: `1px solid ${gold}30` }}>
          {[
            p.age && `${p.age} Yrs`,
            p.height,
            religious.religion,
            lifestyle.diet,
          ].filter(Boolean).map((v, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ color: gold, fontSize: '12px', fontWeight: '600' }}>{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '30px 40px' }}>
        {/* Left */}
        <div>
          <Section title="Personal Details">
            <Row label="Date of Birth" value={p.dob} />
            <Row label="Height" value={p.height} />
            <Row label="Weight" value={p.weight} />
            <Row label="Complexion" value={p.complexion} />
            <Row label="Blood Group" value={p.bloodGroup} />
            <Row label="Mother Tongue" value={p.motherTongue} />
            <Row label="Marital Status" value={p.maritalStatus} />
          </Section>

          <Section title="Contact">
            <Row label="Phone" value={contact.phone} />
            <Row label="WhatsApp" value={contact.whatsapp} />
            <Row label="Email" value={contact.email} />
            <Row label="Location" value={[contact.city, contact.state].filter(Boolean).join(', ')} />
            <Row label="Address" value={contact.address} />
          </Section>

          <Section title="Education">
            <Row label="Qualification" value={education.qualification} />
            <Row label="Specialization" value={education.field} />
            <Row label="Institution" value={education.college} />
            <Row label="Year" value={education.year} />
          </Section>

          <Section title="Career">
            <Row label="Occupation" value={career.occupation} />
            <Row label="Company" value={career.company} />
            <Row label="Monthly Salary" value={career.salary} />
            <Row label="Annual Income" value={career.income} />
            <Row label="Work Location" value={career.location} />
            <Row label="Assets" value={career.assets} />
            <Row label="Property" value={career.property} />
          </Section>
        </div>

        {/* Right */}
        <div>
          <Section title="Family Background">
            <Row label="Father" value={`${family.fatherName || ''} ${family.fatherOccupation ? `(${family.fatherOccupation})` : ''}`.trim()} />
            <Row label="Mother" value={`${family.motherName || ''} ${family.motherOccupation ? `(${family.motherOccupation})` : ''}`.trim()} />
            <Row label="Brothers" value={family.brothers} />
            <Row label="Sisters" value={family.sisters} />
            <Row label="Family Type" value={family.familyType} />
            <Row label="Family Status" value={family.familyStatus} />
            <Row label="Family Values" value={family.familyValues} />
            <Row label="Native Place" value={family.nativePlace} />
          </Section>

          <Section title="Religious">
            <Row label="Religion" value={religious.religion} />
            <Row label="Caste" value={religious.caste} />
            <Row label="Sub-Caste" value={religious.subCaste} />
            <Row label="Gotra" value={religious.gotra} />
            <Row label="Zodiac / Rasi" value={religious.rasi} />
            <Row label="Nakshatra" value={religious.nakshatra} />
            <Row label="Place of Birth" value={religious.birthPlace} />
            <Row label="Time of Birth" value={religious.birthTime} />
            <Row label="Manglik" value={religious.manglik} />
            <Row label="Horoscope Match" value={religious.horoscopeRequired} />
          </Section>

          <Section title="Lifestyle & Interests">
            <Row label="Diet" value={lifestyle.diet} />
            <Row label="Smoking" value={lifestyle.smoking} />
            <Row label="Drinking" value={lifestyle.drinking} />
            <Row label="Hobbies" value={lifestyle.hobbies} />
          </Section>

          <Section title="Partner Preferences">
            <Row label="Age Range" value={preferences.ageRange} />
            <Row label="Height" value={preferences.height} />
            <Row label="Education" value={preferences.education} />
            <Row label="Profession" value={preferences.profession} />
            <Row label="Religion / Caste" value={preferences.religion} />
            <Row label="Location" value={preferences.location} />
            <Row label="Other" value={preferences.other} />
          </Section>
        </div>
      </div>

      {additional.notes && (
        <div style={{ padding: '0 40px 20px' }}>
          <Section title="Additional Notes">
            <p style={{ color: '#A8A0B0', fontSize: '12px', lineHeight: 1.8 }}>{additional.notes}</p>
          </Section>
        </div>
      )}

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${gold}30`, padding: '16px 40px', textAlign: 'center' }}>
        <p style={{ color: gold + '80', fontSize: '10px', letterSpacing: '2px' }}>✦ {p.name || 'Candidate'} — Marriage Biodata ✦</p>
      </div>
    </div>
  );
};

export default ElegantPremium;
