import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useFormStore from '../../store/useFormStore';
import { uploadDocumentImage, deleteFile } from '../../services/storage';
import ImageCropModal from '../common/ImageCropModal';
import toast from 'react-hot-toast';
import { FiUpload, FiChevronDown, FiChevronUp, FiEdit2, FiTrash2 } from 'react-icons/fi';
import './FormFields.css';

const Section = ({ title, icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="form-section">
      <button className="form-section-header" onClick={() => setOpen(!open)}>
        <span className="form-section-title"><span>{icon}</span> {title}</span>
        {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
      </button>
      {open && <div className="form-section-body">{children}</div>}
    </div>
  );
};

const Field = ({ label, required, children }) => (
  <div className="form-group">
    <label className="form-label">{label}{required && <span> *</span>}</label>
    {children}
  </div>
);

const BiodataFormFields = () => {
  const { user } = useAuth();
  const { formData, updateFormField, currentProject } = useFormStore();
  const [uploading, setUploading] = useState(false);
  
  // Crop state
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState(null);

  const get = (section, field) => formData?.[section]?.[field] || '';
  const set = (section, field) => (e) => updateFormField(section, field, e.target.value);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('File too large (max 5MB)'); return; }
    
    // Read file for cropper
    const reader = new FileReader();
    reader.onload = () => {
      setTempImageSrc(reader.result);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const handleCropComplete = async (croppedBlob) => {
    setUploading(true);
    try {
      // Mock a file object for the upload function if needed, or just upload the blob directly.
      // Firebase Storage uploadBytes accepts Blob.
      const fileExt = tempImageSrc?.split(';')[0]?.match(/jpeg|png|gif/)?.[0] || 'jpg';
      const file = new File([croppedBlob], `cropped.${fileExt}`, { type: croppedBlob.type });
      
      const currentPhoto = get('personal', 'photoURL');
      if (currentPhoto && currentPhoto !== tempImageSrc) {
        await deleteFile(currentPhoto);
      }

      const url = await uploadDocumentImage(user.uid, currentProject?.id || 'temp', file);
      updateFormField('personal', 'photoURL', url);
      toast.success('Photo updated successfully! ✅');
    } catch (err) {
      if (err.message === 'BUCKET_NOT_FOUND') {
        toast.error('Supabase Error: Please create a public bucket named "uploads" in your dashboard.', { duration: 6000 });
      } else {
        toast.error('Upload failed: ' + err.message);
      }
    } finally { 
      setUploading(false); 
      setCropModalOpen(false);
      setTempImageSrc(null);
    }
  };

  const handleDeletePhoto = async () => {
    const currentPhoto = get('personal', 'photoURL');
    if (!currentPhoto) return;
    if (!window.confirm('Remove this photo?')) return;
    
    setUploading(true);
    try {
      await deleteFile(currentPhoto);
      updateFormField('personal', 'photoURL', '');
      toast.success('Photo removed');
    } catch (err) {
      toast.error('Failed to remove photo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="form-fields-container">
      <div className="form-fields-header">
        <h3>💍 Marriage Biodata</h3>
        <p>Fill in your details to generate your biodata, and try our <strong><span style={{color: '#8B5CF6'}}>AI Tools</span></strong> to pick the perfect template!</p>
      </div>

      <Section title="Personal Information" icon="👤" defaultOpen>
        <div className="photo-upload-area">
          {get('personal', 'photoURL') ? (
            <div className="photo-preview-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
              <img src={get('personal', 'photoURL')} alt="Profile" className="photo-preview" style={{ display: 'block', margin: '0 auto' }} />
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.75rem' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setTempImageSrc(get('personal', 'photoURL'));
                    setCropModalOpen(true);
                  }}
                  disabled={uploading}
                >
                  <FiEdit2 size={13} /> Edit
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ color: 'var(--error)' }}
                  onClick={handleDeletePhoto}
                  disabled={uploading}
                >
                  <FiTrash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="photo-placeholder">
                <span>📷</span>
                <p>Profile Photo</p>
              </div>
              <label className="btn btn-secondary btn-sm photo-upload-btn">
                {uploading ? 'Uploading...' : <><FiUpload size={13} /> Upload Photo</>}
                <input type="file" accept="image/*" onChange={handleFileSelect} hidden disabled={uploading} />
              </label>
            </>
          )}
        </div>
        <div className="form-row">
          <Field label="Full Name" required>
            <input className="form-input" placeholder="Your full name" value={get('personal', 'name')} onChange={set('personal', 'name')} />
          </Field>
          <Field label="Date of Birth" required>
            <input type="date" className="form-input" value={get('personal', 'dob')} onChange={set('personal', 'dob')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Age">
            <input className="form-input" placeholder="25" value={get('personal', 'age')} onChange={set('personal', 'age')} />
          </Field>
          <Field label="Mother Tongue">
            <input className="form-input" placeholder="e.g. Hindi, Tamil" value={get('personal', 'motherTongue')} onChange={set('personal', 'motherTongue')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Height">
            <input className="form-input" placeholder="5'6&quot;" value={get('personal', 'height')} onChange={set('personal', 'height')} />
          </Field>
          <Field label="Weight">
            <input className="form-input" placeholder="e.g. 65 kg" value={get('personal', 'weight')} onChange={set('personal', 'weight')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Complexion">
            <select className="form-input" value={get('personal', 'complexion')} onChange={set('personal', 'complexion')}>
              <option value="">Select</option>
              {['Fair', 'Wheatish', 'Medium', 'Dark'].map(v => <option key={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Blood Group">
            <select className="form-input" value={get('personal', 'bloodGroup')} onChange={set('personal', 'bloodGroup')}>
              <option value="">Select</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(v => <option key={v}>{v}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Marital Status">
          <select className="form-input" value={get('personal', 'maritalStatus')} onChange={set('personal', 'maritalStatus')}>
            <option value="">Select</option>
            {['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'].map(v => <option key={v}>{v}</option>)}
          </select>
        </Field>
        <Field label="About Me">
          <textarea className="form-input" rows={3} placeholder="Brief description about yourself..." value={get('personal', 'about')} onChange={set('personal', 'about')} />
        </Field>
      </Section>

      <Section title="Contact Information" icon="📞">
        <div className="form-row">
          <Field label="Phone" required>
            <input className="form-input" placeholder="+91 9876543210" value={get('contact', 'phone')} onChange={set('contact', 'phone')} />
          </Field>
          <Field label="Email">
            <input type="email" className="form-input" placeholder="email@example.com" value={get('contact', 'email')} onChange={set('contact', 'email')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="WhatsApp">
            <input className="form-input" placeholder="+91 9876543210" value={get('contact', 'whatsapp')} onChange={set('contact', 'whatsapp')} />
          </Field>
        </div>
        <Field label="Address">
          <textarea className="form-input" rows={2} placeholder="Your address" value={get('contact', 'address')} onChange={set('contact', 'address')} />
        </Field>
        <div className="form-row">
          <Field label="City">
            <input className="form-input" placeholder="City" value={get('contact', 'city')} onChange={set('contact', 'city')} />
          </Field>
          <Field label="State">
            <input className="form-input" placeholder="State" value={get('contact', 'state')} onChange={set('contact', 'state')} />
          </Field>
        </div>
      </Section>

      <Section title="Family Details" icon="👨‍👩‍👧‍👦">
        <div className="form-row">
          <Field label="Father's Name">
            <input className="form-input" placeholder="Father's name" value={get('family', 'fatherName')} onChange={set('family', 'fatherName')} />
          </Field>
          <Field label="Father's Occupation">
            <input className="form-input" placeholder="Occupation" value={get('family', 'fatherOccupation')} onChange={set('family', 'fatherOccupation')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Mother's Name">
            <input className="form-input" placeholder="Mother's name" value={get('family', 'motherName')} onChange={set('family', 'motherName')} />
          </Field>
          <Field label="Mother's Occupation">
            <input className="form-input" placeholder="Occupation" value={get('family', 'motherOccupation')} onChange={set('family', 'motherOccupation')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="No. of Brothers">
            <input type="number" className="form-input" placeholder="0" min="0" value={get('family', 'brothers')} onChange={set('family', 'brothers')} />
          </Field>
          <Field label="No. of Sisters">
            <input type="number" className="form-input" placeholder="0" min="0" value={get('family', 'sisters')} onChange={set('family', 'sisters')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Family Type">
            <select className="form-input" value={get('family', 'familyType')} onChange={set('family', 'familyType')}>
              <option value="">Select</option>
              {['Joint Family', 'Nuclear Family'].map(v => <option key={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Family Status">
            <select className="form-input" value={get('family', 'familyStatus')} onChange={set('family', 'familyStatus')}>
              <option value="">Select</option>
              {['Middle Class', 'Upper Middle Class', 'Rich', 'Affluent'].map(v => <option key={v}>{v}</option>)}
            </select>
          </Field>
        </div>
        <div className="form-row">
          <Field label="Family Values">
            <select className="form-input" value={get('family', 'familyValues')} onChange={set('family', 'familyValues')}>
              <option value="">Select</option>
              {['Orthodox', 'Traditional', 'Moderate', 'Liberal'].map(v => <option key={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Native Place">
            <input className="form-input" placeholder="Native place" value={get('family', 'nativePlace')} onChange={set('family', 'nativePlace')} />
          </Field>
        </div>
      </Section>

      <Section title="Educational Details" icon="🎓">
        <div className="form-row">
          <Field label="Highest Qualification">
            <input className="form-input" placeholder="e.g. B.Tech, MBA" value={get('education', 'qualification')} onChange={set('education', 'qualification')} />
          </Field>
          <Field label="Field / Specialization">
            <input className="form-input" placeholder="e.g. Computer Science" value={get('education', 'field')} onChange={set('education', 'field')} />
          </Field>
        </div>
        <Field label="College / University">
          <input className="form-input" placeholder="Institution name" value={get('education', 'college')} onChange={set('education', 'college')} />
        </Field>
        <Field label="Passing Year">
          <input className="form-input" placeholder="2022" value={get('education', 'year')} onChange={set('education', 'year')} />
        </Field>
      </Section>

      <Section title="Career & Financial" icon="💼">
        <div className="form-row">
          <Field label="Occupation">
            <input className="form-input" placeholder="e.g. Software Engineer" value={get('career', 'occupation')} onChange={set('career', 'occupation')} />
          </Field>
          <Field label="Company / Business Name">
            <input className="form-input" placeholder="Company name" value={get('career', 'company')} onChange={set('career', 'company')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Monthly Salary">
            <input className="form-input" placeholder="e.g. ₹80,000" value={get('career', 'salary')} onChange={set('career', 'salary')} />
          </Field>
          <Field label="Annual Income">
            <input className="form-input" placeholder="e.g. ₹10,00,000" value={get('career', 'income')} onChange={set('career', 'income')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Work Location">
            <input className="form-input" placeholder="City" value={get('career', 'location')} onChange={set('career', 'location')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Assets (Optional)">
            <textarea className="form-input" rows={2} placeholder="e.g. Own House, Car..." value={get('career', 'assets')} onChange={set('career', 'assets')} />
          </Field>
          <Field label="Property Details (Optional)">
            <textarea className="form-input" rows={2} placeholder="Property details..." value={get('career', 'property')} onChange={set('career', 'property')} />
          </Field>
        </div>
      </Section>

      <Section title="Religious Information" icon="🙏">
        <div className="form-row">
          <Field label="Religion">
            <input className="form-input" placeholder="Religion" value={get('religious', 'religion')} onChange={set('religious', 'religion')} />
          </Field>
          <Field label="Caste / Community">
            <input className="form-input" placeholder="Caste" value={get('religious', 'caste')} onChange={set('religious', 'caste')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Sub-Caste">
            <input className="form-input" placeholder="Sub-caste" value={get('religious', 'subCaste')} onChange={set('religious', 'subCaste')} />
          </Field>
          <Field label="Gotra">
            <input className="form-input" placeholder="Gotra" value={get('religious', 'gotra')} onChange={set('religious', 'gotra')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Zodiac / Rasi">
            <input className="form-input" placeholder="Rasi" value={get('religious', 'rasi')} onChange={set('religious', 'rasi')} />
          </Field>
          <Field label="Nakshatra (Star)">
            <input className="form-input" placeholder="Nakshatra" value={get('religious', 'nakshatra')} onChange={set('religious', 'nakshatra')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Place of Birth">
            <input className="form-input" placeholder="City, State" value={get('religious', 'birthPlace')} onChange={set('religious', 'birthPlace')} />
          </Field>
          <Field label="Time of Birth">
            <input type="time" className="form-input" value={get('religious', 'birthTime')} onChange={set('religious', 'birthTime')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Manglik (Dosham)">
            <select className="form-input" value={get('religious', 'manglik')} onChange={set('religious', 'manglik')}>
              <option value="">Select</option>
              {['Manglik', 'Non-Manglik', 'Anshik Manglik', 'Unknown'].map(v => <option key={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Horoscope Match Reqd?">
            <select className="form-input" value={get('religious', 'horoscopeRequired')} onChange={set('religious', 'horoscopeRequired')}>
              <option value="">Select</option>
              {['Yes', 'No', 'Does not matter'].map(v => <option key={v}>{v}</option>)}
            </select>
          </Field>
        </div>
      </Section>

      <Section title="Lifestyle" icon="🌟">
        <div className="form-row">
          <Field label="Diet">
            <select className="form-input" value={get('lifestyle', 'diet')} onChange={set('lifestyle', 'diet')}>
              <option value="">Select</option>
              {['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan'].map(v => <option key={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Smoking">
            <select className="form-input" value={get('lifestyle', 'smoking')} onChange={set('lifestyle', 'smoking')}>
              <option value="">Select</option>
              {['No', 'Occasionally', 'Yes'].map(v => <option key={v}>{v}</option>)}
            </select>
          </Field>
        </div>
        <div className="form-row">
          <Field label="Drinking">
            <select className="form-input" value={get('lifestyle', 'drinking')} onChange={set('lifestyle', 'drinking')}>
              <option value="">Select</option>
              {['No', 'Occasionally', 'Yes'].map(v => <option key={v}>{v}</option>)}
            </select>
          </Field>
          <Field label="Hobbies">
            <input className="form-input" placeholder="Reading, Music, Travel..." value={get('lifestyle', 'hobbies')} onChange={set('lifestyle', 'hobbies')} />
          </Field>
        </div>
      </Section>

      <Section title="Partner Preferences" icon="❤️">
        <div className="form-row">
          <Field label="Preferred Age Range">
            <input className="form-input" placeholder="e.g. 22-28" value={get('preferences', 'ageRange')} onChange={set('preferences', 'ageRange')} />
          </Field>
          <Field label="Preferred Height">
            <input className="form-input" placeholder="e.g. 5'2&quot; - 5'8&quot;" value={get('preferences', 'height')} onChange={set('preferences', 'height')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Education Preference">
            <input className="form-input" placeholder="e.g. Graduate or above" value={get('preferences', 'education')} onChange={set('preferences', 'education')} />
          </Field>
          <Field label="Profession Preference">
            <input className="form-input" placeholder="e.g. IT, Govt Job, Doctor" value={get('preferences', 'profession')} onChange={set('preferences', 'profession')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Preferred Religion / Caste">
            <input className="form-input" placeholder="e.g. Hindu, Same Caste" value={get('preferences', 'religion')} onChange={set('preferences', 'religion')} />
          </Field>
          <Field label="Preferred Location">
            <input className="form-input" placeholder="e.g. Metro Cities, Native State" value={get('preferences', 'location')} onChange={set('preferences', 'location')} />
          </Field>
        </div>
        <Field label="Additional Expectations">
          <textarea className="form-input" rows={3} placeholder="Any specific requirements..." value={get('preferences', 'other')} onChange={set('preferences', 'other')} />
        </Field>
      </Section>

      <Section title="Additional Notes" icon="📝">
        <Field label="Additional Information">
          <textarea className="form-input" rows={4} placeholder="Any other information you'd like to add..." value={get('additional', 'notes')} onChange={set('additional', 'notes')} />
        </Field>
      </Section>

      <ImageCropModal 
        isOpen={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        imageSrc={tempImageSrc}
        onCropComplete={handleCropComplete}
        aspect={1} // Square ratio for biodata profiles
      />
    </div>
  );
};

export default BiodataFormFields;
