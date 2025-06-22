import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useMemo } from 'react';
import { useEffect } from 'react';

function App() {
  
  // useMemo -> should be used when we need to remember the the output of expensive function call, 
  const [exchangeData1, setExchangeData1] = useState(0);
  const [exchangeData2, setExchangeData2] = useState(0);
  const [count, setCount] = useState(0);

  // by-default this function will be called every-time when the component re-renders, not the ideal-case because if both exchnage data does not changes then why calling this expensive task => Wrap the function inside the "useMemo" this will return us the result that will persist between the re-renders
  // if the any of the exchange data changes then the output should be re-calculated, the exchangedata should be present inside the dependency array of useMeme

  // this problem can be solved using other techniques but using "useMemo" is the most optimized way
  const result = useMemo(function() {
    console.log("hello")
    return exchangeData1 + exchangeData2;
  }, [exchangeData1, exchangeData2]);
  // everytime when the any of the exchange data changes this result will be calculated again, this will not calculated when the count changes


  // doing the side effect of fetching the exchange datas
  useEffect(function() {
    setTimeout(function() {
      setExchangeData1(100);
    }, 3000);

    setTimeout(function() {
      setExchangeData2(200);
    },5000);
  }, []);

  function updateExchangeData() {
    setExchangeData1((value) => value * Math.random());
    setExchangeData2((value) => value * Math.random());
  }

  return (
    <div>
      <div>Sum of both exchanges are {result}</div>

      <button onClick={function() {
        updateExchangeData();
      }}>
        Make exchange data change to random number
      </button>

      <button onClick={() => setCount(count + 1)}>Count is {count}</button>
    </div>
  )
}

export default App


// "State" in react is any value which is "dynamic" in nature => must be updated on the dom when changes, To do this React provides us hook called "useState" => anything that is dynamic on website should be wrapped inside the useState so that react can perform the DOM updation when it updated, 

// ReactDOM is the library that updates the DOM, react finds the different between the previous state and new state and delegate the updation of DOM with only the difference

// Hooks in react are used to manage the state (dynamic_content) + they allow us to hook into the life-cycle-method of functional react components


// "re-rendering" means the component / function will be called again to update the DOM

// If anything on the website is dynamic we need to wrap that inside the useState and then pass to the React than only it will re-render the function and hence DOM will be updated



// "useEffect" hook is used to handle side-effect (anything that needs to be done after the component renders), the side-effects includes 1. fetching data from server 2. subscribing and unsubscibing to the services

// => when the component renders intially / mounts the side_effect function will run + any time when the value / reference inside dependency_array changes it will run

// useMemo hook -> This hook is used to remember / memoize the result of some expensive function call that you does not need to do in every re-render.