function escapeValue(value){
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
	turns a {name,operator,value} into a {expression}
*/
function toCondition(vals){
	let value=vals.value;
	if (Array.isArray(value)){
			value="("+value.map(escapeValue).join(",")+")";
	}else{
		value=escapeValue(value);
	}
	return {expression:vals.name+" "+vals.operator+" "+value};
}

function fromCondition(condition){
	if (!condition) return null;
	let exp=condition.expression || condition;
	if (!exp) return null;
	let m=exp.match(/(.*?)([<>=!]+| LIKE | IN | NOT IN)(.*)/i);
	let value=m[3].trim();
	if (value.match(/^\(.*\)/)){
		value=value.slice(1,-1).split(",").map(d=>unescapeValue(d.trim()));
	}else{
		value=unescapeValue(value);
	}
	let operator=m[2].trim().toUpperCase();

	return {name:m[1],operator,value};
}

export {escapeValue,unescapeValue,fromCondition,toCondition};
/*
["x=123","y!='abc'",
	"abc like 'abc%'",
	"abc like 'a\\'%'",
	"abc IN (1,2,3)",
	"abc NOT IN ('1','2','3')"
].map(c=>console.log(c,fromCondition(c),toCondition(fromCondition(c))));
*/
