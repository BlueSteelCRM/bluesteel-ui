export function escapeValue(value){
	return "'"+value.replace("'","\\'")+"'";
};
