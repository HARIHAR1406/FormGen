const OceanBlue = ({ data = {}, customization = {} }) => {
  const p = data.personal || {};
  const fam = data.family || {};
  const edu = data.education || {};
  const career = data.career || {};
  const religious = data.religious || {};
  const contact = data.contact || {};
  const preferences = data.preferences || {};
  const lifestyle = data.lifestyle || {};
  const additional = data.additional || {};

  const primaryColor = customization.primaryColor || '#0369A1';
  const font = customization.fontFamily || 'Inter, sans-serif';

  return (
    <div style={{ fontFamily: font, background: '#F0F9FF', minHeight: '100%', padding: '0' }}>
      {/* Header Wave */}
      <div style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #0EA5E9 60%, #06B6D4 100%)`, padding: '2rem', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {p.photoURL ? (
            <img src={p.photoURL} alt="" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.6)', flexShrink: 0 }} />
          ) : (
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>🌊</div>
          )}
          <div>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Marriage Biodata</p>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'white', marginBottom: '0.25rem' }}>{p.name || 'Your Name'}</h1>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>
              {[p.age && `${p.age} yrs`, religious.religion, career.occupation].filter(Boolean).join(' • ')}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1rem 1.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { emoji: '🌸', title: 'Personal', rows: [['DOB', p.dob], ['Height', p.height], ['Weight', p.weight], ['Complexion', p.complexion], ['Blood Group', p.bloodGroup], ['Mother Tongue', p.motherTongue], ['Marital Status', p.maritalStatus]] },
            { emoji: '🕌', title: 'Religion & Astro', rows: [['Religion', religious.religion], ['Caste', religious.caste], ['Sub Caste', religious.subCaste], ['Gotra', religious.gotra], ['Zodiac/Rasi', religious.rasi], ['Nakshatra', religious.nakshatra], ['Birth Place', religious.birthPlace], ['Birth Time', religious.birthTime], ['Manglik', religious.manglik], ['Horoscope Match', religious.horoscopeRequired]] },
            { emoji: '📚', title: 'Education', rows: [['Qualification', edu.qualification], ['Specialization', edu.field], ['College', edu.college], ['Passing Year', edu.year]] },
            { emoji: '💼', title: 'Career', rows: [['Occupation', career.occupation], ['Company', career.company], ['Salary', career.salary], ['Income', career.income], ['Work Location', career.location], ['Assets', career.assets], ['Property', career.property]] },
            { emoji: '🏡', title: 'Family', rows: [['Father', fam.fatherName], ["Father's Occ.", fam.fatherOccupation], ['Mother', fam.motherName], ["Mother's Occ.", fam.motherOccupation], ['Siblings', [fam.brothers && `${fam.brothers} Brother(s)`, fam.sisters && `${fam.sisters} Sister(s)`].filter(Boolean).join(', ')], ['Family Type', fam.familyType], ['Family Status', fam.familyStatus], ['Family Values', fam.familyValues], ['Native Place', fam.nativePlace]] },
            { emoji: '🧘', title: 'Lifestyle', rows: [['Diet', lifestyle.diet], ['Smoking', lifestyle.smoking], ['Drinking', lifestyle.drinking], ['Hobbies', lifestyle.hobbies]] },
            { emoji: '📞', title: 'Contact', rows: [['Phone', contact.phone], ['WhatsApp', contact.whatsapp], ['Email', contact.email], ['City', contact.city], ['State', contact.state], ['Address', contact.address]] },
            { emoji: '💑', title: 'Partner Preferences', rows: [['Age Range', preferences.ageRange], ['Height', preferences.height], ['Education', preferences.education], ['Profession', preferences.profession], ['Religion/Caste', preferences.religion], ['Location', preferences.location]] },
          ].map(s => (
            <div key={s.title} style={{ background: 'white', borderRadius: '12px', padding: '1rem', boxShadow: '0 1px 10px rgba(3,105,161,0.1)', borderTop: `3px solid ${primaryColor}` }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>{s.emoji} {s.title}</div>
              {s.rows.filter(([,v]) => v).map(([l, v]) => (
                <div key={l} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.3rem', fontSize: '0.81rem' }}>
                  <span style={{ color: '#94A3B8', minWidth: '85px', flexShrink: 0 }}>{l}</span>
                  <span style={{ color: '#1E293B', fontWeight: '500' }}>{v}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {preferences.other && (
          <div style={{ marginTop: '1rem', background: 'white', borderRadius: '12px', padding: '1rem', boxShadow: '0 1px 10px rgba(3,105,161,0.1)', borderTop: `3px solid ${primaryColor}` }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Other Expectations</div>
            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.7 }}>{preferences.other}</p>
          </div>
        )}

        {additional.notes && (
          <div style={{ marginTop: '1rem', background: 'white', borderRadius: '12px', padding: '1rem', boxShadow: '0 1px 10px rgba(3,105,161,0.1)', borderTop: `3px solid ${primaryColor}` }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: primaryColor, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>📝 Additional Notes</div>
            <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.7 }}>{additional.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OceanBlue;
