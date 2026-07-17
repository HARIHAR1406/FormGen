import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useFormStore from '../../store/useFormStore';
import { uploadDocumentImage, deleteFile } from '../../services/storage';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiUpload, FiEdit2 } from 'react-icons/fi';
import ImageCropModal from '../common/ImageCropModal';
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

const ResumeFormFields = () => {
  const { user } = useAuth();
  const { formData, updateFormField, currentProject } = useFormStore();
  const [uploading, setUploading] = useState(false);

  const get = (section, field, defaultVal = '') => formData?.[section]?.[field] ?? defaultVal;
  const set = (section, field) => (e) => updateFormField(section, field, e.target.value);

  const getArr = (section) => {
    const val = formData?.[section];
    if (Array.isArray(val)) return val;
    if (val?._list && Array.isArray(val._list)) return val._list;
    return [];
  };
  const setArr = (section, arr) => updateFormField(section, '_list', arr);
  const addItem = (section, template) => setArr(section, [...getArr(section), { ...template, id: Date.now() }]);
  const removeItem = (section, id) => setArr(section, getArr(section).filter(i => i.id !== id));
  const updateItem = (section, id, field, value) => setArr(section, getArr(section).map(i => i.id === id ? { ...i, [field]: value } : i));

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [tempImageSrc, setTempImageSrc] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error('File too large (max 5MB)'); return; }
    
    const reader = new FileReader();
    reader.onload = () => {
      setTempImageSrc(reader.result);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleCropComplete = async (croppedBlob) => {
    setUploading(true);
    try {
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
        <h3>💼 Professional Resume</h3>
        <p>Fill in your details to generate your resume</p>
      </div>

      <Section title="Personal Information" icon="👤" defaultOpen>
        <div className="photo-upload-area">
          {get('personal', 'photoURL') ? (
            <div className="photo-preview-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
              <img src={get('personal', 'photoURL')} alt="Profile" className="photo-preview" style={{ display: 'block', margin: '0 auto', borderRadius: '8px' }} />
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
              <div className="photo-placeholder" style={{ borderRadius: '8px' }}>
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
          <Field label="Job Title" required>
            <input className="form-input" placeholder="e.g. Software Engineer" value={get('personal', 'title')} onChange={set('personal', 'title')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Date of Birth">
            <input type="date" className="form-input" value={get('personal', 'dob')} onChange={set('personal', 'dob')} />
          </Field>
          <Field label="Age">
            <input type="number" className="form-input" placeholder="e.g. 25" value={get('personal', 'age')} onChange={set('personal', 'age')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Gender">
            <select className="form-input" value={get('personal', 'gender')} onChange={set('personal', 'gender')}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </Field>
          <Field label="Nationality">
            <input className="form-input" placeholder="e.g. Indian" value={get('personal', 'nationality')} onChange={set('personal', 'nationality')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Marital Status">
            <select className="form-input" value={get('personal', 'maritalStatus')} onChange={set('personal', 'maritalStatus')}>
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </Field>
          <Field label="Blood Group">
            <input className="form-input" placeholder="e.g. O+" value={get('personal', 'bloodGroup')} onChange={set('personal', 'bloodGroup')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Email">
            <input type="email" className="form-input" placeholder="email@example.com" value={get('personal', 'email')} onChange={set('personal', 'email')} />
          </Field>
          <Field label="Phone">
            <input className="form-input" placeholder="+91 9876543210" value={get('personal', 'phone')} onChange={set('personal', 'phone')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Alternate Phone">
            <input className="form-input" placeholder="Alternate phone" value={get('personal', 'altPhone')} onChange={set('personal', 'altPhone')} />
          </Field>
          <Field label="City">
            <input className="form-input" placeholder="City" value={get('personal', 'city')} onChange={set('personal', 'city')} />
          </Field>
        </div>
        <Field label="Current Address">
          <textarea className="form-input" rows={2} placeholder="Current Address" value={get('personal', 'currentAddress')} onChange={set('personal', 'currentAddress')} />
        </Field>
        <Field label="Permanent Address">
          <textarea className="form-input" rows={2} placeholder="Permanent Address" value={get('personal', 'permanentAddress')} onChange={set('personal', 'permanentAddress')} />
        </Field>
        <div className="form-row">
          <Field label="LinkedIn URL">
            <input className="form-input" placeholder="linkedin.com/in/..." value={get('personal', 'linkedin')} onChange={set('personal', 'linkedin')} />
          </Field>
          <Field label="GitHub URL">
            <input className="form-input" placeholder="github.com/..." value={get('personal', 'github')} onChange={set('personal', 'github')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Portfolio URL">
            <input className="form-input" placeholder="yoursite.com" value={get('personal', 'portfolio')} onChange={set('personal', 'portfolio')} />
          </Field>
          <Field label="Personal Website">
            <input className="form-input" placeholder="Personal website link" value={get('personal', 'website')} onChange={set('personal', 'website')} />
          </Field>
        </div>
      </Section>

      <Section title="Career & Summary" icon="📋">
        <Field label="Career Objective">
          <textarea className="form-input" rows={3} placeholder="State your career goals and objective..." value={get('summary', 'objective')} onChange={set('summary', 'objective')} />
        </Field>
        <Field label="Professional Summary" required>
          <textarea className="form-input" rows={4} placeholder="A brief, compelling summary of your professional background and key strengths..." value={get('summary', 'text')} onChange={set('summary', 'text')} />
        </Field>
      </Section>

      <Section title="Work Experience" icon="💼">
        {getArr('experience').map((exp) => (
          <div key={exp.id} className="list-item-card">
            <div className="list-item-header">
              <span className="list-item-label">{exp.company || 'Company'}</span>
              <button onClick={() => removeItem('experience', exp.id)} className="btn btn-ghost btn-icon danger-hover">
                <FiTrash2 size={14} />
              </button>
            </div>
            <div className="form-row">
              <Field label="Job Title">
                <input className="form-input" placeholder="e.g. Software Engineer" value={exp.title || ''} onChange={(e) => updateItem('experience', exp.id, 'title', e.target.value)} />
              </Field>
              <Field label="Company">
                <input className="form-input" placeholder="Company name" value={exp.company || ''} onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)} />
              </Field>
              <Field label="Experience Type">
                <select className="form-input" value={exp.type || ''} onChange={(e) => updateItem('experience', exp.id, 'type', e.target.value)}>
                  <option value="">Select Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Volunteer">Volunteer</option>
                </select>
              </Field>
            </div>
            <div className="form-row">
              <Field label="Start Date">
                <input type="month" className="form-input" value={exp.startDate || ''} onChange={(e) => updateItem('experience', exp.id, 'startDate', e.target.value)} />
              </Field>
              <Field label="End Date">
                <input type="month" className="form-input" value={exp.endDate || ''} onChange={(e) => updateItem('experience', exp.id, 'endDate', e.target.value)} disabled={exp.current} />
              </Field>
            </div>
            <div className="custom-checkbox" style={{ marginBottom: '0.75rem' }}>
              <input type="checkbox" checked={exp.current || false} onChange={(e) => updateItem('experience', exp.id, 'current', e.target.checked)} id={`cur-${exp.id}`} />
              <label htmlFor={`cur-${exp.id}`}>Currently Working Here</label>
            </div>
            <Field label="Description">
              <textarea className="form-input" rows={3} placeholder="Key responsibilities and achievements..." value={exp.description || ''} onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)} />
            </Field>
          </div>
        ))}
        <button onClick={() => addItem('experience', { title: '', company: '', type: 'Full-Time', startDate: '', endDate: '', current: false, description: '' })} className="btn btn-ghost btn-sm add-btn">
          <FiPlus size={14} /> Add Experience
        </button>
      </Section>

      <Section title="Education" icon="🎓">
        {getArr('education').map((edu) => (
          <div key={edu.id} className="list-item-card">
            <div className="list-item-header">
              <span className="list-item-label">{edu.institution || 'Institution'}</span>
              <button onClick={() => removeItem('education', edu.id)} className="btn btn-ghost btn-icon danger-hover">
                <FiTrash2 size={14} />
              </button>
            </div>
            <div className="form-row">
              <Field label="Education Level">
                <select className="form-input" value={edu.level || ''} onChange={(e) => updateItem('education', edu.id, 'level', e.target.value)}>
                  <option value="">Select Level</option>
                  <option value="SSLC">SSLC (10th)</option>
                  <option value="HSC">HSC (12th)</option>
                  <option value="Diploma">Diploma</option>
                  <option value="UG Degree">UG Degree</option>
                  <option value="PG Degree">PG Degree</option>
                  <option value="PhD">PhD</option>
                </select>
              </Field>
            </div>
            <div className="form-row">
              <Field label="Degree / Course">
                <input className="form-input" placeholder="e.g. B.Tech Computer Science" value={edu.degree || ''} onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)} />
              </Field>
              <Field label="Institution">
                <input className="form-input" placeholder="University/School name" value={edu.institution || ''} onChange={(e) => updateItem('education', edu.id, 'institution', e.target.value)} />
              </Field>
            </div>
            <div className="form-row">
              <Field label="Passing Year">
                <input className="form-input" placeholder="2022" value={edu.year || ''} onChange={(e) => updateItem('education', edu.id, 'year', e.target.value)} />
              </Field>
              <Field label="Grade/CGPA/Percentage">
                <input className="form-input" placeholder="e.g. 8.5 CGPA / 85%" value={edu.grade || ''} onChange={(e) => updateItem('education', edu.id, 'grade', e.target.value)} />
              </Field>
            </div>
          </div>
        ))}
        <button onClick={() => addItem('education', { level: 'UG Degree', degree: '', institution: '', year: '', grade: '' })} className="btn btn-ghost btn-sm add-btn">
          <FiPlus size={14} /> Add Education
        </button>
      </Section>

      <Section title="Skills" icon="⚡">
        <div className="form-row">
          <Field label="Technical Skills">
            <textarea className="form-input" rows={2} placeholder="JavaScript, React, Node.js, Python..." value={get('skills', 'technical')} onChange={set('skills', 'technical')} />
          </Field>
          <Field label="Soft Skills">
            <textarea className="form-input" rows={2} placeholder="Leadership, Communication, Problem-solving..." value={get('skills', 'soft')} onChange={set('skills', 'soft')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Programming Languages">
            <textarea className="form-input" rows={2} placeholder="C++, Java, Python..." value={get('skills', 'programming')} onChange={set('skills', 'programming')} />
          </Field>
          <Field label="Frameworks & Libraries">
            <textarea className="form-input" rows={2} placeholder="React, Angular, Django..." value={get('skills', 'frameworks')} onChange={set('skills', 'frameworks')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Databases">
            <textarea className="form-input" rows={2} placeholder="MongoDB, SQL, PostgreSQL..." value={get('skills', 'databases')} onChange={set('skills', 'databases')} />
          </Field>
          <Field label="Tools & OS">
            <textarea className="form-input" rows={2} placeholder="Git, Docker, AWS, Linux..." value={get('skills', 'tools')} onChange={set('skills', 'tools')} />
          </Field>
        </div>
      </Section>

      <Section title="Projects" icon="🚀">
        {getArr('projects').map((proj) => (
          <div key={proj.id} className="list-item-card">
            <div className="list-item-header">
              <span className="list-item-label">{proj.name || 'Project'}</span>
              <button onClick={() => removeItem('projects', proj.id)} className="btn btn-ghost btn-icon danger-hover">
                <FiTrash2 size={14} />
              </button>
            </div>
            <div className="form-row">
              <Field label="Project Name">
                <input className="form-input" placeholder="Project name" value={proj.name || ''} onChange={(e) => updateItem('projects', proj.id, 'name', e.target.value)} />
              </Field>
              <Field label="Tech Stack">
                <input className="form-input" placeholder="React, Node.js..." value={proj.tech || ''} onChange={(e) => updateItem('projects', proj.id, 'tech', e.target.value)} />
              </Field>
            </div>
            <Field label="Description">
              <textarea className="form-input" rows={2} placeholder="What this project does and your role..." value={proj.description || ''} onChange={(e) => updateItem('projects', proj.id, 'description', e.target.value)} />
            </Field>
            <div className="form-row">
              <Field label="Duration">
                <input className="form-input" placeholder="e.g. Jan 2023 - Mar 2023" value={proj.duration || ''} onChange={(e) => updateItem('projects', proj.id, 'duration', e.target.value)} />
              </Field>
              <Field label="Project URL / GitHub">
                <input className="form-input" placeholder="github.com/... or yoursite.com" value={proj.url || ''} onChange={(e) => updateItem('projects', proj.id, 'url', e.target.value)} />
              </Field>
            </div>
          </div>
        ))}
        <button onClick={() => addItem('projects', { name: '', tech: '', description: '', duration: '', url: '' })} className="btn btn-ghost btn-sm add-btn">
          <FiPlus size={14} /> Add Project
        </button>
      </Section>

      <Section title="Certifications" icon="🏆">
        {getArr('certifications').map((cert) => (
          <div key={cert.id} className="list-item-card">
            <div className="list-item-header">
              <span className="list-item-label">{cert.name || 'Certification'}</span>
              <button onClick={() => removeItem('certifications', cert.id)} className="btn btn-ghost btn-icon danger-hover"><FiTrash2 size={14} /></button>
            </div>
            <div className="form-row">
              <Field label="Certification Name">
                <input className="form-input" placeholder="e.g. AWS Solutions Architect" value={cert.name || ''} onChange={(e) => updateItem('certifications', cert.id, 'name', e.target.value)} />
              </Field>
              <Field label="Issuer">
                <input className="form-input" placeholder="e.g. Amazon" value={cert.issuer || ''} onChange={(e) => updateItem('certifications', cert.id, 'issuer', e.target.value)} />
              </Field>
            </div>
            <Field label="Year">
              <input className="form-input" placeholder="2023" value={cert.year || ''} onChange={(e) => updateItem('certifications', cert.id, 'year', e.target.value)} />
            </Field>
          </div>
        ))}
        <button onClick={() => addItem('certifications', { name: '', issuer: '', year: '' })} className="btn btn-ghost btn-sm add-btn">
          <FiPlus size={14} /> Add Certification
        </button>
      </Section>

      <Section title="Additional Information" icon="🌟">
        <Field label="Achievements & Awards">
          <textarea className="form-input" rows={3} placeholder="• Won Hackathon 2023&#10;• Employee of the month..." value={get('additional', 'achievements')} onChange={set('additional', 'achievements')} />
        </Field>
        <div className="form-row">
          <Field label="Publications">
            <textarea className="form-input" rows={2} placeholder="Research papers, articles..." value={get('additional', 'publications')} onChange={set('additional', 'publications')} />
          </Field>
          <Field label="Patents">
            <textarea className="form-input" rows={2} placeholder="Any patents filed/granted..." value={get('additional', 'patents')} onChange={set('additional', 'patents')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Workshops & Conferences">
            <textarea className="form-input" rows={2} placeholder="Attended or presented at..." value={get('additional', 'workshops')} onChange={set('additional', 'workshops')} />
          </Field>
          <Field label="Languages Known">
            <textarea className="form-input" rows={2} placeholder="English (Fluent), Spanish (Basic)..." value={get('additional', 'languages')} onChange={set('additional', 'languages')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Hobbies & Interests">
            <textarea className="form-input" rows={2} placeholder="Reading, Coding, Chess..." value={get('additional', 'hobbies')} onChange={set('additional', 'hobbies')} />
          </Field>
        </div>
        <div className="form-row">
          <Field label="Strengths">
            <input className="form-input" placeholder="e.g. Quick learner, Team player" value={get('additional', 'strengths')} onChange={set('additional', 'strengths')} />
          </Field>
          <Field label="Weaknesses">
            <input className="form-input" placeholder="e.g. Perfectionist" value={get('additional', 'weaknesses')} onChange={set('additional', 'weaknesses')} />
          </Field>
        </div>
      </Section>

      <Section title="Declaration & References" icon="👥">
        <Field label="Declaration">
          <textarea className="form-input" rows={2} placeholder="I hereby declare that the above written particulars are true to the best of my knowledge and belief." value={get('declaration', 'text')} onChange={set('declaration', 'text')} />
        </Field>
        <div className="form-row">
          <Field label="Place">
            <input className="form-input" placeholder="e.g. New York" value={get('declaration', 'place')} onChange={set('declaration', 'place')} />
          </Field>
          <Field label="Signature Name">
            <input className="form-input" placeholder="Your name for signature" value={get('declaration', 'signature')} onChange={set('declaration', 'signature')} />
          </Field>
        </div>
        {getArr('references').map((ref) => (
          <div key={ref.id} className="list-item-card">
            <div className="list-item-header">
              <span className="list-item-label">{ref.name || 'Reference'}</span>
              <button onClick={() => removeItem('references', ref.id)} className="btn btn-ghost btn-icon danger-hover"><FiTrash2 size={14} /></button>
            </div>
            <div className="form-row">
              <Field label="Name">
                <input className="form-input" placeholder="Referee name" value={ref.name || ''} onChange={(e) => updateItem('references', ref.id, 'name', e.target.value)} />
              </Field>
              <Field label="Position">
                <input className="form-input" placeholder="e.g. Senior Manager" value={ref.position || ''} onChange={(e) => updateItem('references', ref.id, 'position', e.target.value)} />
              </Field>
            </div>
            <Field label="Contact">
              <input className="form-input" placeholder="Email or phone" value={ref.contact || ''} onChange={(e) => updateItem('references', ref.id, 'contact', e.target.value)} />
            </Field>
          </div>
        ))}
        <button onClick={() => addItem('references', { name: '', position: '', contact: '' })} className="btn btn-ghost btn-sm add-btn">
          <FiPlus size={14} /> Add Reference
        </button>
      </Section>

      <ImageCropModal 
        isOpen={cropModalOpen}
        onClose={() => setCropModalOpen(false)}
        imageSrc={tempImageSrc}
        onCropComplete={handleCropComplete}
        aspect={1} // Square for resume as well (can be changed to 4/5 if needed)
      />
    </div>
  );
};

export default ResumeFormFields;
