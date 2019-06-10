window.addEventListener('DOMContentLoaded', (event) => {

    d3.json('./data/revenues.json').then((_data) => {
        
        let data = _data.map((element) => {
            element.revenue = +element.revenue;
            element.profit = +element.profit;
            return element;
        });

        const margin = {
            top: 30,
            right: 20,
            bottom: 70,
            left: 75
        };

        const width = 600 - margin.right - margin.left;
        const height = 500 - margin.top - margin.bottom;

        const chart = d3.select('#chart-area')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

        // X label.
        chart.append('text')
            .attr('class', 'x-axis-label')
            .attr('x', width / 2)
            .attr('y', height + (margin.bottom / 1.5))
            .attr('font-szie', '20px')
            .attr('text-anchor', 'end')
            .text('Month');

        // Y label.
        chart.append('text')
            .attr('class', 'y-axis-label')
            .attr('x', -height / 2)
            .attr('y', -margin.left / 1.5)
            .attr('font-size', '20px')
            .attr('transform', 'rotate(-90)')
            .text('Revenue');

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

        const rects = chart.selectAll('rect')
            .data(data);

        rects.enter()
            .append('rect')
            .attr('x', (d) => {
                return x(d.month);
            })
            .attr('y', (d) => {
                return y(d.revenue);
            })
            .attr('width', x.bandwidth)
            .attr('height', (d) => {
                return height - y(d.revenue)
            })
            .attr('fill', '#444');

    });

}); // End of document ready.