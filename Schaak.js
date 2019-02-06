var init = function(diepte) {
			var board,
			game = new Chess(),
			statusEl = $('#status'),
			fenEl = $('#fen'),
			pgnEl = $('#pgn');
			function Evaluation (fenstring){
				var evalutionNumber=0;
				
				for(var i=0; i<fenstring.length; i++){
					switch (fenstring.charAt(i)) {
						case 'p':
						evalutionNumber+=1;
							break; 
						case 'P':
						evalutionNumber-=1;
							break;
						case 'r':
						evalutionNumber+=5;
							break; 
						case 'R':
						evalutionNumber-=5;
							break;
						case 'b':
						evalutionNumber+=3;
							break; 
						case 'B':
						evalutionNumber-=3;
							break;
						case 'n':
						evalutionNumber+=3;
							break;
						case 'N':
						evalutionNumber-=3;
							break;
						case 'q':
						evalutionNumber+=9;
							break;
						case 'Q':
						evalutionNumber-=9;
							break;
						case 'k':
						evalutionNumber+=10000;
							break;
						case 'K':
						evalutionNumber-=10000;
							break; 
						case ' ':
						i=200;
							break;
						default: 
						evalutionNumber+=0;
					}
					
				}
				if (game.in_checkmate() === true & game.turn() === 'b') {
					evalutionNumber = -99999;
				if (game.in_checkmate() === true & game.turn() === 'w') {
					evalutionNumber = 99999;
				}
			}
				return evalutionNumber; 
			}
			
			function minimax(node, depth, maximizingPlayer, movesDone, alpha, beta){
				/*if (depth == 0){
					var history=game.history();
					fakegame= new Chess();
					for(var j=0; j<history.length; j++){
						fakegame.move(history[j]);
					}
					for (var i=0; i<movesDone.length; i++){
						var possibleMoves= fakegame.moves();
						//	console.log("Depth:"+movesDone)
						fakegame.move(possibleMoves[movesDone[movesDone.length-i-1]]);
					} 
					//console.log(fakegame.fen())
					var returnValue= [Evaluation(fakegame.fen()), [movesDone[movesDone.length-1]]];
					//console.log(returnValue)
					return returnValue
				}
				*/
				if(depth==0){
					for (var i=0; i<movesDone.length; i++){
						var possibleMoves= game.moves();
						//	console.log("Depth:"+movesDone)
						game.move(possibleMoves[movesDone[movesDone.length-i-1]]);
					} 
					evaluationValue= Evaluation(game.fen());
					for (var i=0; i<movesDone.length; i++){
						game.undo()
					} 
					var returnValue= [evaluationValue, [movesDone[movesDone.length-1]]];
					return returnValue
				}
				var i;
				var newvalue=[];
				var history2=game.history();
					fakegame= new Chess();
					for(var j=0; j<history2.length; j++){
						fakegame.move(history2[j]);
					}
				
					for (var i=0; i<movesDone.length; i++){
						var possibleMoves= fakegame.moves();
						//console.log("Depth:"+movesDone)
						fakegame.move(possibleMoves[movesDone[i]]);
					} 
				var children= fakegame.moves();
				
				if (maximizingPlayer) {
					var value =[-999999999, [0]];
					if (children.length==0){
						value=[Evaluation(fakegame.fen()), movesDone];
					}
					for(i=0; i<children.length; i++){
						movesDone[depth-1] = i;
						newvalue=minimax(node+i, depth-1, false, JSON.parse(JSON.stringify(movesDone)), alpha, beta );
						if(newvalue[0]==value[0]){
							value[1].push(newvalue[1][0]);
						}
						if(newvalue[0]>value[0]){
							value= newvalue; 
						}
						//alpha=Math.max(alpha, value[0]);
						//if(alpha >= beta){break;}
						
						
						//value = Math.max(value[0], minimax(node+1+i, depth-1, false, movesDone.push(i))[0]);
					}
					return value
					}
				else
				var value =[999999999, [0]];
				if (children.length==0){
						value=[Evaluation(fakegame.fen()), movesDone];
					}
					for(i=0; i<children.length; i++){
						movesDone[depth-1] = i;
						newvalue=minimax(node+i, depth-1, true, JSON.parse(JSON.stringify(movesDone)), alpha, beta );
						
						if(newvalue[0]<value[0]){
							value= newvalue;
						}
						//beta=Math.max(beta, value[0])
						//if(alpha <= beta){break;}
						//value = Math.max(value[0], minimax(node+1+i, depth-1, false, movesDone.push(i))[0]);
					} 
					return value
					
			}
			var getBestMove=function () { 				
				/*
				var scores=[];
				var history=game.history();
				var possibleMoves= game.moves();
				for(i=0; i<possibleMoves.length; i++){
				fakegame= new Chess();
					for(var j=0; j<history.length; j++){
						fakegame.move(history[j]);
					}
				fakegame.move(possibleMoves[i]);
				scores.push(Evaluation(fakegame.fen()));
				}
				console.log(scores)
				*/
				var res = minimax(0, diepte, true , [], -999999999, 999999999); 
				console.log(res)
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
