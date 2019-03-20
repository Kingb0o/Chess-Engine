var init = function(diepte) {
    var board,
    game = new Chess(),
    statusEl = $('#status'),
    fenEl = $('#fen'),
    pgnEl = $('#pgn');
    var PawnTable = 
                 [
                 0,  0,  0,  0,  0,  0,  0,  0,
                 50, 50, 50, 50, 50, 50, 50, 50,
                 10, 10, 20, 30, 30, 20, 10, 10,
                 5,  5, 10, 27, 27, 10,  5,  5,
                 0,  0,  0, 25, 25,  0,  0,  0,
                 5, -5,-10,  0,  0,-10, -5,  5,
                 5, 10, 10,-25,-25, 10, 10,  5,
                 0,  0,  0,  0,  0,  0,  0,  0
                 ];
             
             var RookTable =
                 [
                 -50,-40,-30,-30,-30,-30,-40,-50,
                 -40,-20,  0,  0,  0,  0,-20,-40,
                 -30,  5, 10, 15, 15, 10,  5,-30,
                 -30,  5, 15, 20, 20, 15,  5,-30,
                 -30,  5, 15, 20, 20, 15,  5,-30,
                 -30,  5, 10, 15, 15, 10,  5,-30,
                 -40,-20,  0,  5,  5,  0,-20,-40,
                 -50,-40,-20,-30,-30,-20,-40,-50
                 ];
             
                 
             var KnightTable =
                 [
                 -50,-40,-30,-30,-30,-30,-40,-50,
                 -40,-20,  0,  0,  0,  0,-20,-40,
                 -30,  0, 10, 15, 15, 10,  0,-30,
                 -30,  5, 15, 20, 20, 15,  5,-30,
                 -30,  0, 15, 20, 20, 15,  0,-30,
                 -30,  5, 10, 15, 15, 10,  5,-30,
                 -40,-20,  0,  5,  5,  0,-20,-40,
                 -50,-40,-20,-30,-30,-20,-40,-50
                 ];
                 
             var BishopTable = 
                 [
                 -20,-10,-10,-10,-10,-10,-10,-20,
                 -10,  0,  0,  0,  0,  0,  0,-10,
                 -10,  0,  5, 10, 10,  5,  0,-10,
                 -10,  5,  5, 10, 10,  5,  5,-10,
                 -10,  0, 10, 10, 10, 10,  0,-10,
                 -10, 10, 10, 10, 10, 10, 10,-10,
                 -10,  5,  0,  0,  0,  0,  5,-10,
                 -20,-10,-40,-10,-10,-40,-10,-20
                 ];
                 
             var KingTable = 
                 [
                 -30, -40, -40, -50, -50, -40, -40, -30,
                 -30, -40, -40, -50, -50, -40, -40, -30,
                 -30, -40, -40, -50, -50, -40, -40, -30,
                 -30, -40, -40, -50, -50, -40, -40, -30,
                 -20, -30, -30, -40, -40, -30, -30, -20,
                 -10, -20, -20, -20, -20, -20, -20, -10, 
                 20,  20,   0,   0,   0,   0,  20,  20,
                 20,  30,  10,   0,   0,  10,  30,  20
                 ];
    function Evaluation (){
        var evaluationNumber=0;
        for(var i=0; i<64; i++){
             var square=game.SQUARES[i];
             //console.log(square);
             var pos=String(square);
             if (game.in_checkmate() === true & game.turn() === 'b') {evaluationNumber += -99999}
             if (game.in_checkmate() === true & game.turn() === 'w') {evaluationNumber += 99999}
             if(!(game.get(pos)==null)){
                 var tvalue=1;
                 var pvalue=0;
                 if(game.get(pos).color=='w'){tvalue*=-1};
                 //if(((square[1]=='6'&game.get(pos).color=='w')||(square[1]=='2'&game.get(pos).color=='b'))&game.get(pos).type=='p'){pvalue+=0.5*tvalue}
                 //if(((square[1]=='7'&game.get(pos).color=='w')||(square[1]=='1'&game.get(pos).color=='b'))&game.get(pos).type=='p'){pvalue+=1*tvalue}
                 //if(square[1]=='3'||square[1]=='4'||square[1]=='5'||square[1]=='6'){pvalue+=0.1}
                 //if((square[0]=='c'||square[0]=='d'||square[0]=='e'||square[0]=='f')&
                 //   (square[1]=='3'||square[1]=='4'||square[1]=='5'||square[1]=='6')){pvalue+=0.1}
 
                 if((game.get(pos).type=='p')&(game.get(pos).color=='w')){evaluationNumber-=PawnTable[i]}
                 if((game.get(pos).type=='p')&(game.get(pos).color=='b')){evaluationNumber+=PawnTable[63-i]}
 
                 if((game.get(pos).type=='n')&(game.get(pos).color=='w')){evaluationNumber-=KnightTable[i]}
                 if((game.get(pos).type=='n')&(game.get(pos).color=='b')){evaluationNumber+=KnightTable[63-i]}

                 if((game.get(pos).type=='b')&(game.get(pos).color=='w')){evaluationNumber-=BishopTable[i]}
                 if((game.get(pos).type=='b')&(game.get(pos).color=='w')){evaluationNumber+=BishopTable[63-i]}
 
                 if((game.get(pos).type=='k')&(game.get(pos).color=='w')){evaluationNumber-=KingTable[i]}
                 if((game.get(pos).type=='k')&(game.get(pos).color=='b')){evaluationNumber+=KingTable[63-i]}
                 
                 
                 switch (game.get(pos).type) {
                 case 'p':
                 evaluationNumber+=(100+pvalue)*tvalue;
                     break; 
                 case 'r':
                 evaluationNumber+=(500+pvalue)*tvalue;
                     break;
                 case 'b':
                 evaluationNumber+=(325+pvalue)*tvalue;
                     break; 
                 case 'n':
                 evaluationNumber+=(320+pvalue)*tvalue;
                     break;
                 case 'q':
                 evaluationNumber+=(975+pvalue)*tvalue;
                     break;
                 default: 
                 evaluationNumber+=0;
                 }
             }
             
         }
         
         
         evaluationNumber=Math.round(evaluationNumber * 100) / 100;
         //console.log(evaluationNumber);   
         return evaluationNumber; 
     }
     var calphabeta=[-999999999, 999999999, -999999999];
    
     function minimax(maxdepth, depth, maximizingPlayer, movesDone, alphabeta){
         if (depth==0){ calphabeta=alphabeta}
         // als de diepte gelijk is aan de diepte die je wil kijken moeten we de evoluatie functie gebruiken.
         // we moeten doorvoor eerst de zetten doen die we in movesDone hebben gezet, anders is het bord immers niet veranderd.
         if(depth==maxdepth){
             // doe de zetten die je wilt bekijken
             for (var i=0; i<movesDone.length; i++){
                 var possibleMoves= game.moves();
                 //	console.log("Depth:"+movesDone)
                 game.move(possibleMoves[movesDone[i]]);
             } 
             // evalueer
             evaluationValue= Evaluation();
             // de zetten terug
             for (var i=0; i<movesDone.length; i++){
                 game.undo()
             } 
             var returnValue= [evaluationValue, [movesDone[0]]];
             return returnValue
         }
         var i;
         var newvalue=[];
         /*  Hoeveel mogelijke zetten wit kan doen hangt af van de zet die zwart heeft gedaan
         dus om te kijken welke zetten wit kan zetten moeten we eerst de zet van zwart doen.
         */
        // doe de zetten tot nu toe gedaan
         for (var i=0; i<movesDone.length; i++){
             var possibleMoves= game.moves();
             //	console.log("Depth:"+movesDone)
             game.move(possibleMoves[movesDone[i]]);
         } 
         // kijk hoeveel zetten wit/zwart kan doen
         var children= game.moves();
         // als er geen mogelijke zetten zijn dat is het dan is het mat of pat.
         if (children.length==0){
                 value=[Evaluation(), [movesDone[0]]];
                 return value 
             }
         // doe de zetten weer terug
         for (var i=0; i<movesDone.length; i++){
             game.undo()
         } 
 
        // kijken of zwart aan zet is. wij hebben gebruikt dat zwart streeft naar een maximale score
         if (maximizingPlayer) {
             var value =[-999999999, []];
             //console.log(children.length);
             //console.log(game.moves());
             // we moeten voor elke zet gaan kijken dus een for loop
             for(i=0; i<children.length; i++){
                 // we zettten het nummer van de zet die we doen toe in movesDone om te gebruiken bij het klaarmaken voor evaluatie functie
                 movesDone[depth] = i;
                 // we gebruiken een functie in een fucntie. roepen de minimax dus weer aan.
                 newvalue=minimax(maxdepth, depth+1, false, JSON.parse(JSON.stringify(movesDone)), alphabeta);
                //console.log(newvalue);
                // kijken of de nieuwe waarde die we gevonden hebben gelijk is aan de beste waarde tot nu toe.
                // We willen namelijk dat als twee zetten even goed zijn dat we dan random willen kiezen welke zet we doen.
                 if(newvalue[0]==value[0]){
                     value[1].push(newvalue[1][0]);
                 }
                 // als een zet een beter is dat alle voorgaande zetten dan worden alle voorgaande zetten verwijderd en deze onthouden.
                 if(newvalue[0]>value[0]){
                     value[0]= newvalue[0];
                     value[1]= [newvalue[1][0]];
                 }
                 calphabeta[depth]=value[0];
                 
                 if(!(depth==0)){
                     if(newvalue[0]>=calphabeta[depth-1]){console.log("gebruikt")
                       return value}
                     }
                 alphabeta=calphabeta;
                 
               }
             return value
             }
             // else is wit aan zet dus willen we een zo laag mogelijke waarde. dus is heel vergelijkbaar met hier boven maar dan andersom.
         else            
             //console.log(children.length);
             var value =[999999999, []];
             for(i=0; i<children.length; i++){
                 movesDone[depth] = i;
                 newvalue=minimax(maxdepth, depth+1, true, JSON.parse(JSON.stringify(movesDone)), alphabeta);
                 //console.log(i);
                 if(newvalue[0]==value[0]){
                   value[1].push(newvalue[1][0]);
                 }
                 if(newvalue[0]<value[0]){
                     value[0]= newvalue[0];
                     value[1]= [newvalue[1][0]];
                 }
                 calphabeta[depth]=value[0];
                 //console.log(calphabeta[depth]+ "<" +calphabeta[depth-1]+ "i="+movesDone)
                 
                 if(newvalue[0]<calphabeta[depth-1]){console.log("gebruikt2");
                      return value}
                 alphabeta=calphabeta;
                 
             } 
             return value
             
     }
    var aantalzetten=0;
    var totaledenktijd=0;
    var getBestMove=function () { 				
        var tijdvoor= new Date();
        var res = minimax(diepte, 0, true , [], [-999999999, 999999999, -999999999]);
        console.log(res);
        var tijdna= new Date();
        var tijdsduur= tijdna.getTime()-tijdvoor.getTime();
        aantalzetten+=1;
        totaledenktijd+=tijdsduur;
        var gemiddeldetijd= totaledenktijd/aantalzetten;
        console.log ("het duurde:"+tijdsduur);
        console.log("de denk tijd is gemiddeld:"+gemiddeldetijd);
        /*
        var bestMoves = scores.filter(myFunction);
        function myFunction(value) {
        return value > res-1;
        }
        var randomIndex = Math.floor(Math.random() * bestMoves.length);
        var index;
        for (q=0; q<randomIndex+1; q++){
            index=scores.indexOf(res,index+1);
            console.log(randomIndex)
        }
        */
        var randomIndex = Math.floor(Math.random() * res[1].length);
        var possibleMoves= game.moves();
        game.move(possibleMoves[res[1][randomIndex]]);
        board.position(game.fen());
        updateStatus();
        
    } 
    /*= function( depth = 0){
        var possibleMovesBlack= game.moves();
        console.log(possibleMovesBlack);
        var Evaluations=[];
        var oldPosition= game.fen();
        if (possibleMovesBlack===0) return;
        var i;
        for(i=0; i<possibleMovesBlack.length; i++){
            
        }
        console.log(Evaluations);
        Evaluations.sort(function(a, b){return a - b});
        console.log(Evaluations);
        game.move(Evaluations[0]);
        board.position(game.fen());
        updateStatus();
    }
    */
    var removeGreySquares = function() {
    $('#board .square-55d63').css('background', '');
    };
    var greySquare = function(square) {
    var squareEl = $('#board .square-' + square);
    
    var background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
    }
    squareEl.css('background', background);
    };
    var onDragStart = function(source, piece) {
    // do not pick up pieces if the game is over
    // or if it's not that side's turn
    if (game.game_over() === true ||
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
    };
    var makeRandomMove = function() {
    var possibleMoves = game.moves();
    // game over
    if (possibleMoves.length === 0) return;
    var randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    board.position(game.fen());
    updateStatus();
    };
    var onDrop = function(source, target) {
    removeGreySquares();
    // see if the move is legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
    });
    
    // illegal move
    if (move === null) return 'snapback';
      // make random legal move for black
      window.setTimeout(getBestMove, 250);
      updateStatus();
    };
    
    var onSnapEnd = function() {
    board.position(game.fen());
    };
    var onMouseoverSquare = function(square, piece) {
    // get list of possible moves for this square
    var moves = game.moves({
        square: square,
        verbose: true
    });
    // exit if there are no moves available for this square
    if (moves.length === 0) return;
    // highlight the square they moused over
    greySquare(square);
    // highlight the possible squares for this piece
    for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
    }
    };
    var onMouseoutSquare = function(square, piece) {
    removeGreySquares();
    };
    var onSnapEnd = function() {
    board.position(game.fen());
    };
    var updateStatus = function() {
    var status = '';
    var moveColor = 'White';
    if (game.turn() === 'b') {
        moveColor = 'Black';
    }
    // checkmate?
    if (game.in_checkmate() === true) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    }
    // draw?
    else if (game.in_draw() === true) {
        status = 'Game over, drawn position';
    }
    // game still on
    else {
        status = moveColor + ' to move';
        // check?
        if (game.in_check() === true) {
        status += ', ' + moveColor + ' is in check';
        }
    }
    statusEl.html(status);
    fenEl.html(game.fen());
    pgnEl.html(game.pgn());
    };
    var cfg = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onMouseoutSquare: onMouseoutSquare,
    onMouseoverSquare: onMouseoverSquare,
    onSnapEnd: onSnapEnd
    };
    board = ChessBoard('board', cfg);
    updateStatus();
    }; // end init()
