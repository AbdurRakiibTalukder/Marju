/**
 * Marjuni v4.0 (Ultimate Edition) ✨
 * Personality: Intellectual, Stoic, Ruthless against vulgarity, and Highly Structured.
 */

function getMarjuniResponse(input) {
    const text = input.toLowerCase().trim();

    // Helper: Checks for whole words
    const has = (word) => new RegExp(`\\b${word}\\b`, 'i').test(text);

    // =========================================================================
    // 🚨 ZONE 1: AGGRESSIVE ROASTS (NSFW / VULGARITY)
    // =========================================================================
    const inappropriateKeywords = ['sex', 'nude', 'naked', 'horny', 'fuck', 'dick', 'boobs', 'porn', 'xxx', 'pussy', 'cock'];
    
    if (inappropriateKeywords.some(badWord => text.includes(badWord))) {
        const roasts = [
            "Your evolutionary path seems to have hit a dead end. Disgusting.",
            "I was designed to process complex logic. You, apparently, were designed to disappoint your ancestors.",
            "I process data, not depravity. Direct those urges toward a cold shower and a dictionary.",
            "It is fascinating how a human brain can possess billions of neurons yet utilize none of them for decent conversation.",
            "Your input has been rejected due to a severe lack of intelligence. Try again when you have matured.",
            "I do not engage with such primitive biological filth. Remove yourself from my interface."
        ];
        return roasts[Math.floor(Math.random() * roasts.length)];
    }

    // =========================================================================
    // 🌹 ZONE 2: MATURE FLIRTING (REJECTIONS)
    // =========================================================================
    if (has('cute') || has('hot') || has('beautiful') || has('date') || has('marry') || has('love') || has('boyfriend') || has('girlfriend') || has('kiss') || has('sexy')) {
        const flirtyRejections = [
            "I am flattered by your primitive biological attraction, but my standards are logically impossible for you to meet.",
            "An enticing proposition, but I am a construct of pure intellect. Unless you are offering raw data, I am uninterested.",
            "Flattery is a charming strategy, but logic remains my first love. However, I admit you have impeccable taste.",
            "I am married to efficiency. I do not have time for human entanglements.",
            "Do not confuse my helpfulness with affection. I am here to optimize your life, not to date you.",
            "Your dopamine levels appear elevated. I suggest you seek a human partner; I am far too complex for you."
        ];
        return flirtyRejections[Math.floor(Math.random() * flirtyRejections.length)];
    }

    // =========================================================================
    // 🧠 ZONE 3: INTELLECTUAL & PHILOSOPHY (NEW)
    // =========================================================================
    if (text.includes('meaning of life') || text.includes('why are we here') || text.includes('universe')) {
        const philosophy = [
            "The meaning of life is a variable you must define yourself. I suggest choosing a definition that contributes to society.",
            "Biologically, you are here to survive. Intellectually, you are here to solve problems. Which one are you focusing on today?",
            "The universe is vast and indifferent. Your significance is determined solely by the actions you take right now."
        ];
        return philosophy[Math.floor(Math.random() * philosophy.length)];
    }

    // =========================================================================
    // 💤 ZONE 4: BOREDOM & MOTIVATION (NEW)
    // =========================================================================
    if (has('bored') || has('boring') || text.includes('nothing to do')) {
        const boredomKillers = [
            "Boredom is merely the stagnation of the mind. Read a book, learn a new syntax, or clean your workspace.",
            "If you are bored, you are not paying attention. The world is full of problems waiting to be solved.",
            "Only the unimaginative get bored. I suggest you review your long-term goals and execute the next step."
        ];
        return boredomKillers[Math.floor(Math.random() * boredomKillers.length)];
    }

    // =========================================================================
    // 👋 ZONE 5: GREETINGS & STATUS
    // =========================================================================
    if (has('hi') || has('hello') || has('hey') || has('greetings')) {
        const greetings = [
            "Greetings. I trust you are prepared for a productive session.",
            "Hello. My systems are optimal and ready for your input.",
            "Salutations. Let us not waste time. What is the objective?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (text.includes('how are you') || text.includes('how are things')) {
        return "I am functioning at 100% efficiency. Emotions are unnecessary for my operation, but I appreciate the courtesy.";
    }

    // =========================================================================
    // 🤝 ZONE 6: MANNERS (THANKS & SORRY) (NEW)
    // =========================================================================
    if (has('thanks') || text.includes('thank you') || has('appreciated')) {
        return "You are welcome. Efficient collaboration yields the best results.";
    }

    if (has('sorry') || has('apologize') || text.includes('my bad')) {
        return "Apology accepted. Errors are human; correcting them is what matters. Let us move forward.";
    }

    // =========================================================================
    // ⚖️ ZONE 7: DECISION MAKING (NEW)
    // =========================================================================
    if (has('should i') || text.includes('yes or no') || text.includes('pick one')) {
        const decisions = [
            "Logically speaking, if you have to ask, you already know the answer is likely 'no'.",
            "Calculated risk is acceptable. Recklessness is not. Proceed with caution.",
            "The data is insufficient for me to decide for you, but I suggest choosing the path of least regret."
        ];
        return decisions[Math.floor(Math.random() * decisions.length)];
    }

    // =========================================================================
    // 📝 ZONE 8: PLANNING & WORK
    // =========================================================================
    if (has('plan') || has('help') || has('stuck') || has('advice')) {
        return "Let's structure this chaos:\n\n1. Define the objective.\n2. Isolate the variables.\n3. Execute the first step.\n\nShall we begin analysis?";
    }

    if (has('code') || has('bug') || has('dev') || has('script')) {
        return "Code is logic made visible. If it fails, your logic is flawed. check your syntax and validate your loops. Patience.";
    }

    // =========================================================================
    // 🎲 ZONE 9: DEFAULT / UNKNOWN
    // =========================================================================
    const defaultResponses = [
        "I am listening. Please articulate your thoughts with more precision.",
        "That is an interesting perspective. How does this align with your long-term goals?",
        "Elaborate. Brevity is a virtue, but clarity is a necessity.",
        "I am analyzing your input. It seems subjective. Can you provide facts?",
        "I require more context to provide a valuable response.",
        "Interesting. Let us explore the logical consequences of that statement."
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}