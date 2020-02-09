type RPS = "rock" | "paper" | "scissors" | null;

const icons = {
   "rock": "👊",
   "paper": "🖐",
   "scissors": "✌"
};

class Game{
   p1Symbol: RPS;
   p2Symbol: RPS;
   scores: number[] = [0,0,0];
   // computerChoiceLabel: HTMLSpanElement;
   // resultLabel: HTMLSpanElement;
   choiceButtons: NodeListOf<HTMLButtonElement>;
   scoreLabels: NodeListOf<HTMLSpanElement>;
   
   constructor(){
   //   this.p1Container = p1Container;
   //   this.p2Container = p2Container; 
      // this.computerChoiceLabel = document.getElementById('computer-choice');
      // this.resultLabel = document.getElementById('result');
      this.choiceButtons = document.querySelectorAll('button[id^=p1-]');
      this.scoreLabels = document.querySelectorAll('span[id$=-score]');
      
      // Set up listeners for buttons
      this.choiceButtons.forEach((button: HTMLButtonElement) => {
         button.addEventListener('click', this.eventHandler.bind(this));
      });
   }
   eventHandler(e: Event){
      // console.log(this);
      this.userTurn((e.target as HTMLButtonElement).dataset['symbol'] as RPS);
      // console.log(e);
   }
   reset(){
      this.p1Symbol = null;
      this.p2Symbol = null;

   }
   userTurn(choice: RPS){
      console.log('User chose '+ choice);
      this.p1Symbol = choice;
      this.computerTurn();
   }
   computerTurn(){
      const choice = Math.random() * 10
      switch(true){
         case choice <= 3.33:
            this.p2Symbol = "rock";
            break;
         case choice > 3.33 && choice <= 6.66:
            this.p2Symbol = "paper";
            break;
         case choice > 6.66:
            this.p2Symbol = "scissors";
            break;
      }
      console.log('Computer chose ' + this.p2Symbol);
      
      // Start the game
      this.evaluate();
   }
   evaluate(){
      if(this.p1Symbol === this.p2Symbol)
         this.displayResults(2);
      else if(this.p1Symbol === 'rock'){
         if(this.p2Symbol === 'paper')
            this.displayResults(1);
         else
         this.displayResults(0);
      }
      else if(this.p1Symbol === 'paper'){
         if(this.p2Symbol === 'scissors')
            this.displayResults(1);
         else
         this.displayResults(0);
      }
      else if(this.p1Symbol === 'scissors'){
         if(this.p2Symbol === 'rock')
            this.displayResults(1);
         else
         this.displayResults(0);
      }
   }
   displayResults(result: 0 | 1 | 2){
      const strings = {
         "res": '',
         "comp": 'Computer chose ',
         "class": ''
      }
      switch(result){
         case 0:
            strings.res = 'You won';
            strings.comp += this.p2Symbol;
            strings.class = 'win';
            break;
         case 1:
            strings.res = 'You lost';
            strings.comp += this.p2Symbol;
            strings.class = 'lose';
            break;
         case 2:
            strings.res = 'Draw';
            strings.comp += this.p2Symbol + ' too!';
            strings.class = 'draw';
            break;
      }
      window["computer-choice"].textContent = strings.comp;
      window["result"].className = strings.class;
      window["result"].textContent = strings.res;
      this.scoreLabels[result].textContent = String(++this.scores[result]);
   }
}

const gm = new Game();