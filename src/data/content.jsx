// Dynamic Memory Image Management
import nirojaHero from '../assets/images/niroja.jpg';
import appLogo from '../assets/images/logo.png';

const allImages = Object.fromEntries(
    Object.entries(
        import.meta.glob('../assets/images/**/*.{jpg,jpeg,png,webp,JPG,JPEG}', { eager: true })
    ).filter(([path]) => !/\/logo\.(png|jpe?g|webp)$/i.test(path))
);

const getImageList = (folderName, category) => {
    return Object.keys(allImages)
        .filter((path) => path.toLowerCase().includes(`/${folderName.toLowerCase()}/`))
        .map((path, idx) => ({
            id: `${category.toLowerCase()}-${idx}`,
            image: allImages[path].default,
            category: category,
            caption: '',
        }));
};

const getStoryFolderImages = (folderName, underMemories = true) => {
    const needle = underMemories
        ? `/memories/${folderName.toLowerCase()}/`
        : `/images/${folderName.toLowerCase()}/`;
    return Object.keys(allImages)
        .filter((path) => path.toLowerCase().includes(needle))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
        .map((path, idx) => ({
            id: `${folderName.toLowerCase().replace(/\s+/g, '-')}-img-${idx}`,
            image: allImages[path].default,
        }));
};

const STORY_MEMORY_META = [
    {
        id: 'galle-face',
        folder: 'galle face',
        title: 'Galle Face',
        date: 'August 17, 2024',
        dateSort: '2024-08-17',
        place: 'Galle Face Beach, Colombo',
        story: 'We took photos at Galle Face Beach in Colombo.',
    },
    {
        id: 'mall-visiting',
        folder: 'Mall Visiting',
        title: 'Mall Visiting',
        date: 'September 21, 2025',
        dateSort: '2025-09-21',
        place: 'City of Dreams Mall',
        story: 'We visited City of Dreams Mall.',
    },
    {
        id: 'book-fair',
        folder: 'Book Fair',
        title: 'Book Fair',
        date: 'October 1, 2025',
        dateSort: '2025-10-01',
        place: 'BMICH',
        story: 'We explored the book fair together at BMICH.',
        underMemories: true,
    },
    {
        id: 'dinner',
        folder: 'Dinner',
        title: 'Dinner',
        date: 'September 30, 2025',
        dateSort: '2025-09-30',
        place: 'Amritha Restaurant',
        story: 'We had dinner at Amritha Restaurant.',
    },
    {
        id: 'fit',
        folder: 'FIT',
        title: 'FIT',
        date: 'December 26, 2025',
        dateSort: '2025-12-26',
        place: 'University of Moratuwa',
        story: 'We spent time at FIT, University of Moratuwa.',
        underMemories: false,
    },
    {
        id: 'boatyard',
        folder: 'boatyard',
        title: 'Boatyard',
        date: 'December 28, 2025',
        dateSort: '2025-12-28',
        place: 'Boatyard, University of Moratuwa',
        story: 'We visited the boatyard at the University of Moratuwa.',
    },
    {
        id: 'pizza',
        folder: 'pizza',
        title: 'Pizza',
        date: 'January 8, 2026',
        dateSort: '2026-01-08',
        place: 'Pizza dinner',
        story: 'We ate dinner and had pizza.',
    },
    {
        id: 'library',
        folder: 'library',
        title: 'Library',
        date: 'February 2, 2026',
        dateSort: '2026-02-02',
        place: 'Library',
        story: 'We studied for the semester exam.',
    },
    {
        id: 'juice-bar',
        folder: 'juice bar',
        title: 'Juice Bar',
        date: 'February 3, 2026',
        dateSort: '2026-02-03',
        place: 'Juice Bar, Moratuwa',
        story: 'We went to a juice bar in Moratuwa.',
    },
    {
        id: 'hanthana-hiking',
        folder: 'Handhana hikking',
        title: 'Hanthana Hiking',
        date: 'February 28, 2026',
        dateSort: '2026-02-28',
        place: 'Hanthana Hills',
        story: 'We went hiking in Hanthana Hills.',
    },
    {
        id: 'selfie',
        folder: 'selfie',
        title: 'Selfie',
        date: 'May 22, 2026',
        dateSort: '2026-05-22',
        place: 'Avurudu Event',
        story: 'We took selfies at the Avurudu event.',
    },
    {
        id: 'bingchung',
        folder: 'bingchung',
        title: 'Bingchung and KFC',
        date: 'May 23, 2026',
        dateSort: '2026-05-23',
        place: 'Bingchung and KFC',
        story: 'We went to Bingchung and KFC.',
    },
];

const storyMemories = STORY_MEMORY_META.map((meta) => {
    const images = getStoryFolderImages(meta.folder, meta.underMemories !== false);
    return {
        ...meta,
        images,
        image: images[0]?.image ?? null,
    };
})
    .filter((m) => m.images.length > 0)
    .sort((a, b) => a.dateSort.localeCompare(b.dateSort));

const GALLERY_CAPTIONS = [
    'A beautiful memory',
    'A moment to remember',
    'Forever grateful for this day',
    'Smiles that stayed forever',
    'One of my favorite memories',
];

export const CONTENT = {
    appName: 'Niroja',
    logo: appLogo,
    name: 'Niroja',
    birthYear: 2002,

    unlock: {
        title: 'A Special Gift for Niroja',
        subtitle: 'Enter your birth year to unlock your birthday surprise.',
        placeholder: 'YYYY',
        button: 'Unlock Gift',
        error: 'Oops, try again with your birth year.',
    },

    welcome: {
        title: 'Happy Birthday, Niroja',
        subtitle: 'A birthday gift filled with memories, love, and true friendship.',
        buttonText: 'Open Your Gift',
        heroImage: nirojaHero,
    },

    story: {
        title: 'A Journey of Friendship',
        subtitle:
            'Every place, every smile, and every little moment became a memory worth keeping.',
        intro:
            'From quiet study days to loud laughter by the sea — these are the chapters of our friendship, written in places we visited together.',
    },

    storyMemories,

    memories: storyMemories,

    gallery: [
        ...getImageList('Memories', 'Memories'),
        ...getImageList('fun', 'Fun'),
        ...getImageList('special', 'Special'),
        ...getImageList('FIT', 'FIT'),
        ...getImageList('Friends', 'Friends'),
    ].map((item, idx) => ({
        ...item,
        caption: GALLERY_CAPTIONS[idx % GALLERY_CAPTIONS.length],
    })),

    final: {
        title: 'Happy Birthday, Niroja ❤️',
        paragraphs: [
            'Innaiku unakku special day ❤️ So, romba romba happy ah iru. Nee en life la romba special friend. Un smile, un care, un support ellam, en akkava miss pana vaikuthu & enakku romba specialavum ah irukku. Romba thxxx 💙',
          
            'Sinna oru advice solluran… Ethukkum kovapadatha, sad aagatha, epavum smile pannitu iru 😊 Life la epavum namma ninaikkura maari nadakkirathilla, happy ah irundhalum sad ah irundhalum. Aana nadakkura ovvoru vishayathukkum oru reason irukkum. So accept pannitu, strong ah irundhu, move on pannitu pojiddu irru ✨',
          
            'Nee life la top ku varanum 🌟 Un dreams ellam achieve pannanum. Epavum happy ah, peaceful ah, blessed ah irukkanum nu heart la irundhu wish panren 💫',
          
            'Happy Birthday, Niroja 🎂'
          ],
    },
};
