package kx; //jar cf c.jar kx/*.class
import java.net.*;import java.io.*;import java.sql.*;import java.lang.reflect.Array;import java.text.*;import java.util.UUID;
//tick: c c=new c("",5010);Object[]x={"GE",new Double(2.5),new Integer(23)};c.k(".u.upd","trade",x);
//Object[]x={new Time(t()),"xx",new Double(93.5),new Integer(300)};for(int i=0;i<1000;++i)c.ks("upsert","trade",x);c.k("");
//Flip t=td(c.k("select sum size by sym from trade"));O(n(t.x));O(n(t.y[0]));O(at(t.y[0],0)); //cols rows data
public class c{
/*public static void main(String[]args){try{c c=new c("",5001);
// O(c.k("0N!",c.k("0N!1999.01.01D-1")));
//c.k("0N!",NULL('z'));
//c.setEncoding("UTF-8");O("Unicode "+c.k("{`$x}","Ranby BjÃ¶rklund AB".toCharArray()));O("Unicode "+c.k("{x}",(String)c.k("{`$x}",(char[])c.k("\"c\"$0x52616e627920426ac3b6726b6c756e64204142"))));   
 c.close();}catch(Exception e){e.printStackTrace();}}
*/
private static String e="ISO-8859-1";private static PrintStream out=System.out;private int sync=0;
public static void setEncoding(String e)throws UnsupportedEncodingException{c.e=e;out=new PrintStream(System.out,true,e);}
public Socket s;DataInputStream i;OutputStream o;byte[]b,B;int j,J,vt;boolean a;
void io(Socket x)throws IOException{s=x;i=new DataInputStream(s.getInputStream());o=s.getOutputStream();}public void close()throws IOException{if(null!=s){s.close();s=null;};if(null!=i){i.close();i=null;}if(null!=o){o.close();o=null;}}
public interface IAuthenticate{public boolean authenticate(String s);}
public c(ServerSocket s,IAuthenticate a)throws IOException{io(s.accept());int n=i.read(b=new byte[99]);if(a!=null&&!a.authenticate(new String(b,0,n>1?n-2:0))){close();throw new IOException("access");}vt=n>1?b[n-2]:0;b[0]=(byte)(vt<'\3'?vt:'\3');o.write(b,0,1);} //c c=new c(new ServerSocket(5010));while(true)c.w(2,c.k());
public c(ServerSocket s)throws IOException{this(s,null);}
public c(String h,int p,String u)throws KException,IOException{B=new byte[2+ns(u)];io(new Socket(h,p));J=0;w(u+"\3");o.write(B);if(1!=i.read(B,0,1)){close();B=new byte[1+ns(u)];io(new Socket(h,p));J=0;w(u);o.write(B);if(1!=i.read(B,0,1)){close();throw new KException("access");}}vt=Math.min(B[0],3);}
public c(String h,int p)throws KException,IOException{this(h,p,System.getProperty("user.name"));}
protected c(){};
public static class Month implements Comparable<Month>{public int i;public Month(int x){i=x;}public String toString(){int m=i+24000,y=m/12;return i==ni?"":i2(y/100)+i2(y%100)+"-"+i2(1+m%12);}public boolean equals(final Object o){return(o instanceof Month)?((Month)o).i==i:false;}public int hashCode(){return i;}public int compareTo(Month m){return i-m.i;}}
public static class Minute implements Comparable<Minute>{public int i;public Minute(int x){i=x;}public String toString(){return i==ni?"":i2(i/60)+":"+i2(i%60);}
public boolean equals(final Object o){return(o instanceof Minute)?((Minute)o).i==i:false;}public int hashCode(){return i;}public int compareTo(Minute m){return i-m.i;}}
public static class Second implements Comparable<Second>{public int i;public Second(int x){i=x;}public String toString(){return i==ni?"":new Minute(i/60).toString()+':'+i2(i%60);}public boolean equals(final Object o){return(o instanceof Second)?((Second)o).i==i:false;}public int hashCode(){return i;}public int compareTo(Second s){return i-s.i;}}
public static class Timespan implements Comparable<Timespan>{public long j;public Timespan(long x){j=x;}
public String toString(){if(j==nj)return "";String s=j<0?"-":"";long jj=j<0?-j:j;int d=((int)(jj/86400000000000L));if(d!=0)s+=d+"D";return s+i2((int)((jj%86400000000000L)/3600000000000L))+":"+i2((int)((jj%3600000000000L)/60000000000L))+":"+i2((int)((jj%60000000000L)/1000000000L))+"."+i9((int)(jj%1000000000L));}public int compareTo(Timespan t){return j>t.j?1:j<t.j?-1:0;}
public boolean equals(final Object o){return(o instanceof Timespan)?((Timespan)o).j==j:false;}public int hashCode(){return(int)(j^(j>>>32));}}
public static class Dict{public Object x;public Object y;public Dict(Object X,Object Y){x=X;y=Y;}}
public static class Flip{public String[]x;public Object[]y;public Flip(Dict X){x=(String[])X.x;y=(Object[])X.y;}public Object at(String s){return y[find(x,s)];}}
public static class KException extends Exception{KException(String s){super(s);}}

private void u(){int n=0,r=0,f=0,s=8,p=s;short i=0;j=0;byte[]dst=new byte[ri()];int d=j;int[]aa=new int[256];while(s<dst.length){if(i==0){f=0xff&(int)b[d++];i=1;}if((f&i)!=0){r=aa[0xff&(int)b[d++]];dst[s++]=dst[r++];dst[s++]=dst[r++];n=0xff&(int)b[d++];for(int m=0;m<n;m++)dst[s+m]=dst[r+m];}else dst[s++]=b[d++];while(p<s-1)aa[(0xff&(int)dst[p])^(0xff&(int)dst[p+1])]=p++;if((f&i)!=0)p=s+=n;i*=2;if(i==256)i=0;}b=dst;j=8;}
void w(byte x){B[J++]=x;}static int ni=Integer.MIN_VALUE;static long nj=Long.MIN_VALUE;static double nf=Double.NaN;
boolean rb(){return 1==b[j++];}void w(boolean x){w((byte)(x?1:0));}  char rc(){return(char)(b[j++]&0xff);}void w(char c){w((byte)c);}
short rh(){int x=b[j++],y=b[j++];return(short)(a?x&0xff|y<<8:x<<8|y&0xff);}                               void w(short h){w((byte)(h>>8));w((byte)h);}
int ri(){int x=rh(),y=rh();return a?x&0xffff|y<<16:x<<16|y&0xffff;}                                       void w(int i){w((short)(i>>16));w((short)i);}
UUID rg(){boolean oa=a;a=false;UUID g=new UUID(rj(),rj());a=oa;return g;}
void w(UUID uuid){if(vt<3)throw new RuntimeException("Guid not valid pre kdb+3.0");w(uuid.getMostSignificantBits());w(uuid.getLeastSignificantBits());}
long rj(){int x=ri(),y=ri();return a?x&0xffffffffL|(long)y<<32:(long)x<<32|y&0xffffffffL;}                void w(long j){w((int)(j>>32));w((int)j);}
float re(){return Float.intBitsToFloat(ri());}                                                            void w(float e){w(Float.floatToIntBits(e));}
double rf(){return Double.longBitsToDouble(rj());}                                                        void w(double f){w(Double.doubleToLongBits(f));}
Month rm(){return new Month(ri());}   void w(Month m){w(m.i);} Minute ru(){return new Minute(ri());}      void w(Minute u){w(u.i);}
Second rv(){return new Second(ri());} void w(Second v){w(v.i);}Timespan rn(){return new Timespan(rj());}  void w(Timespan n){if(vt<1)throw new RuntimeException("Timespan not valid pre kdb+2.6");w(n.j);}
public java.util.TimeZone tz=java.util.TimeZone.getDefault();
static long k=86400000L*10957,n=1000000000L;long o(long x){return tz.getOffset(x);}long lg(long x){return x+o(x);}long gl(long x){return x-o(x-o(x));}
Date rd(){int i=ri();return new Date(i==ni?nj:gl(k+86400000L*i));}                             void w(Date d){long j=d.getTime();w(j==nj?ni:(int)(lg(j)/86400000-10957));}
Time rt(){int i=ri();return new Time(i==ni?nj:gl(i));}                                         void w(Time t){long j=t.getTime();w(j==nj?ni:(int)(lg(j)%86400000));}
//Timestamp
java.util.Date rz(){double f=rf();return new java.util.Date(Double.isNaN(f)?nj:gl(k+Math.round(8.64e7*f)));} void w(java.util.Date z){long j=z.getTime();w(j==nj?nf:(lg(j)-k)/8.64e7);}
Timestamp rp(){long j=rj(),d=j<0?(j+1)/n-1:j/n;Timestamp p=new Timestamp(j==nj?j:gl(k+1000*d));if(j!=nj)p.setNanos((int)(j-n*d));return p;}
void w(Timestamp p){long j=p.getTime();if(vt<1)throw new RuntimeException("Timestamp not valid pre kdb+2.6");w(j==nj?j:1000000*(lg(j)-k)+p.getNanos()%1000000);}

String rs()throws UnsupportedEncodingException{int i=j;for(;b[j++]!=0;);return (i==j-1)?"":new String(b,i,j-1-i,e);}void w(String s)throws UnsupportedEncodingException{int i=0,n=ns(s);byte[]b=s.getBytes(e);for(;i<n;)w(b[i++]);B[J++]=0;}
Object r()throws UnsupportedEncodingException{int i=0,n,t=b[j++];if(t<0)switch(t){case-1:return new Boolean(rb());case(-2):return rg();case-4:return new Byte(b[j++]);case-5:return new Short(rh());
  case-6:return new Integer(ri());case-7:return new Long(rj());case-8:return new Float(re());case-9:return new Double(rf());case-10:return new Character(rc());case-11:return rs();
  case-12:return rp();case-13:return rm();case-14:return rd();case-15:return rz();case-16:return rn();case-17:return ru();case-18:return rv();case-19:return rt();}
 if(t>99){if(t==100){rs();return r();}if(t<104)return b[j++]==0&&t==101?null:"func";if(t>105)r();else for(n=ri();i<n;i++)r();return"func";}
 if(t==99)return new Dict(r(),r());j++;if(t==98)return new Flip((Dict)r());n=ri();switch(t){
  case 0:Object[]L=new Object[n];for(;i<n;i++)L[i]=r();return L;        case 1:boolean[]B=new boolean[n];for(;i<n;i++)B[i]=rb();return B;
  case 2:{UUID[]G=new UUID[n];for(;i<n;i++)G[i]=rg();return G;}
  case 4:byte[]G=new byte[n];for(;i<n;i++)G[i]=b[j++];return G;         case 5:short[]H=new short[n];for(;i<n;i++)H[i]=rh();return H;
  case 6:int[]I=new int[n];for(;i<n;i++)I[i]=ri();return I;             case 7:long[]J=new long[n];for(;i<n;i++)J[i]=rj();return J;
  case 8:float[]E=new float[n];for(;i<n;i++)E[i]=re();return E;	        case 9:double[]F=new double[n];for(;i<n;i++)F[i]=rf();return F;
 case 10:char[]C=new String(b,j,n,e).toCharArray();j+=n;return C;       case 11:String[]S=new String[n];for(;i<n;i++)S[i]=rs();return S;
 case 12:Timestamp[]P=new Timestamp[n];for(;i<n;i++)P[i]=rp();return P; case 13:Month[]M=new Month[n];for(;i<n;i++)M[i]=rm();return M;
 case 14:Date[]D=new Date[n];for(;i<n;i++)D[i]=rd();return D;           case 15:java.util.Date[]Z=new java.util.Date[n];for(;i<n;i++)Z[i]=rz();return Z;
 case 16:Timespan[]N=new Timespan[n];for(;i<n;i++)N[i]=rn();return N;   case 17:Minute[]U=new Minute[n];for(;i<n;i++)U[i]=ru();return U;
 case 18:Second[]V=new Second[n];for(;i<n;i++)V[i]=rv();return V;       case 19:Time[]T=new Time[n];for(;i<n;i++)T[i]=rt();return T;}return null;}

//object.getClass().isArray()   t(int[]) is .5 isarray is .1 lookup .05
public static int t(Object x){return
 x instanceof Boolean?-1:x instanceof UUID?-2:x instanceof Byte?-4:x instanceof Short?-5:x instanceof Integer?-6:x instanceof Long?-7:x instanceof Float?-8:x instanceof Double?-9:x instanceof Character?-10:x instanceof String?-11:
x instanceof Date?-14:x instanceof Time?-19:x instanceof Timestamp?-12:x instanceof java.util.Date?-15:x instanceof Timespan?-16: x instanceof Month?-13:x instanceof Minute?-17:x instanceof Second?-18:
 x instanceof boolean[]?1:x instanceof UUID[]?2:x instanceof byte[]?4:x instanceof short[]?5:x instanceof int[]?6:x instanceof long[]?7:x instanceof float[]?8:x instanceof double[]?9:x instanceof char[]?10:x instanceof String[]?11:
x instanceof Date[]?14:x instanceof Time[]?19:x instanceof Timestamp[]?12:x instanceof java.util.Date[]?15:x instanceof Timespan[]?16:x instanceof Month[]?13:x instanceof Minute[]?17:x instanceof Second[]?18:
 x instanceof Flip?98:x instanceof Dict?99:0;}

static int[]nt={0,1,16,0,1,2,4,8,4,8,1,0,8,4,4,8,8,4,4,4};static int ns(String s)throws UnsupportedEncodingException{int i;if(s==null)return 0;if(-1<(i=s.indexOf('\000')))s=s.substring(0,i);return s.getBytes(e).length;}
public static int n(Object x)throws UnsupportedEncodingException{return x instanceof Dict?n(((Dict)x).x):x instanceof Flip?n(((Flip)x).y[0]):x instanceof char[]?new String((char[])x).getBytes(e).length:Array.getLength(x);}
public int nx(Object x)throws UnsupportedEncodingException{int i=0,n,t=t(x),j;if(t==99)return 1+nx(((Dict)x).x)+nx(((Dict)x).y);if(t==98)return 3+nx(((Flip)x).x)+nx(((Flip)x).y);
 if(t<0)return t==-11?2+ns((String)x):1+nt[-t];j=6;n=n(x);if(t==0||t==11)for(;i<n;++i)j+=t==0?nx(((Object[])x)[i]):1+ns(((String[])x)[i]);else j+=n*nt[t];return j;}
void w(Object x)throws UnsupportedEncodingException{int i=0,n,t=t(x);w((byte)t);if(t<0)switch(t){
  case-1:w(((Boolean)x).booleanValue());return; case-2:w((UUID)x);return;
  case-4:w(((Byte)x).byteValue());return;       case-5:w(((Short)x).shortValue());return;
  case-6:w(((Integer)x).intValue());return;     case-7:w(((Long)x).longValue());return;
  case-8:w(((Float)x).floatValue());return;     case-9:w(((Double)x).doubleValue());return;
  case-10:w(((Character)x).charValue());return; case-11:w((String)x);return;
  case-12:w((Timestamp)x);return;               case-13:w((Month)x);return;case-14:w((Date)x);return;
  case-15:w((java.util.Date)x);return;          case-16:w((Timespan)x);return;case-17:w((Minute)x);return;
  case-18:w((Second)x);return;case-19:w((Time)x);return;}
 if(t==99){Dict r=(Dict)x;w(r.x);w(r.y);return;}B[J++]=0;if(t==98){Flip r=(Flip)x;B[J++]=99;w(r.x);w(r.y);return;}
 w(n=n(x));if(t==10){byte[]b=new String((char[])x).getBytes(e);for(;i<b.length;)w(b[i++]);}else for(;i<n;++i)if(t==0)w(((Object[])x)[i]);else if(t==1)w(((boolean[])x)[i]);
 else if(t==2)w(((UUID[])x)[i]);else if(t==4)w(((byte[])x)[i]);
 else if(t==5)w(((short[])x)[i]);else if(t==6)w(((int[])x)[i]);else if(t==7)w(((long[])x)[i]);
 else if(t==8)w(((float[])x)[i]);else if(t==9)w(((double[])x)[i]);
 else if(t==11)w(((String[])x)[i]);else if(t==12)w(((Timestamp[])x)[i]);else if(t==13)w(((Month[])x)[i]);else if(t==14)w(((Date[])x)[i]);
 else if(t==15)w(((java.util.Date[])x)[i]);else if(t==16)w(((Timespan[])x)[i]);else if(t==17)w(((Minute[])x)[i]);else if(t==18)w(((Second[])x)[i]);
 else w(((Time[])x)[i]);}
protected void w(int i,Object x)throws IOException{int n=nx(x)+8;synchronized(o){B=new byte[n];B[0]=0;B[1]=(byte)i;J=4;w(n);w(x);o.write(B);}}
public void kr(Object x)throws IOException{if(sync==0)throw new IOException("Unexpected response msg");sync--;w(2,x);}
public void ke(String s)throws IOException{if(sync==0)throw new IOException("Unexpected error msg");sync--;int n=2+ns(s)+8;synchronized(o){B=new byte[n];B[0]=0;B[1]=2;J=4;w(n);w((byte)-128);w(s);o.write(B);}}
public void ks(String s)throws IOException{w(0,cs(s));}public void ks(Object x)throws IOException{w(0,x);} char[]cs(String s){return s.toCharArray();}
public void ks(String s,Object x)throws IOException{Object[]a={cs(s),x};w(0,a);}
public void ks(String s,Object x,Object y)throws IOException{Object[]a={cs(s),x,y};w(0,a);}
public void ks(String s,Object x,Object y,Object z)throws IOException{Object[]a={cs(s),x,y,z};w(0,a);}
public Object k()throws KException,IOException,UnsupportedEncodingException{synchronized(i){i.readFully(b=new byte[8]);a=b[0]==1;if(b[1]==1)sync++;boolean c=b[2]==1;j=4;i.readFully(b=new byte[ri()-8]);if(c)u();else j=0;if(b[0]==-128){j=1;throw new KException(rs());}return r();}}
public synchronized Object k(Object x)throws KException,IOException{w(1,x);return k();}
public Object k(String s)throws KException,IOException{return k(cs(s));}
public Object k(String s,Object x)throws KException,IOException{Object[]a={cs(s),x};return k(a);}
public Object k(String s,Object x,Object y)throws KException,IOException{Object[]a={cs(s),x,y};return k(a);}
public Object k(String s,Object x,Object y,Object z)throws KException,IOException{Object[]a={cs(s),x,y,z};return k(a);}

public static Object[]NULL={null,new Boolean(false),new UUID(0,0),null,new Byte((byte)0),new Short(Short.MIN_VALUE),new Integer(ni),new Long(nj),new Float(nf),new Double(nf),new Character(' '),"",
 new Timestamp(nj),new Month(ni),new Date(nj),new java.util.Date(nj),new Timespan(nj),new Minute(ni),new Second(ni),new Time(nj)};
public static Object NULL(char c){return NULL[" bg xhijefcspmdznuvt".indexOf(c)];}

public static boolean qn(Object x){int t=-t(x);return(t==2||t>4)&&x.equals(NULL[t]);}
public static Object at(Object x,int i){return qn(x=Array.get(x,i))?null:x;}
public static void set(Object x,int i,Object y){Array.set(x,i,null==y?NULL[t(x)]:y);}

static int find(String[]x,String y){int i=0;for(;i<x.length&&!x[i].equals(y);)++i;return i;}
public static Flip td(Object X)throws java.io.UnsupportedEncodingException{if(X instanceof Flip)return(Flip)X;Dict d=(Dict)X;Flip a=(Flip)d.x,b=(Flip)d.y;int m=n(a.x),n=n(b.x);String[]x=new String[m+n];System.arraycopy(a.x,0,x,0,m);System.arraycopy(b.x,0,x,m,n);Object[]y=new Object[m+n];System.arraycopy(a.y,0,y,0,m);System.arraycopy(b.y,0,y,m,n);return new Flip(new Dict(x,y));}
public static Object O(Object x){out.println(x);return x;}public static void O(int x){out.println(x);}public static void O(boolean x){out.println(x);}public static void O(long x){out.println(x);}public static void O(double x){out.println(x);}
public static long t(){return System.currentTimeMillis();}static long t;public static void tm(){long u=t;t=t();if(u>0)O(t-u);}static String i2(int i){return new DecimalFormat("00").format(i);}static String i9(int i){return new DecimalFormat("000000000").format(i);}
}
//2013.12.19 qn did not detect null guid
//2013.05.01 added compareTo() to temporal classes, timespan.toString(), kr, ke
//2013.04.29 added hashCode() to temporal classes
//2013.04.22 added x instanceof UUID[]?:
//2012.05.29 for use with kdb+v3.0, changed handshake and added UUID. boolean v6->vt reflects type version
//2012.03.01 added equals() for Month,Minute,Second,Timespan. null checks in close().
//                 empty constructor c() and changed w(int,Object) to protected
//2012.02.09 close() if connect fails
//2012.01.06 read datetime, rz(), was truncating mS rather than rounding
//2010.10.06 block sending timestamp/timespan types to versions prior to kdb+2.6 
//2010.05.06 optimized rs() for reading null symbols 
//2010.03.20 changed datetime to java.util.Date as it was incompatible with timestamp
//2010.02.01 added unicode support for char vectors and symbol
//2010.01.06 fixed 0Np
//2009.12.07 removed v6 dependencies
//2009.12.02 uncommented at, set and qn 
//2009.10.29 u - uncompress, connect retry for v<=2.5
//2009.09.23 Timestamp,Timespan,v6 connect
//2008.08.14 String(,,,"ISO-8859-1") to avoid mutex
//2007.10.18 tz
//2007.08.06 kx
//2007.04.20 sql.{Date|Time|Timestamp}
