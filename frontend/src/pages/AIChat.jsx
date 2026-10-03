import React,{useEffect,useState} from "react";
import ReactMarkdown from "react-markdown";
import {getSubjects} from "../services/subjectService";
import {chatAI,generateSummary,explainTopic,generateQuiz,generateFlashcards,generateMemoryTricks,generateImportantTopics,generateStudyPlan,generateExpectedQuestions,generateWeakTopics} from "../services/aiService";
import {Select,MenuItem,FormControl,InputLabel} from "@mui/material";

const brown={color:"#4A2F1B",backgroundColor:"#FFF8EF"};
const itemSx={"&.Mui-selected":{bgcolor:"#E7D5BD !important",color:"#4A2F1B"},"&.Mui-selected:hover":{bgcolor:"#D8BFA3 !important"},"&:hover":{bgcolor:"#F3E5D0"}};

function AIChat(){
const [feature,setFeature]=useState("Chat"),[input,setInput]=useState(""),[subjects,setSubjects]=useState(""),[availableSubjects,setAvailableSubjects]=useState([]),[examDate,setExamDate]=useState(""),[hours,setHours]=useState(""),[result,setResult]=useState(""),[loading,setLoading]=useState(false),[error,setError]=useState("");
const features=["Chat","Summary","Explain","Quiz","Flashcards","Memory Tricks","Important Topics","Study Plan","Expected Questions","Weak Topics"];

useEffect(()=>{getSubjects().then(setAvailableSubjects).catch(console.error)},[]);

const clean=text=>text?.replace(/^#+\s*/gm,"").replace(/\*\*/g,"").trim()||"";

const renderFlashcards=text=>{
const cleaned=clean(text).replace(/^(Question|Front)\s*:\s*/gim,"Question: ").replace(/^(Answer|Back)\s*:\s*/gim,"Answer: ");
const cards=cleaned.split(/(?=Question\s*:)/i).filter(Boolean);
return <div style={{display:"flex",flexDirection:"column",gap:20}}>
{cards.map((card,i)=>{
const parts=card.split(/Answer\s*:/i),question=parts[0].replace(/^Question\s*:/i,"").trim(),answer=parts.slice(1).join(" ").trim();
return <div key={i} style={{border:"1px solid #DEC9AE",borderRadius:10,padding:18,background:"#FFF8EF"}}>
<div style={{padding:14,background:"#F3E5D0",borderRadius:8,marginBottom:14}}>
<strong>Question</strong><p style={{margin:"8px 0 0",lineHeight:1.8,whiteSpace:"pre-wrap"}}>{question}</p>
</div>
{answer&&<div style={{padding:14,background:"#EDE1D2",borderRadius:8}}>
<strong>Answer</strong><p style={{margin:"8px 0 0",lineHeight:1.8,whiteSpace:"pre-wrap"}}>{answer}</p>
</div>}
</div>})}</div>;
};

const renderQuiz=text=>{
const cleaned=clean(text),match=cleaned.match(/ANSWER\s*KEY\s*:/i),questionText=match?cleaned.slice(0,match.index):cleaned,answerKey=match?cleaned.slice(match.index).replace(/ANSWER\s*KEY\s*:/i,"").trim():"";
const questions=questionText.split(/(?=Question\s*\d+\s*:)/i).filter(Boolean);
return <div style={{display:"flex",flexDirection:"column",gap:18}}>
{questions.map((q,i)=>{
const lines=q.trim().split(/\r?\n/).filter(Boolean),title=lines[0],options=lines.slice(1).filter(x=>/^[A-D]\s*[\.\)]/i.test(x));
return <div key={i} style={{padding:18,border:"1px solid #DEC9AE",borderRadius:10,background:"#FFF8EF"}}>
<strong>{title}</strong>
<div style={{marginTop:12,display:"flex",flexDirection:"column",gap:9,lineHeight:1.7}}>
{options.map((o,j)=><div key={j}>{o}</div>)}
</div>
</div>})}
{answerKey&&<div style={{padding:18,border:"1px solid #DEC9AE",borderRadius:10,background:"#F3E5D0"}}>
<strong>Answer Key</strong><p style={{whiteSpace:"pre-wrap",lineHeight:1.8}}>{answerKey}</p>
</div>}
</div>;
};

const renderResult=()=>{
const text=typeof result==="string"?result:JSON.stringify(result,null,2);
if(feature==="Flashcards")return renderFlashcards(text);
if(feature==="Quiz")return renderQuiz(text);
return <ReactMarkdown components={{p:({children})=><p style={{lineHeight:1.8,marginBottom:12}}>{children}</p>,li:({children})=><li style={{marginBottom:7,lineHeight:1.7}}>{children}</li>}}>{text}</ReactMarkdown>;
};

const handleGenerate=async()=>{
setLoading(true);setError("");setResult("");
try{
let res;
switch(feature){
case"Chat":res=await chatAI(input);setResult(res.response);break;
case"Summary":res=await generateSummary({text:input});setResult(res.summary);break;
case"Explain":res=await explainTopic({text:input});setResult(res.explanation);break;
case"Quiz":res=await generateQuiz({text:input});setResult(res.quiz);break;
case"Flashcards":res=await generateFlashcards({text:input});setResult(res.flashcards);break;
case"Memory Tricks":res=await generateMemoryTricks({topic:input});setResult(res.memory_tricks);break;
case"Important Topics":res=await generateImportantTopics({text:input});setResult(res.important_topics);break;
case"Study Plan":res=await generateStudyPlan({subjects,exam_date:examDate,hours});setResult(res.study_plan);break;
case"Expected Questions":res=await generateExpectedQuestions({text:input});setResult(res.expected_questions);break;
case"Weak Topics":res=await generateWeakTopics({text:input});setResult(res.analysis);break;
default:setResult("No feature selected.");
}
}catch(err){
const detail=err.response?.data?.detail;
setError(Array.isArray(detail)?detail.map(x=>x.msg).join("\n"):typeof detail==="string"?detail:"Something went wrong while communicating with the AI.");
}finally{setLoading(false)}
};

return <div style={{maxWidth:1000,margin:"30px auto",padding:20,fontFamily:"Arial",color:"#4A2F1B"}}>
<h2 style={{textAlign:"center",fontFamily:"Georgia,serif"}}>𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆 AI Assistant</h2>

<FormControl fullWidth sx={{mb:2}}>
<InputLabel sx={{color:"#6B4528"}}>Select Feature</InputLabel>
<Select value={feature} label="Select Feature" onChange={e=>{setFeature(e.target.value);setResult("");setError("")}} sx={{...brown,"& .MuiOutlinedInput-notchedOutline":{borderColor:"#C9AD91"}}}>
{features.map(x=><MenuItem key={x} value={x} sx={itemSx}>{x}</MenuItem>)}
</Select>
</FormControl>

{feature==="Study Plan"?<>
<FormControl fullWidth sx={{mb:2}}>
<InputLabel sx={{color:"#6B4528"}}>Select Subject</InputLabel>
<Select value={subjects} label="Select Subject" onChange={e=>setSubjects(e.target.value)} sx={{...brown,"& .MuiOutlinedInput-notchedOutline":{borderColor:"#C9AD91"}}}>
<MenuItem value="" sx={itemSx}>Select a Subject</MenuItem>
{availableSubjects.map(s=><MenuItem key={s.id} value={s.name} sx={itemSx}>{s.name}</MenuItem>)}
</Select>
</FormControl>
<label>Exam Date</label>
<input type="date" value={examDate} onChange={e=>setExamDate(e.target.value)} style={{width:"100%",padding:10,margin:"8px 0 15px",border:"1px solid #C9AD91",borderRadius:6}}/>
<label>Study Hours Per Day</label>
<input type="number" value={hours} onChange={e=>setHours(e.target.value)} placeholder="4" style={{width:"100%",padding:10,marginTop:8,border:"1px solid #C9AD91",borderRadius:6}}/>
</>:<>
<label>Enter your text</label>
<textarea rows={8} value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your question or study material here..." style={{width:"100%",padding:10,marginTop:8,resize:"vertical",border:"1px solid #C9AD91",borderRadius:6}}/>
</>}

<div style={{display:"flex",gap:10,marginTop:20}}>
<button onClick={handleGenerate} disabled={loading} style={{padding:"10px 20px",background:"#6B4528",color:"#FFF8EF",border:0,borderRadius:7}}>{loading?"Generating...":"Generate"}</button>
<button onClick={()=>{setInput("");setSubjects("");setExamDate("");setHours("");setResult("");setError("")}} style={{padding:"10px 20px",background:"#E7D5BD",color:"#4A2F1B",border:0,borderRadius:7}}>Clear</button>
</div>

{loading&&<div style={{marginTop:20}}>Please wait...</div>}
{error&&<div style={{marginTop:20,color:"#8B3A2E",whiteSpace:"pre-wrap"}}>{error}</div>}
{result&&<div style={{marginTop:25,border:"1px solid #DEC9AE",borderRadius:8,padding:15,background:"#FFF8EF"}}><h3>Result</h3>{renderResult()}</div>}
</div>;
}

export default AIChat;