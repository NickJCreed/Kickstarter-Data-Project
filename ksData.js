queue()
        .defer(d3.csv,"testBatchEdited.csv")
        .await(makeCharts);
        
        function makeCharts(error,transactionsData) {
            let ndx=crossfilter(transactionsData);
            
            
            let resultDim = ndx.dimension(dc.pluck("result"));
            let totalResults = resultDim.group()
            dc.pieChart("#resultPieChart")
            .height(250)
            .radius(250)
            .innerRadius(20)
            .externalLabels(10)
            .externalRadiusPadding(5)
            .dimension(resultDim)
            .group(totalResults)
            
            
            let popularCategoryDim = ndx.dimension(dc.pluck("subCategory"));
            let totalAmount = popularCategoryDim.group()
            dc.rowChart("#popularCategoryRowChart")
            .height(250)
            .width(400)
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
            .xAxisLabel("Submissions per country.")
            
            
            let subCatDim = ndx.dimension(dc.pluck("subCategory"));
            let amountPledged = subCatDim.group().reduceSum(dc.pluck("pledged"));
            dc.barChart("#categoryPledgesChart")
            .height(300)
            .width(450)
            .dimension(subCatDim)
            .group(amountPledged)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Pledges per Category")
            
            
            
            
            dc.renderAll();
        }