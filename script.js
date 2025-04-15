// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app');
    
    // Screen elements
    const loginScreen = document.getElementById('login-screen');
    const homeScreen = document.getElementById('home-screen');
    const practiceScreen = document.getElementById('practice-screen');
    const questionScreen = document.getElementById('question-screen');
    const frameworksScreen = document.getElementById('frameworks-screen');
    const guesstimatesScreen = document.getElementById('guesstimates-screen');
    const guesstimateDetailScreen = document.getElementById('guesstimate-detail-screen');
    const profileScreen = document.getElementById('profile-screen');
    
    // UI Elements
    const signInButton = document.getElementById('sign-in-button');
    const featureCards = document.querySelectorAll('.feature-card');
    const backToQuestionsBtn = document.getElementById('back-to-questions');
    const backToGuesstimatesBtn = document.getElementById('back-to-guesstimates');
    const logoElements = document.querySelectorAll('.logo');
    const profileIcons = document.querySelectorAll('#profile-icon');
    
    // Question data
    const questions = {
        'market-entry': {
            title: 'Market Entry Strategy',
            difficulty: 'medium',
            description: 'A leading tech company is considering entering the smart home market. How would you evaluate this opportunity?'
        },
        'cost-reduction': {
            title: 'Cost Reduction Analysis',
            difficulty: 'hard',
            description: 'A manufacturing company is experiencing declining profits due to rising costs. Develop a framework to identify and prioritize cost reduction opportunities.'
        },
        'product-launch': {
            title: 'Product Launch Strategy',
            difficulty: 'medium',
            description: 'A consumer goods company is planning to launch a new eco-friendly product line. What factors should they consider and how should they approach this launch?'
        },
        'pricing-strategy': {
            title: 'Pricing Strategy',
            difficulty: 'easy',
            description: 'A software company is introducing a new SaaS product and needs to determine the optimal pricing structure. How would you approach this problem?'
        }
    };
    
    // Guesstimate data
    const guesstimates = {
        'pizza-nyc': {
            title: 'Pizza Slices in NYC',
            difficulty: 'medium',
            description: 'Estimate the number of pizza slices sold each day in New York City. Break down your approach and provide a step-by-step calculation.'
        },
        'golf-balls': {
            title: 'Golf Balls in America',
            difficulty: 'hard',
            description: 'How many golf balls are used in the United States annually? Provide your reasoning and calculation steps.'
        },
        'gas-stations': {
            title: 'Gas Stations in USA',
            difficulty: 'medium',
            description: 'Estimate the number of gas stations in the United States. Structure your answer with clear assumptions and calculations.'
        },
        'piano-tuners': {
            title: 'Piano Tuners in Chicago',
            difficulty: 'easy',
            description: 'How many piano tuners are there in Chicago? This is a classic estimation question. Show your work and reasoning.'
        },
        'coffee-consumption': {
            title: 'Coffee Cups Consumed Daily',
            difficulty: 'hard',
            description: 'Estimate the number of cups of coffee consumed daily worldwide. Break down your approach by regions if helpful.'
        },
        'smartphone-market': {
            title: 'Smartphone Market Size',
            difficulty: 'medium',
            description: 'What is the total market size (in units and revenue) for smartphones globally? Use a structured approach to build your estimate.'
        }
    };
    
    // Track current screen
    let currentScreen = null;
    let previousScreen = null;
    
    // Helper function to show a screen
    function showScreen(screen) {
        console.log('Showing screen:', screen.id);
        
        // Save previous screen for "back" navigation
        if (screen !== profileScreen) {
            previousScreen = currentScreen;
        }
        
        // Hide all screens
        [loginScreen, homeScreen, practiceScreen, questionScreen, 
         frameworksScreen, guesstimatesScreen, guesstimateDetailScreen,
         profileScreen].forEach(s => {
            if (s) s.classList.add('hidden');
        });
        
        // Show the requested screen
        screen.classList.remove('hidden');
        currentScreen = screen;
    }
    
    // Initialize to login screen
    showScreen(loginScreen);
    
    // Sign in button click
    if (signInButton) {
        signInButton.addEventListener('click', function() {
            console.log('Sign in button clicked');
            showScreen(homeScreen);
        });
    }
    
    // Logo clicks - navigate to home if logged in
    logoElements.forEach(logo => {
        logo.addEventListener('click', function() {
            console.log('Logo clicked');
            // Only navigate to home if we're not on the login screen
            if (currentScreen !== loginScreen) {
                showScreen(homeScreen);
            }
        });
    });
    
    // Profile icon clicks
    profileIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            console.log('Profile icon clicked');
            showScreen(profileScreen);
        });
    });
    
    // Feature card clicks
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h2').textContent.toLowerCase();
            console.log('Feature card clicked:', title);
            
            if (title.includes('case')) {
                showScreen(practiceScreen);
            } else if (title.includes('guesstimate')) {
                showScreen(guesstimatesScreen);
            } else if (title.includes('framework')) {
                showScreen(frameworksScreen);
            }
        });
    });
    
    // Question item clicks - Case Studies
    document.querySelectorAll('#practice-screen .question-item').forEach(item => {
        item.addEventListener('click', function() {
            const questionId = this.getAttribute('data-question');
            console.log('Case study question clicked:', questionId);
            
            if (questions[questionId]) {
                const question = questions[questionId];
                
                // Update question details
                document.getElementById('question-title').textContent = question.title;
                document.getElementById('question-description').textContent = question.description;
                
                // Update difficulty tag
                const difficultyTag = document.getElementById('question-difficulty');
                difficultyTag.className = 'difficulty-tag ' + question.difficulty;
                difficultyTag.textContent = question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1);
                
                // Clear textarea
                document.getElementById('answer-input').value = '';
                
                // Show question screen
                showScreen(questionScreen);
            }
        });
    });
    
    // Question item clicks - Guesstimates
    document.querySelectorAll('#guesstimates-screen .question-item').forEach(item => {
        item.addEventListener('click', function() {
            const guesstimateId = this.getAttribute('data-guesstimate');
            console.log('Guesstimate question clicked:', guesstimateId);
            
            if (guesstimates[guesstimateId]) {
                const guesstimate = guesstimates[guesstimateId];
                
                // Update guesstimate details
                document.getElementById('guesstimate-title').textContent = guesstimate.title;
                document.getElementById('guesstimate-description').textContent = guesstimate.description;
                
                // Update difficulty tag
                const difficultyTag = document.getElementById('guesstimate-difficulty');
                difficultyTag.className = 'difficulty-tag ' + guesstimate.difficulty;
                difficultyTag.textContent = guesstimate.difficulty.charAt(0).toUpperCase() + guesstimate.difficulty.slice(1);
                
                // Clear textarea
                document.getElementById('guesstimate-answer').value = '';
                
                // Show guesstimate detail screen
                showScreen(guesstimateDetailScreen);
            }
        });
    });
    
    // Back to questions button - Case Studies
    if (backToQuestionsBtn) {
        backToQuestionsBtn.addEventListener('click', function() {
            console.log('Back to questions clicked');
            showScreen(practiceScreen);
        });
    }
    
    // Back to guesstimates button
    if (backToGuesstimatesBtn) {
        backToGuesstimatesBtn.addEventListener('click', function() {
            console.log('Back to guesstimates clicked');
            showScreen(guesstimatesScreen);
        });
    }
}); 