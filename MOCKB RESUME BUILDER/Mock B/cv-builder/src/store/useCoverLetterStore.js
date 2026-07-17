import { create } from 'zustand';

export const useCoverLetterStore = create((set) => ({
    personalInfo: {
        name: 'YOUR NAME',
        email: 'your.email@example.com',
        phone: '+1 (555) 000-0000',
        location: 'City, Country',
        date: new Date().toLocaleDateString()
    },
    recipientInfo: {
        name: 'Hiring Manager',
        company: 'Target Company',
        address: 'Company Address'
    },
    letterBody: `Dear Hiring Manager,

I am writing to express my strong interest in the open position at your company. With my background in software development and proven record of building interactive user experiences, I am confident I would be a great fit for your team.

I look forward to discussing how my skills align with your needs. Thank you for your time and consideration.

Sincerely,
[Your Name]`,
    jobDescription: '',
    atsScore: null,
    suggestions: [],

    // Actions
    updatePersonalInfo: (field, value) => set((state) => ({
        personalInfo: { ...state.personalInfo, [field]: value }
    })),
    
    updateRecipientInfo: (field, value) => set((state) => ({
        recipientInfo: { ...state.recipientInfo, [field]: value }
    })),

    updateLetterBody: (value) => set({ letterBody: value }),
    updateJobDescription: (value) => set({ jobDescription: value }),
    setAtsScore: (score) => set({ atsScore: score }),
    setSuggestions: (suggestions) => set({ suggestions })
}));
