(function () {
    // Find a <table> element with id="myTable":
    var myTable = document.getElementById("mytable")
//XML is a datatype like JSON
//new token allows you to create new Objects
//Creates a new request
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == XMLHttpRequest.DONE){
            //200 means its good like 404 means its bad
            if (xmlhttp.status === 200){
                var data = JSON.parse(xmlhttp.responseText)
                for (var x = 1; x <= data.length; x++) {
                    var element = data[x];
                    // Create an empty <tr> element and add it to the 1st position of the table:
                    var row = myTable.insertRow(x)
                    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                    var cell1 = row.insertCell(0)
                    var cell2 = row.insertCell(1)
                    var cell3 = row.insertCell(2)
                    var cell4 = row.insertCell(3)
                    var cell5 = row.insertCell(4)
                    var cell6 = row.insertCell(5)
                    // Add some text to the new cells:
                    cell1.innerHTML = '' + x
                    cell2.innerHTML = '' + element.birthYear
                    cell3.innerHTML = '' + element.ethnicity
                    cell4.innerHTML = '' + element.name
                    cell5.innerHTML = '' + element.count
                    cell6.innerHTML = '' + element.rank
                }
                //400 means there was an error on the client
                //500 means error on server side
            } else if (xmlhttp.status === 400) {
                alert('There was an http error 400!')
            } else {
                alert('something else other than 400 was returned!')
            }
        }
    }

    xmlhttp.open('GET', '/viewNames', true);
    xmlhttp.send()

    // With Jquery
    // $.ajax({
    //     url: "/baby-names/top-ten",
    //     context: document.body,
    //     success: function(){
    //       $(this).addClass("done");
    //     }
    // });
})();