import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import MenuItem from '@mui/material/MenuItem';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import style from '../../styles/others.module.css';
import {auth , provider, db}  from '../../../firebaseConfig.js';
import {getFirestore,setDoc,updateDoc, doc, getDoc} from 'firebase/firestore';


const others = (props) => {


    const [numDiv, setnumDiv] = useState(1)
    const [formData, setFormData] = useState([{NameWebsite:"",SocialLink:""}]);
    const [Id, setId] = useState()

  const Options = [
    {
      value: 'Twitter',
      label: 'Twitter',
    },
    {
      value: 'LinkedIn',
      label: 'LinkedIn',
    },
    {
      value: 'Website',
      label: 'Website',
    },
    {
      value: 'Medium',
      label: 'Medium',
    },
    {
      value: 'Github',
      label: 'Github',
    },
    {
      value: 'Other',
      label: 'Other',
    }
  ];


  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setId(token);
        
  }, [])


  const addMore = ()=>{
    setnumDiv(numDiv+1);
    setFormData([...formData, { NameWebsite:"",SocialLink:"" }]);
  }



  const handleInputChange = (e, index, fieldName) => {
    const newFormData = [...formData];
    newFormData[index][fieldName] = e.target.value;
    setFormData(newFormData);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const objeData = { 
      OtherLinks : [...formData]
  }
    

    const cityRef = doc(db, 'users', Id);
    // await updateDoc(cityRef, objeData);

    window.location.href = "./components/selectTemplate"

  }


  const handleDelete=(index)=>{

    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
    setnumDiv(numDiv-1);
  }

  return (
   <div className={style.container}> 

    {Array.from({length:numDiv}).map((_,index)=>{
      return(
        <div className={style.socialMediaLinks}>
            <div className={style.link1}>
                    <TextField
                  id="outlined-select-currency"
                  select
                  label="Social Media"
                  defaultValue="Twitter"
                  className={style.socialMediaLink1}
                  value={formData[index].NameWebsite} onChange={(e) => handleInputChange(e, index, "NameWebsite")}
                  
                >
                  {Options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField id="standard-basic" 
                  className={style.linkSocial1} 
                  label="Social Link" 
                  variant="standard"
                  value={formData[index].SocialLink} onChange={(e) => handleInputChange(e, index, "SocialLink")} />

                <DeleteIcon style={{height:"27px",width:"30px",marginLeft:"-50px",marginTop:"15px",cursor:"pointer",color:"grey"}} 
                onClick={()=>handleDelete(index)} className={style.deleteIcon} />
            </div>
          </div>
      )
    })}

   <div className={style.addSocialLinks} onClick={addMore}>
             <AddIcon/> <li>Add Social link</li>
          </div>

          <div className={style.nextButton}>
                <button onClick={handleSubmit} >Submit</button>
            </div>

   </div>
  )
}

export default others