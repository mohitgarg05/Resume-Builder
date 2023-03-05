import React,{useState,useEffect} from 'react'
import style from '../../styles/summary.module.css';
import TextField from '@mui/material/TextField';
import {db}  from '../../../firebaseConfig.js';
import {updateDoc, doc} from 'firebase/firestore';
const summary = (props) => {


  const [SummaryDis, setSummaryDis] = useState()
  const [Id, setId] = useState()

  const handleSubmit = async(e)=>{

    e.preventDefault();

    const objeData = { ProfileSummary : SummaryDis }

    const cityRef = doc(db, 'users', Id);
    await updateDoc(cityRef, objeData);



  }

  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setId(token);
        
  }, [])


  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <TextField
            id="outlined-multiline-static"
            label="Featuring a professional summary introduces you to hiring managers."
            multiline
            rows={18}
            value={SummaryDis}
            onChange = {(e)=>setSummaryDis(e.target.value)}
            className={style.disInput}
          
          />
      </div>
      <div className={style.nextButton}>
                <button onClick={handleSubmit}>Submit</button>
            </div>
    </div>
  )
}

export default summary