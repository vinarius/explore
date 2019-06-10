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

		console.log('Formatted data:\n', data);

		let time = 0;

		const g = d3.select('#chart-area')
			.append('svg')
			.attr('height', height + margin.top + margin.bottom)
			.attr('width', width + margin.right + margin.left)
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		// Scales
		const x = d3.scaleLog()
			.base(10)
			.domain([300, 150000])
			.range([0, width]);

		const y = d3.scaleLinear()
			.domain([0, 90])
			.range([height, 0]);

		const continentColor = d3.scaleOrdinal(d3.schemePastel1);

		// X axis
		const bottomAxis = d3.axisBottom(x)
			.tickValues([400, 4000, 40000])
			.tickFormat(d3.format('$'));
		g.append('g')
			.attr('class', 'axis-bottom')
			.attr('transform', `translate(0, ${height})`)
			.call(bottomAxis);

		// Y axis
		const leftAxis = d3.axisLeft(y);
		g.append('g')
			.attr('class', 'axis-left')
			.call(leftAxis);
		

		g.selectAll('circle')
			.data(data[0].countries)
			.enter()
				.append('circle')
				.attr('cx', (d)=>{
					return x(d.income);
				})
				.attr('cy', (d)=>{
					return y(d.life_exp);
				})
				.attr('r', 25)
				.attr('fill', (d)=>{
					return continentColor(d.continent);
				});




	});

}); // end of document ready
