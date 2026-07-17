import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ResumeCustomizer.css';

// 10 templates available in the catalog with real mockup previews
const templates = [
  {
    id: 'classic',
    name: 'Classic',
    role: 'Marketing Specialist',
    tags: 'top-picks ats classic traditional one-page single no-photo blue',
    image: '/images/RESUME TEMPLATES/file_00000000fe2872088873cdc9244f32f0.png',
    accent: '#1A3A5C',
    layout: 'one'
  },
  {
    id: 'modern',
    name: 'Modern',
    role: 'Product Manager',
    tags: 'modern professional one-page single photo gray',
    image: '/images/RESUME TEMPLATES/file_00000000b96072089bcf803d41ea89ff.png',
    accent: '#4A90D9',
    layout: 'two'
  },
  {
    id: 'executive',
    name: 'Executive',
    role: 'Clean & Modern',
    tags: 'executive professional two-column one-page single photo blue navy',
    image: '/images/RESUME TEMPLATES/file_00000000ca6c7208a76594f2e619499a.png',
    accent: '#1A3A5C',
    layout: 'two'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    role: 'Executive',
    tags: 'minimal simple one-page single no-photo gray',
    image: '/images/RESUME TEMPLATES/file_00000000f3207208b912c6c636a195a1.png',
    accent: '#888888',
    layout: 'one'
  },
  {
    id: 'creative',
    name: 'Creative',
    role: 'Creative Designer',
    tags: 'creative creative two-column one-page single no-photo red green',
    image: '/images/RESUME TEMPLATES/file_00000000f19472089c50ad245caa766f.png',
    accent: '#E74C3C',
    layout: 'two'
  },
  {
    id: 'professional',
    name: 'Professional',
    role: 'Product Manager',
    tags: 'professional ats friendly one-page single no-photo blue',
    image: '/images/RESUME TEMPLATES/file_000000006a3472089ff3c13bafb8cd20.png',
    accent: '#27AE60',
    layout: 'one'
  },
  {
    id: 'designer',
    name: 'Designer',
    role: 'Data Analyst',
    tags: 'designer modern simple one-column single no-photo green',
    image: '/images/RESUME TEMPLATES/file_000000009a2872089daf10c7b99ee68d.png',
    accent: '#27AE60',
    layout: 'one'
  },
  {
    id: 'engineer',
    name: 'Engineer',
    role: 'Software Engineer',
    tags: 'engineer ats friendly two-column double no-photo navy',
    image: '/images/RESUME TEMPLATES/file_000000009ea472089cfaeb69b3d89ae4.png',
    accent: '#1A3A5C',
    layout: 'two'
  },
  {
    id: 'manager',
    name: 'Manager',
    role: 'HR Manager',
    tags: 'manager executive professional two-column single no-photo gray',
    image: '/images/RESUME TEMPLATES/file_0000000071d07208b294120670a628c3.png',
    accent: '#888888',
    layout: 'two'
  },
  {
    id: 'sales',
    name: 'Sales',
    role: 'Sales Manager',
    tags: 'sales popular ats chronological double photo red',
    image: '/images/RESUME TEMPLATES/file_00000000057072088accbabd51e86f76.png',
    accent: '#E74C3C',
    layout: 'two'
  }
];

const colorSwatches = ['#EEC30C', '#4A90D9', '#E74C3C', '#27AE60', '#1A3A5C', '#9b59b6', '#1abc9c', '#888888'];

const personalDetailsPills = [
  { key: 'passport', name: 'Passport or Id' },
  { key: 'nationality', name: 'Nationality' },
  { key: 'dob', name: 'Date of Birth' },
  { key: 'visa', name: 'Visa' },
  { key: 'availability', name: 'Availability' },
  { key: 'gender', name: 'Gender/Pronoun' },
  { key: 'disability', name: 'Disability' }
];

const personalDetailsExtraPills = [
  { key: 'workmode', name: 'Work mode' },
  { key: 'relocation', name: 'Relocation' },
  { key: 'expectedsalary', name: 'Expected salary' },
  { key: 'secondphone', name: 'Second phone' },
  { key: 'drivinglicense', name: 'Driving License' },
  { key: 'securityclearance', name: 'Security clearance' },
  { key: 'marital', name: 'Marital status' },
  { key: 'military', name: 'Military Service' },
  { key: 'smoking', name: 'Smoking' },
  { key: 'height', name: 'Height' },
  { key: 'weight', name: 'Weight' }
];

const linksPills = [
  { key: 'website', name: 'Website' },
  { key: 'portfolio', name: 'Portfolio' },
  { key: 'linkedin', name: 'LinkedIn' },
  { key: 'github', name: 'GitHub' },
  { key: 'gitbook', name: 'GitBook' },
  { key: 'medium', name: 'Medium' },
  { key: 'orcid', name: 'ORCID' },
  { key: 'skype', name: 'Skype' },
  { key: 'bluesky', name: 'Bluesky' }
];

const linksExtraPills = [
  { key: 'threads', name: 'Threads' },
  { key: 'x', name: 'X' },
  { key: 'discord', name: 'Discord' },
  { key: 'dribbble', name: 'Dribbble' },
  { key: 'behance', name: 'Behance' },
  { key: 'stackoverflow', name: 'Stack Overflow' },
  { key: 'gitlab', name: 'GitLab' },
  { key: 'quora', name: 'Quora' },
  { key: 'facebook', name: 'Facebook' },
  { key: 'instagram', name: 'Instagram' },
  { key: 'wechat', name: 'WeChat' },
  { key: 'huggingface', name: 'Hugging Face' },
  { key: 'kaggle', name: 'Kaggle' },
  { key: 'youtube', name: 'YouTube' },
  { key: 'tiktok', name: 'TikTok' },
  { key: 'signal', name: 'Signal' },
  { key: 'telegram', name: 'Telegram' },
  { key: 'whatsapp', name: 'WhatsApp' },
  { key: 'paypal', name: 'PayPal' },
  { key: 'producthunt', name: 'Product Hunt' },
  { key: 'artstation', name: 'ArtStation' },
  { key: 'codepen', name: 'CodePen' },
  { key: 'fiverr', name: 'Fiverr' },
  { key: 'hashnode', name: 'Hashnode' },
  { key: 'pluralsight', name: 'Pluralsight' },
  { key: 'researchgate', name: 'ResearchGate' },
  { key: 'imdb', name: 'IMDb' },
  { key: 'qwiklabs', name: 'Qwiklabs' },
  { key: 'googleplay', name: 'Google Play' },
  { key: 'tumblr', name: 'Tumblr' },
  { key: 'tripadvisor', name: 'Tripadvisor' },
  { key: 'yelp', name: 'Yelp' },
  { key: 'slack', name: 'Slack' },
  { key: 'flickr', name: 'Flickr' },
  { key: 'reverbnation', name: 'ReverbNation' },
  { key: 'deviantart', name: 'DeviantArt' },
  { key: 'vimeo', name: 'Vimeo' },
  { key: 'reddit', name: 'Reddit' },
  { key: 'pinterest', name: 'Pinterest' },
  { key: 'blogger', name: 'Blogger' },
  { key: 'spotify', name: 'Spotify' },
  { key: 'bitcoin', name: 'Bitcoin' },
  { key: 'appstore', name: 'App Store' },
  { key: 'wordpress', name: 'WordPress' },
  { key: 'leetcode', name: 'LeetCode' },
  { key: 'codechef', name: 'CodeChef' },
  { key: 'codecademy', name: 'Codecademy' },
  { key: 'codeforces', name: 'Codeforces' },
  { key: 'vsco', name: 'VSCO' },
  { key: 'snapchat', name: 'Snapchat' },
  { key: 'upwork', name: 'Upwork' },
  { key: 'geeksforgeeks', name: 'GeeksforGeeks' },
  { key: 'googlescholar', name: 'Google Scholar' },
  { key: 'line', name: 'LINE' },
  { key: 'tryhackme', name: 'TryHackMe' },
  { key: 'coursera', name: 'Coursera' },
  { key: 'protonmail', name: 'Proton Mail' },
  { key: 'hackerearth', name: 'HackerEarth' },
  { key: 'codewars', name: 'Codewars' },
  { key: 'hackthebox', name: 'Hack The Box' },
  { key: 'bitbucket', name: 'Bitbucket' },
  { key: 'gitea', name: 'Gitea' },
  { key: 'xing', name: 'Xing' },
  { key: '500px', name: '500px' },
  { key: 'devto', name: 'dev.to' },
  { key: 'hackerrank', name: 'HackerRank' },
  { key: 'tencentqq', name: 'Tencent QQ' },
  { key: 'ethereum', name: 'Ethereum' },
  { key: 'stopstalk', name: 'StopStalk' },
  { key: 'substack', name: 'Substack' },
  { key: 'toptal', name: 'Toptal' },
  { key: 'polywork', name: 'Polywork' },
  { key: 'replit', name: 'Replit' },
  { key: 'credly', name: 'Credly' },
  { key: 'figma', name: 'Figma' },
  { key: 'gmail', name: 'Gmail' },
  { key: 'twitch', name: 'Twitch' },
  { key: 'trello', name: 'Trello' },
  { key: 'evernote', name: 'Evernote' },
  { key: 'canva', name: 'Canva' },
  { key: 'etsy', name: 'Etsy' },
  { key: 'googlemaps', name: 'Google Maps' },
  { key: 'googlepodcasts', name: 'Google Podcasts' },
  { key: 'applepodcasts', name: 'Apple Podcasts' },
  { key: 'stitcher', name: 'Stitcher' },
  { key: 'amazonmusic', name: 'Amazon Music' },
  { key: 'iheartradio', name: 'iHeartRadio' },
  { key: 'tunein', name: 'TuneIn' },
  { key: 'pocketcasts', name: 'Pocket Casts' },
  { key: 'pandora', name: 'Pandora' },
  { key: 'youtubemusic', name: 'YouTube Music' },
  { key: 'tidal', name: 'Tidal' },
  { key: 'bandcamp', name: 'Bandcamp' },
  { key: 'scopus', name: 'Scopus' },
  { key: 'disco', name: 'Disco' },
  { key: 'handshake', name: 'Handshake' },
  { key: 'steam', name: 'Steam' },
  { key: 'google', name: 'Google' },
  { key: 'calendly', name: 'Calendly' },
  { key: 'angellist', name: 'AngelList' },
  { key: 'deezer', name: 'Deezer' },
  { key: 'flowcv', name: 'FlowCV' },
  { key: 'khanacademy', name: 'Khan Academy' },
  { key: 'udemy', name: 'Udemy' },
  { key: 'udacity', name: 'Udacity' },
  { key: 'tableau', name: 'Tableau' },
  { key: 'npm', name: 'npm' },
  { key: 'hackerone', name: 'HackerOne' },
  { key: 'freelancer', name: 'Freelancer' },
  { key: 'datacamp', name: 'DataCamp' },
  { key: 'mastodon', name: 'Mastodon' },
  { key: 'letterboxd', name: 'Letterboxd' },
  { key: 'zoom', name: 'Zoom' },
  { key: 'audioboom', name: 'Audioboom' },
  { key: 'soundcloud', name: 'SoundCloud' },
  { key: 'soundcharts', name: 'Soundcharts' },
  { key: 'kakaotalk', name: 'KakaoTalk' },
  { key: 'salesforce', name: 'Salesforce' },
  { key: 'itchio', name: 'itch.io' },
  { key: 'sololearn', name: 'Sololearn' },
  { key: 'opensea', name: 'OpenSea' },
  { key: 'devpost', name: 'Devpost' },
  { key: 'linktree', name: 'Linktree' },
  { key: 'codingame', name: 'CodinGame' },
  { key: 'codingninjas', name: 'Coding Ninjas' },
  { key: 'unsplash', name: 'Unsplash' },
  { key: 'indeed', name: 'Indeed' }
];

const labelsMap = {
  passport: 'Passport or Id',
  nationality: 'Nationality',
  dob: 'Date of Birth',
  visa: 'Visa',
  availability: 'Availability',
  gender: 'Gender',
  disability: 'Disability',
  workmode: 'Work mode',
  relocation: 'Relocation',
  expectedsalary: 'Expected salary',
  secondphone: 'Second phone',
  drivinglicense: 'Driving License',
  securityclearance: 'Security clearance',
  marital: 'Marital status',
  military: 'Military Service',
  smoking: 'Smoking',
  height: 'Height',
  weight: 'Weight',
  website: 'Website',
  portfolio: 'Portfolio',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  gitbook: 'GitBook',
  medium: 'Medium',
  orcid: 'ORCID',
  skype: 'Skype',
  bluesky: 'Bluesky',
  threads: 'Threads',
  x: 'X',
  discord: 'Discord',
  dribbble: 'Dribbble',
  behance: 'Behance',
  stackoverflow: 'Stack Overflow',
  gitlab: 'GitLab',
  quora: 'Quora',
  facebook: 'Facebook',
  instagram: 'Instagram',
  wechat: 'WeChat',
  huggingface: 'Hugging Face',
  kaggle: 'Kaggle',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  signal: 'Signal',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  paypal: 'PayPal',
  producthunt: 'Product Hunt',
  artstation: 'ArtStation',
  codepen: 'CodePen',
  fiverr: 'Fiverr',
  hashnode: 'Hashnode',
  pluralsight: 'Pluralsight',
  researchgate: 'ResearchGate',
  imdb: 'IMDb',
  qwiklabs: 'Qwiklabs',
  googleplay: 'Google Play',
  tumblr: 'Tumblr',
  tripadvisor: 'Tripadvisor',
  yelp: 'Yelp',
  slack: 'Slack',
  flickr: 'Flickr',
  reverbnation: 'ReverbNation',
  deviantart: 'DeviantArt',
  vimeo: 'Vimeo',
  reddit: 'Reddit',
  pinterest: 'Pinterest',
  blogger: 'Blogger',
  spotify: 'Spotify',
  bitcoin: 'Bitcoin',
  appstore: 'App Store',
  wordpress: 'WordPress',
  leetcode: 'LeetCode',
  codechef: 'CodeChef',
  codecademy: 'Codecademy',
  codeforces: 'Codeforces',
  vsco: 'VSCO',
  snapchat: 'Snapchat',
  upwork: 'Upwork',
  geeksforgeeks: 'GeeksforGeeks',
  googlescholar: 'Google Scholar',
  line: 'LINE',
  tryhackme: 'TryHackMe',
  coursera: 'Coursera',
  protonmail: 'Proton Mail',
  hackerearth: 'HackerEarth',
  codewars: 'Codewars',
  hackthebox: 'Hack The Box',
  bitbucket: 'Bitbucket',
  gitea: 'Gitea',
  xing: 'Xing',
  '500px': '500px',
  devto: 'dev.to',
  hackerrank: 'HackerRank',
  tencentqq: 'Tencent QQ',
  ethereum: 'Ethereum',
  stopstalk: 'StopStalk',
  substack: 'Substack',
  toptal: 'Toptal',
  polywork: 'Polywork',
  replit: 'Replit',
  credly: 'Credly',
  figma: 'Figma',
  gmail: 'Gmail',
  twitch: 'Twitch',
  trello: 'Trello',
  evernote: 'Evernote',
  canva: 'Canva',
  etsy: 'Etsy',
  googlemaps: 'Google Maps',
  googlepodcasts: 'Google Podcasts',
  applepodcasts: 'Apple Podcasts',
  stitcher: 'Stitcher',
  amazonmusic: 'Amazon Music',
  iheartradio: 'iHeartRadio',
  tunein: 'TuneIn',
  pocketcasts: 'Pocket Casts',
  pandora: 'Pandora',
  youtubemusic: 'YouTube Music',
  tidal: 'Tidal',
  bandcamp: 'Bandcamp',
  scopus: 'Scopus',
  disco: 'Disco',
  handshake: 'Handshake',
  steam: 'Steam',
  google: 'Google',
  calendly: 'Calendly',
  angellist: 'AngelList',
  deezer: 'Deezer',
  flowcv: 'FlowCV',
  khanacademy: 'Khan Academy',
  udemy: 'Udemy',
  udacity: 'Udacity',
  tableau: 'Tableau',
  npm: 'npm',
  hackerone: 'HackerOne',
  freelancer: 'Freelancer',
  datacamp: 'DataCamp',
  mastodon: 'Mastodon',
  letterboxd: 'Letterboxd',
  zoom: 'Zoom',
  audioboom: 'Audioboom',
  soundcloud: 'SoundCloud',
  soundcharts: 'Soundcharts',
  kakaotalk: 'KakaoTalk',
  salesforce: 'Salesforce',
  itchio: 'itch.io',
  sololearn: 'Sololearn',
  opensea: 'OpenSea',
  devpost: 'Devpost',
  linktree: 'Linktree',
  codingame: 'CodinGame',
  codingninjas: 'Coding Ninjas',
  unsplash: 'Unsplash',
  indeed: 'Indeed'
};

const sectionTypes = [
  { type: 'summary', label: 'Summary' },
  { type: 'education', label: 'Education' },
  { type: 'experience', label: 'Professional Experience' },
  { type: 'skills', label: 'Skills' },
  { type: 'languages', label: 'Languages' },
  { type: 'certificates', label: 'Certificates' },
  { type: 'interests', label: 'Interests' },
  { type: 'projects', label: 'Projects' },
  { type: 'courses', label: 'Courses' },
  { type: 'awards', label: 'Awards' },
  { type: 'organisations', label: 'Organisations' },
  { type: 'publications', label: 'Publications' },
  { type: 'references', label: 'References' },
  { type: 'declaration', label: 'Declaration' },
  { type: 'custom', label: 'Custom Section' }
];

const defaultResumeData = {
  name: "Your name",
  role: "Profession/Role",
  email: "email@example.com",
  phone: "Phone",
  address: "Address",
  photo: "",
  extraDetails: {},
  sections: []
};

// Custom RTE editor component
function RichTextEditor({ value, onChange, placeholder, accentColor = '#EEC30C' }) {
  const editorRef = useRef(null);
  const [activeCmds, setActiveCmds] = useState({});
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [selectionRange, setSelectionRange] = useState(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const updateActiveCommands = () => {
    const cmds = ['bold', 'italic', 'underline', 'insertUnorderedList', 'insertOrderedList', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'];
    const active = {};
    cmds.forEach(cmd => {
      try {
        active[cmd] = document.queryCommandState(cmd);
      } catch (e) {}
    });
    setActiveCmds(active);
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    updateActiveCommands();
  };

  const executeCommand = (command, val = null) => {
    document.execCommand(command, false, val);
    handleInput();
    editorRef.current?.focus();
  };

  const handleLinkClick = () => {
    // Check if there is already a link in the editor
    const existingLink = editorRef.current?.querySelector('a');
    if (existingLink) {
      setLinkUrl(existingLink.href);
      setShowLinkInput(true);
      return;
    }

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSelectionRange(selection.getRangeAt(0));
    }
    setShowLinkInput(!showLinkInput);
  };

  const applyLink = () => {
    const existingLink = editorRef.current?.querySelector('a');
    
    if (existingLink) {
      if (linkUrl && linkUrl.trim() !== '') {
        existingLink.href = linkUrl;
      } else {
        // If url is cleared, remove the link wrapper but keep the text
        const parent = existingLink.parentNode;
        while(existingLink.firstChild) {
           parent.insertBefore(existingLink.firstChild, existingLink);
        }
        parent.removeChild(existingLink);
      }
      handleInput();
    } else {
      if (selectionRange) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(selectionRange);
        if (linkUrl && linkUrl.trim() !== '') {
          if (selectionRange.collapsed) {
            // Insert a FontAwesome icon that acts like a single character and changes color on hover
            executeCommand('insertHTML', ` <a data-href="${linkUrl}" class="empty-link hover-yellow" contenteditable="false" title="Remove link"><i class="fa-solid fa-link" style="color: #aaa; transition: color 0.2s;"></i></a>&nbsp;`);
          } else {
            executeCommand('createLink', linkUrl);
          }
        }
      } else if (linkUrl && linkUrl.trim() !== '') {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        
        executeCommand('insertHTML', ` <a data-href="${linkUrl}" class="empty-link hover-yellow" contenteditable="false" title="Remove link"><i class="fa-solid fa-link" style="color: #aaa; transition: color 0.2s;"></i></a>&nbsp;`);
      }
    }
    setShowLinkInput(false);
    setLinkUrl('');
  };


  return (
    <div className="rte-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="rte-toolbar" style={{ display: 'flex', gap: '0.5rem', padding: '0.8rem', background: '#1a1a1a', borderBottom: '1px solid #333', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', alignItems: 'center' }}>
        {[
          { cmd: 'bold', icon: 'fa-bold', title: 'Bold' },
          { cmd: 'italic', icon: 'fa-italic', title: 'Italic' },
          { cmd: 'underline', icon: 'fa-underline', title: 'Underline' },
          { cmd: 'insertUnorderedList', icon: 'fa-list-ul', title: 'Bullet List' },
          { cmd: 'insertOrderedList', icon: 'fa-list-ol', title: 'Numbered List' },
          { cmd: 'createLink', icon: 'fa-link', title: 'Link', action: handleLinkClick }
        ].map(btn => {
          const isActive = activeCmds[btn.cmd];
          return (
            <button 
              key={btn.cmd} 
              type="button" 
              onMouseDown={(e) => { e.preventDefault(); btn.action ? btn.action() : executeCommand(btn.cmd); }} 
              title={btn.title} 
              style={{ 
                background: isActive ? accentColor : 'transparent', 
                border: 'none', 
                color: isActive ? '#000' : '#ccc', 
                cursor: 'pointer', 
                padding: '0.4rem', 
                borderRadius: '4px', 
                fontSize: '1rem', 
                transition: 'all 0.2s' 
              }} 
              onMouseOver={e => !isActive && (e.currentTarget.style.background = '#333')} 
              onMouseOut={e => !isActive && (e.currentTarget.style.background = 'transparent')}
            >
              <i className={`fa-solid ${btn.icon}`}></i>
            </button>
          );
        })}
        
        <div style={{ width: '1px', height: '20px', background: '#444', margin: '0 0.5rem' }}></div>
        
        {[
          { cmd: 'justifyLeft', icon: 'fa-align-left', title: 'Align Left' },
          { cmd: 'justifyCenter', icon: 'fa-align-center', title: 'Align Center' },
          { cmd: 'justifyRight', icon: 'fa-align-right', title: 'Align Right' },
          { cmd: 'justifyFull', icon: 'fa-align-justify', title: 'Justify' }
        ].map(btn => {
          const isActive = activeCmds[btn.cmd];
          return (
            <button 
              key={btn.cmd} 
              type="button" 
              onMouseDown={(e) => { e.preventDefault(); executeCommand(btn.cmd); }} 
              title={btn.title} 
              style={{ 
                background: isActive ? accentColor : 'transparent', 
                border: 'none', 
                color: isActive ? '#000' : '#ccc', 
                cursor: 'pointer', 
                padding: '0.4rem', 
                borderRadius: '4px', 
                fontSize: '1rem', 
                transition: 'all 0.2s' 
              }} 
              onMouseOver={e => !isActive && (e.currentTarget.style.background = '#333')} 
              onMouseOut={e => !isActive && (e.currentTarget.style.background = 'transparent')}
            >
              <i className={`fa-solid ${btn.icon}`}></i>
            </button>
          );
        })}
      </div>
      
      {showLinkInput && (
        <div style={{ padding: '0.5rem 0.8rem', background: '#2a2a2a', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <i className="fa-solid fa-link" style={{ color: '#ccc', fontSize: '0.85rem' }}></i>
          <input 
            type="text" 
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            placeholder="https://"
            style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '0.9rem' }}
            onKeyDown={e => e.key === 'Enter' && applyLink()}
          />
          <button type="button" onClick={applyLink} style={{ background: accentColor, color: '#000', border: 'none', borderRadius: '4px', padding: '0.3rem 0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-solid fa-check"></i>
          </button>
        </div>
      )}
      
      <div
        ref={editorRef}
        className="rte-content"
        contentEditable
        onInput={handleInput}
        onClickCapture={(e) => {
          const emptyLink = e.target.closest('.empty-link');
          if (emptyLink) {
            e.preventDefault();
            e.stopPropagation();
            emptyLink.remove();
            handleInput();
          }
        }}
        onKeyUp={updateActiveCommands}
        onMouseUp={updateActiveCommands}
        placeholder={placeholder}
        style={{ minHeight: '100px', outline: 'none', background: '#0d0d0d', padding: '10px', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', border: '1px solid #333', borderTop: 'none', color: '#fff', fontSize: '0.9rem' }}
      />
    </div>
  );
}

// FAQ Item with accordion toggle for landing page
function RCFaqItem({ question, answer }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`faq-item feature-card-custom ${open ? 'active' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="faq-question">
        <h4>{question}</h4>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

function SchoolInputWithLink({ value, onChange, urlValue, onUrlChange, placeholder, isEducation, accentColor }) {
  const [showLink, setShowLink] = useState(false);
  const [tempUrl, setTempUrl] = useState(urlValue || '');
  const inputRef = React.useRef(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input 
          ref={inputRef}
          type="text" 
          className="form-input-dark" 
          style={{ paddingRight: urlValue ? '80px' : '70px', width: '100%', boxSizing: 'border-box' }}
          value={urlValue ? value + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' : value} 
          onChange={(e) => {
             const newVal = e.target.value;
             if (urlValue) {
               if (!newVal.endsWith('\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0')) {
                 onUrlChange('');
                 setTempUrl('');
                 onChange(newVal.replace(/\u00A0+$/, ''));
               } else {
                 onChange(newVal.slice(0, -10));
               }
             } else {
               onChange(newVal);
             }
          }} 
          placeholder={placeholder} 
        />
        {urlValue && (
          <div style={{
            position: 'absolute',
            left: 0, top: 0, bottom: 0,
            pointerEvents: 'none',
            display: 'flex', alignItems: 'center',
            paddingLeft: '0.8rem',
            color: 'transparent',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: 'calc(100% - 75px)',
            fontFamily: 'inherit',
            fontSize: '0.9rem'
          }}>
            <span style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>{value}</span>
            <div 
              title="Remove link"
              onClick={(e) => {
                e.stopPropagation();
                onUrlChange('');
                setTempUrl('');
                if (inputRef.current) inputRef.current.focus();
              }}
              style={{
                pointerEvents: 'auto',
                cursor: 'pointer',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                padding: '0 4px'
              }}
            >
              <i className="fa-solid fa-link hover-yellow" style={{ color: '#aaa', transition: 'color 0.2s' }}></i>
            </div>
          </div>
        )}
        <button 
          type="button"
          title={urlValue ? `Linked to: ${urlValue}` : 'Add a link'}
          onClick={() => {
            setTempUrl(urlValue || '');
            setShowLink(!showLink);
          }}
          style={{
            position: 'absolute', right: '6px', background: urlValue ? accentColor : 'transparent', color: urlValue ? '#000' : '#ccc', 
            border: urlValue ? 'none' : '1px solid #444', padding: '4px 8px', borderRadius: '4px',
            fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
            transition: 'all 0.2s'
          }}
        >
          <i className="fa-solid fa-link"></i> Link
        </button>
      </div>
      {showLink && (
        <div style={{ padding: '0.5rem 0.8rem', background: '#222', display: 'flex', gap: '0.5rem', alignItems: 'center', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', marginTop: '2px', border: '1px solid #333' }}>
          <i className="fa-solid fa-link" style={{ color: '#ccc', fontSize: '0.85rem' }}></i>
          <input 
            type="text" 
            value={tempUrl}
            onChange={e => setTempUrl(e.target.value)}
            placeholder="https://"
            style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '0.85rem' }}
          />
          <button 
            type="button" 
            onClick={() => {
              onUrlChange(tempUrl.trim());
              setShowLink(false);
              setTimeout(() => {
                if (inputRef.current) {
                  inputRef.current.focus();
                  inputRef.current.selectionStart = inputRef.current.selectionEnd = inputRef.current.value.length;
                }
              }, 10);
            }} 
            style={{ background: accentColor, border: 'none', borderRadius: '4px', padding: '0.4rem 0.6rem', cursor: 'pointer', color: '#000' }}
          >
            <i className="fa-solid fa-check"></i>
          </button>
        </div>
      )}
    </div>
  );
}

function CustomDatePicker({ value, onChange, placeholder, isEnd, accentColor = '#EEC30C' }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentMonth = value && value !== 'Present' ? value.split('/')[0] : '';
  const currentYear = value && value !== 'Present' ? value.split('/')[1] : '';

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = Array.from({length: 2026 - 1950 + 1}, (_, i) => (2026 - i).toString());

  const handleMonthClick = (m) => {
    const monthNum = String(months.indexOf(m) + 1).padStart(2, '0');
    if (currentYear) onChange(`${monthNum}/${currentYear}`);
    else onChange(`${monthNum}/`);
  };

  const handleYearClick = (y) => {
    if (currentMonth) onChange(`${currentMonth}/${y}`);
    else onChange(`/${y}`);
  };

  const isPresent = value === 'Present';

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input 
          type="text" 
          className="form-input-dark" 
          value={value} 
          onFocus={() => setIsOpen(true)}
          onChange={(e) => onChange(e.target.value)} 
          placeholder={placeholder} 
          style={{ paddingRight: value ? '28px' : '10px' }}
        />
        {value && (
          <i 
            className="fa-solid fa-xmark" 
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
              setIsOpen(false);
            }}
            style={{ position: 'absolute', right: '10px', cursor: 'pointer', color: '#888', fontSize: '0.9rem', padding: '4px' }}
          ></i>
        )}
      </div>
      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 100, 
          background: '#fff', border: '1px solid #ccc', borderRadius: '8px', 
          padding: '10px', width: '360px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginTop: '4px', color: '#333', display: 'flex', flexDirection: 'column'
        }}>
          {isEnd && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px', fontWeight: 'bold' }}>
                <input 
                  type="checkbox" 
                  checked={isPresent} 
                  onChange={(e) => {
                    if (e.target.checked) onChange('Present');
                    else onChange('');
                  }} 
                  style={{ accentColor }}
                />
                Present (Current)
              </label>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: '10px', opacity: isPresent ? 0.5 : 1, pointerEvents: isPresent ? 'none' : 'auto' }}>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px' }}>
              {months.map(m => {
                const monthNum = String(months.indexOf(m) + 1).padStart(2, '0');
                const isSelected = currentMonth === monthNum;
                return (
                  <div key={m} onClick={() => handleMonthClick(m)} style={{ padding: '6px 4px', textAlign: 'center', cursor: 'pointer', borderRadius: '4px', fontSize: '0.85rem', background: isSelected ? accentColor : 'transparent', color: isSelected ? '#fff' : '#333', fontWeight: isSelected ? 'bold' : 'normal' }}>
                    {m}
                  </div>
                );
              })}
            </div>
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px', maxHeight: '150px', overflowY: 'auto' }}>
              {years.map(y => {
                const isSelected = currentYear === y;
                return (
                  <div key={y} onClick={() => handleYearClick(y)} style={{ padding: '4px 2px', textAlign: 'center', cursor: 'pointer', borderRadius: '4px', fontSize: '0.8rem', background: isSelected ? accentColor : 'transparent', color: isSelected ? '#fff' : '#333', fontWeight: isSelected ? 'bold' : 'normal' }}>
                    {y}
                  </div>
                );
              })}
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} style={{ marginTop: '10px', background: accentColor, color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Done</button>
        </div>
      )}
    </div>
  );
}

function CustomAwardsSelect({ options, value, onChange, placeholder, accentColor = '#EEC30C' }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <style>{`
        .custom-awards-scroll::-webkit-scrollbar { width: 4px; }
        .custom-awards-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-awards-scroll::-webkit-scrollbar-thumb { background: #555; border-radius: 4px; }
        .custom-awards-scroll::-webkit-scrollbar-thumb:hover { background: #777; }
      `}</style>
      <div 
        className="form-input-dark" 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.45rem 0.6rem' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        {value ? (
          <i 
            className="fa-solid fa-xmark" 
            onClick={(e) => { e.stopPropagation(); onChange(''); setIsOpen(false); }}
            style={{ fontSize: '0.9rem', color: '#888', padding: '2px' }}
          ></i>
        ) : (
          <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.8rem', color: '#888' }}></i>
        )}
      </div>
      {isOpen && (
        <div 
          className="custom-awards-scroll"
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, 
            background: '#222', border: '1px solid #444', borderRadius: '4px', 
            marginTop: '4px', color: '#fff', maxHeight: '200px', overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)', padding: '4px 0'
          }}
        >
          {options.map(opt => (
            <div 
              key={opt}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              onMouseEnter={(e) => { e.target.style.background = accentColor; e.target.style.color = '#000'; }}
              onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = '#fff'; }}
              style={{
                padding: '6px 12px', cursor: 'pointer', fontSize: '0.85rem',
                background: 'transparent', color: '#fff'
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function LanguageLevelSelect({ value, onChange, accentColor, level1, level2, level3, level4, level5 }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: 'Level 1', label: level1 || 'Basic' },
    { value: 'Level 2', label: level2 || 'Conversational' },
    { value: 'Level 3', label: level3 || 'Proficient' },
    { value: 'Level 4', label: level4 || 'Fluent' },
    { value: 'Level 5', label: level5 || 'Native/Bilingual' }
  ];
  
  const selectedOption = options.find(o => o.value === value);
  const displayValue = selectedOption ? selectedOption.label : value;
  
  return (
    <div className="custom-select-wrapper" style={{ position: 'relative', marginBottom: '1rem' }}>
      <div 
        className="form-input-dark" 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayValue || 'Select language level'}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {value ? (
            <i 
              className="fa-solid fa-xmark" 
              style={{ color: '#aaa', fontSize: '1em', cursor: 'pointer', padding: '0 4px' }}
              onClick={(e) => { e.stopPropagation(); onChange(''); setIsOpen(false); }}
            ></i>
          ) : (
            <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#aaa', fontSize: '0.85em' }}></i>
          )}
        </div>
      </div>
      {isOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9 }} onClick={() => setIsOpen(false)}></div>
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, 
            backgroundColor: '#1f1f1f', border: '1px solid #333', 
            borderRadius: '6px', marginTop: '4px', zIndex: 10,
            overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            {options.map(opt => (
              <div 
                key={opt.value}
                style={{
                  padding: '7px 12px', cursor: 'pointer', fontSize: '0.9em',
                  backgroundColor: value === opt.value ? accentColor : 'transparent',
                  color: value === opt.value ? '#000' : '#fff',
                  transition: 'all 0.2s',
                  fontWeight: value === opt.value ? '600' : '400'
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = accentColor; e.target.style.color = '#000'; }}
                onMouseLeave={(e) => { 
                  e.target.style.backgroundColor = value === opt.value ? accentColor : 'transparent'; 
                  e.target.style.color = value === opt.value ? '#000' : '#fff'; 
                }}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SkillLevelSelect({ value, onChange, accentColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const options = ['Beginner', 'Amateur', 'Competent', 'Proficient', 'Expert'];
  
  return (
    <div className="custom-select-wrapper" style={{ position: 'relative' }}>
      <div 
        className="form-input-dark" 
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || 'Select skill level'}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {value ? (
            <i 
              className="fa-solid fa-xmark" 
              style={{ color: '#aaa', fontSize: '1em', cursor: 'pointer', padding: '0 4px' }}
              onClick={(e) => { e.stopPropagation(); onChange(''); setIsOpen(false); }}
            ></i>
          ) : (
            <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} style={{ color: '#aaa', fontSize: '0.85em' }}></i>
          )}
        </div>
      </div>
      {isOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 9 }} onClick={() => setIsOpen(false)}></div>
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, 
            backgroundColor: '#1f1f1f', border: '1px solid #333', 
            borderRadius: '6px', marginTop: '4px', zIndex: 10,
            overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}>
            {options.map(opt => (
              <div 
                key={opt}
                style={{
                  padding: '7px 12px', cursor: 'pointer', fontSize: '0.9em',
                  backgroundColor: value === opt ? accentColor : 'transparent',
                  color: value === opt ? '#000' : '#fff',
                  transition: 'all 0.2s',
                  fontWeight: value === opt ? '600' : '400'
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = accentColor; e.target.style.color = '#000'; }}
                onMouseLeave={(e) => { 
                  e.target.style.backgroundColor = value === opt ? accentColor : 'transparent'; 
                  e.target.style.color = value === opt ? '#000' : '#fff'; 
                }}
                onClick={() => { onChange(opt); setIsOpen(false); }}
              >
                {opt}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ResumeCustomizer() {
  // Wizard steps: 'landing' | 'upload' | 'editor'
  const [step, setStep] = useState(() => { try { const s = sessionStorage.getItem('mockb_step'); return s ? JSON.parse(s) : 'landing'; } catch(e) { return 'landing'; } });
  const [expandedCustomizations, setExpandedCustomizations] = useState({});
  const [nameCreativeFont, setNameCreativeFont] = useState('Pacifico');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Upload Wizard states
  const [uploadChoice, setUploadChoice] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  // Editor states
  const [resumeData, setResumeData] = useState(() => { try { const s = sessionStorage.getItem('mockb_resumeData'); return s ? JSON.parse(s) : defaultResumeData; } catch(e) { return defaultResumeData; } });
  const [activeTab, setActiveTab] = useState(() => { try { const s = sessionStorage.getItem('mockb_activeTab'); return s ? JSON.parse(s) : 'content'; } catch(e) { return 'content'; } }); // overview | content | customize | ai | rearrange | templates

  const [draggedLayoutSectionId, setDraggedLayoutSectionId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  const handleLayoutSectionDragStart = (e, id) => {
    setDraggedLayoutSectionId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', id);
    setTimeout(() => {
      if (e.target) e.target.style.opacity = '0.4';
    }, 0);
    const container = document.getElementById('customize-section-layout-list');
    if (container) container.classList.add('dragging-active');
  };

  const handleLayoutSectionDragEnd = (e) => {
    if (e.target) e.target.style.opacity = '1';
    setDraggedLayoutSectionId(null);
    setDragOverId(null);
    const container = document.getElementById('customize-section-layout-list');
    if (container) container.classList.remove('dragging-active');
  };

  const handleLayoutSectionDragOver = (e, id) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (id && draggedLayoutSectionId && id !== draggedLayoutSectionId) {
      setDragOverId(id);
    }
  };

  const handleLayoutSectionDrop = (e, targetId, targetCol) => {
    e.preventDefault();
    e.stopPropagation();
    const styleOpt = e.target.closest('.style-option');
    if (styleOpt) styleOpt.style.opacity = '1';
    
    setDragOverId(null);
    if (!draggedLayoutSectionId) return;

    if (draggedLayoutSectionId === 'pagebreak') {
      const pb = { id: 'pb_' + Date.now(), type: 'pagebreak', title: 'Page break', column: targetCol };
      setResumeData(prev => {
        const newData = { ...prev, sections: [...prev.sections] };
        const targetIdx = newData.sections.findIndex(s => s.id === targetId);
        if (targetIdx !== -1) {
          newData.sections.splice(targetIdx, 0, pb);
        } else {
          newData.sections.push(pb);
        }
        return newData;
      });
      return;
    }

    if (draggedLayoutSectionId === targetId) return;

    setResumeData(prev => {
      const newData = { ...prev, sections: [...prev.sections] };
      const srcIdx = newData.sections.findIndex(s => s.id === draggedLayoutSectionId);
      const targetIdx = newData.sections.findIndex(s => s.id === targetId);
      if (srcIdx === -1 || targetIdx === -1) return newData;

      const [item] = newData.sections.splice(srcIdx, 1);
      item.column = targetCol;

      const newTargetIdx = newData.sections.findIndex(s => s.id === targetId);
      newData.sections.splice(newTargetIdx, 0, item);
      return newData;
    });
  };

  const handleLayoutColumnDrop = (e, targetCol) => {
    e.preventDefault();
    if (!draggedLayoutSectionId) return;

    if (draggedLayoutSectionId === 'pagebreak') {
      const pb = { id: 'pb_' + Date.now(), type: 'pagebreak', title: 'Page break', column: targetCol };
      setResumeData(prev => ({
        ...prev,
        sections: [...prev.sections, pb]
      }));
      return;
    }

    setResumeData(prev => {
      const newData = { ...prev, sections: [...prev.sections] };
      const srcIdx = newData.sections.findIndex(s => s.id === draggedLayoutSectionId);
      if (srcIdx === -1) return newData;

      const item = newData.sections[srcIdx];
      item.column = targetCol;

      newData.sections.splice(srcIdx, 1);
      newData.sections.push(item);
      return newData;
    });
  };

  const handleLayoutMainContainerDrop = (e) => {
    e.preventDefault();
    if (!draggedLayoutSectionId) return;
    if (layoutConfig.columns !== 'one') return; // Handled by col drops

    if (draggedLayoutSectionId === 'pagebreak') {
      const pb = { id: 'pb_' + Date.now(), type: 'pagebreak', title: 'Page break', column: 'left' };
      setResumeData(prev => ({
        ...prev,
        sections: [...prev.sections, pb]
      }));
      return;
    }

    setResumeData(prev => {
      const newData = { ...prev, sections: [...prev.sections] };
      const srcIdx = newData.sections.findIndex(s => s.id === draggedLayoutSectionId);
      if (srcIdx === -1) return newData;

      const [item] = newData.sections.splice(srcIdx, 1);
      item.column = 'left';
      newData.sections.push(item);
      return newData;
    });
  };

  const renderLayoutSectionItem = (sec, col) => (
    <React.Fragment key={sec.id}>
      {dragOverId === sec.id && (
        <div 
          onDragOver={(e) => handleLayoutSectionDragOver(e, sec.id)}
          onDrop={(e) => handleLayoutSectionDrop(e, sec.id, col)}
          style={{ 
            height: '45px', 
            background: 'rgba(238, 195, 12, 0.1)', 
            border: '2px dashed #EEC30C', 
            borderRadius: '8px', 
            marginBottom: '0.4rem',
            animation: 'expandDown 0.2s ease-out forwards'
          }} 
        />
      )}
      <div
        draggable="true"
        onDragStart={(e) => handleLayoutSectionDragStart(e, sec.id)}
        onDragEnd={handleLayoutSectionDragEnd}
        onDragOver={(e) => handleLayoutSectionDragOver(e, sec.id)}
        onDrop={(e) => handleLayoutSectionDrop(e, sec.id, col)}
        className="style-option"
        style={{
          padding: '0.8rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          cursor: 'grab',
          background: sec.type === 'pagebreak' ? 'transparent' : '#121212',
          border: sec.type === 'pagebreak' ? '1px dashed #555' : '1px solid #333',
          borderRadius: '8px',
          marginBottom: '0.4rem',
          transition: 'transform 0.2s ease',
          boxSizing: 'border-box'
        }}
      >
      <i className="fa-solid fa-grip-vertical" style={{ color: '#555', fontSize: '0.85rem' }}></i>
      {sec.type === 'pagebreak' && <i className="fa-solid fa-scissors" style={{ color: '#888', fontSize: '0.9rem', width: '16px', textAlign: 'center' }}></i>}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ccc' }}>{sec.title}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (sec.type === 'pagebreak') {
              setResumeData(prev => ({
                ...prev,
                sections: prev.sections.filter(s => s.id !== sec.id)
              }));
            } else {
              setExpandedAccordions(prev => ({ ...prev, [sec.id]: !prev[sec.id] }));
              setActiveTab('content');
            }
          }}
          style={{ background: 'transparent', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {sec.type === 'pagebreak' ? <i className="fa-solid fa-trash-can" style={{ fontSize: '0.85rem' }}></i> : <i className="fa-solid fa-pen" style={{ fontSize: '0.75rem' }}></i>}
        </button>
      </div>
    </div>
    </React.Fragment>
  );
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [linkSearchQuery, setLinkSearchQuery] = useState('');
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [selectedResumeVersion, setSelectedResumeVersion] = useState('Resume 1');
  const [showExtraPills, setShowExtraPills] = useState(false);
  const [showExtraLinksPills, setShowExtraLinksPills] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState({});
  const [activeEditIndex, setActiveEditIndex] = useState({}); // Stores which entry index is in edit mode per section ID
  const [signatureModal, setSignatureModal] = useState({ isOpen: false, sectionId: null, entryIndex: null });
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [sectionHeadingEditMode, setSectionHeadingEditMode] = useState({}); // Stores { [sectionId]: true/false }
  const [hiddenItems, setHiddenItems] = useState({}); // { [sectionId]: { [idx]: true } } for hidden entries
  const [sectionIcons, setSectionIcons] = useState({}); // { [sectionId]: iconClass }
  const [showIconPicker, setShowIconPicker] = useState({}); // { [sectionId]: true/false }

  // History stack
  const [historyStack, setHistoryStack] = useState([JSON.stringify(defaultResumeData)]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Customization Settings states
  const [fontFamily, setFontFamily] = useState('Satoshi');
  const [hoveredFont, setHoveredFont] = useState(null);
  const [activeFontCat, setActiveFontCat] = useState('sans');
  const [footerFocus, setFooterFocus] = useState('left');
  const [fontSize, setFontSize] = useState(11); // pt
  const [fullNameFontSizeOffset, setFullNameFontSizeOffset] = useState(12.5);
  const [profTitleFontSizeOffset, setProfTitleFontSizeOffset] = useState(5);
  const [sectionHeadingFontSizeOffset, setSectionHeadingFontSizeOffset] = useState(2);
  const [entryHeaderFontSizeOffset, setEntryHeaderFontSizeOffset] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [lrMargin, setLrMargin] = useState(15); // mm
  const [tbMargin, setTbMargin] = useState(15); // mm
  const [entrySpacing, setEntrySpacing] = useState(2); // 0-5 scale
  const [accentColor, setAccentColor] = useState('#EEC30C');
  const [headingStyle, setHeadingStyle] = useState('full-underline');
  const [headingTransform, setHeadingTransform] = useState('uppercase');
  const [headingSize, setHeadingSize] = useState(12); // pt
  const [showBorders, setShowBorders] = useState(false);
  const [showPageNumbers, setShowPageNumbers] = useState(true);
  const [showPrintFooter, setShowPrintFooter] = useState(false);

  // New customization states from editor.html
  const [entryLayout, setEntryLayout] = useState(1); // 1 | 2 | 3 | 4
  const [entryColWidth, setEntryColWidth] = useState('auto'); // auto | manual
  const [manualLeftPercent, setManualLeftPercent] = useState(40);
  const [manualRightPercent, setManualRightPercent] = useState(60);
  const [titleSize, setTitleSize] = useState('m'); // s | m | l
  const [subtitleStyle, setSubtitleStyle] = useState('normal'); // normal | bold | italic
  const [subtitlePlacement, setSubtitlePlacement] = useState('same'); // same | next
  const [descIndent, setDescIndent] = useState(false);
  const [listStyle, setListStyle] = useState('bullet'); // bullet | hyphen

  const [footerPageNumbers, setFooterPageNumbers] = useState(true);
  const [footerEmail, setFooterEmail] = useState(false);
  const [footerName, setFooterName] = useState(false);
  const [footerCustom, setFooterCustom] = useState(false);
  const [footerLeftCol, setFooterLeftCol] = useState('{{name}}');
  const [footerCenterCol, setFooterCenterCol] = useState('');
  const [footerRightCol, setFooterRightCol] = useState('{{page}} / {{pages}}');

  const [colorMode, setColorMode] = useState('basic'); // basic | advanced | border
  const [colorSubTab, setColorSubTab] = useState('accent'); // accent | multi | image
  const [applyAccentToName, setApplyAccentToName] = useState(false);
  const [applyAccentToDots, setApplyAccentToDots] = useState(false);
  const [applyAccentToJob, setApplyAccentToJob] = useState(false);
  const [applyAccentToDates, setApplyAccentToDates] = useState(false);
  const [applyAccentToHeadings, setApplyAccentToHeadings] = useState(false);
  const [applyAccentToSubtitle, setApplyAccentToSubtitle] = useState(false);
  const [applyAccentToLines, setApplyAccentToLines] = useState(false);
  const [applyAccentToLinkIcons, setApplyAccentToLinkIcons] = useState(false);
  const [applyAccentToHeaderIcons, setApplyAccentToHeaderIcons] = useState(false);

  const [multiTextColor, setMultiTextColor] = useState('#000000');
  const [multiBgColor, setMultiBgColor] = useState('#ffffff');
  const [multiAccentColor, setMultiAccentColor] = useState('#1e3a8a');

  const [advTextColor, setAdvTextColor] = useState('#ffffff');
  const [advBgColor, setAdvBgColor] = useState('#444444');
  const [advAccentColor, setAdvAccentColor] = useState('#1e3a8a');
  const [advBodyTextColor, setAdvBodyTextColor] = useState('#000000');
  const [advBodyBgColor, setAdvBodyBgColor] = useState('#ffffff');
  const [advBodyAccentColor, setAdvBodyAccentColor] = useState('#cccccc');

  const [headerBgImage, setHeaderBgImage] = useState(null);
  const [borderBgImage, setBorderBgImage] = useState(null);

  const [borderSize, setBorderSize] = useState('8px'); // 4px | 8px | 16px
  const [borderTop, setBorderTop] = useState(true);
  const [borderBottom, setBorderBottom] = useState(true);
  const [borderLeft, setBorderLeft] = useState(true);
  const [borderRight, setBorderRight] = useState(true);

  const [headingIcons, setHeadingIcons] = useState('none'); // none | outline | filled
  const [linkUnderline, setLinkUnderline] = useState(true);
  const [linkBlueColor, setLinkBlueColor] = useState(true);
  const [linkIcon, setLinkIcon] = useState(false);
  const [advLinkSettings, setAdvLinkSettings] = useState({
    underline: { email: true, phone: true, location: true },
    blueColor: { email: true, phone: true, location: true },
    icon: { email: false, phone: false, location: false }
  });

  const [headerAlignment, setHeaderAlignment] = useState('left'); // left | center
  const [headerArrangement, setHeaderArrangement] = useState('horizontal'); // stacked | horizontal | grouped
  const [headerIconType, setHeaderIconType] = useState('icon'); // icon | bullet | bar
  const [headerIconStyle, setHeaderIconStyle] = useState('square-outline'); // squircle-filled | circle-filled | square-filled | squircle | circle | square-outline

  const [nameSize, setNameSize] = useState('s'); // xs | s | m | l | xl
  const [nameBold, setNameBold] = useState(true);
  const [nameFont, setNameFont] = useState('body'); // body | creative
  const [roleSize, setRoleSize] = useState('s'); // s | m | l
  const [rolePosition, setRolePosition] = useState('below'); // beside | below
  const [roleStyle, setRoleStyle] = useState('normal'); // normal | italic

  const [showEmail, setShowEmail] = useState(true);
  const [showPhone, setShowPhone] = useState(true);
  const [showAddress, setShowAddress] = useState(true);
  const [showPhoto, setShowPhoto] = useState(true);

  const [interestsLayout, setInterestsLayout] = useState('grid'); // grid | rows | compact | bubble
  const [interestsCols, setInterestsCols] = useState(3);
  const [summaryInHeader, setSummaryInHeader] = useState(false);
  const [showSummaryHeading, setShowSummaryHeading] = useState(true);
  const [workExpOrder, setWorkExpOrder] = useState('title-first'); // title-first | subtitle-first

  // Layout Config states
  const [layoutConfig, setLayoutConfig] = useState(() => {
    try {
      const s = sessionStorage.getItem('mockb_layoutConfig');
      if (s) return JSON.parse(s);
    } catch(e) {}
    return {
      columns: 'one', // one | two | mix
      headerPos: 'top', // top | left | right
      leftWidth: 50,
      rightWidth: 50
    };
  });

  useEffect(() => {
    sessionStorage.setItem('mockb_step', JSON.stringify(step));
    sessionStorage.setItem('mockb_activeTab', JSON.stringify(activeTab));
    sessionStorage.setItem('mockb_resumeData', JSON.stringify(resumeData));
    sessionStorage.setItem('mockb_layoutConfig', JSON.stringify(layoutConfig));
  }, [step, activeTab, resumeData, layoutConfig]);

  // Mockup image overlay state
  const [mockupImage, setMockupImage] = useState(null);

  // Photo editing modal states
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoZoom, setPhotoZoom] = useState(1);
  const [photoPanX, setPhotoPanX] = useState(0);
  const [photoPanY, setPhotoPanY] = useState(0);
  const [photoGrayscale, setPhotoGrayscale] = useState(false);
  const [photoShape, setPhotoShape] = useState('circle'); // circle | rounded | square
  const [photoSize, setPhotoSize] = useState('medium'); // small | medium | large
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedEntry, setDraggedEntry] = useState(null);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [personalDetailsOrder, setPersonalDetailsOrder] = useState([]);
  const [draggedPersonal, setDraggedPersonal] = useState(null);

  useEffect(() => {
    let newOrder = [...personalDetailsOrder];
    if (!newOrder.includes('phone')) newOrder.push('phone');
    if (!newOrder.includes('address')) newOrder.push('address');
    if (resumeData.extraDetails) {
      Object.keys(resumeData.extraDetails).forEach(k => {
        if (!newOrder.includes(k)) newOrder.push(k);
      });
    }
    newOrder = newOrder.filter(k => k === 'phone' || k === 'address' || (resumeData.extraDetails && resumeData.extraDetails.hasOwnProperty(k)));
    if (JSON.stringify(newOrder) !== JSON.stringify(personalDetailsOrder)) {
      setPersonalDetailsOrder(newOrder);
    }
  }, [resumeData.extraDetails, personalDetailsOrder]);

  const handlePersonalDragStart = (e, key) => {
    e.dataTransfer.effectAllowed = 'move';
    setDraggedPersonal(key);
  };
  const handlePersonalDragOver = (e, key) => {
    e.preventDefault();
    if (!draggedPersonal || draggedPersonal === key) return;
    const newOrder = [...personalDetailsOrder];
    const draggedIdx = newOrder.indexOf(draggedPersonal);
    const targetIdx = newOrder.indexOf(key);
    if (draggedIdx !== -1 && targetIdx !== -1) {
      newOrder.splice(draggedIdx, 1);
      newOrder.splice(targetIdx, 0, draggedPersonal);
      setPersonalDetailsOrder(newOrder);
    }
  };
  const handlePersonalDragEnd = () => {
    setDraggedPersonal(null);
  };

  const presetColors = ['#FCD34D', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead', '#ff9999', '#ffb347', '#ffcc5c', '#88d8b0', '#ffffff', '#000000'];
  
  const stepValue = (current, step, min, max, setter) => {
    let next = current + step;
    if (next < min) next = min;
    if (next > max) next = max;
    setter(parseFloat(next.toFixed(1)));
  };

  const insertPlaceholder = (focus, placeholder) => {
    if (focus === 'left') setFooterLeftCol(prev => prev + ' ' + placeholder);
    if (focus === 'center') setFooterCenterCol(prev => prev + ' ' + placeholder);
    if (focus === 'right') setFooterRightCol(prev => prev + ' ' + placeholder);
  };

  // Landing view filter states
  const [activeTopFilter, setActiveTopFilter] = useState('all');
  const [activeStyleFilter, setActiveStyleFilter] = useState('all');
  const [activeLayoutFilter, setActiveLayoutFilter] = useState('all');
  const [activeExpFilter, setActiveExpFilter] = useState('all');
  const [activeFormatFilter, setActiveFormatFilter] = useState('all');
  const [activeColorFilter, setActiveColorFilter] = useState('all');
  const [activeColumnsFilter, setActiveColumnsFilter] = useState('all');
  const [activePhotoFilter, setActivePhotoFilter] = useState('all');

  const fileInputRef = useRef(null);
  const profilePhotoInputRef = useRef(null);

  // Dynamic header and footer visibility based on step state
  useEffect(() => {
    const links = document.querySelectorAll('#resumeSheet a');
    links.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  });

  useEffect(() => {
    const header = document.querySelector('.app-header') || document.querySelector('header');
    const footer = document.querySelector('.main-footer') || document.querySelector('footer');
    const rcPage = document.querySelector('.rc-page');
    const contentContainer = rcPage ? rcPage.parentElement : null;

    if (step === 'editor' || step === 'upload') {
      if (header) header.style.display = 'none';
      if (footer) footer.style.display = 'none';
      if (contentContainer) contentContainer.style.paddingTop = '0px';
    } else {
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
      if (contentContainer) contentContainer.style.paddingTop = '80px';
    }

    return () => {
      if (header) header.style.display = '';
      if (footer) footer.style.display = '';
      if (contentContainer) contentContainer.style.paddingTop = '80px';
    };
  }, [step]);

  // Handle template selection in first step
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setAccentColor(template.accent);
    setLayoutConfig(prev => ({
      ...prev,
      columns: template.layout
    }));
  };

  // Safe History State Push
  const saveHistoryState = (newData) => {
    const serialized = JSON.stringify(newData);
    const updatedStack = historyStack.slice(0, historyIndex + 1);
    updatedStack.push(serialized);
    setHistoryStack(updatedStack);
    setHistoryIndex(updatedStack.length - 1);
  };

  const updateResumeData = (updater) => {
    // If a mockup overlay is active, clear it on any user edit
    if (mockupImage) setMockupImage(null);

    setResumeData(prev => {
      const updated = typeof updater === 'function' ? updater(prev) : updater;
      saveHistoryState(updated);
      return updated;
    });
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setResumeData(JSON.parse(historyStack[prevIdx]));
    }
  };




  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setResumeData(JSON.parse(historyStack[nextIdx]));
    }
  };

  const undoRedoPill = (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
      <div className="history-controls" style={{
        display: 'flex',
        alignItems: 'center',
        background: '#ffffff',
        borderRadius: '24px',
        padding: '4px 12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        gap: '8px'
      }}>
        <button 
          onClick={handleUndo} 
          disabled={historyIndex <= 0} 
          style={{ background: 'none', border: 'none', cursor: historyIndex <= 0 ? 'not-allowed' : 'pointer', padding: '4px 8px', color: historyIndex <= 0 ? '#cccccc' : '#444444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Undo"
        >
          <i className="fa-solid fa-arrow-rotate-left" style={{ fontSize: '1.2rem', strokeWidth: '2' }}></i>
        </button>
        <div style={{ width: '1px', height: '24px', background: '#e0e0e0' }}></div>
        <button 
          onClick={handleRedo} 
          disabled={historyIndex >= historyStack.length - 1} 
          style={{ background: 'none', border: 'none', cursor: historyIndex >= historyStack.length - 1 ? 'not-allowed' : 'pointer', padding: '4px 8px', color: historyIndex >= historyStack.length - 1 ? '#cccccc' : '#444444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          title="Redo"
        >
          <i className="fa-solid fa-arrow-rotate-right" style={{ fontSize: '1.2rem', strokeWidth: '2' }}></i>
        </button>
      </div>
    </div>
  );

  // Upload Choices
  const handleChoiceSelect = (choice) => {
    setUploadChoice(choice);
    if (choice === 'no') {
      setUploadedFile(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const name = file.name.toLowerCase();
      if (name.endsWith('.pdf') || name.endsWith('.doc') || name.endsWith('.docx')) {
        setUploadedFile(file);
      } else {
        alert('Please upload a PDF, DOC, or DOCX file.');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleProceedToEditor = () => {
    setStep('editor');
    if (selectedTemplate) {
      // Setup mockup overlay preview image on entry
      setMockupImage(selectedTemplate.image);
    }
  };

  // Photo management modal dragging
  const handlePhotoMouseDown = (e) => {
    e.preventDefault();
    setIsDraggingPhoto(true);
    setDragStart({ x: e.clientX - photoPanX, y: e.clientY - photoPanY });
  };

  const handlePhotoMouseMove = (e) => {
    if (!isDraggingPhoto) return;
    setPhotoPanX(e.clientX - dragStart.x);
    setPhotoPanY(e.clientY - dragStart.y);
  };

  const handlePhotoMouseUp = () => {
    setIsDraggingPhoto(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateResumeData(prev => ({
          ...prev,
          photo: event.target.result
        }));
        setPhotoZoom(1);
        setPhotoPanX(0);
        setPhotoPanY(0);
        setShowPhotoModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Accordion toggles
  const toggleAccordion = (id) => {
    setExpandedAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Manage entries in sections
  const handleAddSectionEntry = (sectionId, type) => {
    updateResumeData(prev => {
      return {
        ...prev,
        sections: prev.sections.map(sec => {
          if (sec.id !== sectionId) return sec;
          
          let newItem = {};
          if (type === 'experience' || type === 'education' || type === 'projects') {
            newItem = { title: "", role: "", dateRange: "", location: "", desc: "" };
          } else if (type === 'skills' || type === 'languages') {
            newItem = { name: "", desc: "", level: "" };
          } else if (type === 'certificates' || type === 'interests') {
            newItem = { name: "", desc: "" };
          } else if (type === 'courses') {
            newItem = { name: "", institution: "", dateRange: "", location: "", desc: "" };
          } else if (type === 'awards' || type === 'publications') {
            newItem = { name: "", issuer: "", day: "", month: "", year: "", desc: "" };
          } else if (type === 'organisations') {
            newItem = { name: "", position: "", dateRange: "", location: "", desc: "" };
          } else if (type === 'references') {
            newItem = { name: "", role: "", organization: "", email: "", phone: "" };
          } else if (type === 'declaration') {
            newItem = { desc: "", signature: "", name: "", location: "", dateRange: "" };
          } else if (type === 'summary') {
            newItem = { desc: "" };
          } else {
            newItem = { name: "", desc: "" };
          }

          let currentItems = sec.items || [];
          if (type === 'summary' && currentItems.length === 0 && sec.content) {
            currentItems = [{ desc: sec.content }];
          }

          const items = [...currentItems, newItem];
          // Automatically set new item in edit mode
          setActiveEditIndex(prevEdit => ({
            ...prevEdit,
            [sectionId]: items.length - 1
          }));

          return { ...sec, items };
        })
      };
    });
  };

  const handleUpdateEntryValue = (sectionId, idx, key, val) => {
    if (mockupImage) setMockupImage(null);
    setResumeData(prev => {
      const updated = {
        ...prev,
        sections: prev.sections.map(sec => {
          if (sec.id !== sectionId) return sec;
          
          let currentItems = sec.items || [];
          if (sec.type === 'summary' && currentItems.length === 0 && sec.content) {
            currentItems = [{ desc: sec.content }];
          }

          const items = currentItems.map((item, i) => {
            if (i !== idx) return item;
            const itemObj = typeof item === 'object' && item !== null ? item : { name: item || '' };
            return { ...itemObj, [key]: val };
          });
          return { ...sec, items };
        })
      };
      return updated;
    });
  };

  const handleDeleteEntry = (sectionId, idx) => {
    Swal.fire({
      title: 'Delete this entry?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Delete',
      width: '320px',
      background: '#18181b',
      color: '#e5e7eb',
      customClass: {
        popup: 'rounded-xl border border-zinc-800'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        updateResumeData(prev => ({
          ...prev,
          sections: prev.sections.map(sec => {
            if (sec.id !== sectionId) return sec;
            let currentItems = sec.items || [];
            if (sec.type === 'summary' && currentItems.length === 0 && sec.content) {
              currentItems = [{ desc: sec.content }];
            }
            return {
              ...sec,
              items: currentItems.filter((_, i) => i !== idx)
            };
          })
        }));
        // Clean up hiddenItems for this entry
        setHiddenItems(prev => {
          const secH = { ...(prev[sectionId] || {}) };
          delete secH[idx];
          return { ...prev, [sectionId]: secH };
        });
        setActiveEditIndex(prev => {
          const copy = { ...prev };
          delete copy[sectionId];
          return copy;
        });
      }
    });
  };

  const handleMoveEntry = (sectionId, idx, dir) => {
    updateResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(sec => {
        if (sec.id !== sectionId) return sec;
        const items = [...(sec.items || [])];
        const target = idx + dir;
        if (target < 0 || target >= items.length) return sec;
        
        // Swap
        const temp = items[idx];
        items[idx] = items[target];
        items[target] = temp;

        return { ...sec, items };
      })
    }));
  };

  const handleEntryDragStart = (e, sectionId, idx) => {
    setDraggedEntry({ sectionId, idx });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleEntryDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleEntryDrop = (e, sectionId, targetIdx) => {
    e.preventDefault();
    if (!draggedEntry || draggedEntry.sectionId !== sectionId || draggedEntry.idx === targetIdx) return;

    const fromIdx = draggedEntry.idx;
    
    updateResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(sec => {
        if (sec.id !== sectionId) return sec;
        const items = [...(sec.items || [])];
        if (fromIdx < 0 || fromIdx >= items.length || targetIdx < 0 || targetIdx >= items.length) return sec;
        
        const [movedItem] = items.splice(fromIdx, 1);
        items.splice(targetIdx, 0, movedItem);

        return { ...sec, items };
      })
    }));

    // Reorder hiddenItems
    setHiddenItems(prev => {
      const secH = prev[sectionId];
      if (!secH) return prev;
      
      const maxIdx = Math.max(fromIdx, targetIdx, ...Object.keys(secH).map(Number));
      const arr = [];
      for (let i = 0; i <= maxIdx; i++) arr[i] = !!secH[i];
      
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(targetIdx, 0, moved);
      
      const newSecH = {};
      arr.forEach((val, i) => { if (val) newSecH[i] = true; });
      return { ...prev, [sectionId]: newSecH };
    });
    
    setDraggedEntry(null);
  };

  // Custom link pills in Personal Details
  const handleTogglePill = (key) => {
    if (mockupImage) setMockupImage(null);
    setResumeData(prev => {
      const extraDetails = { ...prev.extraDetails };
      if (extraDetails.hasOwnProperty(key)) {
        delete extraDetails[key];
      } else {
        extraDetails[key] = '';
      }
      return { ...prev, extraDetails };
    });
  };

  const handleUpdatePillValue = (key, val) => {
    if (mockupImage) setMockupImage(null);
    setResumeData(prev => ({
      ...prev,
      extraDetails: {
        ...prev.extraDetails,
        [key]: val
      }
    }));
  };

  // Sections Adding
  const handleAddSection = (type) => {
    const titlesMap = {
      summary: "Summary",
      education: "Education",
      experience: "Professional Experience",
      skills: "Skills",
      languages: "Languages",
      certificates: "Certificates",
      interests: "Interests",
      projects: "Projects",
      courses: "Courses",
      awards: "Awards",
      organisations: "Organisations",
      publications: "Publications",
      references: "References",
      declaration: "Declaration",
      custom: "Custom Section"
    };

    const newSection = {
      id: type + '_' + Date.now(),
      type: type,
      title: titlesMap[type] || "New Section",
      column: "left"
    };

    if (type === 'summary') {
      newSection.items = [{ desc: "" }];
    } else if (type === 'skills') {
      newSection.items = [{ name: "", desc: "", level: "" }];
    } else if (type === 'languages') {
      newSection.items = [{ name: "", level: "" }];
    } else if (type === 'certificates') {
      newSection.items = [{ name: "", desc: "" }];
    } else if (type === 'interests') {
      newSection.items = [{ name: "", desc: "" }];
    } else if (type === 'courses') {
      newSection.items = [{ name: "", institution: "", dateRange: "", location: "", desc: "" }];
    } else if (type === 'awards' || type === 'publications') {
      newSection.items = [{ name: "", issuer: "", day: "", month: "", year: "", desc: "" }];
    } else if (type === 'organisations') {
      newSection.items = [{ name: "", position: "", dateRange: "", location: "", desc: "" }];
    } else if (type === 'references') {
      newSection.items = [{ name: "", role: "", organization: "", email: "", phone: "" }];
    } else if (type === 'declaration') {
      newSection.items = [{ desc: "", signature: "", name: "", location: "", dateRange: "" }];
    } else {
      newSection.items = [{ name: "", role: "", dateRange: "", location: "", desc: "" }];
    }

    updateResumeData(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    setShowAddSectionModal(false);
  };

  const handleDeleteSection = (id) => {
    Swal.fire({
      text: "This will permanently delete this section and all its entries. This action can't be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Delete',
      width: '340px',
      background: '#18181b',
      color: '#e5e7eb',
      customClass: {
        popup: 'rounded-xl border border-zinc-800'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        updateResumeData(prev => ({
          ...prev,
          sections: prev.sections.filter(sec => sec.id !== id)
        }));
      }
    });
  };



  // Reorder Sections (Rearrange tab)
  const handleMoveSection = (idx, dir) => {
    updateResumeData(prev => {
      const list = [...prev.sections];
      const target = idx + dir;
      if (target < 0 || target >= list.length) return prev;
      
      const temp = list[idx];
      list[idx] = list[target];
      list[target] = temp;
      
      return { ...prev, sections: list };
    });
  };

  const handleMoveSectionColumn = (idx, col) => {
    updateResumeData(prev => {
      const list = [...prev.sections];
      list[idx].column = col;
      return { ...prev, sections: list };
    });
  };

  // Filter templates list
  const filteredTemplates = templates.filter(tpl => {
    const tagsArr = tpl.tags.split(' ');
    
    // Top Filter
    if (activeTopFilter !== 'all' && !tagsArr.includes(activeTopFilter)) return false;
    
    // Style Filter
    if (activeStyleFilter !== 'all' && !tagsArr.includes(`style-${activeStyleFilter}`) && !tagsArr.includes(activeStyleFilter)) return false;
    
    // Layout Filter
    if (activeLayoutFilter !== 'all' && !tagsArr.includes(`layout-${activeLayoutFilter}`) && !tagsArr.includes(activeLayoutFilter)) return false;
    
    // Experience Filter
    if (activeExpFilter !== 'all' && !tagsArr.includes(`exp-${activeExpFilter}`) && !tagsArr.includes(activeExpFilter)) return false;
    
    // Format Filter
    if (activeFormatFilter !== 'all' && !tagsArr.includes(`fmt-${activeFormatFilter}`) && !tagsArr.includes(activeFormatFilter)) return false;
    
    // Color Filter
    if (activeColorFilter !== 'all' && !tagsArr.includes(activeColorFilter)) return false;
    
    // Columns Count Filter
    if (activeColumnsFilter !== 'all') {
      const columns = tpl.layout === 'one' ? 'single' : 'double';
      if (columns !== activeColumnsFilter) return false;
    }
    
    // Photo Filter
    if (activePhotoFilter !== 'all') {
      const hasPhoto = tagsArr.includes('photo');
      if (activePhotoFilter === 'photo' && !hasPhoto) return false;
      if (activePhotoFilter === 'nophoto' && hasPhoto) return false;
    }

    return true;
  });

  // Dynamic Icon mapping
  const pillIcons = {
    passport: 'fa-solid fa-id-card',
    nationality: 'fa-solid fa-flag',
    dob: 'fa-solid fa-cake-candles',
    visa: 'fa-solid fa-passport',
    availability: 'fa-solid fa-clock',
    gender: 'fa-solid fa-venus-mars',
    disability: 'fa-solid fa-universal-access',
    workmode: 'fa-solid fa-laptop-house',
    relocation: 'fa-solid fa-truck-moving',
    expectedsalary: 'fa-solid fa-money-bill-wave',
    secondphone: 'fa-solid fa-phone-flip',
    drivinglicense: 'fa-solid fa-id-card-clip',
    securityclearance: 'fa-solid fa-shield-halved',
    marital: 'fa-solid fa-heart-pulse',
    military: 'fa-solid fa-user-shield',
    smoking: 'fa-solid fa-smoking',
    height: 'fa-solid fa-arrows-up-down',
    weight: 'fa-solid fa-weight-scale',

    website: 'fa-solid fa-globe',
    portfolio: 'fa-solid fa-laptop-code',
    linkedin: 'fa-brands fa-linkedin',
    github: 'fa-brands fa-github',
    gitbook: 'fa-solid fa-book',
    medium: 'fa-brands fa-medium',
    orcid: 'fa-brands fa-orcid',
    skype: 'fa-brands fa-skype',
    bluesky: 'fa-solid fa-square-envelope',
    threads: 'fa-brands fa-threads',
    x: 'fa-brands fa-x-twitter',
    discord: 'fa-brands fa-discord',
    dribbble: 'fa-brands fa-dribbble',
    behance: 'fa-brands fa-behance',
    stackoverflow: 'fa-brands fa-stack-overflow',
    gitlab: 'fa-brands fa-gitlab',
    quora: 'fa-brands fa-quora',
    facebook: 'fa-brands fa-facebook',
    instagram: 'fa-brands fa-instagram',
    wechat: 'fa-brands fa-weixin',
    huggingface: 'fa-solid fa-face-smiling-hands',
    kaggle: 'fa-brands fa-kaggle',
    youtube: 'fa-brands fa-youtube',
    tiktok: 'fa-brands fa-tiktok',
    signal: 'fa-solid fa-comment-sms',
    telegram: 'fa-brands fa-telegram',
    whatsapp: 'fa-brands fa-whatsapp',
    paypal: 'fa-brands fa-paypal',
    producthunt: 'fa-brands fa-product-hunt',
    artstation: 'fa-brands fa-artstation',
    codepen: 'fa-brands fa-codepen',
    fiverr: 'fa-solid fa-f',
    hashnode: 'fa-brands fa-hashnode',
    pluralsight: 'fa-solid fa-circle-play',
    researchgate: 'fa-brands fa-researchgate',
    imdb: 'fa-brands fa-imdb',
    qwiklabs: 'fa-solid fa-cloud',
    googleplay: 'fa-brands fa-google-play',
    tumblr: 'fa-brands fa-tumblr',
    tripadvisor: 'fa-brands fa-tripadvisor',
    yelp: 'fa-brands fa-yelp',
    slack: 'fa-brands fa-slack',
    flickr: 'fa-brands fa-flickr',
    reverbnation: 'fa-solid fa-music',
    deviantart: 'fa-brands fa-deviantart',
    vimeo: 'fa-brands fa-vimeo',
    reddit: 'fa-brands fa-reddit',
    pinterest: 'fa-brands fa-pinterest',
    blogger: 'fa-brands fa-blogger',
    spotify: 'fa-brands fa-spotify',
    bitcoin: 'fa-brands fa-bitcoin',
    appstore: 'fa-brands fa-app-store',
    wordpress: 'fa-brands fa-wordpress',
    leetcode: 'fa-solid fa-code',
    codechef: 'fa-solid fa-code',
    codecademy: 'fa-solid fa-graduation-cap',
    codeforces: 'fa-solid fa-code',
    vsco: 'fa-solid fa-image',
    snapchat: 'fa-brands fa-snapchat',
    upwork: 'fa-solid fa-briefcase',
    geeksforgeeks: 'fa-solid fa-code',
    googlescholar: 'fa-solid fa-graduation-cap',
    line: 'fa-brands fa-line',
    tryhackme: 'fa-solid fa-shield-halved',
    coursera: 'fa-solid fa-graduation-cap',
    protonmail: 'fa-solid fa-envelope',
    hackerearth: 'fa-solid fa-code',
    codewars: 'fa-solid fa-code',
    hackthebox: 'fa-solid fa-cube',
    bitbucket: 'fa-brands fa-bitbucket',
    gitea: 'fa-solid fa-code-branch',
    xing: 'fa-brands fa-xing',
    '500px': 'fa-brands fa-500px',
    devto: 'fa-brands fa-dev',
    hackerrank: 'fa-brands fa-hackerrank',
    tencentqq: 'fa-brands fa-qq',
    ethereum: 'fa-brands fa-ethereum',
    stopstalk: 'fa-solid fa-code',
    substack: 'fa-solid fa-bookmark',
    toptal: 'fa-solid fa-briefcase',
    polywork: 'fa-solid fa-briefcase',
    replit: 'fa-solid fa-code',
    credly: 'fa-solid fa-award',
    figma: 'fa-brands fa-figma',
    gmail: 'fa-solid fa-envelope',
    twitch: 'fa-brands fa-twitch',
    trello: 'fa-brands fa-trello',
    evernote: 'fa-solid fa-note-sticky',
    canva: 'fa-solid fa-palette',
    etsy: 'fa-brands fa-etsy',
    googlemaps: 'fa-solid fa-map-pin',
    googlepodcasts: 'fa-solid fa-podcast',
    applepodcasts: 'fa-solid fa-podcast',
    stitcher: 'fa-solid fa-podcast',
    amazonmusic: 'fa-solid fa-music',
    iheartradio: 'fa-solid fa-radio',
    tunein: 'fa-solid fa-radio',
    pocketcasts: 'fa-solid fa-podcast',
    pandora: 'fa-solid fa-music',
    youtubemusic: 'fa-solid fa-music',
    tidal: 'fa-solid fa-music',
    bandcamp: 'fa-brands fa-bandcamp',
    scopus: 'fa-solid fa-book-open',
    disco: 'fa-solid fa-compact-disc',
    handshake: 'fa-solid fa-handshake',
    steam: 'fa-brands fa-steam',
    google: 'fa-brands fa-google',
    calendly: 'fa-solid fa-calendar',
    angellist: 'fa-brands fa-angellist',
    deezer: 'fa-solid fa-music',
    flowcv: 'fa-solid fa-file-invoice',
    khanacademy: 'fa-solid fa-graduation-cap',
    udemy: 'fa-solid fa-graduation-cap',
    udacity: 'fa-solid fa-graduation-cap',
    tableau: 'fa-solid fa-chart-simple',
    npm: 'fa-brands fa-npm',
    hackerone: 'fa-solid fa-shield-halved',
    freelancer: 'fa-solid fa-briefcase',
    datacamp: 'fa-solid fa-laptop-code',
    mastodon: 'fa-brands fa-mastodon',
    letterboxd: 'fa-solid fa-film',
    zoom: 'fa-solid fa-video',
    audioboom: 'fa-solid fa-podcast',
    soundcloud: 'fa-brands fa-soundcloud',
    soundcharts: 'fa-solid fa-chart-line',
    kakaotalk: 'fa-solid fa-comment',
    salesforce: 'fa-brands fa-salesforce',
    itchio: 'fa-brands fa-itch-io',
    sololearn: 'fa-solid fa-graduation-cap',
    opensea: 'fa-solid fa-anchor',
    devpost: 'fa-solid fa-code',
    linktree: 'fa-solid fa-tree',
    codingame: 'fa-solid fa-gamepad',
    codingninjas: 'fa-solid fa-graduation-cap',
    unsplash: 'fa-solid fa-camera',
    indeed: 'fa-solid fa-briefcase'
  };

  const iconMap = {
    summary: 'fa-solid fa-user',
    education: 'fa-solid fa-graduation-cap',
    'professional experience': 'fa-solid fa-briefcase',
    experience: 'fa-solid fa-briefcase',
    certificates: 'fa-solid fa-file-lines',
    certificate: 'fa-solid fa-file-lines',
    organisations: 'fa-solid fa-spa',
    organizations: 'fa-solid fa-spa',
    courses: 'fa-solid fa-book-open',
    skills: 'fa-solid fa-layer-group',
    languages: 'fa-solid fa-language',
    interests: 'fa-solid fa-heart'
  };

  const handleDownloadWord = () => {
    const resumeElement = document.getElementById('resumeSheet');
    if (!resumeElement) {
      alert('Resume sheet not found!');
      return;
    }
    const content = resumeElement.innerHTML;
    const styles = `
        body { font-family: 'Arial', sans-serif; color: #000000; padding: 20px; background-color: #ffffff; }
        #resumeSheet { width: 100%; max-width: 100%; background: #ffffff; color: #000000; }
        .sheet-header { border-bottom: 2px solid #333333; padding-bottom: 15px; margin-bottom: 20px; display: table; width: 100%; }
        #sheet-header-main { display: inline-block; width: 60%; vertical-align: top; }
        #sheet-header-details { display: inline-block; width: 40%; text-align: right; vertical-align: top; }
        h1 { font-size: 24pt; margin: 0 0 5px 0; color: #000000; font-weight: bold; }
        h3 { font-size: 13pt; margin: 0; color: #555555; font-weight: normal; }
        .sheet-contact { font-size: 9.5pt; color: #444444; line-height: 1.4; }
        .sheet-contact span { display: ${headerArrangement === 'columns' ? 'flex' : 'block'}; flex-direction: ${headerArrangement === 'columns' ? 'column' : 'row'}; align-items: ${headerArrangement === 'columns' ? 'center' : 'stretch'}; margin-bottom: 3px; gap: ${headerArrangement === 'columns' ? '5px' : '0'}; }
        .sheet-photo-container { display: none; }
        .resume-section { margin-bottom: 20px; }
        .section-title { font-size: 13pt; font-weight: bold; border-bottom: 1.5px solid #cccccc; padding-bottom: 4px; margin-bottom: 10px; color: #111111; text-transform: uppercase; }
        .section-body { font-size: 10pt; line-height: 1.5; color: #222222; }
        .work-experience-entry, .education-entry, .project-entry { margin-bottom: 12px; }
        .entry-header { display: table; width: 100%; font-weight: bold; margin-bottom: 2px; }
        .entry-title-left { display: inline-block; width: 70%; text-align: left; }
        .entry-date-right { display: inline-block; width: 30%; text-align: right; font-weight: normal; color: #666666; font-size: 9pt; }
        .entry-subtitle { font-size: 9.5pt; font-style: italic; color: #444444; margin-bottom: 4px; }
        .bullet-list { margin: 5px 0; padding-left: 20px; }
        .bullet-list li { margin-bottom: 3px; }
        .skills-grid, .languages-grid { display: block; margin-top: 5px; }
        .skill-tag, .language-tag { display: inline-block; background: #f0f0f0; padding: 4px 8px; margin: 3px; border-radius: 4px; font-size: 9pt; color: #333333; }
    `;
    const htmlString = 
      '<' + 'html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' +
      '<' + 'head>' +
          '<meta charset="utf-8">' +
          '<title>Resume</title>' +
          '<' + 'style>' +
              styles +
          '<' + '/style>' +
      '<' + '/head>' +
      '<' + 'body>' +
          '<div id="resumeSheet">' +
              content +
          '</div>' +
      '<' + '/body>' +
      '<' + '/html>';

    const blob = new Blob(['\\ufeff' + htmlString], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (resumeData.name || 'Resume').trim().replace(/\\s+/g, '_') + '.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOptimizeSummaryAI = () => {
    const summarySec = resumeData.sections.find(s => s.type === 'summary');
    if (summarySec) {
      updateResumeData(prev => ({
        ...prev,
        sections: prev.sections.map(s => s.type === 'summary' ? {
          ...s,
          content: "Detail-oriented Software Engineer with a proven track record of designing, building, and deploying highly scalable web solutions using modern framework architectures. Experienced in collaborating with cross-functional product and engineering teams to identify critical bottlenecks and deliver optimized, high-performance interfaces that maximize engagement."
        } : s)
      }));
      alert('✨ AI optimization applied to Summary section successfully!');
    } else {
      alert('Please add a Summary section first to use the AI tool.');
    }
  };

  // Section customizations panel
  const handleUpdateSectionCustomization = (secId, key, val) => {
    if (mockupImage) setMockupImage(null);
    setResumeData(prev => ({
      ...prev,
      sections: prev.sections.map(sec => {
        if (sec.id !== secId) return sec;
        return {
          ...sec,
          customizations: {
            ...(sec.customizations || {}),
            [key]: val
          }
        };
      })
    }));
  };

  // Helper to render customized layout options for Personal Details (Header) Accordion
  const renderPersonalCustomizerControls = () => {
    const isCustomsOpen = !!expandedCustomizations['personal'];

    return (
      <div className="section-customizer-container" style={{ marginTop: '1.5rem', borderTop: '1px solid #222' }}>
        <div 
          className="customization-trigger-row" 
          onClick={() => setExpandedCustomizations(prev => ({ ...prev, personal: !prev.personal }))} 
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '1rem', 
            background: '#1a1a1a', 
            borderRadius: isCustomsOpen ? '0' : '12px', 
            fontSize: '0.9rem', 
            color: '#fff',
            border: '1px solid #222'
          }}
        >
          <span>
            <i className="fa-solid fa-sliders" style={{ marginRight: '0.5rem', fontSize: '0.8rem' }}></i> 
            {isCustomsOpen ? 'Hide customizations for this section' : 'Show customizations for this section'}
          </span>
          <i className={`fa-solid ${isCustomsOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '0.8rem' }}></i>
        </div>

        {isCustomsOpen && (
          <div style={{ padding: '1.5rem', background: '#0a0a0a', borderTop: 'none', borderRadius: '0 0 12px 12px', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid #222' }}>
            
            {/* Header Card */}
            <div style={{ background: '#141414', borderRadius: '12px', padding: '1.5rem', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#eee', marginBottom: '1.5rem' }}>Header</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ccc', marginBottom: '0.8rem' }}>Text Alignment</div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setHeaderAlignment('left')} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${headerAlignment === 'left' ? '#EEC30C' : '#333'}`, background: headerAlignment === 'left' ? '#1a1a1a' : '#111', color: headerAlignment === 'left' ? '#EEC30C' : '#ccc', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-start' }}>
                      <div style={{ width: '20px', height: '3px', background: headerAlignment === 'left' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                      <div style={{ width: '12px', height: '3px', background: headerAlignment === 'left' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: headerAlignment === 'left' ? '#EEC30C' : '#ccc' }}>Left</span>
                  </button>
                  <button onClick={() => setHeaderAlignment('center')} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${headerAlignment === 'center' ? '#EEC30C' : '#333'}`, background: headerAlignment === 'center' ? '#1a1a1a' : '#111', color: headerAlignment === 'center' ? '#EEC30C' : '#ccc', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
                      <div style={{ width: '20px', height: '3px', background: headerAlignment === 'center' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                      <div style={{ width: '12px', height: '3px', background: headerAlignment === 'center' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: headerAlignment === 'center' ? '#EEC30C' : '#ccc' }}>Center</span>
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ccc', marginBottom: '0.8rem' }}>Details Arrangement</div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setHeaderArrangement('stacked')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${headerArrangement === 'stacked' ? '#EEC30C' : '#333'}`, background: headerArrangement === 'stacked' ? '#1a1a1a' : '#111', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <div style={{ width: '24px', height: '4px', background: headerArrangement === 'stacked' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                      <div style={{ width: '24px', height: '4px', background: headerArrangement === 'stacked' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                      <div style={{ width: '24px', height: '4px', background: headerArrangement === 'stacked' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                  </button>
                  <button onClick={() => setHeaderArrangement('horizontal')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${headerArrangement === 'horizontal' ? '#EEC30C' : '#333'}`, background: headerArrangement === 'horizontal' ? '#1a1a1a' : '#111', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                      <div style={{ width: '12px', height: '4px', background: headerArrangement === 'horizontal' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                      <div style={{ width: '12px', height: '4px', background: headerArrangement === 'horizontal' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                      <div style={{ width: '12px', height: '4px', background: headerArrangement === 'horizontal' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                  </button>
                  <button onClick={() => setHeaderArrangement('columns')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${headerArrangement === 'columns' ? '#EEC30C' : '#333'}`, background: headerArrangement === 'columns' ? '#1a1a1a' : '#111', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
                        <div style={{ width: '6px', height: '4px', background: headerArrangement === 'columns' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                        <div style={{ width: '12px', height: '4px', background: headerArrangement === 'columns' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
                        <div style={{ width: '6px', height: '4px', background: headerArrangement === 'columns' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                        <div style={{ width: '12px', height: '4px', background: headerArrangement === 'columns' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
                        <div style={{ width: '6px', height: '4px', background: headerArrangement === 'columns' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                        <div style={{ width: '12px', height: '4px', background: headerArrangement === 'columns' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                      </div>
                    </button>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ccc', marginBottom: '0.8rem' }}>Header Contact Icons</div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {['icon', 'bullet', 'bar'].map(icType => (
                    <button key={icType} onClick={() => setHeaderIconType(icType)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${headerIconType === icType ? '#EEC30C' : '#333'}`, background: headerIconType === icType ? '#1a1a1a' : '#111', color: headerIconType === icType ? '#EEC30C' : '#ccc', cursor: 'pointer', textTransform: 'capitalize', fontSize: '0.85rem' }}>{icType}</button>
                  ))}
                </div>
              </div>

              {headerIconType === 'icon' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ccc', marginBottom: '0.8rem' }}>Icon Style</div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[
                      { key: 'squircle-filled', style: { borderRadius: '8px', background: '#333', color: '#ccc' } },
                      { key: 'circle-filled', style: { borderRadius: '50%', background: '#333', color: '#ccc' } },
                      { key: 'square-filled', style: { borderRadius: '0', background: '#333', color: '#ccc' } },
                      { key: 'squircle', style: { borderRadius: '8px', border: '1px solid #444', background: '#111', color: '#ccc' } },
                      { key: 'circle', style: { borderRadius: '50%', border: '1px solid #444', background: '#111', color: '#ccc' } },
                      { key: 'square-outline', style: { borderRadius: '0', border: '1px solid #444', background: '#111', color: '#ccc' } }
                    ].map(iconOpt => {
                      const isActive = headerIconStyle === iconOpt.key;
                      const activeStyle = isActive ? { border: '1px solid #EEC30C', background: '#1a1a1a', color: '#EEC30C' } : iconOpt.style;
                      return (
                        <button key={iconOpt.key} onClick={() => setHeaderIconStyle(iconOpt.key)} style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0, ...activeStyle, ...(iconOpt.style.border && !isActive ? { border: iconOpt.style.border } : { border: isActive && iconOpt.style.border ? '1px solid #EEC30C' : 'none' }) }}>
                          <i className="fa-solid fa-link" style={{ color: isActive ? '#EEC30C' : iconOpt.style.color }}></i>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Advanced Settings inline toggler */}
              <div style={{ fontSize: '0.85rem', color: '#888', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => {
                const el = document.getElementById('adv-settings-panel');
                if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
              }}>
                Advanced Settings <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.7rem' }}></i>
              </div>
              
              <div id="adv-settings-panel" style={{ display: 'none', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #222' }}>
                {!resumeData.role ? (
                  <div style={{ background: '#111', border: '1px solid #333', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#ccc' }}>
                    To see design options, go to your personal details & enter a professional title ✍️
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ccc', marginBottom: '0.8rem' }}>Professional Title Position</div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setRolePosition('beside')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${rolePosition === 'beside' ? '#EEC30C' : '#333'}`, background: rolePosition === 'beside' ? '#1a1a1a' : '#111', color: rolePosition === 'beside' ? '#EEC30C' : '#ccc', cursor: 'pointer', fontSize: '0.85rem' }}>Try Same Line</button>
                        <button onClick={() => setRolePosition('below')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${rolePosition === 'below' ? '#EEC30C' : '#333'}`, background: rolePosition === 'below' ? '#1a1a1a' : '#111', color: rolePosition === 'below' ? '#EEC30C' : '#ccc', cursor: 'pointer', fontSize: '0.85rem' }}>Below</button>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ccc', marginBottom: '0.8rem' }}>Professional Title Style</div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setRoleStyle('normal')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${roleStyle === 'normal' ? '#EEC30C' : '#333'}`, background: roleStyle === 'normal' ? '#1a1a1a' : '#111', color: roleStyle === 'normal' ? '#EEC30C' : '#ccc', cursor: 'pointer', fontSize: '0.85rem' }}>Normal</button>
                        <button onClick={() => setRoleStyle('italic')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${roleStyle === 'italic' ? '#EEC30C' : '#333'}`, background: roleStyle === 'italic' ? '#1a1a1a' : '#111', color: roleStyle === 'italic' ? '#EEC30C' : '#ccc', cursor: 'pointer', fontSize: '0.85rem' }}>Italic</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Name Card */}
            <div style={{ background: '#141414', borderRadius: '12px', padding: '1.5rem', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>Name</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ccc', marginBottom: '0.8rem' }}>Style</div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setNameBold(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${!nameBold ? '#EEC30C' : '#333'}`, background: !nameBold ? '#1a1a1a' : '#111', color: !nameBold ? '#EEC30C' : '#ccc', cursor: 'pointer', fontSize: '0.85rem' }}>Normal</button>
                  <button onClick={() => setNameBold(true)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${nameBold ? '#EEC30C' : '#333'}`, background: nameBold ? '#1a1a1a' : '#111', color: nameBold ? '#EEC30C' : '#ccc', cursor: 'pointer', fontSize: '0.85rem' }}>Bold</button>
                </div>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ccc', marginBottom: '0.8rem' }}>Font Family</div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button onClick={() => setNameFont('body')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${nameFont === 'body' ? '#EEC30C' : '#333'}`, background: nameFont === 'body' ? '#1a1a1a' : '#111', color: nameFont === 'body' ? '#EEC30C' : '#ccc', cursor: 'pointer', fontSize: '0.85rem' }}>Body Font</button>
                  <button onClick={() => setNameFont('creative')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${nameFont === 'creative' ? '#EEC30C' : '#333'}`, background: nameFont === 'creative' ? '#1a1a1a' : '#111', color: nameFont === 'creative' ? '#EEC30C' : '#ccc', cursor: 'pointer', fontSize: '0.85rem' }}>Creative</button>
                </div>
              </div>
              {nameFont === 'creative' && (
                <div id="creative-font-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '0.8rem' }}>
                  {[
                    'Abril Fatface', 'Amatic SC', 'Bungee Shade', 'Caveat', 'Caveat Brush', 
                    'Comfortaa', 'Elsie', 'Lobster', 'Pacifico', 'Parisienne', 'Vibu'
                  ].map(font => (
                    <div 
                      key={font}
                      className={`style-option ${nameCreativeFont === font ? 'active' : ''}`} 
                      onClick={() => setNameCreativeFont(font)}
                      style={{ 
                        fontFamily: `'${font}', cursive`, 
                        padding: '10px 0', 
                        background: '#111', 
                        border: `1px solid ${nameCreativeFont === font ? '#EEC30C' : '#333'}`, 
                        borderRadius: '6px', 
                        color: '#fff', 
                        cursor: 'pointer', 
                        textAlign: 'center', 
                        fontSize: '0.8rem' 
                      }}
                    >
                      {font}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Professional Title */}
            <div className="customization-subsection editor-section-card" style={{ padding: '1rem', background: '#141414', border: '1px solid #222' }}>
              <h5 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.8rem', fontWeight: 600 }}>Professional title</h5>
              {resumeData.role ? (
                <div id="role-custom-content">
                  <div style={{ fontSize: '0.74rem', color: '#888', marginBottom: '0.5rem' }}>Size</div>
                  <div className="style-options" style={{ display: 'flex', gap: '5px', marginBottom: '0.9rem' }}>
                    {['s', 'm', 'l'].map(size => (
                      <div 
                        key={size}
                        className={`style-option ${roleSize === size ? 'active' : ''}`} 
                        onClick={() => setRoleSize(size)}
                        style={{ flex: 1, padding: '8px 0', background: '#111', border: `1px solid ${roleSize === size ? '#EEC30C' : '#333'}`, borderRadius: '6px', color: '#fff', cursor: 'pointer', textAlign: 'center', fontSize: '0.8rem', textTransform: 'uppercase' }}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#888', marginBottom: '0.5rem' }}>Position</div>
                  <div className="style-options" style={{ display: 'flex', gap: '10px', marginBottom: '0.9rem' }}>
                    {[
                      { key: 'beside', label: 'Try Same Line' },
                      { key: 'below', label: 'Below' }
                    ].map(pos => (
                      <div 
                        key={pos.key}
                        className={`style-option ${rolePosition === pos.key ? 'active' : ''}`} 
                        onClick={() => setRolePosition(pos.key)}
                        style={{ flex: 1, padding: '8px', background: '#111', border: `1px solid ${rolePosition === pos.key ? '#EEC30C' : '#333'}`, borderRadius: '6px', color: '#fff', cursor: 'pointer', textAlign: 'center', fontSize: '0.8rem' }}
                      >
                        {pos.label}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#888', marginBottom: '0.5rem' }}>Style</div>
                  <div className="style-options" style={{ display: 'flex', gap: '10px' }}>
                    {[
                      { key: 'normal', label: 'Normal' },
                      { key: 'italic', label: 'Italic' }
                    ].map(style => (
                      <div 
                        key={style.key}
                        className={`style-option ${roleStyle === style.key ? 'active' : ''}`} 
                        onClick={() => setRoleStyle(style.key)}
                        style={{ flex: 1, padding: '8px', background: '#111', border: `1px solid ${roleStyle === style.key ? '#EEC30C' : '#333'}`, borderRadius: '6px', color: '#fff', cursor: 'pointer', textAlign: 'center', fontSize: '0.8rem' }}
                      >
                        {style.label}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div id="role-empty-message" style={{ fontSize: '0.85rem', color: '#888', padding: '1rem 0' }}>
                  To see design options, go to your personal details & enter a professional title 💼
                </div>
              )}
            </div>

            {/* Photo */}
            <div className="customization-subsection editor-section-card" style={{ padding: '1rem', background: '#141414', border: '1px solid #222' }}>
              <h5 style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '0.8rem', fontWeight: 600 }}>Photo</h5>
              {resumeData.photo ? (
                <div id="photo-custom-content">
                  <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.85rem' }}>
                    <input 
                      type="checkbox" 
                      id="photo-show" 
                      checked={showPhoto} 
                      onChange={(e) => setShowPhoto(e.target.checked)} 
                      style={{ accentColor: '#EEC30C', width: '16px', height: '16px', cursor: 'pointer' }} 
                    />
                    <label htmlFor="photo-show" style={{ cursor: 'pointer', userSelect: 'none' }}>Show</label>
                  </div>
                  <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '0.85rem' }}>
                    <input 
                      type="checkbox" 
                      id="photo-grayscale" 
                      checked={photoGrayscale} 
                      onChange={(e) => setPhotoGrayscale(e.target.checked)} 
                      style={{ accentColor: '#EEC30C', width: '16px', height: '16px', cursor: 'pointer' }} 
                    />
                    <label htmlFor="photo-grayscale" style={{ cursor: 'pointer', userSelect: 'none' }}>Grayscale</label>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.82rem', color: '#aaa', fontWeight: '600', marginBottom: '0.6rem' }}>Photo shape</div>
                    <div className="style-options" style={{ display: 'flex', gap: '10px' }}>
                      {['circle', 'rounded', 'square'].map(shape => (
                        <button 
                          key={shape}
                          onClick={() => setPhotoShape(shape)}
                          className={`style-option ${photoShape === shape ? 'active' : ''}`} 
                          style={{ flex: 1, padding: '8px', background: '#111', border: `1px solid ${photoShape === shape ? '#EEC30C' : '#333'}`, borderRadius: '6px', color: '#fff', cursor: 'pointer', textTransform: 'capitalize' }}
                        >
                          {shape}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.82rem', color: '#aaa', fontWeight: '600', marginBottom: '0.6rem' }}>Photo size</div>
                    <div className="style-options" style={{ display: 'flex', gap: '10px' }}>
                      {['small', 'medium', 'large'].map(size => (
                        <button 
                          key={size}
                          onClick={() => setPhotoSize(size)}
                          className={`style-option ${photoSize === size ? 'active' : ''}`} 
                          style={{ flex: 1, padding: '8px', background: '#111', border: `1px solid ${photoSize === size ? '#EEC30C' : '#333'}`, borderRadius: '6px', color: '#fff', cursor: 'pointer', textTransform: 'capitalize' }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div id="photo-empty-message" style={{ fontSize: '0.85rem', color: '#888', padding: '1rem 0' }}>
                  To see photo design options, please upload a profile photo first 📷
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    );
  };

  // Helper to render customized layout options in Section Accordion
  const renderSectionCustomizerControls = (section) => {
    const isCustomsOpen = !!expandedCustomizations[section.id];
    const c = section.customizations || {};
    const layout = c.layout || (section.type === 'interests' ? 'Bubble' : 'Grid');

    return (
      <div className="section-customizer-container" style={{ marginTop: '1.5rem', borderTop: '1px solid #222' }}>
        <div 
          className="customization-trigger-row" 
          onClick={() => setExpandedCustomizations(prev => ({ ...prev, [section.id]: !prev[section.id] }))} 
          style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '1rem', 
            background: '#1a1a1a', 
            borderRadius: isCustomsOpen ? '0' : '0 0 12px 12px', 
            fontSize: '0.9rem', 
            color: '#fff' 
          }}
        >
          <span>
            <i className="fa-solid fa-sliders" style={{ marginRight: '0.5rem', fontSize: '0.8rem' }}></i> 
            {isCustomsOpen ? 'Hide customizations for this section' : 'Show customizations for this section'}
          </span>
          <i className={`fa-solid ${isCustomsOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '0.8rem' }}></i>
        </div>

        {isCustomsOpen && (
          <div style={{ padding: '1.5rem', background: '#1e1e1e', borderTop: '1px solid rgba(255,255,255,0.05)', borderRadius: '0 0 12px 12px' }}>
            {section.type !== 'projects' && (
              <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600, color: '#f0f0f0' }}>
                {section.title || section.type.toUpperCase()}
              </h3>
            )}

            {/* Summary Customizations */}
            {section.type === 'summary' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="checkbox" 
                    id={`sum-header-${section.id}`} 
                    checked={!!c.displayInHeader} 
                    onChange={(e) => {
                      handleUpdateSectionCustomization(section.id, 'displayInHeader', e.target.checked);
                      setSummaryInHeader(e.target.checked);
                    }} 
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#EEC30C' }} 
                  />
                  <label htmlFor={`sum-header-${section.id}`} style={{ color: '#ccc', fontSize: '0.9rem', cursor: 'pointer' }}>
                    Display summary as part of header
                  </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="checkbox" 
                    id={`sum-heading-${section.id}`} 
                    checked={c.showHeading !== false} 
                    onChange={(e) => {
                      handleUpdateSectionCustomization(section.id, 'showHeading', e.target.checked);
                      setShowSummaryHeading(e.target.checked);
                    }} 
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#EEC30C' }} 
                  />
                  <label htmlFor={`sum-heading-${section.id}`} style={{ color: '#ccc', fontSize: '0.9rem', cursor: 'pointer' }}>
                    Show summary heading
                  </label>
                </div>
              </div>
            )}

            {/* Declaration Customizations */}
            {section.type === 'declaration' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                  <input 
                    type="checkbox" 
                    id={`decl-heading-${section.id}`} 
                    checked={c.showHeading !== false} 
                    onChange={(e) => handleUpdateSectionCustomization(section.id, 'showHeading', e.target.checked)} 
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#EEC30C' }} 
                  />
                  <label htmlFor={`decl-heading-${section.id}`} style={{ color: '#ccc', fontSize: '0.9rem', cursor: 'pointer' }}>
                    Show section heading
                  </label>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>Position</div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <button 
                    onClick={() => handleUpdateSectionCustomization(section.id, 'position', 'Left')} 
                    style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: `1px solid ${(!c.position || c.position === 'Left') ? '#EEC30C' : '#444'}`, background: (!c.position || c.position === 'Left') ? 'rgba(238,195,12,0.1)' : '#2a2a2a', color: (!c.position || c.position === 'Left') ? '#EEC30C' : '#aaa', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Left
                  </button>
                  <button 
                    onClick={() => handleUpdateSectionCustomization(section.id, 'position', 'Right')} 
                    style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: `1px solid ${c.position === 'Right' ? '#EEC30C' : '#444'}`, background: c.position === 'Right' ? 'rgba(238,195,12,0.1)' : '#2a2a2a', color: c.position === 'Right' ? '#EEC30C' : '#aaa', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Right
                  </button>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>Signature Line</div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <button 
                    onClick={() => handleUpdateSectionCustomization(section.id, 'signatureLine', 'None')} 
                    style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: `1px solid ${(!c.signatureLine || c.signatureLine === 'None') ? '#EEC30C' : '#444'}`, background: (!c.signatureLine || c.signatureLine === 'None') ? 'rgba(238,195,12,0.1)' : '#2a2a2a', color: (!c.signatureLine || c.signatureLine === 'None') ? '#EEC30C' : '#aaa', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    None
                  </button>
                  <button 
                    onClick={() => handleUpdateSectionCustomization(section.id, 'signatureLine', 'Solid')} 
                    style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: `1px solid ${c.signatureLine === 'Solid' ? '#EEC30C' : '#444'}`, background: c.signatureLine === 'Solid' ? 'rgba(238,195,12,0.1)' : '#2a2a2a', color: c.signatureLine === 'Solid' ? '#EEC30C' : '#aaa', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Solid
                  </button>
                </div>
              </div>
            )}

            {/* Experience Customizations */}
            {section.type === 'experience' && (
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>Order title/subtitle</div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button 
                    onClick={() => {
                      handleUpdateSectionCustomization(section.id, 'order', 'title-employer');
                      setWorkExpOrder('title-employer');
                    }} 
                    style={{ 
                      flex: 1, 
                      padding: '0.6rem', 
                      borderRadius: '8px', 
                      border: `1px solid ${c.order === 'title-employer' || c.order === 'title-first' || !c.order ? '#EEC30C' : '#444'}`, 
                      background: c.order === 'title-employer' || c.order === 'title-first' || !c.order ? 'rgba(238,195,12,0.1)' : '#2a2a2a', 
                      color: c.order === 'title-employer' || c.order === 'title-first' || !c.order ? '#EEC30C' : '#aaa', 
                      fontSize: '0.85rem', 
                      fontWeight: 600, 
                      cursor: 'pointer' 
                    }}
                  >
                    Job Title - Employer
                  </button>
                  <button 
                    onClick={() => {
                      handleUpdateSectionCustomization(section.id, 'order', 'employer-title');
                      setWorkExpOrder('employer-title');
                    }} 
                    style={{ 
                      flex: 1, 
                      padding: '0.6rem', 
                      borderRadius: '8px', 
                      border: `1px solid ${c.order === 'employer-title' || c.order === 'subtitle-first' ? '#EEC30C' : '#444'}`, 
                      background: c.order === 'employer-title' || c.order === 'subtitle-first' ? 'rgba(238,195,12,0.1)' : '#2a2a2a', 
                      color: c.order === 'employer-title' || c.order === 'subtitle-first' ? '#EEC30C' : '#aaa', 
                      fontSize: '0.85rem', 
                      fontWeight: 600, 
                      cursor: 'pointer' 
                    }}
                  >
                    Employer - Job Title
                  </button>
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>Employment History</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="checkbox" 
                    id={`group-promo-${section.id}`} 
                    checked={!!c.groupPromotions} 
                    onChange={(e) => handleUpdateSectionCustomization(section.id, 'groupPromotions', e.target.checked)} 
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#EEC30C' }} 
                  />
                  <label htmlFor={`group-promo-${section.id}`} style={{ color: '#ccc', fontSize: '0.9rem', cursor: 'pointer' }}>
                    Group promotions
                  </label>
                </div>
              </div>
            )}

            {/* Education Customizations */}
            {section.type === 'education' && (
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>Title & Subtitle Order</div>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button 
                    onClick={() => handleUpdateSectionCustomization(section.id, 'order', 'degree-school')} 
                    style={{ 
                      flex: 1, 
                      padding: '0.6rem', 
                      borderRadius: '8px', 
                      border: `1px solid ${c.order === 'degree-school' || c.order === 'title-first' || !c.order ? '#EEC30C' : '#444'}`, 
                      background: c.order === 'degree-school' || c.order === 'title-first' || !c.order ? 'rgba(238,195,12,0.1)' : '#2a2a2a', 
                      color: c.order === 'degree-school' || c.order === 'title-first' || !c.order ? '#EEC30C' : '#aaa', 
                      fontSize: '0.85rem', 
                      fontWeight: 600, 
                      cursor: 'pointer' 
                    }}
                  >
                    Degree, School
                  </button>
                  <button 
                    onClick={() => handleUpdateSectionCustomization(section.id, 'order', 'school-degree')} 
                    style={{ 
                      flex: 1, 
                      padding: '0.6rem', 
                      borderRadius: '8px', 
                      border: `1px solid ${c.order === 'school-degree' || c.order === 'subtitle-first' ? '#EEC30C' : '#444'}`, 
                      background: c.order === 'school-degree' || c.order === 'subtitle-first' ? 'rgba(238,195,12,0.1)' : '#2a2a2a', 
                      color: c.order === 'school-degree' || c.order === 'subtitle-first' ? '#EEC30C' : '#aaa', 
                      fontSize: '0.85rem', 
                      fontWeight: 600, 
                      cursor: 'pointer' 
                    }}
                  >
                    School, Degree
                  </button>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#777' }}>
                  Hint: Find additional customization options in <span style={{ textDecoration: 'underline', cursor: 'pointer', color: '#aaa' }} onClick={() => setActiveTab('customize')}>Customize &gt; Entry Layout</span>
                </div>
              </div>
            )}

            {/* Layout Customizations for other sections */}
            {section.type !== 'summary' && section.type !== 'experience' && section.type !== 'education' && section.type !== 'declaration' && (
              <div>
                {section.type !== 'projects' && (
                  <>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                      {['Grid', 'Rows', 'Compact', 'Bubble', 'Level'].map(lay => (
                    <button
                      key={lay}
                      onClick={() => handleUpdateSectionCustomization(section.id, 'layout', lay)}
                      style={{
                        flex: 1,
                        padding: '0.5rem',
                        border: `1px solid ${layout === lay ? '#EEC30C' : '#444'}`,
                        borderRadius: '8px',
                        background: layout === lay ? 'rgba(238,195,12,0.1)' : 'transparent',
                        color: layout === lay ? '#EEC30C' : '#ccc',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600
                      }}
                    >
                      {lay}
                    </button>
                  ))}
                </div>

                {layout === 'Grid' && (
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>Columns</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    {[1, 2, 3, 4].map(cols => (
                      <button
                        key={cols}
                        onClick={() => handleUpdateSectionCustomization(section.id, 'columns', cols)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          border: `1px solid ${(c.columns || 2) === cols ? '#EEC30C' : '#444'}`,
                          borderRadius: '8px',
                          background: (c.columns || 2) === cols ? 'rgba(238,195,12,0.1)' : 'transparent',
                          color: (c.columns || 2) === cols ? '#EEC30C' : '#ccc',
                          cursor: 'pointer'
                        }}
                      >
                        {cols === 1 && <div style={{ width: '20px', height: '8px', background: 'currentColor', margin: '0 auto' }} />}
                        {cols === 2 && (
                          <div style={{ display: 'flex', gap: '2px', justifyContent: 'center' }}>
                            <div style={{ width: '10px', height: '8px', background: 'currentColor' }} />
                            <div style={{ width: '10px', height: '8px', background: 'currentColor' }} />
                          </div>
                        )}
                        {cols === 3 && (
                          <div style={{ display: 'flex', gap: '2px', justifyContent: 'center' }}>
                            <div style={{ width: '6px', height: '8px', background: 'currentColor' }} />
                            <div style={{ width: '6px', height: '8px', background: 'currentColor' }} />
                            <div style={{ width: '6px', height: '8px', background: 'currentColor' }} />
                          </div>
                        )}
                        {cols === 4 && (
                          <div style={{ display: 'flex', gap: '2px', justifyContent: 'center' }}>
                            <div style={{ width: '4px', height: '8px', background: 'currentColor' }} />
                            <div style={{ width: '4px', height: '8px', background: 'currentColor' }} />
                            <div style={{ width: '4px', height: '8px', background: 'currentColor' }} />
                            <div style={{ width: '4px', height: '8px', background: 'currentColor' }} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>Subinfo Style</div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                      {['None', 'Colon', 'Dash', 'Bracket'].map(style => (
                        <button
                          key={style}
                          onClick={() => handleUpdateSectionCustomization(section.id, 'subinfoStyle', style)}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            border: `1px solid ${(c.subinfoStyle || 'None') === style ? '#EEC30C' : '#444'}`,
                            borderRadius: '8px',
                            background: (c.subinfoStyle || 'None') === style ? 'rgba(238,195,12,0.1)' : 'transparent',
                            color: (c.subinfoStyle || 'None') === style ? '#EEC30C' : '#ccc',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          {style === 'None' && 'None'}
                          {style === 'Colon' && ': Colon'}
                          {style === 'Dash' && '— Dash'}
                          {style === 'Bracket' && '() Bracket'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {layout === 'Rows' && (
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>Row spacing</div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                      {['Tight', 'Spacious'].map(spacing => (
                        <button
                          key={spacing}
                          onClick={() => handleUpdateSectionCustomization(section.id, 'rowSpacing', spacing)}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            border: `1px solid ${(c.rowSpacing || 'Tight') === spacing ? '#EEC30C' : '#444'}`,
                            borderRadius: '8px',
                            background: (c.rowSpacing || 'Tight') === spacing ? 'rgba(238,195,12,0.1)' : 'transparent',
                            color: (c.rowSpacing || 'Tight') === spacing ? '#EEC30C' : '#ccc',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          {spacing}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                      <input 
                        type="checkbox" 
                        id={`start-bullets-${section.id}`} 
                        checked={!!c.startBullets} 
                        onChange={(e) => handleUpdateSectionCustomization(section.id, 'startBullets', e.target.checked)} 
                        style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#EEC30C' }} 
                      />
                      <label htmlFor={`start-bullets-${section.id}`} style={{ color: '#ccc', fontSize: '0.9rem', cursor: 'pointer' }}>
                        Start rows with bullets
                      </label>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>Subinfo Style</div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                      {['None', 'Colon', 'Dash', 'Bracket'].map(style => (
                        <button
                          key={style}
                          onClick={() => handleUpdateSectionCustomization(section.id, 'subinfoStyle', style)}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            border: `1px solid ${(c.subinfoStyle || 'None') === style ? '#EEC30C' : '#444'}`,
                            borderRadius: '8px',
                            background: (c.subinfoStyle || 'None') === style ? 'rgba(238,195,12,0.1)' : 'transparent',
                            color: (c.subinfoStyle || 'None') === style ? '#EEC30C' : '#ccc',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          {style === 'None' && 'None'}
                          {style === 'Colon' && ': Colon'}
                          {style === 'Dash' && '— Dash'}
                          {style === 'Bracket' && '() Bracket'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {layout === 'Compact' && (
                  <div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                      {['Bullet', 'Pipe', 'Comma'].map(sep => (
                        <button
                          key={sep}
                          onClick={() => handleUpdateSectionCustomization(section.id, 'separator', sep)}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            border: `1px solid ${(c.separator || 'Comma') === sep ? '#EEC30C' : '#444'}`,
                            borderRadius: '8px',
                            background: (c.separator || 'Comma') === sep ? 'rgba(238,195,12,0.1)' : 'transparent',
                            color: (c.separator || 'Comma') === sep ? '#EEC30C' : '#ccc',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          {sep}
                        </button>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>Subinfo Style</div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                      {['None', 'Colon', 'Dash', 'Bracket'].map(style => (
                        <button
                          key={style}
                          onClick={() => handleUpdateSectionCustomization(section.id, 'subinfoStyle', style)}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            border: `1px solid ${(c.subinfoStyle || 'None') === style ? '#EEC30C' : '#444'}`,
                            borderRadius: '8px',
                            background: (c.subinfoStyle || 'None') === style ? 'rgba(238,195,12,0.1)' : 'transparent',
                            color: (c.subinfoStyle || 'None') === style ? '#EEC30C' : '#ccc',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          {style === 'None' && 'None'}
                          {style === 'Colon' && ': Colon'}
                          {style === 'Dash' && '— Dash'}
                          {style === 'Bracket' && '() Bracket'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {layout === 'Bubble' && (
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#aaa', marginBottom: '0.5rem' }}>Subinfo Style</div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                      {['None', 'Colon', 'Dash', 'Bracket'].map(style => (
                        <button
                          key={style}
                          onClick={() => handleUpdateSectionCustomization(section.id, 'subinfoStyle', style)}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            border: `1px solid ${(c.subinfoStyle || 'None') === style ? '#EEC30C' : '#444'}`,
                            borderRadius: '8px',
                            background: (c.subinfoStyle || 'None') === style ? 'rgba(238,195,12,0.1)' : 'transparent',
                            color: (c.subinfoStyle || 'None') === style ? '#EEC30C' : '#ccc',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          {style === 'None' && 'None'}
                          {style === 'Colon' && ': Colon'}
                          {style === 'Dash' && '— Dash'}
                          {style === 'Bracket' && '() Bracket'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {layout === 'Level' && (
                  <>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                      {['Text', 'Dots', 'Bar'].map(style => (
                        <button
                          key={style}
                          onClick={() => handleUpdateSectionCustomization(section.id, 'levelStyle', style)}
                          style={{
                            flex: 1,
                            padding: '0.5rem',
                            border: `1px solid ${(c.levelStyle || 'Dots') === style ? '#EEC30C' : '#444'}`,
                            borderRadius: '8px',
                            background: (c.levelStyle || 'Dots') === style ? 'rgba(238,195,12,0.1)' : 'transparent',
                            color: (c.levelStyle || 'Dots') === style ? '#EEC30C' : '#ccc',
                            cursor: 'pointer',
                            fontSize: '0.85rem'
                          }}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                    {!(section.items || []).some(item => typeof item === 'object' && item.level) && (
                      <div style={{ background: 'rgba(238,195,12,0.1)', color: '#EEC30C', border: '1px solid #EEC30C', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '8px', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        <i className="fa-solid fa-circle-info" style={{ marginTop: '2px' }} />
                        <span>Assign levels to your {section.type} option above to unlock this display style</span>
                      </div>
                    )}
                  </>
                )}
                  </>
                )}
                <div style={{ fontSize: '0.75rem', color: '#777', marginTop: '0.5rem' }}>
                  Hint: Find additional customization options in <span style={{ textDecoration: 'underline', cursor: 'pointer', color: '#aaa' }} onClick={() => setActiveTab('customize')}>Customize &gt; Entry Layout</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Rendering individual sections in A4 Preview Panel
  // Render header dynamically inside A4 page sheet based on columns and position
  const renderHeader = () => {
    const nameSizes = { xs: '1.5rem', s: '2rem', m: '2.5rem', l: '3rem', xl: '3.5rem' };
    const roleSizes = { s: '1rem', m: '1.25rem', l: '1.5rem' };

    const nameStyle = {
      fontSize: `${parseFloat(fontSize) + parseFloat(fullNameFontSizeOffset)}pt`,
      fontWeight: nameBold ? '900' : 'normal',
      fontFamily: nameFont === 'creative' ? `'${nameCreativeFont}', cursive` : 'inherit',
      color: applyAccentToName ? accentColor : 'inherit',
      margin: '0',
      letterSpacing: '-0.02em',
      lineHeight: '1.1'
    };

    const roleStyleObj = {
      fontSize: `${parseFloat(fontSize) + parseFloat(profTitleFontSizeOffset)}pt`,
      color: applyAccentToSubtitle ? accentColor : 'inherit',
      fontWeight: '700',
      marginTop: rolePosition === 'below' ? '4px' : '0',
      fontStyle: roleStyle === 'italic' ? 'italic' : 'normal',
      display: rolePosition === 'beside' ? 'inline-block' : 'block',
      marginLeft: rolePosition === 'beside' ? '12px' : '0',
      verticalAlign: 'baseline'
    };

    // Contacts icons class mappings based on headerIconStyle preset
    const renderContactIcon = (iconClass) => {
      if (headerIconType === 'bullet') return <span style={{ marginRight: '5px' }}>•</span>;
      if (headerIconType === 'bar') return <span style={{ marginRight: '5px' }}>|</span>;
      if (headerIconType === 'icon') {
        const isFilled = headerIconStyle.includes('filled');
        const isCircle = headerIconStyle.includes('circle') && !headerIconStyle.includes('squircle');
        const isSquare = headerIconStyle.includes('square');
        const isSquircle = headerIconStyle.includes('squircle');
        const isGray = headerIconStyle.includes('gray');
        
        let styleObj = {
          marginRight: '5px',
          color: applyAccentToHeaderIcons ? accentColor : 'inherit'
        };

        if (isCircle || isSquare || isSquircle) {
          styleObj = {
            ...styleObj,
            background: isFilled ? (applyAccentToHeaderIcons ? accentColor : '#555') : 'transparent',
            color: isFilled ? '#fff' : (applyAccentToHeaderIcons ? accentColor : 'inherit'),
            border: `1.5px solid ${applyAccentToHeaderIcons ? accentColor : '#555'}`,
            padding: '3px',
            borderRadius: isCircle ? '50%' : isSquircle ? '6px' : '0',
            width: '18px',
            height: '18px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem'
          };
        }

        if (isGray) {
          styleObj.color = '#777';
          if (styleObj.background) styleObj.background = '#f0f0f0';
          if (styleObj.border) styleObj.border = '1px solid #ccc';
        }

        return <i className={iconClass} style={styleObj} />;
      }
      return null;
    };

    return (
      <div
        className="sheet-header"
        style={{
          borderBottom: `2px solid ${applyAccentToLines ? accentColor : '#ccc'}`,
          paddingBottom: '1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          textAlign: headerAlignment,
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: headerAlignment === 'center' ? 'center' : 'flex-start' }}>
          <div style={{ display: rolePosition === 'beside' ? 'flex' : 'block', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <h1 id="sheet-fullname" style={nameStyle}>{resumeData.name}</h1>
            <div id="sheet-role" style={roleStyleObj}>{resumeData.role}</div>
          </div>
          
          <div
            className="sheet-contact"
            style={{
              display: 'flex',
              flexDirection: headerArrangement === 'stacked' ? 'column' : 'row',
              flexWrap: 'wrap',
              justifyContent: headerAlignment === 'center' ? 'center' : (headerArrangement === 'columns' ? 'space-between' : 'flex-start'),
              gap: headerArrangement === 'stacked' ? '5px' : (headerArrangement === 'columns' ? '10px 20px' : '10px 15px'),
              marginTop: '12px',
              fontSize: '0.85em',
              color: '#555',
              width: '100%',
              textAlign: headerAlignment === 'center' ? 'center' : 'left'
            }}
          >
            {showEmail && resumeData.email && (
              <span style={{ order: 0, textDecoration: advLinkSettings.underline.email ? 'underline' : 'none', color: advLinkSettings.blueColor.email ? '#2b579a' : 'inherit' }}>
                {renderContactIcon('fa-solid fa-envelope')} {resumeData.email}
                {advLinkSettings.icon.email ? <i className="fa-solid fa-arrow-up-right-from-square" style={{marginLeft: '4px', fontSize: '0.8em'}}></i> : null}
              </span>
            )}
            {showPhone && resumeData.phone && (
              <span style={{ order: personalDetailsOrder.indexOf('phone') + 1, textDecoration: advLinkSettings.underline.phone ? 'underline' : 'none', color: advLinkSettings.blueColor.phone ? '#2b579a' : 'inherit' }}>
                {renderContactIcon('fa-solid fa-phone')} {resumeData.phone}
                {advLinkSettings.icon.phone ? <i className="fa-solid fa-arrow-up-right-from-square" style={{marginLeft: '4px', fontSize: '0.8em'}}></i> : null}
              </span>
            )}
            {showAddress && resumeData.address && (
              <span style={{ order: personalDetailsOrder.indexOf('address') + 1, textDecoration: advLinkSettings.underline.location ? 'underline' : 'none', color: advLinkSettings.blueColor.location ? '#2b579a' : 'inherit' }}>
                {renderContactIcon('fa-solid fa-location-dot')} {resumeData.address}
                {advLinkSettings.icon.location ? <i className="fa-solid fa-arrow-up-right-from-square" style={{marginLeft: '4px', fontSize: '0.8em'}}></i> : null}
              </span>
            )}
            {resumeData.extraDetails && Object.keys(resumeData.extraDetails).map(key => {
              const val = resumeData.extraDetails[key];
              if (!val) return null;
              const icon = pillIcons[key] || 'fa-solid fa-info';
              return (
                <span key={key} style={{ order: personalDetailsOrder.indexOf(key) + 1 }}>
                  {renderContactIcon(icon)} {val}
                </span>
              );
            })}
          </div>

          {summaryInHeader && (() => {
            const sumSec = resumeData.sections.find(s => s.type === 'summary');
            if (sumSec && !hiddenItems[sumSec.id]?.[0]) {
              const summaryText = sumSec.items?.[0]?.desc || sumSec.content;
              if (!summaryText) return null;
              return (
                <p 
                  id="sheet-header-summary"
                  style={{ 
                    marginTop: '0.8rem', 
                    fontSize: '0.9em', 
                    color: '#4b5563', 
                    maxWidth: '100%',
                    textAlign: headerAlignment,
                    lineHeight: '1.4'
                  }}
                  dangerouslySetInnerHTML={{ __html: summaryText }}
                />
              );
            }
            return null;
          })()}
        </div>

        {showPhoto && resumeData.photo && (
          <div
            style={{
              width: photoSize === 'small' ? '54px' : photoSize === 'large' ? '90px' : '72px',
              height: photoShape.startsWith('portrait') ? (photoSize === 'small' ? '72px' : photoSize === 'large' ? '120px' : '96px') : (photoSize === 'small' ? '54px' : photoSize === 'large' ? '90px' : '72px'),
              ...(photoShape === 'portrait' ? { borderRadius: 0 } : photoShape === 'portrait-rounded' ? { borderRadius: '8px' } : photoShape === 'hexagon' ? { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', borderRadius: 0 } : { borderRadius: photoShape === 'square' ? '0' : photoShape === 'rounded' ? '8px' : photoShape === 'squircle' ? '24px' : '50%' }),
              overflow: 'hidden',
              marginLeft: headerAlignment === 'center' ? '0' : '1.5rem',
              marginTop: headerAlignment === 'center' ? '1rem' : '0',
              flexShrink: 0,
              border: `2px solid ${accentColor}`
            }}
          >
            <img
              src={resumeData.photo}
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: photoGrayscale ? 'grayscale(100%)' : 'none',
                transform: `scale(${photoZoom}) translate(${photoPanX}px, ${photoPanY}px)`
              }}
            />
          </div>
        )}
      </div>
    );
  };

  // Rendering individual sections in A4 Preview Panel
  const renderPreviewSection = (section) => {
    if (section.type === 'pagebreak') return null;

    const c = section.customizations || {};
    const showTitle = c.showHeading !== false;
    const isFlow = ['flow-icon-heading', 'flow-short-underline', 'flow-black-underline'].includes(headingStyle);
    const iconClass = iconMap[section.type] || iconMap[(section.title || '').toLowerCase()] || 'fa-solid fa-circle-dot';
    const baseIcon = sectionIcons[section.id] !== undefined ? sectionIcons[section.id] : iconClass;
    const currentIcon = baseIcon === 'hidden' || headingIcons === 'none' ? 'hidden' : baseIcon;

    let contentHTML = null;

    if (section.type === 'summary') {
      if (summaryInHeader) return null;
      let currentItems = section.items || [];
      if (currentItems.length === 0 && section.content) {
        currentItems = [{ desc: section.content }];
      }
      const visibleItems = currentItems.filter((_, idx) => !hiddenItems[section.id]?.[idx]);

      if (visibleItems.length === 0) return null;
      const showSummaryHeadingFinal = showSummaryHeading;

      return (
        <div key={section.id} className="sheet-section" style={{ marginBottom: `${entrySpacing * 8}px` }}>
          {showSummaryHeadingFinal && (
            <h2 className="sheet-section-title">
              {currentIcon !== 'hidden' && <i className={currentIcon} style={{ marginRight: '8px' }} />}
              {section.title}
            </h2>
          )}
          {visibleItems.map((item, idx) => (
            <div key={idx} className="sheet-summary-text" style={{ fontSize: '0.95em', lineHeight: '1.5', color: '#222', marginBottom: idx < visibleItems.length - 1 ? '0.75rem' : '0' }} dangerouslySetInnerHTML={{ __html: (item.desc || '').replace(/data-href="/g, 'href="').replace(/title="Remove link"/g, 'title=""') }} />
          ))}
        </div>
      );
    }

    const isLayoutSection = ['skills', 'languages', 'certificates', 'interests'].includes(section.type) || (section.type === 'custom' && section.customType === 'skill') || (['courses', 'awards', 'organisations', 'publications', 'custom'].includes(section.type) && c.layout);

    if (isLayoutSection) {
      // Filter out hidden items
      const visibleItems = (section.items || []).filter((_, idx) => !hiddenItems[section.id]?.[idx]);
      const layout = c.layout || (section.type === 'interests' ? interestsLayout : 'Grid');

      const formatSubinfo = (desc, style) => {
        if (!desc || !desc.replace(/<[^>]+>/g, '').trim()) return '';
        const separator = style === 'Colon' ? ':' : (style === 'Dash' ? '—' : '');
        const pre = style === 'Bracket' ? '(' : '';
        const post = style === 'Bracket' ? ')' : '';
        
        let cleanedDesc = desc.replace(/<\/?(p|div|ul|li|h[1-6]|br)[^>]*>/gi, ' ')
                              .replace(/data-href="/g, 'href="')
                              .replace(/title="Remove link"/g, 'title=""')
                              .replace(/\s+/g, ' ')
                              .trim();

        const isGrid = layout.toLowerCase() === 'grid';
        const isNewline = style === 'Bracket' || (isGrid && style !== 'Dash' && style !== 'Colon');
        const Wrapper = isNewline ? 'div' : 'span';
        const wordBreakValue = style === 'Colon' ? 'break-all' : 'break-word';
        const leadingSpace = isNewline ? '' : (separator ? (style === 'Colon' ? '' : ' ') : ' ');

        return (
          <Wrapper style={{ fontWeight: 'normal', color: '#666', wordBreak: wordBreakValue, overflowWrap: 'anywhere', display: isNewline ? 'block' : 'inline', marginTop: isNewline ? '0.2rem' : '0' }}>
            {leadingSpace}{separator}{separator ? ' ' : ''}{pre}
            <span dangerouslySetInnerHTML={{ __html: cleanedDesc }} style={{display: 'inline'}} />
            {post}
          </Wrapper>
        );
      };

      const formatLevel = (level, style) => {
        if (!level) return null;
        let score = 3;
        if (level === 'Beginner' || level === 'Level 1') score = 1;
        else if (level === 'Level 2' || level === 'Amateur') score = 2;
        else if (level === 'Intermediate' || level === 'Level 3' || level === 'Competent') score = 3;
        else if (level === 'Advanced' || level === 'Level 4' || level === 'Proficient') score = 4;
        else if (level === 'Expert' || level === 'Level 5') score = 5;
        else if (!isNaN(parseInt(level))) score = parseInt(level);

        if (style === 'Dots') {
          return (
            <div style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
              {[1, 2, 3, 4, 5].map(i => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: i <= score ? (applyAccentToDots ? accentColor : 'currentColor') : 'rgba(0,0,0,0.15)'
                  }}
                />
              ))}
            </div>
          );
        } else if (style === 'Bar') {
          return (
            <div style={{ width: '50px', height: '4px', background: 'rgba(0,0,0,0.15)', borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle', overflow: 'hidden' }}>
              <div style={{ width: `${(score / 5) * 100}%`, height: '100%', background: applyAccentToDots ? accentColor : 'currentColor', borderRadius: '2px' }} />
            </div>
          );
        }
        
        let displayText = level;
        if (level.startsWith('Level ')) {
          const levelNum = level.replace('Level ', '');
          displayText = c['level' + levelNum] || ['Basic', 'Conversational', 'Proficient', 'Fluent', 'Native/Bilingual'][levelNum - 1] || level;
        }
        return <span style={{ fontSize: '0.8em', color: '#888' }}>{displayText}</span>;
      };

      if (layout === 'Grid' || layout === 'grid') {
        const cols = c.columns || (section.type === 'interests' ? interestsCols : 2);
        contentHTML = (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '0.5rem' }}>
            {visibleItems.map((skill, idx) => {
              const name = typeof skill === 'object' ? (skill.title || skill.name || skill.role) : skill;
              const rolePart = (typeof skill === 'object' && skill.title && skill.role) ? ` - ${skill.role}` : '';
              const url = typeof skill === 'object' ? (skill.titleUrl || skill.url) : '';
              const desc = typeof skill === 'object' ? skill.desc : '';
              const level = typeof skill === 'object' ? skill.level : '';
              if (!name && !desc && !level) return null;
              const nameHtml = url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>{name}</a> : name;
              return (
                <div key={idx} style={{ padding: '0.2rem 0', fontWeight: '600', color: '#333', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                  {nameHtml}{rolePart}
                  {formatSubinfo(desc, c.subinfoStyle || 'None')}
                </div>
              );
            })}
          </div>
        );
      } else if (layout === 'Rows' || layout === 'rows') {
        const spacing = c.rowSpacing === 'Spacious' ? '0.8rem' : '0.4rem';
        const bullet = c.startBullets ? '• ' : '';
        contentHTML = (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {visibleItems.map((item, idx) => {
              const name = typeof item === 'object' ? (item.title || item.name || item.role) : item;
              const rolePart = (typeof item === 'object' && item.title && item.role) ? ` - ${item.role}` : '';
              const url = typeof item === 'object' ? (item.titleUrl || item.url) : '';
              const desc = typeof item === 'object' ? item.desc : '';
              const level = typeof item === 'object' ? item.level : '';
              if (!name && !desc && !level) return null;
              const nameHtml = url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>{name}</a> : name;
              return (
                <div key={idx} style={{ marginBottom: spacing, lineHeight: '1.4', color: '#333', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                  <span style={{ fontWeight: '600' }}>{bullet}{nameHtml}{rolePart}</span>
                  {formatSubinfo(desc, c.subinfoStyle || 'None')}
                </div>
              );
            })}
          </div>
        );
      } else if (layout === 'Compact' || layout === 'compact') {
        const sepType = c.separator || 'Comma';
        const sepChar = sepType === 'Bullet' ? ' • ' : (sepType === 'Pipe' ? ' | ' : ', ');
        contentHTML = (
          <div style={{ lineHeight: '1.6', color: '#333', fontWeight: '600', wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
            {visibleItems.map((item, idx) => {
              const name = typeof item === 'object' ? (item.title || item.name || item.role) : item;
              const rolePart = (typeof item === 'object' && item.title && item.role) ? ` - ${item.role}` : '';
              const url = typeof item === 'object' ? (item.titleUrl || item.url) : '';
              const desc = typeof item === 'object' ? item.desc : '';
              const level = typeof item === 'object' ? item.level : '';
              if (!name && !desc && !level) return null;
              const nameHtml = url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>{name}</a> : name;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && sepChar}
                  <span>{nameHtml}{rolePart}</span>
                  {formatSubinfo(desc, c.subinfoStyle || 'None')}
                </React.Fragment>
              );
            })}
          </div>
        );
      } else if (layout === 'Bubble' || layout === 'bubble') {
        const styleClass = c.bubbleStyle === 'Solid' ? 'solid' : (c.bubbleStyle === 'Soft' ? 'soft' : 'outline');
        contentHTML = (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {visibleItems.map((item, idx) => {
              const name = typeof item === 'object' ? (item.title || item.name || item.role) : item;
              const rolePart = (typeof item === 'object' && item.title && item.role) ? ` - ${item.role}` : '';
              const url = typeof item === 'object' ? (item.titleUrl || item.url) : '';
              const desc = typeof item === 'object' ? item.desc : '';
              const level = typeof item === 'object' ? item.level : '';
              if (!name && !desc && !level) return null;
              
              const nameHtml = url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>{name}</a> : name;
              
              let bubbleStyleObj = {};
              if (styleClass === 'solid') {
                bubbleStyleObj = {
                  background: applyAccentToDots ? accentColor : '#000',
                  color: applyAccentToDots ? '#000' : '#fff',
                  fontWeight: '700'
                };
              } else if (styleClass === 'outline') {
                bubbleStyleObj = {
                  border: `1px solid ${applyAccentToDots ? accentColor : '#000'}`,
                  color: applyAccentToDots ? accentColor : '#000',
                  fontWeight: '600'
                };
              } else if (styleClass === 'soft') {
                bubbleStyleObj = {
                  background: '#f0f0f0',
                  color: '#333',
                  fontWeight: '600'
                };
              }

              return (
                <div key={idx} className={`sheet-bubble ${styleClass}`} style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8rem', wordBreak: 'break-word', overflowWrap: 'anywhere', ...bubbleStyleObj }}>
                  {nameHtml}{rolePart}
                  {formatSubinfo(desc, c.subinfoStyle || 'None')}
                </div>
              );
            })}
          </div>
        );
      } else if (layout === 'Level' || layout === 'level') {
        contentHTML = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {visibleItems.map((item, idx) => {
              const name = typeof item === 'object' ? (item.title || item.name || item.role) : item;
              const rolePart = (typeof item === 'object' && item.title && item.role) ? ` - ${item.role}` : '';
              const url = typeof item === 'object' ? (item.titleUrl || item.url) : '';
              const level = typeof item === 'object' ? item.level : '';
              const desc = typeof item === 'object' ? item.desc : '';
              if (!name && !desc && !level) return null;
              const nameHtml = url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>{name}</a> : name;
              return (
                <div key={idx} style={{ marginBottom: '0.3rem', color: '#333' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                      <span style={{ fontWeight: '600' }}>{nameHtml}{rolePart}</span>
                      {formatSubinfo(desc, c.subinfoStyle || 'None')}
                    </div>
                    {formatLevel(level, c.levelStyle || 'Dots')}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    } else if (section.type === 'declaration') {
      const declPos = c.position || 'Left';
      const declSig = c.signatureLine || 'None';
      contentHTML = (
        <div className="sheet-entries-container">
          {(section.items || []).map((item, idx) => {
            if (hiddenItems[section.id]?.[idx]) return null;
            if (!item.name && !item.desc && !item.signature) return null;
            const meta = [item.location, item.dateRange].filter(Boolean).join(', ');
            
            const customSigImg = item.signature ? (
              <img src={item.signature} style={{ maxHeight: '60px', marginBottom: '5px', display: 'block' }} alt="Signature" />
            ) : null;
            
            const sigLineHtml = declSig === 'Solid' ? (
              <div style={{ borderTop: '1px solid #000', width: item.signature ? '100%' : '200px', marginTop: item.signature ? '0' : '40px', marginBottom: '5px' }} />
            ) : null;
            
            const alignStyle = {
              display: 'flex',
              flexDirection: 'column',
              alignItems: declPos === 'Right' ? 'flex-end' : 'flex-start',
              textAlign: declPos === 'Right' ? 'right' : 'left',
              minWidth: '150px',
              maxWidth: '70%',
              marginLeft: declPos === 'Right' ? 'auto' : '0'
            };

            return (
              <div key={idx} className="sheet-entry" style={{ marginBottom: `${entrySpacing * 4}px`, display: declPos === 'Right' ? 'flex' : 'block', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {item.desc && (
                  <div className="sheet-entry-desc" style={{ flex: 1, marginRight: declPos === 'Right' ? '2rem' : '0', marginBottom: declPos === 'Right' ? '0' : '1rem', wordBreak: 'break-word', overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: (item.desc || '').replace(/data-href="/g, 'href="').replace(/title="Remove link"/g, 'title=""') }} />
                )}
                <div style={{ marginTop: declPos === 'Right' ? '0' : '1rem', flexShrink: 0, ...alignStyle }}>
                  {(customSigImg || sigLineHtml) && (
                    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: declPos === 'Right' ? 'flex-end' : 'flex-start' }}>
                      {customSigImg}
                      {sigLineHtml}
                    </div>
                  )}
                  {item.name && <div style={{ fontWeight: '600' }}>{item.name}</div>}
                  {meta && <div style={{ color: '#888', fontSize: '0.85em' }}>{meta}</div>}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      // Entry-by-entry layouts
      const order = c.order || workExpOrder || 'title-first';
      const groupPromotions = c.groupPromotions === true;
      const titleScale = titleSize === 's' ? 0.9 : titleSize === 'l' ? 1.2 : 1.05;
      const subtitleScale = titleSize === 's' ? 0.8 : titleSize === 'l' ? 1.0 : 0.9;
      const basePt = parseFloat(fontSize) + parseFloat(entryHeaderFontSizeOffset);
      const titleFontSize = `${basePt * titleScale}pt`;
      const subtitleFontSize = `${basePt * subtitleScale}pt`;
      // Filter out hidden items for entry-by-entry sections
      const visibleEntries = (section.items || []).filter((_, idx) => !hiddenItems[section.id]?.[idx]);

      contentHTML = (
        <div className="sheet-entries-container">
          {visibleEntries.map((item, idx) => {
            let entryTitle = '';
            let entrySubtitle = '';

            if (section.type === 'experience') {
              const jobTitle = item.role || item.institution || item.company || '';
              const employerText = item.title || item.name || '';
              const employerHtml = item.titleUrl ? <a href={item.titleUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>{employerText}</a> : employerText;
              
              if (order === 'employer-title' || order === 'subtitle-first') {
                entryTitle = employerHtml;
                entrySubtitle = jobTitle;
              } else {
                entryTitle = jobTitle;
                entrySubtitle = employerHtml;
              }
            } else if (section.type === 'education') {
              const eduOrder = c.order || 'degree-school';
              const degreeText = item.role || item.institution || item.degree || '';
              const schoolText = item.title || item.name || '';
              
              const schoolHtml = item.titleUrl ? <a href={item.titleUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>{schoolText}</a> : schoolText;
              
              if (eduOrder === 'school-degree') {
                entryTitle = schoolHtml;
                entrySubtitle = degreeText;
              } else {
                entryTitle = degreeText;
                entrySubtitle = schoolHtml;
              }
            } else if (section.type === 'projects' || section.type === 'courses' || section.type === 'awards' || section.type === 'organisations' || section.type === 'publications' || section.type === 'references' || section.type === 'custom' || !section.type) {
              const text = item.title || item.name || '';
              const linkIcon = (item.titleUrl && applyAccentToLinkIcons) ? <i className="fa-solid fa-link" style={{ marginLeft: '6px', fontSize: '0.8em', color: accentColor }}></i> : null;
              entryTitle = item.titleUrl ? <a href={item.titleUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>{text}{linkIcon}</a> : text;
              entrySubtitle = item.role || item.institution || item.issuer || item.position || item.publisher || '';
            }

            const hasDates = (section.type === 'awards' || section.type === 'publications') 
              ? (item.day || item.month || item.year) 
              : item.dateRange;

            if (!entryTitle && !entrySubtitle && !item.desc && !hasDates && !item.location) return null;

            let dates = null;
            if (section.type === 'awards' || section.type === 'publications') {
              const dateParts = [!item.hideDay && item.day, !item.hideMonth && item.month, item.year].filter(Boolean);
              const dateStr = dateParts.join(' ');
              dates = dateStr ? (
                <span className="sheet-entry-date" style={{ color: applyAccentToDates ? accentColor : '#666', fontSize: '0.85em', fontWeight: 'normal', float: 'right' }}>
                  {dateStr}
                </span>
              ) : null;
            } else {
              dates = item.dateRange ? (
                <span className="sheet-entry-date" style={{ color: applyAccentToDates ? accentColor : '#666', fontSize: '0.85em', fontWeight: 'normal', float: 'right' }}>
                  {item.dateRange}
                </span>
              ) : null;
            }

            const locationStr = item.location ? ` • ${item.location}` : '';

            const titleBlock = order === 'subtitle-first' ? entrySubtitle : entryTitle;
            const subtitleBlock = order === 'subtitle-first' ? entryTitle : entrySubtitle;

            const groupStyle = section.type === 'experience' && groupPromotions
              ? { paddingLeft: '1rem', borderLeft: '2px solid #ddd', marginLeft: '0.5rem', marginBottom: `${entrySpacing * 4}px` }
              : { marginBottom: `${entrySpacing * 4}px` };

            const isLayout2 = entryLayout === 2;

            if (isLayout2) {
              const leftWidth = entryColWidth === 'manual' ? `${manualLeftPercent}%` : '100px';
              
              const leftStyleObj = {
                flex: entryColWidth === 'manual' ? `0 0 ${leftWidth}` : `0 0 100px`,
                textAlign: 'right',
                fontWeight: subtitleStyle === 'bold' ? '700' : '400',
                fontStyle: subtitleStyle === 'italic' ? 'italic' : 'normal',
                fontSize: subtitleFontSize,
                color: applyAccentToSubtitle ? accentColor : 'inherit',
                marginRight: '1rem',
                wordBreak: 'break-word',
                overflowWrap: 'anywhere'
              };

              return (
                <div key={idx} className="sheet-entry" style={{ ...groupStyle, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%' }}>
                  <div className="sheet-entry-role" style={leftStyleObj}>
                    {subtitleBlock}
                  </div>
                  <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                    <div className="sheet-entry-header" style={{ fontWeight: '700', fontSize: titleFontSize, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: applyAccentToDates ? accentColor : 'inherit' }}>
                      <span style={{ wordBreak: 'break-word', overflowWrap: 'anywhere', paddingRight: '1rem' }}>{titleBlock}</span>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right', flexShrink: 0 }}>
                        {dates}
                        {item.location && <span style={{ fontSize: '0.85em', color: '#666', fontStyle: 'normal', marginTop: '2px' }}>{item.location}</span>}
                      </div>
                    </div>
                    {item.desc && (
                      <>
                        <style>{`
                          .sheet-entry-desc ul {
                            list-style-type: ${listStyle === 'bullet' ? 'disc' : '"– "'};
                            padding-left: 20px;
                            margin: 0;
                          }
                        `}</style>
                        <div className="sheet-entry-desc" style={{ marginTop: '4px', fontSize: '0.92em', color: '#333', lineHeight: '1.4', paddingLeft: descIndent ? '1rem' : '0', wordBreak: 'break-word', overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: (item.desc || '').replace(/data-href="/g, 'href="').replace(/title="Remove link"/g, 'title=""') }} />
                      </>
                    )}
                  </div>
                </div>
              );
            } else {
              let headerStyleObj = {
                display: 'flex',
                justifyContent: 'space-between',
                fontWeight: '700',
                fontSize: titleFontSize,
                color: applyAccentToDates ? accentColor : 'inherit'
              };

              if (entryLayout === 3) {
                headerStyleObj.flexDirection = 'row-reverse';
              } else if (entryLayout === 4) {
                headerStyleObj.display = 'block';
              }

              return (
                <div key={idx} className="sheet-entry" style={{ ...groupStyle, display: 'flex', flexDirection: 'column', gap: entryLayout === 4 ? '0.1rem' : '0.2rem', width: '100%' }}>
                  <div className="sheet-entry-header" style={headerStyleObj}>
                    <span style={{ wordBreak: 'break-word', overflowWrap: 'anywhere', paddingRight: '1rem' }}>
                      {titleBlock}
                      {subtitlePlacement === 'same' && entryLayout !== 4 && subtitleBlock && section.type !== 'organisations' && (
                        <span style={{ 
                          marginLeft: '8px', 
                          fontWeight: subtitleStyle === 'bold' ? '700' : '400', 
                          fontStyle: subtitleStyle === 'italic' ? 'italic' : 'normal', 
                          color: applyAccentToSubtitle ? accentColor : 'inherit', 
                          fontSize: subtitleFontSize 
                        }}>
                          {subtitleBlock}
                        </span>
                      )}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: (entryLayout === 3 || entryLayout === 4) ? 'flex-start' : 'flex-end', textAlign: (entryLayout === 3 || entryLayout === 4) ? 'left' : 'right', flexShrink: 0 }}>
                      {dates}
                      {item.location && <span style={{ fontSize: '0.85em', color: '#666', fontStyle: 'normal', marginTop: '2px' }}>{item.location}</span>}
                    </div>
                  </div>
                  {subtitleBlock && (section.type === 'organisations' || entryLayout === 4 || subtitlePlacement !== 'same') && (
                    <div
                      className="sheet-entry-role"
                      style={{
                        fontSize: subtitleFontSize,
                        color: applyAccentToSubtitle ? accentColor : 'inherit',
                        fontWeight: subtitleStyle === 'bold' ? '700' : '400',
                        fontStyle: subtitleStyle === 'italic' ? 'italic' : 'normal',
                        display: 'block',
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere'
                      }}
                    >
                      {subtitleBlock}
                    </div>
                  )}
                  {section.type === 'references' && item.organization && (
                    <div className="sheet-entry-desc" style={{ fontSize: '0.9em', color: '#555' }}>
                      {item.organization}
                    </div>
                  )}
                  {section.type === 'references' && (item.email || item.phone) && (
                    <div className="sheet-entry-desc" style={{ color: '#888', fontSize: '0.85em' }}>
                      {[item.email, item.phone].filter(Boolean).join(' • ')}
                    </div>
                  )}
                  {item.desc && (
                    <div className="sheet-entry-desc" style={{ marginTop: '4px', fontSize: '0.92em', color: '#333', lineHeight: '1.4', paddingLeft: descIndent ? '1rem' : '0', wordBreak: 'break-word', overflowWrap: 'anywhere' }} dangerouslySetInnerHTML={{ __html: (item.desc || '').replace(/data-href="/g, 'href="').replace(/title="Remove link"/g, 'title=""') }} />
                  )}
                </div>
              );
            }
          })}
        </div>
      );
    }

    return (
      <div key={section.id} className="sheet-section" style={{ marginBottom: `${entrySpacing * 8}px` }}>
        {showTitle && (
          <h2 className="sheet-section-title">
            {currentIcon !== 'hidden' && <i className={currentIcon} style={{ marginRight: '8px' }} />}
            {section.title}
          </h2>
        )}
        {contentHTML}
      </div>
    );
  };

  return (
    <main className="rc-page">
      {/* Dynamic styles insertion */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --heading-border-color: ${applyAccentToHeadings ? (colorMode === 'advanced' ? advAccentColor : accentColor) : '#111'};
        }
        #resumeSheet {
          font-family: ${(hoveredFont || fontFamily) === 'Satoshi' ? 'Satoshi, sans-serif' : `'${hoveredFont || fontFamily}'`};
          font-size: ${fontSize}pt;
          line-height: ${lineHeight};
          padding-left: ${lrMargin}mm;
          padding-right: ${lrMargin}mm;
          padding-top: ${tbMargin}mm;
          padding-bottom: ${tbMargin}mm;
          background-color: ${colorMode === 'basic' ? (colorSubTab === 'multi' ? multiBgColor : '#ffffff') : advBodyBgColor};
          color: ${colorMode === 'basic' ? (colorSubTab === 'multi' ? multiTextColor : '#111111') : advBodyTextColor};
          border-top: ${borderTop ? `${borderSize} solid ${accentColor}` : 'none'};
          border-bottom: ${borderBottom ? `${borderSize} solid ${accentColor}` : 'none'};
          border-left: ${borderLeft ? `${borderSize} solid ${accentColor}` : 'none'};
          border-right: ${borderRight ? `${borderSize} solid ${accentColor}` : 'none'};
          ${borderBgImage ? `border-image: url(${borderBgImage}) 30 round;` : ''}
          box-sizing: border-box;
        }

        .sheet-header {
          ${colorMode === 'advanced' ? `background-color: ${advBgColor}; color: ${advTextColor}; padding: 1.5rem; margin: -${tbMargin}mm -${lrMargin}mm 1.5rem -${lrMargin}mm;` : ''}
          ${colorMode === 'advanced' && headerBgImage ? `background-image: url(${headerBgImage}); background-size: cover; background-position: center;` : ''}
          ${colorMode === 'basic' && colorSubTab === 'image' && headerBgImage ? `background-image: url(${headerBgImage}); background-size: cover; background-position: center;` : ''}
          text-align: ${headerAlignment};
          display: flex;
          flex-direction: row;
          justify-content: ${headerAlignment === 'center' ? 'center' : 'space-between'};
          align-items: ${headerAlignment === 'center' ? 'center' : 'flex-start'};
        }

        #sheet-fullname {
          font-size: ${nameSize === 'xs' ? '1.5rem' : nameSize === 's' ? '2rem' : nameSize === 'm' ? '2.5rem' : nameSize === 'l' ? '3rem' : '3.5rem'};
          font-weight: ${nameBold ? '900' : 'normal'};
          font-family: ${nameFont === 'creative' ? `'${nameCreativeFont}', cursive` : 'inherit'};
          color: ${applyAccentToName ? accentColor : 'inherit'};
        }

        .sheet-entry-role {
          color: ${applyAccentToSubtitle ? accentColor : 'inherit'};
          font-weight: ${subtitleStyle === 'bold' ? '700' : 'normal'};
          font-style: ${subtitleStyle === 'italic' ? 'italic' : 'normal'};
        }

        .sheet-entry-header {
          color: ${applyAccentToDates ? accentColor : 'inherit'};
        }

        .sheet-section-title {
          color: ${applyAccentToHeadings ? (colorMode === 'advanced' ? advAccentColor : accentColor) : 'inherit'};
          position: relative;
          display: block;
          border-bottom: none;
          border-top: none;
          background: transparent;
          padding: 0;
          margin-bottom: 0.5rem;
          clear: both;
          font-family: '${hoveredFont || fontFamily}';
          text-transform: ${headingTransform};
          font-size: ${parseFloat(headingSize) + parseFloat(sectionHeadingFontSizeOffset)}pt;
        }
        .sheet-section-title::after, .sheet-section-title::before { content: none; display: none; }
        
        ${headingStyle === 'top-bottom-lines' ? `.sheet-section-title { border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding-top: 5px; padding-bottom: 5px; }` : ''}
        ${headingStyle === 'box' ? `.sheet-section-title { background-color: rgba(0,0,0,0.05); padding: 5px 10px; }` : ''}
        ${headingStyle === 'full-underline' ? `.sheet-section-title { border-bottom: 1px solid #ccc; padding-bottom: 5px; }` : ''}
        ${headingStyle === 'short-double-underline' ? `.sheet-section-title { display: inline-block; width: fit-content; padding-bottom: 5px; border-bottom: 3px solid var(--heading-border-color); }` : ''}
        ${headingStyle === 'line-text-line' ? `.sheet-section-title { display: flex; align-items: center; white-space: nowrap; } .sheet-section-title::after { content: ''; display: block; flex: 1; height: 1px; background: #ccc; margin-left: 10px; }` : ''}
        ${headingStyle === 'wavy-line' ? `.sheet-section-title { padding-bottom: 8px; background-image: radial-gradient(circle at 2px 2px, transparent 2px, var(--heading-border-color) 2.5px, var(--heading-border-color) 3px, transparent 3.5px); background-size: 4px 4px; background-repeat: repeat-x; background-position: bottom left; }` : ''}
        ${headingStyle === 'wavy-line-2' ? `.sheet-section-title { padding-bottom: 8px; background-image: radial-gradient(circle at 3px 3px, transparent 3px, var(--heading-border-color) 3.5px, var(--heading-border-color) 4px, transparent 4.5px); background-size: 6px 6px; background-repeat: repeat-x; background-position: bottom left; }` : ''}
        ${headingStyle === 'dashed' ? `.sheet-section-title { border-bottom: 2px dashed #ccc; padding-bottom: 5px; }` : ''}
        ${headingStyle === 'dotted' ? `.sheet-section-title { border-bottom: 2px dotted #ccc; padding-bottom: 5px; }` : ''}
        ${headingStyle === 'thick-thin' ? `.sheet-section-title { padding-bottom: 8px; border-bottom: 1px solid #ccc; } .sheet-section-title::after { content: ''; display: block; position: absolute; bottom: -1px; left: 0; width: 40%; height: 3px; background: var(--heading-border-color); }` : ''}
        ${headingStyle === 'flow-icon-heading' ? `.sheet-section-title { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; border-top: 1px solid #111; border-bottom: 1px solid #111; padding: 7px 0; background: transparent; text-align: center; }` : ''}
        ${headingStyle === 'flow-short-underline' ? `.sheet-section-title { display: flex; align-items: center; gap: 10px; width: fit-content; border: none; padding: 0; background: transparent; }` : ''}
        ${headingStyle === 'flow-black-underline' ? `.sheet-section-title { display: flex; align-items: center; gap: 10px; width: fit-content; border: none; padding: 0 0 10px 0; background: transparent; } .sheet-section-title::after { content: ''; display: block; position: absolute; left: 0; bottom: 0; width: 70px; height: 5px; background: #111; }` : ''}
        ${headingStyle === 'zigzag-line' ? `.sheet-section-title { padding-bottom: 10px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='7' viewBox='0 0 16 7'%3E%3Cpolyline points='0,6 4,1 8,6 12,1 16,6' fill='none' stroke='${applyAccentToHeadings ? (colorMode === 'advanced' ? advAccentColor.replace('#', '%23') : accentColor.replace('#', '%23')) : '%23111111'}' stroke-width='1.7'/%3E%3C/svg%3E"); background-size: 16px 7px; background-position: left bottom; background-repeat: repeat-x; }` : ''}

        .sheet-contact i {
          color: ${applyAccentToHeaderIcons ? accentColor : 'inherit'};
        }

        .sheet-section-title i {
          color: ${applyAccentToHeadings ? (colorMode === 'advanced' ? advAccentColor : accentColor) : (headingIcons === 'filled' ? '#555' : 'inherit')};
          ${headingIcons === 'outline' ? '-webkit-text-fill-color: transparent; -webkit-text-stroke: 1px;' : ''}
        }

        /* Link styles */
        .resume-page-sheet a {
          text-decoration: ${linkUnderline ? 'underline' : 'none'};
          color: ${linkBlueColor ? '#2b579a' : 'inherit'};
        }
        ${linkIcon ? `.resume-page-sheet a::after { content: '\\f08e'; font-family: 'Font Awesome 6 Free'; font-weight: 900; margin-left: 4px; font-size: 0.8em; }` : ''}
      ` }} />

      {/* ─────────────────────────────────────────────────────────────────
          STEP 1: LANDING CANVAS SELECTOR
          ───────────────────────────────────────────────────────────────── */}
      {step === 'landing' && (
        <>
          <section className="hero-customizer glass-section">
            <div className="container">
              <div className="hero-content">
                <h1>Customize Your Resume.<br /><span className="highlight-text">Your Style. Your Identity.</span></h1>
                <p>Fine-tune every detail of your resume — layout, fonts, colors, spacing, sections, templates, and personal branding — to create a resume that reflects your professional story.</p>
                
                <div className="cta-group">
                  <button className="btn btn-primary" onClick={() => setStep('upload')}><i className="fa-solid fa-palette"></i> Start Customizing</button>
                  <button className="btn btn-secondary" onClick={() => { const el = document.getElementById('templates'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }}><i className="fa-solid fa-layer-group"></i> Explore Templates</button>
                </div>

                <div className="feature-tags">
                  <div className="feature-tags-row1">
                    <span><i className="fa-solid fa-check"></i> Font Customization</span>
                    <span><i className="fa-solid fa-check"></i> Layout Control</span>
                    <span><i className="fa-solid fa-check"></i> Colors &amp; Branding</span>
                    <span><i className="fa-solid fa-check"></i> Smart Resume Styling</span>
                  </div>
                  <div className="feature-tags-row2">
                    <span><i className="fa-solid fa-check"></i> Professional Templates</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2 – Why Resume Customizer? */}
          <section className="section-container why-section" id="rc-features">
            <div className="container">
              <div className="section-header text-center">
                <h2>Build Resumes That <span className="highlight-text">Match Your Career Goals</span></h2>
                <p>Your resume should represent your personality and professionalism. Resume Customizer helps users personalize resume layouts, typography, colors, spacing, structure, and visual presentation to create resumes that stand out.</p>
              </div>
              <div className="custom-grid-features">
                <div className="feature-card-custom"><i className="fa-solid fa-palette custom-card-icon"></i><h3>Professional Resume Designs</h3><p>Curated layouts ensuring top-tier visual hierarchy.</p></div>
                <div className="feature-card-custom"><i className="fa-solid fa-fingerprint custom-card-icon"></i><h3>Personalized Branding</h3><p>Inject your personal brand seamlessly into your CV.</p></div>
                <div className="feature-card-custom"><i className="fa-solid fa-robot custom-card-icon"></i><h3>ATS Friendly Formatting</h3><p>Designed to be parsed correctly by any system.</p></div>
                <div className="feature-card-custom"><i className="fa-solid fa-border-all custom-card-icon"></i><h3>Flexible Layout Controls</h3><p>One-column, two-column, or hybrid structures.</p></div>
                <div className="feature-card-custom"><i className="fa-solid fa-sliders custom-card-icon"></i><h3>Easy Design Customization</h3><p>Intuitive sliders and pickers for every element.</p></div>
              </div>
            </div>
          </section>

          {/* SECTION 3 – Layout & Structure Controls */}
          <section className="section-container layout-section">
            <div className="container">
              <div className="section-header text-center"><h2>Design Your <span className="highlight-text">Resume Structure</span></h2></div>
              <div className="bento-grid-custom">
                <div className="bento-box-custom row-span-2">
                  <h3>Layout Options</h3>
                  <ul className="control-list">
                    <li><i className="fa-solid fa-table-columns"></i> Single Column Layout</li>
                    <li><i className="fa-solid fa-columns"></i> Two Column Layout</li>
                    <li><i className="fa-solid fa-object-group"></i> Mixed Layout Style</li>
                  </ul>
                  <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid #333' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: '8px', height: '120px' }}>
                      <div style={{ background: '#333', borderRadius: '6px' }}></div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ background: '#2a2a2a', borderRadius: '4px', flex: 1 }}></div>
                        <div style={{ background: '#2a2a2a', borderRadius: '4px', flex: 1 }}></div>
                        <div style={{ background: '#2a2a2a', borderRadius: '4px', flex: 1 }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bento-box-custom">
                  <h3>Section Arrangement</h3>
                  <ul className="control-list">
                    <li><i className="fa-solid fa-sort"></i> Rearrange Resume Sections</li>
                    <li><i className="fa-solid fa-eye-slash"></i> Show / Hide Sections</li>
                    <li><i className="fa-solid fa-network-wired"></i> Organize Resume Flow</li>
                  </ul>
                </div>
                <div className="bento-box-custom">
                  <h3>Spacing Controls</h3>
                  <div className="sliders-wrapper">
                    <div className="slider-group"><label>Font Size</label><input type="range" min="1" max="100" defaultValue="50" readOnly /></div>
                    <div className="slider-group"><label>Line Height</label><input type="range" min="1" max="100" defaultValue="60" readOnly /></div>
                    <div className="slider-group"><label>Margins &amp; Spacing</label><input type="range" min="1" max="100" defaultValue="40" readOnly /></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4 – Typography Customization */}
          <section className="section-container typo-section">
            <div className="container">
              <div className="split-layout">
                <div className="split-content">
                  <h2>Professional <span className="highlight-text">Typography Settings</span></h2>
                  <p>Choose fonts that align with your career style. Tailor the hierarchy from your name down to bullet points.</p>
                  <div className="font-categories">
                    <div className="font-pill serif">Serif Fonts</div>
                    <div className="font-pill sans">Sans Fonts</div>
                    <div className="font-pill mono">Mono Fonts</div>
                  </div>
                </div>
                <div className="split-visual feature-card-custom typo-controls">
                  <h3>Typography Controls</h3>
                  <ul>
                    <li><i className="fa-solid fa-text-height"></i> Font Size Adjustments</li>
                    <li><i className="fa-solid fa-bold"></i> Bold Name Option</li>
                    <li><i className="fa-solid fa-user-tie"></i> Professional Title Styling</li>
                    <li><i className="fa-solid fa-heading"></i> Subtitle Formatting</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5 – Color Personalization */}
          <section className="section-container color-section">
            <div className="container">
              <div className="section-header text-center">
                <h2>Build Your <span className="highlight-text">Personal Brand</span></h2>
                <p style={{ color: '#A0A0A0', maxWidth: '700px', margin: '0 auto', fontSize: '1.15rem' }}>Create resumes aligned with your professional identity using advanced visual customization.</p>
              </div>
              <div className="color-cards">
                <div className="color-card feature-card-custom"><div className="color-circle" style={{ background: '#EEC30C' }}></div><h4>Accent Colors</h4></div>
                <div className="color-card feature-card-custom"><div className="color-circle" style={{ background: '#1A1A1A' }}></div><h4>Background Colors</h4></div>
                <div className="color-card feature-card-custom"><div className="color-circle border-example"></div><h4>Border Styling</h4></div>
                <div className="color-card feature-card-custom"><div className="color-circle text-example">T</div><h4>Text Colors</h4></div>
                <div className="color-card feature-card-custom"><div className="color-circle theme-example"></div><h4>Custom Color Themes</h4></div>
              </div>
            </div>
          </section>

          {/* MIDDLE SECTION: Templates Selection Gallery */}
          <section className="section-container templates-section scroll-anim" id="templates">
            <div className="container">
              <div className="section-header text-center">
                <h2>Select Your <span className="highlight-text">Starting Canvas</span></h2>
                <p>Choose from our meticulously crafted resume templates and customize them to perfection. Or start from scratch!</p>
              </div>

              {/* Filtering Controls */}
              <div className="template-filters">
                <div className="filter-row top-filters">
                  {['all', 'top-picks', 'ats'].map(f => (
                    <button
                      key={f}
                      className={`filter-btn ${activeTopFilter === f ? 'active' : ''}`}
                      onClick={() => setActiveTopFilter(f)}
                    >
                      {f === 'all' && <><i className="fa-solid fa-grip"></i> All</>}
                      {f === 'top-picks' && <><i className="fa-solid fa-star"></i> Top Picks</>}
                      {f === 'ats' && <><i className="fa-solid fa-robot"></i> ATS</>}
                    </button>
                  ))}

                  {/* Dropdowns */}
                  <div className="filter-dropdown">
                    <button className={`filter-btn dropdown-trigger-btn ${activeStyleFilter !== 'all' ? 'active' : ''}`}>
                      <i className="fa-solid fa-palette"></i> {activeStyleFilter === 'all' ? 'Styles' : activeStyleFilter}
                    </button>
                    <div className="dropdown-content">
                      <a href="#" onClick={(e) => { e.preventDefault(); setActiveStyleFilter('all'); }}>All Styles</a>
                      {['modern', 'traditional', 'simple', 'creative', 'minimalist'].map(s => (
                        <a key={s} href="#" onClick={(e) => { e.preventDefault(); setActiveStyleFilter(s); }}>{s}</a>
                      ))}
                    </div>
                  </div>

                  <div className="filter-dropdown">
                    <button className={`filter-btn dropdown-trigger-btn ${activeLayoutFilter !== 'all' ? 'active' : ''}`}>
                      <i className="fa-solid fa-table-columns"></i> {activeLayoutFilter === 'all' ? 'Layouts' : activeLayoutFilter}
                    </button>
                    <div className="dropdown-content">
                      <a href="#" onClick={(e) => { e.preventDefault(); setActiveLayoutFilter('all'); }}>All Layouts</a>
                      {['one-page', 'two-page', 'one-column', 'two-column'].map(l => (
                        <a key={l} href="#" onClick={(e) => { e.preventDefault(); setActiveLayoutFilter(l); }}>{l}</a>
                      ))}
                    </div>
                  </div>

                  <div className="filter-dropdown">
                    <button className={`filter-btn dropdown-trigger-btn ${activeExpFilter !== 'all' ? 'active' : ''}`}>
                      <i className="fa-solid fa-briefcase"></i> {activeExpFilter === 'all' ? 'Experience' : activeExpFilter}
                    </button>
                    <div className="dropdown-content">
                      <a href="#" onClick={(e) => { e.preventDefault(); setActiveExpFilter('all'); }}>All Levels</a>
                      {['entry', 'mid', 'senior'].map(ex => (
                        <a key={ex} href="#" onClick={(e) => { e.preventDefault(); setActiveExpFilter(ex); }}>{ex}</a>
                      ))}
                    </div>
                  </div>

                  <div className="filter-dropdown">
                    <button className={`filter-btn dropdown-trigger-btn ${activeFormatFilter !== 'all' ? 'active' : ''}`}>
                      <i className="fa-solid fa-file-lines"></i> {activeFormatFilter === 'all' ? 'Format' : activeFormatFilter}
                    </button>
                    <div className="dropdown-content">
                      <a href="#" onClick={(e) => { e.preventDefault(); setActiveFormatFilter('all'); }}>All Formats</a>
                      {['chronological', 'functional', 'hybrid'].map(f => (
                        <a key={f} href="#" onClick={(e) => { e.preventDefault(); setActiveFormatFilter(f); }}>{f}</a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Filters */}
                <div className="bottom-filters">
                  <div className="filter-group">
                    <span className="filter-label">Color:</span>
                    <button
                      className={`color-btn ${activeColorFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveColorFilter('all')}
                      style={{ background: '#333', width: '24px', height: '24px', borderRadius: '50%' }}
                    >
                      All
                    </button>
                    {['blue', 'gray', 'green', 'red', 'navy'].map(c => (
                      <button
                        key={c}
                        className={`color-btn ${activeColorFilter === c ? 'active' : ''}`}
                        onClick={() => setActiveColorFilter(c)}
                        style={{
                          background: c === 'navy' ? '#1A3A5C' : c,
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>

                  <div className="filter-group">
                    <span className="filter-label">Photo:</span>
                    <div className="toggle-group">
                      {['all', 'photo', 'nophoto'].map(p => (
                        <button
                          key={p}
                          className={`toggle-btn ${activePhotoFilter === p ? 'active' : ''}`}
                          onClick={() => setActivePhotoFilter(p)}
                        >
                          {p === 'all' ? 'All' : p === 'photo' ? 'Photo' : 'No Photo'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group">
                    <span className="filter-label">Columns:</span>
                    <div className="toggle-group">
                      {['all', 'single', 'double'].map(c => (
                        <button
                          key={c}
                          className={`toggle-btn ${activeColumnsFilter === c ? 'active' : ''}`}
                          onClick={() => setActiveColumnsFilter(c)}
                        >
                          {c === 'all' ? 'All' : c === 'single' ? 'Single' : 'Double'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Template Carousel Track */}
              <div className="template-grid" style={{ marginTop: '2rem' }}>
                <div className="templates-carousel">
                  <div className="carousel-track" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', width: '100%', gap: '1.5rem' }}>
                    {filteredTemplates.map(tpl => (
                      <div
                        key={tpl.id}
                        className={`template-item feature-card-custom selectable-template ${selectedTemplate?.id === tpl.id ? 'template-selected' : ''}`}
                        style={{ border: '1px solid #333', background: '#1a1a1a', borderRadius: '15px', padding: '1.5rem' }}
                      >
                        <div className="template-preview" style={{ height: '380px', borderRadius: '8px', overflow: 'hidden', background: '#0a0a0a', position: 'relative' }}>
                          <img src={tpl.image} alt={tpl.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div className="rt-card-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s' }}>
                            <button className="btn btn-secondary" onClick={() => handleSelectTemplate(tpl)}>Select</button>
                          </div>
                        </div>
                        <div className="template-info" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                          <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' }}>{tpl.name}</h4>
                          <button
                            className={`btn small-btn ${selectedTemplate?.id === tpl.id ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => handleSelectTemplate(tpl)}
                            style={{ padding: '6px 16px', borderRadius: '20px', fontWeight: '700' }}
                          >
                            {selectedTemplate?.id === tpl.id ? '✓ Selected' : 'Select'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Overlay Trigger */}
              <div className={`start-customizing-wrap ${selectedTemplate ? 'visible' : ''}`} style={{ textAlign: 'center', marginTop: '3rem' }}>
                <div className="selected-template-info" style={{ color: '#EEC30C', fontWeight: '700', fontSize: '1.1rem', marginBottom: '1rem' }}>
                  ✓ {selectedTemplate?.name} template selected — ready to customize!
                </div>
                <button className="btn btn-primary btn-lg btn-start-customizing" onClick={() => setStep('upload')}>
                  <i className="fa-solid fa-wand-magic-sparkles"></i> Proceed to Customizing <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 6 – Personal Details Customization */}
          <section className="section-container personal-details">
            <div className="container">
              <div className="split-layout reverse">
                <div className="split-content">
                  <h2>Control Your <span className="highlight-text">Resume Identity</span></h2>
                  <ul className="feature-list-custom">
                    <li><i className="fa-solid fa-align-center"></i> Name Alignment</li>
                    <li><i className="fa-solid fa-briefcase"></i> Professional Title</li>
                    <li><i className="fa-solid fa-user-circle"></i> Profile Photo Layouts</li>
                    <li><i className="fa-solid fa-address-book"></i> Contact Arrangement</li>
                    <li><i className="fa-solid fa-heading"></i> Header Layout Configurations</li>
                  </ul>
                </div>
                <div className="split-visual feature-card-custom styling-examples">
                  <h3>Style Examples</h3>
                  <div className="example-group"><span>📍 Icons Styling</span><div className="icons-row"><i className="fa-solid fa-phone"></i><i className="fa-solid fa-envelope"></i><i className="fa-brands fa-linkedin"></i></div></div>
                  <div className="example-group"><span>📍 Bullet Style</span><ul className="bullet-row"><li>Standard</li><li className="custom-bullet">Custom</li></ul></div>
                  <div className="example-group"><span>📍 Bar Separator</span><div className="separator-row"><span>Email</span> | <span>Phone</span> | <span>Location</span></div></div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7 – Smart Resume Features */}
          <section className="section-container smart-features">
            <div className="container">
              <div className="section-header text-center"><h2>Smarter Resume <span className="highlight-text">Personalization</span></h2></div>
              <div className="custom-grid-features smart-grid">
                <div className="feature-card-custom"><i className="fa-solid fa-bolt"></i> Template Switching</div>
                <div className="feature-card-custom"><i className="fa-solid fa-magnifying-glass"></i> Resume Preview</div>
                <div className="feature-card-custom"><i className="fa-solid fa-rotate-left"></i> Undo / Redo</div>
                <div className="feature-card-custom"><i className="fa-solid fa-floppy-disk"></i> Save Design Templates</div>
                <div className="feature-card-custom"><i className="fa-solid fa-clone"></i> Multiple Resume Variants</div>
                <div className="feature-card-custom"><i className="fa-solid fa-share-nodes"></i> Private Template Sharing</div>
              </div>
            </div>
          </section>

          {/* SECTION 8 – Advanced Resume Controls */}
          <section className="section-container advanced-section">
            <div className="container">
              <div className="feature-card-custom full-width-card">
                <div className="content-wrapper">
                  <h2>Fine Tune Every <span className="highlight-text">Resume Detail</span></h2>
                  <div className="pill-list">
                    <span className="pill"><i className="fa-solid fa-link"></i> Link Styling</span>
                    <span className="pill"><i className="fa-solid fa-heading"></i> Section Heading Styles</span>
                    <span className="pill"><i className="fa-solid fa-font"></i> Uppercase Controls</span>
                    <span className="pill"><i className="fa-solid fa-text-height"></i> Heading Sizes</span>
                    <span className="pill"><i className="fa-solid fa-icons"></i> Icons Styles</span>
                    <span className="pill"><i className="fa-solid fa-list-ul"></i> Bullet / Hyphen Lists</span>
                    <span className="pill"><i className="fa-solid fa-shoe-prints"></i> Footer Settings</span>
                    <span className="pill"><i className="fa-solid fa-file-lines"></i> Page Numbers</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 9 – Why Users Love Resume Customizer */}
          <section className="section-container love-section">
            <div className="container">
              <div className="section-header text-center"><h2>Why Users Love <span className="highlight-text">Resume Customizer</span></h2></div>
              <div className="benefits-grid">
                <div className="benefit-card feature-card-custom"><i className="fa-solid fa-rocket"></i><h4>Faster Resume Building</h4></div>
                <div className="benefit-card feature-card-custom"><i className="fa-solid fa-eye"></i><h4>Better Readability</h4></div>
                <div className="benefit-card feature-card-custom"><i className="fa-solid fa-briefcase"></i><h4>Professional Appearance</h4></div>
                <div className="benefit-card feature-card-custom"><i className="fa-solid fa-chart-line"></i><h4>Improved ATS Compatibility</h4></div>
                <div className="benefit-card feature-card-custom"><i className="fa-solid fa-wand-magic-sparkles"></i><h4>Personalized Branding</h4></div>
              </div>
            </div>
          </section>

          {/* SECTION 10 – Final CTA */}
          <section className="section-container cta-section" id="rc-cta">
            <div className="container">
              <div className="cta-box">
                <h2>Create A Resume That Looks Professional And Feels Personal</h2>
                <p>Take complete control over your resume design and build resumes that truly represent your skills and career journey.</p>
                <div className="cta-actions">
                  <button className="btn btn-primary btn-large" onClick={() => setStep('upload')}>Start Customizing Resume</button>
                  <button className="btn btn-dark btn-large" onClick={() => setStep('upload')}>Build Resume Now</button>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="section-container faq-section">
            <div className="container">
              <div className="section-header text-center"><h2>Frequently Asked <span className="highlight-text">Questions</span></h2></div>
              <div className="faq-accordion">
                {[
                  { q: 'Can I customize fonts?', a: 'Yes. Choose font family, size, bold settings and typography options.' },
                  { q: 'Can I adjust spacing?', a: 'Yes. Modify margins, line height and content spacing.' },
                  { q: 'Can I save templates?', a: 'Yes. Save reusable resume designs to use across different applications.' },
                  { q: 'Can I personalize colors?', a: 'Yes. Customize text, accent, background and branding colors easily.' }
                ].map((item, idx) => (
                  <RCFaqItem key={idx} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          STEP 2: UPLOAD WIZARD CHOICE
          ───────────────────────────────────────────────────────────────── */}
      {step === 'upload' && (
        <section className="section-container upload-wizard-section">
          <div className="upload-wizard-wrapper">
            <button className="back-templates-btn" onClick={() => setStep('landing')}>
              <i className="fa-solid fa-chevron-left"></i> Back to Templates
            </button>
            <div className="upload-wizard-card">
              <div className="wizard-progress">
                <div className="progress-node completed"><i className="fa-solid fa-check"></i></div>
                <div className="progress-line active"></div>
                <div className="progress-node active">2</div>
                <div className="progress-line"></div>
                <div className="progress-node">3</div>
              </div>

              <div className="upload-header">
                <span className="upload-step-badge">STEP 2 OF 3</span>
                <h2>Do you have an <span className="highlight-text">existing<br/>resume?</span></h2>
                <p className="upload-subtitle">Upload your current resume and we'll auto-fill your details — or start fresh and build from scratch.</p>
              </div>

              <div className="choice-cards">
                <div
                  className={`choice-card ${uploadChoice === 'yes' ? 'selected' : ''}`}
                  onClick={() => handleChoiceSelect('yes')}
                >
                  {uploadChoice === 'yes' && <div className="card-check"><i className="fa-solid fa-check"></i></div>}
                  <div className="choice-icon-wrap">
                    <i className="fa-solid fa-file-arrow-up"></i>
                  </div>
                  <h3>Yes, I have one</h3>
                  <p>Upload your resume and we'll import your details automatically.</p>
                </div>

                <div
                  className={`choice-card ${uploadChoice === 'no' ? 'selected' : ''}`}
                  onClick={() => handleChoiceSelect('no')}
                >
                  {uploadChoice === 'no' && <div className="card-check"><i className="fa-solid fa-check"></i></div>}
                  <div className="choice-icon-wrap">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </div>
                  <h3>No, start fresh</h3>
                  <p>Build a new resume from scratch using your selected template.</p>
                </div>
              </div>

              {uploadChoice === 'yes' && !uploadedFile && (
                <div
                  className={`upload-area-container ${dragOver ? 'dragover' : ''}`}
                  onClick={() => fileInputRef.current.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="upload-area-icon">
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                  </div>
                  <h4>Drag & drop your resume here</h4>
                  <p>or click to browse from your device</p>
                  <div className="file-pills">
                    <span>PDF</span>
                    <span>DOC</span>
                    <span>DOCX</span>
                  </div>
                </div>
              )}

              {uploadChoice === 'yes' && uploadedFile && (
                <div className="uploaded-file-info show" style={{ display: 'flex', justifyContent: 'flex-start', margin: '0 auto 2rem', maxWidth: '100%', width: '100%', boxSizing: 'border-box' }}>
                  <i className="fa-solid fa-file-pdf" style={{ color: '#ff4444', marginRight: '15px' }}></i>
                  <div style={{ textAlign: 'left', flexGrow: 1 }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#fff', wordBreak: 'break-all' }}>{uploadedFile.name}</span>
                    <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '0.2rem' }}>Ready to import</div>
                  </div>
                  <button className="remove-file" onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }} title="Remove file" style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '1.2rem', padding: '0 5px' }}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              )}

              <div className={`wizard-actions ${uploadChoice === 'yes' ? 'has-skip' : ''}`}>
                <button
                  className={`btn-proceed ${uploadChoice === 'no' || (uploadChoice === 'yes' && uploadedFile) ? 'enabled' : ''}`}
                  disabled={!uploadChoice}
                  onClick={() => {
                    if (uploadChoice === 'yes') {
                      if (!uploadedFile) {
                        fileInputRef.current.click();
                      } else {
                        handleProceedToEditor();
                      }
                    } else {
                      handleProceedToEditor();
                    }
                  }}
                >
                  <i className="fa-solid fa-arrow-right"></i> Proceed
                </button>
                {uploadChoice === 'yes' && (
                  <button
                    className="btn-skip"
                    onClick={() => handleProceedToEditor()}
                  >
                  Skip for now
                  </button>
                )}
              </div>

              <p className="wizard-footer-text">
                You can always upload or edit your resume details later inside the editor.
              </p>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  handleFileChange(e);
                  if (e.target.files.length > 0) {
                    setTimeout(() => handleProceedToEditor(), 500);
                  }
                }}
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
              />
            </div>
          </div>
        </section>
      )}

      {step === 'editor' && (
        <>
          <header className="editor-header">
            <div className="header-left">
              <button className="editor-back-btn" onClick={() => setStep('landing')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <div className="editor-tabs">
                <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}><i className="fa-solid fa-gauge"></i> Overview</button>
                <button className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`} onClick={() => setActiveTab('content')}><i className="fa-solid fa-file-invoice"></i> Content</button>
                <button className={`tab-btn ${activeTab === 'customize' ? 'active' : ''}`} onClick={() => setActiveTab('customize')}><i className="fa-solid fa-sliders"></i> Customize</button>
                <button className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}><i className="fa-solid fa-wand-magic-sparkles"></i> AI Tools</button>
                <button className={`tab-btn ${activeTab === 'rearrange' ? 'active' : ''}`} onClick={() => setActiveTab('rearrange')}><i className="fa-solid fa-arrows-up-down"></i> Rearrange</button>
                <button className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}><i className="fa-solid fa-layer-group"></i> Templates</button>
              </div>
            </div>

            <div className="header-right">
              <select
                className="resume-select"
                value={selectedResumeVersion}
                onChange={(e) => setSelectedResumeVersion(e.target.value)}
              >
                <option value="Resume 1">Resume 1</option>
                <option value="new">Create New Version...</option>
              </select>

              <div className="download-btn-container" style={{ position: 'relative', display: 'inline-block' }}>
                <button className="btn-download" onClick={() => setShowDownloadOptions(prev => !prev)}>
                  <i className="fa-solid fa-download"></i> Download <i className="fa-solid fa-chevron-down" style={{ fontSize: '0.8em', marginLeft: '5px' }}></i>
                </button>
                {showDownloadOptions && (
                  <div id="download-options" style={{ display: 'block', position: 'absolute', right: 0, top: '110%', background: '#1e1e1e', border: '1px solid #333', borderRadius: '8px', zIndex: 1000, minWidth: '170px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.print(); setShowDownloadOptions(false); }} style={{ display: 'block', padding: '12px 15px', color: '#fff', textDecoration: 'none', borderBottom: '1px solid #333', fontSize: '0.9rem' }}><i className="fa-solid fa-file-pdf" style={{ color: '#e2574c', marginRight: '8px' }}></i> Download PDF</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleDownloadWord(); setShowDownloadOptions(false); }} style={{ display: 'block', padding: '12px 15px', color: '#fff', textDecoration: 'none', fontSize: '0.9rem' }}><i className="fa-solid fa-file-word" style={{ color: '#2b579a', marginRight: '8px' }}></i> Download Word</a>
                  </div>
                )}
              </div>

              <button className="btn-more"><i className="fa-solid fa-ellipsis-vertical"></i></button>
            </div>
          </header>

          <main className="workspace">
            <div className="editor-panel">
              {activeTab === 'overview' && (
                <div className="tab-content show" id="tab-overview">
                  <div className="editor-section-card">
                    <h3 style={{ marginBottom: '0.5rem' }}>Resume Status</h3>
                    <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>Keep track of your resume completion score.</p>
                    <div style={{ background: '#222', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                      <div style={{ background: '#EEC30C', width: '65%', height: '100%' }}></div>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>65% Completed</span>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="tab-content show" id="tab-content">
                  {!isEditingPersonal && (
                    <div className="editor-section-card" id="personal-preview-card">
                      <button className="btn-edit-pencil" onClick={() => setIsEditingPersonal(true)} title="Edit personal details">
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                      <div className="personal-preview-card">
                        <div className="personal-preview-info">
                          <div className={`personal-preview-name ${!resumeData.name ? 'placeholder' : ''}`} id="preview-name">
                            {resumeData.name || 'Your name'}
                          </div>
                          <div className="personal-preview-contact" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="preview-contact-row" style={{ order: 0 }}>
                              <i className="fa-regular fa-envelope"></i>
                              <span id="preview-email">{resumeData.email || 'Email'}</span>
                            </div>
                            <div className="preview-contact-row" style={{ order: personalDetailsOrder.indexOf('phone') + 1 }}>
                              <i className="fa-solid fa-phone"></i>
                              <span id="preview-phone">{resumeData.phone || 'Phone'}</span>
                            </div>
                            <div className="preview-contact-row" style={{ order: personalDetailsOrder.indexOf('address') + 1 }}>
                              <i className="fa-solid fa-location-dot"></i>
                              <span id="preview-address">{resumeData.address || 'Address'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="personal-preview-photo" style={{ height: photoShape.startsWith('portrait') ? '96px' : '72px', ...(photoShape === 'portrait' ? { borderRadius: 0 } : photoShape === 'portrait-rounded' ? { borderRadius: '8px' } : photoShape === 'hexagon' ? { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', borderRadius: 0 } : { borderRadius: photoShape === 'square' ? '0' : photoShape === 'rounded' ? '8px' : photoShape === 'squircle' ? '24px' : '50%' }) }}>
                          {resumeData.photo ? (
                            <img 
                              id="preview-photo-img" 
                              src={resumeData.photo} 
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: photoGrayscale ? 'grayscale(100%)' : 'none',
                                transform: `scale(${photoZoom}) translate(${photoPanX}px, ${photoPanY}px)`
                              }} 
                            />
                          ) : (
                            <i className="fa-solid fa-camera" id="preview-camera-icon"></i>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {isEditingPersonal && (
                    <div className="editor-section-card" id="personal-edit-card">
                      <div className="edit-details-header">
                        <h3>Edit Personal Details</h3>
                      </div>

                      <div className="section-body">
                        <div className="edit-photo-row">
                          <div className="edit-photo-left" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
                            <div className="form-group">
                              <label htmlFor="input-fullname">Full name</label>
                              <input 
                                type="text" 
                                id="input-fullname" 
                                className="form-input" 
                                placeholder="Enter your title, first- and last name" 
                                value={resumeData.name || ''} 
                                onChange={(e) => updateResumeData(prev => ({ ...prev, name: e.target.value }))} 
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="input-role">Professional title</label>
                              <input 
                                type="text" 
                                id="input-role" 
                                className="form-input" 
                                placeholder="e.g. Web Developer" 
                                value={resumeData.role || ''} 
                                onChange={(e) => updateResumeData(prev => ({ ...prev, role: e.target.value }))} 
                              />
                            </div>
                          </div>
                          <div className="edit-photo-block">
                            <span>Photo</span>
                            <div className="edit-photo-circle" style={{ height: photoShape.startsWith('portrait') ? '64px' : '48px', ...(photoShape === 'portrait' ? { borderRadius: 0 } : photoShape === 'portrait-rounded' ? { borderRadius: '4px' } : photoShape === 'hexagon' ? { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', borderRadius: 0 } : { borderRadius: photoShape === 'square' ? '0' : photoShape === 'rounded' ? '4px' : photoShape === 'squircle' ? '12px' : '50%' }) }} onClick={() => { if (resumeData.photo) setShowPhotoModal(true); else profilePhotoInputRef.current.click(); }}>
                              {resumeData.photo ? (
                                <img 
                                  id="photoPreview" 
                                  src={resumeData.photo} 
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    filter: photoGrayscale ? 'grayscale(100%)' : 'none',
                                    transform: `scale(${photoZoom}) translate(${photoPanX}px, ${photoPanY}px)`
                                  }} 
                                />
                              ) : (
                                <i className="fa-solid fa-camera" id="cameraIcon"></i>
                              )}
                              <input 
                                type="file" 
                                ref={profilePhotoInputRef} 
                                accept="image/*" 
                                style={{ display: 'none' }} 
                                onChange={handlePhotoUpload} 
                              />
                            </div>
                          </div>
                        </div>

                        <div className="personal-details-draggable-container" style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className="form-group" data-key="phone" style={{ order: personalDetailsOrder.indexOf('phone'), cursor: 'grab', opacity: draggedPersonal === 'phone' ? 0.5 : 1 }} draggable onDragStart={(e) => handlePersonalDragStart(e, 'phone')} onDragOver={(e) => handlePersonalDragOver(e, 'phone')} onDragEnd={handlePersonalDragEnd}>
                            <label htmlFor="input-phone">Phone</label>
                            <div className="detail-field-row">
                              <input 
                                type="tel" 
                                id="input-phone" 
                                className="form-input" 
                                placeholder="Enter Phone" 
                                value={resumeData.phone || ''} 
                                onChange={(e) => updateResumeData(prev => ({ ...prev, phone: e.target.value }))} 
                              />
                              <button className="detail-reorder-btn" title="Drag to Reorder"><i className="fa-solid fa-up-down"></i></button>
                            </div>
                          </div>

                          <div className="form-group" data-key="address" style={{ order: personalDetailsOrder.indexOf('address'), cursor: 'grab', opacity: draggedPersonal === 'address' ? 0.5 : 1 }} draggable onDragStart={(e) => handlePersonalDragStart(e, 'address')} onDragOver={(e) => handlePersonalDragOver(e, 'address')} onDragEnd={handlePersonalDragEnd}>
                            <label htmlFor="input-address">Location</label>
                            <div className="detail-field-row">
                              <input 
                                type="text" 
                                id="input-address" 
                                className="form-input" 
                                placeholder="City, Country" 
                                value={resumeData.address || ''} 
                                onChange={(e) => updateResumeData(prev => ({ ...prev, address: e.target.value }))} 
                              />
                              <button className="detail-reorder-btn" title="Drag to Reorder"><i className="fa-solid fa-up-down"></i></button>
                            </div>
                          </div>

                          <div id="dynamic-pill-inputs" style={{ display: 'contents' }}>
                            {resumeData.extraDetails && Object.keys(resumeData.extraDetails).map(key => {
                              const val = resumeData.extraDetails[key] || '';
                              const name = labelsMap[key] || key;
                              return (
                                <div key={key} className="detail-pill-input-row" id={`pill-input-row-${key}`} style={{ order: personalDetailsOrder.indexOf(key), cursor: 'grab', opacity: draggedPersonal === key ? 0.5 : 1, marginBottom: '1.2rem' }} draggable onDragStart={(e) => handlePersonalDragStart(e, key)} onDragOver={(e) => handlePersonalDragOver(e, key)} onDragEnd={handlePersonalDragEnd}>
                                  <div className="form-group" style={{ marginBottom: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                      <label style={{ marginBottom: 0 }}>{name}</label>
                                      <button className="btn-remove-field" onClick={() => handleTogglePill(key)} title="Remove Field">
                                        <i className="fa-solid fa-trash-can"></i> Remove Field
                                      </button>
                                    </div>
                                    <div className="detail-field-row">
                                      <input 
                                        type="text" 
                                        className="form-input" 
                                        id={`pill-input-${key}`} 
                                        placeholder={`Enter ${name}`}
                                        value={val}
                                        onChange={(e) => handleUpdatePillValue(key, e.target.value)}
                                      />
                                      <button className="detail-reorder-btn" title="Drag to Reorder"><i className="fa-solid fa-up-down"></i></button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="add-details-section">
                          <div className="add-details-label" style={{ marginBottom: '0.8rem', fontWeight: '600' }}>Personal details</div>
                          <div className="detail-pills-container" id="pills-container">
                            {personalDetailsPills.map(p => {
                              const isAdded = resumeData.extraDetails?.hasOwnProperty(p.key);
                              return (
                                <button 
                                  key={p.key} 
                                  type="button"
                                  className={`detail-pill ${isAdded ? 'added' : ''}`} 
                                  onClick={() => handleTogglePill(p.key)}
                                >
                                  <i className={isAdded ? "fa-solid fa-check" : "fa-solid fa-plus"}></i> {p.name}
                                </button>
                              );
                            })}
                          </div>
                          
                          <div className="extra-pills-container" id="extra-pills-container" style={{ display: showExtraPills ? 'flex' : 'none' }}>
                            {personalDetailsExtraPills.map(p => {
                              const isAdded = resumeData.extraDetails?.hasOwnProperty(p.key);
                              return (
                                <button 
                                  key={p.key} 
                                  type="button"
                                  className={`detail-pill ${isAdded ? 'added' : ''}`} 
                                  onClick={() => handleTogglePill(p.key)}
                                >
                                  <i className={isAdded ? "fa-solid fa-check" : "fa-solid fa-plus"}></i> {p.name}
                                </button>
                              );
                            })}
                          </div>

                          <button className="show-more-pill" id="personal-show-more-btn" onClick={() => setShowExtraPills(prev => !prev)} style={{ marginTop: '0.5rem' }}>
                            {showExtraPills ? 'Show Less' : 'Show More'}
                          </button>

                          <div className="add-details-label" style={{ marginTop: '1.5rem', marginBottom: '0.8rem', fontWeight: '600' }}>Links / social profiles</div>
                          
                          <div style={{ marginBottom: '1rem', position: 'relative' }}>
                            <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                            <input 
                              type="text" 
                              id="links-search" 
                              placeholder="Search" 
                              value={linkSearchQuery}
                              onChange={(e) => setLinkSearchQuery(e.target.value)} 
                              style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid #333', background: '#222', color: '#fff', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                            />
                          </div>

                          <div id="links-scroll-wrapper" style={{ maxHeight: '260px', overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingRight: '2px' }}>
                            <style>{`#links-scroll-wrapper::-webkit-scrollbar { display: none; }`}</style>
                            <div className="detail-pills-container" id="links-pills-container">
                              {linksPills.filter(p => !linkSearchQuery || p.name.toLowerCase().includes(linkSearchQuery.toLowerCase())).map(p => {
                                const isAdded = resumeData.extraDetails?.hasOwnProperty(p.key);
                                return (
                                  <button 
                                    key={p.key} 
                                    type="button"
                                    className={`detail-pill link-pill ${isAdded ? 'added' : ''}`} 
                                    onClick={() => handleTogglePill(p.key)}
                                  >
                                    <i className={isAdded ? "fa-solid fa-check" : "fa-solid fa-plus"}></i> {p.name}
                                  </button>
                                );
                              })}
                            </div>
                            <div className="extra-pills-container" id="extra-links-pills-container" style={{ display: (showExtraLinksPills || linkSearchQuery) ? 'flex' : 'none' }}>
                              {linksExtraPills.filter(p => !linkSearchQuery || p.name.toLowerCase().includes(linkSearchQuery.toLowerCase())).map(p => {
                                const isAdded = resumeData.extraDetails?.hasOwnProperty(p.key);
                                return (
                                  <button 
                                    key={p.key} 
                                    type="button"
                                    className={`detail-pill link-pill ${isAdded ? 'added' : ''}`} 
                                    onClick={() => handleTogglePill(p.key)}
                                  >
                                    <i className={isAdded ? "fa-solid fa-check" : "fa-solid fa-plus"}></i> {p.name}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {!linkSearchQuery && (
                            <button className="show-more-pill" id="links-show-more-btn" onClick={() => setShowExtraLinksPills(prev => !prev)} style={{ marginTop: '0.5rem' }}>
                              {showExtraLinksPills ? 'Show Less' : 'Show More'}
                            </button>
                          )}

                          <div style={{ marginTop: '1rem', position: 'relative' }}>
                            <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#888', pointerEvents: 'none' }}></i>
                            <input 
                              type="text" 
                              id="missing-search" 
                              placeholder="Missing something? Please let us know :-)" 
                              style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid #ddd', background: '#f5f5f5', color: '#555', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', fontStyle: 'italic' }}
                            />
                          </div>
                        </div>

                        {renderPersonalCustomizerControls()}

                        <button className="btn-done" onClick={() => setIsEditingPersonal(false)}>
                          <i className="fa-solid fa-check"></i> Done
                        </button>
                      </div>
                    </div>
                  )}

                  <div id="active-sections-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
                    {resumeData.sections.map((section, sectionIdx) => {
                      const isExpanded = !!expandedAccordions[section.id];
                      const isHeadingMode = !!sectionHeadingEditMode[section.id];
                      const editEntryIndex = activeEditIndex[section.id];
                      const isEntryMode = typeof editEntryIndex === 'number';
                      const iconClass = iconMap[section.type] || 'fa-solid fa-circle-dot';

                      // Default icon for section or user-chosen
                      const baseCurrentIcon = sectionIcons[section.id] || iconClass;
                      const currentIconClass = baseCurrentIcon === 'hidden' || headingIcons === 'none' ? 'hidden' : baseCurrentIcon;

                      // All available icons for the picker (matching images 1-4)
                      const defaultIconsList = [
                        { cls: 'fa-solid fa-award' },
                        { cls: 'fa-solid fa-file-invoice' },
                        { cls: 'fa-solid fa-book' },
                        { cls: 'fa-solid fa-graduation-cap' },
                        { cls: 'fa-solid fa-guitar' },
                        { cls: 'fa-solid fa-globe' },
                        { cls: 'fa-solid fa-house' },
                        { cls: 'fa-solid fa-briefcase' },
                        { cls: 'fa-solid fa-address-card' },
                        { cls: 'fa-solid fa-folder' },
                        { cls: 'fa-solid fa-phone' },
                        { cls: 'fa-solid fa-share-nodes' },
                        { cls: 'fa-solid fa-brain' },
                        { cls: 'fa-solid fa-puzzle-piece' },
                        { cls: 'fa-solid fa-pen' }
                      ];
                      const moreIconsList = [
                        { cls: 'fa-solid fa-arrow-pointer' },
                        { cls: 'fa-solid fa-expand' },
                        { cls: 'fa-solid fa-circle-nodes' },
                        { cls: 'fa-solid fa-compass' },
                        { cls: 'fa-solid fa-bicycle' },
                        { cls: 'fa-solid fa-binoculars' },
                        { cls: 'fa-solid fa-code' },
                        { cls: 'fa-solid fa-microchip' },
                        { cls: 'fa-solid fa-users' },
                        { cls: 'fa-solid fa-hotel' },
                        { cls: 'fa-solid fa-building' },
                        { cls: 'fa-solid fa-video' },
                        { cls: 'fa-solid fa-camera' },
                        { cls: 'fa-solid fa-tent' },
                        { cls: 'fa-solid fa-car' },
                        { cls: 'fa-solid fa-chart-line' },
                        { cls: 'fa-solid fa-chart-pie' },
                        { cls: 'fa-solid fa-chalkboard-user' },
                        { cls: 'fa-solid fa-chart-simple' },
                        { cls: 'fa-solid fa-check' },
                        { cls: 'fa-solid fa-chess-queen' },
                        { cls: 'fa-solid fa-user' },
                        { cls: 'fa-solid fa-terminal' },
                        { cls: 'fa-solid fa-fire' },
                        { cls: 'fa-solid fa-comment' },
                        { cls: 'fa-solid fa-circle-info' },
                        { cls: 'fa-solid fa-cubes' },
                        { cls: 'fa-solid fa-hourglass' },
                        { cls: 'fa-solid fa-droplet' },
                        { cls: 'fa-solid fa-dumbbell' },
                        { cls: 'fa-solid fa-earth-americas' },
                        { cls: 'fa-solid fa-gear' },
                        { cls: 'fa-solid fa-film' },
                        { cls: 'fa-solid fa-flag' },
                        { cls: 'fa-solid fa-flask' },
                        { cls: 'fa-solid fa-gamepad' },
                        { cls: 'fa-solid fa-globe-asia' },
                        { cls: 'fa-solid fa-hammer' },
                        { cls: 'fa-solid fa-hand-holding-heart' },
                        { cls: 'fa-solid fa-seedling' },
                        { cls: 'fa-solid fa-heart' },
                        { cls: 'fa-solid fa-hands-clapping' },
                        { cls: 'fa-solid fa-hashtag' },
                        { cls: 'fa-regular fa-heart' },
                        { cls: 'fa-solid fa-marker' },
                        { cls: 'fa-solid fa-percent' },
                        { cls: 'fa-solid fa-industry' },
                        { cls: 'fa-solid fa-infinity' },
                        { cls: 'fa-solid fa-keyboard' },
                        { cls: 'fa-solid fa-key' },
                        { cls: 'fa-solid fa-landmark' },
                        { cls: 'fa-solid fa-arrow-down-a-z' },
                        { cls: 'fa-solid fa-code-compare' },
                        { cls: 'fa-solid fa-desktop' },
                        { cls: 'fa-solid fa-laptop' },
                        { cls: 'fa-solid fa-lightbulb' },
                        { cls: 'fa-solid fa-cpu' },
                        { cls: 'fa-solid fa-microphone' },
                        { cls: 'fa-solid fa-microscope' },
                        { cls: 'fa-solid fa-mountain' },
                        { cls: 'fa-solid fa-mug-hot' },
                        { cls: 'fa-solid fa-music' },
                        { cls: 'fa-solid fa-paintbrush' },
                        { cls: 'fa-solid fa-palette' },
                        { cls: 'fa-solid fa-pen-ruler' },
                        { cls: 'fa-solid fa-motorcycle' },
                        { cls: 'fa-solid fa-person-running' },
                        { cls: 'fa-solid fa-person-swimming' },
                        { cls: 'fa-solid fa-plane' },
                        { cls: 'fa-solid fa-rocket' },
                        { cls: 'fa-solid fa-scale-balanced' },
                        { cls: 'fa-solid fa-leaf' },
                        { cls: 'fa-solid fa-signature' },
                        { cls: 'fa-solid fa-wand-magic-sparkles' },
                        { cls: 'fa-solid fa-spa' },
                        { cls: 'fa-solid fa-calculator' },
                        { cls: 'fa-solid fa-star' },
                        { cls: 'fa-solid fa-telescope' },
                        { cls: 'fa-solid fa-route' },
                        { cls: 'fa-solid fa-trophy' },
                        { cls: 'fa-solid fa-shield-halved' },
                        { cls: 'fa-solid fa-vial' }
                      ];

                      if (isHeadingMode) {
                        const isIconPickerOpen = !!showIconPicker[section.id];
                        return (
                          <div className="new-section-card" key={section.id}>
                            <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-end', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
                              {/* Icon column */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', position: 'relative' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#d1d5db' }}>Icon</label>
                                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                  <button
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '0.5rem 0.7rem', color: '#e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                    onClick={(e) => { e.stopPropagation(); setShowIconPicker(prev => ({ ...prev, [section.id]: !prev[section.id] })); }}
                                    title="Choose icon"
                                  >
                                    <i className={sectionIcons[section.id] === 'hidden' ? 'fa-solid fa-eye-slash' : currentIconClass} style={{ fontSize: '1rem' }}></i>
                                    <i className={`fa-solid fa-chevron-${!!showIconPicker[section.id] ? 'up' : 'down'}`} style={{ fontSize: '0.7rem' }}></i>
                                  </button>
                                </div>

                                {/* Icon Picker Dropdown */}
                                {!!showIconPicker[section.id] && (
                                  <div className="icon-picker-dropdown" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 200, background: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '1.25rem', width: '320px', marginTop: '0.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.5)', maxHeight: '400px', overflowY: 'auto' }}>
                                    {/* Show/hide icon toggle */}
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #333' }}>
                                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e5e7eb' }}>Show/hide icon</span>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <i className={sectionIcons[section.id] === 'hidden' ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} style={{ color: sectionIcons[section.id] === 'hidden' ? '#888' : '#e5e7eb' }}></i>
                                        <div
                                          onClick={() => {
                                            const isHidden = sectionIcons[section.id] === 'hidden';
                                            setSectionIcons(prev => ({ ...prev, [section.id]: isHidden ? (iconClass) : 'hidden' }));
                                          }}
                                          style={{ width: '44px', height: '24px', borderRadius: '12px', background: sectionIcons[section.id] === 'hidden' ? '#555' : '#10b981', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}
                                        >
                                          <div style={{ position: 'absolute', top: '2px', left: sectionIcons[section.id] === 'hidden' ? '2px' : '22px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                                        </div>
                                      </div>
                                    </div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#888', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Default icons</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                      {defaultIconsList.map((ic, i) => (
                                        <button
                                          key={i}
                                          onClick={() => { setSectionIcons(prev => ({ ...prev, [section.id]: ic.cls })); setShowIconPicker(prev => ({ ...prev, [section.id]: false })); }}
                                          style={{ background: currentIconClass === ic.cls ? 'rgba(238,195,12,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${currentIconClass === ic.cls ? '#EEC30C' : '#333'}`, borderRadius: '8px', padding: '0.6rem', color: '#e5e7eb', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                                        >
                                          <i className={ic.cls} />
                                        </button>
                                      ))}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#888', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>More</div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.5rem' }}>
                                      {moreIconsList.map((ic, i) => (
                                        <button
                                          key={i}
                                          onClick={() => { setSectionIcons(prev => ({ ...prev, [section.id]: ic.cls })); setShowIconPicker(prev => ({ ...prev, [section.id]: false })); }}
                                          style={{ background: currentIconClass === ic.cls ? 'rgba(238,195,12,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${currentIconClass === ic.cls ? '#EEC30C' : '#333'}`, borderRadius: '8px', padding: '0.6rem', color: '#e5e7eb', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                                        >
                                          <i className={ic.cls} />
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Heading text input */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#d1d5db' }}>Heading</label>
                                <input
                                  type="text"
                                  className="heading-input"
                                  value={section.title || ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setResumeData(prev => ({
                                      ...prev,
                                      sections: prev.sections.map(s => s.id === section.id ? { ...s, title: val } : s)
                                    }));
                                    updateResumeData(prev => ({
                                      ...prev,
                                      sections: prev.sections.map(s => s.id === section.id ? { ...s, title: val } : s)
                                    }));
                                  }}
                                  style={{ width: '100%' }}
                                />
                              </div>

                              {/* Done button */}
                              <button className="btn-done" style={{ width: 'auto', padding: '0.6rem 1.2rem', fontSize: '0.85rem', alignSelf: 'center', marginTop: '1.4rem' }} onClick={() => { setSectionHeadingEditMode(prev => ({ ...prev, [section.id]: false })); setShowIconPicker(prev => ({ ...prev, [section.id]: false })); }}>
                                <i className="fa-solid fa-check"></i> Done
                              </button>
                            </div>
                            <div className="new-section-body">
                              {(() => {
                                let currentItems = section.items || [];
                                if (section.type === 'summary' && currentItems.length === 0 && section.content) {
                                  currentItems = [{ desc: section.content }];
                                }
                                return currentItems.map((item, idx) => {
                                  let entryTitle = '';
                                  if (section.type === 'summary') {
                                    const raw = (item.desc || '').replace(/<[^>]+>/g, '').trim();
                                    entryTitle = raw ? (raw.length > 60 ? raw.substring(0, 60) + '...' : raw) : '';
                                  } else {
                                    entryTitle = (section.type === 'skills' || (section.type === 'custom' && section.customType === 'skill'))
                                      ? (typeof item === 'object' ? item.name : item)
                                      : (item.title || item.name || item.role || item.institution || item.company || '');
                                  }
                                  const isHidden = hiddenItems[section.id]?.[idx];
                                  return (
                                    <div className="new-entry-row" key={idx} onClick={() => {
                                      setActiveEditIndex(prev => ({ ...prev, [section.id]: idx }));
                                      setSectionHeadingEditMode(prev => ({ ...prev, [section.id]: false }));
                                    }} style={{ opacity: isHidden ? 0.45 : 1 }}>
                                      <i className="fa-solid fa-grip-vertical drag-handle"></i>
                                      <span className="entry-title">{entryTitle || 'New Entry'}</span>
                                      <button className="action-icon" title={isHidden ? 'Show in resume' : 'Hide from resume'} onClick={(e) => { e.stopPropagation(); setHiddenItems(prev => { const secH = { ...(prev[section.id] || {}) }; secH[idx] = !secH[idx]; return { ...prev, [section.id]: secH }; }); }}>
                                        <i className={isHidden ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
                                      </button>
                                      <button className="action-icon" title="Delete entry" onClick={(e) => { e.stopPropagation(); handleDeleteEntry(section.id, idx); }}>
                                        <i className="fa-solid fa-trash-can" style={{ color: '#ef4444' }}></i>
                                      </button>
                                    </div>
                                  );
                                })
                              })()}
                              <div className="add-entry-row">
                                <button className="btn-add-new-entry" onClick={() => handleAddSectionEntry(section.id, section.type)}>
                                  <i className="fa-solid fa-plus"></i> Add Entry
                                </button>
                                <button className="delete-section-btn" onClick={() => handleDeleteSection(section.id)}>
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (isEntryMode) {
                        const idx = editEntryIndex;
                        const item = (section.items || [])[idx] || {};
                        
                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} key={`custom-wrap-${section.id}`}>
                            {section.type === 'custom' && (
                              <div className="new-section-card" style={{ marginBottom: 0 }}>
                                <div style={{ padding: '0.2rem' }}>
                                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '1.5rem' }}>New Custom Section</h3>
                                  
                                  <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                    {/* Icon Picker */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
                                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#d1d5db' }}>Icon</label>
                                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <button 
                                          className="icon-picker-btn"
                                          onClick={(e) => { e.stopPropagation(); setShowIconPicker(prev => ({ ...prev, [section.id]: !prev[section.id] })); }}
                                          title="Choose icon"
                                          style={{ background: '#111', border: '1px solid #333', borderRadius: '8px', padding: '0.6rem 1rem', color: '#e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
                                        >
                                          <i className={sectionIcons[section.id] === 'hidden' ? 'fa-solid fa-eye-slash' : (sectionIcons[section.id] || iconClass || 'fa-solid fa-list')} style={{ fontSize: '1.1rem', width: '16px' }}></i>
                                          <i className={`fa-solid fa-chevron-${!!showIconPicker[section.id] ? 'up' : 'down'}`} style={{ fontSize: '0.7rem' }}></i>
                                        </button>
                                      </div>
                                      
                                      {!!showIconPicker[section.id] && (
                                        <div className="icon-picker-dropdown" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 200, background: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '1.25rem', width: '320px', marginTop: '0.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.5)', maxHeight: '400px', overflowY: 'auto' }}>
                                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid #333' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e5e7eb' }}>Show/hide icon</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                              <i className={sectionIcons[section.id] === 'hidden' ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'} style={{ color: sectionIcons[section.id] === 'hidden' ? '#888' : '#e5e7eb' }}></i>
                                              <div
                                                onClick={() => {
                                                  const isHidden = sectionIcons[section.id] === 'hidden';
                                                  const currentIcon = sectionIcons[section.id] || iconClass || 'fa-solid fa-list';
                                                  setSectionIcons(prev => ({ ...prev, [section.id]: isHidden ? currentIcon : 'hidden' }));
                                                }}
                                                style={{ width: '44px', height: '24px', borderRadius: '12px', background: sectionIcons[section.id] === 'hidden' ? '#555' : '#10b981', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}
                                              >
                                                <div style={{ position: 'absolute', top: '2px', left: sectionIcons[section.id] === 'hidden' ? '2px' : '22px', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                                              </div>
                                            </div>
                                          </div>
                                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#888', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Default icons</div>
                                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                            {defaultIconsList.map((ic, i) => (
                                              <button
                                                key={i}
                                                onClick={() => { setSectionIcons(prev => ({ ...prev, [section.id]: ic.cls })); setShowIconPicker(prev => ({ ...prev, [section.id]: false })); }}
                                                style={{ background: (sectionIcons[section.id] || iconClass || 'fa-solid fa-list') === ic.cls ? 'rgba(238,195,12,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${(sectionIcons[section.id] || iconClass || 'fa-solid fa-list') === ic.cls ? '#EEC30C' : '#333'}`, borderRadius: '8px', padding: '0.6rem', color: '#e5e7eb', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                                              >
                                                <i className={ic.cls} />
                                              </button>
                                            ))}
                                          </div>
                                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#888', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>More</div>
                                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '0.5rem' }}>
                                            {moreIconsList.map((ic, i) => (
                                              <button
                                                key={i}
                                                onClick={() => { setSectionIcons(prev => ({ ...prev, [section.id]: ic.cls })); setShowIconPicker(prev => ({ ...prev, [section.id]: false })); }}
                                                style={{ background: (sectionIcons[section.id] || iconClass || 'fa-solid fa-list') === ic.cls ? 'rgba(238,195,12,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${(sectionIcons[section.id] || iconClass || 'fa-solid fa-list') === ic.cls ? '#EEC30C' : '#333'}`, borderRadius: '8px', padding: '0.6rem', color: '#e5e7eb', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                                              >
                                                <i className={ic.cls} />
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    {/* Heading Input */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                                      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#d1d5db' }}>Heading</label>
                                      <input
                                        type="text"
                                        className="heading-input"
                                        value={section.title || ''}
                                        onChange={(e) => {
                                          const val = e.target.value;
                                          setResumeData(prev => ({
                                            ...prev,
                                            sections: prev.sections.map(s => s.id === section.id ? { ...s, title: val } : s)
                                          }));
                                          updateResumeData(prev => ({
                                            ...prev,
                                            sections: prev.sections.map(s => s.id === section.id ? { ...s, title: val } : s)
                                          }));
                                        }}
                                        style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: '8px', padding: '0.7rem 1rem', color: '#fff', fontSize: '0.95rem' }}
                                      />
                                    </div>
                                  </div>

                                  {/* Type Selector */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#d1d5db' }}>Type</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                      <button 
                                        onClick={() => {
                                          setResumeData(prev => ({ ...prev, sections: prev.sections.map(s => s.id === section.id ? { ...s, customType: 'normal' } : s) }));
                                          updateResumeData(prev => ({ ...prev, sections: prev.sections.map(s => s.id === section.id ? { ...s, customType: 'normal' } : s) }));
                                        }}
                                        style={{ flex: 1, padding: '0.7rem', borderRadius: '8px', background: section.customType !== 'skill' ? 'rgba(238,195,12,0.15)' : 'transparent', border: `1px solid ${section.customType !== 'skill' ? '#EEC30C' : '#333'}`, color: section.customType !== 'skill' ? '#EEC30C' : '#ccc', cursor: 'pointer', transition: 'all 0.2s', fontWeight: section.customType !== 'skill' ? 600 : 400 }}
                                      >
                                        Normal
                                      </button>
                                      <button 
                                        onClick={() => {
                                          setResumeData(prev => ({ ...prev, sections: prev.sections.map(s => s.id === section.id ? { ...s, customType: 'skill' } : s) }));
                                          updateResumeData(prev => ({ ...prev, sections: prev.sections.map(s => s.id === section.id ? { ...s, customType: 'skill' } : s) }));
                                        }}
                                        style={{ flex: 1, padding: '0.7rem', borderRadius: '8px', background: section.customType === 'skill' ? 'rgba(238,195,12,0.15)' : 'transparent', border: `1px solid ${section.customType === 'skill' ? '#EEC30C' : '#333'}`, color: section.customType === 'skill' ? '#EEC30C' : '#ccc', cursor: 'pointer', transition: 'all 0.2s', fontWeight: section.customType === 'skill' ? 600 : 400 }}
                                      >
                                        Skill
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="new-section-card">
                            <div className="edit-entry-mode">
                              <div className="edit-entry-header">
                                <h3>Edit Entry</h3>
                                <div className="edit-entry-actions">
                                  <button 
                                    className="action-icon" 
                                    title={hiddenItems[section.id]?.[idx] ? 'Show in resume' : 'Hide from resume'} 
                                    onClick={() => setHiddenItems(prev => { 
                                      const secH = { ...(prev[section.id] || {}) }; 
                                      secH[idx] = !secH[idx]; 
                                      return { ...prev, [section.id]: secH }; 
                                    })}
                                  >
                                    <i className={hiddenItems[section.id]?.[idx] ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
                                  </button>
                                  <button 
                                    className="action-icon" 
                                    title="Delete entry" 
                                    onClick={() => { 
                                      handleDeleteEntry(section.id, idx); 
                                    }}
                                  >
                                    <i className="fa-solid fa-trash-can" style={{ color: '#ef4444' }}></i>
                                  </button>
                                </div>
                              </div>

                              {section.type === 'summary' && (
                                <div className="form-group">
                                  <label className="entry-field-label">Professional Summary</label>
                                  <RichTextEditor 
                                    value={item.desc || ''} 
                                    onChange={(val) => handleUpdateEntryValue(section.id, idx, 'desc', val)} 
                                    placeholder="Write a professional summary or objective statement that highlights your key qualifications and career goals..." 
                                  />
                                </div>
                              )}

                              {(section.type === 'skills' || (section.type === 'custom' && section.customType === 'skill')) && (
                                <>
                                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label className="entry-field-label">Skill</label>
                                    <input 
                                      type="text" 
                                      className="form-input-dark" 
                                      value={typeof item === 'object' ? (item.name || '') : item} 
                                      onChange={(e) => handleUpdateEntryValue(section.id, idx, 'name', e.target.value)} 
                                      placeholder="Enter Skill" 
                                    />
                                  </div>
                                  <label className="entry-field-label">Information / Sub-skills</label>
                                  <RichTextEditor 
                                    value={item.desc || ''} 
                                    onChange={(val) => handleUpdateEntryValue(section.id, idx, 'desc', val)} 
                                    placeholder="Enter information or sub-skills" 
                                  />
                                  <div className="form-group" style={{ marginTop: '1rem' }}>
                                    <label className="entry-field-label">Skill level</label>
                                    <SkillLevelSelect 
                                      value={item.level || ''} 
                                      onChange={(val) => handleUpdateEntryValue(section.id, idx, 'level', val)} 
                                      accentColor={accentColor}
                                    />
                                  </div>
                                </>
                              )}

                              {section.type === 'languages' && (
                                <>
                                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label className="entry-field-label">Language</label>
                                    <input 
                                      type="text" 
                                      className="form-input-dark" 
                                      value={item.name || ''} 
                                      onChange={(e) => handleUpdateEntryValue(section.id, idx, 'name', e.target.value)} 
                                      placeholder="Enter language" 
                                    />
                                  </div>
                                  <label className="entry-field-label">Additional information</label>
                                  <RichTextEditor 
                                    value={item.desc || ''} 
                                    onChange={(val) => handleUpdateEntryValue(section.id, idx, 'desc', val)} 
                                    placeholder="e.g. C2, 4+, TOEFL, IELTS,..." 
                                  />
                                  <div className="form-group" style={{ marginTop: '1rem' }}>
                                    <label className="entry-field-label">Language Level</label>
                                    <LanguageLevelSelect
                                      value={item.level || ''}
                                      onChange={(val) => handleUpdateEntryValue(section.id, idx, 'level', val)}
                                      accentColor={accentColor}
                                      level1={section.customizations?.level1}
                                      level2={section.customizations?.level2}
                                      level3={section.customizations?.level3}
                                      level4={section.customizations?.level4}
                                      level5={section.customizations?.level5}
                                    />
                                  </div>
                                </>
                              )}

                              {section.type === 'certificates' && (
                                <>
                                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label className="entry-field-label">Certificate</label>
                                    <SchoolInputWithLink
                                      value={item.name || ''}
                                      onChange={(val) => handleUpdateEntryValue(section.id, idx, 'name', val)}
                                      urlValue={item.titleUrl || ''}
                                      onUrlChange={(val) => handleUpdateEntryValue(section.id, idx, 'titleUrl', val)}
                                      placeholder="Enter certificate"
                                      isEducation={false}
                                      accentColor={accentColor}
                                    />
                                  </div>
                                  <label className="entry-field-label">Additional information</label>
                                  <RichTextEditor 
                                    value={item.desc || ''} 
                                    onChange={(val) => handleUpdateEntryValue(section.id, idx, 'desc', val)} 
                                    placeholder="eg. Level 1 and 2" 
                                  />
                                </>
                              )}

                              {section.type === 'interests' && (
                                <>
                                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label className="entry-field-label">Interest</label>
                                    <input 
                                      type="text" 
                                      className="form-input-dark" 
                                      value={item.name || ''} 
                                      onChange={(e) => handleUpdateEntryValue(section.id, idx, 'name', e.target.value)} 
                                      placeholder="Enter Interest / Hobby" 
                                    />
                                  </div>
                                  <label className="entry-field-label">Additional information</label>
                                  <RichTextEditor 
                                    value={item.desc || ''} 
                                    onChange={(val) => handleUpdateEntryValue(section.id, idx, 'desc', val)} 
                                    placeholder="Enter additional information" 
                                  />
                                </>
                              )}

                              {(section.type === 'education' || section.type === 'experience' || section.type === 'projects' || section.type === 'courses' || section.type === 'awards' || section.type === 'organisations' || section.type === 'publications' || (section.type === 'custom' && section.customType !== 'skill')) && (
                                <>
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="form-group" style={{ marginBottom: '1rem', order: (section.customizations?.order === 'school-degree' || section.customizations?.order === 'employer-title' || section.customizations?.order === 'subtitle-first') ? 2 : ((section.type === 'education' || section.type === 'experience') ? 1 : 2) }}>
                                      <label className="entry-field-label">
                                        {section.type === 'education' ? 'Degree' : (section.type === 'experience' ? 'Job Title' : (section.type === 'awards' ? 'Issuer' : (section.type === 'organisations' ? 'Position' : (section.type === 'publications' ? 'Publisher' : 'Subtitle'))))}
                                      </label>
                                      <input 
                                        type="text" 
                                        className="form-input-dark" 
                                        value={item.role || item.institution || item.company || ''} 
                                        onChange={(e) => handleUpdateEntryValue(section.id, idx, 'role', e.target.value)} 
                                        placeholder={`Enter ${section.type === 'education' ? 'Degree / Exchange semester' : (section.type === 'awards' ? 'Issuer' : (section.type === 'organisations' ? 'position at the organization' : (section.type === 'publications' ? "the publisher's name" : 'Subtitle')))}`} 
                                      />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '1rem', order: (section.customizations?.order === 'school-degree' || section.customizations?.order === 'employer-title' || section.customizations?.order === 'subtitle-first') ? 1 : ((section.type === 'education' || section.type === 'experience') ? 2 : 1) }}>
                                      <label className="entry-field-label">
                                        {section.type === 'education' ? 'School' : (section.type === 'experience' ? 'Employer' : (section.type === 'projects' ? 'Project title' : (section.type === 'awards' ? 'Award' : (section.type === 'organisations' ? 'Organization' : 'Title'))))}
                                      </label>
                                      <SchoolInputWithLink
                                        value={item.title || item.name || ''}
                                        onChange={(val) => handleUpdateEntryValue(section.id, idx, 'title', val)}
                                        urlValue={item.titleUrl || ''}
                                        onUrlChange={(val) => handleUpdateEntryValue(section.id, idx, 'titleUrl', val)}
                                        placeholder={`Enter ${section.type === 'education' ? 'school / university' : (section.type === 'awards' ? 'award' : (section.type === 'organisations' ? "the organization's name" : (section.type === 'publications' ? "the title of your publication" : 'Title')))}`}
                                        isEducation={section.type === 'education'}
                                        accentColor={accentColor}
                                      />
                                    </div>
                                  </div>
                                  {section.type === 'awards' || section.type === 'publications' ? (
                                    <div style={{ marginBottom: '1rem' }}>
                                      <label className="entry-field-label">Date</label>
                                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                                        <div>
                                          <CustomAwardsSelect 
                                            options={Array.from({length: 31}, (_, i) => String(i + 1))}
                                            value={item.day || ''} 
                                            onChange={val => handleUpdateEntryValue(section.id, idx, 'day', val)}
                                            placeholder="Day"
                                            accentColor={accentColor}
                                          />
                                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#aaa', marginTop: '8px', cursor: 'pointer' }}>
                                            <div style={{ width: '14px', height: '14px', border: item.hideDay ? 'none' : '1px solid #555', borderRadius: '3px', background: item.hideDay ? accentColor : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              {item.hideDay && <i className="fa-solid fa-check" style={{ color: '#000', fontSize: '0.6rem' }}></i>}
                                            </div>
                                            <input type="checkbox" checked={item.hideDay || false} onChange={e => handleUpdateEntryValue(section.id, idx, 'hideDay', e.target.checked)} style={{ display: 'none' }} />
                                            Don't show
                                          </label>
                                        </div>
                                        <div>
                                          <CustomAwardsSelect 
                                            options={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                                            value={item.month || ''} 
                                            onChange={val => handleUpdateEntryValue(section.id, idx, 'month', val)}
                                            placeholder="Month"
                                            accentColor={accentColor}
                                          />
                                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#aaa', marginTop: '8px', cursor: 'pointer' }}>
                                            <div style={{ width: '14px', height: '14px', border: item.hideMonth ? 'none' : '1px solid #555', borderRadius: '3px', background: item.hideMonth ? accentColor : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              {item.hideMonth && <i className="fa-solid fa-check" style={{ color: '#000', fontSize: '0.6rem' }}></i>}
                                            </div>
                                            <input type="checkbox" checked={item.hideMonth || false} onChange={e => handleUpdateEntryValue(section.id, idx, 'hideMonth', e.target.checked)} style={{ display: 'none' }} />
                                            Don't show
                                          </label>
                                        </div>
                                        <div>
                                          <CustomAwardsSelect 
                                            options={Array.from({length: 2035 - 1900 + 1}, (_, i) => String(2035 - i))}
                                            value={item.year || ''} 
                                            onChange={val => handleUpdateEntryValue(section.id, idx, 'year', val)}
                                            placeholder="Year"
                                            accentColor={accentColor}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="form-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                                      <div>
                                        <label className="entry-field-label">Start Date</label>
                                        <CustomDatePicker 
                                          value={(item.dateRange || '').split(' - ')[0] || ''} 
                                          onChange={(val) => {
                                            const end = (item.dateRange || '').split(' - ')[1] || '';
                                            handleUpdateEntryValue(section.id, idx, 'dateRange', `${val} - ${end}`);
                                          }} 
                                          placeholder="MM/YYYY" 
                                          isEnd={false}
                                        />
                                      </div>
                                      <div>
                                        <label className="entry-field-label">End Date</label>
                                        <CustomDatePicker 
                                          value={(item.dateRange || '').split(' - ')[1] || ''} 
                                          onChange={(val) => {
                                            const start = (item.dateRange || '').split(' - ')[0] || '';
                                            handleUpdateEntryValue(section.id, idx, 'dateRange', `${start} - ${val}`);
                                          }} 
                                          placeholder="MM/YYYY" 
                                          isEnd={true}
                                        />
                                      </div>
                                      <div>
                                        <label className="entry-field-label">Location</label>
                                        <input 
                                          type="text" 
                                          className="form-input-dark" 
                                          value={item.location || ''} 
                                          onChange={(e) => handleUpdateEntryValue(section.id, idx, 'location', e.target.value)} 
                                          placeholder="City, Country" 
                                        />
                                      </div>
                                    </div>
                                  )}
                                  <label className="entry-field-label">Description</label>
                                  <RichTextEditor 
                                    value={item.desc || ''} 
                                    onChange={(val) => handleUpdateEntryValue(section.id, idx, 'desc', val)} 
                                    placeholder={section.type === 'education' ? 'Add a description of your education entry...' : (section.type === 'organisations' ? 'Describe the organization & your role in it' : (section.type === 'publications' ? 'Describe your publication...' : 'Describe your role & achievements'))} 
                                  />
                                </>
                              )}

                              {section.type === 'references' && (
                                <>
                                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label className="entry-field-label">Name</label>
                                    <SchoolInputWithLink
                                      value={item.name || item.title || ''}
                                      onChange={(val) => handleUpdateEntryValue(section.id, idx, 'name', val)}
                                      urlValue={item.titleUrl || ''}
                                      onUrlChange={(val) => handleUpdateEntryValue(section.id, idx, 'titleUrl', val)}
                                      placeholder="Enter the full name"
                                      isEducation={false}
                                      accentColor={accentColor}
                                    />
                                  </div>
                                  <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                                    <div>
                                      <label className="entry-field-label">Job Title</label>
                                      <input 
                                        type="text" 
                                        className="form-input-dark" 
                                        value={item.role || ''} 
                                        onChange={(e) => handleUpdateEntryValue(section.id, idx, 'role', e.target.value)} 
                                        placeholder="Enter job title" 
                                      />
                                    </div>
                                    <div>
                                      <label className="entry-field-label">Organization</label>
                                      <input 
                                        type="text" 
                                        className="form-input-dark" 
                                        value={item.organization || ''} 
                                        onChange={(e) => handleUpdateEntryValue(section.id, idx, 'organization', e.target.value)} 
                                        placeholder="Enter Organization" 
                                      />
                                    </div>
                                  </div>
                                  <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                                    <div>
                                      <label className="entry-field-label">Email</label>
                                      <input 
                                        type="email" 
                                        className="form-input-dark" 
                                        value={item.email || ''} 
                                        onChange={(e) => handleUpdateEntryValue(section.id, idx, 'email', e.target.value)} 
                                        placeholder="Enter Email" 
                                      />
                                    </div>
                                    <div>
                                      <label className="entry-field-label">Phone</label>
                                      <input 
                                        type="tel" 
                                        className="form-input-dark" 
                                        value={item.phone || ''} 
                                        onChange={(e) => handleUpdateEntryValue(section.id, idx, 'phone', e.target.value)} 
                                        placeholder="Enter a phone number" 
                                      />
                                    </div>
                                  </div>
                                </>
                              )}

                              {section.type === 'declaration' && (
                                <>
                                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label className="entry-field-label">Text</label>
                                    <input 
                                      type="text" 
                                      className="form-input-dark" 
                                      value={item.desc || ''} 
                                      onChange={(e) => handleUpdateEntryValue(section.id, idx, 'desc', e.target.value)} 
                                      placeholder="Enter declaration text" 
                                    />
                                  </div>
                                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label className="entry-field-label">Signature</label>
                                    {item.signature ? (
                                      <div>
                                        <div style={{ padding: '16px', background: '#fff', borderRadius: '8px', marginBottom: '12px', display: 'inline-block' }}>
                                          <img src={item.signature} alt="Signature" style={{ maxHeight: '80px', display: 'block' }} />
                                        </div>
                                        <button 
                                          type="button"
                                          className="btn-create-signature" 
                                          style={{ padding: '0.5rem 1rem', borderRadius: '24px', background: '#fff', border: 'none', color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: 'fit-content', fontSize: '0.85rem', fontWeight: 600 }}
                                          onClick={() => setSignatureModal({ isOpen: true, sectionId: section.id, entryIndex: idx })}
                                        >
                                          <i className="fa-solid fa-pen-to-square"></i> Edit
                                        </button>
                                      </div>
                                    ) : (
                                      <button 
                                        type="button"
                                        className="btn-create-signature" 
                                        style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', background: 'transparent', border: '1px solid #444', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: 'fit-content', fontSize: '0.9rem' }}
                                        onMouseEnter={(e) => { e.currentTarget.style.cursor = 'pointer'; }}
                                        onClick={() => setSignatureModal({ isOpen: true, sectionId: section.id, entryIndex: idx })}
                                      >
                                        <i className="fa-solid fa-plus"></i> Create / Upload
                                      </button>
                                    )}
                                  </div>
                                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label className="entry-field-label">Full name</label>
                                    <input 
                                      type="text" 
                                      className="form-input-dark" 
                                      value={item.name || ''} 
                                      onChange={(e) => handleUpdateEntryValue(section.id, idx, 'name', e.target.value)} 
                                      placeholder="Enter full name" 
                                    />
                                  </div>
                                  <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
                                    <div>
                                      <label className="entry-field-label">Place</label>
                                      <input 
                                        type="text" 
                                        className="form-input-dark" 
                                        value={item.location || ''} 
                                        onChange={(e) => handleUpdateEntryValue(section.id, idx, 'location', e.target.value)} 
                                        placeholder="Enter place" 
                                      />
                                    </div>
                                    <div>
                                      <label className="entry-field-label">Date</label>
                                      <input 
                                        type="text" 
                                        className="form-input-dark" 
                                        value={item.dateRange || ''} 
                                        onChange={(e) => handleUpdateEntryValue(section.id, idx, 'dateRange', e.target.value)} 
                                        placeholder="Enter date" 
                                      />
                                    </div>
                                  </div>
                                </>
                              )}

                              <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', marginTop: '1rem' }}>
                                <button className="btn-done" onClick={() => setActiveEditIndex(prev => ({ ...prev, [section.id]: null }))}>
                                  <i className="fa-solid fa-check"></i> Done
                                </button>
                              </div>
                            </div>
                            
                            {renderSectionCustomizerControls(section)}
                          </div>
                          </div>
                        );
                      }

                      return (
                        <div className="new-section-card" key={section.id}>
                          <div className="new-section-header" onClick={() => setExpandedAccordions(prev => ({ ...prev, [section.id]: !prev[section.id] }))} style={{ cursor: 'pointer' }}>
                            <div className="icon-container">
                              <i className={sectionIcons[section.id] && sectionIcons[section.id] !== 'hidden' ? sectionIcons[section.id] : (sectionIcons[section.id] === 'hidden' ? 'fa-solid fa-eye-slash' : iconClass)}></i>
                            </div>
                            <h3>{section.title || section.type.toUpperCase()}</h3>
                            <button 
                              className="btn-edit-heading" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSectionHeadingEditMode(prev => ({ ...prev, [section.id]: true }));
                              }}
                            >
                              <i className="fa-solid fa-pencil"></i> Edit Heading
                            </button>
                            <i className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} toggle-icon`}></i>
                          </div>
                          
                          {isExpanded && (
                            <div className="new-section-body">
                              {(() => {
                                let currentItems = section.items || [];
                                if (section.type === 'summary' && currentItems.length === 0 && section.content) {
                                  currentItems = [{ desc: section.content }];
                                }
                                return currentItems.map((item, idx) => {
                                  let entryTitle = '';
                                  if (section.type === 'summary') {
                                    const raw = (item.desc || '').replace(/<[^>]+>/g, '').trim();
                                    entryTitle = raw ? (raw.length > 60 ? raw.substring(0, 60) + '...' : raw) : '';
                                  } else {
                                    entryTitle = (section.type === 'skills' || (section.type === 'custom' && section.customType === 'skill'))
                                      ? (typeof item === 'object' ? item.name : item)
                                      : (item.title || item.name || item.role || item.institution || item.company || '');
                                  }
                                  const isHidden = hiddenItems[section.id]?.[idx];
                                  return (
                                    <div 
                                      className={`new-entry-row ${draggedEntry?.sectionId === section.id && draggedEntry?.idx === idx ? 'dragging' : ''}`} 
                                      key={idx} 
                                      draggable={true}
                                      onDragStart={(e) => handleEntryDragStart(e, section.id, idx)}
                                      onDragOver={handleEntryDragOver}
                                      onDrop={(e) => handleEntryDrop(e, section.id, idx)}
                                      style={{ opacity: isHidden ? 0.45 : 1, cursor: 'grab' }} 
                                      onClick={() => setActiveEditIndex(prev => ({ ...prev, [section.id]: idx }))}
                                    >
                                      <i className="fa-solid fa-grip-vertical drag-handle"></i>
                                      <span className="entry-title">{entryTitle || 'New Entry'}</span>
                                      <button className="action-icon" title={isHidden ? 'Show in resume' : 'Hide from resume'} onClick={(e) => { e.stopPropagation(); setHiddenItems(prev => { const secH = { ...(prev[section.id] || {}) }; secH[idx] = !secH[idx]; return { ...prev, [section.id]: secH }; }); }}>
                                        <i className={isHidden ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
                                      </button>
                                      <button className="action-icon" title="Delete entry" onClick={(e) => { e.stopPropagation(); handleDeleteEntry(section.id, idx); }}>
                                        <i className="fa-solid fa-trash-can" style={{ color: '#ef4444' }}></i>
                                      </button>
                                    </div>
                                  );
                                });
                              })()}
                              
                              <div className="add-entry-row">
                                <button className="btn-add-new-entry" onClick={() => handleAddSectionEntry(section.id, section.type)}>
                                  <i className="fa-solid fa-plus"></i> Add Entry
                                </button>
                                <button className="delete-section-btn" onClick={() => handleDeleteSection(section.id)}>
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </div>
                              {/* Show customizations only in entry edit mode, not in collapsed/expanded list view */}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button className="btn-big-add-content" onClick={() => setShowAddSectionModal(true)}>
                    <i className="fa-solid fa-plus"></i> Add Content
                  </button>
                </div>
              )}

              {activeTab === 'customize' && (
                <div id="customize-scroll-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', paddingRight: '4px' }}>
                  <style>{`#customize-scroll-wrapper::-webkit-scrollbar { display: none; }`}</style>
                  {/* 1. Layout Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('layout')}>
                      <h4>Layout</h4>
                      <i className={`fa-solid ${expandedAccordions['layout'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['layout'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        {/* Columns */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.82rem', color: '#555', fontWeight: '600', marginBottom: '0.8rem' }}>Columns</div>
                            <div className="style-options" style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => { if(mockupImage) setMockupImage(null); setLayoutConfig(p => ({ ...p, columns: 'one' })); }}
                                    className={`style-option ${layoutConfig.columns === 'one' ? 'active' : ''}`}
                                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.8rem 0' }}
                                >
                                    <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <span style={{ width: '28px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                        <span style={{ width: '28px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                        <span style={{ width: '28px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                    </span>
                                    One
                                </button>
                                <button
                                    onClick={() => { if(mockupImage) setMockupImage(null); setLayoutConfig(p => ({ ...p, columns: 'two' })); }}
                                    className={`style-option ${layoutConfig.columns === 'two' ? 'active' : ''}`}
                                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.8rem 0' }}
                                >
                                    <span style={{ display: 'flex', gap: '4px' }}>
                                        <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <span style={{ width: '12px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                            <span style={{ width: '12px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                            <span style={{ width: '12px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                        </span>
                                        <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <span style={{ width: '12px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                            <span style={{ width: '12px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                            <span style={{ width: '12px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                        </span>
                                    </span>
                                    Two
                                </button>
                                <button
                                    onClick={() => { if(mockupImage) setMockupImage(null); setLayoutConfig(p => ({ ...p, columns: 'mix' })); }}
                                    className={`style-option ${layoutConfig.columns === 'mix' ? 'active' : ''}`}
                                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.8rem 0' }}
                                >
                                    <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <span style={{ width: '28px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                        <span style={{ display: 'flex', gap: '4px' }}>
                                            <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <span style={{ width: '12px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                                <span style={{ width: '12px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                            </span>
                                            <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <span style={{ width: '12px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                                <span style={{ width: '12px', height: '4px', background: 'currentColor', display: 'block', borderRadius: '2px' }}></span>
                                            </span>
                                        </span>
                                    </span>
                                    Mix
                                </button>
                            </div>
                        </div>

                        {layoutConfig.columns !== 'one' && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '0.82rem', color: '#555', fontWeight: '600', marginBottom: '0.8rem' }}>Header Position</div>
                                <div className="style-options" style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => { if(mockupImage) setMockupImage(null); setLayoutConfig(p => ({ ...p, headerPos: 'top' })); }}
                                        className={`style-option ${layoutConfig.headerPos === 'top' ? 'active' : ''}`}
                                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.8rem 0' }}
                                    >
                                        <span style={{ width: '30px', height: '24px', border: '2px solid currentColor', borderRadius: '4px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                            <span style={{ background: 'currentColor', height: '10px', width: '100%' }}></span>
                                        </span>
                                        Top
                                    </button>
                                    <button
                                        onClick={() => { if(mockupImage) setMockupImage(null); setLayoutConfig(p => ({ ...p, headerPos: 'left' })); }}
                                        className={`style-option ${layoutConfig.headerPos === 'left' ? 'active' : ''}`}
                                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.8rem 0' }}
                                    >
                                        <span style={{ width: '30px', height: '24px', border: '2px solid currentColor', borderRadius: '4px', display: 'flex', overflow: 'hidden' }}>
                                            <span style={{ background: 'currentColor', height: '100%', width: '10px' }}></span>
                                        </span>
                                        Left
                                    </button>
                                    <button
                                        onClick={() => { if(mockupImage) setMockupImage(null); setLayoutConfig(p => ({ ...p, headerPos: 'right' })); }}
                                        className={`style-option ${layoutConfig.headerPos === 'right' ? 'active' : ''}`}
                                        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.8rem 0' }}
                                    >
                                        <span style={{ width: '30px', height: '24px', border: '2px solid currentColor', borderRadius: '4px', display: 'flex', justifyContent: 'flex-end', overflow: 'hidden' }}>
                                            <span style={{ background: 'currentColor', height: '100%', width: '10px' }}></span>
                                        </span>
                                        Right
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Change Section Layout */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.82rem', color: '#555', fontWeight: '600', marginBottom: '0.8rem' }}>Change Section Layout</div>
                            
                            <div 
                              id="customize-section-layout-list" 
                              onDragOver={(e) => handleLayoutSectionDragOver(e, null)} 
                              onDrop={handleLayoutMainContainerDrop} 
                              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                            >
                                {layoutConfig.columns === 'one' ? (
                                    <>
                                        <div className="style-option" style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#121212', border: '1px solid #333', borderRadius: '8px', cursor: 'default', width: '100%', boxSizing: 'border-box', marginBottom: '0.4rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#888', fontSize: '1rem' }}>
                                                <i className="fa-regular fa-user"></i>
                                                <i className="fa-solid fa-bars" style={{ fontSize: '0.8rem' }}></i>
                                            </div>
                                            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ccc' }}>Personal Details</span>
                                        </div>
                                        {resumeData.sections.map(sec => renderLayoutSectionItem(sec, 'left'))}
                                    </>
                                ) : (
                                    <>
                                        {/* Top Header Personal Details */}
                                        {layoutConfig.headerPos === 'top' && (
                                            <div className="style-option" style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#121212', border: '1px solid #333', borderRadius: '8px', cursor: 'default', width: '100%', boxSizing: 'border-box', marginBottom: '0.1rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#888', fontSize: '1rem' }}>
                                                    <i className="fa-regular fa-user"></i>
                                                    <i className="fa-solid fa-bars" style={{ fontSize: '0.8rem' }}></i>
                                                </div>
                                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ccc' }}>Personal Details</span>
                                            </div>
                                        )}
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                            {/* Left Column Drop Zone */}
                                            <div 
                                              onDragOver={(e) => handleLayoutSectionDragOver(e, null)} 
                                              onDrop={(e) => { setDragOverId(null); handleLayoutColumnDrop(e, 'left'); }} 
                                              style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '0.5rem', minHeight: '120px', display: 'flex', flexDirection: 'column' }}
                                            >
                                                <div style={{ fontSize: '0.65rem', color: '#555', fontWeight: 'bold', marginBottom: '0.6rem', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '0.5px' }}>Left Column</div>
                                                {layoutConfig.headerPos === 'left' && (
                                                    <div className="style-option" style={{ padding: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: '#121212', border: '1px solid #333', borderRadius: '8px', cursor: 'default', width: '100%', boxSizing: 'border-box', marginBottom: '0.4rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#888', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                                                            <i className="fa-regular fa-user"></i>
                                                            <i className="fa-solid fa-bars" style={{ fontSize: '0.8rem' }}></i>
                                                        </div>
                                                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#ccc', textAlign: 'center' }}>Personal Details</span>
                                                    </div>
                                                )}
                                                {resumeData.sections.filter(s => s.column !== 'right').map(sec => renderLayoutSectionItem(sec, 'left'))}
                                            </div>

                                            {/* Right Column Drop Zone */}
                                            <div 
                                              onDragOver={(e) => handleLayoutSectionDragOver(e, null)} 
                                              onDrop={(e) => { setDragOverId(null); handleLayoutColumnDrop(e, 'right'); }} 
                                              style={{ background: '#111', border: '1px solid #222', borderRadius: '8px', padding: '0.5rem', minHeight: '120px', display: 'flex', flexDirection: 'column' }}
                                            >
                                                <div style={{ fontSize: '0.65rem', color: '#555', fontWeight: 'bold', marginBottom: '0.6rem', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '0.5px' }}>Right Column</div>
                                                {layoutConfig.headerPos === 'right' && (
                                                    <div className="style-option" style={{ padding: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: '#121212', border: '1px solid #333', borderRadius: '8px', cursor: 'default', width: '100%', boxSizing: 'border-box', marginBottom: '0.4rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#888', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                                                            <i className="fa-regular fa-user"></i>
                                                            <i className="fa-solid fa-bars" style={{ fontSize: '0.8rem' }}></i>
                                                        </div>
                                                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#ccc', textAlign: 'center' }}>Personal Details</span>
                                                    </div>
                                                )}
                                                {resumeData.sections.filter(s => s.column === 'right').map(sec => renderLayoutSectionItem(sec, 'right'))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Page break draggable template */}
                                <div 
                                  draggable="true" 
                                  onDragStart={(e) => handleLayoutSectionDragStart(e, 'pagebreak')} 
                                  onDragEnd={handleLayoutSectionDragEnd}
                                  className="style-option" 
                                  style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'grab', background: 'transparent', border: '1px dashed #555', borderRadius: '8px', width: '100%', boxSizing: 'border-box', marginTop: '0.4rem' }}
                                >
                                    <i className="fa-solid fa-grip-vertical" style={{ color: '#555', fontSize: '0.85rem' }}></i>
                                    <i className="fa-solid fa-scissors" style={{ color: '#888', fontSize: '0.9rem', width: '16px', textAlign: 'center' }}></i>
                                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ccc' }}>Page break</span>
                                </div>
                            </div>
                        </div>

                        {layoutConfig.columns !== 'one' && (
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.82rem', color: '#555', fontWeight: '600', marginBottom: '0.8rem' }}>Column Width</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.8rem' }}>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.4rem' }}>Left {layoutConfig.leftWidth}%</span>
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden', background: '#0d0d0d' }}>
                                            <button 
                                              onClick={() => { if(mockupImage) setMockupImage(null); setLayoutConfig(p => { const w = Math.max(20, p.leftWidth - 5); return { ...p, leftWidth: w, rightWidth: 100 - w }; }); }} 
                                              style={{ flex: 1, padding: '0.4rem', background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}
                                            >
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                            <div style={{ width: '1px', height: '14px', background: '#333' }}></div>
                                            <button 
                                              onClick={() => { if(mockupImage) setMockupImage(null); setLayoutConfig(p => { const w = Math.min(80, p.leftWidth + 5); return { ...p, leftWidth: w, rightWidth: 100 - w }; }); }} 
                                              style={{ flex: 1, padding: '0.4rem', background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.4rem' }}>Right {layoutConfig.rightWidth}%</span>
                                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #333', borderRadius: '8px', overflow: 'hidden', background: '#0d0d0d' }}>
                                            <button 
                                              onClick={() => { if(mockupImage) setMockupImage(null); setLayoutConfig(p => { const w = Math.min(80, p.leftWidth + 5); return { ...p, leftWidth: w, rightWidth: 100 - w }; }); }} 
                                              style={{ flex: 1, padding: '0.4rem', background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}
                                            >
                                                <i className="fa-solid fa-minus"></i>
                                            </button>
                                            <div style={{ width: '1px', height: '14px', background: '#333' }}></div>
                                            <button 
                                              onClick={() => { if(mockupImage) setMockupImage(null); setLayoutConfig(p => { const w = Math.max(20, p.leftWidth - 5); return { ...p, leftWidth: w, rightWidth: 100 - w }; }); }} 
                                              style={{ flex: 1, padding: '0.4rem', background: 'transparent', border: 'none', color: '#888', cursor: 'pointer' }}
                                            >
                                                <i className="fa-solid fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                      {undoRedoPill}
                      </div>
                    )}
                  </div>

                  {/* 2.5 Font Size Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('fontsize')}>
                      <h4>Font Size</h4>
                      <i className={`fa-solid fa-chevron-${expandedAccordions['fontsize'] ? 'up' : 'down'}`}></i>
                    </div>
                    {expandedAccordions['fontsize'] && (
                      <div className="customize-content" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem', background: '#0a0a0a' }}>
                        
                        {/* Base Font Size */}
                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>
                            <span>Base Font Size</span>
                            <span>{fontSize}pt</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div className="slider-group" style={{ flex: 1, margin: 0, display: 'flex', alignItems: 'center' }}>
                              <input 
                                type="range" 
                                min="9" 
                                max="13" 
                                step="0.5" 
                                value={fontSize} 
                                onChange={(e) => setFontSize(parseFloat(e.target.value))} 
                                style={{ width: '100%', accentColor: accentColor, margin: 0 }} 
                              />
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button onClick={() => setFontSize(v => Math.max(9, v - 0.5))} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212', border: '1px solid #333', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}><i className="fa-solid fa-minus" style={{ fontSize: '0.75rem' }}></i></button>
                              <button onClick={() => setFontSize(v => Math.min(13, v + 0.5))} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212', border: '1px solid #333', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}><i className="fa-solid fa-plus" style={{ fontSize: '0.75rem' }}></i></button>
                            </div>
                          </div>
                        </div>

                        {/* Full Name */}
                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>
                            <span>Full Name</span>
                            <span>+{fullNameFontSizeOffset}pt</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div className="slider-group" style={{ flex: 1, margin: 0, display: 'flex', alignItems: 'center' }}>
                              <input 
                                type="range" 
                                min="4.5" 
                                max="20.5" 
                                step="0.5" 
                                value={fullNameFontSizeOffset} 
                                onChange={(e) => setFullNameFontSizeOffset(parseFloat(e.target.value))} 
                                style={{ width: '100%', accentColor: accentColor, margin: 0 }} 
                              />
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button onClick={() => setFullNameFontSizeOffset(v => Math.max(4.5, v - 0.5))} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212', border: '1px solid #333', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}><i className="fa-solid fa-minus" style={{ fontSize: '0.75rem' }}></i></button>
                              <button onClick={() => setFullNameFontSizeOffset(v => Math.min(20.5, v + 0.5))} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212', border: '1px solid #333', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}><i className="fa-solid fa-plus" style={{ fontSize: '0.75rem' }}></i></button>
                            </div>
                          </div>
                        </div>

                        {/* Professional Title */}
                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>
                            <span>Professional Title</span>
                            <span>+{profTitleFontSizeOffset}pt</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div className="slider-group" style={{ flex: 1, margin: 0, display: 'flex', alignItems: 'center' }}>
                              <input 
                                type="range" 
                                min="1" 
                                max="9" 
                                step="0.5" 
                                value={profTitleFontSizeOffset} 
                                onChange={(e) => setProfTitleFontSizeOffset(parseFloat(e.target.value))} 
                                style={{ width: '100%', accentColor: accentColor, margin: 0 }} 
                              />
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button onClick={() => setProfTitleFontSizeOffset(v => Math.max(1, v - 0.5))} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212', border: '1px solid #333', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}><i className="fa-solid fa-minus" style={{ fontSize: '0.75rem' }}></i></button>
                              <button onClick={() => setProfTitleFontSizeOffset(v => Math.min(9, v + 0.5))} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212', border: '1px solid #333', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}><i className="fa-solid fa-plus" style={{ fontSize: '0.75rem' }}></i></button>
                            </div>
                          </div>
                        </div>

                        {/* Section Headings */}
                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>
                            <span>Section Headings</span>
                            <span>+{sectionHeadingFontSizeOffset}pt</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div className="slider-group" style={{ flex: 1, margin: 0, display: 'flex', alignItems: 'center' }}>
                              <input 
                                type="range" 
                                min="0" 
                                max="4" 
                                step="0.5" 
                                value={sectionHeadingFontSizeOffset} 
                                onChange={(e) => setSectionHeadingFontSizeOffset(parseFloat(e.target.value))} 
                                style={{ width: '100%', accentColor: accentColor, margin: 0 }} 
                              />
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button onClick={() => setSectionHeadingFontSizeOffset(v => Math.max(0, v - 0.5))} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212', border: '1px solid #333', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}><i className="fa-solid fa-minus" style={{ fontSize: '0.75rem' }}></i></button>
                              <button onClick={() => setSectionHeadingFontSizeOffset(v => Math.min(4, v + 0.5))} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212', border: '1px solid #333', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}><i className="fa-solid fa-plus" style={{ fontSize: '0.75rem' }}></i></button>
                            </div>
                          </div>
                        </div>

                        {/* Entry Header */}
                        <div style={{ marginBottom: '0.4rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>
                            <span>Entry Header</span>
                            <span>{entryHeaderFontSizeOffset >= 0 ? '+' : ''}{entryHeaderFontSizeOffset}pt</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div className="slider-group" style={{ flex: 1, margin: 0, display: 'flex', alignItems: 'center' }}>
                              <input 
                                type="range" 
                                min="-2" 
                                max="2" 
                                step="0.5" 
                                value={entryHeaderFontSizeOffset} 
                                onChange={(e) => setEntryHeaderFontSizeOffset(parseFloat(e.target.value))} 
                                style={{ width: '100%', accentColor: accentColor, margin: 0 }} 
                              />
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button onClick={() => setEntryHeaderFontSizeOffset(v => Math.max(-2, v - 0.5))} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212', border: '1px solid #333', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}><i className="fa-solid fa-minus" style={{ fontSize: '0.75rem' }}></i></button>
                              <button onClick={() => setEntryHeaderFontSizeOffset(v => Math.min(2, v + 0.5))} style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#121212', border: '1px solid #333', color: '#ccc', borderRadius: '4px', cursor: 'pointer' }}><i className="fa-solid fa-plus" style={{ fontSize: '0.75rem' }}></i></button>
                            </div>
                          </div>
                        </div>

                      {undoRedoPill}
                      </div>
                    )}
                  </div>

                  {/* 3. Spacing Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('spacing')}>
                      <h4>Spacing</h4>
                      <i className={`fa-solid ${expandedAccordions['spacing'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['spacing'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        {[
                          { label: 'Line Height', val: lineHeight, min: 1.0, max: 2.0, step: 0.1, setter: setLineHeight, unit: '' },
                          { label: 'Left & Right Margin', val: lrMargin, min: 5, max: 40, step: 1, setter: setLrMargin, unit: 'mm' },
                          { label: 'Top & Bottom Margin', val: tbMargin, min: 5, max: 40, step: 1, setter: setTbMargin, unit: 'mm' },
                          { label: 'Space between Entries', val: entrySpacing, min: 0, max: 5, step: 1, setter: setEntrySpacing, unit: '' }
                        ].map((s, idx) => (
                          <div key={idx} style={{ marginBottom: '1.2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>
                              <span>{s.label}</span>
                              <span style={{ color: '#fff', fontWeight: '700' }}>{s.val}{s.unit}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={(e) => s.setter(parseFloat(e.target.value))} style={{ flexGrow: 1, accentColor: accentColor }} />
                              <button className="style-option" style={{ padding: '2px 8px' }} onClick={() => stepValue(s.val, -s.step, s.min, s.max, s.setter)}>-</button>
                              <button className="style-option" style={{ padding: '2px 8px' }} onClick={() => stepValue(s.val, s.step, s.min, s.max, s.setter)}>+</button>
                            </div>
                          </div>
                        ))}
                      {undoRedoPill}
                      </div>
                    )}
                  </div>

                  {/* 4. Entry Layout Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('entryLayout')}>
                      <h4>Entry Layout</h4>
                      <i className={`fa-solid ${expandedAccordions['entryLayout'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['entryLayout'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {[1, 2, 3, 4].map(num => {
                              const isActive = entryLayout === num;
                              const color = isActive ? 'var(--accent, #EEC30C)' : '#888';
                              return (
                                <button
                                  key={num}
                                  className={`style-option ${isActive ? 'active' : ''}`}
                                  onClick={() => setEntryLayout(num)}
                                  style={{ padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px' }}
                                >
                                  <svg width="100%" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {num === 1 && (
                                      <>
                                        <rect x="25" y="14" width="30" height="4" rx="2" fill={color}/>
                                        <rect x="25" y="24" width="15" height="4" rx="2" fill={color}/>
                                        
                                        <rect x="65" y="13" width="6" height="6" rx="1" stroke={color} strokeWidth="1.2"/>
                                        <path d="M65 15h6" stroke={color} strokeWidth="1.2"/>
                                        <rect x="75" y="15" width="10" height="2" rx="1" fill={color}/>
                                        
                                        <path d="M68 23c-1.5 0-3 1.2-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.8-1.5-3-3-3z" stroke={color} strokeWidth="1.2"/>
                                        <circle cx="68" cy="26" r="1" fill={color}/>
                                        <rect x="75" y="26" width="10" height="2" rx="1" fill={color}/>
                                      </>
                                    )}
                                    {num === 2 && (
                                      <>
                                        <rect x="25" y="13" width="6" height="6" rx="1" stroke={color} strokeWidth="1.2"/>
                                        <path d="M25 15h6" stroke={color} strokeWidth="1.2"/>
                                        <rect x="35" y="15" width="10" height="2" rx="1" fill={color}/>
                                        
                                        <path d="M28 23c-1.5 0-3 1.2-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.8-1.5-3-3-3z" stroke={color} strokeWidth="1.2"/>
                                        <circle cx="28" cy="26" r="1" fill={color}/>
                                        <rect x="35" y="26" width="10" height="2" rx="1" fill={color}/>

                                        <rect x="55" y="14" width="30" height="4" rx="2" fill={color}/>
                                        <rect x="55" y="24" width="15" height="4" rx="2" fill={color}/>
                                      </>
                                    )}
                                    {num === 3 && (
                                      <>
                                        <rect x="25" y="10" width="6" height="6" rx="1" stroke={color} strokeWidth="1.2"/>
                                        <path d="M25 12h6" stroke={color} strokeWidth="1.2"/>
                                        <rect x="35" y="12" width="10" height="2" rx="1" fill={color}/>
                                        
                                        <path d="M60 10c-1.5 0-3 1.2-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.8-1.5-3-3-3z" stroke={color} strokeWidth="1.2"/>
                                        <circle cx="60" cy="13" r="1" fill={color}/>
                                        <rect x="67" y="12" width="10" height="2" rx="1" fill={color}/>

                                        <rect x="25" y="24" width="30" height="4" rx="2" fill={color}/>
                                        <rect x="25" y="34" width="15" height="4" rx="2" fill={color}/>
                                      </>
                                    )}
                                    {num === 4 && (
                                      <>
                                        <rect x="25" y="10" width="70" height="4" rx="2" fill={color}/>
                                        <rect x="25" y="20" width="45" height="3" rx="1.5" fill={color}/>
                                        <rect x="25" y="28" width="60" height="3" rx="1.5" fill={color}/>
                                        <rect x="25" y="36" width="35" height="3" rx="1.5" fill={color}/>
                                      </>
                                    )}
                                  </svg>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {entryLayout !== 4 && (
                          <div style={{ marginBottom: '1.2rem' }}>
                            <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Column Width</div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                              <button className={`style-option ${entryColWidth === 'auto' ? 'active' : ''}`} onClick={() => setEntryColWidth('auto')} style={{ flex: 1, padding: '6px 0', borderRadius: '20px' }}>Auto</button>
                              <button className={`style-option ${entryColWidth === 'manual' ? 'active' : ''}`} onClick={() => setEntryColWidth('manual')} style={{ flex: 1, padding: '6px 0', borderRadius: '20px' }}>Manual</button>
                            </div>
                            {entryColWidth === 'manual' && (
                              <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ flex: 1 }}>
                                  <span style={{ fontSize: '0.75rem', color: '#888' }}>Left ({manualLeftPercent}%)</span>
                                  <button className="style-option" style={{ width: '100%', padding: '6px 0', fontSize: '1rem', fontWeight: 'bold' }} onClick={() => { const left = Math.min(80, manualLeftPercent + 5); setManualLeftPercent(left); setManualRightPercent(100 - left); }}>+</button>
                                </div>
                                <div style={{ flex: 1 }}>
                                  <span style={{ fontSize: '0.75rem', color: '#888' }}>Right ({manualRightPercent}%)</span>
                                  <button className="style-option" style={{ width: '100%', padding: '6px 0', fontSize: '1rem', fontWeight: 'bold' }} onClick={() => { const right = Math.min(80, manualRightPercent + 5); setManualRightPercent(right); setManualLeftPercent(100 - right); }}>+</button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Title & subtitle size</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {['s', 'm', 'l'].map(sz => (
                              <button key={sz} className={`style-option ${titleSize === sz ? 'active' : ''}`} onClick={() => setTitleSize(sz)} style={{ flex: 1, padding: '6px 0', textTransform: 'uppercase', fontWeight: 'bold' }}>{sz}</button>
                            ))}
                          </div>
                        </div>

                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Subtitle Style</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {['normal', 'bold', 'italic'].map(st => (
                              <button key={st} className={`style-option ${subtitleStyle === st ? 'active' : ''}`} onClick={() => setSubtitleStyle(st)} style={{ flex: 1, padding: '6px 0', textTransform: 'capitalize' }}>{st}</button>
                            ))}
                          </div>
                        </div>

                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Subtitle Placement</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className={`style-option ${subtitlePlacement === 'same' ? 'active' : ''}`} onClick={() => setSubtitlePlacement('same')} style={{ flex: 1, padding: '6px 0', fontSize: '0.78rem' }}>Try Same Line</button>
                            <button className={`style-option ${subtitlePlacement === 'next' ? 'active' : ''}`} onClick={() => setSubtitlePlacement('next')} style={{ flex: 1, padding: '6px 0', fontSize: '0.78rem' }}>Next Line</button>
                          </div>
                        </div>

                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Description Indentation</div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={descIndent} onChange={(e) => setDescIndent(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: accentColor }} />
                            <span style={{ fontSize: '0.82rem', color: '#ccc' }}>Indent description body</span>
                          </label>
                        </div>

                        <div style={{ marginBottom: '0.5rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>List Bullet Style</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className={`style-option ${listStyle === 'bullet' ? 'active' : ''}`} onClick={() => setListStyle('bullet')} style={{ flex: 1, padding: '6px 0' }}>• Bullet</button>
                            <button className={`style-option ${listStyle === 'hyphen' ? 'active' : ''}`} onClick={() => setListStyle('hyphen')} style={{ flex: 1, padding: '6px 0' }}>– Hyphen</button>
                          </div>
                        </div>
                      {undoRedoPill}
                      </div>
                    )}
                  </div>

                  {/* 5. Footer Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('footer')}>
                      <h4>Footer</h4>
                      <i className={`fa-solid ${expandedAccordions['footer'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['footer'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={footerPageNumbers} onChange={(e) => setFooterPageNumbers(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: accentColor }} />
                            <span style={{ fontSize: '0.82rem', color: '#ccc' }}>Page Numbers</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={footerEmail} onChange={(e) => setFooterEmail(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: accentColor }} />
                            <span style={{ fontSize: '0.82rem', color: '#ccc' }}>Email</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input type="checkbox" checked={footerName} onChange={(e) => setFooterName(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: accentColor }} />
                            <span style={{ fontSize: '0.82rem', color: '#ccc' }}>Name</span>
                          </label>
                        </div>

                        <div style={{ borderTop: '1px solid #222', paddingTop: '10px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '10px' }}>
                            <input type="checkbox" checked={footerCustom} onChange={(e) => setFooterCustom(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: accentColor }} />
                            <span style={{ fontSize: '0.82rem', color: '#ccc', fontWeight: 'bold' }}>Custom Footer Columns</span>
                          </label>
                          
                          {footerCustom && (
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: '600' }}>Insert Placeholders</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                                {[{ label: 'Name {{name}}', value: '{{name}}' }, { label: 'Phone {{phone}}', value: '{{phone}}' }, { label: 'Email {{email}}', value: '{{email}}' }, { label: 'Pagenumbers {{page}} / {{pages}}', value: '{{page}} / {{pages}}' }].map(pl => (
                                  <button key={pl.value} className="style-option" onClick={() => insertPlaceholder(footerFocus, pl.value)} style={{ padding: '4px 8px', fontSize: '0.7rem', borderRadius: '15px' }}>{pl.label}</button>
                                ))}
                              </div>
                              {['left', 'center', 'right'].map(field => (
                                <div key={field}>
                                  <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'capitalize', marginBottom: '4px' }}>{field} Column</div>
                                  <input
                                    type="text"
                                    value={field === 'left' ? footerLeftCol : field === 'center' ? footerCenterCol : footerRightCol}
                                    onFocus={() => setFooterFocus(field)}
                                    onChange={(e) => {
                                      if (field === 'left') setFooterLeftCol(e.target.value);
                                      else if (field === 'center') setFooterCenterCol(e.target.value);
                                      else setFooterRightCol(e.target.value);
                                    }}
                                    placeholder={"e.g. {{" + (field === 'left' ? 'name' : field === 'center' ? 'phone' : 'page') + "}}"}
                                    style={{ width: '100%', padding: '6px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      {undoRedoPill}
                      </div>
                    )}
                  </div>

                  {/* 6. Font Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('font')}>
                      <h4>Font</h4>
                      <i className={`fa-solid ${expandedAccordions['font'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['font'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                          {['serif', 'sans', 'mono'].map(cat => (
                            <button
                              key={cat}
                              className={`style-option ${activeFontCat === cat ? 'active' : ''}`}
                              onClick={() => setActiveFontCat(cat)}
                              style={{ flex: 1, padding: '10px 0', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {(activeFontCat === 'serif'
                            ? ['Lora', 'PT Serif', 'Latin Modern', 'Cormorant Garamond', 'Crimson Text', 'Source Serif Pro', 'Literata', 'Aleo', 'Vollkorn', 'Alegreya', 'Zilla Slab', 'EB Garamond', 'Crimson Pro', 'Amiri']
                            : activeFontCat === 'sans'
                            ? ['Satoshi', 'Inter', 'Lato', 'Barlow', 'Roboto', 'Nunito', 'Karla', 'Titillium Web', 'Jost', 'Rubik', 'Open Sans', 'Mulish', 'Work Sans', 'Fira Sans', 'Asap', 'IBM Plex Sans']
                            : ['Inconsolata', 'Overpass Mono', 'Source Code Pro', 'Space Mono', 'IBM Plex Mono', 'Courier Prime']
                          ).map(font => (
                            <button
                              key={font}
                              className={`style-option ${fontFamily === font ? 'active' : ''}`}
                              onClick={() => setFontFamily(font)}
                              onMouseEnter={() => setHoveredFont(font)}
                              onMouseLeave={() => setHoveredFont(null)}
                              style={{ fontFamily: `'${font}'`, padding: '6px 12px', fontSize: '0.8rem', flex: '1 0 30%', textSelf: 'center', textAlign: 'center', borderRadius: '20px' }}
                            >
                              {font}
                            </button>
                          ))}
                        </div>
                      {undoRedoPill}
                      </div>
                    )}
                  </div>

                  {/* 7. Colors Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('colors')}>
                      <h4>Colors</h4>
                      <i className={`fa-solid ${expandedAccordions['colors'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['colors'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        {/* Mode Swapper */}
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1.2rem' }}>
                          {['basic', 'advanced', 'border'].map(m => (
                            <div key={m} onClick={() => setColorMode(m)} style={{ textSelf: 'center', textAlign: 'center', cursor: 'pointer' }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: colorMode === m ? `3px solid ${accentColor}` : '2px solid #444', background: m === 'border' ? 'transparent' : m === 'advanced' ? 'linear-gradient(to bottom, #ccc 50%, #444 50%)' : accentColor, margin: '0 auto 0.4rem' }} />
                              <span style={{ fontSize: '0.75rem', color: colorMode === m ? accentColor : '#888', fontWeight: colorMode === m ? '600' : 'normal', textTransform: 'capitalize' }}>{m}</span>
                            </div>
                          ))}
                        </div>

                        {/* BASIC PANEL */}
                        {colorMode === 'basic' && (
                          <div>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                              {['accent', 'multi', 'image'].map(t => (
                                <button key={t} className={`style-option ${colorSubTab === t ? 'active' : ''}`} onClick={() => setColorSubTab(t)} style={{ flex: 1, padding: '8px 0', textTransform: 'capitalize', fontSize: '0.75rem', fontWeight: 'bold' }}>{t}</button>
                              ))}
                            </div>

                            {colorSubTab === 'accent' && (
                              <div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
                                  {presetColors.map(c => (
                                    <div key={c} onClick={() => setAccentColor(c)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, border: accentColor === c ? '2px solid #fff' : '1px solid #444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      {accentColor === c && <i className="fa-solid fa-check" style={{ color: c === '#ffffff' ? '#000' : '#fff', fontSize: '10px' }} />}
                                    </div>
                                  ))}
                                  <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} style={{ width: '28px', height: '28px', border: 'none', background: 'none', cursor: 'pointer' }} />
                                </div>
                                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.6rem', color: '#ccc' }}>Apply accent color to:</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                  {[
                                    { label: 'Name', val: applyAccentToName, setter: setApplyAccentToName },
                                    { label: 'Dots & Bars', val: applyAccentToDots, setter: setApplyAccentToDots },
                                    { label: 'Job Title', val: applyAccentToJob, setter: setApplyAccentToJob },
                                    { label: 'Dates', val: applyAccentToDates, setter: setApplyAccentToDates },
                                    { label: 'Headings', val: applyAccentToHeadings, setter: setApplyAccentToHeadings },
                                    { label: 'Entry Subtitle', val: applyAccentToSubtitle, setter: setApplyAccentToSubtitle },
                                    { label: 'Headings Line', val: applyAccentToLines, setter: setApplyAccentToLines },
                                    { label: 'Link Icons', val: applyAccentToLinkIcons, setter: setApplyAccentToLinkIcons },
                                    { label: 'Header Icons', val: applyAccentToHeaderIcons, setter: setApplyAccentToHeaderIcons }
                                  ].map((pref, idx) => (
                                    <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.8rem', color: '#ccc' }}>
                                      <input type="checkbox" checked={pref.val} onChange={(e) => pref.setter(e.target.checked)} style={{ accentColor: accentColor }} />
                                      {pref.label}
                                    </label>
                                  ))}
                                </div>
                              </div>
                            )}

                            {colorSubTab === 'multi' && (
                              <div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1rem' }}>
                                  {[
                                    { text: '#cc0000', accent: '#f87171' },
                                    { text: '#1e3a8a', accent: '#60a5fa' },
                                    { text: '#111827', accent: '#10b981' },
                                    { text: '#7c3aed', accent: '#c084fc' }
                                  ].map((p, idx) => (
                                    <div key={idx} onClick={() => { setMultiTextColor(p.text); setMultiAccentColor(p.accent); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #444', cursor: 'pointer', background: '#fff' }}>
                                      <span style={{ fontSize: '1.2rem', fontWeight: '900', color: p.text, borderBottom: `2.5px solid ${p.accent}` }}>T</span>
                                    </div>
                                  ))}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ccc' }}><span>Text Color</span><input type="color" value={multiTextColor} onChange={(e) => setMultiTextColor(e.target.value)} /></label>
                                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ccc' }}><span>Background Color</span><input type="color" value={multiBgColor} onChange={(e) => setMultiBgColor(e.target.value)} /></label>
                                  <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ccc' }}><span>Accent Color</span><input type="color" value={multiAccentColor} onChange={(e) => setMultiAccentColor(e.target.value)} /></label>
                                </div>
                              </div>
                            )}

                            {colorSubTab === 'image' && (
                              <div>
                                <div style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '8px' }}>Header Background Image</div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      const r = new FileReader();
                                      r.onload = (evt) => setHeaderBgImage(evt.target.result);
                                      r.readAsDataURL(file);
                                    }
                                  }}
                                  style={{ display: 'block', fontSize: '0.8rem', color: '#ccc', background: '#0a0a0a', padding: '8px', border: '1px solid #333', borderRadius: '6px', width: '100%' }}
                                />
                                {headerBgImage && (
                                  <button className="style-option" onClick={() => setHeaderBgImage(null)} style={{ marginTop: '8px', padding: '4px 8px', fontSize: '0.75rem', background: '#cc0000', color: '#fff', border: 'none' }}>Remove Image</button>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* ADVANCED PANEL */}
                        {colorMode === 'advanced' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                              {presetColors.map(c => (
                                <div key={c} onClick={() => setAdvBgColor(c)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, border: advBgColor === c ? '2px solid #fff' : '1px solid #444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  {advBgColor === c && <i className="fa-solid fa-check" style={{ color: c === '#ffffff' ? '#000' : '#fff', fontSize: '10px' }} />}
                                </div>
                              ))}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#ccc', fontWeight: 'bold' }}>Custom Advanced Colors:</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
                              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#bbb' }}><span>Header Text</span><input type="color" value={advTextColor} onChange={(e) => setAdvTextColor(e.target.value)} /></label>
                              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#bbb' }}><span>Header Bg</span><input type="color" value={advBgColor} onChange={(e) => setAdvBgColor(e.target.value)} /></label>
                              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#bbb' }}><span>Header Accent</span><input type="color" value={advAccentColor} onChange={(e) => setAdvAccentColor(e.target.value)} /></label>
                              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#bbb' }}><span>Body Text</span><input type="color" value={advBodyTextColor} onChange={(e) => setAdvBodyTextColor(e.target.value)} /></label>
                              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#bbb' }}><span>Body Bg</span><input type="color" value={advBodyBgColor} onChange={(e) => setAdvBodyBgColor(e.target.value)} /></label>
                              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#bbb' }}><span>Body Accent</span><input type="color" value={advBodyAccentColor} onChange={(e) => setAdvBodyAccentColor(e.target.value)} /></label>
                            </div>
                            <div style={{ marginTop: '8px', borderTop: '1px solid #222', paddingTop: '8px' }}>
                              <div style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '4px' }}>Header Bg Image</div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const r = new FileReader();
                                    r.onload = (evt) => setHeaderBgImage(evt.target.result);
                                    r.readAsDataURL(file);
                                  }
                                }}
                                style={{ display: 'block', fontSize: '0.8rem', color: '#ccc', width: '100%' }}
                              />
                            </div>
                          </div>
                        )}

                        {/* BORDER PANEL */}
                        {colorMode === 'border' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                              {presetColors.map(c => (
                                <div key={c} onClick={() => setAccentColor(c)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, border: accentColor === c ? '2px solid #fff' : '1px solid #444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  {accentColor === c && <i className="fa-solid fa-check" style={{ color: c === '#ffffff' ? '#000' : '#fff', fontSize: '10px' }} />}
                                </div>
                              ))}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ccc', marginBottom: '4px' }}>
                              <span>Border Size</span>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {['4px', '8px', '16px'].map(sz => (
                                  <button key={sz} className={`style-option ${borderSize === sz ? 'active' : ''}`} onClick={() => setBorderSize(sz)} style={{ padding: '3px 8px', fontSize: '0.75rem' }}>{sz}</button>
                                ))}
                              </div>
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#ccc', fontWeight: 'bold', marginTop: '4px' }}>Edges to Border:</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.8rem', color: '#ccc' }}><input type="checkbox" checked={borderTop} onChange={(e) => setBorderTop(e.target.checked)} style={{ accentColor: accentColor }} />Top</label>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.8rem', color: '#ccc' }}><input type="checkbox" checked={borderBottom} onChange={(e) => setBorderBottom(e.target.checked)} style={{ accentColor: accentColor }} />Bottom</label>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.8rem', color: '#ccc' }}><input type="checkbox" checked={borderLeft} onChange={(e) => setBorderLeft(e.target.checked)} style={{ accentColor: accentColor }} />Left</label>
                              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '0.8rem', color: '#ccc' }}><input type="checkbox" checked={borderRight} onChange={(e) => setBorderRight(e.target.checked)} style={{ accentColor: accentColor }} />Right</label>
                            </div>
                            <div style={{ borderTop: '1px solid #222', paddingTop: '8px', marginTop: '4px' }}>
                              <div style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '4px' }}>Border Custom Pattern Image</div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const r = new FileReader();
                                    r.onload = (evt) => setBorderBgImage(evt.target.result);
                                    r.readAsDataURL(file);
                                  }
                                }}
                                style={{ display: 'block', fontSize: '0.8rem', color: '#ccc', width: '100%' }}
                              />
                              {borderBgImage && (
                                <button className="style-option" onClick={() => setBorderBgImage(null)} style={{ marginTop: '8px', padding: '4px 8px', fontSize: '0.75rem', background: '#cc0000', color: '#fff', border: 'none' }}>Remove Pattern</button>
                              )}
                            </div>
                          </div>
                        )}
                      {undoRedoPill}
                      </div>
                    )}
                  </div>

                  {/* 8. Section Headings Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('headings')}>
                      <h4>Section Headings</h4>
                      <i className={`fa-solid ${expandedAccordions['headings'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['headings'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '0.8rem', fontWeight: 'bold' }}>Border Style</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '12px' }}>
                          {[
                            { id: 'full-underline', name: 'Underline', icon: <div style={{borderBottom: '2px solid #ccc', width: '80%', height: '4px', margin: '0 auto 4px'}} /> },
                            { id: 'short-double-underline', name: 'Double', icon: <div style={{borderBottom: '3px double #ccc', width: '50%', height: '4px', margin: '0 auto 4px'}} /> },
                            { id: 'top-bottom-lines', name: 'Top-Bottom', icon: <div style={{borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc', width: '80%', height: '4px', margin: '0 auto 4px'}} /> },
                            { id: 'dashed', name: 'Dashed', icon: <div style={{borderBottom: '2px dashed #ccc', width: '80%', height: '4px', margin: '0 auto 4px'}} /> },
                            { id: 'dotted', name: 'Dotted', icon: <div style={{borderBottom: '2px dotted #ccc', width: '80%', height: '4px', margin: '0 auto 4px'}} /> },
                            { id: 'thick-thin', name: 'Thick-Thin', icon: <div style={{borderBottom: '2px solid #ccc', width: '80%', height: '2px', margin: '0 auto 1px'}}><div style={{borderBottom: '1px solid #ccc', width: '100%', marginTop: '3px'}}></div></div> },
                            { id: 'wavy-line', name: 'Wavy', icon: <svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{margin: '0 auto 4px'}}><path d="M0 4 Q 2.5 0, 5 4 T 10 4 T 15 4 T 20 4 T 25 4 T 30 4 T 35 4 T 40 4" stroke="#ccc" strokeWidth="1.5" /></svg> },
                            { id: 'wavy-line-2', name: 'Wavy 2', icon: <svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{margin: '0 auto 4px'}}><path d="M0 4 Q 5 0, 10 4 T 20 4 T 30 4 T 40 4" stroke="#ccc" strokeWidth="1.5" /></svg> },
                            { id: 'zigzag-line', name: 'Zigzag', icon: <svg width="40" height="8" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{margin: '0 auto 4px'}}><polyline points="0,4 5,0 10,8 15,0 20,8 25,0 30,8 35,0 40,4" stroke="#ccc" strokeWidth="1.5" /></svg> },
                            { id: 'box', name: 'Shaded Box', icon: <div style={{border: '1px solid #555', background: '#333', width: '80%', height: '8px', margin: '0 auto 4px'}} /> },
                            { id: 'line-text-line', name: 'Middle Line', icon: <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%', margin: '0 auto 4px'}}><div style={{flex: 1, height: '1px', background: '#ccc'}}></div><div style={{width: '10px', height: '4px', background: '#ccc', margin: '0 4px'}}></div><div style={{flex: 1, height: '1px', background: '#ccc'}}></div></div> },
                            { id: 'flow-icon-heading', name: 'Flow Icon', icon: <div style={{textAlign: 'center', marginBottom: '4px'}}><i className="fa-solid fa-water" style={{fontSize: '10px', color: '#ccc'}}></i></div> },
                            { id: 'flow-short-underline', name: 'Flow Under', icon: <div style={{borderBottom: '2px solid #ccc', width: '30%', height: '4px', margin: '0 auto 4px'}} /> },
                            { id: 'flow-black-underline', name: 'Flow Black', icon: <div style={{borderBottom: '3px solid #555', width: '40%', height: '4px', margin: '0 auto 4px'}} /> }
                          ].map(h => (
                            <button
                              key={h.id}
                              className={`style-option ${headingStyle === h.id ? 'active' : ''}`}
                              onClick={() => setHeadingStyle(h.id)}
                              style={{ padding: '6px 4px', fontSize: '0.75rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                            >
                              {h.icon}
                              {h.name}
                            </button>
                          ))}
                        </div>

                        <div style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '0.8rem', fontWeight: 'bold' }}>Capitalization</div>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                          <button className={`style-option ${headingTransform === 'capitalize' ? 'active' : ''}`} onClick={() => setHeadingTransform('capitalize')} style={{ flex: 1, padding: '6px 0', fontSize: '0.75rem' }}>Capitalize</button>
                          <button className={`style-option ${headingTransform === 'uppercase' ? 'active' : ''}`} onClick={() => setHeadingTransform('uppercase')} style={{ flex: 1, padding: '6px 0', fontSize: '0.75rem' }}>UPPERCASE</button>
                        </div>

                        <div style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '0.8rem', fontWeight: 'bold' }}>Heading Size</div>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                          {[
                            { id: 9, label: 'S' },
                            { id: 12, label: 'M' },
                            { id: 14, label: 'L' },
                            { id: 16, label: 'XL' }
                          ].map(sz => (
                            <button key={sz.id} className={`style-option ${headingSize === sz.id ? 'active' : ''}`} onClick={() => setHeadingSize(sz.id)} style={{ flex: 1, padding: '6px 0', fontWeight: 'bold' }}>{sz.label}</button>
                          ))}
                        </div>

                        <div style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '0.8rem', fontWeight: 'bold' }}>Heading Icons</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {['none', 'outline', 'filled'].map(ic => (
                            <button key={ic} className={`style-option ${headingIcons === ic ? 'active' : ''}`} onClick={() => setHeadingIcons(ic)} style={{ flex: 1, padding: '6px 0', textTransform: 'capitalize', fontSize: '0.75rem' }}>{ic}</button>
                          ))}
                        </div>
                        {undoRedoPill}
                      </div>
                    )}
                  </div>

                  {/* 9. Link styling Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('linkStyling')}>
                      <h4>Link styling</h4>
                      <i className={`fa-solid ${expandedAccordions['linkStyling'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['linkStyling'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 12px', marginBottom: '15px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <input type="checkbox" checked={linkUnderline} onChange={(e) => {
                                const checked = e.target.checked;
                                setLinkUnderline(checked);
                                if (!checked) {
                                  setAdvLinkSettings(prev => ({ ...prev, underline: { email: false, phone: false, location: false } }));
                                }
                            }} style={{ accentColor: accentColor }} />
                            <span>under line</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <input type="checkbox" checked={linkBlueColor} onChange={(e) => {
                                const checked = e.target.checked;
                                setLinkBlueColor(checked);
                                if (!checked) {
                                  setAdvLinkSettings(prev => ({ ...prev, blueColor: { email: false, phone: false, location: false } }));
                                }
                            }} style={{ accentColor: accentColor }} />
                            <span>Bluecolor</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <input type="checkbox" checked={linkIcon} onChange={(e) => {
                                const checked = e.target.checked;
                                setLinkIcon(checked);
                                if (!checked) {
                                  setAdvLinkSettings(prev => ({ ...prev, icon: { email: false, phone: false, location: false } }));
                                }
                            }} style={{ accentColor: accentColor }} />
                            <span>Link icon</span>
                          </label>
                        </div>

                        {/* Advance Settings */}
                        <div className="customize-group">
                          <div className="customize-trigger" onClick={() => toggleAccordion('linkStylingAdv')} style={{ padding: '8px 0', borderTop: '1px solid #333' }}>
                            <h4 style={{ fontSize: '0.85rem', color: '#ccc' }}>Advance Settings</h4>
                            <i className={`fa-solid ${expandedAccordions['linkStylingAdv'] ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '0.8rem' }}></i>
                          </div>
                          {expandedAccordions['linkStylingAdv'] && (
                            <div style={{ background: '#222', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                              
                              {/* Column 1: Underline */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#ccc' }}>
                                  <input type="checkbox" checked={advLinkSettings.underline.email && advLinkSettings.underline.phone && advLinkSettings.underline.location} onChange={(e) => {
                                      setAdvLinkSettings(prev => ({ ...prev, underline: { email: e.target.checked, phone: e.target.checked, location: e.target.checked } }));
                                  }} style={{ accentColor: accentColor }} />
                                  All options
                                </label>
                                {['email', 'phone', 'location'].map(field => (
                                  <label key={field} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                                    <input type="checkbox" checked={advLinkSettings.underline[field]} onChange={(e) => {
                                      const checked = e.target.checked;
                                      setAdvLinkSettings(prev => {
                                        const newU = { ...prev.underline, [field]: checked };
                                        return { ...prev, underline: newU };
                                      });
                                    }} style={{ accentColor: accentColor }} />
                                    <span style={{textTransform: 'capitalize'}}>{field}</span>
                                  </label>
                                ))}
                              </div>

                              {/* Column 2: Bluecolor */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#ccc' }}>
                                  <input type="checkbox" checked={advLinkSettings.blueColor.email && advLinkSettings.blueColor.phone && advLinkSettings.blueColor.location} onChange={(e) => {
                                      setAdvLinkSettings(prev => ({ ...prev, blueColor: { email: e.target.checked, phone: e.target.checked, location: e.target.checked } }));
                                  }} style={{ accentColor: accentColor }} />
                                  All options
                                </label>
                                {['email', 'phone', 'location'].map(field => (
                                  <label key={field} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                                    <input type="checkbox" checked={advLinkSettings.blueColor[field]} onChange={(e) => {
                                      const checked = e.target.checked;
                                      setAdvLinkSettings(prev => {
                                        const newC = { ...prev.blueColor, [field]: checked };
                                        return { ...prev, blueColor: newC };
                                      });
                                    }} style={{ accentColor: accentColor }} />
                                    <span style={{textTransform: 'capitalize'}}>{field}</span>
                                  </label>
                                ))}
                              </div>

                              {/* Column 3: Link icon */}
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#ccc' }}>
                                  <input type="checkbox" checked={advLinkSettings.icon.email && advLinkSettings.icon.phone && advLinkSettings.icon.location} onChange={(e) => {
                                      setAdvLinkSettings(prev => ({ ...prev, icon: { email: e.target.checked, phone: e.target.checked, location: e.target.checked } }));
                                  }} style={{ accentColor: accentColor }} />
                                  All options
                                </label>
                                {['email', 'phone', 'location'].map(field => (
                                  <label key={field} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                                    <input type="checkbox" checked={advLinkSettings.icon[field]} onChange={(e) => {
                                      const checked = e.target.checked;
                                      setAdvLinkSettings(prev => {
                                        const newI = { ...prev.icon, [field]: checked };
                                        return { ...prev, icon: newI };
                                      });
                                    }} style={{ accentColor: accentColor }} />
                                    <span style={{textTransform: 'capitalize'}}>{field}</span>
                                  </label>
                                ))}
                              </div>

                            </div>
                          )}
                        </div>
                        {undoRedoPill}
                      </div>
                    )}
                  </div>

                  {/* 10. Header layout Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('headerLayout')}>
                      <h4>Header layout</h4>
                      <i className={`fa-solid ${expandedAccordions['headerLayout'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['headerLayout'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Text Alignment</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className={`style-option ${headerAlignment === 'left' ? 'active' : ''}`} onClick={() => setHeaderAlignment('left')} style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '6px' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-start' }}>
                                <div style={{ width: '20px', height: '3px', background: headerAlignment === 'left' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                <div style={{ width: '12px', height: '3px', background: headerAlignment === 'left' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                              </div>
                              <span style={{ fontSize: '0.75rem' }}>Left</span>
                            </button>
                            <button className={`style-option ${headerAlignment === 'center' ? 'active' : ''}`} onClick={() => setHeaderAlignment('center')} style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '6px' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
                                <div style={{ width: '20px', height: '3px', background: headerAlignment === 'center' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                <div style={{ width: '12px', height: '3px', background: headerAlignment === 'center' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                              </div>
                              <span style={{ fontSize: '0.75rem' }}>Center</span>
                            </button>
                          </div>
                        </div>

                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Details Arrangement</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className={`style-option ${headerArrangement === 'stacked' ? 'active' : ''}`} onClick={() => setHeaderArrangement('stacked')} style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '6px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                  <div style={{ width: '20px', height: '3px', background: headerArrangement === 'stacked' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                  <div style={{ width: '20px', height: '3px', background: headerArrangement === 'stacked' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                  <div style={{ width: '20px', height: '3px', background: headerArrangement === 'stacked' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                </div>
                                <span style={{ fontSize: '0.75rem' }}>Stacked</span>
                            </button>
                            <button className={`style-option ${headerArrangement === 'horizontal' ? 'active' : ''}`} onClick={() => setHeaderArrangement('horizontal')} style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '6px' }}>
                                <div style={{ display: 'flex', gap: '3px', padding: '3px 0' }}>
                                  <div style={{ width: '8px', height: '3px', background: headerArrangement === 'horizontal' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                  <div style={{ width: '8px', height: '3px', background: headerArrangement === 'horizontal' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                  <div style={{ width: '8px', height: '3px', background: headerArrangement === 'horizontal' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                </div>
                                <span style={{ fontSize: '0.75rem' }}>Horizontal</span>
                            </button>
                            <button className={`style-option ${headerArrangement === 'columns' ? 'active' : ''}`} onClick={() => setHeaderArrangement('columns')} style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '6px' }}>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
                                    <div style={{ width: '5px', height: '3px', background: headerArrangement === 'columns' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                    <div style={{ width: '10px', height: '3px', background: headerArrangement === 'columns' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                  </div>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
                                    <div style={{ width: '5px', height: '3px', background: headerArrangement === 'columns' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                    <div style={{ width: '10px', height: '3px', background: headerArrangement === 'columns' ? '#EEC30C' : '#888', borderRadius: '2px' }}></div>
                                  </div>
                                </div>
                                <span style={{ fontSize: '0.75rem' }}>Columns</span>
                            </button>
                          </div>
                        </div>

                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Header Contact Icons</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {['icon', 'bullet', 'bar'].map(icType => (
                              <button key={icType} className={`style-option ${headerIconType === icType ? 'active' : ''}`} onClick={() => setHeaderIconType(icType)} style={{ flex: 1, padding: '6px 0', textTransform: 'capitalize', fontSize: '0.75rem' }}>{icType}</button>
                            ))}
                          </div>
                        </div>

                        {headerIconType === 'icon' && (
                          <div style={{ marginBottom: '0.5rem' }}>
                            <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Icon Style</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                              {[
                                { key: 'squircle-filled', name: 'Squircle Filled', style: { borderRadius: '8px', background: '#333', color: '#ccc' } },
                                { key: 'circle-filled', name: 'Circle Filled', style: { borderRadius: '50%', background: '#333', color: '#ccc' } },
                                { key: 'square-filled', name: 'Square Filled', style: { borderRadius: '0', background: '#333', color: '#ccc' } },
                                { key: 'squircle', name: 'Squircle', style: { borderRadius: '8px', border: '1px solid #444', background: 'transparent', color: '#ccc' } },
                                { key: 'circle', name: 'Circle', style: { borderRadius: '50%', border: '1px solid #444', background: 'transparent', color: '#ccc' } },
                                { key: 'square-outline', name: 'Square Outline', style: { borderRadius: '0', border: '1px solid #444', background: 'transparent', color: '#ccc' } }
                              ].map(iconOpt => {
                                const isActive = headerIconStyle === iconOpt.key;
                                return (
                                  <button
                                    key={iconOpt.key}
                                    className={`style-option ${isActive ? 'active' : ''}`}
                                    onClick={() => setHeaderIconStyle(iconOpt.key)}
                                    style={{ padding: '8px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', borderRadius: '6px' }}
                                  >
                                    <div style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', ...iconOpt.style }}>
                                      <i className="fa-solid fa-link" style={{ fontSize: '10px', color: iconOpt.style.color }}></i>
                                    </div>
                                    <span style={{ fontSize: '0.7rem', textAlign: 'center', lineHeight: '1.2' }}>{iconOpt.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Advance Settings */}
                        <div style={{ marginTop: '1.2rem' }}>
                          <div onClick={() => toggleAccordion('headerLayoutAdv')} style={{ fontSize: '0.85rem', color: '#888', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '0.5rem' }}>
                            Advance Settings <i className={`fa-solid ${expandedAccordions['headerLayoutAdv'] ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '0.7rem' }}></i>
                          </div>
                          {expandedAccordions['headerLayoutAdv'] && (
                            <div style={{ background: '#1a1a1a', padding: '12px', borderRadius: '8px', border: '1px solid #333' }}>
                              {!resumeData.role ? (
                                <div style={{ fontSize: '0.85rem', color: '#ccc', textAlign: 'center' }}>
                                  To see design options, go to your personal details & enter a professional title ✍️
                                </div>
                              ) : (
                                <>
                                  <div style={{ marginBottom: '1.2rem' }}>
                                    <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Professional Title Position</div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                      <button className={`style-option ${rolePosition === 'beside' ? 'active' : ''}`} onClick={() => setRolePosition('beside')} style={{ flex: 1, padding: '8px 0', fontSize: '0.8rem', borderRadius: '6px' }}>Try Same Line</button>
                                      <button className={`style-option ${rolePosition === 'below' ? 'active' : ''}`} onClick={() => setRolePosition('below')} style={{ flex: 1, padding: '8px 0', fontSize: '0.8rem', borderRadius: '6px' }}>Below</button>
                                    </div>
                                  </div>
                                  <div style={{ marginBottom: '0.5rem' }}>
                                    <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Professional Title Style</div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                      <button className={`style-option ${roleStyle === 'normal' ? 'active' : ''}`} onClick={() => setRoleStyle('normal')} style={{ flex: 1, padding: '8px 0', fontSize: '0.8rem', borderRadius: '6px' }}>Normal</button>
                                      <button className={`style-option ${roleStyle === 'italic' ? 'active' : ''}`} onClick={() => setRoleStyle('italic')} style={{ flex: 1, padding: '8px 0', fontSize: '0.8rem', borderRadius: '6px' }}>Italic</button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 11. Name Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('name')}>
                      <h4>Name</h4>
                      <i className={`fa-solid ${expandedAccordions['name'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['name'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Size</div>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {['xs', 's', 'm', 'l', 'xl'].map(sz => (
                              <button key={sz} className={`style-option ${nameSize === sz ? 'active' : ''}`} onClick={() => setNameSize(sz)} style={{ flex: 1, padding: '6px 0', textTransform: 'uppercase', fontWeight: 'bold' }}>{sz}</button>
                            ))}
                          </div>
                        </div>

                        <div style={{ marginBottom: '1.2rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <input type="checkbox" checked={nameBold} onChange={(e) => setNameBold(e.target.checked)} style={{ accentColor: accentColor }} />
                            <span>Make name bold</span>
                          </label>
                        </div>

                        <div style={{ marginBottom: '0.5rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Font</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className={`style-option ${nameFont === 'body' ? 'active' : ''}`} onClick={() => setNameFont('body')} style={{ flex: 1, padding: '6px 0' }}>Body Font</button>
                            <button className={`style-option ${nameFont === 'creative' ? 'active' : ''}`} onClick={() => setNameFont('creative')} style={{ flex: 1, padding: '6px 0' }}>Creative Font</button>
                          </div>
                          {nameFont === 'creative' && (
                            <div style={{ marginBottom: '0.5rem' }}>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '0.5rem' }}>
                                {[
                                  'Abril Fatface', 'Amatic SC', 'Bungee Shade', 'Caveat', 'Caveat Brush', 
                                  'Comfortaa', 'Elsie', 'Lobster', 'Pacifico', 'Parisienne', 'Vibu'
                                ].map(font => (
                                  <div 
                                    key={font}
                                    className={`style-option ${nameCreativeFont === font ? 'active' : ''}`} 
                                    onClick={() => setNameCreativeFont(font)}
                                    style={{ 
                                      fontFamily: `'${font}', cursive`, 
                                      padding: '4px 8px', 
                                      fontSize: '0.8rem', 
                                      borderRadius: '15px', 
                                      cursor: 'pointer',
                                      border: nameCreativeFont === font ? '1px solid #EEC30C' : '1px solid transparent'
                                    }}
                                  >
                                    {font}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 12. Professional title Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('title')}>
                      <h4>Professional title</h4>
                      <i className={`fa-solid ${expandedAccordions['title'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['title'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Size</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {['s', 'm', 'l'].map(sz => (
                              <button key={sz} className={`style-option ${roleSize === sz ? 'active' : ''}`} onClick={() => setRoleSize(sz)} style={{ flex: 1, padding: '6px 0', textTransform: 'uppercase', fontWeight: 'bold' }}>{sz}</button>
                            ))}
                          </div>
                        </div>

                        <div style={{ marginBottom: '1.2rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Position</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className={`style-option ${rolePosition === 'beside' ? 'active' : ''}`} onClick={() => setRolePosition('beside')} style={{ flex: 1, padding: '6px 0', fontSize: '0.8rem' }}>Try Same Line</button>
                            <button className={`style-option ${rolePosition === 'below' ? 'active' : ''}`} onClick={() => setRolePosition('below')} style={{ flex: 1, padding: '6px 0', fontSize: '0.8rem' }}>Below Name</button>
                          </div>
                        </div>

                        <div style={{ marginBottom: '0.5rem' }}>
                          <div style={{ fontSize: '0.82rem', color: '#888', fontWeight: '600', marginBottom: '0.6rem' }}>Style</div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className={`style-option ${roleStyle === 'normal' ? 'active' : ''}`} onClick={() => setRoleStyle('normal')} style={{ flex: 1, padding: '6px 0' }}>Normal</button>
                            <button className={`style-option ${roleStyle === 'italic' ? 'active' : ''}`} onClick={() => setRoleStyle('italic')} style={{ flex: 1, padding: '6px 0' }}>Italic</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 13. Photo Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('photo')}>
                      <h4>Photo</h4>
                      <i className={`fa-solid ${expandedAccordions['photo'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['photo'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        {resumeData.photo ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button className="btn btn-primary" onClick={() => setShowPhotoModal(true)} style={{ padding: '8px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><i className="fa-solid fa-crop-simple" /> Crop &amp; Adjust Photo</button>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ccc', alignItems: 'center', marginTop: '6px' }}>
                              <span>Zoom Level</span>
                              <input type="range" min="0.5" max="3" step="0.1" value={photoZoom} onChange={(e) => setPhotoZoom(parseFloat(e.target.value))} style={{ width: '60%', accentColor: accentColor }} />
                            </div>

                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#ccc', marginTop: '4px' }}>
                              <input type="checkbox" checked={photoGrayscale} onChange={(e) => setPhotoGrayscale(e.target.checked)} style={{ accentColor: accentColor }} />
                              <span>Grayscale / Black &amp; White</span>
                            </label>

                            <div style={{ marginTop: '8px' }}>
                              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Shape</div>
                              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {['circle', 'square', 'rounded', 'portrait', 'portrait-rounded'].map(sh => (
                                  <button key={sh} className={`style-option ${photoShape === sh ? 'active' : ''}`} onClick={() => setPhotoShape(sh)} style={{ flex: '1 1 auto', padding: '5px 8px', textTransform: 'capitalize', fontSize: '0.75rem' }}>{sh}</button>
                                ))}
                              </div>
                            </div>

                            <div style={{ marginTop: '8px' }}>
                              <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '4px' }}>Size</div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                {['small', 'medium', 'large'].map(sz => (
                                  <button key={sz} className={`style-option ${photoSize === sz ? 'active' : ''}`} onClick={() => setPhotoSize(sz)} style={{ flex: 1, padding: '5px 0', textTransform: 'capitalize', fontSize: '0.75rem' }}>{sz}</button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p style={{ fontSize: '0.8rem', color: '#888', margin: '0' }}>Photo design options will appear here once you add a photo in the content panel 📸</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 14. Interests Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('interests')}>
                      <h4>Interests</h4>
                      <i className={`fa-solid ${expandedAccordions['interests'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['interests'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ marginBottom: '1rem' }}>
                          <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>Layout Type</div>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {['grid', 'rows', 'compact', 'bubble'].map(lay => (
                              <button key={lay} className={`style-option ${interestsLayout === lay ? 'active' : ''}`} onClick={() => setInterestsLayout(lay)} style={{ flex: 1, padding: '5px 0', textTransform: 'capitalize', fontSize: '0.75rem' }}>{lay}</button>
                            ))}
                          </div>
                        </div>

                        {interestsLayout === 'grid' && (
                          <div>
                            <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>Columns</div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {[1, 2, 3, 4].map(cNum => (
                                <button key={cNum} className={`style-option ${interestsCols === cNum ? 'active' : ''}`} onClick={() => setInterestsCols(cNum)} style={{ flex: 1, padding: '5px 0', fontWeight: 'bold' }}>{cNum}</button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 15. Summary Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('summary')}>
                      <h4>Summary</h4>
                      <i className={`fa-solid ${expandedAccordions['summary'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['summary'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <input type="checkbox" checked={summaryInHeader} onChange={(e) => setSummaryInHeader(e.target.checked)} style={{ accentColor: accentColor }} />
                            <span>Display summary as part of header banner</span>
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <input type="checkbox" checked={showSummaryHeading} onChange={(e) => setShowSummaryHeading(e.target.checked)} style={{ accentColor: accentColor }} />
                            <span>Show Professional Summary title heading</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 16. Work Experience Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('experience')}>
                      <h4>Work Experience</h4>
                      <i className={`fa-solid ${expandedAccordions['experience'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['experience'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>Order title/subtitle</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className={`style-option ${workExpOrder === 'title-first' ? 'active' : ''}`} onClick={() => setWorkExpOrder('title-first')} style={{ flex: 1, padding: '8px 0', fontSize: '0.8rem' }}>Title First</button>
                          <button className={`style-option ${workExpOrder === 'subtitle-first' ? 'active' : ''}`} onClick={() => setWorkExpOrder('subtitle-first')} style={{ flex: 1, padding: '8px 0', fontSize: '0.8rem' }}>Subtitle First</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 17. Personal details Accordion */}
                  <div className="customize-group">
                    <div className="customize-trigger" onClick={() => toggleAccordion('personalDetails')}>
                      <h4>Personal details</h4>
                      <i className={`fa-solid ${expandedAccordions['personalDetails'] ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                    </div>
                    {expandedAccordions['personalDetails'] && (
                      <div className="customize-content" style={{ display: 'block' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#ccc', cursor: 'pointer' }}>
                            <span>Show Email in header</span>
                            <input type="checkbox" checked={showEmail} onChange={(e) => setShowEmail(e.target.checked)} style={{ accentColor: accentColor }} />
                          </label>
                          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#ccc', cursor: 'pointer' }}>
                            <span>Show Phone in header</span>
                            <input type="checkbox" checked={showPhone} onChange={(e) => setShowPhone(e.target.checked)} style={{ accentColor: accentColor }} />
                          </label>
                          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#ccc', cursor: 'pointer' }}>
                            <span>Show Address in header</span>
                            <input type="checkbox" checked={showAddress} onChange={(e) => setShowAddress(e.target.checked)} style={{ accentColor: accentColor }} />
                          </label>
                          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#ccc', cursor: 'pointer' }}>
                            <span>Show Profile Photo in header</span>
                            <input type="checkbox" checked={showPhoto} onChange={(e) => setShowPhoto(e.target.checked)} style={{ accentColor: accentColor }} />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {activeTab === 'ai' && (
                <div className="tab-content show" id="tab-ai">
                  <div className="ai-tool-card">
                    <div className="ai-badge">AI Assistant</div>
                    <h4>Optimize Summary</h4>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>Improve your summary paragraph using ATS optimized keywords.</p>
                    <button className="btn-ai-action" onClick={handleOptimizeSummaryAI}>Auto-optimize Summary</button>
                  </div>
                </div>
              )}

              {activeTab === 'rearrange' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="customize-section-card" style={{ background: '#161616', border: '1px solid #222', borderRadius: '12px', padding: '1.25rem' }}>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                      <i className="fa-solid fa-table-columns"></i> Page Columns Grid
                    </h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[
                        { id: 'one', name: 'Single Column' },
                        { id: 'two', name: 'Two Columns' },
                        { id: 'mix', name: 'Mixed Sections' }
                      ].map(col => (
                        <button
                          key={col.id}
                          className={`tab-btn ${layoutConfig.columns === col.id ? 'active' : ''}`}
                          onClick={() => {
                            if (mockupImage) setMockupImage(null);
                            setLayoutConfig(prev => ({ ...prev, columns: col.id }));
                          }}
                          style={{
                            background: layoutConfig.columns === col.id ? 'var(--accent, #EEC30C)' : 'transparent',
                            color: layoutConfig.columns === col.id ? '#000' : '#888',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          {col.name}
                        </button>
                      ))}
                    </div>

                    {layoutConfig.columns !== 'one' && (
                      <div style={{ marginTop: '1.25rem', borderTop: '1px solid #222', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>
                          <span>Left Width: {layoutConfig.leftWidth}%</span>
                          <span>Right Width: {layoutConfig.rightWidth}%</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              if (mockupImage) setMockupImage(null);
                              setLayoutConfig(prev => {
                                const left = Math.max(20, prev.leftWidth - 5);
                                return { ...prev, leftWidth: left, rightWidth: 100 - left };
                              });
                            }}
                          >
                            - Left
                          </button>
                          <input
                            type="range"
                            min="20"
                            max="80"
                            value={layoutConfig.leftWidth}
                            onChange={(e) => {
                              if (mockupImage) setMockupImage(null);
                              const left = parseInt(e.target.value);
                              setLayoutConfig(prev => ({ ...prev, leftWidth: left, rightWidth: 100 - left }));
                            }}
                            style={{ flexGrow: 1, accentColor: 'var(--accent, #EEC30C)' }}
                          />
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                              if (mockupImage) setMockupImage(null);
                              setLayoutConfig(prev => {
                                const left = Math.min(80, prev.leftWidth + 5);
                                return { ...prev, leftWidth: left, rightWidth: 100 - left };
                              });
                            }}
                          >
                            + Left
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="customize-section-card" style={{ background: '#161616', border: '1px solid #222', borderRadius: '12px', padding: '1.25rem' }}>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                      <i className="fa-solid fa-arrows-up-down"></i> Sort Sections
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {resumeData.sections.map((sec, idx) => (
                        <div key={sec.id} style={{ background: '#0a0a0a', padding: '10px 14px', borderRadius: '8px', border: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.85rem' }}>{sec.title}</span>
                            {layoutConfig.columns !== 'one' && (
                              <span style={{ fontSize: '0.7rem', color: 'var(--accent, #EEC30C)', marginLeft: '10px', textTransform: 'uppercase' }}>
                                Column: {sec.column || 'left'}
                              </span>
                            )}
                          </div>

                          <div style={{ display: 'flex', gap: '6px' }}>
                            {layoutConfig.columns !== 'one' && (
                              <>
                                <button
                                  className="history-btn small"
                                  onClick={() => handleMoveSectionColumn(idx, 'left')}
                                  disabled={sec.column === 'left'}
                                  title="Move to Left Column"
                                >
                                  L
                                </button>
                                <button
                                  className="history-btn small"
                                  onClick={() => handleMoveSectionColumn(idx, 'right')}
                                  disabled={sec.column === 'right'}
                                  title="Move to Right Column"
                                >
                                  R
                                </button>
                              </>
                            )}

                            <button
                              className="history-btn small"
                              onClick={() => handleMoveSection(idx, -1)}
                              disabled={idx === 0}
                              title="Move Up"
                            >
                              <i className="fa-solid fa-arrow-up"></i>
                            </button>
                            <button
                              className="history-btn small"
                              onClick={() => handleMoveSection(idx, 1)}
                              disabled={idx === resumeData.sections.length - 1}
                              title="Move Down"
                            >
                              <i className="fa-solid fa-arrow-down"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'templates' && (
                <div className="templates-tab-grid">
                  {templates.map(tpl => (
                    <div
                      key={tpl.id}
                      className={`template-card-mini ${selectedTemplate?.id === tpl.id ? 'active-template' : ''}`}
                      onClick={() => handleSelectTemplate(tpl)}
                    >
                      <div className="template-preview-mini" style={{ background: '#0a0a0a', overflow: 'hidden' }}>
                        <img src={tpl.image} alt={tpl.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div className="template-card-info">
                        <span>{tpl.name}</span>
                        {selectedTemplate?.id === tpl.id && <span className="active-badge">Active</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="bottom-actions-bar" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px' }}>
                <button className="btn-save-design" onClick={() => alert('Design saved as template successfully!')}>Save as template</button>
              </div>
          </div>

          <section className="preview-panel" style={{ flexGrow: 1, background: '#1d1d1d', overflowY: 'auto', display: 'flex', justifyContent: 'center', padding: '2rem 1.5rem', boxSizing: 'border-box', position: 'relative' }}>
            <button className="btn-full-preview" onClick={() => setShowFullPreview(true)} style={{ position: 'absolute', top: '0', right: '1rem', background: '#EEC30C', color: '#000', border: 'none', padding: '0.4rem 0.8rem', borderBottomLeftRadius: '6px', borderBottomRightRadius: '6px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 600 }}>
              <i className="fa-solid fa-expand"></i> Full Preview
            </button>
            {mockupImage ? (
              <div className="resume-mockup-wrapper" style={{ width: '100%', maxWidth: '210mm', position: 'relative' }}>
                <img
                  src={mockupImage}
                  alt="Template Mockup"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '12px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                    border: '1px solid #333'
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => setMockupImage(null)}
                    style={{ padding: '10px 20px', boxShadow: '0 5px 15px rgba(0,0,0,0.5)' }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Back to Editor
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {(() => {
                  const pages = [];
                let currentPage = [];
                for (const sec of resumeData.sections) {
                  if (sec.type === 'pagebreak') {
                    pages.push(currentPage);
                    currentPage = [];
                  } else {
                    currentPage.push(sec);
                  }
                }
                pages.push(currentPage);

                return pages.map((pageSections, pageIndex) => (
                  <div
                    key={pageIndex}
                    id={`resumeSheet-${pageIndex}`}
                    className="resume-page-sheet"
                    style={{
                      marginBottom: pageIndex < pages.length - 1 ? '2rem' : '0',
                      fontFamily: (hoveredFont || fontFamily) === 'Satoshi' ? 'Satoshi, sans-serif' : `'${hoveredFont || fontFamily}'`,
                      fontSize: `${fontSize}pt`,
                  lineHeight: lineHeight,
                  paddingLeft: `${lrMargin}mm`,
                  paddingRight: `${lrMargin}mm`,
                  paddingTop: `${tbMargin}mm`,
                  paddingBottom: `${tbMargin}mm`,
                  border: showBorders ? '1px solid #d3d3d3' : 'none',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  '--accent': accentColor
                }}
              >
                {/* Render header at top if it is Top positioned or if Layout is Single Column */}
                {(layoutConfig.columns === 'one' || layoutConfig.headerPos === 'top') && pageIndex === 0 && renderHeader()}

                {/* 1. Single Column Layout */}
                {layoutConfig.columns === 'one' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {pageSections.map(sec => renderPreviewSection(sec))}
                  </div>
                )}

                {/* 2. Two Columns Layout */}
                {layoutConfig.columns === 'two' && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%`,
                      gap: '2rem',
                      alignItems: 'start'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {layoutConfig.headerPos === 'left' && pageIndex === 0 && renderHeader()}
                      {pageSections.filter(s => s.column === 'left').map(sec => renderPreviewSection(sec))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {layoutConfig.headerPos === 'right' && pageIndex === 0 && renderHeader()}
                      {pageSections.filter(s => s.column === 'right').map(sec => renderPreviewSection(sec))}
                    </div>
                  </div>
                )}

                {/* 3. Mixed Layout */}
                {layoutConfig.columns === 'mix' && (() => {
                  // Replicate row splitting logic
                  let rows = [];
                  let currentRow = null;
                  
                  for (let sec of pageSections) {
                    let col = sec.column || 'full';
                    if (col === 'full') {
                      if (currentRow) { rows.push(currentRow); currentRow = null; }
                      rows.push({ type: 'full', section: sec });
                    } else if (col === 'left') {
                      if (currentRow) {
                        if (currentRow.left) {
                          rows.push(currentRow);
                          currentRow = { type: 'split', left: sec, right: null };
                        } else {
                          currentRow.left = sec;
                          rows.push(currentRow);
                          currentRow = null;
                        }
                      } else {
                        currentRow = { type: 'split', left: sec, right: null };
                      }
                    } else if (col === 'right') {
                      if (currentRow) {
                        if (currentRow.right) {
                          rows.push(currentRow);
                          currentRow = { type: 'split', left: null, right: sec };
                        } else {
                          currentRow.right = sec;
                          rows.push(currentRow);
                          currentRow = null;
                        }
                      } else {
                        currentRow = { type: 'split', left: null, right: sec };
                      }
                    }
                  }
                  if (currentRow) {
                    rows.push(currentRow);
                  }

                  let headerInserted = false;

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {/* If header pos is left/right but no rows exist or header not inserted yet */}
                      {rows.length === 0 && (layoutConfig.headerPos === 'left' || layoutConfig.headerPos === 'right') && (
                        <div
                          className="sheet-mix-columns"
                          style={{
                            display: 'grid',
                            gridTemplateColumns: `${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%`,
                            gap: '2rem',
                            alignItems: 'start',
                            marginBottom: '1.2rem'
                          }}
                        >
                          <div className="sheet-column-left" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {layoutConfig.headerPos === 'left' && pageIndex === 0 && renderHeader()}
                          </div>
                          <div className="sheet-column-right" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {layoutConfig.headerPos === 'right' && pageIndex === 0 && renderHeader()}
                          </div>
                        </div>
                      )}

                      {rows.map((row, rIdx) => {
                        if (row.type === 'full') {
                          return (
                            <div key={rIdx} className="sheet-full-width-section" style={{ width: '100%', marginBottom: '0.4rem' }}>
                              {renderPreviewSection(row.section)}
                            </div>
                          );
                        } else {
                          let insertLeftHeader = false;
                          let insertRightHeader = false;

                          if (layoutConfig.headerPos === 'left' && !headerInserted) {
                            insertLeftHeader = true;
                            headerInserted = true;
                          } else if (layoutConfig.headerPos === 'right' && !headerInserted) {
                            insertRightHeader = true;
                            headerInserted = true;
                          }

                          return (
                            <div
                              key={rIdx}
                              className="sheet-mix-columns"
                              style={{
                                display: 'grid',
                                gridTemplateColumns: `${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%`,
                                gap: '2rem',
                                alignItems: 'start',
                                marginBottom: '0.4rem'
                              }}
                            >
                              <div className="sheet-column-left" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                {insertLeftHeader && renderHeader()}
                                {row.left && renderPreviewSection(row.left)}
                              </div>
                              <div className="sheet-column-right" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                {insertRightHeader && renderHeader()}
                                {row.right && renderPreviewSection(row.right)}
                              </div>
                            </div>
                          );
                        }
                      })}

                      {/* Fallback to insert header if there were only full-width rows but position is left/right */}
                      {!headerInserted && (layoutConfig.headerPos === 'left' || layoutConfig.headerPos === 'right') && (
                        <div
                          className="sheet-mix-columns"
                          style={{
                            display: 'grid',
                            gridTemplateColumns: `${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%`,
                            gap: '2rem',
                            alignItems: 'start',
                            marginBottom: '1.2rem'
                          }}
                        >
                          <div className="sheet-column-left" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {layoutConfig.headerPos === 'left' && pageIndex === 0 && renderHeader()}
                          </div>
                          <div className="sheet-column-right" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {layoutConfig.headerPos === 'right' && pageIndex === 0 && renderHeader()}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Footer Render */}
                {(footerPageNumbers || footerEmail || footerName || footerCustom) && (
                  <div
                    id="resume-footer"
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: `${lrMargin}mm`,
                      right: `${lrMargin}mm`,
                      borderTop: '1px solid #ddd',
                      paddingTop: '0.5rem',
                      fontSize: '0.75rem',
                      color: '#999',
                      display: 'flex',
                      justifyContent: 'space-between',
                      pointerEvents: 'none'
                    }}
                  >
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      {footerCustom
                        ? footerLeftCol.replace(/\{\{name\}\}/g, resumeData.name).replace(/\{\{email\}\}/g, resumeData.email || '').replace(/\{\{phone\}\}/g, resumeData.phone || '').replace(/\{\{page\}\}/g, pageIndex + 1).replace(/\{\{pages\}\}/g, pages.length)
                        : (footerName ? resumeData.name : '')}
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      {footerCustom
                        ? footerCenterCol.replace(/\{\{name\}\}/g, resumeData.name).replace(/\{\{email\}\}/g, resumeData.email || '').replace(/\{\{phone\}\}/g, resumeData.phone || '').replace(/\{\{page\}\}/g, pageIndex + 1).replace(/\{\{pages\}\}/g, pages.length)
                        : (footerEmail ? resumeData.email : '')}
                    </div>
                    <div style={{ flex: 1, textAlign: 'right' }}>
                      {footerCustom
                        ? footerRightCol.replace(/\{\{name\}\}/g, resumeData.name).replace(/\{\{email\}\}/g, resumeData.email || '').replace(/\{\{phone\}\}/g, resumeData.phone || '').replace(/\{\{page\}\}/g, pageIndex + 1).replace(/\{\{pages\}\}/g, pages.length)
                        : (footerPageNumbers ? `Page ${pageIndex + 1} of ${pages.length}` : '')}
                    </div>
                  </div>
                )}
                
                {showPrintFooter && (
                  <div className="sheet-print-footer" style={{ position: 'absolute', bottom: '15px', left: '20px', fontSize: '0.75rem', color: '#999', pointerEvents: 'none' }}>
                    Generated professionally using MockB CV Customizer Editor.
                  </div>
                )}
              </div>
                ));
              })()}
              </div>
            )}
          </section>
        </main>
      </>
    )}

      {/* ─────────────────────────────────────────────────────────────────
          STEP 3: MODALS AND POPUPS
          ───────────────────────────────────────────────────────────────── */}
      {showPhotoModal && (
        <div className="modal-overlay" onClick={() => setShowPhotoModal(false)} style={{ display: 'flex', position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.8)', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ background: '#181818', padding: '2rem', borderRadius: '12px', border: '1px solid #333', width: '450px', maxWidth: '90%' }}>
            <h3 style={{ color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-crop-simple"></i> Crop & Adjust Photo
            </h3>
            
            {/* Viewbox preview */}
            <div
              onMouseMove={handlePhotoMouseMove}
              onMouseUp={handlePhotoMouseUp}
              onMouseLeave={handlePhotoMouseUp}
              style={{
                width: '100%',
                height: '240px',
                background: '#0d0d0d',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid #222'
              }}
            >
              {resumeData.photo && (
                <img
                  src={resumeData.photo}
                  alt="Crop preview"
                  onMouseDown={handlePhotoMouseDown}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    cursor: isDraggingPhoto ? 'grabbing' : 'grab',
                    filter: photoGrayscale ? 'grayscale(100%)' : 'none',
                    transform: `scale(${photoZoom}) translate(${photoPanX}px, ${photoPanY}px)`,
                    transition: isDraggingPhoto ? 'none' : 'transform 0.1s ease'
                  }}
                />
              )}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#888', textAlign: 'center', marginTop: '6px' }}>Drag photo within box to pan crop position.</p>

            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Zoom Slider */}
              <div className="slider-group">
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#ccc' }}>
                  <span>Zoom Level</span>
                  <span>{Math.round(photoZoom * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.05"
                  value={photoZoom}
                  onChange={(e) => setPhotoZoom(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent, #EEC30C)' }}
                />
              </div>

              {/* Toggles */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div className="form-group">
                  <label>Shape</label>
                  <select
                    value={photoShape}
                    onChange={(e) => setPhotoShape(e.target.value)}
                    className="form-input-dark"
                  >
                    <option value="circle">Circle</option>
                    <option value="rounded">Rounded Box</option>
                    <option value="square">Square</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Size</label>
                  <select
                    value={photoSize}
                    onChange={(e) => setPhotoSize(e.target.value)}
                    className="form-input-dark"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#ccc' }}>
                <input
                  type="checkbox"
                  checked={photoGrayscale}
                  onChange={(e) => setPhotoGrayscale(e.target.checked)}
                  style={{ accentColor: 'var(--accent, #EEC30C)' }}
                />
                Grayscale filter
              </label>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                <button className="btn btn-secondary" onClick={() => setShowPhotoModal(false)} style={{ flexGrow: 1 }}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={() => setShowPhotoModal(false)} style={{ flexGrow: 1 }}>
                  Save adjustments
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          MODAL: ADD SECTION POPUP
          ───────────────────────────────────────────────────────────────── */}
      {showAddSectionModal && (() => {
        const hasSec = (t) => resumeData.sections.some(s => s.type === t);
        return (
          <div className="modal-overlay show" onClick={() => setShowAddSectionModal(false)} style={{ display: 'flex', position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.8)', alignItems: 'center', justifyContent: 'center' }}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-header-left">
                  <h2>Add content</h2>
                  <button className="btn-modal-import"><i className="fa-solid fa-cloud-arrow-up"></i> Import Resume</button>
                </div>
                <button className="btn-modal-close" onClick={() => setShowAddSectionModal(false)}><i className="fa-solid fa-xmark"></i></button>
              </div>
              
              <div className="modal-grid">
                {[
                  { type: 'summary', label: 'Summary', icon: 'fa-solid fa-file-invoice', desc: 'Add a short summary of your key strengths, experience, and career goals.' },
                  { type: 'education', label: 'Education', icon: 'fa-solid fa-graduation-cap', desc: 'Add your degrees and schools. Include honors or details.' },
                  { type: 'experience', label: 'Professional Experience', icon: 'fa-solid fa-briefcase', desc: 'Add your professional roles and employer history.' },
                  { type: 'skills', label: 'Skills', icon: 'fa-solid fa-lightbulb', desc: 'Add your hard and soft skills that help you stand out from the crowd.' },
                  { type: 'languages', label: 'Languages', icon: 'fa-solid fa-language', desc: 'Add your languages and proficiency level.' },
                  { type: 'certificates', label: 'Certificates', icon: 'fa-solid fa-certificate', desc: 'Add your industry certificates or licences.' },
                  { type: 'interests', label: 'Interests', icon: 'fa-solid fa-heart', desc: 'Add personal interests that support your career story.' },
                  { type: 'projects', label: 'Projects', icon: 'fa-solid fa-diagram-project', desc: 'Add key projects you participated in and highlight impact.' },
                  { type: 'courses', label: 'Courses', icon: 'fa-solid fa-book', desc: 'Add online or in-person courses and training.' },
                  { type: 'awards', label: 'Awards', icon: 'fa-solid fa-trophy', desc: 'Add awards and recognitions from competitions/academia.' },
                  { type: 'organisations', label: 'Organisations', icon: 'fa-solid fa-users', desc: 'Add memberships or volunteering with organizations.' },
                  { type: 'publications', label: 'Publications', icon: 'fa-solid fa-book-open', desc: 'Add publications, articles, or books you wrote.' },
                  { type: 'references', label: 'References', icon: 'fa-solid fa-user-group', desc: 'Add references from managers or coworkers.' },
                  { type: 'declaration', label: 'Declaration', icon: 'fa-solid fa-signature', desc: 'Add declaration by creating or uploading your signature.' },
                  ...(resumeData.sections || []).filter(s => s.type === 'custom').map(s => ({ type: s.id, label: s.title || 'Custom Section', icon: sectionIcons[s.id] || 'fa-solid fa-asterisk', desc: 'This is a custom section', isExistingCustom: true, originalId: s.id })),
                  { type: 'custom', label: 'Custom', icon: 'fa-solid fa-asterisk', desc: 'Add a custom section for anything else cleanly.' }
                ].map(item => {
                  const exists = (item.type !== 'custom' && !item.isExistingCustom && hasSec(item.type)) || item.isExistingCustom;
                  return (
                    <div 
                      key={item.type} 
                      className={`modal-grid-item ${exists ? 'disabled' : ''}`} 
                      onClick={() => {
                        if (!exists) {
                          handleAddSection(item.type);
                          setShowAddSectionModal(false);
                        }
                      }}
                      style={exists ? { opacity: 0.3, pointerEvents: 'none', filter: 'grayscale(1)' } : { cursor: 'pointer' }}
                    >
                      <div className="modal-item-icon"><i className={item.icon}></i></div>
                      <h4>{item.label}</h4>
                      <p>{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {showPhotoModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '12px', width: '90%', maxWidth: '500px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid #f0f0f0' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#000', fontWeight: 'bold' }}>Manage Photo</h3>
              <button onClick={() => setShowPhotoModal(false)} style={{ background: 'none', border: 'none', color: '#000', fontSize: '1.2rem', cursor: 'pointer' }}><i className="fa-solid fa-times"></i></button>
            </div>
            <div style={{ width: '100%', height: '250px', background: '#222', position: 'relative', overflow: 'hidden', cursor: isDraggingPhoto ? 'grabbing' : 'grab' }} onMouseDown={handlePhotoMouseDown} onMouseMove={handlePhotoMouseMove} onMouseUp={handlePhotoMouseUp} onMouseLeave={handlePhotoMouseUp}>
              {resumeData.photo ? (
                <>
                  <img src={resumeData.photo} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${photoZoom}) translate(${photoPanX}px, ${photoPanY}px)`, pointerEvents: 'none' }} draggable="false" />
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                    <div style={{ width: '150px', height: photoShape.startsWith('portrait') ? '200px' : '150px', border: '2px solid #fff', boxShadow: '0 0 0 9999px rgba(0,0,0,0.6)', ...(photoShape === 'portrait' ? { borderRadius: 0 } : photoShape === 'portrait-rounded' ? { borderRadius: '16px' } : photoShape === 'hexagon' ? { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', border: 'none' } : { borderRadius: photoShape === 'square' ? '0' : photoShape === 'rounded' ? '16px' : photoShape === 'squircle' ? '36px' : '50%' }) }}></div>
                  </div>
                </>
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Photo</div>
              )}
            </div>
            <div style={{ padding: '1.5rem', background: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <i className="fa-solid fa-image" style={{ color: '#888' }}></i>
                <input type="range" min="1" max="3" step="0.1" value={photoZoom} onChange={(e) => setPhotoZoom(parseFloat(e.target.value))} style={{ flex: 1, accentColor: '#EEC30C' }} />
                <i className="fa-solid fa-image" style={{ color: '#000', fontSize: '1.2rem' }}></i>
              </div>
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <button onClick={() => setPhotoShape('circle')} style={{ width: '35px', height: '35px', borderRadius: '50%', border: photoShape === 'circle' ? '2px solid #EEC30C' : '1px solid #ddd', background: '#fff', cursor: 'pointer' }}></button>
                <button onClick={() => setPhotoShape('square')} style={{ width: '35px', height: '35px', borderRadius: '0', border: photoShape === 'square' ? '2px solid #EEC30C' : '1px solid #ddd', background: '#fff', cursor: 'pointer' }}></button>
                <button onClick={() => setPhotoShape('rounded')} style={{ width: '35px', height: '35px', borderRadius: '8px', border: photoShape === 'rounded' ? '2px solid #EEC30C' : '1px solid #ddd', background: '#fff', cursor: 'pointer' }}></button>
                <button onClick={() => setPhotoShape('portrait')} style={{ width: '26px', height: '35px', borderRadius: '0', border: photoShape === 'portrait' ? '2px solid #EEC30C' : '1px solid #ddd', background: '#fff', cursor: 'pointer' }}></button>
                <button onClick={() => setPhotoShape('portrait-rounded')} style={{ width: '26px', height: '35px', borderRadius: '6px', border: photoShape === 'portrait-rounded' ? '2px solid #EEC30C' : '1px solid #ddd', background: '#fff', cursor: 'pointer' }}></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <button style={{ width: '100%', margin: 0, padding: '0.8rem', borderRadius: '8px', fontWeight: 600, background: '#EEC30C', color: '#000', border: 'none', cursor: 'pointer' }} onClick={() => setShowPhotoModal(false)}>
                  <i className="fa-solid fa-check"></i> Save
                </button>
                <button onClick={() => profilePhotoInputRef.current.click()} style={{ width: '100%', padding: '0.8rem', background: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px', color: '#000', cursor: 'pointer', fontWeight: 600 }}>
                  <i className="fa-solid fa-cloud-arrow-up"></i> Replace Photo
                </button>
                <button onClick={() => { updateResumeData(prev => ({...prev, photo: null})); setShowPhotoModal(false); }} style={{ width: '100%', padding: '0.8rem', background: 'none', border: '1px solid #ff4d4f', borderRadius: '8px', color: '#ff4d4f', cursor: 'pointer', fontWeight: 600 }}>
                  <i className="fa-solid fa-trash-can"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFullPreview && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 10000, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowFullPreview(false)} style={{ background: '#333', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-times"></i> Close Preview
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            {mockupImage ? (
               <img src={mockupImage} style={{ width: '100%', maxWidth: '210mm', height: 'auto', objectFit: 'contain' }} />
            ) : (
               <div
                className="resume-page-sheet"
                style={{
                  fontFamily: (hoveredFont || fontFamily) === 'Satoshi' ? 'Satoshi, sans-serif' : `'${hoveredFont || fontFamily}'`,
                  fontSize: `${fontSize}pt`,
                  lineHeight: lineHeight,
                  paddingLeft: `${lrMargin}mm`,
                  paddingRight: `${lrMargin}mm`,
                  paddingTop: `${tbMargin}mm`,
                  paddingBottom: `${tbMargin}mm`,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  '--accent': accentColor,
                  transform: 'scale(1.2)',
                  transformOrigin: 'top center',
                  marginBottom: '20vh'
                }}
              >
                {(layoutConfig.columns === 'one' || layoutConfig.headerPos === 'top') && renderHeader()}

                {layoutConfig.columns === 'one' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {resumeData.sections.map(sec => renderPreviewSection(sec))}
                  </div>
                )}

                {layoutConfig.columns === 'two' && (
                  <div style={{ display: 'grid', gridTemplateColumns: `${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%`, gap: '2rem', alignItems: 'start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {layoutConfig.headerPos === 'left' && renderHeader()}
                      {resumeData.sections.filter(s => s.column === 'left').map(sec => renderPreviewSection(sec))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      {layoutConfig.headerPos === 'right' && renderHeader()}
                      {resumeData.sections.filter(s => s.column === 'right').map(sec => renderPreviewSection(sec))}
                    </div>
                  </div>
                )}
                
                {layoutConfig.columns === 'mix' && (() => {
                  let rows = [];
                  let currentRow = [];
                  
                  resumeData.sections.forEach((sec, i) => {
                    if (sec.column === 'one') {
                      if (currentRow.length > 0) {
                        rows.push({ type: 'two', items: currentRow });
                        currentRow = [];
                      }
                      rows.push({ type: 'one', items: [sec] });
                    } else {
                      currentRow.push(sec);
                      if (i === resumeData.sections.length - 1) {
                        rows.push({ type: 'two', items: currentRow });
                      }
                    }
                  });

                  return rows.map((row, rIdx) => {
                    if (row.type === 'one') {
                      return <div key={rIdx} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>{row.items.map(sec => renderPreviewSection(sec))}</div>;
                    } else {
                      const leftItems = row.items.filter(s => s.column === 'left');
                      const rightItems = row.items.filter(s => s.column === 'right');
                      return (
                        <div key={rIdx} style={{ display: 'grid', gridTemplateColumns: `${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%`, gap: '2rem', alignItems: 'start' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>{leftItems.map(sec => renderPreviewSection(sec))}</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>{rightItems.map(sec => renderPreviewSection(sec))}</div>
                        </div>
                      );
                    }
                  });
                })()}
              </div>
            )}
          </div>
        </div>
      )}

      <SignatureModal 
        isOpen={signatureModal.isOpen} 
        onClose={() => setSignatureModal({ isOpen: false, sectionId: null, entryIndex: null })} 
        onSave={(dataUrl) => {
          handleUpdateEntryValue(signatureModal.sectionId, signatureModal.entryIndex, 'signature', dataUrl);
          setSignatureModal({ isOpen: false, sectionId: null, entryIndex: null });
        }} 
      />

    </main>
  );
}

const SignatureModal = ({ isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('draw'); // 'draw' or 'upload'
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Cropper states
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 250, height: 100 });
  const [isDraggingCrop, setIsDraggingCrop] = useState(false);
  const [isResizingCrop, setIsResizingCrop] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const dragStartRef = useRef({ x: 0, y: 0, boxX: 0, boxY: 0, boxW: 0, boxH: 0 });
  const imgRef = useRef(null);

  useEffect(() => {
    if (isOpen && activeTab === 'draw') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        if (canvas.width !== rect.width * 2) {
          canvas.width = rect.width * 2;
          canvas.height = rect.height * 2;
          ctx.scale(2, 2);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#000';
        }
      }
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch(err) {}
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    isDrawingRef.current = true;
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault(); // prevent scrolling while drawing
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e) => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch(err) {}
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleSaveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onSave(dataUrl);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setUploadedImage(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        setUploadedImage(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onImgLoad = (e) => {
    const { width, height } = e.target.getBoundingClientRect();
    setImgSize({ width, height });
    
    // Initialize crop box to be centered
    const boxW = Math.min(250, width * 0.8);
    const boxH = Math.min(100, height * 0.8);
    setCropBox({
      x: (width - boxW) / 2,
      y: (height - boxH) / 2,
      width: boxW,
      height: boxH
    });
  };

  const handleRotate = (angle) => {
    if (!uploadedImage) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (Math.abs(angle) === 90) {
        canvas.width = img.height;
        canvas.height = img.width;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      setUploadedImage(canvas.toDataURL('image/png'));
    };
    img.src = uploadedImage;
  };

  const handleSaveUpload = () => {
    if (!uploadedImage) return;
    const img = new Image();
    img.onload = () => {
      const scaleX = img.width / imgSize.width;
      const scaleY = img.height / imgSize.height;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = cropBox.width * scaleX;
      canvas.height = cropBox.height * scaleY;
      
      ctx.drawImage(
        img,
        cropBox.x * scaleX,
        cropBox.y * scaleY,
        cropBox.width * scaleX,
        cropBox.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );
      
      onSave(canvas.toDataURL('image/png'));
    };
    img.src = uploadedImage;
  };

  // Cropper Event Handlers
  const onHandlePointerDown = (e, handle) => {
    e.stopPropagation();
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch(err) {}
    setIsResizingCrop(true);
    setResizeHandle(handle);
    dragStartRef.current = { 
      x: e.clientX, y: e.clientY, 
      boxX: cropBox.x, boxY: cropBox.y, 
      boxW: cropBox.width, boxH: cropBox.height,
      target: e.target,
      pointerId: e.pointerId
    };
  };

  const onCropPointerDown = (e) => {
    e.stopPropagation();
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch(err) {}
    setIsDraggingCrop(true);
    dragStartRef.current = { 
      x: e.clientX, y: e.clientY, 
      boxX: cropBox.x, boxY: cropBox.y,
      target: e.target,
      pointerId: e.pointerId
    };
  };

  const handlePointerMove = (e) => {
    if (isDraggingCrop) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      let newX = dragStartRef.current.boxX + dx;
      let newY = dragStartRef.current.boxY + dy;
      
      newX = Math.max(0, Math.min(newX, imgSize.width - cropBox.width));
      newY = Math.max(0, Math.min(newY, imgSize.height - cropBox.height));
      
      setCropBox(prev => ({ ...prev, x: newX, y: newY }));
    } else if (isResizingCrop) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      
      let { boxX, boxY, boxW, boxH } = dragStartRef.current;
      
      if (resizeHandle.includes('e')) {
        boxW = Math.max(20, Math.min(boxW + dx, imgSize.width - boxX));
      }
      if (resizeHandle.includes('s')) {
        boxH = Math.max(20, Math.min(boxH + dy, imgSize.height - boxY));
      }
      if (resizeHandle.includes('w')) {
        let newW = Math.max(20, boxW - dx);
        let newX = boxX + boxW - newW;
        if (newX < 0) {
          newX = 0;
          newW = boxX + boxW;
        }
        boxX = newX;
        boxW = newW;
      }
      if (resizeHandle.includes('n')) {
        let newH = Math.max(20, boxH - dy);
        let newY = boxY + boxH - newH;
        if (newY < 0) {
          newY = 0;
          newH = boxY + boxH;
        }
        boxY = newY;
        boxH = newH;
      }
      
      setCropBox({ x: boxX, y: boxY, width: boxW, height: boxH });
    }
  };

  const handlePointerUp = (e) => {
    if (isDraggingCrop || isResizingCrop) {
      if (dragStartRef.current.target && dragStartRef.current.pointerId !== undefined) {
        try {
            dragStartRef.current.target.releasePointerCapture(dragStartRef.current.pointerId);
        } catch(err) {}
      }
    }
    setIsDraggingCrop(false);
    setIsResizingCrop(false);
    setResizeHandle(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="sig-modal-overlay" onMouseDown={handleOverlayClick}>
      <div className="sig-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="sig-modal-header">
          <h2>Add Signature</h2>
          <button className="sig-close-btn" onClick={onClose}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <div className="sig-tabs">
          <button 
            className={`sig-tab ${activeTab === 'draw' ? 'active' : ''}`}
            onClick={() => setActiveTab('draw')}
          >
            <i className="fa-solid fa-signature"></i> Draw Signature
          </button>
          <button 
            className={`sig-tab ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <i className="fa-solid fa-upload"></i> Upload Image
          </button>
        </div>

        <div className="sig-body">
          {activeTab === 'draw' && (
            <div className="sig-draw-container">
              <canvas
                ref={canvasRef}
                className="sig-canvas"
                style={{ touchAction: 'none' }}
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
              />
              <div className="sig-draw-actions">
                <button className="sig-btn sig-btn-clear" onClick={clearSignature}>Clear</button>
                <button className="sig-btn sig-btn-save" onClick={handleSaveDrawing}>Save</button>
              </div>
            </div>
          )}

          {activeTab === 'upload' && !uploadedImage && (
            <div className="sig-upload-container" onDragOver={handleDragOver} onDrop={handleDrop}>
              <div 
                className="sig-dropzone"
                onClick={() => fileInputRef.current?.click()}
              >
                Drag 'n' drop some files here, or click to select files
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          )}

          {activeTab === 'upload' && uploadedImage && (
            <div className="sig-editor-container">
              <div 
                className="sig-editor-preview-area" 
                style={{ 
                  height: '250px', 
                  background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\'%3E%3Cpath fill=\'%23808080\' d=\'M0 0h10v10H0zm10 10h10v10H10z\'/%3E%3Cpath fill=\'transparent\' d=\'M10 0h10v10H10zM0 10h10v10H0z\'/%3E%3C/svg%3E")', 
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  touchAction: 'none',
                  userSelect: 'none'
                }}
              >
                <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0 }}>
                  <img 
                    ref={imgRef}
                    src={uploadedImage} 
                    onLoad={onImgLoad}
                    alt="Uploaded" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '250px', 
                      display: 'block',
                      pointerEvents: 'none'
                    }} 
                    draggable={false}
                  />
                  
                  {imgSize.width > 0 && (
                    <div 
                      style={{
                        position: 'absolute',
                        top: cropBox.y,
                        left: cropBox.x,
                        width: cropBox.width,
                        height: cropBox.height,
                        border: '2px solid #fff',
                        boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)',
                        cursor: isDraggingCrop ? 'grabbing' : 'grab'
                      }}
                      onPointerDown={onCropPointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                    >
                      {/* Grid lines */}
                      <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, borderTop: '1px dashed rgba(255,255,255,0.5)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, borderTop: '1px dashed rgba(255,255,255,0.5)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, borderLeft: '1px dashed rgba(255,255,255,0.5)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, borderLeft: '1px dashed rgba(255,255,255,0.5)', pointerEvents: 'none' }} />

                      {/* Handles */}
                      <div onPointerDown={(e) => onHandlePointerDown(e, 'n')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} style={{ position: 'absolute', top: '-6px', left: 'calc(50% - 6px)', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', cursor: 'ns-resize' }} />
                      <div onPointerDown={(e) => onHandlePointerDown(e, 's')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} style={{ position: 'absolute', bottom: '-6px', left: 'calc(50% - 6px)', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', cursor: 'ns-resize' }} />
                      <div onPointerDown={(e) => onHandlePointerDown(e, 'w')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} style={{ position: 'absolute', top: 'calc(50% - 6px)', left: '-6px', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', cursor: 'ew-resize' }} />
                      <div onPointerDown={(e) => onHandlePointerDown(e, 'e')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} style={{ position: 'absolute', top: 'calc(50% - 6px)', right: '-6px', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', cursor: 'ew-resize' }} />
                      <div onPointerDown={(e) => onHandlePointerDown(e, 'nw')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} style={{ position: 'absolute', top: '-6px', left: '-6px', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', cursor: 'nwse-resize' }} />
                      <div onPointerDown={(e) => onHandlePointerDown(e, 'ne')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} style={{ position: 'absolute', top: '-6px', right: '-6px', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', cursor: 'nesw-resize' }} />
                      <div onPointerDown={(e) => onHandlePointerDown(e, 'sw')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} style={{ position: 'absolute', bottom: '-6px', left: '-6px', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', cursor: 'nesw-resize' }} />
                      <div onPointerDown={(e) => onHandlePointerDown(e, 'se')} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} style={{ position: 'absolute', bottom: '-6px', right: '-6px', width: '12px', height: '12px', background: '#fff', borderRadius: '50%', cursor: 'nwse-resize' }} />
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
                <button 
                  onClick={() => handleRotate(-90)}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}
                >
                  <i className="fa-solid fa-rotate-left"></i>
                </button>
                <button 
                  onClick={() => handleRotate(90)}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}
                >
                  <i className="fa-solid fa-rotate-right"></i>
                </button>
              </div>
              <div className="sig-draw-actions">
                <button className="sig-btn sig-btn-clear" onClick={() => { setUploadedImage(null); }}>Clear</button>
                <button className="sig-btn sig-btn-save" onClick={handleSaveUpload}>Save</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



