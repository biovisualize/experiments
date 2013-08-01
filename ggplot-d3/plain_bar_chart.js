d3.custom = d3.custom || {};

d3.custom.PlainBarChart = function module() {
    var config = {
        facetW: 300,
        facetH: 300,
        scaleX: null,
        scaleY: null,
        dimensionX: null,
        dimensionY: null
    };

    var dispatch = d3.dispatch('customHover');
    function exports(_selection) {
        _selection.each(function(_data) {

            var geometryGroup = d3.select(this)
                .selectAll('g.geometry')
                .data([0]);
            geometryGroup.enter()
                .append('g')
                .classed('geometry', true)
                .append('rect')
                .classed('panel', true)
                .attr({width: config.facetW, height: config.facetH});
            geometryGroup.attr({width: config.facetW, height: config.facetH})

            var barW = config.scaleX.rangeBand();
            var bars = geometryGroup.selectAll('.bar')
                .data(_data);
            bars.enter().append('rect')
                .classed('bar', true)
                .attr({
                    x: config.facetW
                })
                .style({opacity: 1})
                .on('mouseover', dispatch.customHover)
                .on('mouseover', function(d, i){ console.log(_data[i]); });
            bars.attr({
                    width: barW,
                    x: function(d, i) { return config.scaleX(d[config.dimensionX]); },
                    y: function(d, i) { return config.scaleY(d[config.dimensionY]); },
                    height: function(d, i) {
                        return config.facetH - config.scaleY(d[config.dimensionY]); }
                });
            bars.exit().style({opacity: 0}).remove();

        });
    }
    exports.config = function(_x) {
        if (!arguments.length) return config;
        for(x in _x) if(x in config) config[x] = _x[x];
        return this;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};