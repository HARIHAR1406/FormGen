/* Classic Floral Biodata Template — Traditional Indian Style */
const ClassicFloral = ({ data = {}, customization = {} }) => {
  const p = data?.personal || {};
  const contact = data?.contact || {};
  const family = data?.family || {};
  const education = data?.education || {};
  const career = data?.career || {};
  const religious = data?.religious || {};
  const lifestyle = data?.lifestyle || {};
  const preferences = data?.preferences || {};
  const additional = data?.additional || {};

  const primary = customization?.primaryColor || '#9B2335';
  const accent = customization?.accentColor || '#C8956C';

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '18px' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px',
        borderBottom: `2px solid ${primary}`, paddingBottom: '6px'
      }}>
        <div style={{ width: '6px', height: '20px', background: primary, borderRadius: '3px' }} />
        <h3 style={{ fontSize: '13px', fontWeight: '700', color: primary, textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
          {title}
        </h3>
        <div style={{ flex: 1, height: '1px', background: `${primary}30` }} />
      </div>
      {children}
    </div>
  );

  const Row = ({ label, value }) => value ? (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '5px', fontSize: '12px' }}>
      <span style={{ color: '#666', minWidth: '130px', flexShrink: 0 }}>{label}:</span>
      <span style={{ color: '#222', fontWeight: '500' }}>{value}</span>
    </div>
  ) : null;

  return (
    <div style={{ 
      fontFamily: customization?.fontFamily || 'Georgia, serif', 
      background: '#FFF9F5', 
      minHeight: '297mm', 
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative' 
    }}>
      {/* Decorative Border */}
      <div style={{ position: 'absolute', inset: 0, border: `6px double ${primary}`, pointerEvents: 'none', zIndex: 10 }} />

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`,
        padding: '30px 40px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -30, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', position: 'relative' }}>
          {p.photoURL && (
            <img src={p.photoURL} alt="Profile" style={{
              width: '90px', height: '90px', borderRadius: '50%',
              objectFit: 'cover', border: '3px solid rgba(255,255,255,0.8)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
            }} />
          )}
          <div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>
              ❀ Marriage Biodata ❀
            </p>
            <h1 style={{ color: 'white', fontSize: '26px', fontWeight: '700', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
              {p.name || 'Your Name'}
            </h1>
            {p.about && (
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '12px', maxWidth: '400px', margin: '6px auto 0', lineHeight: 1.5 }}>
                {p.about}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div style={{
        background: `${primary}15`, borderBottom: `1px solid ${primary}30`,
        padding: '10px 40px', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'
      }}>
        {[
          p.dob && `📅 ${p.dob}`,
          p.height && `📏 ${p.height}`,
          p.age && `🎂 ${p.age} yrs`,
          p.motherTongue && `🗣️ ${p.motherTongue}`,
          religious.religion && `🙏 ${religious.religion}`,
          career.occupation && `💼 ${career.occupation}`,
        ].filter(Boolean).map((item, i) => (
          <span key={i} style={{ fontSize: '11px', color: primary, fontWeight: '500' }}>{item}</span>
        ))}
      </div>

      {/* Main Content Wrapper (Expands to push footer down) */}
      <div style={{ flex: 1 }}>
        {/* Two Column Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', padding: '24px 36px' }}>
          {/* Left Column */}
          <div>
            <Section title="Personal Details">
              <Row label="Date of Birth" value={p.dob} />
              <Row label="Age" value={p.age} />
              <Row label="Height" value={p.height} />
              <Row label="Weight" value={p.weight} />
              <Row label="Complexion" value={p.complexion} />
              <Row label="Blood Group" value={p.bloodGroup} />
              <Row label="Mother Tongue" value={p.motherTongue} />
              <Row label="Marital Status" value={p.maritalStatus} />
            </Section>

            <Section title="Contact Information">
              <Row label="Phone" value={contact.phone} />
              <Row label="WhatsApp" value={contact.whatsapp} />
              <Row label="Email" value={contact.email} />
              <Row label="City" value={contact.city} />
              <Row label="State" value={contact.state} />
              {contact.address && (
                <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>
                  <span style={{ color: '#666', minWidth: '130px', display: 'inline-block' }}>Address:</span>
                  {contact.address}
                </div>
              )}
            </Section>

            <Section title="Education">
              <Row label="Qualification" value={education.qualification} />
              <Row label="Specialization" value={education.field} />
              <Row label="College/University" value={education.college} />
              <Row label="Passing Year" value={education.year} />
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

          {/* Right Column */}
          <div>
            <Section title="Family Details">
              <Row label="Father's Name" value={family.fatherName} />
              <Row label="Father's Occupation" value={family.fatherOccupation} />
              <Row label="Mother's Name" value={family.motherName} />
              <Row label="Mother's Occupation" value={family.motherOccupation} />
              <Row label="Brothers" value={family.brothers} />
              <Row label="Sisters" value={family.sisters} />
              <Row label="Family Type" value={family.familyType} />
              <Row label="Family Status" value={family.familyStatus} />
              <Row label="Family Values" value={family.familyValues} />
              <Row label="Native Place" value={family.nativePlace} />
            </Section>

            <Section title="Religious Information">
              <Row label="Religion" value={religious.religion} />
              <Row label="Caste" value={religious.caste} />
              <Row label="Sub-Caste" value={religious.subCaste} />
              <Row label="Gotra" value={religious.gotra} />
              <Row label="Zodiac / Rasi" value={religious.rasi} />
              <Row label="Nakshatra" value={religious.nakshatra} />
              <Row label="Place of Birth" value={religious.birthPlace} />
              <Row label="Time of Birth" value={religious.birthTime} />
              <Row label="Manglik (Dosham)" value={religious.manglik} />
              <Row label="Horoscope Match" value={religious.horoscopeRequired} />
            </Section>

            <Section title="Lifestyle">
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
              {preferences.other && (
                <div style={{ fontSize: '12px', color: '#555', marginTop: '4px', lineHeight: 1.6 }}>
                  {preferences.other}
                </div>
              )}
            </Section>
          </div>
        </div>

        {/* Additional Notes */}
        {additional.notes && (
          <div style={{ padding: '0 36px 24px' }}>
            <Section title="Additional Notes">
              <p style={{ fontSize: '12px', color: '#555', lineHeight: 1.7 }}>{additional.notes}</p>
            </Section>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        background: `linear-gradient(135deg, ${primary}, ${accent})`,
        padding: '12px 40px', textAlign: 'center',
        color: 'rgba(255,255,255,0.9)', fontSize: '11px', letterSpacing: '1px',
        marginTop: 'auto'
      }}>
        ❀ With Best Regards — {p.name || 'Candidate'} ❀
      </div>
    </div>
  );
};

export default ClassicFloral;
