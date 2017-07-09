/*@Author Nicolas Andreas Tamm Garetto ; Artuk Kakhorov */

var priceTable = $("#sumSheet")[0];
var currentStage = 1;
var priceUpdateType = 0;
var sizePrice = 0.00;
var doughPrice = 0.00;
var saucePrice = 0.00;
var toppingsPrice = 0.00;

$( document ).ready(function() {
    pizzaSize();
	doughType();
	sauceType();
});
function pizzaSize()
{
	var wantedSize = $(".sizeRadio:checked").val();

	switch(wantedSize)
	{
		case "small":
			$("#sizePreviewIm").animate({height: '100px' , width: '100px',marginTop: '-50px',marginLeft:'-50px'});
			priceUpdateType = 1;
			priceUpdate();
			break;
		case "medium":
			$("#sizePreviewIm").animate({height: '150px' , width: '150px',marginTop: '-75px',marginLeft:'-75px'});
			priceUpdateType = 2;
			priceUpdate();
			break;
		case "large":
			$("#sizePreviewIm").animate({height: '200px' , width: '200px',marginTop: '-100px',marginLeft:'-100px'});
			priceUpdateType = 3;
			priceUpdate();
			break;
	}
	return;
}
function doughType()
{
	var wantedDough = $(".doughRadio:checked").val();
	var displayedDough = $("#doughPreviewIm").attr("src");
	if(wantedDough === "normal")
	{
		if(displayedDough === "wheatDough.png")
		{
			return;
		}
		else
		$("#doughPreviewIm").fadeOut(400 ,
		function()
		{
			$("#doughPreviewIm").attr("src" , "images/wheatDough.png");
			$("#doughPreviewIm").fadeIn();
			priceUpdateType = 4;
			priceUpdate();
		});
	}
	else
	{
		if(displayedDough === "speltDough.png")
		{
			return;
		}
		else
		{
			$("#doughPreviewIm").fadeOut(400 ,
			function()
			{
				$("#doughPreviewIm").attr("src" , "images/speltDough.png");
				$("#doughPreviewIm").fadeIn();
				priceUpdateType = 5;
				priceUpdate();
			});
		}
	}
	return;
	
}
function sauceType()
{
	var wantedSauce = $(".sauceRadio:checked").val();
	var displayedSauce = $("#saucePreviewIm").attr("src");
	var basilSauce = "basilBottle.png";
	var garlicSauce = "garlicSauce.png";
	var spicySauce = "spicySauce.png";
	switch(wantedSauce)
	{
		case"basil":
			if(displayedSauce === basilSauce)
			{break;}
			else
			{
				$("#saucePreviewIm").fadeOut(400 , 
				function()
				{
					$("#saucePreviewIm").attr("src" , "images/basilBottle.png");
					$("#saucePreviewIm").fadeIn();
					priceUpdateType = 6;
					priceUpdate();
				});
			}
			break;
		case"garlic":
			if(displayedSauce === garlicSauce)
			{break;}
			$("#saucePreviewIm").fadeOut(400 , 
				function()
				{
					$("#saucePreviewIm").attr("src" , "images/garlicSauce.png");
					$("#saucePreviewIm").fadeIn();
					priceUpdateType = 6;
					priceUpdate();
				});
			break;
		case"spicy":
			if(displayedSauce === spicySauce)
			{break;}
			$("#saucePreviewIm").fadeOut(400 , 
				function()
				{
					$("#saucePreviewIm").attr("src" , "images/spicySauce.png");
					$("#saucePreviewIm").fadeIn();
					priceUpdateType = 7;
					priceUpdate();
				});
			break;
	}
	return;
}
function checkStage()
{	
	nextButton();
	return;
}
function nextButton()
{
	currentStage++;
	switch(currentStage)
	{
		case 2:
			$("#basics").hide();
			$("#basicsWizard").attr('class' , 'wizardNodeSuccess');
			$("#toppings").show();
			$(".selectedToppings").show();
			$("#toppingsWizard").attr('class' , 'wizardNodeActive');
			$("#previous").show();
			updateBasicOverview();
			break;
		case 3:
			$("#toppings").hide();
			$("#toppingsWizard").attr('class' , 'wizardNodeSuccess');
			$("#overview").show();
			checkInhalt();
			checkDaten();
			$("#overviewWizard").attr('class' , 'wizardNodeActive');
			break;
		case 4:
			$("#overviewWizard").attr('class' , 'wizardNodeActive');
			checkInhalt();
			var check = $("#overviewWizard").attr('class');
			if(check==='wizardNodeError'){
				currentStage--;
				break;
			}
			$('.auto').animate({
				left: '90%',
				},294000);
			$('.auto').animate({
				top: '60px',
				left: '110%'
				},1000);
			$('.auto').animate({
				left: '130%',
				},1000);
			$('.auto').animate({
				top: '-140px',
				left: '130%'
				},1000);
			$('.auto').animate({
				top: '-40px',
				left: '110%'
				},1000);
			zeit();
			$(".selectedToppings").hide();
			$("#overview").hide();
			$("#overviewWizard").attr('class' , 'wizardNodeSuccess');
			$("#next").hide();
			$("#feedback").show();
			$("#feedbackWizard").attr('class' , 'wizardNodeActive');
			$("#previous").text("Another one!");
			break;		
	}
	return;
}
function previousButton()
{
	currentStage--;

	switch(currentStage)
	{
		case 1:
			$("#basics").show();
			$("#basicsWizard").attr('class' , 'wizardNodeActive');
			$("#toppings").hide();
			$(".selectedToppings").hide();
			$("#toppingsWizard").attr('class' , 'wizardNodeInactive');
			$("#previous").hide();
			break;
		case 2:
			$("#toppings").show();
			$(".selectedToppings").show();
			$("#toppingsWizard").attr('class' , 'wizardNodeActive');
			$("#overview").hide();
			$("#overviewWizard").attr('class' , 'wizardNodeInactive');
			break;
		case 3:
			$("#basics").show();
			$("#feedback").hide();
			$("#next").show();
			$("#previous").text("Previous");
			$("#previous").hide();
			$("#basicsWizard").attr('class' , 'wizardNodeActive');
			$("#toppingsWizard").attr('class' , 'wizardNodeInactive');
			$("#overviewWizard").attr('class' , 'wizardNodeInactive');
			$("#feedbackWizard").attr('class' , 'wizardNodeInactive');
			currentStage = 1;
			break;
	}
	return;
}
function priceUpdate()
{
	switch(priceUpdateType)
	{
		case 1:
		$(priceTable.rows[0].cells[1]).html("2.50");
		sizePrice = 2.50;
			break;
		case 2:
		$(priceTable.rows[0].cells[1]).html("3.50");
		sizePrice = 3.50;
			break;
		case 3:
		$(priceTable.rows[0].cells[1]).html("4.00");
		sizePrice = 4.00;
			break;
		case 4:
		$(priceTable.rows[1].cells[1]).html("0.00");
		doughPrice = 0.00;
			break;
		case 5:
		$(priceTable.rows[1].cells[1]).html("0.50");
		doughPrice = 0.50;
			break;
		case 6:
		$(priceTable.rows[2].cells[1]).html("0.00");
		saucePrice = 0.00;
			break;
		case 7:
		$(priceTable.rows[2].cells[1]).html("0.50");
		saucePrice = 0.50;
			break;
		case 8:
			break;
	}
	var totalPrice = sizePrice + doughPrice + saucePrice + toppingsPrice;
	var formattedTotalPrice = totalPrice.toFixed(2);
	$(priceTable.rows[4].cells[1]).html(formattedTotalPrice);
	return;
}
function addTopping(toppingId)
{
	switch(toppingId)
	{
		case "1":
		$("#tomatoIm").parent().parent().css('background-color' , '#cbe7ca');
		$("#selected1").attr('src' , 'images/tomatoOk.png');
		$("#selected1").css('opacity' , '1.0');
		toppingsPrice += 0.50;
		break;
		case "2":
		$("#mushroomIm").parent().parent().css('background-color' , '#cbe7ca');
		$("#selected2").attr('src' , 'images/mushroomOk.png');
		$("#selected2").css('opacity' , '1.0');
		toppingsPrice += 0.50;
		break;
		case "3":
		$("#ananasIm").parent().parent().css('background-color' , '#cbe7ca');
		$("#selected3").attr('src' , 'images/ananasOk.png');
		$("#selected3").css('opacity' , '1.0');
		toppingsPrice += 1.00;
		break;
		case "4":
		$("#sharkIm").parent().parent().css('background-color' , '#cbe7ca');
		$("#selected4").attr('src' , 'images/sharkOk.png');
		$("#selected4").css('opacity' , '1.0');
		toppingsPrice += 11.37;
		break;
		case "5":
		$("#goldIm").parent().parent().css('background-color' , '#cbe7ca');
		$("#selected5").attr('src' , 'images/goldOk.png');
		$("#selected5").css('opacity' , '1.0');
		toppingsPrice += 0.05;
		break;
		case "6":
		$("#salamiIm").parent().parent().css('background-color' , '#cbe7ca');
		$("#selected6").attr('src' , 'images/salamiOk.png');
		$("#selected6").css('opacity' , '1.0');
		toppingsPrice += 0.50;
		break;
		case "7":
		$("#torIm").parent().parent().css('background-color' , '#cbe7ca');
		$("#selected7").attr('src' , 'images/torOk.png');
		$("#selected7").css('opacity' , '1.0');
		break;
		case "8":
		$("#soulsIm").parent().parent().css('background-color' , '#cbe7ca');
		$("#selected8").attr('src' , 'images/soulsOk.png');
		$("#selected8").css('opacity' , '1.0');
		toppingsPrice += 0.75;
		break;
		case "9":
		$("#cheeseIm").parent().parent().css('background-color' , '#cbe7ca');
		$("#selected9").attr('src' , 'images/cheeseOk.png');
		$("#selected9").css('opacity' , '1.0');
		toppingsPrice += 0.50;
		break;
	}
		$("#add" + toppingId).hide();
		$("#remove" + toppingId).show();
		var formattedToppingsPrice = toppingsPrice.toFixed(2);
		$(priceTable.rows[3].cells[1]).html(formattedToppingsPrice);
		priceUpdateType = 8;
		priceUpdate();
	return;
}
function removeTopping(toppingId)
{
	switch(toppingId)
	{
		case "1":
		$("#selected1").attr('src' , 'images/tomato.png');
		$("#selected1").css('opacity' , '0.1');
		$("#tomatoIm").parent().parent().css('background-color' , '#f5f5dc');
		toppingsPrice -= 0.50;
		break;
		case "2":
		$("#selected2").attr('src' , 'images/mushroom.png');
		$("#selected2").css('opacity' , '0.1');
		$("#mushroomIm").parent().parent().css('background-color' , '#f5f5dc');
		toppingsPrice -= 0.50;
		break;
		case "3":
		$("#selected3").attr('src' , 'images/ananas.png');
		$("#selected3").css('opacity' , '0.1');
		$("#ananasIm").parent().parent().css('background-color' , '#f5f5dc');
		toppingsPrice -= 1.00;
		break;
		case "4":
		$("#selected4").attr('src' , 'images/shark.png');
		$("#selected4").css('opacity' , '0.1');
		$("#sharkIm").parent().parent().css('background-color' , '#f5f5dc');
		toppingsPrice -= 11.37;
		break;
		case "5":
		$("#selected5").attr('src' , 'images/gold.png');
		$("#selected5").css('opacity' , '0.1');
		$("#goldIm").parent().parent().css('background-color' , '#f5f5dc');
		toppingsPrice -= 0.05;
		break;
		case "6":
		$("#selected6").attr('src' , 'images/salami.png');
		$("#selected6").css('opacity' , '0.1');
		$("#salamiIm").parent().parent().css('background-color' , '#f5f5dc');
		toppingsPrice -= 0.50;
		break;
		case "7":
		$("#selected7").attr('src' , 'images/tor.png');
		$("#selected7").css('opacity' , '0.1');
		$("#torIm").parent().parent().css('background-color' , '#f5f5dc');
		break;
		case "8":
		$("#selected8").attr('src' , 'images/souls.png');
		$("#selected8").css('opacity' , '0.1');
		$("#soulsIm").parent().parent().css('background-color' , '#F5F5DC');
		toppingsPrice -= 0.75;
		break;
		case "9":
		$("#selected9").attr('src' , 'images/cheese.png');
		$("#selected9").css('opacity' , '0.1');
		$("#cheeseIm").parent().parent().css('background-color' , '#F5F5DC');
		toppingsPrice -= 0.50;
		break;
	}
		$("#add" + toppingId).show();
		$("#remove" + toppingId).hide();
		var formattedToppingsPrice = toppingsPrice.toFixed(2);
		$(priceTable.rows[3].cells[1]).html(formattedToppingsPrice);
		priceUpdateType = 8;
		priceUpdate();
	return;
}
function zeigalles() 
{
	$('#Datenumgebung').find('input, textarea, button, select').removeAttr('disabled');
	$("#Datenumgebung").css('opacity' , '1.0');
}

