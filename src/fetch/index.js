import axios from "axios";
import * as dotenv from 'dotenv';

const URI = "https://thawing-oasis-42405.herokuapp.com";
const localHost = "https://continental-front.netlify.app" ;
const baseURI = URI + "/db";
const baseSendURI = URI + "/mail";
const basePDFURI = URI + "/pdf";
const invitationURI = localHost + "/invitations";

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

const send = async function (to, test_title, object) {
  const options = {
    method: "POST",
    url: baseSendURI,
    headers: { "Content-Type": "application/json" },
    data: {
      to: to,
      subject: `invitación a ${test_title}`,
      text: object.map(o=> `Ingresa al siguiente link para realizar la encuesta ${invitationURI}/${o.token} y evaluar a ${o.leader}`).join("\n"),
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
  return (await axios.request(options)).data;
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

export { show, update, create, destroy, send, find, sendPDF };
