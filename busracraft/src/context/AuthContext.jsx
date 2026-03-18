import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { onSnapshot, doc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { createUserProfile } from '../utils/userHelpers'

const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (!firebaseUser) {
        setUserProfile(null)
        setLoading(false)
        return
      }
      try {
        await createUserProfile(firebaseUser.uid, {
          displayName: firebaseUser.displayName || '',
          avatarUrl: firebaseUser.photoURL || '',
        })
      } catch { /* profile might already exist */ }
      setLoading(false)
    })

    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          return createUserProfile(result.user.uid, {
            displayName: result.user.displayName || '',
            avatarUrl: result.user.photoURL || '',
          })
        }
      })
      .catch(() => {})

    return () => unsubAuth()
  }, [])

  useEffect(() => {
    if (!user || !db) return
    const unsubProfile = onSnapshot(
      doc(db, 'users', user.uid),
      (snap) => {
        if (snap.exists()) {
          setUserProfile({ id: snap.id, ...snap.data() })
        }
      },
      () => {}
    )
    return () => unsubProfile()
  }, [user])

  const loginWithEmail = useCallback(async (email, password) => {
    if (!auth) throw new Error('Firebase yapılandırılmamış.')
    return signInWithEmailAndPassword(auth, email, password)
  }, [])

  const registerWithEmail = useCallback(async (email, password, displayName) => {
    if (!auth) throw new Error('Firebase yapılandırılmamış.')
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName) {
      await updateProfile(cred.user, { displayName })
    }
    await createUserProfile(cred.user.uid, {
      displayName: displayName || '',
      avatarUrl: '',
    })
    return cred
  }, [])

  const loginWithGoogle = useCallback(async () => {
    if (!auth) throw new Error('Firebase yapılandırılmamış.')
    await signInWithRedirect(auth, googleProvider)
  }, [])

  const logout = useCallback(async () => {
    if (!auth) return
    await signOut(auth)
  }, [])

  const isAuthenticated = !!user
  const isMember = userProfile?.role === 'member' || userProfile?.role === 'admin'
  const isVisitor = isAuthenticated && !isMember
  const isAdmin = userProfile?.role === 'admin'

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isAuthenticated,
        isMember,
        isVisitor,
        isAdmin,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
