let main = null;
let enemy = null;
let game_over = false;
let enemies_defeated = 0;

const characters = [
	{
		id: 0,
		name: 'obi-Wan Kenobi',
		health: 140,
		base_attack: 6,
		attack_power: 6,
		counter: 15,
	},
	{
		id: 1,
		name: 'Luke Skywalker',
		health: 100,
		base_attack: 8,
		attack_power: 8,
		counter: 20,
	},
	{
		id: 2,
		name: 'Darth Sidious',
		health: 180,
		base_attack: 7,
		attack_power: 7,
		counter: 35,
	},
	{
		id: 3,
		name: 'Darth Maul',
		health: 250,
		base_attack: 10,
		attack_power: 10,
		counter: 30,
	},
];

function hide(elem) {
	$(elem).attr('style', 'display: none;');
}

function display(elem) {
	$(elem).attr('style', 'display: flex;');
}

$(document).ready(function () {
	function reset() {
		// reset game session
		game_over = false;
		enemies_defeated = 0;

		// hide restart button
		hide('#reset');

		//reset health stats
		$('#players > button[value="' + main.id + '"] > #health').text(
			characters[main.id].health
		);

		// hide defender
		hide('#defender > button[value="' + enemy.id + '"]');

		// hide game status
		$('#status').html('');

		//reset characters
		main = null;
		enemy = null;

		//display character and hide enemy choices
		display('.player');
		hide('.enemy');
	}

	//listener for main character selection
	$('.player').click(function () {
		if (main === null) {
			//store main character
			main = { ...characters[parseInt($(this).val())] };

			//Hide other characters
			hide('#players > button:not([value="' + main.id + '"])');

			//Display available enemies
			display('#enemies > button:not([value="' + main.id + '"])');
		}
	});

	//listener for enemy character selections
	$('.enemy').click(function () {
		if (enemy === null) {
			//store enemy selection
			enemy = { ...characters[parseInt($(this).val())] };

			//remove from available enemies
			hide('#enemies > button[value="' + enemy.id + '"]');

			//display as defender and update health
			display('#defender > button[value="' + enemy.id + '"]');

			$('#defender > button[value="' + enemy.id + '"] > #health').text(
				enemy.health
			);
		}
	});

	//listener for attack button
	$('#attack').click(function () {
		if (main !== null && enemy !== null && !game_over) {
			//display damage and counter stats
			$('#status').html(
				'<p>You attacked ' +
					enemy.name +
					' for ' +
					main.attack_power +
					' damage</p>' +
					'<p>' +
					enemy.name +
					' attacked you for ' +
					enemy.counter +
					' damage </p>'
			);

			//decrease enemy health
			enemy.health -= main.attack_power;

			//decrease main character health
			main.health -= enemy.counter;

			//increase main character attack power
			main.attack_power += main.base_attack;

			//update health stats
			$('#players > button[value="' + main.id + '"] > #health').text(
				main.health
			);
			$('#defender > button[value="' + enemy.id + '"] > #health').text(
				enemy.health
			);

			//check if player or enemy has been defeated
			if (main.health <= 0) {
				//notify player has lost the game
				$('#status').html('<p>You have been defeated</p>');
				//display restart button
				display('#reset');
				//game is over
				game_over = true;
			} else if (enemy.health <= 0) {
				//increase number of enemies defeated
				enemies_defeated++;

				//check if all enemies have been defeated
				if (enemies_defeated === 3) {
					//notify user has won the game
					$('#status').html('<p>You Win!!!</p>');
					//display restart button
					display('#reset');
					//game is over
					game_over = true;
				} else {
					$('#status').html(
						'<p>You defeated ' +
							enemy.name +
							'</p><p> you can choose another enemy </p>'
					);

					// hide enemy
					hide('#defender > button[value="' + enemy.id + '"]');

					// reset enemy
					enemy = null;
				}
			}
		}
	});

	//listener for restart button
	$('#reset').click(reset);
});
