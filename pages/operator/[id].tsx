import React from 'react'
import Operator from "./operator";
import {useState} from 'react'
import {number, string} from "prop-types";
import Router, {useRouter} from "next/router";


const localState = {
  operatorID: 0,
  phone: {num: '', status:{type: false, errors:'Введите номер телефона'}},
  money: {sum: '', status:{type: false, errors:'Сумма должна быть от 1 до 1000'}},
}

export const OperatorContext = React.createContext(null);

export default function operatorContainer ():any{
  const router = useRouter();

  let newLS = localState;
  newLS.operatorID = 1;
  if (Number(router.query.id)) newLS.operatorID = Number(router.query.id);

  const [ls, setLs] = useState(newLS)
  const copyState = {...ls}


  const delFirstZero =(sum:string)=>{
    const check = sum.slice(0,2);
    if(check.match(/0[0-9]/)) return Number(sum).toString();
    return sum
  }
  const moneyValidationOnlyNumb =(str:string)=>{
    str = str.replace(",", ".");
    const isInteger = str.match(/[.]/g)

    if (str.match(/[^0-9.]{1,9}/g)) return false
    if(isInteger){
      if(isInteger.length>1) return false
    }
    if(str === "." || str === "0." || str === '0'){
      return "0";
    }else if(str === ''){
      return '';
    }
    if(!str.match(/[.]/g)) return delFirstZero(str)
    if(str.split('.').pop().length <= 2) return delFirstZero(str)
  }
  const moneyValidationSum =(moneySum:string)=>{
    let sum:string|boolean = moneyValidationOnlyNumb(moneySum)
    if(sum || sum === '' || sum === '0'){
      copyState.money = {...ls.money}
      copyState.money.status = {...ls.money.status}

      if(Number(sum) > 1000) {
        copyState.money.sum = '1000';
      } else if(Number(sum) < 0) {
        copyState.money.sum = '0';
        copyState.money.status.errors = "Сумма должна быть от 1 до 1000";
        copyState.money.status.type = true
      }else{
        if(Number(sum)<1){
          copyState.money.sum = sum;
          copyState.money.status.errors = "Сумма должна быть от 1 до 1000";
          copyState.money.status.type = true;
        }else{
          copyState.money.sum = sum;
          copyState.money.status.errors = ""
          copyState.money.status.type = false;
        }
      }
      setLs(prev=>{return copyState})
    }
  }
  const moneyCheckError =()=>{
    copyState.money = {...ls.money}
    copyState.money.status = {...ls.money.status}
    if(copyState.money.status.errors) copyState.money.status.type = false
    setLs(prev =>{return copyState})
  }

  const phoneTransformStringInArrayNumbs =(phoneNumber:string)=>{
    if(phoneNumber === '' || phoneNumber === '(' || !phoneNumber.match(/[0-9]{1,1}/g)) return '';

    let numArrStr:string[] = phoneNumber.match(/[0-9]{1,1}/g);
    let numArr:number[] = []
    for(let i:number=0; i<numArrStr.length; i++){
      numArr.push(Number(numArrStr[i]))
    }
    if(numArr || numArr.length <=10) return numArr;
  }
  const phoneMask=(phone:number[]|string)=>{
    const mask:string[] = "(xxx) xxx xx-xx".split('',50);
    let phoneNumber:string = '';
    let counterPhone:number = 0;

    if (!phone.length) return phoneNumber;
    for (let i:number=0; i<mask.length && counterPhone<phone.length; i++){
      if(mask[i] !== "x"){
        phoneNumber += mask[i];
      }else {
        phoneNumber += phone[counterPhone];
        counterPhone++;
      }
    }
    return (phoneNumber);
  }
  const phoneValidationNum =(numb:string)=>{
    copyState.phone = {...ls.phone}
    copyState.phone.status = {...ls.phone.status}
    copyState.phone.status.type = false

    const phoneNumb:number[]|string = phoneTransformStringInArrayNumbs(numb)
    //if (phoneNumb === false) return false
    if(phoneNumb === ''){
      copyState.phone.num = ''
      copyState.phone.status.errors = "Вы забыли написать номер телефона"
    }
    if(phoneNumb.length < 10){
      copyState.phone.num = phoneMask(phoneNumb)
      copyState.phone.status.errors = "Номер телефона не верный"
    }
    if(phoneNumb.length == 10){
      copyState.phone.num = phoneMask(phoneNumb)
      copyState.phone.status.errors = ""
    }

    setLs(prev=>{return copyState})
  }
  const phoneCheckAllNum =(numb:string)=>{
    const phoneNumb:number[]|string = phoneTransformStringInArrayNumbs(numb)
    copyState.phone = {...ls.phone}
    copyState.phone.status = {...ls.phone.status}

    if(phoneNumb === ''){
      copyState.phone.status.type = true
      copyState.phone.status.errors = "Вы забыли написать номер телефона"
    }
    if(phoneNumb.length < 10){
      copyState.phone.status.type = true
      copyState.phone.status.errors = "Номер телефона не верный"
    }
    if(phoneNumb.length == 10){
      copyState.phone.status.type = false
      copyState.phone.status.errors = ""
    }

    setLs(prev=>{return copyState})
  }
  const phoneCheckError =()=>{
    copyState.phone = {...ls.phone}
    copyState.phone.status = {...ls.phone.status}
    if(copyState.phone.status.errors) copyState.phone.status.type = false
    setLs(prev =>{return copyState})
  }

  const submitCheck =()=>{
    if(ls.phone.status.type || ls.phone.status.errors || ls.money.status.type || ls.money.status.errors){
      return 'disabled';
    }
    return '';
  }
  const showError =(err, msg)=>{
    if(err) return <div className="input-error">{msg}</div>
  }
  const sendMoney =()=>{
    document.getElementById("pay-form").classList.add("close-form");
    setTimeout(()=>{
      document.getElementById("complete-id").classList.remove("complete-none")
    }, 500)
    setTimeout(()=>{Router.push('/')},2000)
  }
  const getOperatorName=(id:number, array:[{id:number, name:string, img:string}])=>{
    console.log(array)
    let operatorName = array.filter((arr)=>{ return arr.id === id});
    return(operatorName[0].name)
  }

  return(<div>
      <OperatorContext.Provider value={ls}>
        <Operator
          moneyValidationSum={moneyValidationSum}
          phoneValidationNum={phoneValidationNum}
          submitCheck={submitCheck}
          moneyCheckError={moneyCheckError}
          phoneCheckError={phoneCheckError}
          phoneCheckAllNum={phoneCheckAllNum}
          showError={showError}
          sendMoney={sendMoney}
          getOperatorName={getOperatorName}
        />
      </OperatorContext.Provider>
    </div>
  )
}