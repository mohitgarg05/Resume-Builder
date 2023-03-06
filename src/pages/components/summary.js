import React,{useState,useEffect} from 'react'
import style from '../../styles/summary.module.css';
import TextField from '@mui/material/TextField';
import {db}  from '../../../firebaseConfig.js';
import {updateDoc, doc,getDoc} from 'firebase/firestore';
const summary = (props) => {


  const [SummaryDis, setSummaryDis] = useState()
  const [Id, setId] = useState()

  const handleSubmit = async(e)=>{

    e.preventDefault();

    const objeData = { ProfileSummary : SummaryDis }

    const cityRef = doc(db, 'users', Id);
    await updateDoc(cityRef, objeData);


    props.handle();


  }

  
  useEffect(() => {

     getData();
        
  }, [])


  const getData = 
    async() => {
      const token = localStorage.getItem('accessToken');
      setId(token);
      const docRef = doc(db, "users",token);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data())
      const final = docSnap.data()
      if(final)
      setSummaryDis(final.ProfileSummary)
  }


  return (
    <div className={style.container}>
      <div className={style.wrapper}>
      <p style={{marginLeft:"5px",padding:"10px"}}>Featuring a professional summary introduces you to hiring managers.</p>
        <TextField
            id="outlined-multiline-static"
            label=""
            multiline
            rows={18}
            value={SummaryDis}
            onChange = {(e)=>setSummaryDis(e.target.value)}
            className={style.disInput}
          
          />
      </div>
      <div className={style.nextButton}>
                <button onClick={handleSubmit}>Next, Others</button>
            </div>
    </div>
  )
}

export default summary