/*
 *  Graxxia - Groovy Maths Utililities
 *
 *  Copyright (C) 2014 Simon Sadedin, ssadedin<at>gmail.com and contributors.
 *
 *  This file is licensed under the Apache Software License Version 2.0.
 *  For the avoidance of doubt, it may be alternatively licensed under GPLv2.0
 *  and GPLv3.0. Please see LICENSE.txt in your distribution directory for
 *  further details.
 */
package graxxia
 
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import groovy.lang.Closure;
import groovy.transform.CompileStatic;

import org.apache.commons.math3.linear.Array2DRowRealMatrix
import org.apache.commons.math3.linear.RealMatrix;
import org.codehaus.groovy.runtime.typehandling.GroovyCastException;

/**
 * Wraps an Apache-Commons-Math matrix of double values with a 
 * Groovy interface for convenient access. Because it wraps the
 * underlying matrix as a delegate, all the original methods of
 * the Commons-Math implementation are available directly, along with
 * Groovy-enhanced versions.
 * <p>
 * The most basic enhancements come in the form of random access operators 
 * that allowthe Matrix class to be referenced using square-bracket notation:
 * <pre>
 * Matrix m = new Matrix(2,2,[1,2,3,4])
 * assert m[0][0] == 2
 * assert m[1][1] == 4
 * </pre>
 * The rows of the Matrix are directly accessible simply by using
 * square-bracket indexing:
 * <pre>
 * assert m[0] == [1,2]
 * assert m[1] == [3,4]
 * </pre>
 * The columns are accessed by using an empty first index:
 * <pre>
 * assert m[][0] == [1,3]
 * assert m[][1] == [2,4]
 * </pre>
 * Rows and columns can both be treated as normal Groovy collections:
 * <pre>
 * assert m[0].collect { it.any { it > 2 }  } == [ false, true ]
 * assert m[][0].collect { it > 1 } == [ false, true ]
 * </pre>
 * Note that in the above code, both row-wise and column-wise access
 * occurs without copying any data.
 * <p>
 * Transforming the whole matrix can be done using <code>transform</code>:
 * <pre>
 * assert m.transform { it * 2 } == Matrix(2,2,[2,4,6,8])
 * </pre>
 * As an option, row and column indexes are available as well:
 * <pre>
 * assert m.transform { value, row, column -> value * 2 } == Matrix(2,2,[2,4,6,8])
 * </pre>
 * 
 * @author simon.sadedin@mcri.edu.au
 */ 
class Matrix extends Expando implements Iterable {
     
    static { 
        
//        println "Setting Matrix meta class properties ...."
        double[][].metaClass.toMatrix = { new Matrix(delegate) }
        
        def originalMethod = double[][].metaClass.getMetaMethod("asType", Class)
        double[][].metaClass.asType = { arg -> arg == Matrix.class ? delegate.toMatrix() : originalMethod(arg)}
        
        def original2 = Array2DRowRealMatrix.metaClass.getMetaMethod("asType", Class)
        Array2DRowRealMatrix.metaClass.asType = { arg -> arg == Matrix.class ? new Matrix(arg) : original2(arg)}
        
        def originalMultiply = Integer.metaClass.getMetaMethod("multiply", Class)
        Integer.metaClass.multiply = { arg -> arg instanceof Matrix ? arg.multiply(delegate) : originalMultiply(arg)}
    }
    
    
    /**
     * How many rows are displayed in toString() and other calls that format output
     */
    static final int DISPLAY_ROWS = 50
    
    @Delegate
    Array2DRowRealMatrix matrix
    
    List<String> names = []
    
    public Matrix(int rows, int columns) {
        matrix = new Array2DRowRealMatrix(rows, columns)
    }
    
    public Matrix(MatrixColumn... sourceColumns) {
        this.initFromColumns(sourceColumns)
    }
    
    @CompileStatic
    private void initFromColumns(MatrixColumn[] sourceColumns) {
        int rows = columns[0].size()
        final int cols = columns.size()
        double[][] newData =  new double[rows][]
        MatrixColumn [] columns = sourceColumns
        for(int i=0; i<rows;++i) {
            double [] row = newData[i]
            for(int j=0; j<++cols;++j)
                row[j] = (double)(columns[j].getDoubleAt(i))
        }
        matrix = new Array2DRowRealMatrix(newData,false)
        this.names = columns.collect { MatrixColumn c -> c.name }
    }
    
