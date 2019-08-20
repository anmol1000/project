import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

public class NewJava {

public  static void main(String[] args)
{
    Set<String> hS = new HashSet<String>();
    hS.add(null);
    System.out.println("This is Hashset:" + hS);

    Set<String> mySet = new Set<String>() {
    }

    Set<String> tS = new TreeSet<String>();
            tS.add(null);
    System.out.println("Tree Set" + tS);


}
}
