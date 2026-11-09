/* ------------------------------------------------------------------
   All site content lives here. Edit this file to update the portfolio;
   the pages render from it and the counters update on their own.
   ------------------------------------------------------------------ */
(function () {
  var GH = 'https://github.com/kashifm777/';
  var IMG = 'assets/images/projects/';

  // project(category, title, repo, image, description, liveDemoUrl)
  function p(cat, title, repo, img, desc, demo) {
    return {
      cat: cat, title: title, desc: desc, img: IMG + img, demo: demo || null,
      url: /^https?:/.test(repo) ? repo : GH + repo
    };
  }

  var GENAI = 'Generative AI', DJ = 'Django', FA = 'FastAPI', ML = 'Machine Learning',
      ST = 'Streamlit', CV = 'Computer Vision', NB = 'Notebooks', PY = 'Python Apps',
      GM = 'Python Games', WEB = 'Web Apps', AN = 'Android';

  var projects = [
    p(GENAI, 'Nutrients Tracker', 'Nutrients_Tracker', 'nutrients.png', 'Estimates calories from a photo of your food using Gemini Pro Vision, with optional text prompts for added context.', 'https://nutrients-tracker.streamlit.app'),
    p(GENAI, 'Invoice Extractor', 'Invoice_Extractor', 'invoice.png', 'Extracts information from invoices using Gemini Pro Vision, driven by user prompts and image analysis.', 'https://invoice-extractor-kashifm777.streamlit.app'),
    p(GENAI, 'Document Genie', 'Document_Genie_with_RAG', 'Document_Genie.png', 'Retrieval-augmented generation over your PDF documents, built on Google\'s Gemini Pro model.', 'https://document-genie-rag.streamlit.app'),
    p(GENAI, 'Story Writing App', 'story_writing_app', 'Story_Writing.png', 'An interactive story writing app powered by Google\'s Gemini Pro.', 'https://story-writing-app.streamlit.app'),

    p(DJ, 'ExpenseSense', 'ExpensSense', 'expenseSense.png', 'An AI-powered expense tracker built with Django and machine learning.'),
    p(DJ, 'Speech-to-Text', 'speech_to_text', 'speech-to-text.png', 'Django app for speech transcription with AssemblyAI.'),

    p(FA, 'Bank Note Classification', 'Bank_Note_Authentication', 'bank_note.png', 'FastAPI web application that classifies banknotes as genuine or fake.'),
    p(FA, 'Titanic Data Exploration', 'titanic_plotting_app', 'titanic_exp.png', 'FastAPI service for exploring Titanic passenger survival rates with seaborn.'),
    p(FA, 'Handyman Emporium', 'Handyman_emporium', 'handyman.png', 'FastAPI service for managing a handyman store\'s inventory.'),
    p(FA, 'Book Store API', 'Book_store', 'book_store_fast.png', 'RESTful FastAPI service for managing a book store.'),

    p(ML, 'Handwritten Digit Recognition', 'Handwritten-Digit-Recognition', 'digit.png', 'Handwritten digit recognition with deep learning.'),

    p(ST, 'Resume Match', 'ResumeMatch', 'resume.png', 'Compares two resumes using pairwise cosine similarity.'),
    p(ST, 'Breast Cancer Classifier', 'bcc', 'bcc.png', 'Streamlit app for breast cancer classification.'),
    p(ST, 'ML Classifier', 'classifier_web_app', 'classifier.png', 'Compare machine learning classifiers across different datasets.'),
    p(ST, 'The EDA App', 'EDA', 'eda.png', 'Exploratory data analysis app built with Streamlit.'),
    p(ST, 'CSV Wrangler', 'csv_wrangler_app', 'wrangling.png', 'Wrangle CSV files in just a few clicks.'),
    p(ST, 'NBA Player Stats', 'NBA_Player_Stats', 'nba.png', 'Streamlit app for visualizing NBA player statistics.'),
    p(ST, 'DNA Nucleotide Count', 'DNA_Nucleotide_Count', 'dna.png', 'Bioinformatics app that counts DNA nucleotides.'),
    p(ST, 'CSS Shape Generator', 'CSS_Shape_Generator', 'Shape_Generator.png', 'Generates CSS code for the shapes you choose in the interface.'),

    p(CV, 'Cartoonifier', 'cartoonifier-python', 'cartoonify.png', 'Image cartoonifier app built with Python and Tkinter.'),

    p(NB, 'CardioGood Case Study', 'CardioGoodFitness_Case_Study', 'cardio.png', 'Descriptive analytics building a customer profile for each CardioGood Fitness treadmill line.'),
    p(NB, 'EDA Reports with Sweetviz', 'Sweetviz-EDA-crop', 'streamviz.png', 'Interactive exploratory data analysis reports for any dataset.'),

    p(WEB, 'Airline Ticket Reservation', 'WebApps/tree/main/Airline', 'airline.png', 'Simulates the core concepts of an airline reservation system.'),
    p(WEB, 'Art Gallery', 'WebApps/tree/main/Art', 'art.png', 'Online gallery for displaying art pieces.'),
    p(WEB, 'Book Store', 'WebApps/tree/main/BookStore', 'book.png', 'An online book store management system.'),

    p(PY, 'Bank Management System', 'bank_management_system', 'bank.png', 'Bank management system in Python.'),
    p(PY, 'Complaint Management System', 'complaint_management_system', 'complaint.png', 'Complaint management system in Python.'),
    p(PY, 'Contact Management System', 'contact_management_system', 'contact.png', 'Contact management system in Python.'),
    p(PY, 'Food Billing System', 'food_billing_system', 'food_billing.png', 'Food billing system in Python.'),
    p(PY, 'Hotel Management System', 'hotel_management_system', 'hotel_management.png', 'Hotel management system in Python.'),
    p(PY, 'Library Management System', 'library_management_system', 'library_management.png', 'Library management system in Python.'),
    p(PY, 'Restaurant Management System', 'restaurant_management_system', 'restaurant_management.png', 'Restaurant management system in Python.'),
    p(PY, 'Zoo Management System', 'zoo_management_system', 'zoo_management.png', 'Zoo management system in Python.'),
    p(PY, 'Alarm Clock', 'Alarm_Clock', 'alarm.png', 'Alarm clock in Python.'),
    p(PY, 'Countdown Timer', 'countdown_timer', 'count_down.png', 'Countdown timer in Python.'),

    p(GM, 'Flippy', 'flippy', 'flippy.png', 'Flippy game built with Python and Pygame.'),
    p(GM, 'Gem-gem', 'gemgem', 'gemgem.png', 'Gem-gem game built with Python and Pygame.'),
    p(GM, 'Ink Spill', 'inkspill', 'inkspill.png', 'Ink Spill game built with Python and Pygame.'),
    p(GM, 'Four in a Row', 'fourinarow', 'fourinarow.png', 'Four in a Row game built with Python and Pygame.'),
    p(GM, 'Squirrel', 'squirrel', 'squirrel.png', 'Squirrel game built with Python and Pygame.'),
    p(GM, 'Star Pusher', 'starpusher', 'starpusher.png', 'Star Pusher game built with Python and Pygame.'),
    p(GM, 'Ludo', 'ludo', 'Ludo.png', 'Ludo game in Python.'),
    p(GM, 'Tic Tac Toe', 'tic_tac_toe', 'tic_tac_toe.png', 'Python console Tic Tac Toe game.'),
    p(GM, 'Hangman', 'Hangman', 'hangman.png', 'Python console Hangman game.'),
    p(GM, 'Hangman with Hints', 'Hangman_with_hint', 'hangman2.png', 'Python console Hangman game with hints.'),
    p(GM, 'Dragon', 'dragon', 'dragon.png', 'A Python game.'),

    p(AN, 'Vision', 'Vision', 'Vision.png', 'Android app for object detection.'),
    p(AN, 'Image Classifier', 'Image_Classifier', 'android_image_classifier.png', 'Android image classifier app.'),
    p(AN, 'Medical Adviser', 'Medical_Adviser', 'android_medical_adviser.png', 'Android medical adviser app.'),
    p(AN, 'Shopping App', 'android_shopping', 'android_shopping.png', 'Android shopping app.'),
    p(AN, 'Simple Accounting', 'Simple_Accounting', 'Simple_Accounting.png', 'Android accounting app.'),
    p(AN, 'Online Quiz', 'Online_Quiz_Master', 'android_online_quiz.png', 'Android online quiz app.'),
    p(AN, 'Quiz App', 'Quiz_app', 'android_quiz.png', 'Android offline quiz app.'),
    p(AN, 'Book Listing', 'Book_Listing', 'book_listing.png', 'Android book listing app.'),
    p(AN, 'Music Player', 'Music_Player', 'android_music_player.png', 'Android music player.'),
    p(AN, 'Musical Keypad', 'Musical_Keypad', 'android_musical_keypad.png', 'Android musical keypad.'),
    p(AN, 'Student Marks Calculator', 'Student_Marks_Calculator', 'Student_Marks_Calculator.png', 'Android student marks calculator.'),
    p(AN, 'Calculator', 'Calculator', 'calculator_app.png', 'Android calculator app.'),
    p(AN, 'Web Viewer', 'Web_Viewer', 'Web_Viewer.png', 'Android web viewer app.'),
    p(AN, 'Chess', 'Chess', 'chess_game.png', 'Android chess game.'),
    p(AN, 'Pinball', 'Pinball', 'pinball_game.png', 'Android pinball game.'),
    p(AN, 'Brick Game', 'Brick_Game', 'brick_game.png', 'Android brick game.'),
    p(AN, 'Dice Roll', 'Dice_Roll', 'dice_roll _game.png', 'Android dice roll game.'),
    p(AN, 'Tap the Bunny', 'Tap_the_Bunny', 'Tap_the_Bunny.png', 'Android Tap the Bunny game.')
  ];

  // Certificates: [issuer, folder, [[title, file], ...]]
  var certGroups = [
    ['Coursera', 'coursera', [
      ['Deep Learning Specialization', 'Deep_Learning_Specialization.jpg'],
      ['Neural Networks and Deep Learning', 'Neural_Networks_and_Deep_Learning.jpg'],
      ['Improving Deep Neural Networks', 'Improving_Deep_Neural_Networks.jpg'],
      ['Structuring Machine Learning Projects', 'Structuring_Machine_Learning_Projects.jpg'],
      ['Convolutional Neural Networks', 'Convolutional_Neural_Networks.jpg'],
      ['Sequence Models', 'Sequence_Models.jpg'],
      ['Introduction to TensorFlow for AI, ML and Deep Learning', 'Introduction_to_TensorFlow_for_Artificial_Intelligence_Machine Learning_and_Deep_Learning.jpg'],
      ['Applied Machine Learning in Python', 'Applied_Machine_Learning_in_Python.jpg'],
      ['Applied Text Mining in Python', 'Applied_Text_Mining_in_Python.jpg'],
      ['Applied Social Network Analysis in Python', 'Applied_Social_Network_Analysis_in_Python.jpg'],
      ['Introduction to Data Science in Python', 'Introduction_to_Data_Science_in_Python.jpg'],
      ['Google Cloud Platform Fundamentals', 'Google_Cloud_Platform_Fundamentals.jpg'],
      ['AI For Everyone', 'AI_For_Everyone.jpg'],
      ['Object-Oriented Programming with Java', 'Object_Oriented_Programming_with_Java.jpg'],
      ['Advanced Features with Relational Database Tables Using SQLiteStudio', 'Advanced_Features_with_Relational_Database_Tables_Using_SQLiteStudio.jpg'],
      ['Build Your Portfolio Website with HTML and CSS', 'Build_Your_Portfolio_Website_with_HTML_and_CSS.jpg'],
      ['Building a Calculator using C# in Visual Studio', 'Building_a_Calculator_using_C#_in_Visual_Studio.jpg']
    ]],
    ['Forage', 'forage', [
      ['British Airways: Data Science', 'British_Airways_Data_Science.jpg'],
      ['Walmart USA: Advanced Software Engineering', 'Walmart_USA_Advanced_Software_Engineering.jpg'],
      ['PwC Switzerland: Power BI', 'PwC_Switzerland_PowerBI.jpg']
    ]],
    ['Kaggle', 'kaggle', [
      ['Python', 'Python.png'],
      ['Pandas', 'Pandas.png'],
      ['Introduction to Machine Learning', 'Intro_to_ML.png']
    ]],
    ['365 Data Science', '365DataScience', [
      ['Intro to Data and Data Science', 'Intro to Data and Data Science.jpg'],
      ['Python Programmer Bootcamp', 'Python Programmer Bootcamp.jpg'],
      ['Tableau', 'Tableau.jpg'],
      ['Introduction to Microsoft Excel', 'Introduction to Microsoft Excel.jpg'],
      ['Advanced Microsoft Excel', 'Advanced Microsoft Excel.jpg']
    ]],
    ['LinkedIn Learning', 'linkedIn', [
      ['Web Development: Full Stack and Front End', 'Web Development Full Stack and Front End.jpg'],
      ['Get a Remote Data Science Job', 'Get a Remote Data Science Job.png'],
      ['Optimize Your Resume for ATS', 'Optimize Your Resume for ATS.jpg'],
      ['Creating Great First Impressions', 'Creating Great First Impressions.jpg']
    ]],
    ['Microsoft Office Specialist', 'MOS', [
      ['Word Expert', 'WordExpert.jpg'],
      ['Word', 'Word.jpg'],
      ['Excel', 'Excel.jpg'],
      ['PowerPoint', 'PowerPoint.jpg'],
      ['Access', 'Access.jpg']
    ]],
    ['Udemy', 'udemy', [
      ['C Programming for Absolute Beginners', 'C Programming for absolute beginners.jpg']
    ]],
    ['DigiSkills', 'digiSkills', [
      ['Freelancing', 'Freelancing.jpg'],
      ['Digital Marketing', 'Digital Marketing.jpg'],
      ['Creative Writing', 'Creative Writing.jpg'],
      ['WordPress', 'Wordpress.jpg'],
      ['AutoCAD', 'AutoCAD.jpg']
    ]],
    ['Cybrary', 'cybrary', [
      ['End User Mobile Device Security', 'End User Mobile Device Security.jpg'],
      ['End User Social Engineering', 'End User Social Engineering.jpg']
    ]]
  ];

  var certificates = [];
  certGroups.forEach(function (g) {
    g[2].forEach(function (c) {
      certificates.push({
        issuer: g[0], title: c[0],
        img: 'assets/images/certificates/' + g[1] + '/' + c[1]
      });
    });
  });

  window.SITE = {
    github: 'kashifm777',
    careerStart: '2020-06-01', // drives the "years of experience" counter

    roles: ['LLM applications', 'RAG pipelines', 'backend systems', 'deep learning models'],

    // Add achievements to "points" and they appear under the role.
    experience: [
      { role: 'Backend Engineer', company: 'MarkCoders', period: 'Jun 2025 – Present', current: true, points: [] },
      { role: 'Software Developer', company: 'KNYSYS LLC', period: 'Jun 2024 – May 2025', points: [] },
      { role: 'Data Scientist', company: 'COVOLV AI', period: 'Jan 2022 – Mar 2024', points: [] },
      { role: 'Application Developer', company: 'Martos Express Courier (MXC) Services', period: 'Feb 2021 – Oct 2021', points: [] },
      { role: 'Programming Analyst', company: 'Aga Khan Development Network', period: 'Jun 2020 – Feb 2021', points: [] }
    ],

    education: [
      { degree: 'MS in Artificial Intelligence', school: 'NED University of Engineering & Technology', period: '2023 – 2025' },
      { degree: 'BS in Computer Science', school: 'Sindh Madressatul Islam University', period: '2016 – 2019' }
    ],

    skills: [
      { group: 'Generative AI & LLMs', items: ['Gemini', 'GPT', 'Claude', 'Llama', 'RAG', 'LLM fine-tuning', 'LoRA / PEFT', 'Hugging Face', 'FAISS'] },
      { group: 'Machine Learning', items: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'Computer vision', 'Pandas'] },
      { group: 'Backend & Apps', items: ['Python', 'FastAPI', 'Django', 'REST APIs', 'Streamlit', 'Android', 'Flutter'] },
      { group: 'Data & Delivery', items: ['PostgreSQL', 'SQL', 'NoSQL', 'Git & GitHub', 'Project management'] }
    ],

    languages: [
      { name: 'English', level: 'Proficient' },
      { name: 'Urdu', level: 'Native' },
      { name: 'Arabic', level: 'Beginner' }
    ],

    featured: ['Document Genie', 'Nutrients Tracker', 'Invoice Extractor', 'ExpenseSense', 'Speech-to-Text', 'Bank Note Classification'],
    featuredCerts: ['Deep Learning Specialization', 'British Airways: Data Science', 'Walmart USA: Advanced Software Engineering', 'Google Cloud Platform Fundamentals'],

    articles: [
      { title: 'Set Up a RAG Pipeline in 5 Steps', url: 'articles/rag-pipeline.html', topic: 'RAG', blurb: 'Pick a model, embed your documents, index them with FAISS, and wire retrieval into your prompts.' },
      { title: 'Fine-Tune an LLM with Your Data', url: 'articles/fine-tune-llm.html', topic: 'Fine-tuning', blurb: 'A step-by-step guide to personalizing an open-source LLM with LoRA and PEFT.' }
    ],
    medium: 'https://medium.com/@kashif.ai.dev',

    projects: projects,
    certificates: certificates
  };
})();
