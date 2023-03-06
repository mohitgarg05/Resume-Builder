import React,{useState,useEffect} from 'react'
import style from '../../styles/workExp.module.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import  {db}  from '../../../firebaseConfig.js';
import {updateDoc, doc, getDoc} from 'firebase/firestore';

const WorkExp = (props) => {

  const [numsDiv, setnumsDiv] = useState(1)
  const [formData, setFormData] = useState([{JobTittle: "", JobPurpose: "", JobLocation: "", StartMonth: "", StartYear: "", EndMonth:"", EndYear:"", JobDescription:"" }]);
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


useEffect(() => {
   
        getData();
  }, [])


  const getData = 
    async() => {
      const token = localStorage.getItem('accessToken');
      setId(token);
      const docRef = doc(db, "users",token);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data().WorkExperience)
      const final = docSnap.data().WorkExperience;
      if(final){
        setnumsDiv(final.length);
        setFormData([...final])
      }
     
  }


  const handleSubmit = async(e)=>{
    e.preventDefault();

    const objeData = { 
      WorkExperience : [...formData]
  }
    

    const cityRef = doc(db, 'users', Id);
    await updateDoc(cityRef, objeData);

    props.handle();

  }
  

  const handleAddInput = ()=>{
    setnumsDiv(numsDiv+1);
    setFormData([...formData, { JobTittle: "", JobPurpose: "", JobLocation: "", StartMonth: "", StartYear: "", EndMonth:"", EndYear:"", JobDescription:"" }]);
  }

  const handleInputChange = (e, index, fieldName) => {
    const newFormData = [...formData];
    newFormData[index][fieldName] = e.target.value;
    setFormData(newFormData);
  }

  const  handleDeleteFields = (index)=>{
    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
    setnumsDiv(numsDiv-1);
  }

  return (
    <div className={style.container}>

        {Array.from({length:numsDiv}).map((_,index)=>{
          return(
            <div key={index}>
                
                <div className={style.jobDetail}>
                  <TextField id="standard-basic" 
                        className={style.jobTitle} 
                        label="WHAT WAS YOUR TITLE?" 
                        variant="standard" value={formData[index].JobTittle} onChange={(e) => handleInputChange(e, index, "JobTittle")}  />
                  <TextField id="standard-basic" 
                        className={style.jobTitle} 
                        label="WHO DID YOU DO THIS FOR?" 
                        variant="standard"
                        value={formData[index].JobPurpose} onChange={(e) => handleInputChange(e, index, "JobPurpose")}  />
                  <DeleteIcon  onClick={()=>handleDeleteFields(index)}
                  style={{height:"27px",width:"28px",marginLeft:"20px",cursor:"pointer",color:"grey"}} className={style.deleteIcon} />
                </div>
                <div className={style.jobLocation}>
                  <TextField id="standard-basic" 
                        className={style.jobTitle} 
                        label="Location *" 
                        variant="standard"
                        value={formData[index].JobLocation} onChange={(e) => handleInputChange(e, index, "JobLocation")}  />
                </div>
                <div className={style.startendJob}>
                    <TextField
                        id="outlined-select-currency"
                        select
                        label="Start Month"
                        defaultValue="Start Month"
                        className={style.startMonth}
                        value={formData[index].StartMonth} onChange={(e) => handleInputChange(e, index, "StartMonth")}
                      >
                        {Months.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField id="standard-basic" 
                        label="Start Year" 
                        variant="standard"
                        value={formData[index].StartYear} onChange={(e) => handleInputChange(e, index, "StartYear")} />


                      <TextField
                          id="outlined-select-currency"
                          select
                          label="End Month"
                          defaultValue="End Month"
                          className={style.startMonth}
                          value={formData[index].EndMonth} onChange={(e) => handleInputChange(e, index, "EndMonth")}
                        >
                          {Months.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField id="standard-basic" 
                          label="End Year" 
                          variant="standard"
                          value={formData[index].EndYear} onChange={(e) => handleInputChange(e, index, "EndYear")} />
              </div>
              <div className={style.jobDisc}>
              <TextField
                    id="outlined-multiline-static"
                    label="Now let's describe what you did."
                    multiline
                    rows={10}
                    className={style.disInput}
                    value={formData[index].JobDescription} onChange={(e) => handleInputChange(e, index, "JobDescription")}
                  />
              </div>

            {numsDiv>1?  <div className={style.breakingLine}></div>:<></>}
            </div>
          )
        })}

        <div className={style.addMoreSkills} onClick={handleAddInput}>
          <AddIcon/><li>Add More</li>
        </div>
        <div className={style.nextButton}>
                <button onClick={handleSubmit} >Next, Projects</button>
            </div>
        

    </div>
  )
}

export default WorkExp