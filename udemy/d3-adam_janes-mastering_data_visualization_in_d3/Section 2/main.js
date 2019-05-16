window.addEventListener('DOMContentLoaded', (event) => {

    // Chart canvas 1.

    d3.select('#container')
        .append('svg')
        .attr('id', 'chart-canvas-1')
        .attr('width', 500)
        .attr('height', 400)
        .classed('margin-top-3', true);

    const border1 = d3.select('#chart-canvas-1')
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 500)
        .attr('height', 400)
        .attr('stroke', '#999')
        .attr('fill', 'none');

    const rect = d3.select('#chart-canvas-1')
        .append('rect')
        .attr('x', 75)
        .attr('y', 75)
        .attr('width', 50)
        .attr('height', 50)
        .attr('fill', '#341');

    const circle = d3.select('#chart-canvas-1')
        .append('circle')
        .attr('cx', 250)
        .attr('cy', 250)
        .attr('r', 75)
        .attr('fill', '#129');

    const line = d3.select('#chart-canvas-1')
        .append('line')
        .attr('x1', 375)
        .attr('y1', 375)
        .attr('x2', 475)
        .attr('y2', 50)
        .attr('stroke-width', 20)
        .attr('stroke', '#f20');

    const ellipse = d3.select('#chart-canvas-1')
        .append('ellipse')
        .attr('cx', 260)
        .attr('cy', 60)
        .attr('rx', 75)
        .attr('ry', 20)
        .attr('fill', '#888');


    // Chart canvas 2.

    d3.json('data/buildings.json').then((raw_buildings) => {
        console.log('raw_buildings:', raw_buildings);

        raw_buildings.forEach(element => {
            element.height = +element.height;
        });

        const canvas2 = d3.select('#container')
            .append('svg')
            .attr('id', 'chart-canvas-2')
            .attr('width', 500)
            .attr('height', 500)
            .classed('margin-top-3', true);

        const buildings = canvas2.selectAll('rect')
            .data(raw_buildings);

        buildings.enter()
            .append('rect')
            .attr('x', (d, i) => {
                return (30 + 7.5) * i;
            })
            .attr('y', 0)
            .attr('height', (d, i) => {
                return d.height;
            })
            .attr('width', 30)
            .attr('fill', '#333');

        const border = canvas2
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 500)
            .attr('height', 500)
            .attr('stroke', '#999')
            .attr('fill', 'none');

    });




}); // end of document ready