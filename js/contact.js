//
// // Contact Form
// function validateForm() {
//   var name = document.forms["myForm"]["name"].value;
//   var email = document.forms["myForm"]["email"].value;
//   var subject = document.forms["myForm"]["subject"].value;
//   var comments = document.forms["myForm"]["comments"].value;
//   document.getElementById("error-msg").style.opacity = 0;
//   document.getElementById('error-msg').innerHTML = "";
//   if (name == "" || name == null) {
//     document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Name*</div>";
//     fadeIn();
//     return false;
//   }
//   if (email == "" || email == null) {
//     document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Email*</div>";
//     fadeIn();
//     return false;
//   }
//   if (subject == "" || subject == null) {
//     document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Subject*</div>";
//     fadeIn();
//     return false;
//   }
//   if (comments == "" || comments == null) {
//     document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Comments*</div>";
//     fadeIn();
//     return false;
//   }
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       document.getElementById("simple-msg").innerHTML = this.responseText;
//       document.forms["myForm"]["name"].value = "";
//       document.forms["myForm"]["email"].value = "";
//       document.forms["myForm"]["subject"].value = "";
//       document.forms["myForm"]["comments"].value = "";
//     }
//   };
//   xhttp.open("POST", "contactmail.php", true);
//   xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   xhttp.send("name=" + name + "&email=" + email + "&subject=" + subject + "&comments=" + comments);
//   return false;
// }
// function fadeIn() {
//   var fade = document.getElementById("error-msg");
//   var opacity = 0;
//   var intervalID = setInterval(function () {
//     if (opacity < 1) {
//       opacity = opacity + 0.5
//       fade.style.opacity = opacity;
//     } else {
//       clearInterval(intervalID);
//     }
//   }, 200);
// }






$(document).ready(function(){
	// Contact Form Submition
	function checkRequire(formId , targetResp){
		targetResp.html('');

		var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
		var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
		var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
		var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
		var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
		var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
		var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
		var check = 0;
		$('#er_msg').remove();
		var target = (typeof formId == 'object')? $(formId):$('#'+formId);
		target.find('input , textarea , select').each(function(){
			if($(this).hasClass('require')){
				if($(this).val().trim() == ''){
					check = 1;
					$(this).focus();
					targetResp.html('You missed out some fields.');
					$(this).addClass('error');
					return false;
				}else{
					$(this).removeClass('error');
				}
			}
			if($(this).val().trim() != ''){
				var valid = $(this).attr('data-valid');
				if(typeof valid != 'undefined'){
					if(!eval(valid).test($(this).val().trim())){
						$(this).addClass('error');
						$(this).focus();
						check = 1;
						targetResp.html($(this).attr('data-error'));
						return false;
					}else{
						$(this).removeClass('error');
					}
				}
			}
		});
		return check;
	}
	$(".submitForm").on("click", function() {
		console.log("jay")
		var _this = $(this);
		var targetForm = _this.closest('form');
		console.log(targetForm)
		var errroTarget = targetForm.find('.response');
		var check = checkRequire(targetForm , errroTarget);
		if(check == 0){
			Email.send({
				Host: "smtp.gmail.com",
				Username : "lcy06shukla@gmail.com",
				Password : "smdfwbeawhxcdhno",
				To : 'vikrantshukla011@gmail.com',
				From : "lcy06shukla@gmail.com",
				Subject : "portfolio support",
				Body : `
					Name: ${targetForm[0][0].value} \n,
					Email: ${targetForm[0][1].value} \n,
					Subject: ${targetForm[0][2].value} \n,
					Message: ${targetForm[0][3].value} \n
				`,
			})
			.then(function(message){
				alert(message,"mail sent successfully")
			});
		}
	});
});