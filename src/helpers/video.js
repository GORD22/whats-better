export const getRenderings = (media) => {
	let list = [];

	for (let size of media.sizes) {
		let [quality, targents] = size.split(",");

		if (!quality) {
			continue
		}

		if (!targents) {
			continue
		}

		let [w, h] = targents.split(":")

		if (!w) {
			continue
		}

		if (!h) {
			continue
		}

		let item = {
			quality: parseInt(quality.replace(/\D/g,''), 10),
			url: `https://${media.storage}.ttcdn.me/${media.path}/${quality}.${media.ext}`,
			width: parseInt(w, 10),
			height: parseInt(h, 10),
		}

		list.push(item)
	}

	return list;
}