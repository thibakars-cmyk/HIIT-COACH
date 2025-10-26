import React, {useEffect, useState} from 'react'
import { supabase } from '../supabaseClient'

export default function Profile(){
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({})

  useEffect(()=>{
    supabase.auth.getSession().then(r=>setUser(r.data.session?.user || null))
    const { data: listener } = supabase.auth.onAuthStateChange((event, session)=>{
      setUser(session?.user || null)
      if(session?.user) loadUserProfile(session.user)
    })
    return ()=> listener?.subscription?.unsubscribe?.()
  },[])

  async function signIn(){
    if(!email) return alert('Enter email to sign in')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if(error) return alert(error.message)
    alert('Check your email for a login link.')
  }

  async function loadUserProfile(u){
    const { data, error } = await supabase.from('users').select('*').eq('id', u.id).single()
    if(data) setProfile(data)
  }

  async function saveProfile(){
    if(!user) return alert('Sign in first (email) to save profile to Supabase.')
    const payload = { id: user.id, name: profile.name, username: profile.username, email: profile.email || user.email, height: profile.height, weight: profile.weight, units: profile.units }
    const { error } = await supabase.from('users').upsert(payload)
    if(error) return alert('Save error: ' + error.message)
    alert('Profile saved to Supabase.')
  }

  return (
    <div className="card">
      <h2>Profile / Auth</h2>
      {!user && (
        <div>
          <label>Email for sign-in (magic link)</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
          <div style={{marginTop:8}}>
            <button onClick={signIn}>Send Sign-in Link</button>
          </div>
        </div>
      )}
      {user && (
        <div>
          <div>Signed in: <strong>{user.email}</strong></div>
          <label>Name<input value={profile.name||''} onChange={e=>setProfile({...profile,name:e.target.value})} /></label>
          <label>Username<input value={profile.username||''} onChange={e=>setProfile({...profile,username:e.target.value})} /></label>
          <label>Height<input value={profile.height||''} onChange={e=>setProfile({...profile,height:e.target.value})} /></label>
          <label>Weight<input value={profile.weight||''} onChange={e=>setProfile({...profile,weight:e.target.value})} /></label>
          <label>Units<select value={profile.units||'lbs'} onChange={e=>setProfile({...profile,units:e.target.value})}><option value='lbs'>lbs</option><option value='kg'>kg</option></select></label>
          <div style={{marginTop:8}}><button onClick={saveProfile}>Save to Supabase</button></div>
          <div style={{marginTop:8}}><button onClick={async ()=>{await supabase.auth.signOut();alert('Signed out')}}>Sign out</button></div>
        </div>
      )}
    </div>
  )
}
