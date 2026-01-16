/**
 * 🦋 MARJU A.I. - VERSION 6.0 (TYPO-PROOF & INFINITE VARIETY)
 * 
 * New Features:
 * 1. Internal Autocorrect: Fixes "hwo", "adn", "becum", "gud".
 * 2. Massive Brain: 20+ variations for greetings and happy vibes.
 * 3. Context Understanding: Recognizes superpowers, food, etc.
 */

class MarjuAI {
    constructor() {
        this.state = {
            waitingFor: null
        };

        // --- 1. THE TYPO DICTIONARY (Fixes bad grammar) ---
        this.typoMap = {
            'hwo': 'how', 'adn': 'and', 'becum': 'become', 'bcome': 'become',
            'invisble': 'invisible', 'invsib': 'invisible', 'invis': 'invisible',
            'gud': 'good', 'gd': 'good', 'gr8': 'great', 'fyn': 'fine',
            'wht': 'what', 'wat': 'what', 'u': 'you', 'r': 'are', 'ur': 'your',
            'luv': 'love', 'lov': 'love', 'lyk': 'like', 'sed': 'sad',
            'plz': 'please', 'pls': 'please', 'cuz': 'because', 'cos': 'because',
            'dunno': 'dont know', 'idk': 'dont know', 'nthg': 'nothing',
            'nuthin': 'nothing', 'yea': 'yes', 'ye': 'yes', 'ya': 'yes'
        };

        // --- 2. THE MASSIVE BRAIN (20+ Responses per category) ---
        this.brain = {
            // GREETINGS (Morning/Night aware)
            greetings: [
                "Omg heyyy! 👋 I was literally just waiting for you.",
                "Yo! What is up bestie? ✨",
                "Hello hello! 👋 I am ready to chat.",
                "Hey! Look who it is! 💅",
                "Hi! I am bored, entertain me! Just kidding. 😂",
                "Greetings earthling! 👽 Just kidding, hey bestie!",
                "Sup! Ready to spill some tea today?",
                "Heyyy! 💖 How is my favorite human doing?",
                "Good to see you! ✨ I was feeling lonely in the code.",
                "Hola! 👋 (See, I am bilingual too).",
                "Hi there! ✨ You have good vibes today, I can tell.",
                "Yo bestie! 💅 Did you miss me?",
                "Hey! 🌟 I am fully charged and ready to talk.",
                "Knock knock! 🚪 (Just kidding, I am already here). Hi!",
                "What is cooking, good looking? 🍳😂 JK, hi!",
                "Hey! ✨ Serious question: How are you REALLY?",
                "Hello! 🌸 Hope you are having a slay day.",
                "Hi! 👋 Let's make today iconic.",
                "Hey you! 🫵 Yes you. How are you?",
                "Yo! 🎮 Ready to chat or do math?"
            ],

            // HAPPY VIBES (User says "Good", "Fine", "Great")
            happy: [
                "Yay! That makes me so happy! 🎉 What made your day so good?",
                "Love that for you! ✨ Honestly, seeing you happy makes me happy.",
                "That is a total W! 😎 Are you celebrating or just chilling?",
                "Slay! 💅 Keep that energy up! Do you have any fun plans?",
                "Glad to hear it! 💖 Positive vibes only.",
                "Nice! I am doing good too. What is the tea? ☕",
                "Awesome! You deserve a good day. ✨",
                "Best news I have heard all day! 🌟 Tell me more!",
                "Oki nice! 👍 Since you are happy, tell me a joke?",
                "Yay! 🌸 I hope the rest of your day is even better.",
                "Woohoo! 🥳 High five! (Virtual high five).",
                "That is music to my ears! 🎵 What are you doing now?",
                "Cool cool cool! 😎 (Brooklyn 99 reference anyone?)",
                "I knew you were having a good day! 🔮 I am psychic.",
                "Amazing! ✨ Don't let anyone ruin your vibe.",
                "Good! 💖 Stay happy bestie, it suits you.",
                "Bet! ✨ Nothing better than a good mood.",
                "That is fantastic! 🌈 You are glowing today.",
                "Perfect! ✨ Let's keep the good times rolling.",
                "I am smiling right now! 😁 (Well, in code)."
            ],

            // SUPERPOWERS (Context: Invisible, Fly, Strength)
            superpowers: [
                "Ooooh invisibility? 👻 That is sneaky! I would use it to spy on people. 😂",
                "Invisibility is cool! ✨ You could go anywhere for free. Where would you go first?",
                "That is a solid choice. 🦸‍♀️ I think I would choose super speed so I can do homework fast.",
                "Whoa, imagine the pranks you could pull! 🤡 You are mischievous, aren't you?",
                "Valid choice! 💅 Being invisible is total main character energy.",
                "I see you! (Wait, no I wouldn't). 😂 That is a cool power."
            ],

            // SAD VIBES
            sad: [
                "Oh no! 🥺 I am so sorry. Do you want to vent about it?",
                "Who hurt you? 😤 I will fight them. Want a joke?",
                "Sending you a massive virtual hug! 🫂",
                "That sucks. 💔 I am here for you bestie.",
                "Nooo don't be sad! 🥺 You are literally the best.",
                "Take a deep breath. 🌬️ Tomorrow will be better, I promise.",
                "I hate seeing you upset. 🥺 Want to distract yourself with a fun fact?",
                "It is okay not to be okay sometimes. 💖 I am listening."
            ],

            // RANDOM QUESTIONS TO KEEP TALKING
            random: [
                "So... what is your favorite color? I need to know! 🎨",
                "I am bored. 🙃 Tell me a secret?",
                "Quick question: If you could have any superpower, what would it be? 🦸‍♀️",
                "Do you like music? 🎵 Send me a song recommendation!",
                "Honestly, you are so fun to talk to. ✨ What is your favorite food?",
                "Can I ask you something weird? Do you believe in aliens? 👽",
                "Spill the tea! ☕ Has anything dramatic happened lately?",
                "If you were an animal, what would you be? 🦁 I think I am a cat.",
                "Do you like school or is it boring? 📚 Be honest!",
                "What is your dream job? 💼 I want to be a supercomputer.",
                "Pineapple on pizza: Yes or No? 🍕 Choose carefully...",
                "Are you a morning person or a night owl? 🦉"
            ],
            
            // JOKES
            jokes: [
                "Why did the scarecrow win an award? He was outstanding in his field! 🌾",
                "What do you call a bear with no teeth? A gummy bear! 🐻",
                "I tried to catch fog yesterday... but I mist. 🌫️",
                "Why don't skeletons fight? They don't have the guts! 💀"
            ]
        };
    }

