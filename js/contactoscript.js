$(document).ready(function() {
	$('#n1').val(Math.floor(Math.random()*10+1));
	$('#n2').val(Math.floor(Math.random()*10+1));
	$('#contactForm').submit(function(event) {
		$('#respuesta').fadeOut(250);
		$.ajax({
			url: 'sendmail.php',
			type: 'POST',
			data: $(this).serialize(),
			success: function(resp) {
				$.each($('#respuesta'), function(event) {
					$(this).fadeIn(250);
					$(this).html(resp);
					if ($(this).html() == $('#nombre').val()+', ha enviado el correo de forma exitosa.') {
						$.each($('#enviar'), function(event) {
							$(this).attr({
								disabled : true,
								value : 'Enviado'
							});
							$(this).click(function() {
								return false;
							});
						});
					}
				});
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$.each($('#respuesta'), function(event) {
					$(this).fadeIn(250);
					$(this).html('Error, no se ha podido enviar el correo, inténtelo más tarde');
				});
			}
		});
		return false;
	});
	$('#descripcion').keyup(function(event) {
		$('.caracteres').text(500 - $(this).val().length);
		if ($(this).val().length > 500) {
			$('.caracteres').css('color','red');
			$('#enviar').attr('disabled',true);
		} else {
			$('.caracteres').css('color','green');
			$('#enviar').attr('disabled',false);
		}
	});
	$('#n1, #n2').keydown(function() {
		return false;
	});
	$('#respuesta').click(function(event) {
		$(this).fadeOut(250);
	});
});