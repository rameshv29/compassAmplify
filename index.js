var apiUrl = 'https://h31adg8ha9.execute-api.us-east-1.amazonaws.com/dev/';

$(document).ready(function() {
	$('#input-form').submit(function(event) {
		event.preventDefault();

		var serverip = $('#server-ip').val();
		var username = $('#login-name').val();
		var password = $('#password').val();
		var databases = $('#databases').val();
		var bucket = $('#bucket-name').val();

		var requestData = {
			serverip: serverip,
			username: username,
			password: password,
			databases: databases,
			bucket: bucket
		};

		$.ajax({
			url: apiUrl,
			method: 'POST',
			data: JSON.stringify(requestData),
			contentType: 'application/json',
			success: function(data) {
				console.log('Submit API response:', data);
				$('#check-status-button').prop('disabled', false);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error('Submit API error:', textStatus, errorThrown);
			}
		});
	});

	$('#check-status-button').click(function() {
		$.ajax({
			url: apiUrl + '/status',
			method: 'GET',
			success: function(data) {
				console.log('Check Status API response:', data);

				if (data.status === 'succeeded') {
					$('#download-button').prop('disabled', false);
					downloadFile(data.output1, data.output2);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error('Check Status API error:', textStatus, errorThrown);
			}
		});
	});

  function downloadFile(param1, param2) {
    $.ajax({
      url: apiUrl + '/download',
      method: 'POST',
      data: JSON.stringify({ param1: param1, param2: param2 }),
      contentType: 'application/json',
      success: function(data) {
        console.log('Download API response:', data);
        if (data.presignedUrl) {
          // Create a temporary anchor element to download the file
          var link = document.createElement('a');
          link.href = data.presignedUrl;
          link.download = data.fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error('Failed to generate presigned URL');
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Download API error:', textStatus, errorThrown);
      }
    });
  }

})
