import React from 'react';
/*
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
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
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = values => {
    console.log(values);
  };
	let {fields}=props;
	if (!Array.isArray(fields)) return "fields must be an array";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
		<input
        name="email2"
        ref={register({
          required: 'Required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "invalid email address"
          }
        })}
      />
      {errors.email2 && errors.email2.message}

			All Errors:{}
			{fields.map((f,i)=>{
				let reg=Object.assign({},f);delete reg.name; // a name or a thype
	      return <div key={i}>
				{f.name}
				<input
	        name={f.name}
	        ref={register(reg)}
	      />
	      	Errors:{errors[f.name] && errors[f.name].message}
				</div>;
			})}
      <button type="submit">Submit</button>
    </form>
  );
};
