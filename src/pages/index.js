import styles from '@/styles/Home.module.css'
import Resume from "../resume.svg"
import Image from 'next/image';
import {useState , useEffect} from 'react';
import BasicInfo from './components/basicInfo.js';
import WorkExp from './components/WorkExp';
import Skills from './components/skills';
import Education from './components/education';
import Others from './components/others';
import Summary from './components/summary';
import {doc , setDoc} from 'firebase/firestore';
import {auth , provider, db}  from '../../firebaseConfig.js';
export default function Home() {

  const [accessToken, setaccessToken] = useState();
  const [Id, setId] = useState();
  const [Index, setIndex] = useState(0)

  const signin = async()=>{
    
    await auth.signInWithPopup(provider).then(async(res) => {

      localStorage.setItem('accessToken', res.user._delegate.uid );
      setId(res.user._delegate.uid)
      setaccessToken(res.user._delegate.accessToken)
  

      const cityRef = doc(db, 'users', res.user._delegate.uid);
      if(!cityRef){
        await setDoc(cityRef,{
          uid : res.user._delegate.uid,
          mail : res.user._delegate.email,
          IsDataComplete : false
        })
      }

   

    }).catch(alert);
  }

  
  const logout = () => {
    auth.signOut();
    localStorage.removeItem('accessToken');
    setaccessToken("");

}

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setaccessToken(token);
  }, [accessToken])

  const sections = [
    "Basic Info"
      ,"Work Experience"
      ,"Education"
      ,"Skills"
      ,"Summary"
      ,"Others"
  ]
  

  const handleClick = ()=>{
    
    setIndex((Index+1)%sections.length)

  }


  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapepr}>
          <div className={styles.header}>
            <div className={styles.heading}>
            <div className={styles.divButton}>
              <h1>A <span>Resume</span> that stands out! Make your own resume. <span>It's free</span></h1>

              {!accessToken?  <button onClick={signin}>Login</button> : <button onClick={logout}>Logout</button>}

            </div>
              <Image className={styles.resumePic} alt="svg" width={750} src={Resume}></Image>
            </div>
          </div>
         {accessToken?
          <>
          <div className={styles.formWrapper}>
              <h1>Make your resume</h1>
              <div className={styles.detailsWrapper}>
                <ul className={styles.unorderList}>
                  {sections.map((items,ind)=>{
                    return(
                      <>
                        <li onClick={()=>setIndex(ind)} className={ind===Index?styles.active : styles.simple} >{items}</li>
                      </>
                    )
                  })}
                </ul>
                <div className={styles.formDiv}>
                  {Index==0?<BasicInfo handle = {handleClick} userId = {Id} /> :
                   Index==1? <WorkExp handle = {handleClick} userId = {Id}  />:
                   Index==2? <Education handle = {handleClick} userId = {Id} />:
                   Index==3? <Skills handle = {handleClick} userId = {Id}  /> :
                   Index==4? <Summary handle = {handleClick} userId = {Id}  />:
                   Index==5? <Others handle = {handleClick} userId = {Id}  /> : <></> }
                </div>
              </div>

             
          </div>
        
          </>:<></>
         }
        </div>
      </div>
    </>
  )
}
