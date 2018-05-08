queue()
        .defer(d3.csv,"testBatch.csv")
        .await(makeCharts);
        
        function makeCharts(error,transactionsData) {
            let ndx=crossfilter(transactionsData);
            
            
            let resultDim = ndx.dimension(dc.pluck("result"));
            let totalResults = resultDim.group()
            dc.pieChart("#resultPieChart")
            .height(150)
            .radius(200)
            .dimension(resultDim)
            .group(totalResults)
            
            
            dc.renderAll();
        }