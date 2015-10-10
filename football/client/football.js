// Session.setDefault('counter', 0);

// Template.hello.helpers({
//   counter: function () {
//     return Session.get('counter');
//   }
// });

// Template.hello.events({
//   'click button': function () {
//     // increment the counter when button is clicked
//     Session.set('counter', Session.get('counter') + 1);
//   }
// });

//Games = new Mongo.Collection("games");

if (!Meteor.isClient) {
} else {
    // This code only runs on the client

    Template.gamesList.helpers({
        games: function () {
            // Show newest tasks at the top
            return Games.find({}, {sort: {createdAt: -1}});
        }
    });

    Template.body.events({
        "submit .new-game": function (event) {

            // Prevent default browser form submit
            event.preventDefault();

            // Get value from form element
            var text = event.target.text.value;

            // Insert a game into the collection

            Games.insert({
                text: text,
                createdAt: new Date() // current time
            });

            // Clear form
            event.target.text.value = "";
        },

        "click .delete": function () {
            Games.remove(this._id);
        }
    });
}