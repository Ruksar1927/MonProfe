import api from "../api/axios";

const getToken=()=>localStorage.getItem("token");
const authHeader=()=>({headers:{Authorization:`Bearer ${getToken()}`}});

export const getPDFs=async()=>(await api.get("/pdf/",authHeader())).data;
export const deletePDF=async id=>(await api.delete(`/pdf/${id}`,authHeader())).data;

export const uploadPDF=async(file,subject_id)=>{
  const formData=new FormData();
  formData.append("file",file);
  return (await api.post(`/pdf/upload?subject_id=${subject_id}`,formData,{
    headers:{Authorization:`Bearer ${getToken()}`,"Content-Type":"multipart/form-data"}
  })).data;
};

export const summarizePDF=async file=>{
  const formData=new FormData();
  formData.append("file",file);
  return (await api.post("/pdf/summary",formData,{
    headers:{Authorization:`Bearer ${getToken()}`,"Content-Type":"multipart/form-data"}
  })).data;
};

export const chatWithPDF=async(pdf_id,question)=>
  (await api.post("/pdf/chat",{pdf_id,question},authHeader())).data;
