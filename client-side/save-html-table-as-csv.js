/*
 * transform HTML 'table' content to csv and download it.
 * Test with Chrome @ macOS.
 * Usage:
 * 1. Open the Developer tool in Chrome.
 * 2. Locate the 'table' you want to download in [Elements] tab.
 * 3. Change the table index of 'get table()' in this file.
 * 4. Copy the whole 'tableDownloader' to [Console] tab in Chrome and press Enter, and
 * 5. Input 'tableDownloader.saveTb()' press Enter.
 * 6. Find the 'Save Table as...' hyperlink at top of the table in HTML.
 * 7. Save the file.
 */

var tableDownloader = {
    /** Element:table, !!change the array index */
    get table() {
        return document.getElementsByTagName("table")[0];
    },
    
    /** Convert table  as csv. */
    tableToCSV: function() {
        var tableContent = [];
        /** Use Array 'map()' instead of 'for()' */
        var map = Array.prototype.map;
        /** Element:tr as array */
        var arrayTr = map.call(this.table.rows, function(e){ return e});
        for(var i in arrayTr) {
            var trContent = [];
            /** Element:td as array */
            map.call(arrayTr[i].children,function(e){
                /** Push td content of row to a temporary array.
                 *  If the element has child node, get the innermost node.
                 *  To keep the CSV fotmat, replace ',' with '-' of node content, 
                */
                while(e.childElementCount != 0) {
                    e = e.firstElementChild;
                }
                trContent.push(e.innerHTML.replace(",","-"));
            });
            /** Push tr content to global array */
            tableContent.push(trContent);
        }
        csvContent = tableContent.join("\r\n");
        return csvContent;
    },

    /** Creat URL for Blob. */
    getCSVURL: function() {
        var csvBlob = new Blob([this.tableToCSV()],{ type : 'text/csv'});
        var url = URL.createObjectURL(csvBlob);
        return url;
    },
    
    /** Append a download link to BODY. */
    saveTb: function(){
        var a = document.createElement("a");
        a.href = this.getCSVURL();
        a.text = "Save Table as...";
        a.setAttribute("download", "");
        this.table.parentElement.insertBefore(a, this.table);
    }
 }


