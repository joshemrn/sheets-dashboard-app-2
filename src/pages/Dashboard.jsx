import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const { currentUser, logout, getIdToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchSheetData()
  }, [])

  const fetchSheetData = async () => {
    try {
      setLoading(true)
      setError('')

      const token = await getIdToken()

      if (!token) {
        throw new Error('No authentication token available')
      }

      const functionsUrl = import.meta.env.VITE_FUNCTIONS_URL
      const response = await fetch(`${functionsUrl}/getSheetData`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`)
      }

      const result = await response.json()
      setData(result.data || [])
    } catch (err) {
      setError('Failed to load data. Please try again later.')
      console.error('Error fetching sheet data:', err)
    } finally {
      setLoading(false)
    }
  }

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data
    
    const sorted = [...data].sort((a, b) => {
      const aVal = a[sortConfig.key] || ''
      const bVal = b[sortConfig.key] || ''
      
      const aNum = parseFloat(aVal)
      const bNum = parseFloat(bVal)
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum
      }
      
      const comparison = aVal.toString().localeCompare(bVal.toString())
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
    
    return sorted
  }, [data, sortConfig])

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return ' ↕'
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓'
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (err) {
      console.error('Failed to log out:', err)
    }
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Secure Dashboard</h1>
          <div className="header-actions">
            <span className="user-email">{currentUser?.email}</span>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="content-header">
            <h2>Live Sheet Data</h2>
            <button
              onClick={fetchSheetData}
              className="btn-refresh"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {loading && !error && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading data...</p>
            </div>
          )}

          {!loading && !error && data.length === 0 && (
            <div className="empty-state">
              <p>No data available</p>
            </div>
          )}

          {!loading && !error && data.length > 0 && (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    {data[0] && Object.keys(data[0]).map((header, index) => (
                      <th 
                        key={index} 
                        onClick={() => handleSort(header)}
                        className="sortable-header"
                      >
                        {header}
                        <span className="sort-icon">{getSortIcon(header)}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>Read-only access - Data updates in real-time</p>
      </footer>
    </div>
  )
}
