import { create } from 'zustand';

const useFormStore = create((set, get) => ({
  // Current document type
  docType: null, // 'biodata' | 'resume'
  setDocType: (type) => set({ docType: type }),

  // Form data
  formData: {},
  setFormData: (data) => set({ formData: data }),
  updateFormField: (section, field, value) =>
    set((state) => {
      // _list is a special key that stores the entire array for a section
      if (field === '_list') {
        return {
          formData: {
            ...state.formData,
            [section]: value,   // store array directly, not { _list: value }
          },
        };
      }
      return {
        formData: {
          ...state.formData,
          [section]: { ...state.formData[section], [field]: value },
        },
      };
    }),

  // Template selection
  selectedTemplate: 'modern-minimal',
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),

  // Customization
  customization: {
    fontFamily: 'Inter',
    fontSize: '14',
    fontWeight: '400',
    primaryColor: '#7C3AED',
    secondaryColor: '#06B6D4',
    bgColor: '#FFFFFF',
    textColor: '#1A1A2E',
    accentColor: '#7C3AED',
    spacing: 'normal',
    layout: 'standard',
  },
  setCustomization: (custom) => set({ customization: custom }),
  updateCustomization: (key, value) =>
    set((state) => ({
      customization: { ...state.customization, [key]: value },
    })),

  // Current project being edited
  currentProject: null,
  setCurrentProject: (project) => set({ currentProject: project }),

  // Form steps
  currentStep: 0,
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

  // Reset
  resetForm: () =>
    set({
      formData: {},
      currentStep: 0,
      selectedTemplate: 'modern-minimal',
      currentProject: null,
    }),
}));

export default useFormStore;
