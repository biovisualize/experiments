d3.custom = d3.custom || {};

d3.custom.Facets = function module() {
    var config = {
        x: 25,
        y: 25,
        facetW: 250,
        facetH: 250,
        tabSize: 25,
        axisSize: 25,
        gap: 5,
        gridColNum: 4,
        gridRowNum: 3,
        tabTitlesX: null,
        tabTitlesY: null
    };

    function exports(_selection) {
        _selection.each(function(_data) {

            var facetRow = d3.select(this).selectAll('g.facet-row')
                .data(_data)
                .enter().append('g')
                .classed('facet-row', true);
            var facetGroup = facetRow.selectAll('g.facet-group')
                .data(function(d, i){ return d; })
                .enter().append('g')
                .classed('facet-group', true);

            // x axis
            var facetAxes = facetRow.filter(function(d, i){ return i == config.gridRowNum - 1; }).selectAll('g.axis-group-x')
                .data(function(d, i){ return d; })
                .enter().append('g')
                .classed('axis-group-x', true)
                .attr({transform: function(d, i){ return 'translate('+[config.x + config.axisSize + config.facetW * i, config.y + config.tabSize + config.facetH * config.gridRowNum - config.gap]+')'; }});

            // y axis
            var axisGroupY = facetGroup.filter(function(d, i){ return i == 0; }).append('g').classed('axis-group-y', true)
                .attr({transform: function(d, i, pI){ return 'translate('+[config.x, config.y + config.tabSize + config.facetH * pI]+')';}})

            // x tab
            var facetTabs = facetRow.filter(function(d, i){ return i == 0; }).selectAll('g.tab-group-x')
                .data(function(d, i){ return d; })
                .enter().append('g')
                .classed('tab-group-x', true)
                .attr({transform: function(d, i, pI){ return 'translate('+[config.x + config.axisSize + config.facetW * i, config.y + config.facetH * pI]+')';}});
            facetTabs.append('rect').classed('tab-rect-x', true)
                .attr({
                    width: config.facetW - config.gap,
                    height: config.tabSize
                });
            var text = facetTabs.append('text').classed('tab-rect-x', true)
                .text(function(d, i, pI){ return config.tabTitlesX[i]; })
            var textBBox = text.node().getBBox();
            text.attr({dy: textBBox.height, dx: (config.facetW - textBBox.width) / 2});

            // y tab
            var tabGroupY = facetGroup.filter(function(d, i){ return i == config.gridColNum - 1; })
                .append('g').classed('tab-group-y', true)
                .attr({transform: function(d, i, pI){ return 'translate('+[config.x + config.axisSize + config.facetW * config.gridColNum - 1 - config.gap, config.y + config.tabSize + config.facetH * pI]+')';}});
            tabGroupY.append('rect').classed('tab-y', true)
                .attr({
                    width: config.tabSize + config.gap,
                    height: config.facetH - config.gap
                });
            var text = tabGroupY.append('text')
                .text(function(d, i, pI){ return config.tabTitlesY[pI]; });
            var textBBox = text.node().getBBox();
            text.attr({dy: textBBox.height, transform: 'rotate(90) translate('+
                [config.facetH / 2 - textBBox.width / 2, -textBBox.height - config.tabSize / 2]+')'});

            // chart
            facetGroup.append('g')
                .attr({
                    'class': function(d, i, pI){ return 'chart_' + [i, pI].join('-'); },
                    transform: function(d, i, pI){
                        var x = config.x + config.axisSize + config.facetW * i;
                        var y = config.y + config.tabSize + config.facetH * pI;
                        return 'translate('+[x, y]+')';
                    }
                })
                .classed('chart', true);

        });
    }
    exports.config = function(_x) {
        if (!arguments.length) return config;
        for(x in _x) if(x in config) config[x] = _x[x];
        return this;
    };
    return exports;
};