import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const fetchProfessors = async () => {
        try {
            const response = await fetch(
                'http://localhost:3000/api/professors',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            const data = await response.json()
            console.log(data)
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
