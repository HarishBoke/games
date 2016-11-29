import { Component, OnInit, Input }  from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { IGameData } from './IgameData';
import { MemoryGameService } from './memoryGameService';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
    templateUrl: "app/memoryGame/memoryGameTemplate.html",
    styleUrls: ["app/memoryGame/memoryGameStyle.css"]
})
export class MemoryGameComponent implements OnInit {
  
    errorMessage: string;
    tilesArray:any = [];
    tilesImgArray:any = [];
    printedColumns:any;
    visibleTiles:any = [];
	visibleImgName:any = [];
    randomNumber:number;
    coloumnLength:number;
    gameRetrievedData: any;

     gameData:Array<any>;

    constructor(private _memoryGameService: MemoryGameService, private route: ActivatedRoute,  private router: Router) {
       
    }
fetchData(): any {
        this._memoryGameService.getData()
    .subscribe(
        gameData => {this.gameData = gameData; 
            console.log("data loaded  + " + this.gameData);
        this.gameRetrievedData = this.gameData;
        this.startGame(); },
        error => this.errorMessage = <any>error);
}
ngOnInit():any {
    this.fetchData();
}

startGame(): void {
    this.generateNumber();
    console.log("from OnInit" + this.gameRetrievedData);
}
generateNumber(): void{
	let  minimum = 6, maximum = 12;
	this.randomNumber = Math.floor(Math.random() * (maximum - minimum) + 1) + minimum;
	this.fillData();
}
fillData(): void{
    this.coloumnLength = this.randomNumber*2;
    console.log("in fillData chekc game data" + this.gameRetrievedData);
    for(let i = 0; i < this.randomNumber; ++i){
		this.tilesArray.push(this.gameRetrievedData[i]);
	}

    this.tilesImgArray = this.tilesArray.concat(this.tilesArray);
    
}
toggleTiles(e:any): void {	
                //alert(e.target.children[0].alt);
				if (e.target.children[0].style.visibility == "hidden" || e.target.children[0].style.visibility==''){
						this.visibleTiles.push(e.target.id);
						this.visibleImgName.push(e.target.children[0].alt);

						e.target.children[0].className ="animated flipInX";
						e.target.children[0].style.visibility = 'visible';	
					} 

					if(this.visibleTiles.length >= 2){
						this.matchPairs(this.visibleTiles,this.visibleImgName);
					}
}
resetMatch(visibleTiles:any, visibleImgName:any): void{
	this.visibleTiles.splice(0,2);
	this.visibleImgName.splice(0,2);
	document.getElementById("gameContainer").style.pointerEvents = 'all';
}
gameOver(): void{
    
	if(document.querySelectorAll('.generatedColumn').length == 0){
		document.getElementById("restartGame").style.display =  "block";
	}
}
restartGame():void{
    document.getElementById("restartGame").style.display = "none";
   document.getElementById("gameContainer").innerHTML = '<div class="generatedColumn animated rotateIn col-xs-4" *ngFor="let item of tilesImgArray; let i = index"  (click)="toggleTiles($event)"><img [src]="item.image"  [alt]="item.phrase"></div>';
   location.reload();
   //this.router.navigate(['/memory-game']);
}
matchPairs(visibleTiles:any, visibleImgName:any): void {
	var successNotification = document.getElementById("success-notification");
	var errorNotification = document.getElementById("error-notification");
	var gameContainer = document.getElementById("gameContainer");

	// if tiles match 
	if(visibleTiles[0] != visibleTiles[1] && visibleImgName[0] == visibleImgName[1]){
		successNotification.style.display = "block";
		gameContainer.style.pointerEvents = 'none';
         var that = this;
		setTimeout(function(){
			errorNotification.style.display = "none";
			successNotification.style.display = "none";
				gameContainer.removeChild(document.getElementById(visibleTiles[0]));
				gameContainer.removeChild(document.getElementById(visibleTiles[1]));
			
			that.resetMatch(visibleTiles,visibleImgName);
			that.gameOver();
		},1000);
	}
	// if tiles do not match 
	else {
		errorNotification.style.display = "block";
		gameContainer.style.pointerEvents = 'none';
        var that = this;
		setTimeout(function(){				
			errorNotification.style.display = "none";
			successNotification.style.display = "none";
			document.getElementById(visibleTiles[0]).children[0].style.visibility = 'hidden';
			document.getElementById(visibleTiles[1]).children[0].style.visibility = 'hidden';
			that.resetMatch(visibleTiles,visibleImgName);
		},1000);
	}
}
}
