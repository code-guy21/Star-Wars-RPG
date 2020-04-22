$(document).ready(function () {
	let main;

	$('.player').click(function () {
		if (!main) {
			main = $(this).val();
			console.log(main);
		}
	});
});
