import React, { useEffect, useState } from 'react';
import InfoContext from '.';

import { find, show } from '../fetch';
import { useNavigate } from 'react-router';


const InfoProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [userTest, setUserTest] = useState({});
  const [test, setTest] = useState([]);
  const [user, setUser] = useState({});
  const [leader, setLeader] = useState({});
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    if(token!=""){
        find("user_tests/"+token).then((ut) => {
          
          find("tests/"+ut.tests_id).then((u) => setTest(u));
          find("users/"+ut.users_id).then((u) => setUser(u));
          find("users/"+ut.leaders_id).then((u) => setLeader(u));
          if(ut.status == 1){
            navigate("finish/"+token)
          }
        });
    }
    setIsLoading(false);
  },[token]);

  useEffect(() =>{
    handleLoad();
  },[leader])

  

  async function handleLoad(){
    setIsLoading(true);
    const limit = 999999;
    const allQ = [];
    let shadow = false;
    const categories = await show("categories", {limit, filterBy: `user_types_id=${leader.type}` });
    for(let i in categories.data){
      const subCategories = await show("sub_categories", {limit, filterBy: `categories_id=${categories.data[i].id}`});
      for(let j in subCategories.data){
        const q = await show("questions", {limit, filterBy: `sub_categories_id=${subCategories.data[j].id}`});
        for(let k in q.data){
          const addQ = q.data[k];
          addQ.reverse = Math.random() < 0.5;
          addQ.shadow = shadow;
          shadow = !shadow;
          allQ.push(addQ);
        }
      }
    }
    setQuestions(allQ);
    setIsLoading(false);
  }



  return (
    <>
      {(isLoading) 
      ? 
      (<>Loading ...</>) 
      : 
      (<InfoContext.Provider value={{
          isLoading, 
          setIsLoading, 
          token, 
          setToken,
          userTest, 
          setUserTest,
          test, 
          setTest, 
          user, 
          setUser,
          leader, 
          setLeader,
          questions, 
          setQuestions
      }}>
        {children}
      </InfoContext.Provider>
      )}
    </>
    
  );
};

export default InfoProvider;
