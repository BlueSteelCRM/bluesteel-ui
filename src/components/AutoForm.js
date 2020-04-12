import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
/*
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
*/
import { useForm } from "react-hook-form";

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

	let {fields,values,submit_button=true,onChange}=props;
	if (!Array.isArray(fields)) return "fields must be an array";

  return (
    <form autoComplete="off" autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
			{fields.map((f,i)=>{
				if (f.hidden){
					hiddenValues[f.name]=values[f.name];
					return null;
				}
				let reg=Object.assign({},f);
				delete reg.name; // registration names handled across a whole form
	      return <div key={i}>
					<TextField key={i} hidden={f.hidden} inputRef={register(reg)}
						label={f.name} name={f.name}
						inputProps={{
					    autocomplete: 'off',
						}}
						defaultValue={values[f.name]}
						error={errors[f.name]}
						helperText={errors[f.name] && errors[f.name].message}
						onChange={ev=>{
							let v=getValues();
							if (typeof onChange=='function') onChange(v);
						}}
						/>
				</div>;
			})}
			{submit_button &&
				<Button variant="contained" color="primary" type="submit">Save</Button>
			}
    </form>
  );
};
