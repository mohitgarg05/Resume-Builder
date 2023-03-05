import React,{useState,useEffect} from 'react'
import style from '../../styles/basicInfo.module.css';
import TextField from '@mui/material/TextField';
import {db}  from '../../../firebaseConfig.js';
import {updateDoc, doc, getDoc} from 'firebase/firestore';


const basicInfo = (props) => {

 

  const [Input, setInput] = useState({
                          firstName:'',
                          lastName:'',
                          profession:'',
                          city:'',
                          country:'',
                          code:'',
                          phone:'',
                          mail:''});

    const [Id, setId] = useState();


  const handleInput = (e)=>{

    const { name, value } = e.target;
    console.log(value)
    setInput({
      ...Input,
      [name]: value,
    });

  }


  useEffect(() => {
   
        getData();
  }, [])


  const getData = 
    async() => {
      const token = localStorage.getItem('accessToken');
      const docRef = doc(db, "users",token);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data())
      const final = docSnap.data()
      if(final)
      setInput({firstName:final.FirstName , lastName:final.LastName , 
        profession:final.Profession , city:final.City , country:final.Country, 
        code:final.ZipCode , phone:final.Phone , mail:final.Email
      })
  }
  

  

  const handleSubmit = async(e)=>{
    e.preventDefault();

    const objeData = { "FirstName": Input.firstName ,
    "LastName" : Input.lastName,
    "Profession" : Input.profession,
    'City' : Input.city,
    "Country" : Input.country,
    "ZipCode" : Input.code ,
    "Phone" : Input.phone,
    "Email" : Input.mail
  }
    

    if(ShowLink && selectData && SocialLink){
      objeData.link = SocialLink
    }

    const cityRef = doc(db, 'users', props.userId);
   await updateDoc(cityRef, objeData);

    props.handle();

  }

  return (
    <div className={style.container}>
          <div className={style.name}>
            <TextField id="standard-basic" 
              className={style.firstName} 
              label="First Name" 
              variant="standard" 
              name='firstName' value={Input.firstName} onChange={handleInput} />
            <TextField id="standard-basic" 
              className={style.lastName} 
              label="Last Name" 
              variant="standard" 
              name = 'lastName' value={Input.lastName} onChange={handleInput} />
          </div>
          <div className={style.field}>
            <TextField id="standard-basic" 
              className={style.profession} 
              label="Profession e.g. Software Engineer" 
              variant="standard" 
              name='profession' value={Input.profession} onChange={handleInput}/>
          </div>
          <div className={style.address}>
            <TextField id="standard-basic" 
              className={style.city} 
              label="City" 
              variant="standard" 
              name='city' value={Input.city} onChange={handleInput} />
            <TextField id="standard-basic" 
              className={style.country} 
              label="Country" 
              variant="standard" 
              name='country' value={Input.country} onChange={handleInput} />
            <TextField 
              id="standard-basic" 
              className={style.code} 
              label="Pin Code e.g. 110034" 
              variant="standard" 
              name='code' value={Input.code} onChange={handleInput} /> 
          </div>
          <div className={style.contact}>
            <TextField id="standard-basic" 
              className={style.phone} 
              label="Phone e.g. +91 22 2666 8886" 
              variant="standard" 
              name='phone' value={Input.phone} onChange={handleInput} />
            <TextField id="standard-basic" 
              className={style.email} 
              label="Email" 
              variant="standard" 
              name='mail' value={Input.mail} onChange={handleInput} />
          </div>
         
          <div className={style.nextButton}>
                <button onClick={handleSubmit}>Next,Work Experience</button>
            </div>
         
    </div>
  )
}

export default basicInfo