import { useEffect } from 'react'
import './App.css'
import { ProfessorService } from '@/services/Professor.ts'

function App() {
    const fetchProfessors = async () => {
        try {
            const professorService = new ProfessorService()
            const response = await professorService.getProfessors()
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchProfessors()
    }, [])

    return <></>
}

export default App
