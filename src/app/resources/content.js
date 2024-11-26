import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Viradj',
    lastName: 'Ramlochan Tewarie',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role: 'Data Analytics & Sociology',
    avatar: '/images/avatar.jpg',
    languages: ['English', 'Dutch'],
};

const newsletter = {
    display: true,
    subItems: false,
    title: <>Subscribe to {person.firstName}'s Newsletter</>,
    description: <>I occasionally write about technology, sociology, and anything worth sharing.</>
};

const social = [
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/Viradj',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/viradj/',
    },
];

const home = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Data Analyst & Sociologist Bridging Technology and Society</>,
    subline: <>Hi, I'm Viradj—driven by curiosity, inspired by <InlineCode>data</InlineCode>, and passionate about making an impact on the world.</>,
};

const about = {
    label: 'About',
    title: 'About Me',
    description: `Meet ${person.name}, ${person.role}`,
    tableOfContent: {
        display: true,
        subItems: false,
    },
    avatar: {
        display: true,
    },
    calendar: {
        display: false,
        link: 'https://cal.com',
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>I’m a curious and dedicated analyst who loves working with data to uncover insights and solve problems. With a background in sociology and IT, I’m passionate about using data to make meaningful decisions and drive improvement.</>,
    },
    work: {
        display: false,
        title: 'Work Experience',
        experiences: [
            {
                company: 'CAK (Central Administration of the Netherlands)',
                timeframe: 'January 2025 - Present',
                role: 'Information Analyst / Specialist',
                achievements: [
                    <>Part of the ICT department building an application for exchanging medical information according to European standards.</>,
                    <>Acting as the most technical member of the team, supporting development in a React-based environment.</>,
                    <>Bridging the gap between stakeholders and technical teams, ensuring accurate requirements analysis and implementation.</>,
                ],
                images: [],
            },
            {
                company: 'Kurtosis',
                timeframe: 'July 2024 - December 2024',
                role: 'Lead Data Analytics',
                achievements: [
                    <>Strategically advised and mentored junior analysts, driving quality and innovation in data processes.</>,
                    <>Developed predictive models for municipal healthcare cost optimization, enhancing decision-making efficiency.</>,
                ],
                images: [],
            },
            {
                company: 'Kurtosis',
                timeframe: 'September 2021 - July 2024',
                role: 'Data Analyst',
                achievements: [
                    <>Built advanced Tableau dashboards for municipalities, improving operational efficiency and policy insights.</>,
                    <>Conducted Tableau training sessions for clients, empowering them to create self-service dashboards.</>,
                ],
                images: [],
            },
            {
                company: 'Midden Holland Procurement Region (Service Project)',
                timeframe: 'April 2021 - August 2021',
                role: 'Data Analyst (Freelance)',
                achievements: [
                    <>Created dashboards for youth services procurement, enabling better tracking of service provider performance.</>,
                    <>Analyzed financial and service data to identify over- and under-utilization patterns across providers.</>,
                ],
                images: [],
            },
            {
                company: 'Municipality of Westland',
                timeframe: 'August 2020 - August 2021',
                role: 'Data Analyst',
                achievements: [
                    <>Created Tableau dashboards to track municipal healthcare spending and service provider performance.</>,
                    <>Analyzed financial and operational data to ensure alignment with budgetary and policy goals.</>,
                    <>Provided actionable insights to improve resource allocation and optimize public service delivery.</>,
                ],
                images: [],
            },
        ],
    },
    studies: {
        display: false,
        title: 'Studies',
        institutions: [
            {
                name: 'Utrecht University',
                description: <>Master of Science in Sociology: Contemporary Social Problems. Focused on criminology, analytical sociology, and public policy analysis.</>,
            },
            {
                name: 'The Hague University of Applied Sciences',
                description: <>Bachelor’s in Business IT & Management. Emphasis on ERP systems, business processes, and IT management.</>,
            },
        ],
    },
    technical: {
        display: false,
        title: 'Technical Skills',
        skills: [
            {
                title: 'Tableau',
                description: <>Expert in building interactive dashboards and data visualizations for public sector decision-making.</>,
                images: [
                    {
                        src: '/images/projects/tableau-01.jpg',
                        alt: 'Tableau Dashboard Example',
                        width: 16,
                        height: 9,
                    },
                ],
            },
            {
                title: 'Next.js',
                description: <>Building advanced applications with Next.js, integrated with Supabase for seamless data handling.</>,
                images: [
                    {
                        src: '/images/projects/nextjs-app.jpg',
                        alt: 'Next.js Project',
                        width: 16,
                        height: 9,
                    },
                ],
            },
        ],
    },
};


const blog = {
    label: 'Blog',
    title: 'Writing about Data and Tech...',
    description: `Read what ${person.name} has been up to recently.`,
};

const work = {
    label: 'Work',
    title: 'My Projects',
    description: `Design and dev projects by ${person.name}`,
};

const gallery = {
    label: 'Gallery',
    title: 'My Photo Gallery',
    description: `A photo collection by ${person.name}`,
    images: [
        {
            src: '/images/gallery/img-01.jpg',
            alt: 'Data Visualization Example',
            orientation: 'horizontal',
        },
        {
            src: '/images/gallery/img-02.jpg',
            alt: 'Next.js Application',
            orientation: 'vertical',
        },
    ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
