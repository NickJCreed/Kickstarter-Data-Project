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
            
            let popularCategoryDim = ndx.dimension(dc.pluck("subCategory"));
            let totalAmount = popularCategoryDim.group()
            dc.pieChart("#popularCategoryPieChart")
            .height(150)
            .radius(200)
            .dimension(popularCategoryDim)
            .group(totalAmount)
            
            
            let countryDim = ndx.dimension(dc.pluck("country"));
            let totalSubPerCountry = countryDim.group()
            dc.barChart("#submissionsBarChart")
            .height(250)
            .width(600)
            .dimension(countryDim)
            .group(totalSubPerCountry)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Amount of submissions per country.")
            
            
            
            
            dc.renderAll();
        }