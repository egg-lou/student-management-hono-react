import { ApiService } from '@/api.ts'

export class ProfessorService {
    private apiService: ApiService

    constructor() {
        this.apiService = new ApiService()
    }

    async getProfessors() {
        try {
            return this.apiService
                .request('GET', '/professors', null)
                .then((response) => {
                    return response.data
                })
        } catch (error) {
            return Promise.reject(error)
        }
    }
}
