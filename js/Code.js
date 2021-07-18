const accessCode1 = "TREE";
const accessCode2 = "VITAMIND";
const accessCode3 = "DOCTOR";

function clues() {
    
    fill(0);
    textSize(40);
    text("SOLVE THESE PUZZLES TO UNLOCK THE VACCINE",100,50);

    stroke(250);
    strokeWeight(4);

    fill(0);
    textSize(30);
    text("NOTE : Don't leaves spaces between your answer ",300,550);
   
    fill(0)
    textSize(25)
    text("E T R E", 690,140)
    fill(rgb(204, 4, 15))
    text("Hint:___= Oxygen = Life !!", 690,175)

    // add code for displaying rest of the names and the hints.

    fill(0)
    textSize(25)   
    text("T I N A M D I V",180,240);
    fill(rgb(204, 4, 15))
    text("Hint: Helps Boost Immunity!!",180,270);

    fill(0)
    textSize(25)
    text("O D C R O T",690,400)
    fill(rgb(204, 4, 15))
    text("Hint: God disguised as Human !!",690,430);
}