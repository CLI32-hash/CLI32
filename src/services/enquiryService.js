import { getLocalData, setLocalData } from './api';
import { initialEnquiries } from '../data/enquiries';

const STORAGE_KEY = 'fop_enquiries';

export const enquiryService = {
  getEnquiries: async () => {
    return getLocalData(STORAGE_KEY, initialEnquiries);
  },

  getEnquiriesByExpert: async (expertId) => {
    const enquiries = getLocalData(STORAGE_KEY, initialEnquiries);
    return enquiries.filter((e) => e.expertId === expertId);
  },

  getEnquiriesByInstitution: async (institutionId) => {
    const enquiries = getLocalData(STORAGE_KEY, initialEnquiries);
    return enquiries.filter((e) => e.institutionId === institutionId);
  },

  getEnquiryById: async (id) => {
    const enquiries = getLocalData(STORAGE_KEY, initialEnquiries);
    return enquiries.find((e) => e.id === id) || null;
  },

  createEnquiry: async (enquiryData) => {
    const enquiries = getLocalData(STORAGE_KEY, initialEnquiries);
    const newEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      status: 'NEW',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      createdAt: new Date().toISOString(),
      responseMessage: ''
    };
    const updated = [newEnquiry, ...enquiries];
    setLocalData(STORAGE_KEY, updated);
    return newEnquiry;
  },

  markAsViewed: async (enquiryId) => {
    const enquiries = getLocalData(STORAGE_KEY, initialEnquiries);
    const updated = enquiries.map((e) => {
      if (e.id === enquiryId && e.status === 'NEW') {
        return { ...e, status: 'VIEWED' };
      }
      return e;
    });
    setLocalData(STORAGE_KEY, updated);
    return updated.find((e) => e.id === enquiryId);
  },

  respondToEnquiry: async (enquiryId, responseMessage) => {
    const enquiries = getLocalData(STORAGE_KEY, initialEnquiries);
    const updated = enquiries.map((e) => {
      if (e.id === enquiryId) {
        return { ...e, status: 'RESPONDED', responseMessage: responseMessage || 'Thank you for your enquiry. I will connect with your department shortly.' };
      }
      return e;
    });
    setLocalData(STORAGE_KEY, updated);
    return updated.find((e) => e.id === enquiryId);
  },

  closeEnquiry: async (enquiryId) => {
    const enquiries = getLocalData(STORAGE_KEY, initialEnquiries);
    const updated = enquiries.map((e) => {
      if (e.id === enquiryId) {
        return { ...e, status: 'CLOSED' };
      }
      return e;
    });
    setLocalData(STORAGE_KEY, updated);
    return updated.find((e) => e.id === enquiryId);
  },

  updateEnquiryStatus: async (enquiryId, status) => {
    const enquiries = getLocalData(STORAGE_KEY, initialEnquiries);
    const updated = enquiries.map((e) => (e.id === enquiryId ? { ...e, status } : e));
    setLocalData(STORAGE_KEY, updated);
    return updated.find((e) => e.id === enquiryId);
  }
};