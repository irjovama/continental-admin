import styled from "styled-components";
const LeftNav = styled.div`
    position: fixed;
    width: 15%;
    height: 100%;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0px 37px 37px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const RightPanel = styled.div`
    margin-left: 8%;
    height: 100%;
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const BlankContainer = styled.div`
    background: white;
    width: 100vw; 
    height: 100vh;
    display: flex;
    flex-direction: row;
    

`
const Container = styled.div`
    background: #DCD4FF;
    width: 100vw; 
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;

`
const Title = styled.div`
    font-family: 'Neue Plak';
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 120%;
    color: #7A00C6;
    margin: auto;
    text-align: center;
    width: 1000px;
    display: flex;
    flex-direction:column;
    align-items: center;
    gap: 70px;

    & > span{
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 120%;
        /* or 22px */

        text-align: center;

        color: #6802C1;

    }
`
const PrimaryButton = styled.button`
    background: #7A00C6;
    color: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 34px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    border: none;
    padding: 12px 50px;
    &:hover {
        background-color: white;
        color: #7A00C6;
    }
    &:active{
        background: #7A00C6;  
        color: #FFFFFF;
    }
    &:disabled{
        background: #DDBBFF;
    }
`;

const TextInfo = styled.div`
    font-family: 'Neue Plak';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 120%;
    /* identical to box height, or 17px */

    text-align: center;

    color: #000000;
    margin-bottom: 41px;
`;
const VerticalCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const NavCard = styled.div`
    font-family: 'Neue Plak';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
    color: #6802C1;
    margin: 40px;
    gap: 10px;
    display: flex;
    flex-direction: column;

    & div{
        margin-top: 60px;
    }

    & h3{
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 120%;
        color: #6802C1;
    }

    & span {
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 300;
        font-size: 12px;
        line-height: 120%;
        color: #1C1C1A;
    }

    & p {
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 300;
        font-size: 11px;
        line-height: 120%;
        color: #6802C1;
    }
`;
const LeftAlign = styled.div`
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
const BackLink = styled.a`
    font-family: 'Neue Plak';
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    cursor: pointer;
    line-height: 120%;
    /* or 13px */
    text-align: center;
    color: #1C1C1A;
    text-decoration: none;
`;
const Paragraph = styled.p`
    font-family: 'Neue Plak';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    /* or 23px */
    text-align: justify;

    color: #000000;
`;

const Important = styled.span`
    font-family: 'Neue Plak';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 130%;

    color: #7A00C6;
`;

const Strong = styled.span`
    margin-top: 20px;
    font-weight: 800;
    color: black;
`;

const Progress = styled.progress`
  width: 500px;
  height: 16px;
  accent-color: #6802C1;

`;

const ProressWrapper = styled.div`
    right: 0px;
    display: flex;
    flex-direction: column;
    width: 84%;
    border-bottom: solid 1px ;
    align-items: center;
    position: fixed;
    background-color: white;
`;
const ProgressInfo = styled.div`
    display: flex;
    margin:  40px;
    gap: 30px; 
    & div {
      
    }
    & div > div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 120%;
        /* or 22px */

        text-align: right;

        color: #6802C1;
    }
`;
const ProgresFoot = styled.div`
    font-family: 'Neue Plak';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #000000;
`;
const ProgresCardContainer = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: top;
    width: 600px;
    
`;

const AlertMessage = styled.div`font-family: 'Neue Plak';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 130%;
/* or 23px */

display: flex;
flex-direction: row;
margin: 1rem;
gap: 1rem;
color: #7A00C6;`
const ProgresCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
    font-family: 'Neue Plak';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;
    /* or 16px */
    color: #000000;
    align-items: center;
    text-align: center;
    & button{
        background: #FFFFFF;
        border: 1px solid #D9D9D9;
        border-radius: 100px;
        width: 30px;
        height: 30px;
    }
`;
const QuestionContainer = styled.div`
   position: relative;
   top: 250px;
   left: 0px;
   display: flex;
   flex-direction: column;
   align-items: center;
   margin-left: 230px;
  
`
const Question = styled.div`
    background: ${ (props) => props.shadow ? "#FBFAFF" : "#FFFFFF" };
    width: 100%;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 27px;
    & > div {
        width: 800px;
        text-align: left;
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 130%;
        /* or 23px */
        color: #000000;
    }

    & > fieldset{
        border: none;
        width: 900px;
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 130%;
        /* or 16px */
        color: #000000;
        display: flex;

    }
    & > fieldset > div{
        width: 200px;
    }
    & > fieldset > fieldset {
        display: flex;
        width: 400px;
        flex-direction: row;
        gap: 20px;
        align-items: center;
        border: none;
    }

    & > fieldset > fieldset > button{
        background: #FFFFFF;
        border: 1px solid #D9D9D9;
        border-radius: 100px;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
`
export { 
            Container, 
            Title, 
            PrimaryButton, 
            TextInfo, 
            BlankContainer, 
            LeftNav, 
            RightPanel, 
            VerticalCenter, 
            NavCard, 
            BackLink,
            LeftAlign,
            Paragraph,
            Important,
            Strong,
            Progress,
            ProressWrapper,
            ProgressInfo,
            ProgresFoot,
            ProgresCard,
            ProgresCardContainer,
            QuestionContainer,
            Question,
            AlertMessage,
        };