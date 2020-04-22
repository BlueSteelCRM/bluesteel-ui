import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from "react-select"
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
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

function DateField(props){
	const {register,name,value,error,label,onChange,options,setValue,getValues}=props;
	React.useEffect(() => {
		register({name});
	}, [name,register]);

	return <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="yyyy-MM-dd"
      margin="normal"
      id={`auto-form-${name}`}
      label={label}
      value={value}
      onChange={date=>{
				let d=date.toISOString().slice(0,10);
				setValue(name,d);
				onChange();
			}}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
}

function SelectField(props){
	const {register,name,value,error,label,onChange,options,setValue,getValues}=props;
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

	return <Select
			className={`auto-form-field-select`}
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
	const {register,display,name,value,error,label,description,onChange,options,type}=props;
	if (!name) return "Name required";
	let displayClass="";
	if (!display)displayClass=" auto-form-field-no-display";

	let element=null;
	if (options){
		 element=<SelectField {...props}/>;
	}else if (type==="date"){
		 element=<DateField {...props}/>;
	 }else{

		let registerValues=Object.assign({},props);
		delete registerValues.name;
		let common={
			fullWidth:true,
			label,
			name,
			defaultValue:value,
			error,
			helperText:(error && error.message)||description
		}

		let InputProps={autoComplete: 'off'};
		if (type==="currency"){
				InputProps.startAdornment=<InputAdornment position="start">$</InputAdornment>;
		}

		element=<TextField
			inputRef={register(registerValues)}
			InputProps={InputProps}
			onChange={onChange}
			{...common}
			/>
		}
	return <div className={`auto-form-field${displayClass}`}>{element}</div>;
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
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
    <form className="auto-form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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
	      return <Field key={i} {...fieldItems}/>;
			})}
			{submit_button &&
				<Box mt={3}> <Button variant="contained" color="primary" type="submit">Save</Button></Box>
			}
    </form>
		</MuiPickersUtilsProvider>
  );
};
