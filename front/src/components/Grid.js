import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from 'axios';


const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 20px auto; 
  border-collapse: collapse; 
`;

export const Thead = styled.thead``;
export const Tr = styled.tr``;
export const Tbody = styled.tbody``;

export const Th = styled.th`
  text-align: start;
  border-bottom: 1px solid #800080; 
  padding: 10px; 
  
  width: ${(props) => (props.width ? props.width : "auto")}; 

  @media (max-width: 500px) {
    ${(props) => props.hideOnMobile && "display: none"};
  }
`;

export const Td = styled.td`
  padding: 10px; 
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")}; 

  @media (max-width: 500px) {
    ${(props) => props.hideOnMobile && "display: none"};
  }

  visibility: visible;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  ${props => props.alignCenter && 'text-align: center;'}
`;

const Icon = styled.div`
  cursor: pointer; 
  transition: color 0.3s ease; 
  &:hover {
    color: #ff0000; 
  }
`;


const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };
  

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/users/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);  
  };



  return (
    <Table>
      <Thead>
        <Tr>
          <Th width="15%">Nome</Th>
          <Th width="20%">Email</Th>
          <Th width="10%" hideOnMobile>Telefone</Th>
          <Th width="15%">Data De Nascimento</Th>
          <Th width="15%">Endereço</Th>
          <Th width="10%">Cidade</Th>
          <Th width="15%">Estado Civil</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td>{item.nm_usuario}</Td>
            <Td>{item.email}</Td>
            <Td hideOnMobile>{item.telefone}</Td>
            <Td>{new Date(item.dt_nascimento).toLocaleDateString("pt-BR")}</Td>
            <Td>{item.endereco}</Td>
            <Td>{item.cidade}</Td>
            <Td>{item.estado_civil}</Td>
            <Td alignCenter>
              <Icon>  
                <FaEdit onClick={() => handleEdit(item)}/>
              </Icon>    
            </Td>
            <Td alignCenter>
              <Icon>
                <FaTrash onClick={() => handleDelete(item.id)}/>
              </Icon>    
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
