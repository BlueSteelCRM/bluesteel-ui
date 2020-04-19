import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from "react-select"
/*import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
*/
import {useForm } from "react-hook-form";
/*
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';

import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
*/

function SelectField(props){
	const {register,name,value,display,error,label,onChange,options,setValue,getValues}=props;
	React.useEffect(() => {
		register({ name}); // custom register react-select
	}, [name,register])
	let opts=null;
	//Cleanup options
	if (Array.isArray(opts)){
		opts=options;
	}else{
		opts=Object.keys(options).map(o=>(
			{value:o,label:options[o]}
		));
	}
	let defaultValue=opts.find(o=>value===o.value);
	let displayClass="";
	if (!display)displayClass=" auto-form-field-no-display";
	return <Select
			className={`auto-form-field-select${displayClass}`}
			defaultValue={defaultValue}
			value={opts.find(o=>value===o.value)}
			options={opts}
			onChange={selectedOption => {
				let value=null;
				if (selectedOption){
					if (Array.isArray(selectedOption)){
						value=selectedOption.map(v=>v.value);
					}else{
						value=selectedOption.value;;
					}
				}
				setValue(name, value);
				onChange();
				return selectedOption;
			}}
		/>
}


function Field(props){
	const {register,display,name,value,error,label,onChange,options}=props;
	if (!name) return "Name required";
	if (options) return <SelectField {...props}/>;

	let registerValues=Object.assign({},props);
	delete registerValues.name;
	let common={
		fullWidth:true,
		label,
		name,
		defaultValue:value,
		error,
		helperText:error && error.message
	}
	let displayClass="";
	if (!display)displayClass=" auto-form-field-no-display";

	return <div className={`auto-form-field${displayClass}`}><TextField
		inputRef={register(registerValues)}
		inputProps={{autocomplete: 'off'}}
		onChange={onChange}
		{...common}
		/></div>
}


export default function AutoForm(props){
	//The useForm / react-hook-form library is a VERY fast react form library that handles
	// required, errors, etc, etc, but does require a 'register' method to be called
	// on form elements

	let {fields,values,submit_button=true}=props;
  const { control,handleSubmit, register, errors,getValues,setValue } = useForm({defaultValues:values});
	if (!Array.isArray(fields)) return "fields must be an array";
	let hiddenValues={}

  const onSubmit = _values => {
		let values=Object.assign(_values,hiddenValues);
    if (props.onSubmit){
			return props.onSubmit(values);
		}else{
			console.log("Submitted form:",values);
			return false;
		}
  };


	const fieldOnChange=ev=>{
		let v=getValues();
		for (let i in v){
			if (Array.isArray(v[i])) v[i]=v[i][0]?.value;
		}
		if (typeof props.onChange=='function') props.onChange(v);
	}

  return (
    <form className="auto-form" autoComplete="off" autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
			{fields.map((f,i)=>{
				if (!f){
					throw new Error("You must include a value field array");
				}
				if (f.hidden){
					hiddenValues[f.name]=values[f.name];
					return null;
				}
				let display=true;
				if (typeof f.display==='function'){
					display=f.display(values);
				}
				let value=values[f.name];
				let fieldItems=Object.assign({},f,{
					value,
					display,
					setValue,
					control,
					error:errors[f.name],
					register,
					onChange:fieldOnChange,
					getValues
				});
				//delete reg.name; // registration names handled across a whole form
	      return <div key={i} className="auto-form-field"><Field {...fieldItems}/></div>;
			})}
			{submit_button &&
				<Button variant="contained" color="primary" type="submit">Save</Button>
			}
    </form>
  );
};
