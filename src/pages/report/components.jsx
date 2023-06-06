
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

import { Chart, BarController, LinearScale, CategoryScale, BarElement } from 'chart.js';

Chart.register(BarController, LinearScale, CategoryScale, BarElement);
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`
const Container = styled.div`

    width: 595px;
    min-height: 1110px;
    padding: 1rem;
`;

const Header = styled.div`
    font-family: 'Neue Plak';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
    color: #6802C1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Section = styled.div`
    padding: 25px 0;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #6802B5;
`;

const LeaderCard = styled.div`
    & > h1 {
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 22px;
        color: #6802B5;
        width: 180px;
    }

    & > span {
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 400;
        font-size: 9px;
        line-height: 13px;

        color: #1C1C1A;

    }

    & > div {
        position: relative;
        right: -100px;
    }
`; 

const WrapperHeaderCard = styled.div`
    margin-left: 100px;
    width: 439px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const HeaderCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

   
    & > h1 {
        width: 75px;
        height: 75px;
        background: #F7F5FF;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 800;
        font-size: 22px;
        line-height: 20px;
        text-align: center;
        color: #7A00C6;
        
    }

    & > div {
        margin-top: -20px;
    }

    & > span {
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 15px;
        /* identical to box height */

        text-align: center;

        color: #6802C1;

    }
`;

const WrapperGraph = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    & > h1 {
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        /* identical to box height */
        color: #1C1C1A;
    }

    & > div {
        margin-top: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        
    }

    & > fieldset {
        border: none;
        display: flex;
        gap: 2rem;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

  
    
`;

const Graph = function ({colors, data}) {
    const d = {
        labels: data.map(d=> d.label),
        datasets: [
          {
            label: "hola mundo",
            data: data.map(d=> d.value),
            backgroundColor: colors,
            borderWidth: 0,
          },
        ],
      };
      
      const options = {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
        },
      };
      

    return (
        <Bar data={d} options={options} height={"300px"} />
    )
}; 

const P2Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
   
    & > h1 {
        
        width: 110px;
        height: 110px;
        background: #F7F5FF;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 800;
        font-size: 22px;
        line-height: 20px;
        text-align: center;
        color: #7A00C6;
        
    }

    & > div {
        margin-top: -20px;
    }

    & > span {
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        width: 150px;
        text-align: center;
        /* identical to box height */


        color: #1C1C1A;
    }
`;
const P2Info = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-left: 1rem;
    & > div > h1 {
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        /* identical to box height */
        color: #1C1C1A;
    }

    & > div > p {

        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 400;
        font-size: 9px;
        line-height: 13px;

        color: #1C1C1A;
    }
`;

const P3Card = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin: 0 2rem;
    justify-content: space-between;
    & > h1{
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        /* identical to box height */


        color: #1C1C1A;

    }

    & > div {
        width: 110px;
        height: 110px;
        background: #F7F5FF;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 800;
        font-size: 22px;
        line-height: 20px;
        text-align: center;
        color: #7A00C6;
        
    }
    
`; 

const P3Wrapper = styled.div`
    width: 90%;
`

const P3Info = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-left: 1rem;
    & > h1 {
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        /* identical to box height */
        color: #1C1C1A;
    }

    & > p {
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 400;
        font-size: 9px;
        line-height: 13px;

        color: #1C1C1A;
    }
`;

const P3Field = styled.div`
    background: #F7F5FF;
    margin: 1rem;
    width: 100%;
    padding: 1rem;
    font-family: 'Neue Plak';
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 13px;

    color: #1C1C1A;

    & > h1{
        font-family: 'Neue Plak';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        /* identical to box height */


        color: #1C1C1A;
    }
`
export {
    Container, 
    Header, 
    Section, 
    LeaderCard,
    HeaderCard,
    WrapperHeaderCard,
    WrapperGraph,
    Graph,
    P2Card,
    P2Info,
    P3Card,
    P3Wrapper,
    P3Info,
    P3Field,
    Wrapper
}