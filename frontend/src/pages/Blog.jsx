import React, { useState } from 'react';
import { toast } from 'react-toastify';

const blogArticles = [
  {
    id: 1,
    title: '10 Essential Habits for a Healthy Heart in 2026',
    category: 'Heart Health',
    author: 'Dr. Richard James',
    authorRole: 'Cardiologist',
    authorImg: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    date: 'Aug 14, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1000',
    excerpt: 'Cardiovascular health is the cornerstone of longevity. Learn 10 simple lifestyle adjustments proven to boost heart wellness and stamina.',
    content: `Cardiovascular disease remains one of the leading health concerns worldwide. Fortunately, over 80% of premature heart attacks and strokes are preventable through proactive lifestyle choices.

### 1. Prioritize Daily Aerobic Movement
Aim for at least 30 minutes of moderate-intensity exercise 5 days a week. Activities like brisk walking, cycling, and swimming strengthen the heart muscle and lower blood pressure.

### 2. Embrace a Mediterranean-Style Diet
Incorporate rich sources of omega-3 fatty acids like salmon, walnuts, and extra virgin olive oil. Reduce refined sugars and sodium consumption.

### 3. Maintain Consistent Sleep Hygiene
Poor sleep quality directly affects blood pressure and arterial stress. Aim for 7-9 hours of uninterrupted restful sleep every night.

### Key Takeaway
Small, steady daily adjustments build powerful long-term protection for your cardiovascular system.`
  },
  {
    id: 2,
    title: 'Understanding Anxiety & Practical Mindfulness Techniques',
    category: 'Mental Wellness',
    author: 'Dr. Emily Larson',
    authorRole: 'Neurologist & Wellness Coach',
    authorImg: 'https://images.unsplash.com/photo-1594824813566-78a9c2d1b821?auto=format&fit=crop&q=80&w=300',
    date: 'Aug 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
    excerpt: 'Anxiety impacts physical health as much as mental state. Discover evidence-based grounding techniques to restore calmness.',
    content: `Anxiety triggers physiological responses including elevated heart rate, muscle tension, and shallow breathing. Managing mental stress is essential for total body wellness.

### The 4-7-8 Breathing Method
1. Inhale quietly through your nose for 4 seconds.
2. Hold your breath for a count of 7 seconds.
3. Exhale completely through your mouth with a whoosh sound for 8 seconds.

### Digital Detox & Boundary Setting
Constant exposure to screen notifications floods the nervous system with cortisol. Designate at least one hour before sleep as a screen-free zone.`
  },
  {
    id: 3,
    title: 'The Role of Gut Microbiome in Immunity & Overall Health',
    category: 'Nutrition & Fitness',
    author: 'Dr. Christopher Lee',
    authorRole: 'Gastroenterologist',
    authorImg: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    date: 'Aug 05, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=1000',
    excerpt: 'Your gut microbiome hosts trillions of beneficial bacteria that regulate digestion, immunity, and even mood regulation.',
    content: `Research increasingly confirms that 70% of the body's immune system resides in the gastrointestinal tract. Nourishing beneficial gut microbes directly enhances disease resistance.

### Fermented Foods to Include
- Yogurt & Kefir with live active cultures
- Kimchi & Sauerkraut
- Miso & Kombucha

### High-Fiber Prebiotics
Prebiotic fibers act as food for probiotic bacteria. Eat plenty of garlic, onions, oats, and green bananas.`
  },
  {
    id: 4,
    title: 'Childhood Vaccination Guide: What Every Parent Should Know',
    category: 'Pediatrics',
    author: 'Dr. Sarah Patel',
    authorRole: 'Pediatrician',
    authorImg: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    date: 'Jul 28, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1000',
    excerpt: 'Immunizations protect children against serious contagious illnesses. Here is an updated immunization schedule breakdown.',
    content: `Pediatric immunizations safeguard newborns and developing children from preventable infections like measles, polio, and hepatitis.

### Essential Milestones
- **Newborn (0-2 months):** Hepatitis B, DTaP, Rotavirus
- **12-15 months:** MMR, Varicella (Chickenpox)
- **4-6 years:** Booster doses prior to school enrollment

Consult your primary pediatrician to ensure your child remains on track with standard healthcare schedules.`
  },
  {
    id: 5,
    title: 'Preventive Health Screenings You Should Not Skip After 30',
    category: 'Preventive Care',
    author: 'Dr. Jennifer Garcia',
    authorRole: 'General Physician',
    authorImg: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300',
    date: 'Jul 20, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000',
    excerpt: 'Routine annual checkups catch silent conditions early before symptoms appear. Here are the key tests for adults in their 30s and 40s.',
    content: `Preventive diagnostics empower patients to manage blood pressure, cholesterol, thyroid levels, and glucose spikes proactive.

### Top Checkups to Schedule
1. **Lipid Panel & Fasting Glucose:** Evaluates heart disease and diabetes risk.
2. **Comprehensive Metabolic Panel:** Checks kidney and liver function.
3. **Skin Cancer Screening:** Annual full-body dermatological evaluation.`
  },
  {
    id: 6,
    title: 'Ergonomics & Spinal Health for Remote & Desk Workers',
    category: 'Nutrition & Fitness',
    author: 'Dr. Andrew Stevens',
    authorRole: 'Orthopedic Specialist',
    authorImg: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=300',
    date: 'Jul 12, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000',
    excerpt: 'Prolonged sitting and poor desk posture cause chronic lumbar strain. Learn easy micro-stretches to keep your spine healthy.',
    content: `Sedentary work setups often lead to forward head posture and lumbar pressure.

### Posture Tweaks for Comfort
- Keep monitor top edge at eye level.
- Maintain elbows at 90-degree angle.
- Take 2-minute standing stretch breaks every 45 minutes.`
  }
];

