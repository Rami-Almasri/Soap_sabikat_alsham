import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  Alert,
  TableCell,
  TableBody,
  Button,
  TextField,
} from "@mui/material";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getCategories = () => {
    axios.get("http://127.0.0.1:8000/api/categories").then((res) => {
      setCategories(res.data.data);
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addCategory = () => {
    axios
      .post("http://127.0.0.1:8000/api/categories", { name })
      .then((response) => {
        setName("");

        setSuccess(response.data.message);
        setTimeout(() => setSuccess(""), 4000);

        getCategories();
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error");
        setTimeout(() => setError(""), 4000);
      });
  };

  const deleteCategory = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/categories/destroy/${id}`)
      .then((res) => {
        getCategories();
        setSuccess(res.data.message);
        setTimeout(() => {
          setSuccess("");
        }, 4000);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error");
        setTimeout(() => setError(""), 4000);
      });
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>
        Categories
      </Typography>

      <Box mb={3} display="flex" gap={2}>
        <TextField
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="contained" onClick={addCategory}>
          Add
        </Button>
      </Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>{cat.id}</TableCell>
              <TableCell>{cat.name}</TableCell>

              <TableCell>
                <Button color="error" onClick={() => deleteCategory(cat.id)}>
                  Delete
                </Button>

                <Button color="primary">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
