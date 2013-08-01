d3.custom = d3.custom || {};

d3.custom.Labels = function module() {
    var config = {
        titleSize: 25,
        w: 800,
        h: 500,
        showZones: false,
        legendSize: 60
    };

    function exports(_selection) {
        _selection.each(function(_data) {

            var titles = d3.select(this).append('g').classed('titles', true);

            // y axis label
            var axisLabelY = titles.append('g').classed('axis-label-y', true)
                .attr({transform: 'translate('+[0, config.titleSize]+')'});
            axisLabelY.append('rect')
                .attr({width: config.titleSize, height: config.h - config.titleSize * 2})
                .style({visibility: config.showZones? 'visible' : 'hidden'});
            var text = axisLabelY.append('text')
                .text('Y Axis Label'); //hardcoded
            var textBBox = text.node().getBBox();
            text.attr({dy: textBBox.height, transform: 'rotate(-90) translate(-'+ (config.h - config.titleSize * 2 + textBBox.width) / 2 +',0)'});

            // chart title
            var chartTitle = titles.append('g').classed('chart-title', true)
                .attr({transform: 'translate('+[config.titleSize, 0]+')'});
            chartTitle.append('rect')
                .attr({width: config.w - config.titleSize - config.legendSize, height: config.titleSize})
                .style({visibility: config.showZones? 'visible' : 'hidden'});
            var text = chartTitle.append('text')
                .text('Chart Title') //hardcoded
            var textBBox = text.node().getBBox();
            text.attr({dy: (textBBox.height + config.titleSize) / 2, dx: (config.w - config.titleSize - config.legendSize - textBBox.width) / 2});

            // legend
            var legend = titles.append('g').classed('legend', true)
                .attr({transform: 'translate('+[config.w - config.legendSize, config.titleSize]+')'});
            legend.append('rect')
                .attr({width: config.legendSize, height: config.h - config.titleSize * 2})
                .style({visibility: config.showZones? 'visible' : 'hidden'});
            var textBBox = text.node().getBBox();
            legend.append('text')
                .attr({dy: textBBox.height})
                .text('Legend');

            // x axis label
            var axisLabelX = titles.append('g').classed('axis-label-x', true)
                .attr({transform: 'translate('+[config.titleSize, config.h - config.titleSize]+')'});
            axisLabelX.append('rect')
                .attr({width: config.w - config.titleSize - config.legendSize, height: config.titleSize})
                .style({visibility: config.showZones? 'visible' : 'hidden'});
            var text = axisLabelX.append('text')
                .text('X Axis Label'); //hardcoded
            var textBBox = text.node().getBBox();
            text.attr({dy: (textBBox.height + config.titleSize) / 2, dx: (config.w - config.titleSize - config.legendSize - textBBox.width) / 2});


        });
    }
    exports.config = function(_x) {
        if (!arguments.length) return config;
        for(x in _x) if(x in config) config[x] = _x[x];
        return this;
    };
    return exports;
};