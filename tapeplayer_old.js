// initialize client with app credentials
SC.initialize({
  client_id: '800cf2032a2259c47dc6f74094459eb3',
  redirect_uri: 'http://localhost/CassettePlayer/callback.html'
});

$(document).ready(function() 
{
	var USER = "super_c"
	var PLAYLIST = "what-a-cool-playlist"

	var all_tracks = "";
	var track_ids = [];

	var current_track_id = 0;
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
			track_ids[i] = playlist.tracks[i].id;
			console.log("FORLOOP-GET " + track_ids[i]);
		}

		$("#songlist").prepend(all_tracks);
	  	$(".cassette-label").html(playlist.title);

		console.log("READY " + track_ids[current_track_id]);
		SC.stream("/tracks/" + track_ids[current_track_id], function(sound)
		{
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

					if(!playing) sound.play();
					else if(playing) sound.resume();

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
								
					clickedStop = true;
					clickedPlay = false;

					sound.pause();

					playing = false;
				}
			});

			$("#nextimage").click(function()
			{
				sound.stop();
				current_track_id += 1;
			});

		});
	});
});