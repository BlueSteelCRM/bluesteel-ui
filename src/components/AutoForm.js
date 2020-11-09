import React from 'react';
import {parseISO} from 'date-fns';

import {
	Form,
	Row,
	Col
} from 'react-bootstrap';

import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select"

import {useForm,Controller } from "react-hook-form";

function DateField(props){
	const {name,value,label,control}=props;

	return <>{name}:<Controller
              as={<ReactDatePicker dateFormat="yyyy-MM-dd"/>}
              control={control}
              valueName="selected" // DateSelect value's name is selected
              onChange={([selected]) =>{
								debugger;
								return selected;
							}}
              name={name}
              className="input"
              placeholderText="Select date"
            /></>;
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

	const styles = {
	  control: base => ({
	    ...base,
	    borderWidth: "0 0 1px 0",
	    // This line disable the blue border
	    boxShadow: 'none'
	  })
	};

	return <Select
			className={`auto-form-field-select`}
			defaultValue={defaultValue}
			styles={styles}
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
	let  {register,display,name,value,error,label=name,description="",onChange,options,type}=props;
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

		//let InputProps={autoComplete: 'off'};

		element=<Form.Control
						{...common}
            ref={register(registerValues)}
          ></Form.Control>
		}
	return <div className={`auto-form-field${displayClass}`}>{element}</div>;
}


export default function AutoForm(props){
	//The useForm / react-hook-form library is a VERY fast react form library that handles
	// required, errors, etc, etc, but does require a 'register' method to be called
	// on form elements
	let {fields,values={},submit_button=true}=props;

	fields.filter(t=>t.type==="date").forEach(d=>{
		if (values[d.name] && typeof values[d.name]=='string') values[d.name]=parseISO(values[d.name]);
	});

  const { control,handleSubmit, register, errors,getValues,setValue } = useForm({defaultValues:values});

	if (!Array.isArray(fields)) return "fields must be an array";
	if (!values) return "Values required, not found in "+Object.keys(props);
	let hiddenValues={};
	if (values.id) hiddenValues.id=values.id;

	let sizes={xs:12,sm:12,md:12,lg:12};
	if (props.inline) sizes={xs:12,sm:6,md:6,lg:6};

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
    <form className="auto-form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
			<Row>
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
		      return <Col key={i} {...sizes}><Field {...fieldItems}/></Col>;
				})}
				{submit_button &&
					<button className="button button-primary" type="submit">Save</button>
				}
			</Row>
    </form>
  );
};
