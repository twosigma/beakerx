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

import groovy.transform.CompileStatic;

import java.awt.Font
import java.awt.FontMetrics
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Color;
import java.awt.image.BufferedImage;

import javax.imageio.*

/**
 * Drawing is a very simple graphics class that enables simple line and text drawings on a 
 * virtualised canvas that automatically maps mathematical coordinates to pixel based
 * coordinates.
 * 
 * @author simon
 */
class Drawing {
    
    BufferedImage  image = null;
    Graphics2D g = null
    String fileName = null
    
    List<String> operations = []
    
    int xOffset = 0
    int yOffset = 0
    
    double maxX = 0
    double maxY = 0
    double minX = 0
    double minY = 0
    
    double xScale = 1.0d
    double yScale = 1.0d
    
    int height = -1
    int width = -1
    
    boolean log = false
    
    Font font = null
    
    FontMetrics fontMetrics = null
    
    /**
     * The default y position at which the next line of text will be drawn
     */
    double textY = 0
    
    /**
     * The default x position at which the next line of text will be drawn
     */
    double textX = 0
    
    /**
     * The height of the current font in drawing coordinates (not pixels)
     */
    double textHeight = 0
    
    public Drawing(String fileName, int width, int height, double minX, double minY, double maxX, double maxY) {
        this.image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        this.g = image.createGraphics()
        this.fileName = fileName
        this.xScale = width / (maxX - minX)
        this.yScale = height / (maxY - minY) // invert Y so it is like math plotting coordinates
        this.xOffset = -minX 
        this.yOffset = -minY 
        this.height = height
        this.width = width
        g.setBackground(Color.WHITE)
        g.clearRect(0,0,width,height)
        color(0,0,0)
        
        g.setRenderingHint(
            RenderingHints.KEY_TEXT_ANTIALIASING,
            RenderingHints.VALUE_TEXT_ANTIALIAS_ON);
        
        setFont("SansSerif", Font.PLAIN, 12);
        textY = maxY
    }
    
    public Drawing(String fileName, int width, int height) {
        this(fileName,width,height,0,0, 1.0d, 1.0d)
    }
    
    Drawing fontSize(float value) {
        this.setTextFont(this.font.deriveFont(value))
    }
    
    Drawing setFont(String name, int style, int size) {
        setTextFont(new Font(name, style,size))
    }
    
    Drawing setTextFont(Font f) {
        this.font = f
        g.setFont(this.font)
        this.fontMetrics = g.getFontMetrics()
        int fontHeight = this.fontMetrics.getHeight()
        
        this.textHeight = this.unTxY(fontHeight) - this.unTxY(0d)
        if(log)
            log.println "Text height = $textHeight"
        
        return this
    }
    
    /**
     * Adjust xScale and yScale to fit the given point inside 
     * the bounds
     */
    void rescale(double x1, double y1, double x2, double y2) {
        
    }
    
    Drawing bars(def x1, def x2, def y, List overText=null, List underText=null) {
        lines(x1,y,x2,y,bars:true,overText:overText, underText:underText)
    }
    
    Drawing bar(def x1, def x2, def y, String overText=null, String underText=null) {
        bars([x1], [x2], [y], [overText], [underText])
    }
    
    Drawing bar(IntRange range, def y, String overText=null, String underText=null) {
        bar(range.from, range.to, y, overText, underText)
    }
      
