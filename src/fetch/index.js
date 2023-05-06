import axios from "axios";
const baseURI = 'http://localhost:3000/db';
const baseSendURI = 'http://localhost:3000/mail';
const invitationURI = 'http://localhost:5174/invitations';
const send = async function(to, token, test_name){

  const options = {
    method: 'POST',
    url: baseSendURI,
    headers: {'Content-Type': 'application/json'},
    data: {
      to: to,
      subject: `invitación a ${test_name}`,
      text: `Ingresa al siguiente link para realizar la encuesta ${invitationURI}/${token}`
    }
  };
  try{

    return (await axios.request(options)).data
  } catch(err){
    return err
  }
}
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
  console.log("creando", options)
  return (await axios.request(options)).data
}
const destroy = async function(id, file){
  const options = {
    method: 'DELETE',
    url: baseURI + '/' + file + '/' + id,
  };
  
  return (await axios.request(options)).data
}
export {show, update, create, destroy, send}