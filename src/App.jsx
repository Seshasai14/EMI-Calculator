import React, { useState } from 'react';
import { FaRupeeSign, FaIndianRupeeSign, FaPercent, } from "react-icons/fa6";
import {Clock} from 'react-feather';
import './App.css';

const App = () => {
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [time, setTime] = useState(0);
  const [monthlyEmi, setMonthlyEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  function calculateMonthlyEMI(principal, interest, time) {
    const numberOfMonths = time * 12;
    const monthlyInterestRate = (interest / 12) / 100;
    const emi = principal * monthlyInterestRate * ((1 + monthlyInterestRate) ** numberOfMonths) / (((1 + monthlyInterestRate) ** numberOfMonths) - 1);
    return emi;
  }

  function calculateTotalInterest(principal, annualRate, tenureYears) {
    const EMI = calculateMonthlyEMI(principal, annualRate, tenureYears);
    const totalPayments = tenureYears * 12;
    const totalAmountPaid = EMI * totalPayments;
    const totalInterest = totalAmountPaid - principal;
    return totalInterest;
  }

  function handleCalculate() {
    const emi = calculateMonthlyEMI(principal, interest, time);
    const interestAmount = calculateTotalInterest(principal, interest, time);
    const amount = Number(principal) + interestAmount;

    setMonthlyEmi(emi);
    setTotalInterest(interestAmount);
    setTotalAmount(amount);
  }

  return (
    <>
    <h1 className='text-3xl font-popp text-center text-blue-700'>EMI Calculator</h1>
    <div className="lg:grid grid-cols-12 gap-4 h-screen bg-slate-50 p-5">
      
      <div className="p-4 mb-4 md:mb-0 container bg-gray-100 rounded shadow-lg shadow-slate-300 font-popp lg:col-span-10  ">
        <div className='flex flex-row m-3'>
          <label className='basis-1/2'>Enter the principal Amount</label>
          <span><FaIndianRupeeSign /></span><input onChange={(e) => { setPrincipal(e.target.value) }} className='basis-1/4 rounded focus:outline-none shadow-lg shadow-indigo-500/40' type="number" />
        </div>
        <div className='flex flex-row m-3'>
          <label className='basis-1/2'>Enter the rate of interest</label>
          <span><FaPercent /></span><input onChange={(e) => { setInterest(e.target.value) }} className='basis-1/4 rounded focus:outline-none shadow-lg shadow-indigo-500/40' type="number" />
        </div>
        <div className='flex flex-row m-3'>
          <label className='basis-1/2'>Enter the loan tenure</label>
          <span><Clock/></span><input onChange={(e) => { setTime(e.target.value) }} className='basis-1/4 rounded focus:outline-none shadow-lg shadow-indigo-500/40' type="number" />
        </div>
        <div className='flex justify-center'>
          <button onClick={handleCalculate} className='basis-1/4 bg-green-400 rounded p-2'>Calculate</button>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-row m-3'>
            <p className='basis-1/2'>Monthly EMI</p><span><FaRupeeSign /></span><span className='text-sky-400'>{Math.round(monthlyEmi)}</span>
          </div>
          <div className='flex flex-row m-3'>
            <p className='basis-1/2'>Total Interest Payable</p><span><FaRupeeSign /></span><span className='text-sky-400'>{Math.round(totalInterest)}</span>
          </div>
          <div className='flex flex-row m-3'>
            <p className='basis-1/2'>Total Amount</p><span><FaRupeeSign /></span><span className='text-sky-400'>{Math.round(totalAmount)}</span>
          </div>
        </div>
      </div>
      <div className=' font-popp   bg-white rounded shadow-lg shadow-slate-300 lg:col-span-2 flex items-center justify-center '>
        <table className='table-auto border-spacing-2 border-slate-600'>
          <thead className='text-left'>
            <tr>
              <th>Loan Type</th>
              <th>Interest Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Home Loan</td>
              <td>8.35%</td>
            </tr>
            <tr>
              <td>Education Loan</td>
              <td>10.25%</td>
            </tr>
            <tr>
              <td>Personal Loan</td>
              <td>12.5%</td>
            </tr>
            <tr>
              <td>Car Loan</td>
              <td>9.5%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default App;
