function upper(u){
	if (!u) return "";
	if (typeof u!='string') u=u.toString();
	return u[0].toUpperCase()+u.slice(1);
}
export {upper};
