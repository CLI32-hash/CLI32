import { getLocalData, setLocalData } from './api';
import { initialExperts } from '../data/experts';

const STORAGE_KEY = 'fop_experts';

export const expertService = {
  getExperts: async () => {
    let experts = getLocalData(STORAGE_KEY, initialExperts);
    let modified = false;
    experts = experts.map((e) => {
      const match = initialExperts.find((init) => init.id === e.id);
      if (!e.avatar && match?.avatar) {
        e.avatar = match.avatar;
        modified = true;
      }
      return e;
    });
    if (modified) {
      setLocalData(STORAGE_KEY, experts);
    }
    return experts;
  },

  getExpertById: async (id) => {
    const experts = await expertService.getExperts();
    return experts.find((exp) => exp.id === id) || null;
  },

  updateExpert: async (id, updatedData) => {
    const experts = getLocalData(STORAGE_KEY, initialExperts);
    const updated = experts.map((e) => (e.id === id ? { ...e, ...updatedData } : e));
    setLocalData(STORAGE_KEY, updated);
    return updated.find((e) => e.id === id);
  },

  createExpert: async (expertData) => {
    const experts = getLocalData(STORAGE_KEY, initialExperts);
    const newExpert = {
      ...expertData,
      id: `exp-${Date.now()}`,
      avatar: expertData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
      profileStatus: "Published",
      status: "Active",
      services: expertData.services || []
    };
    experts.push(newExpert);
    setLocalData(STORAGE_KEY, experts);
    return newExpert;
  },

  addService: async (expertId, newService) => {
    const experts = getLocalData(STORAGE_KEY, initialExperts);
    const serviceEntry = {
      ...newService,
      id: `srv-${Date.now()}`
    };
    const updated = experts.map((e) => {
      if (e.id === expertId) {
        const currentServices = e.services || [];
        const currentOffered = e.servicesOffered || [];
        const updatedOffered = currentOffered.includes(newService.serviceType)
          ? currentOffered
          : [...currentOffered, newService.serviceType];
        return {
          ...e,
          services: [serviceEntry, ...currentServices],
          servicesOffered: updatedOffered
        };
      }
      return e;
    });
    setLocalData(STORAGE_KEY, updated);
    return serviceEntry;
  },

  updateService: async (expertId, serviceId, updatedService) => {
    const experts = getLocalData(STORAGE_KEY, initialExperts);
    const updated = experts.map((e) => {
      if (e.id === expertId) {
        const updatedServices = (e.services || []).map((s) => (s.id === serviceId ? { ...s, ...updatedService } : s));
        const updatedOffered = [...new Set(updatedServices.map((s) => s.serviceType))];
        return {
          ...e,
          services: updatedServices,
          servicesOffered: updatedOffered
        };
      }
      return e;
    });
    setLocalData(STORAGE_KEY, updated);
    return updated.find((e) => e.id === expertId);
  },

  deleteService: async (expertId, serviceId) => {
    const experts = getLocalData(STORAGE_KEY, initialExperts);
    const updated = experts.map((e) => {
      if (e.id === expertId) {
        const updatedServices = (e.services || []).filter((s) => s.id !== serviceId);
        const updatedOffered = [...new Set(updatedServices.map((s) => s.serviceType))];
        return {
          ...e,
          services: updatedServices,
          servicesOffered: updatedOffered
        };
      }
      return e;
    });
    setLocalData(STORAGE_KEY, updated);
    return updated.find((e) => e.id === expertId);
  }
};