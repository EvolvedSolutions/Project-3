'use strict';

class TableTemplate {
    static fillIn(id, dictionary, columnName){
        const table = document.getElementById(id);
        if(!table) return;

        const headerRow = table.rows[0];
        if(!headerRow) return;

        // Always process header row first
        for(let i = 0; i < headerRow.cells.length; i++){
            const cell = headerRow.cells[i];
            const processor = new TemplateProcessor(cell.innerHTML);
            cell.innerHTML = processor.fillIn(dictionary);
        }

        if (columnName === undefined) {
            // Process entire table
            for(let i = 1; i < table.rows.length; i++){
                const row = table.rows[i];
                for(let j = 0; j < row.cells.length; j++){
                    const cell = row.cells[j];
                    const processor = new TemplateProcessor(cell.innerHTML);
                    cell.innerHTML = processor.fillIn(dictionary);
                }
            }
        } else {
            // Find matching column index
            let processingIndex = null;

            for(let i = 0; i < headerRow.cells.length; i++){
                if (headerRow.cells[i].textContent.trim() === columnName){
                    processingIndex = i;
                    break;
                }
            }

            // If column not found → stop after header processing
            if (processingIndex === null){
                table.style.visibility = "visible";
                return;
            }

            // Process only the matching column
            for(let i = 1; i < table.rows.length; i++){
                const row = table.rows[i];
                const cell = row.cells[processingIndex];
                if(cell){
                    const processor = new TemplateProcessor(cell.innerHTML);
                    cell.innerHTML = processor.fillIn(dictionary);
                }
            }
        }

        table.style.visibility = "visible";
    }
}
