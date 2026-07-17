const BoldModern = ({ data = {}, customization = {} }) => {
  const p = data.personal || {};
  const fam = data.family || {};
  const edu = data.education || {};
  const career = data.career || {};
  const religious = data.religious || {};
  const contact = data.contact || {};
  const preferences = data.preferences || {};
  const lifestyle = data.lifestyle || {};
  const additional = data.additional || {};

  const primaryColor = customization.primaryColor || '#1D4ED8';
  const font = customization.fontFamily || 'Inter, sans-serif';

  const InfoRow = ({ label, value }) => value ? (
    <div style={{ display: 'flex', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.4rem', marginBottom: '0.4rem', fontSize: '0.83rem' }}>
      <span style={{ color: '#64748B', width: '120px', flexShrink: 0, fontWeight: '500' }}>{label}</span>
      <span style={{ color: '#0F172A', fontWeight: '600' }}>{value}</span>
    </div>
  ) : null;

  return (
    <div style={{ fontFamily: font, background: '#F8FAFC', minHeight: '100%' }}>
      {/* Bold Header */}
      <div style={{ background: `linear-gradient(135deg, ${primaryColor}, #1E40AF)`, padding: '2.5rem 2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {p.photoURL ? (
          <img src={p.photoURL} alt="" style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)', flexShrink: 0 }} />
        ) : (
          <div style={{ width: '100px', height: '100px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0 }}>👤</div>
        )}
        <div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.25em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Marriage Biodata</div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>{p.name || 'Your Name'}</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem' }}>
            {[p.age && `${p.age} years`, religious.religion, career.occupation].filter(Boolean).join(' • ')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {[
          { title: 'Personal Details', rows: [['Date of Birth', p.dob], ['Height', p.height], ['Weight', p.weight], ['Complexion', p.complexion], ['Blood Group', p.bloodGroup], ['Mother Tongue', p.motherTongue], ['Marital Status', p.maritalStatus]] },
          { title: 'Religion & Astro', rows: [['Religion', religious.religion], ['Caste', religious.caste], ['Sub Caste', religious.subCaste], ['Gotra', religious.gotra], ['Zodiac / Rasi', religious.rasi], ['Nakshatra', religious.nakshatra], ['Manglik', religious.manglik], ['Horoscope Match', religious.horoscopeRequired]] },
          { title: 'Birth Details', rows: [['Place of Birth', religious.birthPlace], ['Time of Birth', religious.birthTime]] },
          { title: 'Education', rows: [['Qualification', edu.qualification], ['Specialization', edu.field], ['College', edu.college], ['Passing Year', edu.year]] },
          { title: 'Career', rows: [['Occupation', career.occupation], ['Company', career.company], ['Salary', career.salary], ['Income', career.income], ['Work Location', career.location]] },
          { title: 'Family', rows: [['Father', fam.fatherName], ["Father's Occupation", fam.fatherOccupation], ['Mother', fam.motherName], ["Mother's Occupation", fam.motherOccupation], ['Siblings', [fam.brothers && `${fam.brothers} Brother(s)`, fam.sisters && `${fam.sisters} Sister(s)`].filter(Boolean).join(', ')], ['Family Type', fam.familyType], ['Family Status', fam.familyStatus], ['Family Values', fam.familyValues], ['Native Place', fam.nativePlace]] },
          { title: 'Lifestyle', rows: [['Diet', lifestyle.diet], ['Smoking', lifestyle.smoking], ['Drinking', lifestyle.drinking], ['Hobbies', lifestyle.hobbies]] },
          { title: 'Contact', rows: [['Phone', contact.phone], ['WhatsApp', contact.whatsapp], ['Email', contact.email], ['City', contact.city], ['State', contact.state], ['Address', contact.address]] },
          { title: 'Partner Preferences', rows: [['Age Range', preferences.ageRange], ['Height', preferences.height], ['Education', preferences.education], ['Profession', preferences.profession], ['Religion/Caste', preferences.religion], ['Location', preferences.location]] },
        ].filter(s => s.rows.some(r => r[1])).map(s => (
          <div key={s.title} style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '3px', height: '18px', background: primaryColor, borderRadius: '2px' }} />
              <h3 style={{ color: primaryColor, fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.title}</h3>
            </div>
            {s.rows.map(([l, v]) => <InfoRow key={l} label={l} value={v} />)}
          </div>
        ))}
      </div>

      {preferences.other && (
        <div style={{ margin: '0 1.5rem 1.5rem', background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '3px', height: '18px', background: primaryColor, borderRadius: '2px' }} />
            <h3 style={{ color: primaryColor, fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Other Expectations</h3>
          </div>
          <p style={{ fontSize: '0.83rem', color: '#475569', lineHeight: 1.7 }}>{preferences.other}</p>
        </div>
      )}
      
      {additional.notes && (
        <div style={{ margin: '0 1.5rem 1.5rem', background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '3px', height: '18px', background: primaryColor, borderRadius: '2px' }} />
            <h3 style={{ color: primaryColor, fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Additional Notes</h3>
          </div>
          <p style={{ fontSize: '0.83rem', color: '#475569', lineHeight: 1.7 }}>{additional.notes}</p>
        </div>
      )}
    </div>
  );
};

export default BoldModern;
