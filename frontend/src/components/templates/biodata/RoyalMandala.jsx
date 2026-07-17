const RoyalMandala = ({ data = {}, customization = {} }) => {
  const p = data.personal || {};
  const fam = data.family || {};
  const edu = data.education || {};
  const career = data.career || {};
  const religious = data.religious || {};
  const contact = data.contact || {};
  const preferences = data.preferences || {};
  const lifestyle = data.lifestyle || {};
  const additional = data.additional || {};

  const primaryColor = customization.primaryColor || '#6B21A8';
  const accentColor = customization.accentColor || '#A855F7';
  const font = customization.fontFamily || 'Georgia, serif';

  return (
    <div style={{ fontFamily: font, background: '#fdf8ff', minHeight: '100%', padding: '2.5rem', position: 'relative', color: '#1a1a2e' }}>
      {/* Mandala Corner Decorations */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '120px', height: '120px', background: `radial-gradient(circle, ${primaryColor}22 0%, transparent 70%)`, borderRadius: '0 0 100% 0' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', background: `radial-gradient(circle, ${primaryColor}22 0%, transparent 70%)`, borderRadius: '0 0 0 100%' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '120px', height: '120px', background: `radial-gradient(circle, ${primaryColor}22 0%, transparent 70%)`, borderRadius: '0 100% 0 0' }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '120px', height: '120px', background: `radial-gradient(circle, ${primaryColor}22 0%, transparent 70%)`, borderRadius: '100% 0 0 0' }} />

      {/* Border */}
      <div style={{ border: `3px solid ${primaryColor}`, borderRadius: '16px', padding: '2rem', position: 'relative', zIndex: 1 }}>
        {/* Inner decorative border */}
        <div style={{ border: `1px solid ${accentColor}44`, borderRadius: '12px', padding: '1.5rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.3em', color: accentColor, marginBottom: '0.5rem', textTransform: 'uppercase' }}>✦ Marriage Biodata ✦</div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: primaryColor, marginBottom: '0.5rem' }}>{p.name || 'Your Name'}</h1>
            {p.photoURL && <img src={p.photoURL} alt="" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${primaryColor}`, margin: '0.75rem auto', display: 'block' }} />}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#555' }}>
              {p.age && <span>Age: {p.age}</span>}
              {p.dob && <span>DOB: {p.dob}</span>}
              {religious.religion && <span>{religious.religion}</span>}
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0', gap: '0.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${primaryColor})` }} />
            <span style={{ color: primaryColor, fontSize: '1rem' }}>◆</span>
            <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${primaryColor})` }} />
          </div>

          {/* Info Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {[
              { title: '👤 Personal', rows: [['Height', p.height], ['Weight', p.weight], ['Complexion', p.complexion], ['Blood Group', p.bloodGroup], ['Mother Tongue', p.motherTongue], ['Marital Status', p.maritalStatus]] },
              { title: '🕌 Astro', rows: [['Religion', religious.religion], ['Caste', religious.caste], ['Sub Caste', religious.subCaste], ['Gotra', religious.gotra], ['Zodiac', religious.rasi], ['Nakshatra', religious.nakshatra], ['Birth Place', religious.birthPlace], ['Birth Time', religious.birthTime], ['Manglik', religious.manglik], ['Match', religious.horoscopeRequired]] },
              { title: '🎓 Education', rows: [['Qualification', edu.qualification], ['Specialization', edu.field], ['College', edu.college], ['Passing Year', edu.year]] },
              { title: '💼 Career', rows: [['Occupation', career.occupation], ['Company', career.company], ['Salary', career.salary], ['Income', career.income], ['Location', career.location], ['Assets', career.assets], ['Property', career.property]] },
              { title: '👨‍👩‍👧 Family', rows: [['Father', fam.fatherName], ["Father's Occ.", fam.fatherOccupation], ['Mother', fam.motherName], ["Mother's Occ.", fam.motherOccupation], ['Siblings', [fam.brothers && `${fam.brothers} Bro`, fam.sisters && `${fam.sisters} Sis`].filter(Boolean).join(', ')], ['Type', fam.familyType], ['Status', fam.familyStatus], ['Values', fam.familyValues], ['Native', fam.nativePlace]] },
              { title: '🌿 Lifestyle', rows: [['Diet', lifestyle.diet], ['Smoking', lifestyle.smoking], ['Drinking', lifestyle.drinking], ['Hobbies', lifestyle.hobbies]] },
              { title: '💑 Preferences', rows: [['Age Range', preferences.ageRange], ['Height', preferences.height], ['Education', preferences.education], ['Profession', preferences.profession], ['Religion/Caste', preferences.religion], ['Location', preferences.location]] },
            ].map(section => (
              <div key={section.title} style={{ background: `${primaryColor}08`, borderRadius: '8px', padding: '1rem', border: `1px solid ${primaryColor}22` }}>
                <h3 style={{ color: primaryColor, fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{section.title}</h3>
                {section.rows.filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.35rem', fontSize: '0.82rem' }}>
                    <span style={{ color: '#888', minWidth: '90px' }}>{k}:</span>
                    <span style={{ color: '#222', fontWeight: '500' }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {preferences.other && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: `${primaryColor}08`, borderRadius: '8px', border: `1px solid ${primaryColor}22` }}>
              <h3 style={{ color: primaryColor, fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Other Expectations</h3>
              <p style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.6 }}>{preferences.other}</p>
            </div>
          )}

          {/* Additional Notes */}
          {additional.notes && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: `${primaryColor}08`, borderRadius: '8px', border: `1px solid ${primaryColor}22` }}>
              <h3 style={{ color: primaryColor, fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Additional Notes</h3>
              <p style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.6 }}>{additional.notes}</p>
            </div>
          )}

          {/* Contact */}
          <div style={{ marginTop: '1rem', textAlign: 'center', padding: '0.75rem', borderTop: `1px solid ${primaryColor}33` }}>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>
              {contact.phone && <span>📱 {contact.phone}  </span>}
              {contact.whatsapp && <span>💬 {contact.whatsapp}  </span>}
              {contact.email && <span>✉️ {contact.email}  </span>}
              {contact.city && <span>📍 {[contact.city, contact.state].filter(Boolean).join(', ')}</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoyalMandala;
