import { getLocalData, setLocalData } from './api';
import { initialInstitutions } from '../data/institutions';

const STORAGE_KEY = 'fop_institutions';
const REQ_STORAGE_KEY = 'fop_requirements';

const defaultRequirements = [
  {
    id: "req-1",
    institutionId: "inst-1",
    institutionName: "Apex Institute of Technology",
    title: "Executive Guest Lecture on Enterprise Cloud & Microservices",
    description: "Inviting a senior industry architect to deliver an interactive guest lecture on microservices patterns, Kubernetes orchestration, and cloud security architectures for our final year computer science students.",
    serviceType: "Guest Lectures",
    mode: "In Person",
    targetAudience: "3rd & 4th Year B.Tech CSE / IT (120 Students)",
    expertiseRequired: "AWS, Kubernetes, Microservices, CI/CD",
    preferredDate: "2026-09-28",
    updatedAt: "15 Sep 2026",
    status: "Active"
  },
  {
    id: "req-2",
    institutionId: "inst-1",
    institutionName: "Apex Institute of Technology",
    title: "Hands-on Workshop: Generative AI & Transformer Models",
    description: "2-Day intensive hands-on bootcamp covering Large Language Model fine-tuning, HuggingFace transformers, Retrieval Augmented Generation (RAG), and vector databases for pre-final year AI & Data Science scholars.",
    serviceType: "Workshops",
    mode: "Online",
    targetAudience: "3rd Year B.Tech AI & Data Science (80 Students)",
    expertiseRequired: "PyTorch, HuggingFace, LangChain, Vector DBs",
    preferredDate: "2026-10-15",
    updatedAt: "14 Sep 2026",
    status: "Active"
  },
  {
    id: "req-3",
    institutionId: "inst-1",
    institutionName: "Apex Institute of Technology",
    title: "Industry Board Advisory: Autonomous Robotics Curriculum Review",
    description: "Seeking industry leaders from autonomous systems and robotics engineering to review our 2026-2027 academic syllabus, recommending real-world laboratory exercises and industry-standard tooling.",
    serviceType: "Curriculum Development",
    mode: "Hybrid",
    targetAudience: "Department Academic Board & Faculty Members",
    expertiseRequired: "ROS2, Embedded Systems, Computer Vision, SLAM",
    preferredDate: "2026-10-30",
    updatedAt: "12 Sep 2026",
    status: "Active"
  }
];

export const institutionService = {
  getInstitutions: async () => {
    return getLocalData(STORAGE_KEY, initialInstitutions);
  },

  getInstitutionById: async (id) => {
    const institutions = getLocalData(STORAGE_KEY, initialInstitutions);
    return institutions.find((inst) => inst.id === id) || null;
  },

  updateInstitution: async (id, updatedData) => {
    const institutions = getLocalData(STORAGE_KEY, initialInstitutions);
    const updated = institutions.map((i) => (i.id === id ? { ...i, ...updatedData } : i));
    setLocalData(STORAGE_KEY, updated);
    return updated.find((i) => i.id === id);
  },

  createInstitution: async (data) => {
    const institutions = getLocalData(STORAGE_KEY, initialInstitutions);
    const newInst = {
      ...data,
      id: `inst-${Date.now()}`,
      status: 'Active',
      areasOfInterest: data.areasOfInterest || [],
      requirementsNote: data.requirementsNote || ''
    };
    institutions.push(newInst);
    setLocalData(STORAGE_KEY, institutions);
    return newInst;
  },

  getRequirements: async (institutionId) => {
    const reqs = getLocalData(REQ_STORAGE_KEY, defaultRequirements);
    return institutionId ? reqs.filter((r) => r.institutionId === institutionId) : reqs;
  },

  createRequirement: async (requirementData) => {
    const reqs = getLocalData(REQ_STORAGE_KEY, defaultRequirements);
    const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const newReq = {
      ...requirementData,
      id: `req-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: formattedDate,
      status: 'Active'
    };
    const updated = [newReq, ...reqs];
    setLocalData(REQ_STORAGE_KEY, updated);
    return newReq;
  },

  updateRequirement: async (requirementId, updatedData) => {
    const reqs = getLocalData(REQ_STORAGE_KEY, defaultRequirements);
    const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const updated = reqs.map((r) => (r.id === requirementId ? { ...r, ...updatedData, updatedAt: formattedDate } : r));
    setLocalData(REQ_STORAGE_KEY, updated);
    return updated.find((r) => r.id === requirementId);
  },

  deleteRequirement: async (requirementId) => {
    const reqs = getLocalData(REQ_STORAGE_KEY, defaultRequirements);
    const updated = reqs.filter((r) => r.id !== requirementId);
    setLocalData(REQ_STORAGE_KEY, updated);
    return true;
  }
};