export default class TableRender {
    static displayTableNumbers(cells, cellsValues) {
        Array.from(cells).map((cell, index) => {
            if (cellsValues.has(index)) {
                cell.textContent = cellsValues.get(index);
            }
        })
        return cells;
    }
}