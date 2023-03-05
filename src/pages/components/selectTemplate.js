import React,{useState,useRef} from 'react'
import style from '../../styles/selectTemp.module.css';
import img1 from '../../images/sampleResume.png';
import img2 from '../../images/resumeStuff.png';
import Image from 'next/image';
import SampleResume from '../resumes/sampleResume';
import ResumeStuff from "../resumes/resumeStuff"
import jsPDF from 'jspdf';
const selectTemplate = () => {

    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const componentRef = useRef();

    const handleClick = (template)=>{
        setSelectedTemplate(template)
        if(selectedTemplate==='template1') window.location.href = '../resumes/sampleResume';
      else if(selectedTemplate==='template2') window.location.href = '../resumes/resumeStuff';
    }

    
    const downloadPdf = () => {
      // var doc = new jsPDF('p','pt','a4');
      // console.log(document.querySelector(".resmeDownload"))
      // doc.html(document.querySelector(".resmeDownload"),{
      //   callback : function(pdf){
      //     pdf.save("Resume.pdf")
      //   }
      // })

      


    };
  return (
    <div className={style.container}>
     <h1>Choose Your Resume Template</h1>
        <div className={style.wrapper}>
       
            <div className={style.card} onClick = {()=>handleClick("template1")}>
                <Image alt='template' src={img1} width={330} height={350} />
            </div>
            <div className={style.card} onClick = {()=>handleClick("template2")}>
                <Image alt='template' src={img2} width={330} height={350}  />
            </div>
            

        </div>



        

    </div>
  )
}

export default selectTemplate