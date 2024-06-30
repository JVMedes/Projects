// --------------Ungrouped Data---------------------------------------------------------------------------------------------------------------------------------------JV
/*
        Note: *index variables are used in looping only. they are available inside the for statement only.
                 *use ctrl+f to find certain function 
                 *advance sorry sa grammar
*/
function UngroupedCalAlgo() {

    document.getElementById("goBtn").disabled=true;

    // input raader
    let userInput = document.getElementById("ungroupedSetOfData").value;
    var ungroupedXValues = new Array();//container of user input. the "N"
    let theCountOfXValues=0;//input index

        ungroupedXValues[0]="";//initialize
    
    for (let index = 0; index < userInput.length; index++) 
    {
        //decoding input
        if(userInput[index] != ",")
        {
            if (userInput[index] == " ") continue;
            ungroupedXValues[theCountOfXValues] += userInput[index];//adding 1 by 1 number unit            
        }
        else{
            theCountOfXValues++;//next  value container
            ungroupedXValues[theCountOfXValues] = "";//initialize for next value
        }
    }

    let theTotalCountOfX = theCountOfXValues+1;

    ungroupedXValues.sort( function(a,b) { return a - b; });//sort the x values from small to big

    addTableData("ungroupedTable",7,theTotalCountOfX,"ucellData");//creating ungrouped 
    
    for (let i = 0; i < theTotalCountOfX; i++) {//put value of x
        putToTable("1",i+"",ungroupedXValues[i],"ucellData")
    }
    for (let i = 0; i < theTotalCountOfX; i++) {// put value of n
        putToTable("0",i+"",(i+1)+"","ucellData")
    }
    
    // the sum of ungrouped data x
    let theUngroupedX = document.getElementById("ungroupedSumx").innerHTML=twoDecimal(addFullColumn("1",theTotalCountOfX,"ucellData"));

    /*M----*/let theUngroupedMean = document.getElementById("ungroupedMean").innerHTML=twoDecimal(Operation(theUngroupedX,"/",theTotalCountOfX));
    
    // Table Data----------------------------------------------------------------------------------------------->
    for (let j = 0; j < theTotalCountOfX; j++) {//adding x-M

        let theProductOf =getTwoValuesAndDoOperation("1",""+j,"-","","","ucellData","ungroupedMean","2");
        theProductOf = twoDecimal(theProductOf);
        putToTable("2",""+j,theProductOf,"ucellData");
    }

    for (let j = 0; j < theTotalCountOfX; j++) {//adding x-M2

        let theProductOf =getTwoValuesAndDoOperation("2",""+j,"x","2",""+j,"ucellData","ucellData","1");
        theProductOf = twoDecimal(theProductOf);
        putToTable("3",""+j,theProductOf,"ucellData");
    }

    for (let j = 0; j < theTotalCountOfX; j++) {//adding x2

        let theProductOf =getTwoValuesAndDoOperation("1",""+j,"x","1",""+j,"ucellData","ucellData","1");
        theProductOf = twoDecimal(theProductOf);
        putToTable("4",""+j,theProductOf,"ucellData");
    }
    // <<--------------------------------------------------Table Data

    let medianA = theTotalCountOfX/2;//getting the median

    if ((theTotalCountOfX)%2 == 0) {//median decision to know if total length of a N is an odd or even
        medianA =  Operation(Operation(ungroupedXValues[medianA-1],"+",ungroupedXValues[medianA]),"/",2);
    }else{
        medianA = ungroupedXValues[medianA-0.5];//removing decimal to avoid index error
    }
    /*Md---*/let ungroupedMd = document.getElementById("ungroupedMedian").innerHTML=twoDecimal(medianA);//meadian output

    let commonCountN;
    let setOfCommonCountN="";
    for (let scan1 = 0; scan1 < theTotalCountOfX-1; scan1++) {
        let elementV = toGetFromTable(1,scan1,"ucellData");
        commonCountN=0; 
        for (let scan2 = scan1+1; scan2 < (theTotalCountOfX); scan2++) {
            if(toGetFromTable(1,scan2,"ucellData") == elementV){
                commonCountN=commonCountN+1;
            }
        }  
        setOfCommonCountN = setOfCommonCountN+""+commonCountN;
    }
    let indexOfMode=0;
    let highVal=0;
    for (let greaterN = 0; greaterN < setOfCommonCountN.length; greaterN++) {
        for (let greaterN2 = 0; greaterN2 < setOfCommonCountN.length; greaterN2++) {
            if (setOfCommonCountN[greaterN] > setOfCommonCountN[greaterN2] && setOfCommonCountN[greaterN] > highVal) {
                highVal = setOfCommonCountN[greaterN];
                indexOfMode = greaterN;
            }
        }
        
    }

    /*Mo---*/let ungroupedMo =document.getElementById("ungroupedMode").innerHTML = toGetFromTable(1,indexOfMode+1,"ucellData");

    // QDP Function----------------------------------------------------------------------------------------->
        function getQDP(qdpValue,totalN,elementName) { //computing qdp algo

            let quartiles= Operation(qdpValue,"x",totalN);
            let L=Math.trunc(quartiles)-1;//index of value needed for computation
            let qv2 = (Operation(quartiles,"-",L))-1;//quartile decimal
                
            let Upper=ungroupedXValues[L];//    upper+qv2(upper-lower)
            let Lower=ungroupedXValues[++L];// 

            let quartilesAns = Operation(Upper,"+",Operation(qv2,"x",Operation(Lower,"-",Upper)));//calculation

            document.getElementById(elementName).innerHTML= twoDecimal(quartilesAns);
            return twoDecimal(quartilesAns);
        }
    // <<------------QDP Function

    let valueOfq1 = getQDP(0.25,theTotalCountOfX,"q1");//Q1: 1/4 = 0.25
    let valueOfq3 = getQDP(0.75,theTotalCountOfX,"q3");//Q3: 3/4 = 0.75

    /*QD---*/let valueQd = document.getElementById("qd").innerHTML=twoDecimal(Operation(Operation(valueOfq3,"-",valueOfq1),"/",2));

    getQDP(0.1,theTotalCountOfX,"d1");//D1: 1/10 = 0.1
    getQDP(0.3,theTotalCountOfX,"d3");//D3: 3/10 = 0.3
    getQDP(0.7,theTotalCountOfX,"d7");//D7: 7/10 = 0.7
    getQDP(0.9,theTotalCountOfX,"d9");//D9: 9/10 = 0.9
    getQDP(0.15,theTotalCountOfX,"p15");//P15: 15% = 0.15
    getQDP(0.35,theTotalCountOfX,"p35");//P35: 35% = 0.35
    getQDP(0.65,theTotalCountOfX,"p65");//P65: 65% = 0.65
    getQDP(0.85,theTotalCountOfX,"p85");//P85: 85% = 0.85
    let valueP10 = getQDP(0.10,theTotalCountOfX,"p10");//P10: 10% = 0.10
    let valueP90 = getQDP(0.90,theTotalCountOfX,"p90");//P90: 90% = 0.90

    
    /*x-M--*/let valueOfUxm = document.getElementById("x-M").innerHTML = addFullColumn("2",theTotalCountOfX,"ucellData");
    /*x-M2-*/let thexm2 = document.getElementById("x-M2").innerHTML = addFullColumn("3",theTotalCountOfX,"ucellData");
    /*x2---*/document.getElementById("x2").innerHTML = addFullColumn("4",theTotalCountOfX,"ucellData");
    ///*MAD--*/document.getElementById("MadU").innerHTML = twoDecimal(Operation(valueOfUxm,"/",theTotalCountOfX));
    /*SD---*/let ungroupedSd = document.getElementById("sdU").innerHTML = twoDecimal(Math.sqrt(Operation(thexm2,"/",theTotalCountOfX)));

    /*S1---*/document.getElementById("s1U").innerHTML = twoDecimal(Operation(Operation(theUngroupedMean,"-",ungroupedMo),"/",ungroupedSd));
    /*S2---*/document.getElementById("s2U").innerHTML = twoDecimal(Operation(Operation(Operation(theUngroupedMean,"-",ungroupedMd),"/",ungroupedSd),"x",3));

    let valueSqc = Operation(-2,"x",ungroupedMd);
    valueSqc = Operation(valueOfq3,"+",valueSqc);
    valueSqc = Operation(valueOfq1,"+",valueSqc);
    valueSqc = Operation(valueSqc,"/",Operation(valueOfq3,"-",valueOfq1));
    /*Sqc--*/document.getElementById("sqcU").innerHTML = twoDecimal(valueSqc);

    let valueSpc = Operation(-2,"x",ungroupedMd);
    valueSpc = Operation(valueP90,"+",valueSpc);
    valueSpc = Operation(valueP10,"+",valueSpc);
    valueSpc = Operation(valueSpc,"/",Operation(valueP90,"-",valueP10));
    /*Spc--*/document.getElementById("spcU").innerHTML = twoDecimal(valueSpc);

    let valueK1 = Operation(Operation(valueOfq3,"-",valueOfq1),"/",Operation(valueP90,"-",valueP10));
    /*K1---*/document.getElementById("k1U").innerHTML = twoDecimal(valueK1);
    let valueK2 =Operation(valueQd,"/",Operation(valueP90,"-",valueP10));
    /*K2---*/document.getElementById("k2U").innerHTML = twoDecimal(valueK2);

    for (let j = 0; j < theTotalCountOfX; j++) {//adding (x-M)/SD

        let theProductOf =getTwoValuesAndDoOperation("2",""+j,"/","","","ucellData","sdU","2");
        theProductOf = twoDecimal(theProductOf);
        putToTable("5",""+j,theProductOf,"ucellData");
    }

    for (let j = 0; j < theTotalCountOfX; j++) {//adding (x-M)/SD

        let theProductOf =getTwoValuesAndDoOperation("5",""+j,"x","5",""+j,"ucellData","ucellData","1");
        theProductOf = theProductOf * theProductOf;
        theProductOf = twoDecimal(theProductOf);
        putToTable("6",""+j,theProductOf,"ucellData");
    }
    /*x-M--*/let valxMSDU = document.getElementById("x-MSDU").innerHTML = addFullColumn("6",theTotalCountOfX,"ucellData");

    let k3Value1 = (theTotalCountOfX * (theTotalCountOfX+1));
    let k3Value2 = ( ((theTotalCountOfX-1) * (theTotalCountOfX-2)) * (theTotalCountOfX-3));
    let k3Value3 = (((theTotalCountOfX-1) * (theTotalCountOfX-1)) * 3 );
    let k3Value4 = ((theTotalCountOfX-2) * (theTotalCountOfX-3));

    let k3V1V2 = k3Value1/k3Value2;
    let k3V3V4 = k3Value3/k3Value4;

    let totalK3 =( (k3V1V2 * valxMSDU) - k3V3V4 );
    document.getElementById("k3U").innerHTML=twoDecimal(totalK3);

}
// ---------------------Grouped Data------------------------------------------------------------------------------------------------------------------------------Medes
function tableDataAdd(){

    let tableRowCount = document.getElementById("groupTotalcount").value;
    addTableData("groupedTable",14,tableRowCount,"gcellData");
    
    function addInputs(columnNum) {
        for (let index = 0; index < tableRowCount; index++) {
            let cellId = document.getElementById("gcellData"+index+""+columnNum);
            let newInput = document.createElement("input");

            newInput.id = "cellInput"+index+""+columnNum;
            newInput.className = "inputStyle";
            newInput.type = "number";
            newInput.style.width="50px";
            newInput.style.textAlign="center";

            cellId.appendChild(newInput);
        }
    }

    addInputs("0");
    addInputs("1");
    addInputs("2");

    document.getElementById("dynamicBtn").disabled=true;//disable both buttons
    document.getElementById("manualBtn").disabled=true;//dynamic and manual
}

