import java.io.BufferedReader; 
import java.io.IOException; 
import java.io.InputStreamReader; 
import java.util.regex.*;
// import java.lang.String; 

public class input  
{
    

    

  // Public method
    public void myPublicMethod() {
        System.out.println("Public methods must be called by creating objects");
    }



    public static void main(String[] args) throws IOException  
    { 
        //Enter data using BufferReader 
        BufferedReader reader =  new BufferedReader(new InputStreamReader(System.in)); 



        boolean validData = true;
        int number=0;
        do{
            System.out.println("Enter your input or 'q' to exit");
            try{

                // Reading data using readLine 
                String name = reader.readLine(); 


                // compare input and process accordingly
                if(name.equals("q")){
                    validData = false;
                }
                else{
                    String pattern = "[A-D]+";
                    if(name.matches(pattern)){
                        System.out.println(name);

                        char[] chars = name.toCharArray();
                        float value = 0;
                        int countA = 0;
                        int countC = 0;

                        for(int i=0;i<chars.length;i++){
                            // if(chars[i] == 'A')

                            switch(chars[i]){
                                case 'A':
                                    // value += 2;
                                    countA +=1;
                                    break;
                                case 'B':
                                    value += 12;
                                    break;
                                case 'C':
                                    // value += 1.25;
                                    countC += 1;
                                    break;
                                case 'D':
                                    value += 0.15;
                                    break;
                                default:
                                    value += 0; 
                            }
                        }

                        value += 7*(countA/4) + 2*(countA%4) + 6*(countC/6) + 1.25*(countC%6);


                        System.out.println("$"+value);
                    }
                    else{
                        System.out.println("It is out of range,try with another\n");
                    }
                }

                // Printing the read line 
                
                // number = scan.nextInt();//tries to get data. Goes to catch if invalid data
                // validData = true;//if gets data successfully, sets boolean to true
            }catch(IOException e){
                //executes when this exception occurs
                System.out.println("Input has to be a string. ");
            }
        }while(validData==true);       
    } 
}

public class Either<A,B> {
    private A left = null;
    private B right = null;
 
    private Either(A a,B b) {
        left = a;
        right = b;
    }
 
    public static <A,B> Either<A,B> left(A a) {
        return new Either<A,B>(a,null);
    }
 
    public A left() {
        return left;
    }
 
    public boolean isLeft() {
        return left != null;
    }
 
    public boolean isRight() {
        return right != null;
    }
 
    public B right() {
        return right;
    }
 
    public static <A,B> Either<A,B> right(B b) {
        return new Either<A,B>(null,b);
    }
 
   public void fold(F<A> leftOption, F<B> rightOption) {
        if(right == null)
            leftOption.f(left);
        else
            rightOption.f(right);
    }

    public static Either<Exception, Integer> parseNumber(String s) {
    if (! s.matches("[A-D]+"))
        return Either.left(new Exception("Invalid String"));
    else
        return Either.right(new RomanNumeral(s).toInt());
}
}
