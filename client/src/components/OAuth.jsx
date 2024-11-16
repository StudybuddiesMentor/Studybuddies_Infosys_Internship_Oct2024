import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';


export default function OAuth() {
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
      
            const result = await signInWithPopup(auth, provider);
      
            const res = await fetch('/api/auth/google', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
              }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/main-page');
          } catch (error) {
            console.log('could not sign in with google', error);
          }
    }

  return (
    <button onClick={handleGoogleClick} className='btn-submit2'>Continue with google</button>
  )
}
