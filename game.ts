type RPS = 0 | 1 | 2 | null; // Rock, Paper, Scissor
type res = 0 | 1 | 2; // Win, lose, draw
enum symbols  {
   "rock",
   "paper",
   "scissors",
};


class Game{
   p1Symbol: RPS;
   p2Symbol: RPS;
   scores: number[] = [0, 0, 0];
   static gameMatrix: RPS[][] = [[2, 1, 0], [0, 2, 1], [1, 0, 2]];
   static plays = [
      ["You won", "win"],
      ["You lost", "lose"],
      ["Draw", "draw"]
   ];
   choiceButtons: NodeListOf<HTMLButtonElement>;
   scoreLabels: NodeListOf<HTMLSpanElement>;
   
   constructor(){
      this.choiceButtons = document.querySelectorAll('button[id^=p1-]');
      this.scoreLabels = document.querySelectorAll('span[id$=-score]');
      
      // Set up click listeners for buttons
      this.choiceButtons.forEach((button: HTMLButtonElement) => {
         button.addEventListener('click', this.clickEventHandler.bind(this));
      });
      // Set up key events
      document.addEventListener('keydown', this.keyEventHandler);
   }
   clickEventHandler(e: Event){
      this.userTurn(parseInt((e.target as HTMLButtonElement).dataset['symbol']) as RPS);
   }
   keyEventHandler(e: KeyboardEvent){
      let but: HTMLButtonElement = document.querySelector('button[data-key="' + e.key + '"]');
      console.log(but);
      if(but)
         but.click();
   }
   reset(){
      this.p1Symbol = null;
      this.p2Symbol = null;
   }
   userTurn(choice: RPS){
      this.p1Symbol = choice;
      this.computerTurn();
   }
   computerTurn(){
      const choice = Math.round(Math.random() * 2)
      this.p2Symbol = choice as RPS;
      
      // Start the game
      this.evaluate();
   }
   evaluate(){
      const p1 = this.p1Symbol;
      const p2 = this.p2Symbol;
      this.displayResults(Game.gameMatrix[this.p1Symbol][this.p2Symbol]);
   }
   displayResults(result: res){
      window["computer-choice"].textContent = 'Computer chose ' + symbols[this.p2Symbol];
      window["result"].className = Game.plays[result][1];
      window["result"].textContent = Game.plays[result][0];
      this.scoreLabels[result].textContent = String(++this.scores[result]);
   }
}

const gm = new Game();