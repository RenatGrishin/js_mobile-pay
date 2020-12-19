import React, {useContext} from "react";
import {OperatorContext} from "./[id]";
import {error} from "next/dist/build/output/log";

export default function Operator ({moneyValidationSum,
	                                  phoneValidationNum,
	                                  submitCheck,
	                                  moneyCheckError,
	                                  phoneCheckError,
	                                  phoneCheckAllNum,
	                                  showError
}){

	const state = useContext(OperatorContext)



	return(
		<div>
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
			<input className="send-submit" disabled={submitCheck()} onClick={moneyValidationSum} type="submit" value="Продолжить" />
		</div>
	)
}