import axios from "axios";
import * as dotenv from 'dotenv';

const URI = "https://thawing-oasis-42405.herokuapp.com";
const localHost = "https://continental-front.netlify.app" ;
const baseURI = URI + "/db";
const baseSendURI = URI + "/mail";
const basePDFURI = URI + "/pdf";
const invitationURI = localHost + "/invitations";

const getPDF = async function(test_id, user_id){
  const options = {
    method: 'GET',
    url: basePDFURI + '/tests/' + test_id + '/users/' + user_id 
  };
  try {
    return (await axios.request(options)).data;
  } catch (err) {
    return err;
  }
}
const sendPDF = async function (test_id, u){
  const options = {
    method: 'GET',
    url: basePDFURI + '/tests/' + test_id + '/users/' + u.id + '/type/3'
  };
  try {
    return (await axios.request(options)).data;
  } catch (err) {
    return err;
  }
}

const send = async function (user, test_title, object) {
  const links = `Hola ${user.name},\n\n
Como parte de nuestro modelo de Cultura y Liderazgo, hemos desarrollado esta evaluación de liderazgo con el objetivo de impulsar mejoras a nivel personal y en el funcionamiento de los equipos, y así poder seguir creciendo como organización.\n
La Evaluación de Liderazgo que efectuarás a continuación se basa en las dimensiones de nuestro Modelo de Liderazgo UC:  Entrega resultados, crea vínculos genunios y Cuestiona y construye el futuro.\n
Para contestar la encuesta haz click en cada uno de los enlaces:\n\n
${object.map(o=> `Evaluación para ${o.leader} ${invitationURI}/${o.token}`).join("\n\n")}\n\n
Agradeceremos puedas completar la evaluacíón hasta el 8 de junio. Si tienes alguna duda o consulta, puedes escribir a Bienestarytalento@continental.edu.pe
\n\nÁrea de Bienestar y Talento`

  const options = {
    method: "POST",
    url: baseSendURI,
    headers: { "Content-Type": "application/json" },
    data: {
      to: user.email,
      subject: `¡Evalúa a tu líder!`,
      text: links,
    },
  };
  try {
    return (await axios.request(options)).data;
  } catch (err) {
    return err;
  }
};

const find = async function (file) {
  const params = { limit: 10, page: 1 };

  const options = {
    method: "GET",
    url: baseURI + "/" + file,
    params: params,
  };
  try {
    return (await axios.request(options)).data;
  } catch (error) {
    console.error(error)
    return error;
  }
  
};

const show = async function (file, { ...props }) {
  const params = { limit: props.limit || 10, page: props.page || 1 };
  if (props.filterBy) {
    params.filterBy = props.filterBy;
  }
  const options = {
    method: "GET",
    url: baseURI + "/" + file,
    params: params,
  };
  return (await axios.request(options)).data;
};

const update = async function (id, file, data) {
  const options = {
    method: "PATCH",
    url: baseURI + "/" + file + "/" + id,
    headers: { "Content-Type": "application/json" },
    data,
  };
  return (await axios.request(options)).data;
};

const create = async function (file, data) {
  const options = {
    method: "POST",
    url: baseURI + "/" + file,
    headers: { "Content-Type": "application/json" },
    data,
  };
  return (await axios.request(options)).data;
};

const destroy = async function (id, file) {
  const options = {
    method: "DELETE",
    url: baseURI + "/" + file + "/" + id,
  };

  return (await axios.request(options)).data;
};

export { show, update, create, destroy, send, find, sendPDF, getPDF };
