$(document).ready(function () {
	const characters = [
		{
			name: 'Obi-Wan Kenobi',
			health: 120,
			attack: 25,
			counter: 35,
		},
		{
			name: 'Luke Skywalker',
			health: 100,
			attack: 35,
			counter: 25,
		},
		{
			name: 'Dark Sidious',
			health: 150,
			attack: 35,
			counter: 40,
		},
		{
			name: 'Darth Maul',
			health: 180,
			attack: 30,
			counter: 45,
		},
	];

	let main = null;
	let enemy = null;

	$('button').click(function () {
		if (main === null) {
			//store main character
			main = parseInt($(this).val());

			//Hide other characters
			$('#players > button:not([value="' + main + '"])').attr(
				'style',
				'display: none;'
			);

			//Display available enemies
			$('#enemies > button:not([value="' + main + '"])').attr(
				'style',
				'display: inline;'
			);
		} else if (enemy === null) {
			//store current enemy
			enemy = parseInt($(this).val());

			//remove from available enemies
			$('#enemies > button[value="' + enemy + '"]').attr(
				'style',
				'display: none;'
			);

			//display as defender
			$('#defender > button[value="' + enemy + '"]').attr(
				'style',
				'display: inline;'
			);
		}
	});
});