const categories = ['All', 'Heart Health', 'Nutrition & Fitness', 'Mental Wellness', 'Pediatrics', 'Preventive Care'];

function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  const [email, setEmail] = useState('');

  const filteredArticles = selectedCategory === 'All'
    ? blogArticles
    : blogArticles.filter(item => item.category === selectedCategory);

  const featuredArticle = blogArticles[0];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing to Prescripto Health Digest!");
    setEmail('');
  };

  return (
    <div className='py-8 max-w-7xl mx-auto px-4 sm:px-6'>
      
      {/* Header Banner */}
      <div className='bg-gradient-to-r from-[#5f6fff] via-[#5262ff] to-[#4353ff] text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl shadow-blue-500/10 text-center sm:text-left relative overflow-hidden'>
        <div className='relative z-10 max-w-2xl'>
          <span className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold border border-white/20 mb-4'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
            Prescripto Medical Insights
          </span>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight'>
            Health & Wellness Digest
          </h1>
          <p className='mt-3 text-blue-100 text-sm sm:text-base leading-relaxed'>
            Expert articles, wellness tips, and preventive healthcare guidance curated directly by certified medical professionals.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className='flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none'>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#5f6fff] text-white shadow-md shadow-blue-500/20'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Lead Article */}
      {selectedCategory === 'All' && (
        <div className='mb-12 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-2 group'>
          <div className='overflow-hidden max-h-96 md:max-h-none'>
            <img 
              src={featuredArticle.image} 
              alt={featuredArticle.title}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
            />
          </div>
          <div className='p-8 flex flex-col justify-between'>
            <div>
              <div className='flex items-center gap-3 text-xs font-semibold text-[#5f6fff] mb-3'>
                <span className='px-3 py-1 bg-blue-50 rounded-full border border-blue-100'>
                  {featuredArticle.category}
                </span>
                <span className='text-slate-400'>• {featuredArticle.readTime}</span>
              </div>
              <h2 className='text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight group-hover:text-[#5f6fff] transition-colors leading-snug mb-3'>
                {featuredArticle.title}
              </h2>
              <p className='text-slate-500 text-sm leading-relaxed mb-6'>
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className='flex items-center justify-between pt-6 border-t border-slate-100'>
              <div className='flex items-center gap-3'>
                <img src={featuredArticle.authorImg} alt={featuredArticle.author} className='w-10 h-10 rounded-full object-cover border border-slate-200' />
                <div>
                  <p className='text-xs font-bold text-slate-800'>{featuredArticle.author}</p>
                  <p className='text-[11px] text-slate-400'>{featuredArticle.authorRole}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveArticle(featuredArticle)}
                className='bg-[#5f6fff] hover:bg-[#4353ff] text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer'
              >
                Read Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
        {filteredArticles.map((article) => (
          <div 
            key={article.id}
            className='bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group'
          >
            <div className='relative overflow-hidden h-48'>
              <img 
                src={article.image} 
                alt={article.title} 
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
              />
              <span className='absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#5f6fff] text-[11px] font-bold px-3 py-1 rounded-full shadow-sm'>
                {article.category}
              </span>
            </div>

            <div className='p-6 flex-1 flex flex-col justify-between'>
              <div>
                <span className='text-slate-400 text-xs font-medium'>{article.date} • {article.readTime}</span>
                <h3 
                  onClick={() => setActiveArticle(article)}
                  className='text-lg font-bold text-slate-800 mt-2 mb-2 group-hover:text-[#5f6fff] transition-colors cursor-pointer leading-snug line-clamp-2'
                >
                  {article.title}
                </h3>
                <p className='text-slate-500 text-xs leading-relaxed line-clamp-3 mb-6'>
                  {article.excerpt}
                </p>
              </div>

              <div className='flex items-center justify-between pt-4 border-t border-slate-100'>
                <div className='flex items-center gap-2.5'>
                  <img src={article.authorImg} alt={article.author} className='w-8 h-8 rounded-full object-cover border border-slate-200' />
                  <div>
                    <p className='text-xs font-semibold text-slate-800'>{article.author}</p>
                    <p className='text-[10px] text-slate-400'>{article.authorRole}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveArticle(article)}
                  className='text-xs font-semibold text-[#5f6fff] hover:underline cursor-pointer'
                >
                  Read →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Subscription Card */}
      <div className='bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden mb-8'>
        <div className='relative z-10 max-w-xl mx-auto'>
          <span className='bg-blue-500/20 text-blue-300 text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-blue-400/30'>
            Weekly Health Digest
          </span>
          <h2 className='text-2xl sm:text-3xl font-extrabold mt-4 mb-3 tracking-tight'>
            Subscribe to Doctor-Approved Medical Advice
          </h2>
          <p className='text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed'>
            Join 20,000+ patients getting verified health tips, preventive checkup reminders, and wellness guides delivered to their inbox weekly.
          </p>
          <form onSubmit={handleSubscribe} className='flex flex-col sm:flex-row gap-3 max-w-md mx-auto'>
            <input 
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#5f6fff] focus:ring-1 focus:ring-[#5f6fff]'
            />
            <button
              type="submit"
              className='bg-[#5f6fff] hover:bg-[#4353ff] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-500/30 active:scale-95 transition-all cursor-pointer'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn'>
          <div className='bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 border border-slate-100'>
            
            <button 
              onClick={() => setActiveArticle(null)}
              className='absolute top-5 right-5 w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center justify-center transition cursor-pointer text-sm font-bold'
            >
              ✕
            </button>

            <span className='px-3 py-1 bg-blue-50 text-[#5f6fff] text-xs font-semibold rounded-full border border-blue-100'>
              {activeArticle.category}
            </span>

            <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-3 mb-4 leading-tight'>
              {activeArticle.title}
            </h1>

            <div className='flex items-center gap-3 pb-6 border-b border-slate-100 mb-6'>
              <img src={activeArticle.authorImg} alt={activeArticle.author} className='w-12 h-12 rounded-full object-cover border border-slate-200' />
              <div>
                <p className='text-sm font-bold text-slate-800'>{activeArticle.author}</p>
                <p className='text-xs text-slate-400'>{activeArticle.authorRole} • {activeArticle.date} ({activeArticle.readTime})</p>
              </div>
            </div>

            <img 
              src={activeArticle.image} 
              alt={activeArticle.title} 
              className='w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 shadow-sm'
            />

            <div className='prose max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line'>
              {activeArticle.content}
            </div>

            <div className='mt-8 pt-6 border-t border-slate-100 flex justify-end'>
              <button
                onClick={() => setActiveArticle(null)}
                className='bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-6 py-2.5 rounded-full cursor-pointer transition-all'
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
