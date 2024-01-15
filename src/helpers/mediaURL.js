/**
 * Получение адреса картинки на сервере изображений
 * 
 * @param {Object} media 
 * @param {String} size 
 */ 
export const mediaURL = (media, size) => {
    let url;

    if (!media) {
        url = null;
		return url
    } 
	
	if (media.v === "2") {
		if (media.type == 'image') {
			let wh = getImageSize(size, media.sizes);

			url = `https://${media.storage}.ttcdn.me/${media.path}/${wh.width}_${wh.height}.${media.ext}`;
	
			return url
		}

		if (['video', 'clip'].includes(media.type)) {
			let wh = getImageSize(size, media.sizes);
			url = `https://${media.storage}.ttcdn.me/${media.path}/${wh.width}.${media.ext}`;

			return url
		}
	}
    
	return null
};


/**
 * Признак альбомной ориентации изображения
 * 
 * @param {Object} media 
 * @param {Bool}  
 */
export const isHorizontal = (media) => {
	let width, height;

	if (!media) {
		return

	}

	for (let size of media.sizes ) {
		let [w, h] = size.split(":");
		width = parseInt(w, 10)
		height = parseInt(h, 10)
		break;
	}

	return width > height;
}

/**
 * Получает подходящий размер изображений из набора размеров
 * 
 * @param {String} size 
 * @param {Array} values 
 * @param {String} result
 */
const getImageSize = (size, values) => {

	let sizes = values.map(t => {
		let width, height;
		let wh = t.split(":");
		let count = wh.length;

		if (count > 0) {
			width = parseInt(wh[0], 10)
		}
		if (count > 1) {
			height = parseInt(wh[1], 10)
		}

		return {
			width,
			height
		}
	})

	let count = sizes.length;
	let widths = sizes.map(t=>t.width)

	const min = Math.min(...widths);
	const max = Math.max(...widths);

	if (size == undefined) {
		let maxSize = sizes[0]
		for (let i=1; i < count; i++) {
			if (maxSize.width < sizes[i].width ) {
				maxSize = sizes[i]
			}
		}

		return maxSize
	}

	const sz = size.split("-");

	const width = sz[0] !== 'auto' ? parseInt(sz[0], 10) : null;
	//const height = sz[1] !== 'auto' ? parseInt(sz[1], 10) : null;

	const getMax = (v) => {
		let maxSize

		for (let i = 0; i < count; i++) {
			if (!maxSize ) {
				maxSize = sizes[i]
				continue
			}

			let diff = sizes[i].width - v

			if (diff > maxSize.width - v) {
				maxSize = sizes[i]
			}
		}

		return maxSize;
	}

	const getMin = (v) => {
		let minSize;

		for (let i = 0; i < count; i++) {
			let diff = sizes[i].width - v

			if (!minSize ) {
				minSize = sizes[i]
				continue
			}

			if (diff < minSize.width - v) {
				minSize = sizes[i]
			}
		}

		return minSize;
	}

	const getMinPositive = (v) => {
		let minSize

		for (let i = 0; i < count; i++) {
			let diff = sizes[i].width - v 

			if (diff < 0) {
				continue
			}
		
			if (!minSize && diff >= 0) {
				minSize = sizes[i]
				continue
			}

			if (diff < minSize.width - v) {
				minSize = sizes[i]
			}
		}

		return minSize;
	}

	let result

	// is top 
	if (width >= max) {
		result = getMax(width)
	}

	// is middle 
	if (width < max && width > min) {
		result = getMinPositive(width)
	}

	// is bottom 
	if (width <= min) {
		result = getMin(width)
	}

	return result
}

export const getThumbnail = (media) => `https://${media.storage}.ttcdn.me/${media.path}/thumbnail.jpg`;