    public Matrix(Iterable<Iterable> rows, List<String> columnNames=null) {
        List data = new ArrayList(4096)
        int rowCount = 0
        Iterable r0 = rows[0]
        List<Boolean> isNumerics = r0.collect { it instanceof Number }
        
        int matrixColumnCount = isNumerics.count { it }
        
        // Initialise an empty list for each non-numeric column that
        // we are going to fill
        List<List> nonNumerics = isNumerics.grep { !it }.collect { [] }
        
        int rowIndex = 0
        for(row in rows) {
            int colIndex = 0
            int numericColumnIndex = 0
            int nonNumericColumnIndex = 0
            double[] rowNumericValues = new double[matrixColumnCount]
            for(value in row) {  
                if(isNumerics[colIndex]) {
                    rowNumericValues[numericColumnIndex++] = (double)value
                }
                else
                    nonNumerics[nonNumericColumnIndex++].add(value)
                ++colIndex
            }
            ++rowIndex
            data.add(rowNumericValues)
        }
        
        matrix = new Array2DRowRealMatrix((double[][])data.toArray(), false)
        if(columnNames)
            this.@names = [columnNames,isNumerics].transpose().grep { it[1] }.collect { it[0] }
            
        int nonNumericIndex = 0
        isNumerics.eachWithIndex { isNumeric, index ->
            if(!isNumeric)
                this.setProperty(columnNames[index],nonNumerics[nonNumericIndex++])        
        }
    }
    
    public Matrix(double [][] values) {
        matrix = new Array2DRowRealMatrix(values, false)
    }
     
    public Matrix(int rows, int columns, List<Double> data) {
        this.initFromList(rows,columns,data)
    }
    
    @CompileStatic
    void initFromList(int rows, int columns, List<Double> data) {
        matrix = new Array2DRowRealMatrix(rows, columns)
        int i=0
        for(int r=0; r<rows; ++r) {
            for(int c=0; c<columns;++c) {
                matrix.dataRef[r][c] = (double)data[i++]
            }
        }
    }
    
    public Matrix(int rows, int columns, double[] matrixData) {
        this.initFromArray(rows, columns, matrixData)
    }
    
    @CompileStatic
    private void initFromArray(int rows, int columns, double[] matrixData) {
        matrix = new Array2DRowRealMatrix(rows, columns)
        int i=0
        for(int r=0; r<rows; ++r) {
            for(int c=0; c<columns;++c) {
                matrix.dataRef[r][c] = matrixData[++i]
            }
        }
        
    }
      
    public Matrix(Array2DRowRealMatrix m) {
        matrix = m
    }

     
    @CompileStatic
    MatrixColumn col(int n) {
        new MatrixColumn(columnIndex:n, sourceMatrix: this, name: names[n])
    }
    
    List<MatrixColumn> getColumns(List<String> names) {
        names.collect { this.names.indexOf(it) }.collect { int index ->
             assert index >= 0; col(index) 
        }
    }
    
    List<MatrixColumn> getColumns() {
        (0..<matrix.columnDimension).collect { col(it) }
    }
    
    @CompileStatic
    double [] row(int n) {
        matrix.getRow(n)
    }
    
    /**
     * Implementation of the [] operator. Adds several different behaviors:
     * <ul>
     *    <li>Plain old indexing returns a row: <code>m[4]</code> returns 5th row of matrix.
     *    <li>Double indexing returns a cell: <code>m[4][5]</code> returns 6th column of 4th row.
     *    <li>Empty index returns a column: <code>m[][6]</code> returns 7th column
     *    <li>List (or any iterable) index returns rows matching indices:
     *    </ul>
     * <pre>
     * Matrix m = new Matrix([1..80], 10, 8)
     * m[2..4] == [ [ 9..16 ], [17..24], [25..32] ]
     * @param n
     * @return
     */
    @CompileStatic
    Object getAt(Object n) {
        if(n == null) {
            return getColumns()
        }
        else
        if(n instanceof Number)
            return matrix.dataRef[(int)n]
        else
        if(n instanceof List) {
            List<Number> l = (List)n
            if(l.size() == 0) // Seems to happen with m[][2] type syntax
                return getColumns()
            else {
                double [][] submatrix = subsetRows(l)
                Matrix result = new Matrix(new Array2DRowRealMatrix(submatrix))
                result.@names = this.@names
                if(!this.properties.isEmpty()) 
                    this.transferPropertiesToRows(result, l)
                return result
            }
        }
        else
        if(n instanceof Iterable) {
            return subsetRows((n))
        }
        else
        if(n.class.isArray()) {
            return subsetRows(n as Collection<Number>)
        }
        else {
            throw new IllegalArgumentException("Cannot subset rows by type: " + n?.class?.name)
        }
    }
    @CompileStatic
    Iterator iterator() {
       new Iterator() {
           
           int i=0
           final int numRows = matrix.rowDimension
           
           boolean hasNext() {
               return i<numRows;
           }
           
           Object next() {
               matrix.dataRef[i++]
           }
           
           void remove() { 
               throw new UnsupportedOperationException() 
           }
       } 
    }
    
