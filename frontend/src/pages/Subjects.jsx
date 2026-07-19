import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Stack,
} from "@mui/material";

import {
  getSubjects,
  createSubject,
  deleteSubject,
  updateSubject,
} from "../services/subjectService";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const loadSubjects = async () => {
    try {
      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const handleAddSubject = async () => {
    if (!newSubject.trim()) return;

    try {
      await createSubject(newSubject);
      setNewSubject("");
      loadSubjects();
    } catch (error) {
      console.error(error);
      alert("Failed to add subject");
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await deleteSubject(id);
      loadSubjects();
    } catch (error) {
      console.error(error);
      alert("Failed to delete subject");
    }
  };

  const handleUpdateSubject = async () => {
    if (!editingName.trim()) return;

    try {
      await updateSubject(editingId, editingName);

      setEditingId(null);
      setEditingName("");

      loadSubjects();
    } catch (error) {
      console.error(error);
      alert("Failed to update subject");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Subjects
      </Typography>

      <Box display="flex" gap={2} mb={4}>
        <TextField
          fullWidth
          label="Subject Name"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleAddSubject}
        >
          Add
        </Button>
      </Box>

      <Stack spacing={2}>
        {subjects.map((subject) => (
          <Card key={subject.id}>
            <CardContent>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {editingId === subject.id ? (
                  <TextField
                    size="small"
                    value={editingName}
                    onChange={(e) =>
                      setEditingName(e.target.value)
                    }
                  />
                ) : (
                  <Typography variant="h6">
                    {subject.name}
                  </Typography>
                )}

                <Box display="flex" gap={1}>
                  {editingId === subject.id ? (
                    <Button
                      variant="contained"
                      onClick={handleUpdateSubject}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setEditingId(subject.id);
                        setEditingName(subject.name);
                      }}
                    >
                      Edit
                    </Button>
                  )}

                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() =>
                      handleDeleteSubject(subject.id)
                    }
                  >
                    Delete
                  </Button>
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