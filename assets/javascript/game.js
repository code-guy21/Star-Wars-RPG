$(document).ready(function () {
	const characters = [
		{
			name: 'Obi-Wan Kenobi',
			health: 120,
		},
		{
			name: 'Luke Skywalker',
			health: 100,
		},
		{
			name: 'Dark Sidious',
			health: 150,
		},
		{
			name: 'Darth Maul',
			health: 180,
		},
	];

	let main;

	$('.player').click(function () {
		if (!main) {
			main = $(this).val();

			let mainElement = $('<button>')
				.text(characters[main].name)
				.attr('class', 'players');

			$('#players').html(mainElement);
		}
	});
});
