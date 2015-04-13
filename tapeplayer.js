// initialize client with app credentials
SC.initialize({
  client_id: '800cf2032a2259c47dc6f74094459eb3',
  redirect_uri: 'http://localhost/CassettePlayer/callback.html'
});

$(document).ready(function() 
{
	var USER = "asthmatickitty"
	var PLAYLIST = "sufjan-stevens-the-bqe"

	var all_tracks = "";					// string for displaying all the tracks in the playlist
	var all_track_count = 0;
	var track_uris = [];						// array holding all uri's of tracks

	var current_track_id = 0;				// keep count which track on the playlist we're on

	var clickedPlay = false;
	var clickedStop = true;
	var playing = false;

	var playButton = document.getElementById("playimage");
	var stopButton = document.getElementById("stopimage");

	var playRect = document.getElementById("playbtn");
	var stopRect = document.getElementById("stopbtn");

	var spool1 = document.getElementById("spool1");
	var spool2 = document.getElementById("spool2");

	spool1.style.webkitAnimationPlayState = 'paused';
	spool2.style.webkitAnimationPlayState = 'paused';

	SC.get("/users/"+USER+"/playlists/" + PLAYLIST, {limit: 900}, function(playlist)
	{
		for(var i = 0; i < playlist.track_count; i++)
		{
			all_tracks += "<li>" + playlist.tracks[i].title + "</li>";
			track_uris[i] = playlist.tracks[i].uri;
		}
		all_track_count = playlist.track_count;
		$("#songlist").prepend(all_tracks);
	  	$(".cassette-label").html(playlist.title);
	  	var current_song = track_uris[current_track_id] + "/stream?client_id=800cf2032a2259c47dc6f74094459eb3";
	    console.log("uri is: " + current_song);
	  	$("#audiostream").attr("src", current_song);
	    displayTrack(current_track_id);
	});

	function displayTrack(track_id)
	{
		$("#songlist li").css({"background-color":"inherit"});
		$("#songlist li:nth-child("+(track_id+1)+")").css({"background-color":"grey"});
	}

	$("#playimage").click(function()
	{
		if(!clickedPlay && clickedStop)
		{
			playRect.style.boxShadow = "#ffffff 0 3px 5px"; 
			playRect.style.backgroundColor = "#1A1A1A";
			
			this.style.opacity = "0.2";
			stopButton.style.opacity = "1";
			
			stopRect.style.boxShadow = "2px 1px 0px black, -1px 1px 0px black";
			stopRect.style.backgroundColor = "#2B2B2B";
						
			spool1.style.webkitAnimationPlayState = 'running';
			spool2.style.webkitAnimationPlayState = 'running';
						
			clickedPlay = true;
			clickedStop = false;

			if(!playing) $("#audiostream").trigger("play") ;
			else if(playing) $("#audiostream").trigger("resume");

			playing = true;
		}
	});

	$("#stopimage").click(function()
	{
		if(!clickedStop && clickedPlay)
		{
			stopRect.style.boxShadow = "#ffffff 0 3px 5px"; 
			stopRect.style.backgroundColor = "#1A1A1A";
						
			playButton.style.opacity = "1";
			stopButton.style.opacity = "0.2";
						
			playRect.style.boxShadow = "2px 1px 0px black, -1px 1px 0px black";
			playRect.style.backgroundColor = "#2B2B2B";
										
			spool1.style.webkitAnimationPlayState = 'paused';
			spool2.style.webkitAnimationPlayState = 'paused';
						
			clickedPlay = false;
			clickedStop = true;

			$("#audiostream").trigger("pause");

			playing = false;
		}
	});

	$("#nextimage").click(function()
	{
		if((current_track_id + 1) < all_track_count)
	  	{
	  		$(this).animate(
	  		{
	  			opacity: 0.2
	  		}, 50);

	  		$(this).animate(
	  		{
	  			opacity: 1
	  		}, 50);

			stopRect.style.boxShadow = "#ffffff 0 3px 5px"; 
			stopRect.style.backgroundColor = "#1A1A1A";
						
			playButton.style.opacity = "1";
			stopButton.style.opacity = "0.2";
						
			playRect.style.boxShadow = "2px 1px 0px black, -1px 1px 0px black";
			playRect.style.backgroundColor = "#2B2B2B";
										
			spool1.style.webkitAnimationPlayState = 'paused';
			spool2.style.webkitAnimationPlayState = 'paused';

			clickedPlay = false;
		  	clickedStop = true;

		  	playing = false;

			$("#audiostream").trigger("stop");
			current_track_id += 1;
			var current_song = track_uris[current_track_id] + "/stream?client_id=800cf2032a2259c47dc6f74094459eb3";
		    console.log("uri is: " + current_song);
		    displayTrack(current_track_id);
		  	$("#audiostream").attr("src", current_song);
	  	}
	});

	$("#previousimage").click(function()
	{
		if((current_track_id - 1) >= 0)
	  	{
	  		$(this).animate(
	  		{
	  			opacity: 0.2
	  		}, 50);

	  		$(this).animate(
	  		{
	  			opacity: 1
	  		}, 50);

			stopRect.style.boxShadow = "#ffffff 0 3px 5px"; 
			stopRect.style.backgroundColor = "#1A1A1A";
						
			playButton.style.opacity = "1";
			stopButton.style.opacity = "0.2";
						
			playRect.style.boxShadow = "2px 1px 0px black, -1px 1px 0px black";
			playRect.style.backgroundColor = "#2B2B2B";
										
			spool1.style.webkitAnimationPlayState = 'paused';
			spool2.style.webkitAnimationPlayState = 'paused';

			clickedPlay = false;
		  	clickedStop = true;

		  	playing = false;

			$("#audiostream").trigger("stop");
			current_track_id -= 1;
			var current_song = track_uris[current_track_id] + "/stream?client_id=800cf2032a2259c47dc6f74094459eb3";
		    console.log("uri is: " + current_song);
		    displayTrack(current_track_id);
		  	$("#audiostream").attr("src", current_song);
	  	}
	});
});
