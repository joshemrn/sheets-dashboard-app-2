import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext({})

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sign up function
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  // Login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  // Google Sign In function
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  // Logout function
  const logout = () => {
    return signOut(auth)
  }

  // Reset password function
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  // Get ID token for authenticated API calls
  const getIdToken = async () => {
    if (currentUser) {
      return await currentUser.getIdToken()
    }
    return null
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    getIdToken
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
