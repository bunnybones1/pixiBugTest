var loadAndRunScripts = require('loadandrunscripts');

loadAndRunScripts([
	'bower_components/pixi.js/bin/pixi.dev.js'
], function() {
	var pixijsManagedView = require('pixijs-managed-view');
	var pixijsRenderManager = require('pixijs-render-manager');
	var view = new pixijsManagedView({
		canvasRenderer: true
	});
	var renderManager = pixijsRenderManager.add(view.renderer, view.stage);
	var main = new PIXI.DisplayObjectContainer();

	main.x = 100;
	main.y = 300;
	// main.rotation = Math.PI * .1;
	var text = new PIXI.Text("What's good?", {fill:"white"});
	main.addChild(text);
	var text2 = new PIXI.Text("How's things?", {font:'50px Arial', fill:"white"});
	text2.y = 40;
	main.addChild(text2);
	var image = new PIXI.Sprite.fromImage('assets/grumpycat.png');
	var image2 = new PIXI.Sprite.fromImage('assets/spiderweb.png');

	function compThatCat() {
		main.addChild(image);
		main.addChild(image2);

		var renderTexture = new PIXI.RenderTexture(main.width, main.height);
		renderTexture.render(main);
		var mainSprite = new PIXI.Sprite(renderTexture);
		mainSprite.pivot.x = mainSprite.width/2;
		mainSprite.rotation = -Math.PI/8;
		mainSprite.x = Math.round((window.innerWidth* 0.5) - 50);
		mainSprite.y = 100;
		view.stage.addChild(mainSprite);
	}

	console.log(image);
	function spiderWeb() {
		if(image2.texture.baseTexture.hasLoaded) {
			compThatCat();
		} else {
		    //you have to wait for it to load
		    image2.texture.on('update', function() {
				compThatCat();
		    });
		}
	}
	if(image.texture.baseTexture.hasLoaded) {
		spiderWeb();
	} else {
	    //you have to wait for it to load
	    image.texture.on('update', function() {
			spiderWeb();
	    });
	}
	// view.stage.addChild(main);
})