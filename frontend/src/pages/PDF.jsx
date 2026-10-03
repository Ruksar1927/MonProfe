import {useEffect,useState} from "react";
import {Container,Typography,Card,CardContent,Button,Box,List,ListItem,ListItemText,IconButton,Divider,TextField,FormControl,InputLabel,Select,MenuItem} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {getPDFs,deletePDF,uploadPDF,chatWithPDF} from "../services/pdfService";
import {getSubjects} from "../services/subjectService";

const brown="#4A2F1B",cream="#FFF8EF",light="#F3E5D0",border="#DEC9AE";

function PDF(){
  const [files,setFiles]=useState([]),[subjects,setSubjects]=useState([]),[selectedFile,setSelectedFile]=useState(null),[subjectId,setSubjectId]=useState(""),[pdfId,setPdfId]=useState(""),[question,setQuestion]=useState(""),[answer,setAnswer]=useState("");

  const cleanAnswer=text=>text?.replace(/#{1,6}\s*/g,"").replace(/\*\*/g,"").replace(/^\s*\*[-*]\s+/gm,"• ").replace(/\n{3,}/g,"\n\n").trim()||"";
  const loadData=async()=>{try{setFiles(await getPDFs());setSubjects(await getSubjects())}catch(error){console.error(error)}};
  useEffect(()=>{loadData()},[]);

  const handleUpload=async()=>{
    if(!selectedFile)return alert("Please choose a file");
    if(!subjectId)return alert("Please select a subject");
    try{await uploadPDF(selectedFile,subjectId);alert("File uploaded successfully");setSelectedFile(null);setSubjectId("");loadData()}
    catch(error){console.error(error);alert(error.response?.data?.detail||"Upload failed")}
  };

  const handleDelete=async id=>{
    try{await deletePDF(id);if(String(pdfId)===String(id)){setPdfId("");setAnswer("")}loadData()}
    catch(error){console.error(error)}
  };

  const handleAsk=async()=>{
    if(!pdfId)return alert("Please select a file");
    if(!question.trim())return alert("Please enter a question.");
    try{const response=await chatWithPDF(Number(pdfId),question);setAnswer(cleanAnswer(response.answer))}
    catch(error){console.error(error);alert(error.response?.data?.detail||"Failed to get AI response.")}
  };

  return <Container maxWidth="md" sx={{mt:3,mb:4}}>
    <Typography variant="h4" fontWeight="bold" sx={{mb:2,fontFamily:"Georgia,serif",color:brown}}>𝑴𝒐𝒏𝑷𝒓𝒐𝒇𝒆 File Manager</Typography>

    <Card sx={{mb:2,border:`1px solid ${border}`,borderRadius:3,bgcolor:cream}}>
      <CardContent sx={{p:2.5}}>
        <Typography variant="h6" sx={{color:brown}}>Upload File</Typography>
        <Typography variant="body2" color="text.secondary" sx={{mb:1.5}}>Upload PDF, Word, PowerPoint, Excel or text files.</Typography>

        <FormControl fullWidth sx={{mb:1.5}}>
          <InputLabel>Select Subject</InputLabel>
          <Select value={subjectId} label="Select Subject" onChange={e=>setSubjectId(e.target.value)}>
            <MenuItem value="">Select a Subject</MenuItem>
            {subjects.map(s=><MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
          </Select>
        </FormControl>

        <Box sx={{display:"flex",alignItems:"center",gap:1.5,flexWrap:"wrap"}}>
          <Button variant="outlined" component="label" sx={{color:brown,borderColor:border}}>
            Choose File
            <input hidden type="file" accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx" onChange={e=>setSelectedFile(e.target.files[0]||null)}/>
          </Button>
          <Button variant="contained" onClick={handleUpload} sx={{bgcolor:brown,"&:hover":{bgcolor:"#6B4528"}}}>Upload</Button>
          {selectedFile&&<Typography variant="body2" sx={{wordBreak:"break-word"}}>{selectedFile.name}</Typography>}
        </Box>
      </CardContent>
    </Card>

    <Card sx={{mb:2,border:`1px solid ${border}`,borderRadius:3,bgcolor:cream}}>
      <CardContent sx={{p:2.5}}>
        <Typography variant="h6" sx={{color:brown,mb:1}}>Uploaded Files</Typography>
        <List sx={{p:0}}>
          {files.length?files.map(file=><Box key={file.id}>
            <ListItem sx={{px:0}} secondaryAction={<IconButton onClick={()=>handleDelete(file.id)} sx={{color:"#795334"}}><DeleteIcon/></IconButton>}>
              <ListItemText primary={file.title} secondary={file.file_path}/>
            </ListItem>
            <Divider/>
          </Box>):<Typography color="text.secondary">No files uploaded yet.</Typography>}
        </List>
      </CardContent>
    </Card>

    <Card sx={{border:`1px solid ${border}`,borderRadius:3,bgcolor:cream}}>
      <CardContent sx={{p:2.5}}>
        <Typography variant="h6" sx={{color:brown,mb:1}}>Ask Questions About Uploaded File</Typography>

        <FormControl fullWidth sx={{mb:1.5}}>
          <InputLabel>Select File</InputLabel>
          <Select value={pdfId} label="Select File" onChange={e=>{setPdfId(e.target.value);setAnswer("")}}>
            <MenuItem value="">Select a File</MenuItem>
            {files.map(file=><MenuItem key={file.id} value={file.id}>{file.title}</MenuItem>)}
          </Select>
        </FormControl>

        <TextField fullWidth label="Ask a question" value={question} onChange={e=>setQuestion(e.target.value)} sx={{mb:1.5}}/>
        <Button variant="contained" onClick={handleAsk} sx={{bgcolor:brown,"&:hover":{bgcolor:"#6B4528"}}}>Ask AI</Button>

        {answer&&<Box sx={{mt:2,p:2,borderRadius:2,bgcolor:light}}>
          <Typography variant="h6" sx={{color:brown,mb:.5}}>Answer</Typography>
          <Typography sx={{whiteSpace:"pre-wrap",lineHeight:1.7}}>{answer}</Typography>
        </Box>}
      </CardContent>
    </Card>
  </Container>;
}

export default PDF;