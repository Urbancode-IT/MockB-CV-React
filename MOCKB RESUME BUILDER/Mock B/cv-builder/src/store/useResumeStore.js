import { create } from 'zustand';

export const useResumeStore = create((set) => ({
    personalInfo: {
        name: 'YOUR NAME',
        title: 'Professional Title',
        email: 'your.email@example.com',
        phone: '+1 (555) 000-0000',
        location: 'City, Country',
        linkedin: '',
        website: ''
    },
    summary: 'Highly skilled professional with experience in core domain areas. Proven track record of delivering high-quality results.',
    experience: [
        {
            id: 'exp-stripe',
            company: 'Stripe',
            role: 'Senior Software Engineer',
            start: '06/2023',
            end: 'Present',
            description: 'Led development of core payment features, scaling transactions to millions of users globally. Collaborated across engineering and product teams to optimize API performance.'
        }
    ],
    education: [
        {
            id: 'edu-main',
            school: 'Stanford University',
            degree: 'B.S. Computer Science',
            start: '2019',
            end: '2023'
        }
    ],
    skills: ['React', 'JavaScript', 'Node.js', 'CSS Modules', 'Web Development'],
    certifications: [],
    languages: ['English', 'Spanish'],
    awards: [],
    themeColor: '#D4C77A', // Accent color
    fontFamily: "'Satoshi', sans-serif",

    // Actions
    updatePersonalInfo: (field, value) => set((state) => ({
        personalInfo: { ...state.personalInfo, [field]: value }
    })),

    updateSummary: (value) => set({ summary: value }),

    setResumeData: (data) => set((state) => ({
        personalInfo: { ...state.personalInfo, ...data.personalInfo },
        summary: data.summary || state.summary,
        experience: data.experience || state.experience,
        education: data.education || state.education,
        skills: data.skills || state.skills,
        certifications: data.certifications || state.certifications,
        languages: data.languages || state.languages,
        awards: data.awards || state.awards
    })),

    addExperience: (exp) => set((state) => ({
        experience: [...state.experience, { id: Date.now().toString(), ...exp }]
    })),

    updateExperience: (id, updatedExp) => set((state) => ({
        experience: state.experience.map((exp) => exp.id === id ? { ...exp, ...updatedExp } : exp)
    })),

    removeExperience: (id) => set((state) => ({
        experience: state.experience.filter((exp) => exp.id !== id)
    })),

    addEducation: (edu) => set((state) => ({
        education: [...state.education, { id: Date.now().toString(), ...edu }]
    })),

    updateEducation: (id, updatedEdu) => set((state) => ({
        education: state.education.map((edu) => edu.id === id ? { ...edu, ...updatedEdu } : edu)
    })),

    removeEducation: (id) => set((state) => ({
        education: state.education.filter((edu) => edu.id !== id)
    })),

    addSkill: (skill) => set((state) => {
        if (state.skills.includes(skill)) return {};
        return { skills: [...state.skills, skill] };
    }),

    removeSkill: (skill) => set((state) => ({
        skills: state.skills.filter((s) => s !== skill)
    })),

    setThemeColor: (color) => set({ themeColor: color }),
    setFontFamily: (font) => set({ fontFamily: font }),
    
    resetResume: () => set({
        personalInfo: { name: '', title: '', email: '', phone: '', location: '', linkedin: '', website: '' },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        certifications: [],
        languages: [],
        awards: []
    })
}));
