import React, {useContext} from "react";
import {OperatorContext} from "./[id]";
import operatorState from "../store";
import Complete from "./complete";
import Link from "next/link";

export default function Operator ({moneyValidationSum,
                                    phoneValidationNum,
                                    submitCheck,
                                    moneyCheckError,
                                    phoneCheckError,
                                    phoneCheckAllNum,
                                    showError
                                  }){

  const state = useContext(OperatorContext)

// надо найти элемент по id
  function sendMoney (){
    document.getElementById("pay-form").classList.add("close-form");
    setTimeout(()=>{
      document.getElementById("complete-id").classList.remove("complete-none")
    }, 500)
    setTimeout(()=>{},2000)
  }

  return(<div>
      <div id="complete-id" className="complete-none">
        <Complete />
      </div>
    <div id="pay-form">
      <h2>{operatorState.opeartors[state.operatorID].name}</h2>
      <div className="input-number">
        <h4>Номер телефона:</h4>
        <input
          type="text"
          value={state.phone.num}
          onFocus={phoneCheckError}
          onBlur={(e)=>{phoneCheckAllNum(e.target.value)}}
          onChange={(e)=>{phoneValidationNum(e.target.value)}}
        ></input>
        {showError(state.phone.status.type, state.phone.status.errors)}
      </div>
      <div className="input-number">
        <h4>Сумма:</h4>
        <input
          type="text"
          value={state.money.sum}
          onFocus={moneyCheckError}
          onBlur={(e)=>{moneyValidationSum(e.target.value)}}
          onChange={(e)=>{moneyValidationSum(e.target.value)}}
        ></input>
        {showError(state.money.status.type, state.money.status.errors)}
      </div>
      <input className="send-submit" disabled={submitCheck()} onClick={sendMoney} type="submit" value="Продолжить" />
    </div>
    </div>
  )
}