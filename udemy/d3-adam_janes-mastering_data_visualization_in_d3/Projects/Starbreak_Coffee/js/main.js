/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

window.addEventListener('DOMContentLoaded', (event) => {


    d3.json('./data/revenues.json').then((_data) => {
        

        let data = _data.map((element) => {
            element.revenue = +element.revenue;
            element.profit = +element.profit;
            return element;
        });

        const margin = {
            top: 10,
            right: 20,
            bottom: 30,
            left: 40
        };

        const width = 600 - margin.right - margin.left;
        const height = 400 - margin.top - margin.bottom;

        const chart = d3.select('#chart-area')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => {
                return d.revenue;
            })])
            .range([height, 0]);

        const x = d3.scaleBand()
            .domain(data.map((d) => {
                return d.month;
            }))
            .range([0, width])
            .paddingInner(0.3)
            .paddingOuter(0.2);

        const bottomAxisCall = d3.axisBottom(x);
        const leftAxisCall = d3.axisLeft(y);

        chart.append('g')
            .attr('class', 'axis left')
            .call(leftAxisCall);

        chart.append('g')
            .attr('class', 'axis bottom')
            .attr('transform', `translate(0, ${height})`)
            .call(bottomAxisCall);

    });






















}); // End of document ready.