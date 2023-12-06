import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FileImage } from 'phosphor-react'
import { auth, db, storage } from '../../firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "firebase/auth";
import {
  ref, 
  uploadBytesResumable, 
  getDownloadURL 
} from "firebase/storage";

export const Register = () => {

  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

  try{
    const res = await createUserWithEmailAndPassword(auth, email, password) 

    const storageRef = ref(storage, displayName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        setError(error)
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(
            async (downloadURL) => {
              await updateProfile(res.user, {
                displayName,
                photoURL: downloadURL
              })
              await setDoc(doc(db, "users", res.user.uid),{
                uid: res.user.uid,
                displayName,
                email,
                photoURL:downloadURL
              })
              await setDoc(doc(db, "usersChat", res.user.uid),{})
              navigate('/943/cart')
            }  
          );
      }
    ); 
  }catch(err){
    setError(err)
  }
    
  }
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>94/3</span>
        <span className='title'>Signup</span>
        <form onSubmit={ handleSubmit }>
          <input type='text' placeholder='Name' />
          <input type='email'placeholder='Email Address' />
          <input type='password' placeholder='Password' />
          <input type='file' id='file' style={{display: 'none'}} />
          <label htmlFor='file'>
            <FileImage size={32} />
            <span>Add a profile photo</span>
          </label>
          <button>Singup</button>
          {error && <span style={{color: 'red'}}>Something went wrong, please try again...</span>}
        </form>
        <p>Already have an account? <Link to='/943/login'>Signin</Link></p>
      </div>
    </div>
  )
}

