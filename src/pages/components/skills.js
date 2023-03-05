import React,{useState,useEffect} from 'react'
import style from '../../styles/skills.module.css';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {auth , provider, db}  from '../../../firebaseConfig.js';
import {getFirestore,setDoc,updateDoc, doc, getDoc} from 'firebase/firestore';
const skills = (props) => {

  const [inputFields, setinputFields] = useState([''])
  const [ErrorMes, setErrorMes] = useState("")
  const [Id, setId] = useState()

  const handleAddInput = ()=>{
    setErrorMes("")
    const values = [...inputFields];
    values.push("");
    setinputFields(values);
  }



  
  const handleInputChange = (index, event) => {
    setErrorMes("")
    const values = [...inputFields];
    values[index] = event.target.value;
    setinputFields(values);
  };


  const handleDeleteFields = (index) => {

    if(inputFields.length === 1){
      setErrorMes("Add at least one skill");
      return;
    }

    const values = [...inputFields];
    values.splice(index, 1);
    setinputFields(values);
  };

  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setId(token);
        
  }, [])



  const handleSubmit = async(e)=>{
    e.preventDefault();

    const objeData = { 
      Skills : [...inputFields]
  }
    

    const cityRef = doc(db, 'users', Id);
    await updateDoc(cityRef, objeData);

    props.handle();

  }

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {inputFields.map((field,  index)=>{
          return(
            <>
              <div className={style.skillDiv} key={index}>
                <TextField id="standard-basic" 
                      className={style.skills} 
                      label="" 
                      value={field}
                      variant="standard" onChange={(event) => handleInputChange(index, event)}/>
                  <DeleteIcon  onClick={()=>handleDeleteFields(index)}
                  style={{height:"27px",width:"28px",marginLeft:"20px",cursor:"pointer",color:"grey"}} className={style.deleteIcon} />
                
              </div>
              <p className={style.error}>{ErrorMes}</p>
            </>
          )
        })}


        <div className={style.addMoreSkills} onClick={handleAddInput}>
          <AddIcon/><li>Add One more skill</li>
        </div>
      </div>

      <div className={style.nextButton}>
                <button onClick={handleSubmit} >Next, Summary</button>
            </div>

    
    </div>
  )
}

export default skills