function DynamicDataCi() {

    let highL = document.getElementById("HighLdata").value;//get value of highest limit
    let lowL = document.getElementById("LowLdata").value;
    let betweenR = document.getElementById("MidRdata").value;
    let toAdd = --betweenR;
    lowL = twoDecimal(lowL);//convert
    highL = twoDecimal(highL);//data
    
    let classI = [];
    let cInterval = [];

    for (let index = 0; lowL <= highL; index++) {//class interval values algo
        
        classI[index]=lowL;
        lowL+=toAdd;
        cInterval[index]=lowL;
        lowL++;    
    }

    document.getElementById("groupTotalcount").value=classI.length;//put row length to manual input value

    tableDataAdd();//adding table
    
    let dataIndex =0;
    for (let index = (classI.length-1); index >= 0 ; index--) {//adding class interval from bottom row to top
        document.getElementById("cellInput"+index+"0").value=classI[dataIndex];
        document.getElementById("cellInput"+index+"1").value=cInterval[dataIndex];
        dataIndex++;
    }
}

// main grouped answers-----------------------------------------------------------------------------------------------------------------

function GroupedCalAlgo() {

    /*
    document.getElementById("HighLdata").value=89;//get value of highest limit
    document.getElementById("LowLdata").value=40;
    document.getElementById("MidRdata").value=5;

    DynamicDataCi();

    let tableRowCount = document.getElementById("groupTotalcount").value;

    let dataF = [5,7,12,19,39,24,18,13,9,4]
    for (let index = 0; index < tableRowCount; index++) {
        document.getElementById("cellInput"+index+""+"2").value = dataF[index];
    }
    */
     let tableRowCount = document.getElementById("groupTotalcount").value;

    // Table data----------------------------------------------------------------------------------------------------------->>
    for (let index = 0; index < tableRowCount; index++) {// adding x
        let UpandLow = getTwoValuesAndDoOperation("0",""+index,"+","1",""+index,"cellInput","cellInput","4");
        putToTable("3",""+index,twoDecimal(Operation(UpandLow,"/",2)),"gcellData");
    }
    for (let index = 0; index < tableRowCount; index++) {// adding fx
        let fxVal = getTwoValuesAndDoOperation("2",""+index,"x","3",""+index,"cellInput","gcellData","5");
        putToTable("4",""+index,twoDecimal(fxVal),"gcellData");
    }
    // <<--------------------Table data

    // Answer----------------------------------------------------------------------------------------------------------->>
    /*fx--*/let theSumXGroup = document.getElementById("fxG").innerHTML=twoDecimal(addFullColumn("4",tableRowCount,"gcellData"));
    /*N---*/let theValueOfN = document.getElementById("nG").innerHTML=twoDecimal(addFullInputColumn("2",tableRowCount,"cellInput"));

    /*M---*/let meanG = document.getElementById("meanG").innerHTML = twoDecimal(Operation(theSumXGroup,"/",theValueOfN));
    //<<---------------------Answer

    let highestValue = 0.0;//value of highest "f"
    let highestValueIndex;//index of highest value
    

    for (let index = 0; index < tableRowCount; index++) {
        let theFvalueof = toGetFromInput("2",""+index,"cellInput");
        theFvalueof = twoDecimal(theFvalueof);

        if (theFvalueof>highestValue) {//if highest "f" value is get
            highestValue = theFvalueof;//it will replace the old value
            highestValueIndex = index;//and the old value of index
        }
    }

    let highestValueIndexContainer=highestValueIndex;

    for (let index = 0; index < tableRowCount; index++) {//adding the "d" to the table

        putToTable("5",""+index,highestValueIndex,"gcellData");
        highestValueIndex--;

    }
    // Table Data---------------------------------------------------------------------------------------------------->>
    let currentcf = 0;

    for (let index = (tableRowCount-1); index >= 0; index--) {//adding <cf
        let theFvalueof = toGetFromInput("2",""+index,"cellInput");
        currentcf = Operation(currentcf,"+",theFvalueof);
        putToTable("7",""+index,twoDecimal(currentcf),"gcellData");
    }

    for (let index = 0; index < tableRowCount; index++) {// adding fd
        let fxVal = getTwoValuesAndDoOperation("2",""+index,"x","5",""+index,"cellInput","gcellData","5");
        putToTable("6",""+index,twoDecimal(fxVal),"gcellData");
    }
    
    for (let index = 0; index < tableRowCount; index++) {// adding x-M
        let fxVal = getTwoValuesAndDoOperation("3",""+index,"-","","","gcellData","meanG","2");
        putToTable("8",""+index,twoDecimal(fxVal),"gcellData");
    }

    for (let index = 0; index < tableRowCount; index++) {// adding f(x-M)
        let fxVal = getTwoValuesAndDoOperation("2",""+index,"x","8",""+index,"cellInput","gcellData","5");
        putToTable("9",""+index,twoDecimal(fxVal),"gcellData");
    }
    for (let index = 0; index < tableRowCount; index++) {//adding fx2
        let fxVal = getTwoValuesAndDoOperation("3",""+index,"x","4",""+index,"gcellData","gcellData","1");
        putToTable("10",""+index,twoDecimal(fxVal),"gcellData");
    }
    // <<-------------------------Table Data

    document.getElementById("fdG").innerHTML=twoDecimal(addFullColumn("6",tableRowCount,"gcellData"));//Answer for sum of all fd 
    let fx2valG = document.getElementById("fx2G").innerHTML=twoDecimal(addFullColumn("10",tableRowCount,"gcellData"));//Answer for sum of all fx2

    // ------------------------Mode algo-------------------------------------------------------------------------------------->>

    let modalClassL = toGetFromInput("0",""+highestValueIndexContainer,"cellInput");
    let valueOfHighestFrequency =toGetFromInput("2",highestValueIndexContainer,"cellInput");
    let valueOfUnderHighestFrequency = toGetFromInput("2",""+(++highestValueIndexContainer),"cellInput");
    let theCorR = document.getElementById("MidRdata").value;

    let theValueOfL =Operation( modalClassL,"-",""+0.5);
    let theValueOfD1 = Operation(valueOfHighestFrequency,"-",valueOfUnderHighestFrequency);
    let theValueOfD2 = highestValue;


    let modalAnswer = Operation(theValueOfD1,"+",theValueOfD2);

    modalAnswer = Operation(theValueOfD1,"/",modalAnswer);

    modalAnswer =Operation(modalAnswer,"x",theCorR);

    modalAnswer = Operation(theValueOfL,"+",modalAnswer);

    /*Mo---*/let modeG = document.getElementById("modeG").innerHTML=twoDecimal(modalAnswer);

    // Median QDP algo------------------------------------------------------------------------------------------------------->>
        function GetMQDP(theValueOfMQDP,theNValue,placementId,DataOperation) {

            if(DataOperation == 1){
                theValueOfMQDP = Operation(theNValue,"/",theValueOfMQDP);//the M value N/2 N/etc.
            }else{
                theValueOfMQDP = Operation(theNValue,"x",theValueOfMQDP);//the QDP value qdp(N).
            }

            let theMQDPIntValue = parseInt(theValueOfMQDP);//get the int value of MQDP to find class
            let theMQDPClass;

            for (let index = 0; index < tableRowCount; index++) {
                let ValueOfcf = toGetFromTable("7",""+index,"gcellData");
                ValueOfcf = twoDecimal(ValueOfcf);
                if(ValueOfcf>theMQDPIntValue){
                    theMQDPClass = index;
                }
            }

            let classIntervalValue = toGetFromInput("0",theMQDPClass+"","cellInput");

            let theLValue = Operation(classIntervalValue,"-",""+0.5);
            let theF2val = toGetFromTable("7",(theMQDPClass+1),"gcellData");
            let thef2val = toGetFromInput("2",theMQDPClass,"cellInput");
            let theCvalue = document.getElementById("MidRdata").value;

            //formula
            let totalValue;

            totalValue = Operation(theValueOfMQDP,"-",theF2val);

            totalValue = Operation(totalValue,"/",thef2val);

            totalValue = Operation(totalValue,"x",theCvalue);

            totalValue = Operation(theLValue,"+",totalValue);

            document.getElementById(placementId).innerHTML=twoDecimal(totalValue);
        }

    GetMQDP(""+2,theValueOfN,"medianG",1);// Median = N/2
    GetMQDP(""+0.25,theValueOfN,"q1G",2);//Q1: 1/4 = 0.25
    GetMQDP(""+0.75,theValueOfN,"q3G",2);//Q3: 3/4 = 0.75
    GetMQDP(""+0.1,theValueOfN,"d1G",2);//D1: 1/10 = 0.1
    GetMQDP(""+0.3,theValueOfN,"d3G",2);//D3: 3/10 = 0.3
    GetMQDP(""+0.7,theValueOfN,"d7G",2);//D7: 7/10 = 0.7
    GetMQDP(""+0.9,theValueOfN,"d9G",2);//D9: 9/10 = 0.9
    GetMQDP(""+0.15,theValueOfN,"p15G",2);//P15: 15% = 0.15
    GetMQDP(""+0.35,theValueOfN,"p35G",2);//P35: 35% = 0.35
    GetMQDP(""+0.65,theValueOfN,"p65G",2);//P65: 65% = 0.65
    GetMQDP(""+0.85,theValueOfN,"p85G",2);//P85: 85% = 0.85
    GetMQDP(""+0.10,theValueOfN,"p10G",2);//P10: 10% = 0.10
    GetMQDP(""+0.90,theValueOfN,"p90G",2);//P90: 90% = 0.90

    let valQ1 = document.getElementById("q1G").innerHTML;
    let valQ3 = document.getElementById("q3G").innerHTML;

    let valueOfqd = Operation(Operation(valQ3 ,"-", valQ1),"/",2);

    /*QD---*/document.getElementById("qdG").innerHTML= twoDecimal(valueOfqd);
    let SDval = Operation(fx2valG,"/",theValueOfN);
    let SDval2 = Operation(theSumXGroup,"/",theValueOfN);
    SDval2 = Operation(SDval2,"x",SDval2);

    SDval = Math.sqrt(Operation(SDval,"-",SDval2));
    SDval = twoDecimal(SDval);
    document.getElementById("sdG").innerHTML = SDval;

    let medianG = document.getElementById("medianG").innerHTML;

    /*S1---*/document.getElementById("s1G").innerHTML = twoDecimal(Operation(Operation(meanG,"-",modeG),"/",SDval));
    /*S2---*/document.getElementById("s2G").innerHTML = twoDecimal(Operation(Operation(Operation(meanG,"-",medianG),"/",SDval),"x",3));

    let q1G = document.getElementById("q1G").innerHTML;
    let q3G = document.getElementById("q3G").innerHTML;
    let p10G = document.getElementById("p10G").innerHTML;
    let p90G = document.getElementById("p90G").innerHTML;

    let valueSqc = Operation(-2,"x",medianG);
    valueSqc = Operation(q3G,"+",valueSqc);
    valueSqc = Operation(q1G,"+",valueSqc);
    valueSqc = Operation(valueSqc,"/",Operation(q3G,"-",q1G));
    /*Sqc--*/document.getElementById("sqcG").innerHTML = twoDecimal(valueSqc);

    let valueSpc = Operation(-2,"x",medianG);
    valueSpc = Operation(p90G,"+",valueSpc);
    valueSpc = Operation(p10G,"+",valueSpc);
    valueSpc = Operation(valueSpc,"/",Operation(p90G,"-",p10G));
    /*Spc--*/document.getElementById("spcG").innerHTML = twoDecimal(valueSpc);

    let valueK1 = Operation(Operation(q3G,"-",q1G),"/",Operation(p90G,"-",p10G));
    /*K1---*/document.getElementById("k1G").innerHTML = twoDecimal(valueK1);
    let valueK2 =Operation(valueOfqd,"/",Operation(p90G,"-",p10G));
    /*K2---*/document.getElementById("k2G").innerHTML = twoDecimal(valueK2);


    // Table Data---------------------------------------------------------------------------------------------------->>
    for (let index = 0; index < tableRowCount; index++) {// adding (x-M)/SD
        let fxVal = getTwoValuesAndDoOperation("8",""+index,"/","","","gcellData","sdG","2");
        putToTable("11",""+index,twoDecimal(fxVal),"gcellData");
    }
    for (let index = 0; index < tableRowCount; index++) {// adding ((x-M)/SD)4
        let fxVal = getTwoValuesAndDoOperation("11",""+index,"x","11",""+index,"gcellData","gcellData","1");
        fxVal = fxVal * fxVal;
        putToTable("12",""+index,twoDecimal(fxVal),"gcellData");
    }
    for (let index = 0; index < tableRowCount; index++) {// adding (x-M)/SD
        let fxVal = getTwoValuesAndDoOperation("2",""+index,"x","12",""+index,"cellInput","gcellData","5");
        putToTable("13",""+index,twoDecimal(fxVal),"gcellData");
    }
    // <<-------------------------Table Data

    /*x-M---*/document.getElementById("x-MG").innerHTML=twoDecimal(addFullColumn("8",tableRowCount,"gcellData"));
    /*f(((x-M)/SD)4)--*/let fxmSDG = document.getElementById("fxmSDG").innerHTML=twoDecimal(addFullColumn("13",tableRowCount,"gcellData"));

    let k3Value1 = (theValueOfN * (theValueOfN+1));
    let k3Value2 = ( ((theValueOfN-1) * (theValueOfN-2)) * (theValueOfN-3));
    let k3Value3 = (((theValueOfN-1) * (theValueOfN-1)) * 3 );
    let k3Value4 = ((theValueOfN-2) * (theValueOfN-3));

    let k3V1V2 = k3Value1/k3Value2;
    let k3V3V4 = k3Value3/k3Value4;

    let totalK3 =( (k3V1V2 * fxmSDG) - k3V3V4 );
    document.getElementById("k3G").innerHTML=twoDecimal(totalK3);
}

