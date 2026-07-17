const PastelSoft = ({ data = {}, customization = {} }) => {
  const p = data.personal || {};
  const fam = data.family || {};
  const edu = data.education || {};
  const career = data.career || {};
  const religious = data.religious || {};
  const contact = data.contact || {};
  const preferences = data.preferences || {};
  const lifestyle = data.lifestyle || {};
  const additional = data.additional || {};

  const primaryColor = customization.primaryColor || '#DB2777';
  const font = customization.fontFamily || 'Georgia, serif';

  const Row = ({ label, value }) => value ? (
    <div style={{ display: 'flex', marginBottom: '0.4rem', fontSize: '0.83rem' }}>
      <span style={{ color: '#9CA3AF', width: '110px', flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#374151', fontWeight: '500' }}>{value}</span>
    </div>
  ) : null;

  return (
    <div style={{ fontFamily: font, background: 'linear-gradient(135deg, #FDF2F8 0%, #F5F3FF 100%)', minHeight: '100%', padding: '2rem' }}>
      {/* Header */}
      <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', marginBottom: '1.25rem', textAlign: 'center', boxShadow: '0 4px 20px rgba(219,39,119,0.12)', border: '1px solid #FBCFE8' }}>
        {p.photoURL ? (
          <img src={p.photoURL} alt="" style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #FBCFE8', marginBottom: '1rem' }} />
        ) : (
          <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: 'linear-gradient(135deg, #FBCFE8, #DDD6FE)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>🌸</div>
        )}
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: primaryColor, marginBottom: '0.25rem' }}>{p.name || 'Your Name'}</h1>
        <p style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>
          {[p.age && `${p.age} yrs`, religious.religion, religious.caste].filter(Boolean).join(' · ')}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          {[p.dob && `🗓 ${p.dob}`, p.height && `📏 ${p.height}`, career.occupation && `💼 ${career.occupation}`].filter(Boolean).map(t => (
            <span key={t} style={{ background: '#FDF2F8', border: '1px solid #FBCFE8', borderRadius: '999px', padding: '0.25rem 0.75rem', fontSize: '0.78rem', color: '#BE185D' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        {[
          { title: '🌸 Personal', rows: [['DOB', p.dob], ['Height', p.height], ['Weight', p.weight], ['Complexion', p.complexion], ['Blood Group', p.bloodGroup], ['Mother Tongue', p.motherTongue], ['Marital Status', p.maritalStatus]] },
          { title: '🕌 Astro', rows: [['Religion', religious.religion], ['Caste', religious.caste], ['Sub Caste', religious.subCaste], ['Gotra', religious.gotra], ['Zodiac/Rasi', religious.rasi], ['Nakshatra', religious.nakshatra], ['Birth Place', religious.birthPlace], ['Birth Time', religious.birthTime], ['Manglik', religious.manglik], ['Horoscope Match', religious.horoscopeRequired]] },
          { title: '🎓 Education', rows: [['Qualification', edu.qualification], ['College', edu.college], ['Specialization', edu.field], ['Passing Year', edu.year]] },
          { title: '💼 Career', rows: [['Occupation', career.occupation], ['Company', career.company], ['Salary', career.salary], ['Income', career.income], ['Work Location', career.location], ['Assets', career.assets], ['Property', career.property]] },
          { title: '👨‍👩‍👧 Family', rows: [['Father', fam.fatherName], ["Father's Occ.", fam.fatherOccupation], ['Mother', fam.motherName], ["Mother's Occ.", fam.motherOccupation], ['Siblings', [fam.brothers && `${fam.brothers} Brother(s)`, fam.sisters && `${fam.sisters} Sister(s)`].filter(Boolean).join(', ')], ['Family Type', fam.familyType], ['Family Status', fam.familyStatus], ['Family Values', fam.familyValues], ['Native', fam.nativePlace]] },
          { title: '🌿 Lifestyle', rows: [['Diet', lifestyle.diet], ['Smoking', lifestyle.smoking], ['Drinking', lifestyle.drinking], ['Hobbies', lifestyle.hobbies]] },
          { title: '🌐 Contact', rows: [['Phone', contact.phone], ['WhatsApp', contact.whatsapp], ['Email', contact.email], ['City', contact.city], ['State', contact.state], ['Address', contact.address]] },
          { title: '💑 Partner Preferences', rows: [['Age Range', preferences.ageRange], ['Height', preferences.height], ['Education', preferences.education], ['Profession', preferences.profession], ['Religion/Caste', preferences.religion], ['Location', preferences.location]] },
        ].filter(s => s.rows.some(r => r[1])).map(s => (
          <div key={s.title} style={{ background: 'white', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #FBCFE8' }}>
            <h3 style={{ color: primaryColor, fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>{s.title}</h3>
            {s.rows.filter(([,v]) => v).map(([l, v]) => <Row key={l} label={l} value={v} />)}
          </div>
        ))}
      </div>

      {/* Partner */}
      {preferences.other && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #FBCFE8', marginBottom: '1rem' }}>
          <h3 style={{ color: primaryColor, fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Other Expectations</h3>
          <p style={{ fontSize: '0.83rem', color: '#6B7280', lineHeight: 1.7 }}>{preferences.other}</p>
        </div>
      )}

      {additional.notes && (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #FBCFE8' }}>
          <h3 style={{ color: primaryColor, fontSize: '0.78rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Additional Notes</h3>
          <p style={{ fontSize: '0.83rem', color: '#6B7280', lineHeight: 1.7 }}>{additional.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PastelSoft;
