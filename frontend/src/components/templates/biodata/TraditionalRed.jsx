const TraditionalRed = ({ data = {}, customization = {} }) => {
  const p = data.personal || {};
  const fam = data.family || {};
  const edu = data.education || {};
  const career = data.career || {};
  const religious = data.religious || {};
  const contact = data.contact || {};
  const preferences = data.preferences || {};
  const lifestyle = data.lifestyle || {};
  const additional = data.additional || {};

  const primaryColor = customization.primaryColor || '#B91C1C';
  const accentColor = customization.accentColor || '#CA8A04';
  const font = customization.fontFamily || 'Georgia, serif';

  const Section = ({ title, rows }) => (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <div style={{ height: '1px', flex: 1, background: `linear-gradient(to right, ${accentColor}, transparent)` }} />
        <span style={{ color: accentColor, fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{title}</span>
        <div style={{ height: '1px', flex: 1, background: `linear-gradient(to left, ${accentColor}, transparent)` }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.25rem 1rem' }}>
        {rows.filter(([,v]) => v).map(([l, v]) => (
          <div key={l} style={{ fontSize: '0.82rem', display: 'flex', gap: '0.4rem' }}>
            <span style={{ color: '#78350F', fontWeight: '600', minWidth: '95px' }}>{l}:</span>
            <span style={{ color: '#1C1917' }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: font, background: '#FFFBEB', minHeight: '100%', padding: '0' }}>
      {/* Top border strip */}
      <div style={{ height: '8px', background: `linear-gradient(to right, ${primaryColor}, ${accentColor}, ${primaryColor})` }} />

      <div style={{ padding: '2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: `2px solid ${accentColor}` }}>
          <p style={{ color: accentColor, fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>✦ Vivah Biodata ✦</p>
          {p.photoURL && <img src={p.photoURL} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${accentColor}`, display: 'block', margin: '0 auto 0.75rem' }} />}
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: primaryColor, marginBottom: '0.25rem' }}>{p.name || 'Your Name'}</h1>
          <p style={{ color: '#78350F', fontSize: '0.85rem' }}>
            {[p.age && `Age: ${p.age}`, p.dob && `DOB: ${p.dob}`, p.height].filter(Boolean).join(' | ')}
          </p>
        </div>

        <Section title="व्यक्तिगत विवरण / Personal" rows={[['Height', p.height], ['Weight', p.weight], ['Complexion', p.complexion], ['Blood Group', p.bloodGroup], ['Marital Status', p.maritalStatus]]} />
        <Section title="धार्मिक जानकारी / Religious & Astro" rows={[['Religion', religious.religion], ['Caste', religious.caste], ['Sub Caste', religious.subCaste], ['Gotra', religious.gotra], ['Mother Tongue', p.motherTongue], ['Zodiac/Rasi', religious.rasi], ['Nakshatra', religious.nakshatra], ['Birth Place', religious.birthPlace], ['Birth Time', religious.birthTime], ['Manglik', religious.manglik], ['Horoscope Match', religious.horoscopeRequired]]} />
        <Section title="शिक्षा / Education" rows={[['Qualification', edu.qualification], ['Specialization', edu.field], ['College', edu.college], ['Passing Year', edu.year]]} />
        <Section title="व्यवसाय / Career" rows={[['Occupation', career.occupation], ['Company', career.company], ['Salary', career.salary], ['Income', career.income], ['Location', career.location], ['Assets', career.assets], ['Property', career.property]]} />
        <Section title="परिवार / Family" rows={[['Father', fam.fatherName], ["Father's Occ.", fam.fatherOccupation], ['Mother', fam.motherName], ["Mother's Occ.", fam.motherOccupation], ['Siblings', [fam.brothers && `${fam.brothers} Bro`, fam.sisters && `${fam.sisters} Sis`].filter(Boolean).join(', ')], ['Family Type', fam.familyType], ['Family Status', fam.familyStatus], ['Values', fam.familyValues], ['Native Place', fam.nativePlace]]} />
        <Section title="जीवन शैली / Lifestyle" rows={[['Diet', lifestyle.diet], ['Smoking', lifestyle.smoking], ['Drinking', lifestyle.drinking], ['Hobbies', lifestyle.hobbies]]} />
        <Section title="प्राथमिकताएं / Preferences" rows={[['Age Range', preferences.ageRange], ['Height', preferences.height], ['Education', preferences.education], ['Profession', preferences.profession], ['Religion/Caste', preferences.religion], ['Location', preferences.location]]} />

        {preferences.other && (
          <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#FEF3C7', borderRadius: '8px', border: `1px solid ${accentColor}44` }}>
            <p style={{ color: accentColor, fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>✦ Other Expectations</p>
            <p style={{ fontSize: '0.82rem', color: '#78350F', lineHeight: 1.6 }}>{preferences.other}</p>
          </div>
        )}
        
        {additional.notes && (
          <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#FEF3C7', borderRadius: '8px', border: `1px solid ${accentColor}44` }}>
            <p style={{ color: accentColor, fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>✦ Additional Notes</p>
            <p style={{ fontSize: '0.82rem', color: '#78350F', lineHeight: 1.6 }}>{additional.notes}</p>
          </div>
        )}

        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: '#92400E', borderTop: `1px solid ${accentColor}44`, paddingTop: '0.75rem' }}>
          {contact.phone && <span>📱 {contact.phone}  </span>}
          {contact.whatsapp && <span>💬 {contact.whatsapp}  </span>}
          {contact.email && <span>✉️ {contact.email}  </span>}
          {contact.city && <span>📍 {[contact.city, contact.state].filter(Boolean).join(', ')}</span>}
        </div>
      </div>
      <div style={{ height: '8px', background: `linear-gradient(to right, ${primaryColor}, ${accentColor}, ${primaryColor})` }} />
    </div>
  );
};

export default TraditionalRed;
