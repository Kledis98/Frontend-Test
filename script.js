let inputFile = document.getElementById('input');
let preview = document.getElementById('preview');
const searchInput = document.getElementById('search');
const loader = document.getElementById('loader');


inputFile.addEventListener('change', () => {

    loader.style.display = 'block';
    preview.style.display = 'none';

    const fr = new FileReader();
    fr.readAsText(inputFile.files[0]);

    fr.addEventListener('load', () => {
        const results = fr.result;
        searchInput.style.display = 'block';
        const originalArray = results.split(/\r?\n/).map((line) => {
            return line.split(',');
        });




        // I did this by creating a TABLE.


        const table = document.createElement('table');
        const tbody = document.createElement('tbody');

        let displayedArray = originalArray;
        let noDataMessageRow;

        function refreshTable() {
            tbody.innerHTML = ''; // Clear the existing table rows


          // Iterate through the displayed array and add all rows to the table
          displayedArray.forEach((line, index) => {
            const tr = document.createElement('tr');

            // Adding a serial number before ( index + 1 )
            const serialNumberCell = document.createElement('td');
            serialNumberCell.textContent = index + 1;
            tr.appendChild(serialNumberCell);

            // Add other data cells
            line.forEach((cell) => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });

            // Append the row to the table body
            tbody.appendChild(tr);
        });




            // Add a message row if no data is found
            if (displayedArray.length === 0) {
                noDataMessageRow = document.createElement('tr');
                messageCell.textContent = 'No data for this search.';
                noDataMessageRow.appendChild(messageCell);
                tbody.appendChild(noDataMessageRow);
            } else if (noDataMessageRow) {
                // Remove it if there is not data
                tbody.removeChild(noDataMessageRow);
                noDataMessageRow = null;
            }
        }




        refreshTable(); // Initialize the table with all rows

        // Append the tbody to the table element
        table.appendChild(tbody);

        // Append the table to the preview container
        preview.appendChild(table);

        // Change loader to none when the file is loaded
        loader.style.display = 'none';
        preview.style.display = 'block';





        // Search input
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();

            // Filter the original array based on the search query
            displayedArray = originalArray.filter((line) => {
                for (const cell of line) {
                    if (cell.toLowerCase().includes(query)) {
                        return true;
                    }
                }
                return false;
            });

            // Update the displayed table
            refreshTable();
        });
    });
});
