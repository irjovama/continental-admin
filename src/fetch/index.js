import axios from "axios";
import * as dotenv from 'dotenv';

// const URI = "http://localhost:3000";
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
  console.log(options);
  try {
    return (await axios.request(options)).data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
const sendPDF = async function (test_id, u){
  const options = {
    method: 'GET',
    url: basePDFURI + '/tests/' + test_id + '/users/' + u.id 
  };
  try {
    return (await axios.request(options)).data;
  } catch (err) {
    return err;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const send = async function (user, test_title, object) {
  const links = `Hola ${user.name},\n\n
Como parte de nuestro modelo de Cultura y Liderazgo, hemos desarrollado esta evaluación de liderazgo con el objetivo de impulsar mejoras a nivel personal y en el funcionamiento de los equipos, y así poder seguir creciendo como organización.\n
La Evaluación de Liderazgo que efectuarás a continuación se basa en las dimensiones de nuestro Modelo de Liderazgo UC:  Entrega resultados, crea vínculos genunios y Cuestiona y construye el futuro.\n
Para contestar la encuesta haz click en cada uno de los enlaces:\n\n
${object.map(o=> `Evaluación para ${o.leader} ${invitationURI}/${o.token}`).join("\n\n")}\n\n
IMPORTANTE\n
Por favor completa la evaluación hasta el 8 de junio. \n
Si tienes alguna duda o consulta, puedes escribirnos a Bienestarytalento@continental.edu.pe
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
    await sleep(3000)
    return (await axios.request(options)).data;
  } catch (err) {
    return false;
    // console.log(err, "reintentando...", user.email);
    // await sleep(5*60*1000)
    // return await send(user, test_title, object);
    // return err;
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

const getSpecial = async function (){
  

  const options = {
    method: "GET",
    url: URI + "/special",
    headers: { "Content-Type": "application/json" }
  };
  console.log(options);
  const data = (await axios.request(options));

  return data.data;

}

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

export { show, update, create, destroy, send, find, sendPDF, getPDF, getSpecial };
