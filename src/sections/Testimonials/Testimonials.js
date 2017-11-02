import React from 'react';
import Link from 'gatsby-link';
import { getFirstNWords } from '../../utils/text';
import './style.scss';

const Tdata = [
  {
    id: 0,
    header: 'Haris Bračković',
    body:
      'As an ambitious and passionate beginner in the world of programming I started looking for an internship that would best suit me. Someone mentioned an internship opportunity at Mistral and that is where it all changed for me. I decided to apply, and luckily for me, Mistral recognized my potential. From the first day of Gigi School of Coding my life changed totally. Working 8 hours a day in teams on real projects mentored by Gigi, who is the best mentor I’ve ever had, is what the internship was all about. I started to notice improvements on myself as a junior developer soon after, gained working habits, improved my whole personality and learned to respect others’ opinion as well as expressing my own. Gigi uses a really interesting and motivating approach in explaining all the coding rules, best practices and tricks making it easy to learn fast. If you are stuck with an issue, you have over a 100 of Mistral’s employees willing to help you at any moment, no matter how simple your question is. As an intern you already feel as a part of the company since you have all the resources and advantages that other Mistral’s employees have, there is no difference. What else could you wish for? Your only duty is to learn, mingle with teammates, code, eat, sleep and repeat!\n',
    color: '#242846',
    img: '/img/testimonials/haris-brackovic-thumb.jpg',
    url: 'haris-brackovic',
  },
  {
    id: 1,
    header: 'Anur Bećirović',
    body:
      'After graduating, the first thing that comes to  mind is “I need to find a job”. That is when all the self doubt kicks in: Do I have what it takes? Is my current skillset sufficient? Will I ever be good enough? I knew one thing though. I was done with all the theory and sleepless nights over a book. I wanted a real project and a real team. Gigi School of Coding offered exactly that. This internship at Mistral is an actual simulation of the real deal. We worked on a project from start to finish, and learned everything you need for web development and more, so you can find where your real strength lies.  My favorite part was all the experience and knowledge sharing. I never thought I could learn so much in a period of 3 months. Mentors did an amazing job showing us how we can make the Web a better place and helping us grow as individuals in every way. During my university studies my main subject was back-end development, but that changed at Gigi School of Coding. I got completely hooked on front-end development in Angular and really enjoyed learning it. The internship covered every bit of the software development process, from the basics like standups meetings (Agile methodology) to UX/UI flows and QA tests! Gaining working habits during the internship was also a big plus for me. Gigi School of Coding made a big difference in my life and I recommend it to anyone who wants a career in the dynamic world of IT.\n',
    color: '#ba9077',
    img: '/img/testimonials/anur-becirovic-thumb.jpg',
    url: 'anur-becirovic',
  },
  {
    id: 2,
    header: 'Faris Odobašić',
    body:
      'Working with the “latest trend” technologies was possible only in my spare time while I was a student at the university. The IT market simply develops too fast, making it hard for universities to keep up with their curriculums. Learning independently is definitely a must no matter what university you attend, but it’s not that easy. Practicing AngularJS, for example, on my own, wasn’t that successful. I knew I needed a mentor, and a team. That is why I applied to Mistral for an internship. Thanks to Gigi’s approach in Gigi School of Coding, I have managed to progress faster than I had ever hoped. What fascinated me the most is the fact that over a 100 engineers at Mistral were open to all of my enquiries. They even asked follow up questions about how helpful was their suggestion or solution and if I understood it fully. I loved their vibe and the whole Mistral community. You can only imagine how happy I was when they hired me after the internship, making me a part of their extraordinary team officially. I have to admit that I worked harder than ever to get that opportunity. The only thing I was sceptical about at the beginning was when I found out that the internship is like 3 months and full-time: “5 days a week, 8 hours of work”.” I asked myself: “Can I manage a full-time internship with my studies obligations?”, “Who can sit 8 hours and code??” - and many other (silly) questions. They were all answered after only one week spent at Gigi School of Coding. With a professional teaching ensemble, relaxed, home- like atmosphere at Mistral, many team buildings, hanging out over in-house gaming sessions, those “long” 3 months were over before I knew it. And yes, it was all worth it!\n',
    color: '#1ABC9C',
    img: '/img/testimonials/faris-odobasic-thumb.jpg',
    url: 'faris-odobasic',
  },
  {
    id: 3,
    header: 'Amar Bašić',
    body:
      'Gigi School of Coding gave me a much needed opportunity to apply everything I’ve learned during my studies. It was a whole new dimension for me. We did have intro (theory) classes, but we started working on Mistral mock projects very soon after the beginning of the internship. It is truly fascinating how fast you learn when you take on a project head on, 8 hours a day, all week with a great team. The working environment and all the mentors were excellent. Mistral’s internship taught me how to organize time, manage a team and understand the complete process of software development. It is not all just about learning, there are also team buildings, mistral brunches, lunch and learn sessions, games room and more. I also had a chance to meet the talented people working at Mistral who were always ready to help. The whole time of my internship I felt like I was already an employee as we had the same treatment, challenging projects and all the benefits! I strongly advise everyone with a passion for software development to apply.\n',
    color: '#C0392B',
    img: '/img/testimonials/amar-basic-thumb.jpg',
    url: 'amar-basic',
  },
  {
    id: 4,
    header: 'Ilija Šamarlić',
    body:
    "You're here reading this, means you are showing initiative. That's good, keep it up.\n" +
    '“Learn to code” is the latest buzz in the world and everybody wants to give it a try and get involved. Can you learn it on your own? Yes, although I am sure you heard it before if you want to go fast (short distance), go alone. If you want to go far, go together. \n' +
    "So why join Gigi School of Coding? It's simple, Gigi School of Coding will let you see and experience the whole development process and give you an awesome team to do it with.\n" +
    "You'll be surrounded by beautiful minds and some amazing people who will guide you and give valuable feedback so you can track and manage your progress.\n" +
    "Some of the things you'll learn involve the laying down of sound and firm grounds to build your software product (application) on, using different programming paradigms, proven practices, various tools and frameworks.\n" +
    "You will also come to realize just how important the testing process (QA) is, and how to style your apps to be more distinctive, user friendly and intuitive (UX/UI). Interestingly you'll be exposed to concepts of agile mindset, something, once embraced, will help you add value to your coding endeavours.\n" +
    'Mistral’s internship also provides you with an opportunity to hone your English communication skills or to break that barrier of using foreign language.\n' +
    'Learning to code takes A LOT of time and effort, so if you are ready to be ALL in, I suggest you try your odds and apply.\n',
    color: '#513B56',
    img: '/img/testimonials/ilija-samarlic-thumb.jpg',
    url: 'ilija-samarlic',
  },
  {
    id: 5,
    header: 'Amela Spahić',
    body:
      'When it comes to wishes, everything is allowed and no one can stop you from having dreams and working hard to make them come true. I am a living proof of that. I really wanted to be a part of an IT company where developers create amazing solutions through various interesting projects. For someone like me, who has a background in aviation industry, it seemed impossible to get involved with such an unfamiliar world. However, I decided to pursue my dream and apply for Gigi School of Coding internship and test if it really was the world that I wanted to be a part of. The answer came soon. Just after a couple of days of attending the Gigi project. Although we had a great mentor – Gigi, who unselfishly shared his knowledge, my true motivation and interest started exponentially raising during the Quality Assurance lessons held by my now colleague Sumejja. I discovered my passion about improving the quality of software solutions. Testing, tracking everything and suggesting enhancements became a part of my life which I truly enjoy. Changing my career path was a huge challenge for me, but it served as a great example that we should all pursue our dreams and never stop learning.\n',
    color: '#513B56',
    img: '/img/testimonials/amela-spahic-thumb.jpg',
    url: 'amela-spahic',
  },
  {
    id: 6,
    header: 'Edin Čongo',
    body:
    'Before I got enrolled at Gigi School of Coding, I quit my previous job in order to pursue this new challenge. I can thank Muamer Č. (Project Manager at Mistral) for the life changing advice he gave me. This was a little shock for me and my family as I wasn’t sure if I was ready for the challenges of software development due to the lack of experience. I needed some kind of tutoring to sharpen my skills, something I knew I’d find at Mistral’s ‘Gigi School of Coding’. That internship was a big crossroad for me.\n' +
    'You must be aware that Gigi School of Coding is not magical; you won’t progress from just physically being present. You have to work hard, invest in yourself and pursue your goals. What sets Mistral apart from others is that you will get next level support in that pursuit, starting with Gigi himself; sharing his decades worth of knowledge. The rest of the mentors also give their 100% to help sharpen your skills in the domains they’re most experienced in. \n' +
    'I like how Mistral’s Human Potential team makes you feel like you’ve always been a part of the team and how an army of others assure you that you belong right there, from day one, by being open, kind and friendly. \n' +
    'Gigi School of Coding is a one of a kind opportunity to learn from the best, acquire new knowledge every day and strive for excellence, gaining the qualities Mistral is all about. Alongside chocolate, laughter and games, of course.',
    color: '#513B56',
    img: '/img/testimonials/edin-congo-thumb.jpg',
    url: 'edin-congo',
  },
  {
    id: 7,
    header: 'Merseda Spahić',
    body:
    'Gigi School of Coding vastly improved my knowledge of C# and SQL among other things, and gave me a chance to experience the real IT dynamic environment everyone is buzzing about! A fantastic team of likeminded individuals in Mistral helped me realize I was on the right career path.\n' +
    'During the internship, Gigi interns (now my dear friends and colleagues) were separated into teams of 3 or 4. Every two weeks we had to present our work (demo).\n' +
    'Maybe this sounds scary for some, like it was for me, but sooner or later everyone will be in that situation, so it is better to get rid of fear of public speaking by practising from the very start.\n' +
    "All the projects at Gigi School of Coding were a real deal, so switching to a real Mistral project afterwards was pretty easy. Mistral mentors and others colleagues from the company were extremely helpful and happy to provide suggestions and guidance. My university studies gave me a good foundation and prepared me for various challenges, but we are all aware that we are like uncut diamonds in need of polishing in order to shine. If you are ready to show what you're made of and shine, I suggest you apply for Gigi School of Coding and begin a new, advanced chapter of your life.\n",
    color: '#513B56',
    img: '/img/testimonials/merseda-spahic-thumb.jpg',
    url: 'merseda-spahic',
  },
];

export const Testimonials = props => (
  <div id="testimonials" className="testimonials my-6">
    <div className="testimonials__inner">
      <h3 className="g-title mb-5">GIGIJEVCI: THEIR STORY</h3>
      <div className="testimonials__wrapper gigi">
        {Tdata.map((item, index) => (
          <figure className="testimonial g-4" key={index}>
            <img src={item.img} alt={item.header} />
            <figcaption>
              <h6>{item.header}</h6>
              <p>{getFirstNWords(item.body)} </p>
              <Link
                to={`/testimonials/${item.url}`}
                className="mentors__link link link--gigi"
                target="_blank"
              >
                <span>Read More</span>
              </Link>
            </figcaption>.
          </figure>
        ))}
      </div>
    </div>
  </div>
);