    /**
     * Return a subset of the rows indicated by the indices in the given iterable
     * (Note that the indices don't need to be consecutive or monotonic).
     * @param i
     * @return
     */
    @CompileStatic
    double[][] subsetRows(Iterable<Number> i) {
        List<Integer> indices = new ArrayList(this.matrix.rowDimension)
        i.each { Number n -> indices.add(n.toInteger()) }
        
        double [][] result = new double[indices.size()][this.matrix.columnDimension]
        int destRowIndex = 0
        for(int srcRowIndex in indices) {
            System.arraycopy(this.matrix.dataRef[srcRowIndex], 0, result[destRowIndex++], 0, this.matrix.columnDimension)
        }
        return result
    }
    
    @CompileStatic
    void putAt(int n, Object values) {
       matrix.dataRef[n] = (values as double[])
    }
    
    /**
     * Specialization of <code>collect</code>: if 1 arg then
     * just pass the row, if 2 args, pass the row AND the index.
     * 
     * @param c    Closure to execute for each row in the matrix
     * @return    results collected
     */
    @CompileStatic
    def collect(Closure c) {
        List<Object> results = new ArrayList(matrix.dataRef.size())
        IterationDelegate delegate = new IterationDelegate(this)
        boolean withDelegate = !this.properties.isEmpty()
        if(withDelegate) {
            c = (Closure)c.clone()
            c.setDelegate(delegate)
        }
        int rowIndex = 0;
        if(c.maximumNumberOfParameters == 1) {
            for(double [] row in matrix.dataRef) {
                if(withDelegate)
                    delegate.row = rowIndex
                results.add(c(row))
            }
        }
        else 
        if(c.maximumNumberOfParameters == 2) {
            for(double [] row in matrix.dataRef) {
                if(withDelegate)
                    delegate.row = rowIndex
                results.add(c(row, rowIndex))
                ++rowIndex
            }
        }
        return results
    }    
    
    @CompileStatic
    public List<Number> findIndexValues(Closure c) {
        List<Integer> keepRows = []
        int rowIndex = 0;
        IterationDelegate delegate = new IterationDelegate(this)
        boolean withDelegate = !this.properties.isEmpty()
        if(withDelegate) {
            c = (Closure)c.clone()
            c.setDelegate(delegate)
        }
        if(c.maximumNumberOfParameters == 1) {
            for(double [] row in matrix.dataRef) {
                if(withDelegate)
                    delegate.row = rowIndex
                if(c(row))
                    keepRows.add(rowIndex)
                ++rowIndex
            }
        }
        else 
        if(c.maximumNumberOfParameters == 2) {
            for(double [] row in matrix.dataRef) {
                if(withDelegate)
                    delegate.row = rowIndex 
                if(c(row, rowIndex))
                    keepRows.add(rowIndex)
                ++rowIndex
            }
        }
        return keepRows
    }
        
    /**
     * Filter the rows of this matrix and return 
     * a Matrix as a result
     * 
     * @param   c   a Closure to evaluate
     * 
     * @return  Matrix for which the closure c returns a non-false value
     */
    @CompileStatic
    Matrix grep(Closure c) {
        
        List<Number> keepRows = this.findIndexValues(c)

        double [][] submatrix = this.subsetRows((Iterable<Number>)keepRows)
        
        def result = new Matrix(new Array2DRowRealMatrix(submatrix))
        result.@names = this.@names
        if(!this.properties.isEmpty()) 
            this.transferPropertiesToRows(result, keepRows)
        return result
    }    
    
    private void transferPropertiesToRows(Matrix result, List<Number> indices = null) {
        if(indices != null) {
            this.properties.each {  String key, Iterable value ->
                result[key] = value[indices]
            }
        }
        else {
            this.properties.each {  String key, Iterable value ->
                result[key] = value as List
            }
        }
    }
    
    /**
     * Transforms a matrix by processing each element through the given
     * closure. The closure must take either one argument or three arguments.
     * The one argument version is only passed data values, while the 
     * three argument version is passed the data value and also the row and column
     * position.
     * 
     * @param c A closure taking 1 or 3 arguments (data value, or data value, row,
     *          column)
     * @return  A matrix reflecting the transformed data values
     */
    @CompileStatic
    Matrix transform(Closure c) {
        
        Matrix result
        if(c.maximumNumberOfParameters == 1) {
            result = transformWithoutIndices(c)
        }
        else 
        if(c.maximumNumberOfParameters == 3) {
            result = transformWithIndices(c)
        }
        if(names)
            result.names = this.names
            
        if(!this.properties.isEmpty()) 
            this.transferPropertiesToRows(result)
            
        return result
    }
    
