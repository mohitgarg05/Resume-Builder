import React,{useEffect,useState} from 'react'
import style from '../../styles/sampleResume.module.css';
import {db}  from '../../../firebaseConfig.js';
import {updateDoc, doc, getDoc} from 'firebase/firestore';
const sampleResume = () => {

    const [Info, setInfo] = useState()
    
    useEffect(() => {
    
                getData();
        }, [])


    const getData = async() => {
      const token = localStorage.getItem('accessToken');
        if(!token) return;

        const docRef = doc(db, "users",token );
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data())
        const final = docSnap.data()
        setInfo(final);
    }






  return (

<div className={style.container}>
  <div className={style.header}>
    <div className={style.fullname}>
      <span className={style.firstname}>{Info?.FirstName}</span> 
      <span className={style.lastname}>{Info?.LastName}</span>
    </div>
    <div className={style.contactinfo}>
      <span className={style.email}>Email: </span>
      <span className={style.emailval}>{Info?.Email}</span>
      <span className={style.separator}></span>
      <span className={style.phone}>Phone: </span>
      <span className={style.phoneval}>{Info?.Phone}</span>
    </div>
    
    <div className={style.about}>
      <span className={style.position}>{Info?.Profession} </span>
      <span className={style.desc}>
      {Info?.ProfileSummary}
      </span>
    </div>
  </div>
   <div className={style.details}>
    <div className={style.section}>
      <div className={style.section__title}>Experience</div>
      <div className={style.section__list}>
       
            {Info?.WorkExperience.map((item,index)=>{
                return(
                    <div className={style.section__listitem} key={index}>
                        <div className={style.left}>
                            <div className={style.name}>{item.JobPurpose}</div>
                            <div className={style.addr}>{item.JobLocation}</div>
                            <div className={style.duration}>{item.StartMonth} {item.StartYear} - {item.EndMonth} {item.EndYear}</div>
                        </div>
                        <div className={style.right}>
                            <div className={style.name}>{item.JobTittle}</div>
                            <div className={style.desc}>{item.JobDescription}</div>
                        </div>
                    </div>
                )
            })}

      </div>
    </div>
    <div className={style.section}>
      <div className={style.section__title}>Education</div>
      <div className={style.section__list}>
        <div className={style.section__listitem}>
          <div className={style.left}>
            <div className={style.name}>{Info?.SchoolName}</div>
            <div className={style.addr}>{Info?.SchoolLoc}</div>
            <div className={style.duration}>{Info?.StartMonth} {Info?.StartYear} - {Info?.EndMonth} {Info?.EndYear}</div>
          </div>
          <div className={style.right}>
            <div className={style.name}>{Info?.Degree}</div>
            <div className={style.desc}>{Info?.Discription}</div>
          </div>
        </div>
      </div>
      
  </div>
     <div className={style.section}>
       <div className={style.section__title}>Skills</div>
        <div className={style.skills}>
            <div className={style.skills__item}>
                <div className={style.left}>
                    <ul className={style.listSkills}>
                    {Info?.Skills.map((item,index)=>{
                        return(
                            <div key={index}>
                                <li> <div className={style.name}>{item}</div></li>
                            </div>
                        )
                    })}
                       
                    </ul>
                </div>
            </div>
        </div>         
       </div>
     <div className={style.section}>
     <div className={style.section__title}>
       Other
       </div>
       <div className={style.section__list}>
         <div className={style.section__listitem}>
         <div className={style.sectionList}>
            {Info?.OtherLinks.map((item,index)=>{
                    return(
                        <div className={style.social} key={index}>
                            <a className={style.linkA} target="_blank" href={item.SocialLink}><p>{item.NameWebsite}</p></a>
                        </div>
                    )
                })}
         </div>
          
         </div>
       </div>
     </div>
     </div>
  </div>

  )
}

export default sampleResume