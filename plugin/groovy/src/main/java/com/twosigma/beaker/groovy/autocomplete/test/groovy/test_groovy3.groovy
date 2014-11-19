import com.twosigma.beaker.chart.xychart.*
import com.twosigma.beaker.chart.xychart.plotitem.Points
def plot = new Plot(title: "Changing Point Size, Color, Shape")
def y1 = [6, 7, 12, 11, 8, 14]
def y2 = y1.collect { it - 2 }
def y3 = y2.collect { it - 2 }
def y4 = y3.collect { it - 2 }
plot << new Points(y: y1)
plot << new Points(y: y2, shape: ShapeType.CIRCLE)
plot << new Points(y: y3, size: 8.0, shape: ShapeType.DIAMOND)
plot << new Points(y: y4, size: 12.0, color: Color.orange, outlineColor: Color.red)

def x = false
def y = false

if ( !x ) {
    x = true
}

assert x == true

if ( x ) {
    x = false
} else {
    y = true
}

assert x == y
