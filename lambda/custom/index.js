'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.6623f1be-0c61-408f-a21f-5f35d004d173';

const SKILL_NAME = 'Positive Reinforcement Quotes';
const GET_FACT_MESSAGE = "Here's your quote: ";
const HELP_MESSAGE = 'You can say tell me a quote, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================
const data = [
    'With the new day, comes new strength, and new thoughts',
    'Only I can change my life. No one can do it for me',
    'Life isn’t about getting and having, it’s about giving and being. by Kevin Kruse',
  'Whatever the mind of man can conceive and believe, it can achieve. by Napoleon Hill',
  'Strive not to be a success, but rather to be of value. by Albert Einstein',
  'Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference. by Robert Frost',
  'I attribute my success to this: I never gave or took any excuse. by Florence Nightingale',
  'You miss 100% of the shots you don’t take. by Wayne Gretzky',
  'I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed. by Michael Jordan',
  'The most difficult thing is the decision to act, the rest is merely tenacity. by Amelia Earhart',
  'Every strike brings me closer to the next home run. by Babe Ruth',
  'Definiteness of purpose is the starting point of all achievement. by W. Clement Stone',
  'We must balance conspicuous consumption with conscious capitalism. by Kevin Kruse',
  'Life is what happens to you while you’re busy making other plans. by John Lennon',
  'We become what we think about. by Earl Nightingale',
  '14.Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover. by Mark Twain',
  '15.Life is 10% what happens to me and 90% of how I react to it. by Charles Swindoll',
  'The most common way people give up their power is by thinking they don’t have any. by Alice Walker',
  'The mind is everything. What you think you become. by Buddha',
  'The best time to plant a tree was 20 years ago. The second best time is now. by Chinese Proverb',
  'An unexamined life is not worth living. by Socrates',
  'Eighty percent of success is showing up. by Woody Allen',
  'Your time is limited, so don’t waste it living someone else’s life. by Steve Jobs',
  'Winning isn’t everything, but wanting to win is. by Vince Lombardi',
  'I am not a product of my circumstances. I am a product of my decisions. by Stephen Covey',
  'Every child is an artist.  The problem is how to remain an artist once he grows up. by Pablo Picasso',
  'You can never cross the ocean until you have the courage to lose sight of the shore. by Christopher Columbus',
  'I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel. by Maya Angelou',
  'Either you run the day, or the day runs you. by Jim Rohn',
  'Whether you think you can or you think you can’t, you’re right. by Henry Ford',
  'The two most important days in your life are the day you are born and the day you find out why. by Mark Twain',
  'Whatever you can do, or dream you can, begin it.  Boldness has genius, power and magic in it. by Johann Wolfgang von Goethe',
  'The best revenge is massive success. by Frank Sinatra',
  'People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily. by Zig Ziglar',
  'Life shrinks or expands in proportion to one’s courage. by Anais Nin',
  'If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced. by Vincent Van Gogh',
  'There is only one way to avoid criticism: do nothing, say nothing, and be nothing. by Aristotle',
  'Ask and it will be given to you; search, and you will find; knock and the door will be opened for you. by Jesus',
  'The only person you are destined to become is the person you decide to be. by Ralph Waldo Emerson',
  'Go confidently in the direction of your dreams.  Live the life you have imagined. by Henry David Thoreau',
  'When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left and could say, I used everything you gave me. by Erma Bombeck',
  'Few things can help an individual more than to place responsibility on him, and to let him know that you trust him. by Booker T. Washington',
  'Certain things catch your eye, but pursue only those that capture the heart. by  Ancient Indian Proverb',
  'Believe you can and you’re halfway there. by Theodore Roosevelt',
  'Everything you’ve ever wanted is on the other side of fear. by George Addair',
  'We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light. by Plato',
  'Teach thy tongue to say, “I do not know,” and thous shalt progress. by Maimonides',
  'Start where you are. Use what you have.  Do what you can. by Arthur Ashe',
  'When I was 5 years old, my mother always told me that happiness was the key to life.  When I went to school, they asked me what I wanted to be when I grew up.  I wrote down ‘happy’.  They told me I didn’t understand the assignment, and I told them they didn’t understand life. by John Lennon',
  'Fall seven times and stand up eight. by Japanese Proverb',
  'When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us. by Helen Keller',
  'Everything has beauty, but not everyone can see. by Confucius',
  'How wonderful it is that nobody need wait a single moment before starting to improve the world. by Anne Frank',
  'When I let go of what I am, I become what I might be. by Lao Tzu',
  'Life is not measured by the number of breaths we take, but by the moments that take our breath away. by Maya Angelou',
  'Happiness is not something readymade.  It comes from your own actions. by Dalai Lama',
  'If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on. by Sheryl Sandberg',
  'First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end. by Aristotle',
  'If the wind will not serve, take to the oars. by Latin Proverb',
  'You can’t fall if you don’t climb.  But there’s no joy in living your whole life on the ground. by Unknown',
  'We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained. by Marie Curie',
  'Too many of us are not living our dreams because we are living our fears. by Les Brown',
  'Challenges are what make life interesting and overcoming them is what makes life meaningful. by Joshua J. Marine',
  'If you want to lift yourself up, lift up someone else. by Booker T. Washington',
  'I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do. by Leonardo da Vinci',
  'Limitations live only in our minds.  But if we use our imaginations, our possibilities become limitless. by Jamie Paolinetti',
  'You take your life in your own hands, and what happens? A terrible thing, no one to blame. by Erica Jong',
  'What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do. by Bob Dylan',
  'I didn’t fail the test. I just found 100 ways to do it wrong. by Benjamin Franklin',
  'In order to succeed, your desire for success should be greater than your fear of failure. by Bill Cosby',
  'A person who never made a mistake never tried anything new. by  Albert Einstein',
  'The person who says it cannot be done should not interrupt the person who is doing it. by Chinese Proverb',
  'There are no traffic jams along the extra mile. by Roger Staubach',
  'It is never too late to be what you might have been. by George Eliot',
  'You become what you believe. by Oprah Winfrey',
  'I would rather die of passion than of boredom. by Vincent van Gogh',
  'A truly rich man is one whose children run into his arms when his hands are empty. by Unknown',
  'It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings. by Ann Landers',
  'If you want your children to turn out well, spend twice as much time with them, and half as much money. by Abigail Van Buren',
  'Build your own dreams, or someone else will hire you to build theirs. by Farrah Gray',
  'The battles that count aren’t the ones for gold medals. The struggles within yourself–the invisible battles inside all of us–that’s where it’s at. by Jesse Owens',
  'Education costs money.  But then so does ignorance. by Sir Claus Moser',
  'I have learned over the years that when one’s mind is made up, this diminishes fear. by Rosa Parks',
  'It does not matter how slowly you go as long as you do not stop. by Confucius',
  'If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough. by Oprah Winfrey',
  'Remember that not getting what you want is sometimes a wonderful stroke of luck. by Dalai Lama',
  'You can’t use up creativity.  The more you use, the more you have. by Maya Angelou',
  'Dream big and dare to fail. by Norman Vaughan',
  'Our lives begin to end the day we become silent about things that matter. by Martin Luther King Jr.',
  'Do what you can, where you are, with what you have. by Teddy Roosevelt',
  'If you do what you’ve always done, you’ll get what you’ve always gotten. by Tony Robbins',
  'Dreaming, after all, is a form of planning. by Gloria Steinem',
  'It’s your place in the world; it’s your life. Go on and do all you can with it, and make it the life you want to live. by Mae Jemison',
  'You may be disappointed if you fail, but you are doomed if you don’t try. by Beverly Sills',
  'Remember no one can make you feel inferior without your consent. by Eleanor Roosevelt',
  'Life is what we make it, always has been, always will be. by Grandma Moses',
  'The question isn’t who is going to let me; it’s who is going to stop me. by Ayn Rand',
  'When everything seems to be going against you, remember that the airplane takes off against the wind, not with it. by Henry Ford',
  'It’s not the years in your life that count. It’s the life in your years. by Abraham Lincoln',
  'Change your thoughts and you change your world. by Norman Vincent Peale',
  'Either write something worth reading or do something worth writing. by Benjamin Franklin',
  'Nothing is impossible, the word itself says, “I’m possible!” by –Audrey Hepburn',
  'The only way to do great work is to love what you do. by Steve Jobs',
  'If you can dream it, you can achieve it. by Zig Ziglar',
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};