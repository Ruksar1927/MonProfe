import { useEffect, useState } from "react";
import { Container, Typography, TextField, Button, Card, CardContent, Box, Stack } from "@mui/material";
import { getSubjects, createSubject, deleteSubject, updateSubject } from "../services/subjectService";

function Subjects() {
  const [subjects, setSubjects] = useState([]), [newSubject, setNewSubject] = useState(""), [editingId, setEditingId] = useState(null), [editingName, setEditingName] = useState("");

  const loadSubjects = async () => {
    try { setSubjects(await getSubjects()); } catch (error) { console.error(error); }
  };

  useEffect(() => { loadSubjects(); }, []);

  const handleAddSubject = async () => {
    if (!newSubject.trim()) return;
    try { await createSubject(newSubject); setNewSubject(""); loadSubjects(); }
    catch (error) { console.error(error); alert("Failed to add subject"); }
  };

  const handleDeleteSubject = async (id) => {
    try { await deleteSubject(id); loadSubjects(); }
    catch (error) { console.error(error); alert("Failed to delete subject"); }
  };

  const handleUpdateSubject = async () => {
    if (!editingName.trim()) return;
    try { await updateSubject(editingId, editingName); setEditingId(null); setEditingName(""); loadSubjects(); }
    catch (error) { console.error(error); alert("Failed to update subject"); }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 5 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ color: "#4b3621", mb: 1 }}>Subjects</Typography>
      <Typography sx={{ color: "#7b6650", mb: 4 }}>Manage your subjects and organize your study materials.</Typography>

      <Card sx={{ mb: 4, borderRadius: 3, background: "#f8f1e7", border: "1px solid #e4d5c3", boxShadow: "0 4px 15px rgba(75,54,33,0.08)" }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#4b3621", mb: 2 }}>Add New Subject</Typography>
          <Box display="flex" gap={2}>
            <TextField fullWidth label="Subject Name" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} sx={{ "& .MuiOutlinedInput-root": { background: "#fffdf9" } }} />
            <Button variant="contained" onClick={handleAddSubject} sx={{ px: 3, background: "#6f4e37", "&:hover": { background: "#5a3d2b" } }}>Add</Button>
          </Box>
        </CardContent>
      </Card>

      <Stack spacing={2}>
        {subjects.map((subject) => (
          <Card key={subject.id} sx={{ borderRadius: 3, border: "1px solid #e4d5c3", boxShadow: "0 3px 12px rgba(75,54,33,0.06)", background: "#fffdf9" }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
                {editingId === subject.id ? (
                  <TextField size="small" value={editingName} onChange={(e) => setEditingName(e.target.value)} fullWidth />
                ) : (
                  <Typography variant="h6" fontWeight="bold" sx={{ color: "#4b3621" }}>{subject.name}</Typography>
                )}

                <Box display="flex" gap={1}>
                  {editingId === subject.id ? (
                    <Button variant="contained" onClick={handleUpdateSubject} sx={{ background: "#6f4e37", "&:hover": { background: "#5a3d2b" } }}>Save</Button>
                  ) : (
                    <Button variant="outlined" onClick={() => { setEditingId(subject.id); setEditingName(subject.name); }} sx={{ color: "#6f4e37", borderColor: "#b99b7a" }}>Edit</Button>
                  )}
                  <Button color="error" variant="outlined" onClick={() => handleDeleteSubject(subject.id)}>Delete</Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default Subjects;