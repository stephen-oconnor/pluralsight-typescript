/// <reference path="utility.ts" />
/// <reference path="result.ts" />
/// <reference path="player.ts" />
/// <reference path="scoreboard.ts" />

class Game {
	private scoreboard: Scoreboard = new Scoreboard();

	constructor(public player: Player, public problemCount: number, public factor: number) {}

	displayGame(): void {
		let gameForm: string = '';

		for (let index = 1; index <= this.problemCount; index++) {
			gameForm += '<div class="form-group">';
			gameForm += '<label for="answer' + index + '" class="col-sm-2 control-label">';
			gameForm += String(this.factor) + ' x ' + index + ' = </label>';
			gameForm +=
				'<div class="col-sm-1"><input type="text" class="form-control" id="answer' +
				index +
				'" size="5" /></div>';
			gameForm += '</div>';
		}

		const gameElement: HTMLElement = document.getElementById('game')!;
		gameElement.innerHTML = gameForm;

		document.getElementById('calculate')!.removeAttribute('disabled');
	}

	calculateScore(): void {
		let score = 0;

		for (let index = 1; index <= this.problemCount; index++) {
			const answer: number = Number(Utility.getInputValue('answer' + index));

			if (index * this.factor === answer) {
				score++;
			}
		}

		const result: Result = {
			playerName: this.player.name,
			score: score,
			problemCount: this.problemCount,
			factor: this.factor
		};

		this.scoreboard.addResult(result);
		this.scoreboard.updateScoreboard();

		document.getElementById('calculate')!.setAttribute('disabled', 'true');
	}
}