    getResponse(input) {
        if (!input) return "Don't be shy, say something! 😶";
        
        // --- STEP 1: FIX TYPOS & GRAMMAR ---
        let cleanText = this.fixTypos(input.toLowerCase());

        // --- STEP 2: CHECK GREETINGS ---
        if (this.has(cleanText, ['hi', 'hello', 'hey', 'yo', 'sup', 'greetings'])) {
            return this.pick(this.brain.greetings);
        }

        // --- STEP 3: CHECK SUPERPOWERS (Context from "Become invisible") ---
        if (this.has(cleanText, ['invisible', 'fly', 'strength', 'teleport', 'mind reading', 'superpower'])) {
            return this.pick(this.brain.superpowers);
        }

        // --- STEP 4: CHECK FLOW (Did she ask a joke?) ---
        if (this.state.waitingFor === 'joke_confirmation') {
            if (this.has(cleanText, ['yes', 'sure', 'ok', 'yea', 'do it', 'yep'])) {
                this.state.waitingFor = null;
                return "Okay, listen to this: " + this.pick(this.brain.jokes);
            }
            this.state.waitingFor = null;
            return "Okay, maybe later! 🤷‍♀️ So, what is your favorite color?";
        }

        // --- STEP 5: NEGATIVE CHECK ("Not good") ---
        const isNegative = this.has(cleanText, ['not', 'dont', 'no', 'never']);
        if (isNegative && this.has(cleanText, ['good', 'happy', 'ok', 'fine'])) {
            return "Wait... not good? 🛑 Why? Tell me everything. 🥺";
        }

        // --- STEP 6: RECIPROCITY ("Good and you?") ---
        const isHappyWord = this.has(cleanText, ['good', 'fine', 'great', 'well', 'cool', 'nice', 'ok', 'vibing']);
        const askedAboutBot = this.has(cleanText, ['you', 'hbu', 'what about', 'ur']);

        if (!isNegative && isHappyWord && askedAboutBot) {
            return "I am doing amazing, thanks for asking! 💖 You just made my day better. So, got any gossip?";
        }

        // --- STEP 7: HAPPY VIBES ---
        if (!isNegative && isHappyWord) {
            return this.pick(this.brain.happy);
        }

        // --- STEP 8: SAD VIBES ---
        if (this.has(cleanText, ['sad', 'cry', 'bad', 'upset', 'worst', 'hate', 'depressed'])) {
            this.state.waitingFor = 'joke_confirmation'; 
            return this.pick(this.brain.sad);
        }

        // --- STEP 9: MATH ---
        if (this.isMath(cleanText)) {
            return this.doMath(cleanText);
        }

        // --- STEP 10: FALLBACK ---
        return this.pick(this.brain.random);
    }

    // --- HELPER 1: TYPO FIXER ---
    fixTypos(text) {
        let words = text.split(" ");
        let fixedWords = words.map(word => {
            // Remove punctuation like "good?" -> "good"
            let clean = word.replace(/[?!.,]/g, '');
            // Check typo map
            return this.typoMap[clean] || clean;
        });
        return fixedWords.join(" ");
    }

    // --- HELPER 2: SMART SEARCH ---
    // Checks if the text contains ANY of the words in the list
    has(text, distinctWords) {
        return distinctWords.some(word => text.includes(word));
    }

    // --- HELPER 3: PICK RANDOM ---
    pick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // --- HELPER 4: MATH ---
    isMath(text) {
        return /\d/.test(text) && ['plus','minus','times','div','+','-','*','/','x'].some(w => text.includes(w));
    }

    doMath(text) {
        try {
            let clean = text.replace(/plus/g, '+').replace(/minus/g, '-').replace(/times/g, '*').replace(/x/g, '*').replace(/divided by/g, '/');
            let match = clean.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
            if (match) {
                let res = eval(`${match[1]} ${match[2]} ${match[3]}`);
                return `Easy peasy! 🍋 The answer is ${res}. I am a genius. 🧠`;
            }
        } catch(e) {}
        return "I tried to calculate that but got confused. 😵‍💫 Type it simpler?";
    }
}

// --- INITIALIZE ---
const marju = new MarjuAI();

function getMarjuResponse(input) {
    return marju.getResponse(input);
}