    @CompileStatic
    private Matrix transformWithoutIndices(Closure c) {
        final int rows = matrix.rowDimension
        final int cols = matrix.columnDimension
        double[][] newData = new double[rows][cols]
        IterationDelegate delegate = new IterationDelegate(this)
        boolean withDelegate = !this.properties.isEmpty()
        if(withDelegate) {
            c = (Closure)c.clone()
            c.delegate = delegate
        }
        for(int i=0; i<rows;++i) {
            double [] row = matrix.dataRef[i]
            if(withDelegate)
                delegate.row = i
            for(int j=0; j<cols;++j) {
                newData[i][j] = (double)c(row[j])
            }
        }                    
        return new Matrix(new Array2DRowRealMatrix(newData, false))
    }
    
    @CompileStatic
    private Matrix transformWithIndices(Closure c) {
        final int rows = matrix.rowDimension
        final int cols = matrix.columnDimension
        double[][] newData = new double[rows][cols]
        IterationDelegate delegate = new IterationDelegate(this)
        boolean withDelegate = !this.properties.isEmpty()
        if(withDelegate) {
            c = (Closure)c.clone()
            c.delegate = delegate
        }
        for(int i=0; i<rows;++i) {
            double [] row = matrix.dataRef[i]
            double [] newRow = newData[i]
            if(withDelegate)
                delegate.row = i
            for(int j=0; j<cols;++j) {
                double value = row[j] // NOTE: embedding this direclty in call below causes VerifyError with CompileStatic
                newRow[j] = (double)c.call(value,i,j)
            }
        }                    
        return new Matrix(new Array2DRowRealMatrix(newData, false))
    }
    
    /**
     * Transform the given matrix by passing each row to the given
     * closure. If the closure accepts two arguments then the 
     * row index is passed as well. The closure must return a 
     * double array to replace the array passed in. If null
     * is returned then the data is left unchanged.
     * 
     * @param c Closure to process the data with.
     * @return  transformed Matrix
     */
    @CompileStatic
    Matrix transformRows(Closure c) {
        final int rows = matrix.rowDimension
        final int cols = matrix.columnDimension
        
        double[][] newData = new double[rows][cols]
        
        IterationDelegate delegate = new IterationDelegate(this)
        boolean withDelegate = !this.properties.isEmpty()
        if(withDelegate) {
            c = (Closure)c.clone()
            c.delegate = delegate
        }
        if(c.maximumNumberOfParameters == 1) {
            for(int i=0; i<rows;++i) {
                if(withDelegate)
                    delegate.row = i
                newData[i] = (double[])c(matrix.dataRef[i])
            }
        }
        else 
        if(c.maximumNumberOfParameters == 2) {
            for(int i=0; i<rows;++i) {
                if(withDelegate)
                    delegate.row = i
                newData[i] = (double[])c(matrix.dataRef[i], i)
            }
        }
        else
            throw new IllegalArgumentException("Closure must accept 1 or two arguments")
        
        Matrix result = new Matrix(new Array2DRowRealMatrix(newData,false))
        if(names)
            result.names = names
        return result
    }
    
    @CompileStatic
    void eachRow(Closure c) {
        IterationDelegate delegate = new IterationDelegate(this)
        boolean withDelegate = !this.properties.isEmpty()
        if(withDelegate) {
            c = (Closure)c.clone()
            c.delegate = delegate
        }
        if(c.maximumNumberOfParameters == 1) {
            int rowIndex = 0;
            for(double [] row in matrix.dataRef) {
                if(withDelegate)
                    delegate.row = rowIndex++
                c(row)    
            }
        }
        else 
        if(c.maximumNumberOfParameters == 2) {
            int rowIndex = 0;
            for(double [] row in matrix.dataRef) {
                if(withDelegate)
                    delegate.row = rowIndex
                c(row, rowIndex)
                ++rowIndex
            }
        }
    }
    
    /**
     * Shorthand to give a familiar function to R users
     */
    List<Long> which(Closure c) {
        this.findIndexValues(c)
    }
    
    Matrix multiply(double d) {
        new Matrix(this.matrix.scalarMultiply(d))
    }
    
    Matrix multiply(Matrix m) {
        new Matrix(this.matrix.preMultiply(m.dataRef))
    }
    
    Matrix plus(Matrix m) {
        new Matrix(this.matrix.add(m.matrix))
    }
      
