// create the theaterJS object
const theater = theaterJS();
// add the actors
theater
    .addActor("name", { speed: 0.25, accuracy: 0.6 })
    .addActor("tagline", { speed: 0.95, accuracy: 0.8 });
// give the actors their lines
theater
    .addScene("name:Jake Harvanchik", 500)
    .addScene("tagline:Student majoring in Computer Science | Front-end web developer");