import React, { useState } from 'react';
import './BirthPalindrome.css';

const reverseStr = (str) => {
    let listofChars = str.split('');
    let reverseCharacters = listofChars.reverse();
    let reversedStr = reverseCharacters.join('');
    return reversedStr;
  }
  
  const ispalindrome = (str) =>{
    return str === reverseStr(str);
  }
  
  const convertDatetoString = (date) => {
    let dateStr = {day:'',month:'',year:''};
    if(date.day <10){
        dateStr.day = '0'+date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }
    if(date.month <10){
        dateStr.month = '0'+date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
  
    return dateStr;
  }
  
  
  const getAllDateFormats = (date) => {
    let dateStr = convertDatetoString(date);
    var ddmmyyyy = dateStr.day + dateStr.month+ dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy =   dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  
  
  const checkPalindromeForAlldateformats  = (date) => {
    let listOfpalindromes = getAllDateFormats(date);
    let flag = false;
    for(let i=0;i<listOfpalindromes.length;i++){
        if(ispalindrome(listOfpalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;
  }
  
  
  
  const isleapyear = (year) => {
    if(year%400 === 0){
        return true;
    }
    if(year%100 === 0){
        return false;
    }
    if(year%4 === 0){
        return true;
    }
  }
  
  const getnextDate = (date) =>{
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
  
    let dayMonths = [31,28,31,30,31,30,31,31,30,31,30,31];
    
    if(month === 2){
        if(isleapyear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
            else{
                if(day > 28){
                    day = 1;
                    month++;
                }
            }
        }
    }
    else{
        if(day > dayMonths[month-1]){
            day = 1;
            month++;
        }
    }
    if(month > 12){
        month =1;
        year++;
    }
    return {
        day : day,
        month : month,
        year : year
    }
  }
  
  const getNextPalindromeData = (date) => {
    let countDates = 0
    let nextDate = getnextDate(date);
    while(1){
        countDates++;
        let palindromeData = checkPalindromeForAlldateformats(nextDate);
        if(palindromeData){
            break;
        }
        nextDate = getnextDate(nextDate);
    }
    return [countDates,nextDate];
  }
  
const BirthPalindrome = () =>{
    const [getBirthday,setBirthday] = useState('');
    const [birthText,setbirthText] = useState('');
    const inputHandler = (e) => {
        setBirthday(e.target.value);
    }
    const btnClickhandler = () => {
        if(getBirthday !== ''){
            let listofDate = getBirthday.split('-');
            let date = {
                day : Number(listofDate[2]),
                month : Number(listofDate[1]),
                year : Number(listofDate[0])
            }
            let birthPalindrome = checkPalindromeForAlldateformats(date);
            if(birthPalindrome){
                setbirthText(`Yay! Your Birth Date is a palindrome :)`)
            }
            else{
                const [counter,nextDate] = getNextPalindromeData(date);
                setbirthText(`The next palindrome date is ${nextDate.day}- ${nextDate.month}- ${nextDate.year}, You missed by ${counter} days! :(`)
            }
        }
        setBirthday('');
       
    }
    return(
        <div className="main">
            <h1>Palindrome Birth Date 🎂 🎂</h1>
            <h3>Enter your birthday date:</h3>
            <input type='date' onChange={(e) => inputHandler(e)} value={getBirthday}/>
            <br/>
            <button onClick={btnClickhandler} >Show</button>
            <h3>{birthText}</h3>
        </div>
    )
}

export default BirthPalindrome;