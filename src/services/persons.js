import axios from "axios";
// const baseURL = "https://phonebook-be-hehz.onrender.com";
const baseURL = "http://localhost:3001";


const getPersons = () =>
  axios.get(`${baseURL}/persons`).then((response) => response.data);

const createPerson = (newObj) =>
  axios.post(`${baseURL}/persons`, newObj).then((res) => ({
    id: res.data._id,
    name: res.data.name,
    number: res.data.number,
  }));

const deletePerson = (id) => axios.delete(`${baseURL}/persons/${id}`);

const updatePerson = (id, updatedObj) =>
  axios.put(`${baseURL}/persons/${id}`, updatedObj).then((res) => ({
    id: res.data._id,
    name: res.data.name,
    number: res.data.number,
  }));

export default { getPersons, createPerson, deletePerson, updatePerson };
