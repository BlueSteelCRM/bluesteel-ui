import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
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
import { useForm } from "react-hook-form";

function Field(props){
	const {register,hidden,name,value,error,label,onChange}=props;
	if (!name) return "Name required";
	let registerValues=Object.assign({},props);
	delete registerValues.name;
	return <TextField hidden={hidden}
		inputRef={register(registerValues)}
		fullWidth
		label={name}
		name={name}
		inputProps={{
			autocomplete: 'off',
		}}
		defaultValue={value}
		error={error}
		helperText={error && error.message}
		onChange={onChange}
		/>
}


export default function AutoForm(props){
	//The useForm / react-hook-form library is a VERY fast react form library that handles
	// required, errors, etc, etc, but does require a 'register' method to be called
	// on form elements
	let hiddenValues={}
  const { handleSubmit, register, errors,getValues } = useForm();

  const onSubmit = _values => {
		let values=Object.assign(_values,hiddenValues);
    if (props.onSubmit){
			return props.onSubmit(values);
		}else{
			console.log("Submitted form:",values);
			return false;
		}
  };

	let {fields,values,submit_button=true}=props;
	if (!Array.isArray(fields)) return "fields must be an array";

	const fieldOnChange=ev=>{
		let v=getValues();
		if (typeof props.onChange=='function') props.onChange(v);
	}

  return (
    <form className="auto-form" autoComplete="off" autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
			{fields.map((f,i)=>{
				if (f.hidden){
					hiddenValues[f.name]=values[f.name];
					return null;
				}
				let fieldItems=Object.assign({},f,{
					value:values[f.name],
					error:errors[f.name],
					register,
					onChange:fieldOnChange
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
