import java.io.BufferedReader; 
import java.io.InputStreamReader; 
import java.util.regex.*;
import java.util.Scanner;
import java.util.Optional;
// import java.lang.String; 
class Scale {

    final double individualPriceArr[] = {2,12,1.25,0.15};
    final double collectivePriceArr[] = {};

    public double addToSum(int index,double value){
        return individualPriceArr[index]+value;
    }   
}

class handleCommandLineInput{


    public void handleInput(String name){
    // Optional<String> name = Optional.ofNullable(input);

        boolean validData = true;
        int number=0;
        do{
            System.out.println("Enter your input or 'q' to exit");
            if(name.isPresent()){
                if(name.equals("q") || name.equals("Q")){
                    validData = false;
                    // sc.close();
                }
                else{

                    final String pattern = "[A-D]+";
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
            }
            else{
                System.out.println("word is null");
            }



                // Printing the read line 

                // number = scan.nextInt();//tries to get data. Goes to catch if invalid data
                // validData = true;//if gets data successfully, sets boolean to true

        }while(validData==true);   
    }   
}



public class input1   
{




  // Public method
    public void myPublicMethod() {
        System.out.println("Public methods must be called by creating objects");
    }



    public static void main(String[] args) 
    { 

        Scanner sc = new Scanner(System.in);


        handleCommandLineInput withInput = new handleCommandLineInput();

        Optional<String> name = Optional.ofNullable(sc.nextLine());

        if (name.isPresent()) {   
         withInput.handleInput(name);
        } 
        else  
            System.out.println("word is null");




        //Enter data using BufferReader 
        // BufferedReader reader =  new BufferedReader(new InputStreamReader(System.in)); 




    //     do{
    //         System.out.println("Enter your input or 'q' to exit");
    //         // System.out.println("Please enter a String:");
    //     // String name = sc.nextLine();

    //             // Reading data using readLine 
    //             // String name = reader.readLine();

    //             // compare input and process accordingly


    // } 


 }
}