    Matrix minus(Matrix m) {
        new Matrix(this.matrix.subtract(m.matrix))
    }
    
     Matrix divide(double d) {
        new Matrix(this.matrix.scalarMultiply(1/d))
    }
    
    Matrix plus(double x) {
        new Matrix(this.matrix.scalarAdd(x))
    }
    
    Matrix minus(double x) {
        new Matrix(this.matrix.scalarMinus(x))
    }
    
    Matrix transpose() {
        new Matrix(this.matrix.transpose())
    }
    
    Matrix div(Matrix m) {
        this.transform { value, i, j ->
            value / m[i][j]
        }
    }
    
    void save(String fileName) {
        new File(fileName).withWriter { w ->
            save(w)
        }
    }
    
    void save(Writer w) {
        
        List nonMatrixCols = this.properties*.key 
        
        List columnNames = nonMatrixCols + (this.names?:this.properties.names)
        
        // NOTE: the this.properties.names seems to be required because of a 
        // weird bug where groovy will prefer to set an expando property rather than
        // set the real property on this object
        if(columnNames) {
            w.println "# " + columnNames.join("\t")   
        }
        
        if(this.rowDimension == 0)
            return
        
        List<MatrixValueAdapter> adapters = TSV.formats + [
           new NumberMatrixValueAdapter(),
           new StringMatrixValueAdapter()
        ] 
       
        List<MatrixValueAdapter> types = nonMatrixCols.collect { colName ->
            adapters.find { adapter -> adapter.sniff(getProperty(colName)[0]) }
        }
        
        eachRow { row ->
            def d = delegate
            if(nonMatrixCols) {
                nonMatrixCols.eachWithIndex { colName, colIndex -> 
                    w.print((types[colIndex].serialize(d[colName])) + "\t") 
                }
            }
            w.println((row as List).join("\t"))
        }
    }
    
    static Matrix load(String fileName) {
        List rows = new ArrayList(1024)
        
        Reader r = new FileReader(fileName)
        
        // Sniff the first line
        String firstLine = r.readLine()
        List names
        if(firstLine.startsWith('#')) {
            names = firstLine.substring(1).trim().split("\t")
        }
        else {
            r.close()
            r = new FileReader(fileName)
        }
        Matrix m = new Matrix(new TSV(readFirstLine:true, r)*.values, names)
        return m
    }
       
    String toString() {
        
        def headerCells = this.@names
        if(this.properties) {
            headerCells = this.properties.collect { it.key } + headerCells
        }
        
        int columnWidth = Math.max(10, headerCells ? headerCells*.size().max() : 0)
        int rowNumWidth = 6
        
        String headers = headerCells ? (" " * rowNumWidth) + headerCells*.padRight(columnWidth).join(" ") + "\n" : ""
        
        DecimalFormat format = new DecimalFormat()
        format.minimumFractionDigits = 0
        format.maximumFractionDigits = 6
        
       
        int rowCount = 0
        def printRow = { row ->
           List cells = (row as List)
           if(this.properties) {
               cells = this.properties.collect { it.value?it.value[rowCount]:"null" } + cells
           }
           def values = cells.collect { value ->
               if(!(value instanceof Double))
                   return String.valueOf(value).padRight(columnWidth)
                       
               ((value < 0.0001d && value !=0 && value > -0.0001d) ? String.format("%1.6e",value) : format.format(value)).padRight(columnWidth)
           }
           
           return ((rowCount++) + ":").padRight(rowNumWidth) + values.join(" ")  
        }
        
        if(matrix.rowDimension<DISPLAY_ROWS) {
            return "${matrix.rowDimension}x${matrix.columnDimension} Matrix:\n"+ 
                headers + 
                matrix.data.collect { row -> 
                    printRow(row)
            }.join("\n")
        }
        else {
            int omitted = matrix.rowDimension-DISPLAY_ROWS
            String value = "${matrix.rowDimension}x${matrix.columnDimension} Matrix:\n"+ 
                headers + 
                matrix.data[0..DISPLAY_ROWS/2].collect(printRow).join("\n")  
            rowCount += omitted -1    
            value +=
                "\n... ${omitted} rows omitted ...\n" + 
                matrix.data[-(DISPLAY_ROWS/2)..-1].collect(printRow).join("\n")
                
            return value
        }
    }
    
    void setColumnNames(List<String> names) {
        this.names = names
    }
    
    void setNames(List<String> names) {
        this.names = names
    }
    
    Object getProperty(String name) {
        if(name in this.@names) {
            return this.col(this.@names.indexOf(name))
        }
        else {
            return super.getProperty(name)
        }
    }
}
