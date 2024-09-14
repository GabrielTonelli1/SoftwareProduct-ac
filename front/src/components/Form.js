import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap; 
  gap: 10px; 
  background-color: #fff;
  padding: 20px; 
  box-shadow: 0px 0px 5px #000080;
  border-radius: 5px;
  max-width: 800px; 
  margin: 20px auto; 
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px; 
  flex: 1 1 calc(50% - 10px); 
`;


const Input = styled.input`
  width: 150px; 
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
  width: 100px;
  margin-top: 10px; 
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #006400
  }
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => { 
  const [formData, setFormData] = useState({
    nm_usuario: "",
    email: "",
    telefone: "",
    dt_nascimento: "",
    endereco: "",
    cidade: "",
    estado_civil: "",
  });

  useEffect(() => {
    if (onEdit) {
      setFormData({
        nm_usuario: onEdit.nm_usuario,
        email: onEdit.email,
        telefone: onEdit.telefone,
        dt_nascimento: onEdit.dt_nascimento,
        endereco: onEdit.endereco,
        cidade: onEdit.cidade,
        estado_civil: onEdit.estado_civil,
      });
    }
  }, [onEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Dados enviados:", formData);
    console.log("onEdit:", onEdit);
    
    if (
      !formData.nm_usuario ||
      !formData.email ||
      !formData.telefone ||
      !formData.dt_nascimento ||
      !formData.endereco ||
      !formData.cidade ||
      !formData.estado_civil
    ) {
      return toast.warn("Preencha todos os campos do formulário!!");
    }
    
    try {
      if (onEdit && onEdit.id) {
        console.log("Editando usuário com ID:", onEdit.id);
        await axios
          .put(`http://localhost:8800/users/${onEdit.id}`, formData)
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        console.log("Adicionando novo usuário");
        await axios
          .post("http://localhost:8800/users", formData)
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      }
      
      setFormData({
        nm_usuario: "",
        email: "",
        telefone: "",
        dt_nascimento: "",
        endereco: "",
        cidade: "",
        estado_civil: "",
      });
      
      setOnEdit(null);
      getUsers();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      toast.error("Erro ao enviar dados.");
    }
  };
  
  
  

  return (
    <FormContainer onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nm_usuario" value={formData.nm_usuario} onChange={handleInputChange} />
      </InputArea>
      <InputArea>
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input
          name="telefone"
          value={formData.telefone}
          onChange={handleInputChange}
        />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input
          name="dt_nascimento"
          type="date"
          value={formData.dt_nascimento}
          onChange={handleInputChange}
        />
      </InputArea>
      <InputArea>
        <Label>Endereço</Label>
        <Input
          name="endereco"
          value={formData.endereco}
          onChange={handleInputChange}
        />
      </InputArea>
      <InputArea>
        <Label>Cidade</Label>
        <Input
          name="cidade"
          value={formData.cidade}
          onChange={handleInputChange}
        />
      </InputArea>
      <InputArea>
        <Label>Estado Civil</Label>
        <Input
          name="estado_civil"
          value={formData.estado_civil}
          onChange={handleInputChange}
        />
      </InputArea>
      <Button type="submit">Enviar</Button>
    </FormContainer>
  );
};

export default Form;
