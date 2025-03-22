document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const nav = document.querySelector('nav ul');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Verification functionality
    const verifyBtn = document.getElementById('verify-btn');
    const verificationResult = document.getElementById('verification-result');
    
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function() {
            const claim = document.querySelector('.verify-form textarea').value;
            const source = document.querySelector('.verify-source select').value;
            
            if (!claim) {
                alert('Please enter a health claim to verify');
                return;
            }
            
            // Simulate verification process
            verificationResult.innerHTML = `
                <div class="verification-status">
                    <i class="fas fa-spinner fa-spin"></i>
                    <span>Analyzing claim...</span>
                </div>
            `;
            
            // Simulate API response delay
            setTimeout(function() {
                const randomResult = Math.random();
                let resultHTML = '';
                
                if (randomResult < 0.3) {
                    // True claim
                    resultHTML = `
                        <div class="verification-status true">
                            <i class="fas fa-check-circle"></i>
                            <span>Verified as TRUE</span>
                        </div>
                        <div class="verification-details">
                            <h3>Analysis:</h3>
                            <p>This claim is supported by scientific evidence. Here's what the research shows:</p>
                            <ul>
                                <li>Multiple peer-reviewed studies confirm this information</li>
                                <li>Recommended by medical associations</li>
                                <li>Consistent with current medical guidelines</li>
                            </ul>
                            <div class="verification-sources">
                                <h4>Sources:</h4>
                                <p>World Health Organization, National Institutes of Health, and local health authority guidelines</p>
                            </div>
                        </div>
                    `;
                } else if (randomResult < 0.7) {
                    // False claim
                    resultHTML = `
                        <div class="verification-status false">
                            <i class="fas fa-times-circle"></i>
                            <span>Verified as FALSE</span>
                        </div>
                        <div class="verification-details">
                            <h3>Analysis:</h3>
                            <p>This claim is not supported by scientific evidence. Here's what you should know:</p>
                            <ul>
                                <li>Studies have disproven this claim</li>
                                <li>It contradicts established medical knowledge</li>
                                <li>May be potentially harmful if followed</li>
                            </ul>
                            <div class="verification-sources">
                                <h4>Sources:</h4>
                                <p>World Health Organization, National Institutes of Health, and local health authority guidelines</p>
                            </div>
                            <div class="correct-info">
                                <h4>What is correct:</h4>
                                <p>Instead of this claim, medical professionals recommend...</p>
                            </div>
                        </div>
                    `;
                } else {
                    // Partially true claim
                    resultHTML = `
                        <div class="verification-status partial">
                            <i class="fas fa-exclamation-circle"></i>
                            <span>PARTIALLY TRUE</span>
                        </div>
                        <div class="verification-details">
                            <h3>Analysis:</h3>
                            <p>This claim contains some truth but is misleading or incomplete. Here's what you should know:</p>
                            <ul>
                                <li>The claim has some basis in fact but exaggerates benefits</li>
                                <li>It oversimplifies a complex health issue</li>
                                <li>Important context or warnings are missing</li>
                            </ul>
                            <div class="verification-sources">
                                <h4>Sources:</h4>
                                <p>World Health Organization, National Institutes of Health, and local health authority guidelines</p>
                            </div>
                            <div class="correct-info">
                                <h4>What is correct:</h4>
                                <p>A more accurate understanding would be...</p>
                            </div>
                        </div>
                    `;
                }
                
                verificationResult.innerHTML = resultHTML;
            }, 2000);
        });
    }
    
    // Age group filtering for alerts
    const ageGroupInputs = document.querySelectorAll('[name="age-group"]');
    const ageConcernsList = document.getElementById('age-concerns-list');
    const alertsContainer = document.getElementById('alerts-container');
    
    // Define age-specific health concerns
    const ageConcerns = {
        'all': ['General health', 'Preventive care', 'Nutrition', 'Exercise'],
        'infant': ['Vaccinations', 'Growth monitoring', 'Breastfeeding', 'Developmental milestones'],
        'child': ['Childhood vaccines', 'Nutrition', 'Physical activity', 'Dental health'],
        'teen': ['Mental health', 'Physical development', 'Nutrition', 'Safe behaviors'],
        'young-adult': ['Reproductive health', 'Career stress', 'Nutrition', 'Physical fitness'],
        'middle-adult': ['Chronic disease prevention', 'Heart health', 'Diabetes risk', 'Mental wellness'],
        'senior': ['Bone health', 'Cognitive function', 'Medication management', 'Fall prevention']
    };
    
    // Define example alerts by age group
    const alertsByAge = {
        'all': [
            {
                title: 'MYTH: Herbal teas can cure diabetes completely',
                description: 'This claim is circulating on social media and targets middle-aged adults. While some herbal teas may help manage blood sugar levels as part of a comprehensive treatment plan, they cannot cure diabetes.',
                fact: 'Diabetes requires medical management including medication, diet, and lifestyle changes. Consult healthcare providers before using any alternative treatments.',
                date: 'March 15, 2025',
                ageGroups: 'Adults 36-59, Seniors 60+',
                type: 'warning'
            },
            {
                title: 'MYTH: Vitamins can replace vaccines for children',
                description: 'Claims that high-dose vitamins can replace childhood vaccinations are spreading in rural communities.',
                fact: 'Vitamins cannot prevent infectious diseases that vaccines protect against. Vaccines work by training the immune system to recognize and fight specific pathogens.',
                date: 'March 10, 2025',
                ageGroups: 'Infants 0-2, Children 3-12',
                type: 'danger'
            }
        ],
        'infant': [
            {
                title: 'MYTH: Honey is safe for infants under 1 year',
                description: 'Some traditional healers recommend honey for infant colic and soothing.',
                fact: 'Honey should NEVER be given to babies under 12 months as it can cause infant botulism, a serious and potentially fatal illness.',
                date: 'March 5, 2025',
                ageGroups: 'Infants 0-2',
                type: 'danger'
            }
        ],
        // Add more age-specific alerts as needed
        'senior': [
            {
                title: 'MYTH: Memory loss is an inevitable part of aging',
                description: 'Many believe significant memory loss is normal as people age.',
                fact: 'While some cognitive changes are normal with aging, significant memory loss is not and could be a sign of dementia or other treatable conditions.',
                date: 'February 28, 2025',
                ageGroups: 'Seniors 60+',
                type: 'warning'
            }
        ]
    };
    
    // Function to update concerns list based on selected age group
    function updateAgeConcerns(ageGroup) {
        if (ageConcernsList) {
            ageConcernsList.innerHTML = '';
            const concerns = ageConcerns[ageGroup] || ageConcerns['all'];
            
            concerns.forEach(concern => {
                const li = document.createElement('li');
                li.textContent = concern;
                ageConcernsList.appendChild(li);
            });
        }
    }
    
    // Function to update alerts based on selected age group
    function updateAlerts(ageGroup) {
        if (alertsContainer) {
            alertsContainer.innerHTML = '';
            const alerts = alertsByAge[ageGroup] || alertsByAge['all'];
            
            alerts.forEach(alert => {
                const alertItem = document.createElement('div');
                alertItem.className = 'alert-item';
                alertItem.innerHTML = `
                    <div class="alert-icon ${alert.type}">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="alert-content">
                        <h3>${alert.title}</h3>
                        <p class="alert-description">${alert.description}</p>
                        <div class="alert-facts">
                            <h4>FACT CHECK:</h4>
                            <p>${alert.fact}</p>
                        </div>
                        <div class="alert-metadata">
                            <span class="alert-date">Trending since: ${alert.date}</span>
                            <span class="alert-age-groups">Relevant for: ${alert.ageGroups}</span>
                        </div>
                    </div>
                `;
                alertsContainer.appendChild(alertItem);
            });
        }
    }
    
    // Set up event listeners for age group changes
    if (ageGroupInputs.length > 0) {
        ageGroupInputs.forEach(input => {
            input.addEventListener('change', function() {
                const selectedAge = this.value;
                updateAgeConcerns(selectedAge);
                updateAlerts(selectedAge);
            });
        });
        
        // Initialize with default (all)
        updateAgeConcerns('all');
        updateAlerts('all');
    }
    
    // Education section tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
    }
    
    // Education age filter
    const educationAgeFilter = document.getElementById('education-age');
    const educationCards = document.querySelectorAll('.education-card');
    
    if (educationAgeFilter && educationCards.length > 0) {
        educationAgeFilter.addEventListener('change', function() {
            const selectedAge = this.value;
            
            educationCards.forEach(card => {
                const ageTag = card.querySelector('.age-tag');
                if (selectedAge === 'all' || !ageTag || ageTag.textContent.includes(selectedAge) || ageTag.textContent.includes('All Ages')) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Chat widget functionality
    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.getElementById('user-message');
    const sendMessage = document.getElementById('send-message');
    
    // Toggle chat widget
    if (chatToggle && chatWidget) {
        chatToggle.addEventListener('click', function() {
            chatWidget.classList.toggle('open');
            if (chatWidget.classList.contains('open')) {
                userMessage.focus();
            }
        });
    }
    
    // Close chat widget
    if (closeChat && chatWidget) {
        closeChat.addEventListener('click', function() {
            chatWidget.classList.remove('open');
        });
    }
    
    // Send message functionality
    if (sendMessage && userMessage && chatMessages) {
        // Function to add message to chat
        function addMessage(text, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = isUser ? 'message user' : 'message bot';
            messageDiv.innerHTML = `<p>${text}</p>`;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Bot responses based on keywords
        function getBotResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            // Simple keyword-based responses
            if (lowerMessage.includes('diabetes')) {
                return "Diabetes is a chronic condition that affects how your body processes blood sugar. It's important to consult a healthcare provider for proper diagnosis and treatment. Would you like information about diabetes prevention?";
            } else if (lowerMessage.includes('vaccine') || lowerMessage.includes('vaccination')) {
                return "Vaccines are safe and effective ways to protect against many serious diseases. They work by training your immune system to recognize and fight specific pathogens. Would you like age-specific vaccination information?";
            } else if (lowerMessage.includes('covid') || lowerMessage.includes('coronavirus')) {
                return "COVID-19 is caused by the SARS-CoV-2 virus. Prevention measures include vaccination, good hygiene practices, and following local health guidelines. Would you like more specific COVID-19 information?";
            } else if (lowerMessage.includes('pregnancy') || lowerMessage.includes('pregnant')) {
                return "Prenatal care is essential for a healthy pregnancy. Regular check-ups, proper nutrition, and avoiding harmful substances are important. Would you like information about maternal health resources?";
            } else if (lowerMessage.includes('infant') || lowerMessage.includes('baby')) {
                return "Infant care includes breastfeeding or proper formula feeding, regular check-ups, vaccinations, and monitoring development milestones. Would you like specific information about infant health?";
            } else if (lowerMessage.includes('elder') || lowerMessage.includes('senior')) {
                return "Senior health focuses on maintaining quality of life, managing chronic conditions, preventing falls, and supporting cognitive health. Would you like specific information about senior health?";
            } else {
                return "Thank you for your question. I can provide verified health information on topics like vaccines, nutrition, common diseases, and preventive care. Could you please provide more details about what you'd like to know?";
            }
        }
        
        // Handle sending messages
        function handleSendMessage() {
            const message = userMessage.value.trim();
            if (message) {
                // Add user message
                addMessage(message, true);
                userMessage.value = '';
                
                // Simulate typing
                setTimeout(() => {
                    const typingIndicator = document.createElement('div');
                    typingIndicator.className = 'message bot typing';
                    typingIndicator.innerHTML = '<p>Typing<span>.</span><span>.</span><span>.</span></p>';
                    chatMessages.appendChild(typingIndicator);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // Remove typing indicator and add response after delay
                    setTimeout(() => {
                        chatMessages.removeChild(typingIndicator);
                        addMessage(getBotResponse(message));
                    }, 1500);
                }, 500);
            }
        }
        
        sendMessage.addEventListener('click', handleSendMessage);
        
        userMessage.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSendMessage();
            }
        });
    }
    
    // Language selector functionality
    const languageSelector = document.getElementById('language');
    
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            alert(`Language would change to ${selectedLanguage}. This feature is not implemented in the demo.`);
        });
    }
    
    // Report misinformation button
    const reportBtn = document.getElementById('report-btn');
    
    if (reportBtn) {
        reportBtn.addEventListener('click', function() {
            // Simple modal could be implemented here
            alert('Thank you for helping combat health misinformation. A reporting form would appear here in the full implementation.');
        });
    }
    
    // Simple testimonial slider
    const testimonialSlider = document.getElementById('testimonial-slider');
    
    if (testimonialSlider) {
        // Sample testimonials
        const testimonials = [
            {
                text: "MediTruth helped me identify misinformation about diabetes treatment that was circulating in my village. Now I have accurate information to manage my condition.",
                author: "Rajan M., 56",
                location: "Rajasthan"
            },
            {
                text: "As a new mother, I was confused by contradictory advice about infant feeding. The age-specific information on MediTruth cleared my doubts and helped me make informed decisions.",
                author: "Priya S., 29",
                location: "Tamil Nadu"
            },
            {
                text: "The verification tool helped me check claims about traditional remedies. I learned which ones are supported by evidence and which could be harmful.",
                author: "Arjun K., 42",
                location: "Karnataka"
            }
        ];
        
        // Add testimonials to slider
        testimonials.forEach(testimonial => {
            const testimonialDiv = document.createElement('div');
            testimonialDiv.className = 'testimonial-item';
            testimonialDiv.innerHTML = `
                <div class="testimonial-content">
                    <i class="fas fa-quote-left"></i>
                    <p>${testimonial.text}</p>
                    <div class="testimonial-author">
                        <p class="author-name">${testimonial.author}</p>
                        <p class="author-location">${testimonial.location}</p>
                    </div>
                </div>
            `;
            testimonialSlider.appendChild(testimonialDiv);
        });
        
        // Simple auto-scrolling functionality
        let currentTestimonial = 0;
        const testimonialItems = testimonialSlider.querySelectorAll('.testimonial-item');
        
        if (testimonialItems.length > 1) {
            // Show first testimonial
            testimonialItems[0].classList.add('active');
            
            // Change testimonial every 5 seconds
            setInterval(() => {
                testimonialItems[currentTestimonial].classList.remove('active');
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                testimonialItems[currentTestimonial].classList.add('active');
            }, 5000);
        }
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile navigation if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    const icon = mobileNavToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
});