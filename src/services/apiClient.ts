export interface ConsultationRequest {
    id: string;
    date: string;
    name: string;
    contact: string;
    address: string;
    serviceType: string;
    message: string;
    status?: 'new' | 'done';
}

const STORAGE_KEY = 'consultation_requests';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const apiClient = {
    // Get all consultations
    getConsultations: async (): Promise<ConsultationRequest[]> => {
        await delay(500); // Simulate network latency
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    // Submit a new consultation
    submitConsultation: async (request: Omit<ConsultationRequest, 'id' | 'date' | 'status'>): Promise<ConsultationRequest> => {
        await delay(800);
        const newRequest: ConsultationRequest = {
            id: Date.now().toString(),
            date: new Date().toLocaleString(),
            status: 'new',
            ...request
        };

        const existingData = await apiClient.getConsultations();
        const newData = [newRequest, ...existingData];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

        return newRequest;
    },

    // Toggle status (new <-> done)
    toggleConsultationStatus: async (id: string): Promise<void> => {
        await delay(300);
        const requests = await apiClient.getConsultations();
        const newRequests = requests.map(req => {
            if (req.id === id) {
                return { ...req, status: req.status === 'done' ? 'new' : 'done' } as ConsultationRequest;
            }
            return req;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRequests));
    },

    // Delete a single consultation
    deleteConsultation: async (id: string): Promise<void> => {
        await delay(400);
        const requests = await apiClient.getConsultations();
        const newRequests = requests.filter(req => req.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRequests));
    },

    // Delete multiple consultations
    deleteMultipleConsultations: async (ids: string[]): Promise<void> => {
        await delay(500);
        const requests = await apiClient.getConsultations();
        const newRequests = requests.filter(req => !ids.includes(req.id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newRequests));
    },

    // Clear all data (Admin use only)
    clearAllConsultations: async (): Promise<void> => {
        await delay(500);
        localStorage.removeItem(STORAGE_KEY);
    }
};
