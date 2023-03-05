import React,{useState,useEffect} from 'react'
import style from '../../styles/education.module.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {auth , provider, db}  from '../../../firebaseConfig.js';
import {getFirestore,setDoc,updateDoc, doc, getDoc} from 'firebase/firestore';
const education = (props) => {

  const [Input, setInput] = useState({
    schoolName:'',
    schoolLocation:'',
    startMonth:'',
    startYear:'',
    endMonth:'',
    endYear:'',
    degree:'',
    field:'',
    discription:''});

  const [Id, setId] = useState()


  const Months = [
    {
      value: 'January',
      label: 'January',
    },
    {
      value: 'February',
      label: 'February',
    },
    {
      value: 'March',
      label: 'March',
    },
    {
      value: 'April',
      label: 'April',
    },
    {
      value: 'May',
      label: 'May',
    },
    {
      value: 'June',
      label: 'June',
    },
    {
      value: 'July',
      label: 'July',
    },
    {
      value: 'August',
      label: 'August',
    },
    {
      value: 'September',
      label: 'September',
    },
    {
      value: 'October',
      label: 'October',
    },
    {
      value: 'November',
      label: 'November',
    },
    {
      value: 'December',
      label: 'December',
    }
  ];



  const handleInput = (e)=>{
    
    const { name, value } = e.target;
    setInput({
      ...Input,
      [name]: value,
    });

  }
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setId(token);
        
  }, [])

  

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const objeData = { 
    "SchoolName": Input.schoolName ,
    "SchoolLoc" : Input.schoolLocation,
    "StartMonth" : Input.startMonth,
    'StartYear' : Input.startYear,
    "EndMonth" : Input.endMonth,
    "EndYear" : Input.endYear,
    "Degree" : Input.degree,
    "FieldStudy" : Input.field,
    "Discription" : Input.discription
  }
    

    const cityRef = doc(db, 'users', Id);
    await updateDoc(cityRef, objeData);

    props.handle();

  }


  

  return (
    <div className={style.container}>
   
      <div className={style.schoolDetail}>
        <TextField id="standard-basic" 
              className={style.schoolName} 
              label="School Name" 
              variant="standard"
              onChange={handleInput}
              name='schoolName'
              value={Input.schoolName}  />
        <TextField id="standard-basic" 
          className={style.schoolLocation} 
          label="School Location" 
          variant="standard"
          onChange={handleInput}
          name="schoolLocation" 
          value={Input.schoolLocation} />
      </div>
      <div className={style.StartEnd}>
            <TextField
                  id="outlined-select-currency"
                  onChange={handleInput}
                  select
                  label="Start Month"
                  defaultValue="Start Month"
                  name='startMonth'
                  className={style.startMonth}
                  value = {Input.startMonth}
                >
                  {Months.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField id="standard-basic" 
                  className={style.startYear} 
                  onChange={handleInput}
                  label="Start Year" 
                  variant="standard"
                  name='startYear'
                  value={Input.startYear}  />
      </div>
      <div className={style.StartEnd}>
            <TextField
                  id="outlined-select-currency"
                  onChange={handleInput}
                  select
                  label="End Month"
                  defaultValue="Start Month"
                  name='endMonth'
                  value={Input.endMonth}
                  className={style.startMonth}
                
                >
                  {Months.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField id="standard-basic" 
                  className={style.startYear} 
                  label="End Year" 
                  variant="standard"
                  name='endYear'
                  value={Input.endYear}
                  onChange={handleInput}  />
      </div>
      <div className={style.degree}>
        <TextField id="standard-basic" 
            className={style.degreeDetail} 
            label="Degree" 
            variant="standard"
            name='degree'
            value={Input.degree}
            onChange={handleInput}  />
      </div>
      <div className={style.field}>
        <TextField id="standard-basic" 
            className={style.fieldStudy} 
            label="Field of Study" 
            variant="standard"
            name='field'
            value={Input.field}
            onChange={handleInput}  />
      </div>
      <div className={style.dis}>
        <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={12}
          
            className={style.disInput}
            name='discription'
            value={Input.discription}
            onChange={handleInput}
          />
      </div>
      <div className={style.nextButton}>
                <button onClick={handleSubmit} >Next, Skills</button>
            </div>
    
    </div>
  )
}

export default education