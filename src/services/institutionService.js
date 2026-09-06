import { getLocalData, setLocalData } from './api';
import { initialInstitutions } from '../data/institutions';

const STORAGE_KEY = 'fop_institutions';
const REQ_STORAGE_KEY = 'fop_requirements';

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
    const reqs = getLocalData(REQ_STORAGE_KEY, []);
    return institutionId ? reqs.filter((r) => r.institutionId === institutionId) : reqs;
  },

  createRequirement: async (requirementData) => {
    const reqs = getLocalData(REQ_STORAGE_KEY, []);
    const newReq = { ...requirementData, id: `req-${Date.now()}`, createdAt: new Date().toISOString() };
    reqs.push(newReq);
    setLocalData(REQ_STORAGE_KEY, reqs);
    return newReq;
  }
};