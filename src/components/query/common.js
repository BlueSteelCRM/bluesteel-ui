function escapeValue(value){
	if (!value) return "''";
	return "'"+value.replace("'","\\'")+"'";
};
function unescapeValue(v){
	if (!v) return "";
	if (v.indexOf("'")===0){
		return v.slice(1,-1).replace(/\\'/g,"'");
	}else if (v.indexOf('"')===0){
		return v.slice(1,-1).replace(/\\"/g,'"');
	}else return v.replace(/\\"/g,'"').replace(/\\'/g,"'");
}


/*
	turns a {field,operator,value} into a {expression}
*/
function toCondition(vals){
	return {expression:toExpression(vals)};
}

function toExpression(vals){
	let {field,operator,value}=vals;
	if (Array.isArray(value)){
		value="("+value.map(escapeValue).join(",")+")";
	}else{
		value=escapeValue(value);
	}
	return field+" "+operator+" "+value;
}


function fromCondition(condition){
	if (!condition) return {};
	return fromExpression(condition.expression);
}

function fromExpression(exp){
	if (typeof exp!=='string'){
		 return {};
	}
	let m=exp.match(/(.*?)([<>=!]+| LIKE | IN | NOT IN)(.*)/i);

	if (!m || !m[3]) return {error:"Invalid expressions:"+exp};

	let value=m[3].trim();
	if (value.match(/^\(.*\)/)){
		value=value.slice(1,-1).split(",").map(d=>unescapeValue(d.trim()));
	}else{
		value=unescapeValue(value);
	}
	let operator=m[2].trim().toLowerCase();

	return {field:m[1],operator,value};
}

export {escapeValue,unescapeValue,fromCondition,toCondition,toExpression,fromExpression};
