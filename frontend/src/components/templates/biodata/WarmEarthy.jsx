const WarmEarthy = ({ data = {}, customization = {} }) => {
  const p = data.personal || {};
  const fam = data.family || {};
  const edu = data.education || {};
  const career = data.career || {};
  const religious = data.religious || {};
  const contact = data.contact || {};
  const preferences = data.preferences || {};
  const lifestyle = data.lifestyle || {};
  const additional = data.additional || {};

  const primaryColor = customization.primaryColor || '#92400E';
  const accentColor = customization.accentColor || '#4D7C0F';
  const font = customization.fontFamily || 'Georgia, serif';

  return (
    <div style={{ fontFamily: font, background: '#FEFCE8', minHeight: '100%', padding: '2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)', borderRadius: '16px', padding: '1.5rem', border: '2px solid #D97706' }}>
        {p.photoURL ? (
          <img src={p.photoURL} alt="" style={{ width: '95px', height: '95px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #D97706', display: 'block', margin: '0 auto 0.75rem' }} />
        ) : (
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🌿</div>
        )}
        <p style={{ color: '#D97706', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '700', marginBottom: '0.3rem' }}>✦ Marriage Biodata ✦</p>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: primaryColor }}>{p.name || 'Your Name'}</h1>
        <p style={{ color: '#78350F', fontSize: '0.83rem', marginTop: '0.25rem' }}>
          {[p.age && `Age: ${p.age}`, p.height, religious.religion].filter(Boolean).join(' · ')}
        </p>
      </div>

      {/* Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {[
          { title: '🌸 Personal', bg: '#FEF3C7', border: '#D97706', rows: [['DOB', p.dob], ['Height', p.height], ['Weight', p.weight], ['Complexion', p.complexion], ['Blood Group', p.bloodGroup], ['Mother Tongue', p.motherTongue], ['Marital Status', p.maritalStatus]] },
          { title: '🕌 Astro', bg: '#F0FDF4', border: accentColor, rows: [['Religion', religious.religion], ['Caste', religious.caste], ['Sub Caste', religious.subCaste], ['Gotra', religious.gotra], ['Zodiac/Rasi', religious.rasi], ['Nakshatra', religious.nakshatra], ['Birth Place', religious.birthPlace], ['Birth Time', religious.birthTime], ['Manglik', religious.manglik], ['Horoscope Match', religious.horoscopeRequired]] },
          { title: '📚 Education', bg: '#FEF3C7', border: '#D97706', rows: [['Qualification', edu.qualification], ['Specialization', edu.field], ['College', edu.college], ['Passing Year', edu.year]] },
          { title: '🌾 Career', bg: '#F0FDF4', border: accentColor, rows: [['Occupation', career.occupation], ['Company', career.company], ['Salary', career.salary], ['Income', career.income], ['Work Location', career.location], ['Assets', career.assets], ['Property', career.property]] },
          { title: '🏡 Family', bg: '#FEF3C7', border: '#D97706', rows: [['Father', fam.fatherName], ["Father's Occ.", fam.fatherOccupation], ['Mother', fam.motherName], ["Mother's Occ.", fam.motherOccupation], ['Siblings', [fam.brothers && `${fam.brothers} Brother(s)`, fam.sisters && `${fam.sisters} Sister(s)`].filter(Boolean).join(', ')], ['Family Type', fam.familyType], ['Family Status', fam.familyStatus], ['Family Values', fam.familyValues], ['Native', fam.nativePlace]] },
          { title: '🌿 Lifestyle', bg: '#F0FDF4', border: accentColor, rows: [['Diet', lifestyle.diet], ['Smoking', lifestyle.smoking], ['Drinking', lifestyle.drinking], ['Hobbies', lifestyle.hobbies]] },
          { title: '📞 Contact', bg: '#FEF3C7', border: '#D97706', rows: [['Phone', contact.phone], ['WhatsApp', contact.whatsapp], ['Email', contact.email], ['City', contact.city], ['State', contact.state], ['Address', contact.address]] },
          { title: '💑 Partner Preferences', bg: '#F0FDF4', border: accentColor, rows: [['Age Range', preferences.ageRange], ['Height', preferences.height], ['Education', preferences.education], ['Profession', preferences.profession], ['Religion/Caste', preferences.religion], ['Location', preferences.location]] },
        ].map(s => (
          <div key={s.title} style={{ background: s.bg, borderRadius: '12px', padding: '1rem', border: `1.5px solid ${s.border}` }}>
            <h3 style={{ color: s.border, fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>{s.title}</h3>
            {s.rows.filter(([,v]) => v).map(([l, v]) => (
              <div key={l} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.35rem', fontSize: '0.81rem' }}>
                <span style={{ color: '#78350F', minWidth: '85px', flexShrink: 0, fontWeight: '500' }}>{l}:</span>
                <span style={{ color: '#1C1917' }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {preferences.other && (
        <div style={{ marginTop: '1rem', background: '#FEF3C7', borderRadius: '12px', padding: '1rem', border: '1.5px solid #D97706' }}>
          <h3 style={{ color: '#D97706', fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Other Expectations</h3>
          <p style={{ fontSize: '0.82rem', color: '#78350F', lineHeight: 1.7 }}>{preferences.other}</p>
        </div>
      )}
      
      {additional.notes && (
        <div style={{ marginTop: '1rem', background: '#F0FDF4', borderRadius: '12px', padding: '1rem', border: `1.5px solid ${accentColor}` }}>
          <h3 style={{ color: accentColor, fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Additional Notes</h3>
          <p style={{ fontSize: '0.82rem', color: '#78350F', lineHeight: 1.7 }}>{additional.notes}</p>
        </div>
      )}
    </div>
  );
};

export default WarmEarthy;
