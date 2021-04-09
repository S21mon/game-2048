export default class TableRender {
    static displayTableNumbers(cells, cellsValues) {
        Array.from(cells).map((cell, index) => {
            cell.textContent = '';
            if (cellsValues.has(index)) {
                cell.textContent = cellsValues.get(index);
            }
        })
        return cells;
    }
}