// re-usable funtions------------------------------------------------------------------------------------------------------------------------------------------

function addFullColumn(columnNum,rowCount,cellId) {//adding all column data
    let sumOfFullColumn =0.0;

    for (let i = 0; i < rowCount; i++) {//adding 
        let valueOFcell =toGetFromTable(columnNum,""+i,cellId) ;
        sumOfFullColumn =Operation(sumOfFullColumn,"+",valueOFcell);
    }
    return twoDecimal(sumOfFullColumn);
}
function addFullInputColumn(columnNum,rowCount,cellId) {//adding all input column data
    let sumOfFullColumn =0.0;

    for (let i = 0; i < rowCount; i++) {//adding 
        let valueOFcell =document.getElementById(cellId+""+i+""+columnNum).value ;
        sumOfFullColumn =Operation(sumOfFullColumn,"+",valueOFcell);
    }
    return twoDecimal(sumOfFullColumn);
}
function toGetFromTable(columnNum,rowNum,tdName){//getting value from certain cell
    let cellvalue = document.getElementById(tdName+""+rowNum+""+columnNum);
    return parseFloat(cellvalue.innerHTML);
}
function toGetFromInput(columnNum,rowNum,inptName){//getting value from certain input cell
    let cellvalue = document.getElementById(inptName+""+rowNum+""+columnNum);
    return parseFloat(cellvalue.value);
}

