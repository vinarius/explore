/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 2 - Gapminder Clone
 */

window.addEventListener('DOMContentLoaded', (window_event) => {

	const margin = {
		top: 30,
		right: 20,
		bottom: 50,
		left: 50
	};

	const parentHeight = document.getElementById('chart-area').clientHeight;
	const parentWidth = document.getElementById('chart-area').clientWidth;

	const height = parentHeight - margin.top - margin.bottom;
	const width = parentWidth - margin.right - margin.left;

	d3.json("./data/data.json").then((data) => {

		console.log('Raw data:\n', data);

		for (let i = 0; i < data.length; i++) {
			data[i]['countries'] = data[i]['countries'].filter((element) => {
				let hasNull = false;
				for (let key in element) {
					if (element[key] == null) {
						hasNull = true;
					}
				}
				if (!hasNull) return element;
			});
		}

		console.log('Data after filtering out null values:\n', data);

		const g = d3.select('#chart-area')
			.append('svg')
				.attr('height', height + margin.top + margin.bottom)
				.attr('width', width + margin.right + margin.left)
			.append('g')
				.attr('transform', `translate(${margin.left}, ${margin.top})`);

		const x = d3.scaleLog()
			.base(10)
			.domain([300, 150000])
			.range([0, width]);

		const y = d3.scaleLinear()
			.domain([0, 90])
			.range([height, 0]);

		const bottomAxis = d3.axisBottom(x)
			.tickValues([400, 4000, 40000]);

		const leftAxis = d3.axisLeft(y);

		g.append('g')
			.attr('class', 'axis-bottom')
			.attr('transform', `translate(0, ${height})`)
			.call(bottomAxis);

		g.append('g')
			.attr('class', 'axis-left')
			.call(leftAxis);


	});

}); // end of document ready
