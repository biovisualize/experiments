d3.custom = d3.custom || {};

d3.custom.Labels = function module() {
    var config = {
        titleSize: 25,
        w: 800,
        h: 500,
        legendSize: 60,
        chartTitleText: 'chart title',
        axisTitleX: 'x',
        axisTitleY: 'y'
    };

    function exports(_selection) {
        _selection.each(function(_data) {

            var titles = d3.select(this).append('g').classed('titles', true);

            // y axis label
            var axisLabelY = titles.append('g').classed('axis-label-y', true)
                .attr({transform: 'translate('+[0, config.titleSize]+')'});
            var text = axisLabelY.append('text')
                .text(config.axisTitleY);
            var textBBox = text.node().getBBox();
            text.attr({dy: textBBox.height, transform: 'rotate(-90) translate(-'+ (config.h - config.titleSize * 2 + textBBox.width) / 2 +',0)'});

            // chart title
            var chartTitle = titles.append('g').classed('chart-title', true)
                .attr({transform: 'translate('+[config.titleSize, 0]+')'});
            var text = chartTitle.append('text')
                .text(config.chartTitleText)
            var textBBox = text.node().getBBox();
            text.attr({dy: (textBBox.height + config.titleSize) / 3, dx: (config.w - config.titleSize - config.legendSize - textBBox.width) / 2});

            // legend
            var legend = titles.append('g').classed('legend', true)
                .attr({transform: 'translate('+[config.w - config.legendSize, config.titleSize]+')'});
            var textBBox = text.node().getBBox();
            legend.append('text')
                .attr({dy: textBBox.height})
                .text('Legend');

            // x axis label
            var axisLabelX = titles.append('g').classed('axis-label-x', true)
                .attr({transform: 'translate('+[config.titleSize, config.h - config.titleSize]+')'});
            var text = axisLabelX.append('text')
                .text(config.axisTitleX);
            var textBBox = text.node().getBBox();
            text.attr({dy: (textBBox.height + config.titleSize) / 3, dx: (config.w - config.titleSize - config.legendSize - textBBox.width) / 2});

        });
    }
    exports.config = function(_x) {
        if (!arguments.length) return config;
        for(x in _x) if(x in config) config[x] = _x[x];
        return this;
    };
    return exports;
};