function putToTable(columnNum,rowNum,value,tdName){//putting value to certain cell
    let toPutTo = document.getElementById(tdName+""+rowNum+""+columnNum);
    toPutTo.innerHTML=value;
}
function addTableData(tableOF,howManyColumns,howManyRows,tableCellid){//creating table
    let unGroupedTable = document.getElementById(tableOF);

    for (let i = 0; i < howManyRows; i++) {
        let tableRow = document.createElement("tr");
        for (let j = 0; j < howManyColumns; j++) {
            let tableColumn = document.createElement("td");

            tableColumn.id=""+tableCellid+""+i+""+j;
            tableColumn.className="tableData";
            //tableColumn.innerHTML =""+i+""+j;

            tableRow.appendChild(tableColumn);
        }
        unGroupedTable.appendChild(tableRow);
    }
}
function twoDecimal(value) {//get string and make it decimal with 2 decimal places or int

    value = parseFloat(value).toFixed(5);

    let negativeValue = false;

    if (0>value) {
        value = Math.abs(value);
        negativeValue = true;
    }

    let deciMal = Operation(value,"-",parseInt(value));

    let roundedValue="";

    if(deciMal >= 0.001 && deciMal <= 0.999){
        if(deciMal[4] >= 5){
            value = Operation(value,"-","0.00"+deciMal[4]+""+deciMal[5]+""+deciMal[6]);
            value = Operation(value+""+deciMal[2]+""+deciMal[3],"+",0.01);
            for (let runI = 0; runI < (value.length-3); runI++) {
                roundedValue += ""+value[runI];
            }
            if (negativeValue) {
                return ("-"+roundedValue);
            }
            return roundedValue;
        }
        else{
            if (negativeValue) {
                return ("-"+parseFloat(value).toFixed(2));
            }
            return parseFloat(value).toFixed(2);
        }
    }else{

        if (negativeValue) {
            return ("-"+parseInt(value));
        }
        return parseInt(value);
    }
}
function Operation(value1,operation,value2) {//making operation in two variables

    let total;
    switch(operation){
        case "+":
            total = parseFloat(value1) + parseFloat(value2);
            break;
        case "-":
            total = parseFloat(value1) - parseFloat(value2);
            break;
        case "x":
            total = parseFloat(value1) * parseFloat(value2);
            break;
        case "/":
            total = parseFloat(value1) / parseFloat(value2);
            break;
    }
    return parseFloat(total).toFixed(5);
}
function getTwoValuesAndDoOperation(column1,row1,operation,column2,row2,theId1,theId2,elementType) {//get variables from table and do operation

    let value1;
    let value2;
    switch (elementType) {
        case "1":
            value1 = toGetFromTable(column1,row1,theId1);
            value2 = toGetFromTable(column2,row2,theId2);
            break;
        case "2":
            value1 = toGetFromTable(column1,row1,theId1);
            value2 = document.getElementById(theId2).innerHTML;
            break;
        case "3":
            value1 = document.getElementById(theId1).innerHTML;
            value2 = document.getElementById(theId2).innerHTML;
            break;
        case "4":
            value1 = toGetFromInput(column1,row1,theId1);
            value2 = toGetFromInput(column2,row2,theId2);
            break;
        case "5":
            value1 = toGetFromInput(column1,row1,theId1);
            value2 = toGetFromTable(column2,row2,theId2);
            break;
        case "6":
            value1 = toGetFromInput(column1,row1,theId1);
            value2 = document.getElementById(theId2).innerHTML;
            break;
    }
    return Operation(value1,operation,value2);
}

const refreshButton = document.getElementById('refreshButton');

refreshButton.addEventListener('click', function () {
    // Refresh the page
    location.reload();
});
