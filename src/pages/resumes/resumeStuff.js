import React,{useEffect,useState} from 'react';
import style from   '../../styles/resumeStuff.module.css';
import {db}  from '../../../firebaseConfig.js';
import {updateDoc, doc, getDoc} from 'firebase/firestore';
import jsPDF from 'jspdf';

const resumeStuff = () => {


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

     
    const handleDownload = () => {
        var doc = new jsPDF('l','px','letter');
        doc.html(document.querySelector("#resume"),{
          callback : function(pdf){
            pdf.save("Resume.pdf")
          }
        })
  
        
  
  
      };


  return (
    <div className={style.container} >
<div className={`${style.relablock} ${style.page}`} id='resume'>
    <div className={`${style.relablock} ${style.topBar}`}>
        <div className={`${style.caps} ${style.name}`}><div classname="abs-center">{Info?.FirstName} {Info?.LastName}</div></div>
    </div>
    <div className={style.sidebar}>

        <p>{Info?.City}, {Info?.Country} {Info?.ZipCode}</p>
        <p>{Info?.Phone}</p>
        <p>{Info?.Email}</p><br />

        {Info?.OtherLinks.map((item,index)=>{
                    return(
                        <div className={style.divSocial} key={index}>
                            <a className={`${style.relablock} ${style.social}`} target="_blank" href={item.SocialLink}><p>{item.NameWebsite}</p></a>
                        </div>
                    )
                })}
        <p className={`${style.relablock} ${style.caps} ${style.sideheader}`}>Expertise</p>
        {Info?.Skills.map((item,index)=>{
                        return(
                            <div  key={index}>
                                <p className={`${style.relablock} ${style.listThing}`}>{item}</p>
                            </div>
                        )
                    })}
        <p className={`${style.relablock} ${style.caps} ${style.sideheader}`}>Education</p>
        <div className={style.wrap}> 
            <p className={`${style.relablock} ${style.listThing}`}>{Info?.SchoolName}</p>
            <p className={`${style.relablock} ${style.listThing}`}>{Info?.Degree}</p>
            <p className={`${style.relablock} ${style.listThing}`}>{Info?.FieldStudy}</p>
            <p className={`${style.relablock} ${style.listThing}`}>{Info?.Discription}</p></div>
       
    </div>
    <div className={`${style.relablock} ${style.contentContainer} `}>
        <h2 className={`${style.relablock} ${style.caps} ${style.title}`}>{Info?.Profession}</h2>
        <div className={`${style.relablock} ${style.separator} `}></div>
        <div className={`${style.relablock} ${style.caps} ${style.greyeds}`}>Profile</div>
        <p className={style.longmargin}>
            {Info?.ProfileSummary}
        </p>
        <div className={`${style.relablock} ${style.caps} ${style.greyeds}`}>Experience</div>

        {Info?.WorkExperience.map((item,index)=>{
                return(
                    <>
                        <h3 className={style.h3}>Job #{index+1}</h3>
                        <p className={style.light}>{item.JobPurpose}</p>
                        <p className={style.justified}>{item.JobDescription}</p>
                    </>
                )
            })}

    </div>
</div>

<button onClick={handleDownload}> Download </button>

</div>
  )
}

export default resumeStuff