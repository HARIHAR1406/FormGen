const MinimalistWhite = ({ data = {}, customization = {} }) => {
  const p = data.personal || {};
  const fam = data.family || {};
  const edu = data.education || {};
  const career = data.career || {};
  const religious = data.religious || {};
  const contact = data.contact || {};
  const preferences = data.preferences || {};
  const lifestyle = data.lifestyle || {};
  const additional = data.additional || {};

  const accentColor = customization.primaryColor || '#18181B';
  const font = customization.fontFamily || 'Inter, sans-serif';

  const Row = ({ label, value }) => value ? (
    <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid #F4F4F5', marginBottom: '0.5rem', fontSize: '0.83rem' }}>
      <span style={{ color: '#A1A1AA', fontWeight: '500' }}>{label}</span>
      <span style={{ color: '#18181B', fontWeight: '500' }}>{value}</span>
    </div>
  ) : null;

  return (
    <div style={{ fontFamily: font, background: 'white', minHeight: '100%', padding: '3rem' }}>
      {/* Minimal Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '2px solid #18181B' }}>
        {p.photoURL ? (
          <img src={p.photoURL} alt="" style={{ width: '80px', height: '80px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0 }} />
        ) : null}
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.2em', color: '#A1A1AA', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Marriage Biodata</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: accentColor, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.5rem' }}>{p.name || 'Your Name'}</h1>
          <p style={{ fontSize: '0.875rem', color: '#71717A' }}>
            {[p.age && `${p.age} years`, religious.religion, career.occupation].filter(Boolean).join(' · ')}
          </p>
        </div>
      </div>

      {/* Two-col layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
        <div>
          <h3 style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.2em', color: '#A1A1AA', textTransform: 'uppercase', marginBottom: '1rem' }}>Personal</h3>
          <Row label="Date of Birth" value={p.dob} />
          <Row label="Height" value={p.height} />
          <Row label="Weight" value={p.weight} />
          <Row label="Complexion" value={p.complexion} />
          <Row label="Blood Group" value={p.bloodGroup} />
          <Row label="Mother Tongue" value={p.motherTongue} />
          <Row label="Marital Status" value={p.maritalStatus} />
          
          <h3 style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.2em', color: '#A1A1AA', textTransform: 'uppercase', margin: '1.5rem 0 1rem' }}>Religion & Astro</h3>
          <Row label="Religion" value={religious.religion} />
          <Row label="Caste" value={religious.caste} />
          <Row label="Sub Caste" value={religious.subCaste} />
          <Row label="Gotra" value={religious.gotra} />
          <Row label="Zodiac/Rasi" value={religious.rasi} />
          <Row label="Nakshatra" value={religious.nakshatra} />
          <Row label="Birth Place" value={religious.birthPlace} />
          <Row label="Birth Time" value={religious.birthTime} />
          <Row label="Manglik" value={religious.manglik} />
          <Row label="Horoscope Match" value={religious.horoscopeRequired} />

          <h3 style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.2em', color: '#A1A1AA', textTransform: 'uppercase', margin: '1.5rem 0 1rem' }}>Education</h3>
          <Row label="Qualification" value={edu.qualification} />
          <Row label="Specialization" value={edu.field} />
          <Row label="College" value={edu.college} />
          <Row label="Passing Year" value={edu.year} />
        </div>

        <div>
          <h3 style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.2em', color: '#A1A1AA', textTransform: 'uppercase', marginBottom: '1rem' }}>Career</h3>
          <Row label="Occupation" value={career.occupation} />
          <Row label="Company" value={career.company} />
          <Row label="Salary" value={career.salary} />
          <Row label="Income" value={career.income} />
          <Row label="Work Location" value={career.location} />
          <Row label="Assets" value={career.assets} />
          <Row label="Property" value={career.property} />

          <h3 style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.2em', color: '#A1A1AA', textTransform: 'uppercase', margin: '1.5rem 0 1rem' }}>Family</h3>
          <Row label="Father" value={fam.fatherName} />
          <Row label="Father's Occ." value={fam.fatherOccupation} />
          <Row label="Mother" value={fam.motherName} />
          <Row label="Mother's Occ." value={fam.motherOccupation} />
          <Row label="Siblings" value={[fam.brothers && `${fam.brothers} Brother(s)`, fam.sisters && `${fam.sisters} Sister(s)`].filter(Boolean).join(', ')} />
          <Row label="Family Type" value={fam.familyType} />
          <Row label="Family Status" value={fam.familyStatus} />
          <Row label="Family Values" value={fam.familyValues} />
          <Row label="Native Place" value={fam.nativePlace} />

          <h3 style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.2em', color: '#A1A1AA', textTransform: 'uppercase', margin: '1.5rem 0 1rem' }}>Lifestyle</h3>
          <Row label="Diet" value={lifestyle.diet} />
          <Row label="Smoking" value={lifestyle.smoking} />
          <Row label="Drinking" value={lifestyle.drinking} />
          <Row label="Hobbies" value={lifestyle.hobbies} />

          <h3 style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.2em', color: '#A1A1AA', textTransform: 'uppercase', margin: '1.5rem 0 1rem' }}>Contact</h3>
          <Row label="Phone" value={contact.phone} />
          <Row label="WhatsApp" value={contact.whatsapp} />
          <Row label="Email" value={contact.email} />
          <Row label="Address" value={contact.address} />
          <Row label="City" value={contact.city} />
          <Row label="State" value={contact.state} />
        </div>
      </div>

      {(preferences.ageRange || preferences.height || preferences.education || preferences.profession || preferences.religion || preferences.location) && (
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E4E4E7' }}>
          <h3 style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.2em', color: '#A1A1AA', textTransform: 'uppercase', marginBottom: '1rem' }}>Partner Preferences</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Row label="Age Range" value={preferences.ageRange} />
            <Row label="Height" value={preferences.height} />
            <Row label="Education" value={preferences.education} />
            <Row label="Profession" value={preferences.profession} />
            <Row label="Religion/Caste" value={preferences.religion} />
            <Row label="Location" value={preferences.location} />
          </div>
          {preferences.other && <p style={{ fontSize: '0.85rem', color: '#3F3F46', lineHeight: 1.8, marginTop: '1rem' }}>{preferences.other}</p>}
        </div>
      )}
      
      {additional.notes && (
        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E4E4E7' }}>
          <h3 style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.2em', color: '#A1A1AA', textTransform: 'uppercase', marginBottom: '1rem' }}>Additional Notes</h3>
          <p style={{ fontSize: '0.85rem', color: '#3F3F46', lineHeight: 1.8 }}>{additional.notes}</p>
        </div>
      )}
    </div>
  );
};

export default MinimalistWhite;
