import GlobalStyle from "./styles/global"
import styled from "styled-components";
import Form from "./components/Form.js";
import { toast, ToastContainer } from 'react-toastify';
import Grid from "./components/Grid";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

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
const [ users, setUsers] = useState([]);
const [ onEdit, setOnEdit] = useState(null);

const getUsers = async () => {
  try {
    const res = await axios.get("http://localhost:8800/users");
    setUsers(res.data.sort((a, b) => (a.nm_usuario > b.nm_usuario ? 1 : -1)));
  } catch (error) {
    toast.error(error);
  }
};

useEffect(() => {
  getUsers();
}, [setUsers]);

  return (
    <>
      <Container>
        <Title>Cadastro Usuários</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left" />
      <GlobalStyle />
    </>
  );
}

export default App;
