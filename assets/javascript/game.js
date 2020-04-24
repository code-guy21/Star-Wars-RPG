$(document).ready(function () {
	let main = null;
	let enemy = null;
	let game_over = false;
	let defeated = 0;

	const characters = [
		{
			id: 0,
			name: 'Obi-Wan Kenobi',
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

	function reset() {
		// game is not game_over
		game_over = false;

		//reset defeated enemies
		defeated = 0;

		// hide reset
		$('#reset').attr('style', 'display: none;');

		//reset health stats
		$('#players > button[value="' + main.id + '"] > span').text(
			characters[main.id].health
		);

		// hide defender
		$('#defender > button[value="' + enemy.id + '"]').attr(
			'style',
			'display: none;'
		);

		// hide game status
		$('#status').html('');

		//reset characters to null
		main = null;
		enemy = null;

		//display character and enemy choices
		$('.player').attr('style', 'display: flex');
		$('.enemy').attr('style', 'display: none');
	}

	$('.player').click(function () {
		if (main === null) {
			//store main character
			main = { ...characters[parseInt($(this).val())] };

			//Hide other characters
			$('#players > button:not([value="' + main.id + '"])').attr(
				'style',
				'display: none;'
			);

			//Display available enemies
			$('#enemies > button:not([value="' + main.id + '"])').attr(
				'style',
				'display: flex;'
			);
		}
	});

	$('.enemy').click(function () {
		if (enemy === null) {
			//store current enemy index
			enemy = { ...characters[parseInt($(this).val())] };

			//remove from available enemies
			$('#enemies > button[value="' + enemy.id + '"]').attr(
				'style',
				'display: none;'
			);

			//display as defender
			$('#defender > button[value="' + enemy.id + '"]').attr(
				'style',
				'display: flex;'
			);

			$('#defender > button[value="' + enemy.id + '"] > span').text(
				enemy.health
			);
		}
	});

	$('#attack').click(function () {
		if (main !== null && enemy !== null && !game_over) {
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

			if (main.health <= 0) {
				$('#status').html('<p>You have been defeated... GAME OVER!</p>');
				$('#reset').attr('style', 'display: flex;');
				game_over = true;
			} else if (enemy.health <= 0) {
				defeated++;

				if (defeated === 3) {
					$('#status').html('<p>You Won!!!, Game Over </p>');
					$('#reset').attr('style', 'display: inline-block;');
					game_over = true;
				} else {
					$('#status').html(
						'<p>You defeated ' +
							enemy.name +
							' , you can choose another enemy </p>'
					);

					// hide defender
					$('#defender > button[value="' + enemy.id + '"]').attr(
						'style',
						'display: none;'
					);

					enemy = null;
				}
			}

			$('#players > button[value="' + main.id + '"] > span').text(main.health);
			$('#defender > button[value="' + enemy.id + '"] > span').text(
				enemy.health
			);
		}
	});

	$('#reset').click(reset);
});
