package graxxia;
import java.util.Iterator;


public class MatrixColumnIterator implements Iterator<Double> {

    private final double [][] values;
    private final int columnIndex;
    private int rowIndex = 0;
    private final int max;
    
    public MatrixColumnIterator(double [][] values, int columnIndex) {
        this.values = values;
        this.columnIndex = columnIndex;
        this.max = values.length;
    }

    @Override
    public boolean hasNext() {
        return rowIndex < max;
    }

    @Override
    public Double next() {
        return values[rowIndex++][columnIndex];
    }

    @Override
    public void remove() {
        throw new UnsupportedOperationException();
    }

}
