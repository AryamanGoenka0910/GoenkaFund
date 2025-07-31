"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { 
  User, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  AuthError
} from 'firebase/auth'
import { auth } from './firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (error: unknown) {
      console.error('Sign in error:', error)
      const authError = error as AuthError
      return { 
        success: false, 
        error: authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password'
          ? 'Invalid email or password'
          : 'An error occurred during sign in'
      }
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (error: unknown) {
      console.error('Sign up error:', error)
      const authError = error as AuthError
      return { 
        success: false, 
        error: authError.code === 'auth/email-already-in-use'
          ? 'Email already in use'
          : authError.code === 'auth/weak-password'
          ? 'Password should be at least 6 characters'
          : 'An error occurred during sign up'
      }
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error: unknown) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 