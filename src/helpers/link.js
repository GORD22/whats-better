
const link = (type, t) => {
	let lnk = '';

	if (type == 'user') {
		let v =  '/@';

		if (!('login' in t)) {
			lnk = v + t.id;

		} else if (t.login == '') {
			lnk = v + t.id;

		} else {
			lnk = v + t.login;
		}
	} 

	return lnk;
	
}

export default link