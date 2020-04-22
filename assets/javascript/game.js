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

	let main;

	$('.player').click(function () {
		if (!main) {
			main = parseInt($(this).val());

			let mainElem = $('<button>')
				.text(characters[main].name)
				.attr('class', 'players');

			$('#players').html(mainElem);

			for (let i = 0; i < characters.length; i++) {
				if (i !== main) {
					let enemyElem = $('<button>').text(characters[i].name);
					$('#enemies').append(enemyElem);
				}
			}
		}
	});
});
