export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photo?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Conversational' | 'Basic';
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

export interface VolunteerWork {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  languages: Language[];
  certificates: Certificate[];
  achievements: Achievement[];
  volunteerWork: VolunteerWork[];
  references: Reference[];
  customSections: CustomSection[];
  sectionOrder: string[];
  sectionVisibility: Record<string, boolean>;
}

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  preview: string;
  config: TemplateConfig;
}

export type TemplateCategory = 
  | 'minimal'
  | 'corporate'
  | 'creative'
  | 'executive'
  | 'developer'
  | 'student'
  | 'modern'
  | 'elegant'
  | 'compact'
  | 'designer'
  | 'marketing'
  | 'ats';

export interface TemplateConfig {
  fontFamily: string;
  headingFontFamily: string;
  fontSize: number;
  lineHeight: number;
  accentColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  sectionSpacing: number;
  margin: number;
  headerStyle: 'centered' | 'left' | 'split' | 'stacked' | 'sidebar';
  iconStyle: 'line' | 'filled' | 'none';
  dividerStyle: 'line' | 'dots' | 'double' | 'none';
  borderRadius: number;
  columns: 1 | 2;
  photoEnabled: boolean;
  photoPosition: 'left' | 'right' | 'top';
  sectionOrder: string[];
}

export interface Customization {
  accentColor: string;
  fontFamily: string;
  headingFontFamily: string;
  fontSize: number;
  lineHeight: number;
  sectionSpacing: number;
  margin: number;
  headerStyle: TemplateConfig['headerStyle'];
  iconStyle: TemplateConfig['iconStyle'];
  dividerStyle: TemplateConfig['dividerStyle'];
  borderRadius: number;
  columns: 1 | 2;
  pageSize: 'a4' | 'letter' | 'legal';
  photoEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
}

export interface ATSResult {
  overallScore: number;
  keywordMatch: number;
  formattingScore: number;
  readability: number;
  sectionCompleteness: number;
  suggestions: ATSSuggestion[];
}

export interface ATSSuggestion {
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  section?: string;
}

export interface AISuggestion {
  type: 'summary' | 'bullets' | 'rewrite' | 'verbs' | 'grammar' | 'ats' | 'spelling' | 'skills' | 'achievements' | 'projects' | 'experience';
  targetId?: string;
  targetField?: string;
  original: string;
  suggestion: string;
  confidence: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  data: ResumeData;
  customization: Customization;
  templateId: string;
}

export interface ResumeState {
  data: ResumeData;
  customization: Customization;
  templateId: string;
  history: HistoryEntry[];
  historyIndex: number;
  isDirty: boolean;
  atsResult: ATSResult | null;
  aiSuggestions: AISuggestion[];
}