    Drawing lines(Map options=[:], def x1, def y1, def x2, def y2) {
		if(x1 instanceof List ||x1 instanceof double[]) {
	        if(x1.size() != y1.size())
	            throw new IllegalArgumentException("Size of x1 (${x1.size()} different to size of y1 ${y1.size()}")
	            
	        if(x2.size() != y2.size())
	            throw new IllegalArgumentException("Size of x2 (${x2.size()} different to size of y2 ${y2.size()}")
		}
                
        x1.eachWithIndex { x, index -> 
            if(options.color)
                color(options.color)
                
            def txed = txLine(x, y1[index], x2[index], y2[index]) 
            if(options.bars) {
                drawBar(txed, options.overText?options.overText[index]:null, options.underText?options.underText[index]:null)
                
                if(options.overText) {
                    // Draw text centered over bar with baseline 1 pixel above bar
                    int textWidth = fontMetrics.stringWidth(options.overText[index])
                    int middleX = txed[0] + (txed[2]-txed[0])/2
                    int textXPos = middleX - textWidth/2
                    g.drawString(options.overText[index],(float)textXPos, (float)(txed[1] - 4))
                }
                
                if(options.underText) {
                    // Draw text centered over bar with baseline 1 pixel above bar
                    int textWidth = fontMetrics.stringWidth(options.underText[index])
                    int middleX = txed[0] + (txed[2]-txed[0])/2
                    int textXPos = middleX - textWidth/2
                    g.drawString(options.underText[index],(float)textXPos, (float)(txed[1] + fontMetrics.height+1))
                } 
            }
        }
        save()
        return this
    }
    
    private void drawBar(lineCoords,String overText=null, String underText=null) {
        g.drawLine((int)lineCoords[0],(int)lineCoords[1]-5,(int)lineCoords[0],(int)lineCoords[1]+5)
        g.drawLine((int)lineCoords[2],(int)lineCoords[3]-5,(int)lineCoords[2],(int)lineCoords[3]+5)
    }
    
    Drawing line(def x1, def y1, def x2, def y2) {
        txLine(x1,y1,x2,y2)
        save()      
        return this
    }
    
    Drawing color(String value) {
        Color colorVal = Color[value]
        g.setPaint(colorVal)
        return this
    }
    
    Drawing color(int red, int green, int blue) {
        g.setPaint(new Color(red,green,blue))
        return this
    }
    
    List<Double> txLine(double x1, double y1, double x2, double y2) {
        x1 = xScale * (xOffset + x1)
        x2 = xScale * (xOffset + x2)
        y1 = this.height - yScale * (yOffset + y1)
        y2 = this.height - yScale * (yOffset + y2)
        
        if(log)
            println "Drawing line ($x1,$y1) - ($x2,$y2)"
        g.drawLine((int)x1, (int)y1, (int)x2, (int)y2)
        [x1,y1,x2,y2]
    }
    
    @CompileStatic
    double unTxY(double y) {
        (this.height - y) / yScale - yOffset
    }
    
    @CompileStatic
    double unTxX(double x) {
        x / xScale - xOffset
    }
    
    void save() {
        ImageIO.write(image, "png", new File(fileName));
    }
    
    /**
     * Draws text at the given x,y position in graph coordinates (not pixels)
     * <p>
     * The text appears with its base line at the given y coordinate, ie: the
     * y position you specify is the bottom of the text. If you want to specify the
     * top of the text, use the #textHeight property to pass y+textHeight
     */
    Drawing text(def x, def y, def value) {
        x = x.toDouble()
        y = y.toDouble()
        textY = y + this.textHeight
        textX = x
        value = String.valueOf(value)
        x = xScale * (xOffset + x)
        y = this.height - yScale * (yOffset + y)
        if(log)
            println "Drawing $value at ($x,$y)"
        g.drawString(value, (float)x, (float)y)
        save()
    }
    
    /**
     * Draw text at the default next position.
     * The default next position is adjusted each time new text is output so that
     * if you do nothing, the text appears as evenly spaced lines at the current
     * font height.
     * 
     * @param value
     * @return
     */
    Drawing text(def value) {
        double x = textX.toDouble()
        double y = textY.toDouble()
        text(x,y,value)
    }
    
    static void main(String [] args) {
        Drawing d = new Drawing("/Users/simon/test.png", 800,600, 10,0, 20, 10)
        d.log = true
        
        Matrix m = new Matrix([
                               [2,0,0,3], 
                               [5,0,7,2]
                              ]) 
        
        println "Drawing $m"
        
        /*
        d.lines(m[][0], m[][1], m[][2], m[][3])
         .color(255,0,0)
         .line(5,3,2,4)
         */
         
         d.with {
             color(0,255,0)
             line(10,0,14,4)
             bars([12],[13.5],[1])
             text(12,1, "hello")
         }
         
         
    }
  
}
