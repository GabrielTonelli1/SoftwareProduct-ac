import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import { toast, ToastContainer } from "react-toastify";
import Grid from "./components/Grid";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredUsers, setFilteredUsers] = useState(users); 

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800/users");
      setUsers(
        res.data.sort((a, b) => (a.nm_usuario > b.nm_usuario ? 1 : -1))
      );
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = users.filter((user) =>
      user.nm_usuario.toLowerCase().startsWith(value.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  return (
    <>
      <Container>
        <Title>Cadastro Funcionario</Title>
        
        <input
          type="text"
          placeholder="Buscar por nome do usuário..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            padding: "10px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={filteredUsers} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
