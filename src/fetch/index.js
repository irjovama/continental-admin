import axios from "axios";
const baseURI = 'http://localhost:3000/db';
const show = async function(file, {...props}){

  const params = {limit: props.limit || 10, page:  props.page || 1};
  if(props.filterBy){
    params.filterBy = props.filterBy;
  }
  const options = {
    method: 'GET',
    url: baseURI + '/' + file,
    params: params
  };
  return (await axios.request(options)).data
}
const update = async function(id, file, data){
  const options = {
    method: 'PATCH',
    url:  baseURI + '/' + file + '/' +id,
    headers: {'Content-Type': 'application/json'},
    data
  };
  return (await axios.request(options)).data
}
const create = async function(file, data){
  const options = {
    method: 'POST',
    url: baseURI + '/' + file,
    headers: {'Content-Type': 'application/json'},
    data
  };
  return (await axios.request(options)).data
}
const destroy = async function(id, file){
  const options = {
    method: 'DELETE',
    url: baseURI + '/' + file + '/' + id,
  };
  
  return (await axios.request(options)).data
}
export {show, update, create, destroy}