function disalles()
{
	$('#Datenumgebung').find('input, textarea, button, select').attr('disabled','disabled');
	$("#Datenumgebung").css('opacity' , '0.5');
}

function checkDaten()
{
	var daten = $('.DatenRadio:checked').val();
	if(daten === "neueDaten")
		zeigalles();
	else
		disalles();
}
function checkInhalt() {
	var daten = $('.DatenRadio:checked').val();
		if(daten === "neueDaten") {
			if((document.getElementById("std").value === "" || document.getElementById("plz").value === "" || document.getElementById("str").value === "" || document.getElementById("strn").value === "")){
				$("#overviewWizard").attr('class' , 'wizardNodeError');
			}
		}
}

function pizzaDa() 
{
	 $('#myModal').modal('show'); 
}

function zeit() {
	var countDownDate = new Date();
	countDownDate.setMinutes(countDownDate.getMinutes() + 5); 	
	var x = setInterval(function() 
	{
		var now = new Date().getTime();
		var distance = countDownDate - now;
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		document.getElementById("demo1").innerHTML = days + "d " + hours +
		"h " + minutes + "m " + seconds + "s "; 
		if (distance < 0) 
		{
	    	clearInterval(x);
	    	document.getElementById("demo1").innerHTML = "EXPIRED";
			pizzaDa();
		}
	}, 1);
}
function updateBasicOverview ()
{
	var wantedSize = $(".sizeRadio:checked").val();
	var wantedDough = $(".doughRadio:checked").val();
	var wantedSauce = $(".sauceRadio:checked").val();
	$("#basicsOverview").html("Your ordered a " + wantedSize + " pizza, with a " + wantedDough + " dough and " + wantedSauce + " sauce. Check the box 'Selected Toppings' for an overview of those. ")
}
